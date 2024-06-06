
import React from 'react';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import Sidebar from './components/Sidebar';
import Content from './components/Content';
import { BrowserRouter as Router } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%' }}>
        <CssBaseline />
        <Sidebar />
        <Box
          component="main"
          sx={{
            display: 'flex',
            flexGrow: 1,
            p: 3,
            ml: { sm: '240px' },
            mt: '64px', // Height of the AppBar
            width: { sm: 'calc(100% - 240px)', xs: '100%' },
            overflowX: 'hidden'
          }}
        >
          <Toolbar />
          <Content />
        </Box>
      </Box>
    </Router>
  );
};

export default App;
