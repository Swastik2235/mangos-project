import { FC, useState } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";

interface Task {
  title: string;
  description: string;
  color?: string;
}

const tasks: Task[] = [
  { title: "Meeting with supplier", description: "8 AM - 10 AM", color: "#242A54" },
  { title: "Meeting with stakeholders", description: "10:30 AM - 12 PM", color: "#CDC6AE" },
  { title: "Discussion with the team", description: "4 PM - 5 PM", color: "#A3B4A2" }
];

const CalendarAndEvent: FC = () => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());

  const handleDateChange = (date: Dayjs | null) => {
    setSelectedDate(date);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputDate = dayjs(e.target.value, "YYYY-MM-DD");
    if (inputDate.isValid()) {
      setSelectedDate(inputDate);
    }
  };

  return (
    <Card
      sx={{
        boxShadow: `
          4px 4px 20px 0px #6F8CB069,
          -6px -6px 20px 0px #FFFFFF,
          2px 2px 4px 0px #728EAB1A`,
        background: "#E7EBF0",
        borderRadius: 2
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
            px: 1
          }}
        >
          <Typography variant="h3">Calendar and Events</Typography>
          <input
            type="date"
            value={selectedDate ? selectedDate.format("YYYY-MM-DD") : ""}
            onChange={handleInputChange}
            style={{
              boxShadow: "4px 4px 20px 0px #6F8CB069, -6px -6px 20px 0px #FFFFFF, 2px 2px 4px 0px #728EAB1A",
              backgroundColor: "#E7EBF0",
              color: "#000000",
              borderRadius: 4,
              padding: 6,
              border: "none"
            }}
          />
        </Box>

        <Box sx={{ display: "flex", gap: 4 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar value={selectedDate} onChange={handleDateChange} />
          </LocalizationProvider>

          {/* Upcoming Events */}
          <Box sx={{ width: "50%" }}>
            <Typography variant="h3" sx={{ mb: 2, color: "#1A1C1E" }}>
              Upcoming Event
            </Typography>
            {tasks.map((task, index) => (
              <Box
                key={index}
                sx={{
                  mb: 2,
                  paddingLeft: 2,
                  borderRadius: 0,
                  bgcolor: "#E7EBF0",
                  borderLeft: 3,
                  borderColor: task.color
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{ fontSize: 14, fontWeight: 500, color: "#1A1C1E" }}
                >
                  {task.title}
                </Typography>
                <Typography variant="h5" sx={{ color: "#6B7280" }}>
                  {task.description}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CalendarAndEvent;
