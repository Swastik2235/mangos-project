import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  isParent?: boolean;
}

export const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, isParent }) => {
  const isPositive = change >= 0;

  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        minWidth: 220,
        transition: 'box-shadow 0.3s',
        boxShadow: isParent ? '0 0 0 2px rgba(25, 118, 210, 0.2)' : undefined,
        '&:hover': {
          boxShadow: isParent 
            ? '0 0 0 3px rgba(25, 118, 210, 0.3), 0 6px 12px rgba(0,0,0,0.15)'
            : 6,
        },
      }}
    >
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        {title}
      </Typography>
      <Typography variant="h6" component="div">
        {value}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
        {isPositive ? (
          <TrendingUp sx={{ color: 'success.main', fontSize: 16 }} />
        ) : (
          <TrendingDown sx={{ color: 'error.main', fontSize: 16 }} />
        )}
        <Typography
          variant="body2"
          sx={{
            ml: 0.5,
            color: isPositive ? 'success.main' : 'error.main',
          }}
        >
          {Math.abs(change)}%
        </Typography>
      </Box>
    </Paper>
  );
};