import React, { useState } from 'react';
import {
  Box,
  TextField,
  Typography,
  Button,
  Paper,
  Container,
  Grid
} from '@mui/material';

const EventForm = () => {
  const [forms, setForms] = useState({
    eventName: '',
    eventDate: '',
    startTime: '',
    endTime: '',
    eventVenue: '',
    eventDescription: '',
    availableTickets: '',
    price: '',
    userId: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForms(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try{
        const apiCall = await fetch('http://localhost:3000/events/createEvent',{
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(forms),    
    })

    const data = await apiCall.json()
    }catch(err){
        console.error('Error:', err);
    }
  };

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: '#f4f6f8' }}>
  {/* Top banner */}
  <Box
    sx={{
      backgroundImage: `url('/p1.png')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: 250,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
  </Box>

  {/* Form Section */}
  <Container maxWidth="sm">
    <Paper
      elevation={4}
      sx={{
        p: 4,
        mt: -6,
        borderRadius: 3,
        backgroundColor: 'white',
      }}
    >
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Event Name"
              name="eventName"
              value={forms.eventName}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Event Date"
              type="date"
              name="eventDate"
              value={forms.eventDate}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Venue"
              name="eventVenue"
              value={forms.eventVenue}
              onChange={handleChange}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Start Time"
              type="time"
              name="startTime"
              value={forms.startTime}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="End Time"
              type="time"
              name="endTime"
              value={forms.endTime}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Description"
              name="eventDescription"
              value={forms.eventDescription}
              onChange={handleChange}
              fullWidth
              multiline
              rows={4}
              placeholder="Describe your event..."
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              label="Available Tickets"
              name="availableTickets"
              value={forms.availableTickets}
              onChange={handleChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Price (₹)"
              name="price"
              value={forms.price}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="User ID"
              name="userId"
              value={forms.userId}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          {/* Submit */}
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ py: 1.5, fontWeight: 'bold' }}
            >
              Create Event
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  </Container>
</Box>

  );
};

export default EventForm;
