import { FC } from 'react';
import { Select, MenuItem } from '@mui/material';

interface ChartTypeSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const ChartTypeSelector: FC<ChartTypeSelectorProps> = ({ value, onChange }) => {
  return (
    <Select
      size="small"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      sx={{ width: 120, boxShadow: '4px 4px 20px 0px #6F8CB069 , -6px -6px 20px 0px #FFFFFF,2px 2px 4px 0px #728EAB1A',background: '#E7EBF0' , 
        height: '32px',
        padding: '6px 4px 6px 8px',
        gap: '10px',
        borderRadius: '8px ',
        border: 'none',
        }}
    >
      <MenuItem value="line">Line Chart</MenuItem>
      <MenuItem value="pie">Pie Chart</MenuItem>
      <MenuItem value="donut">Donut Chart</MenuItem>
    </Select>
  );
};

export default ChartTypeSelector;