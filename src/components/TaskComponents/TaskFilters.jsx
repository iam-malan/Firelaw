// TaskFilters.jsx
import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';

const TaskFilters = ({ filters, setFilters, matters }) => {
  const handleFilterChange = (event) => {
    setFilters({ ...filters, [event.target.name]: event.target.value });
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
      <FormControl fullWidth>
        <InputLabel>Assigned To</InputLabel>
        <Select
          name="assignedTo"
          value={filters.assignedTo}
          onChange={handleFilterChange}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Me">Me</MenuItem>
          {/* Add more options as needed */}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Completion Status</InputLabel>
        <Select
          name="completionStatus"
          value={filters.completionStatus}
          onChange={handleFilterChange}
        >
          <MenuItem value="Incomplete">Incomplete</MenuItem>
          <MenuItem value="Complete">Complete</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>By Case / Lead</InputLabel>
        <Select
          name="byCase"
          value={filters.byCase}
          onChange={handleFilterChange}
        >
          <MenuItem value="">All</MenuItem>
          {matters.map((matter) => (
            <MenuItem key={matter.id} value={matter.id}>{matter.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Due Date</InputLabel>
        <Select
          name="dueDate"
          value={filters.dueDate}
          onChange={handleFilterChange}
        >
          <MenuItem value="All time">All time</MenuItem>
          <MenuItem value="Today">Today</MenuItem>
          <MenuItem value="This week">This week</MenuItem>
          <MenuItem value="This month">This month</MenuItem>
        </Select>
      </FormControl>

      <Button variant="contained" color="primary" onClick={() => setFilters({
        assignedTo: '',
        completionStatus: 'Incomplete',
        byCase: '',
        dueDate: 'All time',
      })}>
        Clear Filters
      </Button>
    </Box>
  );
};

export default TaskFilters;