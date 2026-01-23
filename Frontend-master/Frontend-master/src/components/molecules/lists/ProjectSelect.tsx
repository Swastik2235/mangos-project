import { Select, MenuItem, SelectChangeEvent } from '@mui/material';

interface ProjectSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export const ProjectSelect = ({ value, onChange }: ProjectSelectProps) => {
  const handleChange = (event: SelectChangeEvent<string>) => {
    onChange(event.target.value);
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
      <MenuItem value="Tata Projects LTD.">Tata Projects LTD.</MenuItem>
      <MenuItem value="Project 2">Project 2</MenuItem>
      <MenuItem value="Project 3">Project 3</MenuItem>
    </Select>
  );
};