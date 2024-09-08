import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Typography, Paper, Grid, Tabs, Tab, Button } from '@mui/material';
import { Print, Edit } from '@mui/icons-material';

const MatterDetail = () => {
  const { matterId } = useParams();
  const [tabValue, setTabValue] = React.useState(0);

  // Mock data - in a real app, you'd fetch this based on matterId
  const matterData = {
    id: matterId,
    name: '[SAMPLE] John Doe Matter',
    number: '751-oDF47',
    statuteOfLimitations: 'Not Specified',
    contactInfo: {
      name: '[SAMPLE] John Doe',
      type: '(Client)'
    },
    opened: '09/07/2024',
    practiceArea: 'Not Specified',
    caseStage: 'Discovery',
    leadAttorney: 'Malan Bruwer',
    originatingAttorney: 'Not Specified',
    staff: 'Malan Bruwer (attorney)',
    description: 'This is a sample case that you can use to explore.',
    created: '09/07/2024 by: System (Default)',
    status: 'Created Yesterday, 9:08 pm by System (Default)',
    tasks: [
      { name: '[SAMPLE] Call John Doe', dueDate: '09/05/24', status: 'Overdue' },
      { name: '[SAMPLE] Prepare Docs', dueDate: '09/18/24', status: 'Upcoming' },
      { name: '[SAMPLE] Deadline to Submit Discovery', dueDate: '09/27/24', status: 'Upcoming' }
    ]
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4">{matterData.name}</Typography>
        <Box>
          <Button startIcon={<Print />}>Print</Button>
          <Button variant="outlined" startIcon={<Edit />}>Edit Case</Button>
        </Box>
      </Box>
      <Typography variant="subtitle1">{matterData.number} | Statute of Limitations: {matterData.statuteOfLimitations}</Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Contact Info:</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
              <Box sx={{ bgcolor: 'grey.300', width: 40, height: 40, borderRadius: '50%', mr: 2 }} />
              <Box>
                <Typography variant="subtitle1">{matterData.contactInfo.name}</Typography>
                <Typography variant="body2" color="textSecondary">{matterData.contactInfo.type}</Typography>
              </Box>
            </Box>
            <Typography variant="body2" sx={{ mt: 2 }}>
              <strong>Opened:</strong> {matterData.opened}
            </Typography>
            <Typography variant="body2">
              <strong>Practice Area:</strong> {matterData.practiceArea}
            </Typography>
            <Typography variant="body2">
              <strong>Case Stage:</strong> {matterData.caseStage}
            </Typography>
            <Typography variant="body2">
              <strong>Lead Attorney:</strong> {matterData.leadAttorney}
            </Typography>
            <Typography variant="body2">
              <strong>Originating Attorney:</strong> {matterData.originatingAttorney}
            </Typography>
            <Typography variant="body2">
              <strong>Staff:</strong> {matterData.staff}
            </Typography>
            <Typography variant="body2">
              <strong>Description:</strong> {matterData.description}
            </Typography>
            <Typography variant="body2">
              <strong>Created:</strong> {matterData.created}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={9}>
          <Paper sx={{ mb: 2 }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="matter tabs">
              <Tab label="Items & Info" />
              <Tab label="Time & Billing" />
              <Tab label="Communications" />
              <Tab label="Contacts & Staff" />
              <Tab label="Status Updates" />
            </Tabs>
          </Paper>
          {tabValue === 0 && (
            <Box>
              <Paper sx={{ p: 2, mb: 2 }}>
                <Typography variant="h6">Case Timeline by Stage - Days Open: 1</Typography>
                <Typography variant="body2">Opened: {matterData.opened}</Typography>
                {/* Add timeline visualization here */}
              </Paper>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">Case Information</Typography>
                {/* Add case information table here */}
              </Paper>
            </Box>
          )}
        </Grid>
      </Grid>
      <Paper sx={{ p: 2, mt: 2 }}>
        <Typography variant="h6">Tasks (next 30 days)</Typography>
        <Typography variant="h4">{matterData.tasks.length}</Typography>
        <Typography variant="body2">{matterData.tasks.filter(task => task.status === 'Overdue').length} Overdue</Typography>
        {matterData.tasks.map((task, index) => (
          <Typography key={index} variant="body2">{task.name} {task.dueDate}</Typography>
        ))}
      </Paper>
    </Box>
  );
};

export default MatterDetail;