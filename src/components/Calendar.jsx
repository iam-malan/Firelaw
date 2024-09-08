import React, { useState, useCallback } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

// Setup the localizer for react-big-calendar
const localizer = momentLocalizer(moment);

// Mock events - replace with API call in production
const initialEvents = [
  {
    id: 1,
    title: 'Client Meeting',
    start: new Date(2024, 8, 10, 10, 0), // Note: month is 0-indexed
    end: new Date(2024, 8, 10, 11, 0),
  },
  {
    id: 2,
    title: 'Court Hearing',
    start: new Date(2024, 8, 15, 14, 0),
    end: new Date(2024, 8, 15, 16, 0),
  },
];

const Calendar = () => {
  const [events, setEvents] = useState(initialEvents);
  const [newEvent, setNewEvent] = useState({ title: '', start: null, end: null });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSelectSlot = useCallback(
    ({ start, end }) => {
      setNewEvent({ title: '', start, end });
      setIsDialogOpen(true);
    },
    []
  );

  const handleSelectEvent = useCallback(
    (event) => {
      window.alert(event.title);
    },
    []
  );

  const handleDialogClose = () => {
    setIsDialogOpen(false);
    setNewEvent({ title: '', start: null, end: null });
  };

  const handleAddEvent = () => {
    if (newEvent.title) {
      setEvents([...events, { ...newEvent, id: events.length + 1 }]);
      handleDialogClose();
    }
  };

  return (
    <Box sx={{ height: 'calc(100vh - 100px)', p: 3 }}>
      <Typography variant="h4" gutterBottom>Calendar</Typography>
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        selectable
      />
      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Add New Event</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Event Title"
            type="text"
            fullWidth
            variant="standard"
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleAddEvent}>Add</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Calendar;