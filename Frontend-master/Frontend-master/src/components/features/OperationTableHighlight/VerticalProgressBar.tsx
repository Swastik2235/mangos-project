// import React from 'react';
// import { Box, Typography } from '@mui/material';

// interface DailyMetric {
//   primary: number;
//   secondary: number;
//   tertiary: number;
// }

// interface VerticalProgressBarProps {
//   metrics: DailyMetric;
//   height?: number;
//   width?: number;
// }

// const VerticalProgressBar: React.FC<VerticalProgressBarProps> = ({
//   metrics,
//   height = 4,
//   width = 60
// }) => {
//   const getBarWidth = (value: number) => {
//     const absValue = Math.abs(value);
//     return `${absValue}%`;
//   };

//   const getBarPosition = (value: number) => {
//     return value >= 0 ? 'right' : 'left';
//   };

//   const getLabelPosition = (value: number) => {
//     return value >= 0 ? 'left' : 'right';
//   };

//   return (
//     <Box sx={{ position: 'relative', width: `${width}px`, my: 1 }}>
//       {/* Center line */}
//       <Box
//         sx={{
//           position: 'absolute',
//           left: '50%',
//           height: '100%',
//           width: '1px',
//           bgcolor: '#e2e8f0',
//           transform: 'translateX(-50%)',
//           zIndex: 0
//         }}
//       />

//       {/* Primary Bar */}
//       <Box sx={{ position: 'relative', height: height, mb: 0.5, display: 'flex', alignItems: 'center' }}>
//         <Typography
//           sx={{
//             position: 'absolute',
//             [getLabelPosition(metrics.primary)]: '52%',
//             fontSize: '10px',
//             color: '#64748b'
//           }}
//         >
//           {metrics.primary}%
//         </Typography>
//         <Box
//           sx={{
//             position: 'absolute',
//             [getBarPosition(metrics.primary)]: '50%',
//             width: getBarWidth(metrics.primary),
//             height: '100%',
//             bgcolor: '#2563eb',
//             borderRadius: '2px'
//           }}
//         />
//       </Box>

//       {/* Secondary Bar */}
//       <Box sx={{ position: 'relative', height: height, mb: 0.5, display: 'flex', alignItems: 'center' }}>
//         <Typography
//           sx={{
//             position: 'absolute',
//             [getLabelPosition(metrics.secondary)]: '52%',
//             fontSize: '10px',
//             color: '#64748b'
//           }}
//         >
//           {metrics.secondary}%
//         </Typography>
//         <Box
//           sx={{
//             position: 'absolute',
//             [getBarPosition(metrics.secondary)]: '50%',
//             width: getBarWidth(metrics.secondary),
//             height: '100%',
//             bgcolor: '#60a5fa',
//             borderRadius: '2px'
//           }}
//         />
//       </Box>

//       {/* Tertiary Bar */}
//       <Box sx={{ position: 'relative', height: height, display: 'flex', alignItems: 'center' }}>
//         <Typography
//           sx={{
//             position: 'absolute',
//             [getLabelPosition(metrics.tertiary)]: '52%',
//             fontSize: '10px',
//             color: '#64748b'
//           }}
//         >
//           {metrics.tertiary}%
//         </Typography>
//         <Box
//           sx={{
//             position: 'absolute',
//             [getBarPosition(metrics.tertiary)]: '50%',
//             width: getBarWidth(metrics.tertiary),
//             height: '100%',
//             bgcolor: '#93c5fd',
//             borderRadius: '2px'
//           }}
//         />
//       </Box>
//     </Box>
//   );
// };

// export default VerticalProgressBar;

import React from 'react';
import { Box, Typography } from '@mui/material';

interface DailyMetric {
  primary: number;
  secondary: number;
  tertiary: number;
}

interface VerticalProgressBarProps {
  metrics: DailyMetric;
  height?: number;
  width?: number;
}

const VerticalProgressBar: React.FC<VerticalProgressBarProps> = ({
  metrics,
  height = 4,
  width = 60
}) => {
  const getBarWidth = (value: number) => {
    const absValue = Math.abs(value);
    return `${absValue}%`;
  };

  const getBarPosition = (value: number) => {
    return value >= 0 ? 'right' : 'left';
  };

  const getLabelPosition = (value: number) => {
    return value >= 0 ? 'left' : 'right';
  };

  return (
    <Box sx={{ position: 'relative', width: `${width}px`, my: 1 }}>
      {/* Center line */}
      <Box
        sx={{
          position: 'absolute',
          left: '50%',
          height: '100%',
          width: '1px',
          bgcolor: '#A7AABB',
          transform: 'translateX(-50%)',
          zIndex: 0
        }}
      />

      {/* Primary Bar */}
      <Box sx={{ position: 'relative', height: height, mb: 0.5, display: 'flex', alignItems: 'center' }}>
        <Typography
          sx={{
            position: 'absolute',
            [getLabelPosition(metrics.primary)]: '52%',
            fontSize: '10px',
            color: '#64748b'
          }}
        >
          {metrics.primary}%
        </Typography>
        <Box
          sx={{
            position: 'absolute',
            [getBarPosition(metrics.primary)]: '50%',
            width: getBarWidth(metrics.primary),
            height: '100%',
            bgcolor: '#2563eb',
            borderRadius: '2px'
          }}
        />
      </Box>

      {/* Secondary Bar */}
      <Box sx={{ position: 'relative', height: height, mb: 0.5, display: 'flex', alignItems: 'center' }}>
        <Typography
          sx={{
            position: 'absolute',
            [getLabelPosition(metrics.secondary)]: '52%',
            fontSize: '10px',
            color: '#64748b'
          }}
        >
          {metrics.secondary}%
        </Typography>
        <Box
          sx={{
            position: 'absolute',
            [getBarPosition(metrics.secondary)]: '50%',
            width: getBarWidth(metrics.secondary),
            height: '100%',
            bgcolor: '#60a5fa',
            borderRadius: '2px'
          }}
        />
      </Box>

      {/* Tertiary Bar */}
      <Box sx={{ position: 'relative', height: height, display: 'flex', alignItems: 'center' }}>
        <Typography
          sx={{
            position: 'absolute',
            [getLabelPosition(metrics.tertiary)]: '52%',
            fontSize: '10px',
            color: '#64748b'
          }}
        >
          {metrics.tertiary}%
        </Typography>
        <Box
          sx={{
            position: 'absolute',
            [getBarPosition(metrics.tertiary)]: '50%',
            width: getBarWidth(metrics.tertiary),
            height: '100%',
            bgcolor: '#93c5fd',
            borderRadius: '2px'
          }}
        />
      </Box>
    </Box>
  );
};

export default VerticalProgressBar;