import { Chip } from '@mui/material';

interface StatusChipProps {
  status: string;
}

export const StatusChip = ({ status }: StatusChipProps) => {
  return (
    <Chip
      label={status}
      size="small"
      sx={{
        backgroundColor: '#E7EBF0',
        borderRadius: '4px',
        color: '#666666',
        height: '24px',
        '& .MuiChip-label': {
          padding: '4px 8px',
        }
      }}
    />
  );
};