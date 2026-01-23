import { Chip, Avatar } from '@mui/material';

interface AssigneeChipProps {
  name: string;
}

export const AssigneeChip = ({ name }: AssigneeChipProps) => {
  return (
    <Chip
      avatar={<Avatar sx={{ bgcolor: '#E0E0E0', width: 24, height: 24 }}>{name[0]}</Avatar>}
      label={name}
      onDelete={() => {}}
      sx={{
        backgroundColor: '#E7EBF0',
        borderRadius: '4px',
        height: '28px',
        '& .MuiChip-label': {
          color: '#666666',
        },
        '& .MuiChip-deleteIcon': {
          color: '#666666',
          fontSize: '16px',
        }
      }}
    />
  );
};