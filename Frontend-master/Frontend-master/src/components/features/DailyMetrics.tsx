import React from 'react';
import { Box, Typography } from '@mui/material';
import { DailyMetric } from '../../Types/table.types';

interface DailyMetricsProps {
  metrics: DailyMetric;
}

const DailyMetrics: React.FC<DailyMetricsProps> = ({ metrics }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
      <Typography sx={{ fontSize: '11px', color: '#1e293b', fontWeight: 500 }}>
        {metrics.primary}%
      </Typography>
      <Typography sx={{ fontSize: '11px', color: '#64748b' }}>
        {metrics.secondary}%
      </Typography>
      <Typography 
        sx={{ 
          fontSize: '11px', 
          color: metrics.tertiary < 0 ? '#ef4444' : '#22c55e',
          display: 'flex',
          alignItems: 'center',
          gap: 0.5
        }}
      >
        {metrics.tertiary}%
      </Typography>
    </Box>
  );
};

export default DailyMetrics;