import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { format } from 'date-fns';

function DatePickerComponent() {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // Default to today’s date
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        bgcolor: '#E7EBF0',
        borderRadius: 2,
        px: 2,
        py: 1,
        boxShadow: '4px 4px 20px 0px #6F8CB069,-6px -6px 20px 0px #FFFFFF,2px 2px 4px 0px #728EAB1A',
        cursor: 'pointer',
      }}
      onClick={() => setIsEditing(true)} // Show input on click
    >
      <Box
        component="img"
        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='4' width='18' height='18' rx='2' ry='2'%3E%3C/rect%3E%3Cline x1='16' y1='2' x2='16' y2='6'%3E%3C/line%3E%3Cline x1='8' y1='2' x2='8' y2='6'%3E%3C/line%3E%3Cline x1='3' y1='10' x2='21' y2='10'%3E%3C/line%3E%3C/svg%3E"
        sx={{ width: 20, height: 20 }}
      />
      {!isEditing ? (
        <Typography>{format(new Date(date), 'dd MMM yy')}</Typography>
      ) : (
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          onBlur={() => setIsEditing(false)} // Hide input when it loses focus
          style={{
            boxShadow: '4px 4px 20px 0px #6F8CB069, -6px -6px 20px 0px #FFFFFF, 2px 2px 4px 0px #728EAB1A',
            backgroundColor: '#E7EBF0',
            color: '#000000',
            borderRadius: 4,
            padding: 6,
            border: 'none',
          }}
          autoFocus // Automatically focus the input when it's displayed
        />
      )}
      <Box
        component="img"
        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E"
        sx={{ width: 20, height: 20 }}
      />
    </Box>
  );
}

export default DatePickerComponent;
