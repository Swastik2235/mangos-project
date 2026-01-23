import React from 'react';
import { Box, Typography } from '@mui/material';
import { DailyMetric } from '../../../Types/table.types';

interface MultiProgressBarProps {
  metrics: DailyMetric;
  height?: number;
  showSeparate?: boolean;
}

const MultiProgressBar: React.FC<MultiProgressBarProps> = ({
  metrics,
  height = 4,
  showSeparate = true
}) => {
  const segments = [
    { percentage: metrics.primary, color: '#2563eb' },
    { percentage: metrics.secondary, color: '#60a5fa' },
    { percentage: Math.abs(metrics.tertiary), color: '#93c5fd' }
  ];

  const SingleBar = ({ percentage, color }: { percentage: number; color: string }) => (
    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
      <Typography
        sx={{
          fontSize: '9px',
          color: '#64748b',
          minWidth: '15px',
          textAlign: 'right'
        }}
      >
        {percentage}%
      </Typography>
      <Box
        sx={{
          width: '100%',
          height: `${height}px`,
          bgcolor: '#e2e8f0',
          borderRadius: '2px',
          overflow: 'hidden'
        }}
      >
        <Box
          sx={{
            width: `${percentage}%`,
            height: '100%',
            bgcolor: color,
          }}
        />
      </Box>
      
    </Box>
  );

  return (
    <Box sx={{ width: '100%' }}>
      {showSeparate && (
        <>
          <SingleBar percentage={metrics.primary} color={segments[0].color} />
          <SingleBar percentage={metrics.secondary} color={segments[1].color} />
          <SingleBar percentage={Math.abs(metrics.tertiary)} color={segments[2].color} />
        </>
      )}
    </Box>
  );
};

export default MultiProgressBar;
