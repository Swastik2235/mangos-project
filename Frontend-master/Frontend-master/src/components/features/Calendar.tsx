import { FC } from 'react';
import { useState } from "react";
import { Card, CardContent, Typography, Box, Grid,  } from '@mui/material';
import { format, startOfWeek, addDays, parse } from 'date-fns';
// import {  MoreVertical } from 'lucide-react';
interface Task {
  title: string;
  description: string;
  time: string;
  color?: string;
}

const tasks: Task[] = [
  {
    title: "Meeting with supplier",
    description: "9 AM - 10 AM",
    time: "9:00",
    color: "#242A54"
  },
  {
    title: "Meeting with stakeholders",
    description: "10:30 AM - 12PM",
    time: "10:30",
    color: "#CDC6AE"
  },
  {
    title: "Discussion with the team",
    description: "4 PM - 5 PM",
    time: "16:00",
    color: "#A3B4A2"
  }
];

const Calendar: FC = () => {
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(format(today, 'yyyy-MM-dd'));
  
  // Get the start of the week based on selected date
  const getWeekDays = (date: string) => {
    const parsedDate = date ? parse(date, 'yyyy-MM-dd', new Date()) : today;
    const weekStart = startOfWeek(parsedDate, { weekStartsOn: 1 });
    
    return [...Array(7)].map((_, index) => {
      const date = addDays(weekStart, index);
      return {
        dayName: format(date, 'EEE'),
        dayNumber: format(date, 'd'),
        fullDate: format(date, 'yyyy-MM-dd'),
        isToday: format(date, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd'),
        isSelected: format(date, 'yyyy-MM-dd') === selectedDate
      };
    });
  };

  const weekDays = getWeekDays(selectedDate);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  return (
    <Card sx={{ 
      height: '100%', 
      boxShadow: `
        4px 4px 20px 0px #6F8CB069,
        -6px -6px 20px 0px #FFFFFF,
        2px 2px 4px 0px #728EAB1A
      `,
      background: '#E7EBF0' 
    }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box sx={{display:'flex'}}> 
            {/* <IconButton size="small">
                  <MoreVertical size={20} />
                </IconButton> */}
              <Typography variant="h3" sx={{alignContent: "space-around"}}>Calendar and Events</Typography>
          </Box>
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            style={{
              boxShadow: '4px 4px 20px 0px #6F8CB069, -6px -6px 20px 0px #FFFFFF, 2px 2px 4px 0px #728EAB1A',
              backgroundColor: '#E7EBF0',
              color: '#000000',
              borderRadius: 4,
              padding: 6,
              border: 'none',
            }}
          />
        </Box>

        {/* Week View */}
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {weekDays.map((day) => (
            <Grid item xs key={day.dayName}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  p: 1,
                  borderRadius: 1,
                  bgcolor: day.isSelected 
                    ? 'primary.main'
                    : day.isToday 
                    ? 'primary.light'
                    : 'transparent',
                  color: (day.isSelected || day.isToday) ? 'white' : 'inherit',
                  fontSize: 12,
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: 'primary.light',
                    color: 'white'
                  }
                }}
                onClick={() => setSelectedDate(day.fullDate)}
              >
                <Typography variant="caption">{day.dayName}</Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                  {day.dayNumber}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Tasks */}
        <Box sx={{ mt: 2 }}>
          {tasks.map((task, index) => (
            <Box
              key={index}
              sx={{
                mt: 2,
                paddingLeft: 2,
                borderRadius: 0,
                bgcolor: 'background.default',
                borderLeft: 3,
                borderColor: task.color || 'primary.main',
              }}
            >
              <Typography variant="subtitle1" sx={{fontSize: 14, fontWeight: 500}}>
                {task.title}
              </Typography>
              <Typography variant="h5" color="text.secondary">
                {task.description}
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default Calendar;