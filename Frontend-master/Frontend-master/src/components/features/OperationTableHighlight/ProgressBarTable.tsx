import React from 'react';
import { Box, Typography } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

interface ProgressBarProps {
  segments: {
    percentage: number;
    color: string;
  }[];
  height?: number;
  showTrend?: 'positive' | 'negative';
  daysRemaining?: number;
}

const ProgressBarTable: React.FC<ProgressBarProps> = ({ 
  segments, 
  height = 4, 
  showTrend,
  daysRemaining
}) => {
  const total = segments.reduce((sum, segment) => sum + segment.percentage, 0);

  return (
    <Box sx={{ width: '100%', position: 'relative' }}>
      <Box sx={{ 
        width: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        gap: 0.5,
        mb: showTrend ? 1 : 0 
      }}>
        <Box
          sx={{
            width: '100%',
            height: `${height}px`,
            bgcolor: '#e2e8f0',
            borderRadius: '2px',
            display: 'flex',
            overflow: 'hidden',
          }}
        >
          {segments.map((segment, index) => (
            <Box
              key={index}
              sx={{
                width: `${segment.percentage}%`,
                height: '100%',
                bgcolor: segment.color,
                position: 'relative',
              }}
            />
          ))}
        </Box>
        <Typography
          sx={{
            fontSize: '11px',
            color: '#64748b',
            minWidth: '45px',
            textAlign: 'right',
          }}
        >
          {total}%
        </Typography>
      </Box>
      
      {showTrend && (
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 0.5,
          mt: 0.5
        }}>
          {showTrend === 'positive' ? (
            <TrendingUpIcon sx={{ color: '#22c55e', fontSize: 16 }} />
          ) : (
            <TrendingDownIcon sx={{ color: '#ef4444', fontSize: 16 }} />
          )}
          {daysRemaining && (
            <Typography sx={{ fontSize: '11px', color: '#64748b' }}>
              {daysRemaining} Days
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
}

export default ProgressBarTable;