import { FC } from "react";
import React, { useState } from 'react';
import { Grid, Box, Typography, Button} from "@mui/material";
import {  Plus } from "lucide-react";
import TaskTable from '../../components/molecules/lists/TaskTable';
import TaskModal from "../../components/features/TaskModal";
import { SelectChangeEvent } from '@mui/material/Select';

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
const TaskManager: FC = () => {
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
  
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12}>
       <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between" }}>
        <Typography sx={{ fontSize:"14px" }}>
          Task Manager Table
        </Typography>

        <Button
          variant="contained"
          fullWidth
          startIcon={<Plus size={18} />}
          sx={{
            textTransform: "none",
            borderRadius: "10px",
            width: 180,
            py: 1,
            background: "linear-gradient(272.72deg, #2564E6 0.57%, rgba(37, 100, 230, 0.73) 100%)",
            "&:hover": {
              background: "linear-gradient(272.72deg, #2564E6 0.57%, rgba(37, 100, 230, 0.8) 100%)",
            },
          }}
          onClick={handleOpen}
        >
          Add Task
        </Button>
      </Box>
      {/* TASK */}
      {/* <TaskModal
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
      /> */}

      {/* SUBTASK */}
      <TaskModal
        open={open}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        formData={formData}
        handleChange={handleChange}
        title="Add Subtask"
        mainTasks={[
          { value: 'task1', label: 'Main Task 1' },
          { value: 'task2', label: 'Main Task 2' },
        ]}
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
        primaryButtonText="Add Subtask"
        secondaryButtonText="Cancel"
      />

      </Grid>

       {/* Graphs and Calendar */}
       <Grid item xs={12} md={12}>
         <TaskTable/>
      </Grid>
      
    </Grid>
  );
};

export default TaskManager;
