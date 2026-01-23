import { Select, MenuItem, SelectChangeEvent } from '@mui/material';

interface StatusSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export const StatusSelect = ({ value, onChange }: StatusSelectProps) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'in progress':
        return '#E3F2FD';
      case 'completed':
        return '#E8F5E9';
      case 'pending':
        return '#FFF3E0';
      default:
        return '#E7EBF0';
    }
  };

  return (
    <Select
      value={value}
      onChange={handleChange}
      size="small"
      sx={{
        '& .MuiSelect-select': {
          padding: '4px 8px',
          fontSize: '14px',
          backgroundColor: getStatusColor(value),
          borderRadius: '4px',
        },
        '& .MuiOutlinedInput-notchedOutline': {
          border: 'none'
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          border: '1px solid rgba(0, 0, 0, 0.23)'
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          border: '1px solid rgba(0, 0, 0, 0.23)'
        }
      }}
    >
      <MenuItem value="In Progress">In Progress</MenuItem>
      <MenuItem value="Completed">Completed</MenuItem>
      <MenuItem value="Pending">Pending</MenuItem>
    </Select>
  );
};