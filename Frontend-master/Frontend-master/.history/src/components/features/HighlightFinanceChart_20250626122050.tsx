// import React from 'react';
// import {
//   PieChart,
//   Pie,
//   Cell,
//   ResponsiveContainer,
// } from 'recharts';
// import {
//   Card,
//   CardContent,
//   Typography,
//   Box,
//   Select,
//   MenuItem,
//   IconButton,
// } from '@mui/material';
// import FullscreenIcon from '@mui/icons-material/Fullscreen';

// const incomeSegments = [
//   { name: '10L', value: 10 },
//   { name: '8L', value: 8 },
//   { name: '22L', value: 22 },
// ];

// const outgoingSegments = [
//   { name: 'Paid', value: 19 },
//   { name: 'Outgoing', value: 23 },
// ];

// const outerColors = ['#60A5FA', '#3B82F6', '#1D4ED8']; // Income
// const outgoingColors = ['#F59E0B', '#FBBF24']; // Outgoing

// const CircularHighlightChart = () => {
//   return (
//     <Card sx={{ background: '#F1F5F9', borderRadius: 3 }}>
//       <CardContent>
//         {/* Header */}
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
//           <Typography variant="h5" sx={{ color: '#1e293b', fontWeight: 600 }}>
//             Highlights
//           </Typography>
//           <Box sx={{ display: 'flex', gap: 1 }}>
//             <Select
//               size="small"
//               value="Title name"
//               sx={{
//                 background: '#fff',
//                 fontSize: 14,
//                 borderRadius: 2,
//                 height: 32,
//               }}
//             >
//               <MenuItem value="Title name">Title name</MenuItem>
//             </Select>
//             <IconButton size="small">
//               <FullscreenIcon />
//             </IconButton>
//           </Box>
//         </Box>

//         {/* Chart */}
//         <Box sx={{ height: 360, position: 'relative' }}>
//           <ResponsiveContainer>
//             <PieChart>
//               {/* OUTGOING Half */}
//               <Pie
//                 data={outgoingSegments}
//                 dataKey="value"
//                 startAngle={90}
//                 endAngle={-90}
//                 innerRadius={100}
//                 outerRadius={180}
//               >
//                 {outgoingColors.map((color, idx) => (
//                   <Cell key={`out-${idx}`} fill={color} />
//                 ))}
//               </Pie>

//               {/* INCOME Half */}
//               <Pie
//                 data={incomeSegments}
//                 dataKey="value"
//                 startAngle={-90}
//                 endAngle={270}
//                 innerRadius={100}
//                 outerRadius={180}
//               >
//                 {outerColors.map((color, idx) => (
//                   <Cell key={`income-${idx}`} fill={color} />
//                 ))}
//               </Pie>

//               {/* CENTER RING: VARIANCE & ACTUAL */}
//               <Pie
//                 data={[
//                   { name: 'Variance', value: 96, color: '#DC2626' },
//                   { name: 'Actual', value: 112, color: '#16A34A' },
//                 ]}
//                 dataKey="value"
//                 innerRadius={60}
//                 outerRadius={70}
//                 startAngle={90}
//                 endAngle={-270}
//               >
//                 {[
//                   <Cell key="variance" fill="#DC2626" />,
//                   <Cell key="actual" fill="#16A34A" />,
//                 ]}
//               </Pie>
//             </PieChart>
//           </ResponsiveContainer>

//           {/* Center Labels */}
//           <Box
//             sx={{
//               position: 'absolute',
//               top: '50%',
//               left: '50%',
//               transform: 'translate(-50%, -55%)',
//               textAlign: 'center',
//               fontSize: 14,
//               color: '#1f2937',
//             }}
//           >
//             <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
//               <Box sx={{ color: '#DC2626', fontWeight: 600 }}>96L</Box>
//               <Box sx={{ color: '#16A34A', fontWeight: 600 }}>112L</Box>
//             </Box>
//             <Box sx={{ fontSize: 12, color: '#64748b', mt: 0.5 }}>
//               0 <span style={{ margin: '0 4px' }}>|</span> 0
//             </Box>
//           </Box>

