import { Select, MenuItem, SelectChangeEvent } from '@mui/material';

interface DatasetSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export const DatasetSelect = ({ value, onChange }: DatasetSelectProps) => {
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
      <MenuItem value="Galva. Job card">Galva. Job card</MenuItem>
      <MenuItem value="Dataset 2">Dataset 2</MenuItem>
      <MenuItem value="Dataset 3">Dataset 3</MenuItem>
    </Select>
  );
};