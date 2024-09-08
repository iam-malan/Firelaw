// TaskManager.jsx
import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Switch, 
  FormControlLabel 
} from '@mui/material';
import TaskFilters from './TaskComponents/TaskFilters';
import TaskList from './TaskComponents/TaskList';
import AddTaskModal from './TaskComponents/AddTaskModal';
import BackgroundTasksButton from './TaskComponents/BackgroundTasksButton';

// Sample matters (you can move this to a separate file later)
const sampleMatters = [
  { id: 1, name: '[SAMPLE] John Doe Matter' },
  { id: 2, name: 'Potential Case: [SAMPLE] Jane Doe' },
];

// Initial tasks (you can move this to a separate file later)
const initialTasks = [
  {
    id: 1,
    name: '[SAMPLE] Call John Doe Back',
    status: 'Overdue',
    priority: 'Medium',
    dueDate: '2024-09-06',
    matter: sampleMatters[0],
    assignedTo: 'Malan Bruwer',
    completed: false,
  },
  {
    id: 2,
    name: '[SAMPLE] Collect Intake Form',
    status: 'Incomplete',
    priority: 'Medium',
    dueDate: '2024-09-13',
    matter: sampleMatters[1],
    assignedTo: 'Malan Bruwer',
    completed: false,
  },
  // Add more sample tasks as needed
];

const TaskManager = () => {
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
    applyFilters();
  }, [tasks, filters, showUnreadOnly]);

  const applyFilters = () => {
    let filtered = tasks;
    if (filters.assignedTo) {
      filtered = filtered.filter(task => task.assignedTo === filters.assignedTo);
    }
    if (filters.completionStatus === 'Incomplete') {
      filtered = filtered.filter(task => !task.completed);
    } else if (filters.completionStatus === 'Complete') {
      filtered = filtered.filter(task => task.completed);
    }
    if (filters.byCase) {
      filtered = filtered.filter(task => task.matter.id === filters.byCase);
    }
    // Implement date filtering logic here
    if (showUnreadOnly) {
      filtered = filtered.filter(task => !task.read);
    }
    setFilteredTasks(filtered);
  };

  const handleAddTask = (newTask) => {
    setTasks([...tasks, { ...newTask, id: tasks.length + 1, completed: false, read: false }]);
    setIsAddTaskModalOpen(false);
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const markAllAsRead = () => {
    setTasks(tasks.map(task => ({ ...task, read: true })));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Task Manager</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Button variant="contained" color="primary" onClick={() => setIsAddTaskModalOpen(true)}>
          Add Task
        </Button>
        <Button variant="outlined" onClick={markAllAsRead}>Mark all as read</Button>
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

      <TaskList 
        tasks={filteredTasks} 
        onToggleCompletion={toggleTaskCompletion}
        onDeleteTask={deleteTask}
      />

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

export default TaskManager;