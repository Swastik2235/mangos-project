import React from 'react';
import { Box, LinearProgress, Typography, styled } from '@mui/material';

interface OperationData {
  label: string;
  primary: number;
  secondary: number;
  tertiary: number;
  category: 'Projects' | 'Plants' | 'Business';
}

const CustomLinearProgress = styled(LinearProgress)(() => ({
  height: 8,
  borderRadius: 4,
  backgroundColor: '#f0f0f0',
  '& .MuiLinearProgress-bar': {
    borderRadius: 4,
  },
}));

const data: OperationData[] = [
  { label: 'Priority 1', primary: 60, secondary: 80, tertiary: 25, category: 'Projects' },
  { label: 'Priority 2', primary: 90, secondary: 100, tertiary: 45, category: 'Projects' },
  { label: 'Priority 3', primary: 100, secondary: 65, tertiary: 10, category: 'Projects' },
  { label: 'Manpower (hrs)', primary: 60, secondary: 80, tertiary: 25, category: 'Plants' },
  { label: 'Material', primary: 90, secondary: 100, tertiary: 45, category: 'Plants' },
  { label: 'Machinery', primary: 100, secondary: 65, tertiary: 10, category: 'Plants' },
  { label: 'Methods', primary: 60, secondary: 80, tertiary: 100, category: 'Business' },
  { label: 'Monetary', primary: 90, secondary: 50, tertiary: 45, category: 'Business' },
  { label: 'Management', primary: 75, secondary: 65, tertiary: 10, category: 'Business' },
];

const ProgressBars: React.FC = () => {
  return (
    <Box sx={{ 
      bgcolor: '#f8f9fa',
      p: 4,
      borderRadius: 4,
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      maxWidth: 1200,
      margin: 'auto'
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Highlights</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Typography variant="button" sx={{ color: '#666' }}>Title 1</Typography>
        </Box>
      </Box>

      {['Projects', 'Plants', 'Business'].map((category) => (
        <Box key={category} sx={{ mb: 4 }}>
          <Typography 
            variant="subtitle2" 
            sx={{ 
              color: '#666',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: -8,
                height: 1,
                bgcolor: '#eee'
              }
            }}
          >
            {category}
          </Typography>
          
          {data.filter(item => item.category === category).map((item, index) => (
            <Box key={index} sx={{ mt: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" sx={{ color: '#444', width: '20%' }}>
                  {item.label}
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, width: '80%' }}>
                  <Box sx={{ flex: 1 }}>
                    <CustomLinearProgress
                      variant="determinate"
                      value={item.primary}
                      sx={{ '& .MuiLinearProgress-bar': { backgroundColor: '#0066cc' } }}
                    />
                    <Typography variant="caption" sx={{ color: '#666', mt: 0.5 }}>
                      {item.primary}%
                    </Typography>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <CustomLinearProgress
                      variant="determinate"
                      value={item.secondary}
                      sx={{ '& .MuiLinearProgress-bar': { backgroundColor: '#3399ff' } }}
                    />
                    <Typography variant="caption" sx={{ color: '#666', mt: 0.5 }}>
                      {item.secondary}%
                    </Typography>
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <CustomLinearProgress
                      variant="determinate"
                      value={item.tertiary}
                      sx={{ '& .MuiLinearProgress-bar': { backgroundColor: '#66ccff' } }}
                    />
                    <Typography variant="caption" sx={{ color: '#666', mt: 0.5 }}>
                      {item.tertiary}%
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      ))}

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="body2" sx={{ color: '#666' }}>
          Operations →
        </Typography>
        <Box sx={{ display: 'flex', gap: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#0066cc' }} />
            <Typography variant="caption">Primary Operation</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#3399ff' }} />
            <Typography variant="caption">Secondary Operation</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#66ccff' }} />
            <Typography variant="caption">Tertiary Operation</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProgressBars;