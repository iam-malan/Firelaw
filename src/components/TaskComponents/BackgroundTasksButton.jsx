// BackgroundTasksButton.jsx
import React from 'react';
import { Button } from '@mui/material';

const BackgroundTasksButton = () => {
  return (
    <Button
      variant="contained"
      color="primary"
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        borderRadius: '24px',
      }}
    >
      Background Tasks
    </Button>
  );
};

export default BackgroundTasksButton;