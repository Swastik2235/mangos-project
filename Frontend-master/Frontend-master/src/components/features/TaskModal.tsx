import React from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  Button,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

// Define a more flexible interface for form data
interface FormData {
  [key: string]: string;
}

// Define prop types with more flexibility
interface TaskModalProps {
  open: boolean;
  handleClose: () => void;
  handleSubmit: () => void;
  formData: FormData;
  handleChange: (
    field: string
  ) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => void;
  fields?: {
    name: string;
    type: 'text' | 'select' | 'date';
    label: string;
    options?: string[] | { value: string; label: string; secondaryLabel?: string }[];
    placeholder?: string;
  }[];
  title?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  mainTasks?: { value: string; label: string }[]; // Optional list of main tasks for the subtask modal
}

const TaskModal: React.FC<TaskModalProps> = ({
  open,
  handleClose,
  handleSubmit,
  formData,
  handleChange,
  fields = [],
  title = 'Add Task',
  primaryButtonText = 'Proceed',
  secondaryButtonText = 'Cancel',
  mainTasks = [], // Pass main tasks as a prop when adding a subtask
}) => {
  const modalStyle = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%', // Use a responsive width
    maxWidth: '800px', // Set a maximum width for larger screens
    bgcolor: 'background.default',
    borderRadius: 2,
    boxShadow: 24,
    p: { xs: 2, sm: 4 }, // Responsive padding
  };

  const inputStyles = {
    '& .MuiOutlinedInput-root': {
      backgroundColor: '#E7EBF0',
      boxShadow: `
        inset 2.5px 2.5px 5px 0px #A7AABB80,
        inset -2.5px -2.5px 5px 0px #FAFBFF
      `,
      borderRadius: '8px',
      '& fieldset': { border: 'none' },
    },
    '& .MuiOutlinedInput-input': { padding: '12px 16px' },
  };

  const renderField = (field: NonNullable<TaskModalProps['fields']>[0]) => {
    switch (field.type) {
      case 'text':
        return (
          <TextField
            fullWidth
            value={formData[field.name] || ''}
            onChange={handleChange(field.name)}
            placeholder={field.placeholder}
            sx={inputStyles}
          />
        );

      case 'date':
        return (
          <TextField
            fullWidth
            type="date"
            value={formData[field.name] || ''}
            onChange={handleChange(field.name)}
            InputLabelProps={{ shrink: true }}
            sx={inputStyles}
          />
        );

      case 'select':
        return (
          <FormControl fullWidth sx={inputStyles}>
            <Select
              value={formData[field.name] || ''}
              onChange={handleChange(field.name)}
            >
              {field.options?.map((option) => {
                if (typeof option === 'string') {
                  return (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  );
                }
                return (
                  <MenuItem key={option.value} value={option.value}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                      <Typography>{option.label}</Typography>
                      {option.secondaryLabel && (
                        <Typography color="textSecondary" sx={{ fontSize: '0.875rem' }}>
                          {option.secondaryLabel}
                        </Typography>
                      )}
                    </Box>
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        );

      default:
        return null;
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" sx={{ mb: 3, fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
          {title} {/* Dynamically change title */}
        </Typography>

        {title === 'Add Subtask' && mainTasks.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <InputLabel>Select Main Task</InputLabel>
            <FormControl fullWidth sx={inputStyles}>
              <Select
                value={formData['mainTask'] || ''}
                onChange={handleChange('mainTask')}
              >
                {mainTasks.map((task) => (
                  <MenuItem key={task.value} value={task.value}>
                    {task.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        )}

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
          {fields.length > 0 && (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, // Single column on small screens
                gap: 2,
              }}
            >
              {fields.map((field) => (
                <Box key={field.name} sx={{ flex: 1 }}>
                  <InputLabel>{field.label}</InputLabel>
                  {renderField(field)}
                </Box>
              ))}
            </Box>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', mt: 2, gap: 2 }}>
            <Button
              onClick={handleClose}
              sx={{
                border: '1px solid #2564E6',
                color: '#2564E6',
                px: { xs: 2, sm: 3 },
              }}
            >
              {secondaryButtonText}
            </Button>
            <Button
              onClick={handleSubmit}
              sx={{
                bgcolor: '#2564E6',
                color: 'white',
                px: { xs: 2, sm: 3 },
                '&:hover': { bgcolor: '#1E4DB7' },
              }}
            >
              {primaryButtonText}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default TaskModal;
