import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Checkbox, 
  List, 
  ListItem, 
  ListItemText 
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import fullscreenIcon from "../../assets/fullscreen.png";
import filterIcon from "../../assets/Filter.png";
import TaskModal from './TaskModal';

// Common styles for the container
const commonStyles = {
  boxShadow: `
    4px 4px 20px 0px #6F8CB069,
    -6px -6px 20px 0px #FFFFFF,
    2px 2px 4px 0px #728EAB1A
  `,
  background: '#E7EBF0',
  borderRadius: '10px',
  padding: '24px',
};

// Interface for Task
interface Task {
  id: number;
  title: string;
  completed: boolean;
  dueDate: string;
  progress: number;
}

// Interface for Form Data
interface FormData {
  [key: string]: string;
}

const TaskManager: React.FC = () => {
  // State for date range
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // State for modal
  const [open, setOpen] = useState(false);

  // State for tasks
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Design System Update', completed: false, dueDate: '2024-02-28', progress: 75 },
    { id: 2, title: 'Frontend Development', completed: true, dueDate: '2024-02-25', progress: 100 },
    { id: 3, title: 'API Integration', completed: false, dueDate: '2024-03-01', progress: 30 },
  ]);

  // State for form data
  const [formData, setFormData] = useState<FormData>({
    taskName: '',
    dataset: '',
    startDate: '',
    endDate: '',
    assignTo: '',
    status: ''
  });

  // Predefined lists
  const datasets = ['Galva. Job Card', 'Project Alpha', 'System Beta'];
  const statuses = ['Not Started', 'In Progress', 'Completed', 'On Hold'];
  const users = [
    { name: 'Ameya Kulde', role: 'Galva. Plant Head' },
    { name: 'John Doe', role: 'Developer' },
    { name: 'Jane Smith', role: 'Designer' }
  ];

  // Modal handlers
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Form change handler
  const handleChange = (field: string) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent
  ) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  // Submit handler
  const handleSubmit = () => {
    const newTask: Task = {
      id: tasks.length + 1,
      title: formData.taskName,
      completed: false,
      dueDate: formData.endDate,
      progress: 0
    };
    
    setTasks([...tasks, newTask]);
    setFormData({
      taskName: '',
      dataset: '',
      startDate: '',
      endDate: '',
      assignTo: '',
      status: ''
    });
    handleClose();
  };

  // Task toggle handler
  const handleToggleTask = (taskId: number) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { ...task, completed: !task.completed } 
          : task
      )
    );
  };



  //Task Toggle Handler//

  return (
    <Box sx={commonStyles}>
      {/* Header Section */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        mb: 2,
      }}>
        <Typography variant="h3">Task Manager</Typography>

        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 2,
        }}>
          {/* Date Range Picker */}
          <Box style={{
            backgroundColor: '#E7EBF0',
            color: '#000000',
            borderRadius: 4,
            padding: 6,
            border: 'none',
          }}>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={{
                backgroundColor: '#E7EBF0',
                color: '#000000',
                borderRadius: 4,
                padding: 6,
                border: 'none',
              }}
            /> - 
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              style={{
                backgroundColor: '#E7EBF0',
                color: '#000000',
                borderRadius: 4,
                padding: 6,
                border: 'none',
              }}
            />
          </Box>

          {/* Filter and Fullscreen Icons */}
          <Box
            component="img"
            src={filterIcon}
            sx={{ width: 15, height: 10 }}
          />

          <Box sx={{
            width: 34,
            height: 34,
            backgroundColor: "transparent",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}>
            <img
              src={fullscreenIcon}
              alt="Fullscreen"
              style={{ width: "24px", height: "24px" }}
            />
          </Box>
        </Box>
      </Box>

      {/* Add Task Section */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        mb: 2 
      }}>
        <Typography sx={{fontSize: 14, fontWeight: 600}}>Major Tasks</Typography>
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1, 
            bgcolor: '#E7EBF0', 
            borderRadius: 2, 
            px: 2, 
            py: 1,
            cursor: 'pointer',
          }}
          onClick={handleOpen}
        >
          <Box
            component="img"
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cline x1='12' y1='5' x2='12' y2='19'%3E%3C/line%3E%3Cline x1='5' y1='12' x2='19' y2='12'%3E%3C/line%3E%3C/svg%3E"
            sx={{ width: 12, height: 12 }}
          />
          <Typography sx={{fontSize: 14}}>Add task</Typography>
        </Box>
      </Box>

      {/* Task Modal */}
      <TaskModal
        open={open}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        formData={formData}
        handleChange={handleChange}
        fields={[
          {
            name: 'taskName',
            type: 'text',
            label: 'Task name',
            placeholder: 'Task name'
          },
          {
            name: 'dataset',
            type: 'select',
            label: 'Dataset associated',
            options: datasets
          },
          {
            name: 'startDate',
            type: 'date',
            label: 'Start date'
          },
          {
            name: 'endDate',
            type: 'date',
            label: 'End date'
          },
          {
            name: 'assignTo',
            type: 'select',
            label: 'Assign to',
            options: users.map(user => ({
              value: user.name,
              label: user.name,
              secondaryLabel: user.role
            }))
          },
          {
            name: 'status',
            type: 'select',
            label: 'Status',
            options: statuses
          }
        ]}
      />
 
     
      {/* View subtask */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        mb: 2,
        borderBottom: '1px solid #00000020'
      }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}>
          <Typography sx={{ fontSize: 14, fontWeight: 500, color: '#505576' }}>Galva. Job Card</Typography>
          <Box sx={{backgroundColor:'#242A54', color:'white', borderRadius:'76px',fontSize:'12px', paddingLeft:'6px', paddingRight:'6px'}}>Completed</Box>
        </Box>

        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1, 
          bgcolor: '#E7EBF0', 
          borderRadius: 2, 
          px: 2, 
          py: 1,
          cursor: 'pointer',
          '&:hover': {
            bgcolor: '#D1D5DB',
          },
        }}>
          <Typography sx={{fontSize: 12, fontWeight: 500}}>View subtask</Typography>
          <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M18.425 10.271C19.499 8.967 18.57 7 16.88 7H7.12c-1.69 0-2.618 1.967-1.544 3.271l4.881 5.927a2 2 0 0 0 3.088 0l4.88-5.927Z" clipRule="evenodd"/>
          </svg>
        </Box>
      </Box>

      {/* Add SubTask Section */}
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        mb: 0 
      }}>
        <Typography sx={{fontSize: 14, fontWeight: 600}}>Sub Tasks</Typography>
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 1, 
            bgcolor: '#E7EBF0', 
            borderRadius: 2, 
            px: 2, 
            py: 1,
            cursor: 'pointer',
          }}
          onClick={handleOpen}
        >
          <Box
            component="img"
            src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cline x1='12' y1='5' x2='12' y2='19'%3E%3C/line%3E%3Cline x1='5' y1='12' x2='19' y2='12'%3E%3C/line%3E%3C/svg%3E"
            sx={{ width: 12, height: 12 }}
          />
          <Typography sx={{fontSize: 14}}>Add subtask</Typography>
        </Box>
      </Box>

      {/* Task List */}
      <List sx={{ padding: 0 ,fontSize:'12px' }}>
        {tasks.map((task) => (
          <ListItem
            key={task.id}
            sx={{
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: 0,
              fontSize:'12px'
            }}
          >
            <Box sx={{ display: 'flex', width: '100%', alignItems: 'center'}}>
              <Checkbox 
                checked={task.completed}
                onChange={() => handleToggleTask(task.id)}
                sx={{fontSize:12 }}
              />
              <ListItemText primary={task.title} sx={{color: '#505576', fontSize:12}} />
            </Box>
          </ListItem>
        ))}
      </List>

      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        mb: 2,
        borderBottom: '1px solid #00000020'
      }}>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}>
          <Typography sx={{ fontSize: 14, fontWeight: 500, color: '#505576' }}>Consignment initiation</Typography>
        </Box>

        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1, 
          bgcolor: '#E7EBF0', 
          borderRadius: 2, 
          px: 2, 
          py: 1,
          cursor: 'pointer',
          '&:hover': {
            bgcolor: '#D1D5DB',
          },
        }}>
          <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M18.425 10.271C19.499 8.967 18.57 7 16.88 7H7.12c-1.69 0-2.618 1.967-1.544 3.271l4.881 5.927a2 2 0 0 0 3.088 0l4.88-5.927Z" clipRule="evenodd"/>
          </svg>
        </Box>
      </Box>
    </Box>
  );
};

export default TaskManager;