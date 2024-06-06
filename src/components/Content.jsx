
import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, TextField } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import { fetchPosts, fetchComments, fetchUsers, fetchTodos } from './api';

const DataDisplay = ({ data, type }) => (
  <Box>
    <Typography variant="h4">{type}</Typography>
    {data.map((item, index) => (
      <Box key={index} sx={{ marginBottom: 2 }}>
        <Typography variant="h6">{type === 'Posts' ? item.title : item.name || item.title}</Typography>
        <Typography variant="body1">{item.body || item.email || item.username || item.name}</Typography>
      </Box>
    ))}
  </Box>
);

const Content = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');



// this is the useEffect that fetches the data from the api
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [postsData, commentsData, usersData, todosData] = await Promise.all([
        fetchPosts(),
        fetchComments(),
        fetchUsers(),
        fetchTodos(),
      ]);
      setPosts(postsData);
      setComments(commentsData);
      setUsers(usersData);
      setTodos(todosData);
      setLoading(false);
    };

    fetchData();
  }, []);


  const handleSearchChange = (event) => {
      setSearchQuery(event.target.value);
    };
    
// search functionality that takes the value and searches over the data
  const filterData = (data) => {
    if (!searchQuery) return data;
    return data.filter((item) => {
      const content = item.title || item.name || item.body || item.username || item.email;
      return content.toLowerCase().includes(searchQuery.toLowerCase());
    });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, padding: 2, overflowX: 'hidden' }}>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <Routes>
        <Route path="/posts" element={<DataDisplay data={filterData(posts)} type="Posts" />} />
        <Route path="/comments" element={<DataDisplay data={filterData(comments)} type="Comments" />} />
        <Route path="/users" element={<DataDisplay data={filterData(users)} type="Users" />} />
        <Route path="/todos" element={<DataDisplay data={filterData(todos)} type="Todos" />} />
        <Route path="/" element={<Typography variant="h6">Please select an item from the sidebar.</Typography>} />
      </Routes>
    </Box>
  );
};

export default Content;
