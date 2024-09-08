// TaskList.jsx
import React from 'react';
import { Box, Typography, Checkbox, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const TaskList = ({ tasks }) => {
  const groupedTasks = tasks.reduce((acc, task) => {
    const group = task.status === 'Overdue' ? 'Overdue' : `Due ${task.dueDate}`;
    if (!acc[group]) acc[group] = [];
    acc[group].push(task);
    return acc;
  }, {});

  return (
    <Box>
      {Object.entries(groupedTasks).map(([group, groupTasks]) => (
        <Box key={group} sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ bgcolor: 'background.paper', p: 1 }}>{group}</Typography>
          {groupTasks.map((task) => (
            <Box key={task.id} sx={{ display: 'flex', alignItems: 'center', p: 1, borderBottom: '1px solid #eee' }}>
              <Checkbox />
              <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-between' }}>
                <Typography>{task.name}</Typography>
                <Typography>{task.priority}</Typography>
                <Typography>{task.dueDate}</Typography>
                <Typography>{task.matter.name}</Typography>
                <Typography>{task.assignedTo}</Typography>
              </Box>
              <IconButton><EditIcon /></IconButton>
              <IconButton><DeleteIcon /></IconButton>
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default TaskList;