//           {/* Mid Labels */}
//           <Box
//             sx={{
//               position: 'absolute',
//               top: '33%',
//               left: '75%',
//               transform: 'translate(-50%, -50%)',
//               color: '#1e3a8a',
//               fontWeight: 600,
//               textAlign: 'center',
//               fontSize: 14,
//             }}
//           >
//             Incomming <br />
//             41L
//           </Box>
//           <Box
//             sx={{
//               position: 'absolute',
//               top: '33%',
//               left: '25%',
//               transform: 'translate(-50%, -50%)',
//               color: '#92400e',
//               fontWeight: 600,
//               textAlign: 'center',
//               fontSize: 14,
//             }}
//           >
//             Outgoing <br />
//             23L
//           </Box>
//           <Box
//             sx={{
//               position: 'absolute',
//               bottom: '15%',
//               left: '75%',
//               transform: 'translate(-50%, -50%)',
//               color: '#1e3a8a',
//               fontWeight: 600,
//               textAlign: 'center',
//               fontSize: 14,
//             }}
//           >
//             Income <br />
//             68L
//           </Box>
//           <Box
//             sx={{
//               position: 'absolute',
//               bottom: '15%',
//               left: '25%',
//               transform: 'translate(-50%, -50%)',
//               color: '#92400e',
//               fontWeight: 600,
//               textAlign: 'center',
//               fontSize: 14,
//             }}
//           >
//             Paid <br />
//             19L
//           </Box>
//         </Box>

//         {/* Legend */}
//         <Box
//           sx={{
//             display: 'flex',
//             justifyContent: 'center',
//             gap: 4,
//             mt: 2,
//             flexWrap: 'wrap',
//           }}
//         >
//           {[
//             { label: 'Outgoing', color: '#F59E0B' },
//             { label: 'Budgetary', color: '#FBBF24' },
//             { label: 'Variance', color: '#DC2626' },
//             { label: 'Incomming', color: '#60A5FA' },
//             { label: 'Budgetary', color: '#3B82F6' },
//             { label: 'Variance', color: '#16A34A' },
//           ].map((item, idx) => (
//             <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//               <Box
//                 sx={{
//                   width: 10,
//                   height: 10,
//                   borderRadius: '50%',
//                   backgroundColor: item.color,
//                 }}
//               />
//               <Typography variant="caption">{item.label}</Typography>
//             </Box>
//           ))}
//         </Box>
//       </CardContent>
//     </Card>
//   );
// };

// export default CircularHighlightChart;




import  { useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Select,
  MenuItem,
  IconButton,
  Dialog,
  DialogContent
} from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import CloseIcon from '@mui/icons-material/Close';

const segments = [
  { name: 'Incoming', value: 25, color: '#3B82F6', amount: '41L' },
  { name: 'Income', value: 25, color: '#1D4ED8', amount: '68L' },
  { name: 'Outgoing', value: 25, color: '#F97316', amount: '23L' },
  { name: 'Paid', value: 25, color: '#EA580C', amount: '19L' },
];

