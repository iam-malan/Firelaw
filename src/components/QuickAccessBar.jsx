import React from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const QuickAccessBar = () => {
  const categories = [
    { name: 'Home', path: '/' },
    { name: 'Calendar', path: '/calendar' },
    { name: 'Tasks', path: '/tasks' },
    { name: 'Contacts', path: '/contacts' },
    { name: 'Matters', path: '/matters' },
    { name: 'Documents', path: '/documents' },
    { name: 'Billing', path: '/billing' },
    { name: 'Payments', path: '/payments' },
    { name: 'Accounting', path: '/accounting' },
    { name: 'Reports', path: '/reports' },
    { name: 'Communications', path: '/communications' },
    { name: 'Leads', path: '/leads' },
  ];

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar variant="dense">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', overflowX: 'auto' }}>
          {categories.map((category) => (
            <Button
              key={category.name}
              component={Link}
              to={category.path}
              color="inherit"
              sx={{ whiteSpace: 'nowrap' }}
            >
              {category.name}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default QuickAccessBar;