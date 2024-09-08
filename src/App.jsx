import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, AppBar, Toolbar, Typography, Box, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import Dashboard from './components/Dashboard';
import NewMatter from './components/NewMatter';
import Sidebar from './components/Sidebar';
import Calendar from './components/Calendar';
import Tasks from './components/TaskComponents/Tasks';
import Matters from './components/Matters';
import MatterDetail from './components/MatterDetail';
import Documents from './components/Documents';
import QuickAccessBar from './components/QuickAccessBar';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Router>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={toggleSidebar}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Firelaw
            </Typography>
          </Toolbar>
        </AppBar>
        <QuickAccessBar />
        <Box sx={{ display: 'flex', flexGrow: 1 }}>
          <Sidebar open={sidebarOpen} onClose={toggleSidebar} />
          <Box component="main" sx={{ flexGrow: 1, p: 3, width: '100%' }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/new-matter" element={<NewMatter />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/matters" element={<Matters />} />
              <Route path="/matters/:matterId" element={<MatterDetail />} />
              <Route path="/documents" element={<Documents />} />
            </Routes>
          </Box>
        </Box>
      </Box>
    </Router>
  );
}

export default App;