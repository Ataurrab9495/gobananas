
import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, useMediaQuery, AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PostIcon from '@mui/icons-material/Description';
import CommentIcon from '@mui/icons-material/Comment';
import UserIcon from '@mui/icons-material/Person';
import TodoIcon from '@mui/icons-material/CheckCircle';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

const Sidebar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));  // used for responsiveness

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <List>
      {[
        { text: 'Posts', path: '/posts', icon: <PostIcon /> },
        { text: 'Comments', path: '/comments', icon: <CommentIcon /> },
        { text: 'Users', path: '/users', icon: <UserIcon /> },
        { text: 'Todos', path: '/todos', icon: <TodoIcon /> },
      ].map((item) => (
        <ListItem button key={item.text} component={Link} to={item.path} onClick={handleDrawerToggle}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItem>
      ))}
    </List>
  );

  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar>
          {isMobile && (
            <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap>
            Basic Nav
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={isMobile ? mobileOpen : true}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box', marginTop: '56px' },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Sidebar;