const CircularHighlightChart = () => {
  const [openFullscreen, setOpenFullscreen] = useState(false);

  const toggleFullscreen = () => {
    setOpenFullscreen(!openFullscreen);
  };

  const renderChart = (isFullscreen: boolean) => (
    <Box sx={{ 
      height: isFullscreen ? '70vh' : 360, 
      position: 'relative',
      width: '100%'
    }}>
      <ResponsiveContainer>
        <PieChart>
          {/* Main 4 segments */}
          <Pie
            data={segments}
            dataKey="value"
            startAngle={90}
            endAngle={-270}
            innerRadius={isFullscreen ? 120 : 100}
            outerRadius={isFullscreen ? 220 : 180}
            paddingAngle={0}
          >
            {segments.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color} 
                stroke={entry.color}
              />
            ))}
          </Pie>

          {/* Inner Ring */}
          <Pie
            data={[
              { name: 'Variance', value: 96 },
              { name: 'Actual', value: 112 },
            ]}
            dataKey="value"
            innerRadius={isFullscreen ? 80 : 60}
            outerRadius={isFullscreen ? 100 : 70}
            startAngle={90}
            endAngle={-270}
          >
            <Cell key="variance" fill="#DC2626" />
            <Cell key="actual" fill="#16A34A" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {/* Center Labels */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -55%)',
          textAlign: 'center',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
          <Typography sx={{ fontWeight: 600, color: '#DC2626', fontSize: isFullscreen ? '1.2rem' : 'inherit' }}>96L</Typography>
          <Typography sx={{ fontWeight: 600, color: '#16A34A', fontSize: isFullscreen ? '1.2rem' : 'inherit' }}>112L</Typography>
        </Box>
        <Typography sx={{ fontSize: isFullscreen ? '0.9rem' : 12, color: '#64748b' }}>
          0 <span style={{ margin: '0 4px' }}>|</span> 0
        </Typography>
      </Box>

      {/* Outer Labels */}
      {segments.map((segment, index) => {
        let positionStyle = {};
        switch(index) {
          case 0: // Incoming (top right)
            positionStyle = {
              top: '30%',
              left: '66%',
            };
            break;
          case 1: // Income (bottom right)
            positionStyle = {
              bottom: '15%',
              left: '66%',
            };
            break;
          case 2: // Outgoing (top left)
            positionStyle = {
              top: '30%',
              left: '32%',
            };
            break;
          case 3: // Paid (bottom left)
            positionStyle = {
              bottom: '15%',
              left: '32%',
            };
            break;
        }
        
        return (
          <Box
            key={segment.name}
            sx={{
              position: 'absolute',
              ...positionStyle,
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              fontWeight: 600,
              color: '#fff',
              fontSize: isFullscreen ? '0.9rem' : '0.8rem',
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
            }}
          >
            {segment.name} <br /> {segment.amount}
          </Box>
        );
      })}
    </Box>
  );

  return (
    <>
      <Card sx={{ 
        background: '#F1F5F9', 
        borderRadius: 3,
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
      }}>
        <CardContent>
          {/* Header */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h5" sx={{ color: '#1e293b', fontWeight: 600 }}>
              Highlights
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Select
                size="small"
                value="Title name"
                sx={{
                  background: '#fff',
                  fontSize: 14,
                  borderRadius: 2,
                  height: 32,
                }}
              >
                <MenuItem value="Title name">Title name</MenuItem>
              </Select>
              <IconButton size="small" onClick={toggleFullscreen}>
                <FullscreenIcon />
              </IconButton>
            </Box>
          </Box>

          {renderChart(false)}

          {/* Legend */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: 4,
              mt: 2,
            }}
          >
            {segments.map((item, idx) => (
              <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    backgroundColor: item.color,
                  }}
                />
                <Typography variant="caption">{item.name}</Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>

      <Dialog
        open={openFullscreen}
        onClose={toggleFullscreen}
        fullWidth
        maxWidth="md"
        sx={{
          '& .MuiDialog-paper': {
            background: '#F1F5F9',
            borderRadius: 3,
            maxHeight: '90vh'
          }
        }}
      >
        <DialogContent sx={{ 
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}>
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: 2
          }}>
            <Typography variant="h4" sx={{ color: '#1e293b', fontWeight: 600 }}>
              Highlights - Fullscreen View
            </Typography>
            <IconButton onClick={toggleFullscreen}>
              <CloseIcon />
            </IconButton>
          </Box>
          
          {renderChart(true)}

          {/* Legend */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: 4,
              mt: 3,
            }}
          >
            {segments.map((item, idx) => (
              <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    backgroundColor: item.color,
                  }}
                />
                <Typography variant="body2">{item.name}</Typography>
              </Box>
            ))}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CircularHighlightChart;