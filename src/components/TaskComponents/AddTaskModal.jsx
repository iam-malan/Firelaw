// AddTaskModal.jsx
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const AddTaskModal = ({ open, onClose, onAddTask, matters }) => {
  const [newTask, setNewTask] = useState({
    name: '',
    priority: 'Medium',
    dueDate: '',
    matter: '',
    assignedTo: '',
  });

  const handleChange = (event) => {
    setNewTask({ ...newTask, [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    onAddTask(newTask);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Task</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="normal"
          name="name"
          label="Task Name"
          value={newTask.name}
          onChange={handleChange}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Priority</InputLabel>
          <Select
            name="priority"
            value={newTask.priority}
            onChange={handleChange}
          >
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          margin="normal"
          name="dueDate"
          label="Due Date"
          type="date"
          value={newTask.dueDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Matter</InputLabel>
          <Select
            name="matter"
            value={newTask.matter}
            onChange={handleChange}
          >
            {matters.map((matter) => (
              <MenuItem key={matter.id} value={matter.id}>{matter.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          fullWidth
          margin="normal"
          name="assignedTo"
          label="Assigned To"
          value={newTask.assignedTo}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">Add Task</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTaskModal;