import React, { useState, useEffect } from 'react';
import { Grid, Paper, Typography, Button, Box, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import AddItemBar from './AddItemBar';
import AddDocumentModal from './AddDocumentModal';
import UploadDocumentModal from './UploadDocumentModal';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAddDocumentModalOpen, setIsAddDocumentModalOpen] = useState(false);
  const [isUploadDocumentModalOpen, setIsUploadDocumentModalOpen] = useState(false);

  // Simulated API call with mock data
  const fetchDashboardData = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          tasksToday: Math.floor(Math.random() * 5),
          eventsToday: Math.floor(Math.random() * 3),
          billableHoursTarget: 40,
          currentBillableHours: Math.floor(Math.random() * 40),
          draftBills: Math.floor(Math.random() * 5),
          totalInDraft: Math.floor(Math.random() * 5000),
          unpaidBills: Math.floor(Math.random() * 3),
          totalUnpaid: Math.floor(Math.random() * 10000),
        });
      }, 1000); // Simulate network delay
    });
  };

  useEffect(() => {
    fetchDashboardData().then((data) => {
      setDashboardData(data);
      setLoading(false);
    });
  }, []);

  const handleDocumentClick = () => {
    setIsAddDocumentModalOpen(true);
  };

  const handleUploadSingle = () => {
    setIsAddDocumentModalOpen(false);
    setIsUploadDocumentModalOpen(true);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <AddItemBar onDocumentClick={handleDocumentClick} />
      <Typography variant="h4" gutterBottom>Personal Dashboard</Typography>
      <Grid container spacing={3}>
        {/* Today's Agenda */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Today's Agenda</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1">{dashboardData.tasksToday} Tasks Due Today</Typography>
                <Typography variant="body2">
                  {dashboardData.tasksToday > 0
                    ? `You have ${dashboardData.tasksToday} task(s) due today`
                    : 'You have no tasks due today'}
                </Typography>
                {dashboardData.tasksToday > 0 && (
                  <Button component={Link} to="/tasks" variant="outlined" sx={{ mt: 1 }}>
                    View Tasks
                  </Button>
                )}
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1">{dashboardData.eventsToday} Calendar Events</Typography>
                <Typography variant="body2">
                  {dashboardData.eventsToday > 0
                    ? `You have ${dashboardData.eventsToday} event(s) scheduled for today`
                    : 'You have no events scheduled for today'}
                </Typography>
                {dashboardData.eventsToday > 0 && (
                  <Button component={Link} to="/calendar" variant="outlined" sx={{ mt: 1 }}>
                    View Calendar
                  </Button>
                )}
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Hourly Metrics */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Hourly Metrics for Malan Bruwer</Typography>
            <Typography variant="subtitle1">Billable Hours Target: {dashboardData.billableHoursTarget} hours</Typography>
            <Typography variant="body2">Current billable hours: {dashboardData.currentBillableHours} hours</Typography>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/billing"
              sx={{ mt: 2 }}
            >
              Log Hours
            </Button>
          </Paper>
        </Grid>

        {/* Billing Metrics */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Billing Metrics for Firm</Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="subtitle1">Draft Bills</Typography>
                <Typography variant="h4">{dashboardData.draftBills}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1">Total in Draft</Typography>
                <Typography variant="h4">${dashboardData.totalInDraft}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1">Unpaid Bills</Typography>
                <Typography variant="h4">{dashboardData.unpaidBills}</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="subtitle1">Total in Unpaid</Typography>
                <Typography variant="h4">${dashboardData.totalUnpaid}</Typography>
              </Grid>
            </Grid>
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to="/billing"
              sx={{ mt: 2 }}
            >
              Manage Billing
            </Button>
          </Paper>
        </Grid>
      </Grid>

      <AddDocumentModal 
        isOpen={isAddDocumentModalOpen} 
        onClose={() => setIsAddDocumentModalOpen(false)}
        onUploadSingle={handleUploadSingle}
      />
      <UploadDocumentModal 
        isOpen={isUploadDocumentModalOpen} 
        onClose={() => setIsUploadDocumentModalOpen(false)} 
      />
    </Box>
  );
};

export default Dashboard;
