import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { TrendingUp } from 'lucide-react';

interface BranchItemProps {
  label: string;
  value: number;
  percentage: number;
  isRight?: boolean;
}

interface BranchItem {
    label: string;
    value: number;
    percentage: number;
  }

export const BranchItem: React.FC<BranchItemProps> = ({
  label,
  value,
  percentage,
  isRight = false,
}) => {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        mb: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: isRight ? 'flex-start' : 'flex-end',
        width: '100%',
        // backgroundColor: '#f8fafc',
        bgcolor: '#E7EBF0'
      }}
    >
      {!isRight && (
        <Box sx={{ textAlign: 'right', mr: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            {label}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <Typography variant="body2" color="success.main">
              {value}
            </Typography>
            <TrendingUp size={16} color="green" style={{ marginLeft: 4 }} />
            <Typography variant="body2" color="success.main" sx={{ ml: 1 }}>
              +{percentage}%
            </Typography>
          </Box>
        </Box>
      )}
      {isRight && (
        <Box sx={{ textAlign: 'left', ml: 2 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            {label}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body2" color="success.main">
              {value}
            </Typography>
            <TrendingUp size={16} color="green" style={{ marginLeft: 4 }} />
            <Typography variant="body2" color="success.main" sx={{ ml: 1 }}>
              +{percentage}%
            </Typography>
          </Box>
        </Box>
      )}
    </Paper>
  );
};