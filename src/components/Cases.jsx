import React, { useState } from 'react';
import { 
  Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Tabs, Tab, TextField, Select, MenuItem, Switch, FormControlLabel
} from '@mui/material';
import { Print, Edit, Add } from '@mui/icons-material';

const mockCases = [
  {
    id: 1,
    case: '[SAMPLE] John Doe Matter',
    number: '751-oDF47',
    stage: 'Discovery',
    members: 'Malan Bruwer (Lead Attorney)',
    nextEvent: '[SAMPLE] In-Office Discover...',
    nextEventDate: 'Sep 20 7:00 pm - 10:00 pm',
    nextTask: '[SAMPLE] Prepare Docs',
    nextTaskDate: 'Sep 19',
    statusUpdate: 'Created Today, 9:08 pm by System (Default)',
    added: 'Today by System (Default)',
  },
  {
    id: 2,
    case: 'Danny v Peach',
    number: '1234/24',
    stage: 'Discovery',
    members: 'Malan Bruwer (Lead Attorney)',
    nextEvent: '',
    nextEventDate: '',
    nextTask: '',
    nextTaskDate: '',
    statusUpdate: 'No Status Updates',
    added: 'Today by Malan Bruwer',
  },
];

const Cases = () => {
  const [tabValue, setTabValue] = useState(0);
  const [showMyCases, setShowMyCases] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Cases" />
          <Tab label="Practice Areas" />
          <Tab label="Case Insights" />
        </Tabs>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4">Cases</Typography>
        <Box>
          <Button startIcon={<Print />}>Print</Button>
          <Button>Actions</Button>
          <Button variant="contained" color="primary" startIcon={<Add />}>Add Case</Button>
        </Box>
      </Box>

      <Paper sx={{ p: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Select value="" displayEmpty>
              <MenuItem value="" disabled>Practice Area</MenuItem>
            </Select>
            <Select value="" displayEmpty>
              <MenuItem value="" disabled>Lead Attorney</MenuItem>
            </Select>
            <Select value="" displayEmpty>
              <MenuItem value="" disabled>Case Stage</MenuItem>
            </Select>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <FormControlLabel
              control={<Switch checked={showMyCases} onChange={() => setShowMyCases(!showMyCases)} />}
              label="Show Only My Cases"
            />
            <Button variant="contained" color="primary">Apply Filters</Button>
            <Button>Clear Filters</Button>
          </Box>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox"></TableCell>
                <TableCell>CASE</TableCell>
                <TableCell>NUMBER</TableCell>
                <TableCell>CASE STAGE</TableCell>
                <TableCell>FIRM MEMBERS</TableCell>
                <TableCell>NEXT EVENT</TableCell>
                <TableCell>NEXT TASK</TableCell>
                <TableCell>STATUS UPDATE</TableCell>
                <TableCell>ADDED</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockCases.map((row) => (
                <TableRow key={row.id}>
                  <TableCell padding="checkbox"></TableCell>
                  <TableCell>{row.case}</TableCell>
                  <TableCell>{row.number}</TableCell>
                  <TableCell>{row.stage}</TableCell>
                  <TableCell>{row.members}</TableCell>
                  <TableCell>
                    {row.nextEvent}<br/>
                    {row.nextEventDate}
                  </TableCell>
                  <TableCell>
                    {row.nextTask}<br/>
                    {row.nextTaskDate}
                  </TableCell>
                  <TableCell>{row.statusUpdate}</TableCell>
                  <TableCell>{row.added}</TableCell>
                  <TableCell>
                    <Button><Edit /></Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default Cases;