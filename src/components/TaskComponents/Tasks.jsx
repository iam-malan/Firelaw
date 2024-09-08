// Tasks.jsx
import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Switch, FormControlLabel } from '@mui/material';
import TaskFilters from './TaskFilters';
import TaskList from './TaskList';
import AddTaskModal from './AddTaskModal';
import BackgroundTasksButton from './BackgroundTasksButton';

// Mock data for cases/matters
const sampleMatters = [
  { id: 1, name: '[SAMPLE] John Doe Matter' },
  { id: 2, name: 'Potential Case: [SAMPLE] Jane Doe' },
  // Add more sample matters as needed
];

// Mock data for tasks
const initialTasks = [
  {
    id: 1,
    name: '[SAMPLE] Call John Doe Back',
    status: 'Overdue',
    priority: 'Medium',
    dueDate: '2024-09-06',
    matter: sampleMatters[0],
    assignedTo: 'Malan Bruwer',
    subtasks: [],
  },
  {
    id: 2,
    name: '[SAMPLE] Collect Intake Form',
    status: 'Incomplete',
    priority: 'Medium',
    dueDate: '2024-09-13',
    matter: sampleMatters[1],
    assignedTo: 'Malan Bruwer',
    subtasks: [],
  },
  // Add more sample tasks as needed
];

const Tasks = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [filteredTasks, setFilteredTasks] = useState(initialTasks);
  const [filters, setFilters] = useState({
    assignedTo: '',
    completionStatus: 'Incomplete',
    byCase: '',
    dueDate: 'All time',
  });
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  useEffect(() => {
    // Apply filters whenever tasks or filters change
    applyFilters();
  }, [tasks, filters, showUnreadOnly]);

  const applyFilters = () => {
    // Implement filter logic here
    let filtered = tasks;
    // Add filter conditions based on the 'filters' state
    setFilteredTasks(filtered);
  };

  const handleAddTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: tasks.length + 1 }]);
    setIsAddTaskModalOpen(false);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Tasks</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Button variant="contained" color="primary" onClick={() => setIsAddTaskModalOpen(true)}>
          Add Task
        </Button>
        <Button variant="outlined">Mark all as read</Button>
        <Button variant="outlined">Export</Button>
      </Box>

      <TaskFilters filters={filters} setFilters={setFilters} matters={sampleMatters} />

      <FormControlLabel
        control={
          <Switch
            checked={showUnreadOnly}
            onChange={(e) => setShowUnreadOnly(e.target.checked)}
          />
        }
        label="Show unread tasks only"
      />

      <TaskList tasks={filteredTasks} />

      <AddTaskModal
        open={isAddTaskModalOpen}
        onClose={() => setIsAddTaskModalOpen(false)}
        onAddTask={handleAddTask}
        matters={sampleMatters}
      />

      <BackgroundTasksButton />
    </Box>
  );
};

export default Tasks;