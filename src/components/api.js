import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com';  // basic url

// fetching the post
export const fetchPosts = async () => {
  const response = await axios.get(`${API_URL}/posts`);
  return response.data;
};

// fetching the comments
export const fetchComments = async () => {
  const response = await axios.get(`${API_URL}/comments`);
  return response.data;
};


// fetching the users
export const fetchUsers = async () => {
  const response = await axios.get(`${API_URL}/users`);
  return response.data;
};

// fetching the todos
export const fetchTodos = async () => {
  const response = await axios.get(`${API_URL}/todos`);
  return response.data;
};
