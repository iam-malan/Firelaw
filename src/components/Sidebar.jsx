import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Box, Button, IconButton } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Link } from 'react-router-dom';
import {
  Dashboard as DashboardIcon,
  Event as CalendarIcon,
  Assignment as TasksIcon,
  Folder as MattersIcon,
  Contacts as ContactsIcon,
  AccessTime as ActivitiesIcon,
  AttachMoney as BillingIcon,
  AccountBalance as AccountsIcon,
  Description as DocumentsIcon,
  Chat as CommunicationsIcon,
  BarChart as ReportsIcon,
  Help as ResourceCentreIcon,
  Add as AddIcon,
} from '@mui/icons-material';

const menuItems = [
  { text: 'Dashboard', icon: DashboardIcon, path: '/' },
  { text: 'Calendar', icon: CalendarIcon, path: '/calendar' },
  { text: 'Tasks', icon: TasksIcon, path: '/tasks' },
  { text: 'Matters', icon: MattersIcon, path: '/matters' },
  { text: 'Contacts', icon: ContactsIcon, path: '/contacts' },
  { text: 'Activities', icon: ActivitiesIcon, path: '/activities' },
  { text: 'Billing', icon: BillingIcon, path: '/billing' },
  { text: 'Accounts', icon: AccountsIcon, path: '/accounts' },
  { text: 'Documents', icon: DocumentsIcon, path: '/documents' },
  { text: 'Communications', icon: CommunicationsIcon, path: '/communications' },
  { text: 'Reports', icon: ReportsIcon, path: '/reports' },
];

const Sidebar = ({ open, onClose }) => {
  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          backgroundColor: '#1a237e', // Dark blue color
          color: 'white',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', p: 1 }}>
        <IconButton onClick={onClose} sx={{ color: 'white' }}>
          <ChevronLeftIcon />
        </IconButton>
      </Box>
      <Box sx={{ overflow: 'auto', display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box sx={{ p: 2 }}>
          <Button
            component={Link}
            to="/new-matter"
            variant="contained"
            startIcon={<AddIcon />}
            fullWidth
            sx={{ 
              backgroundColor: '#4caf50', // Green color
              '&:hover': {
                backgroundColor: '#45a049', // Darker green on hover
              }
            }}
          >
            New Matter
          </Button>
        </Box>
        <List>
          {menuItems.map((item) => (
            <ListItem button key={item.text} component={Link} to={item.path}>
              <ListItemIcon sx={{ color: 'white' }}>
                <item.icon />
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
        <Box sx={{ mt: 'auto', p: 2 }}>
          <ListItem button component={Link} to="/resource-centre">
            <ListItemIcon sx={{ color: 'white' }}>
              <ResourceCentreIcon />
            </ListItemIcon>
            <ListItemText primary="Resource centre" />
          </ListItem>
          <Typography variant="subtitle1" sx={{ mt: 2, textAlign: 'center' }}>
            Malan Bruwer
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;