import React, { useState } from 'react';
import {
  PieChart, Pie, Cell, ResponsiveContainer, Text
} from 'recharts';
import {
  Card, CardContent, Typography, Box, Select, MenuItem, IconButton,
  Dialog, DialogContent
} from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import CloseIcon from '@mui/icons-material/Close';

const data = [
  { name: '68L', value: 68, color: '#FBBF24', textColor: '#FFFFFF' },
  { name: '41L', value: 41, color: '#60A5FA', textColor: '#FFFFFF' },
  { name: '21L', value: 21, color: '#D1D5DB', textColor: '#1E293B' },
  { name: '17L', value: 17, color: '#D1D5DB', textColor: '#1E293B' },
];

const centerData = [
  { name: 'Variance', value: 45, color: '#DC2626' },
  { name: 'Actual', value: 112, color: '#16A34A' },
];


interface LabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
  name: string;
  textColor: string;
}

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
  name,
  textColor
}: LabelProps) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
  const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
  return (
    <Text
      x={x}
      y={y}
      fill={textColor}
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
      fontWeight={600}
    >
      {name}
    </Text>
  );
};

const BalanceChart = () => {
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
          {/* Main Pie */}
          <Pie
            data={data}
            dataKey="value"
            startAngle={90}
            endAngle={-270}
            innerRadius={isFullscreen ? 100 : 80}
            outerRadius={isFullscreen ? 160 : 140}
            labelLine={false}
            label={renderCustomizedLabel}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>

          {/* Center Ring */}
          <Pie
            data={centerData}
            dataKey="value"
            startAngle={90}
            endAngle={-270}
            innerRadius={isFullscreen ? 50 : 40}
            outerRadius={isFullscreen ? 80 : 60}
          >
            {centerData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>

      {/* Center Labels */}
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -60%)',
          textAlign: 'center',
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: 1,
          fontSize: isFullscreen ? '1.2rem' : 'inherit'
        }}>
          <Box sx={{ color: '#DC2626', fontWeight: 600 }}>45L</Box>
          <Box sx={{ color: '#16A34A', fontWeight: 600 }}>112L</Box>
        </Box>
        <Box sx={{ 
          fontSize: isFullscreen ? '0.9rem' : 12, 
          color: '#64748b', 
          mt: 0.5 
        }}>
          0 <span style={{ margin: '0 4px' }}>|</span> 0
        </Box>
      </Box>
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
            <Typography variant="h6" sx={{ color: '#1e293b', fontWeight: 600 }}>
              Balance
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Select
                size="small"
                value="Fabrication"
                sx={{
                  background: '#fff',
                  fontSize: 14,
                  borderRadius: 2,
                  height: 32,
                }}
              >
                <MenuItem value="Fabrication">Fabrication</MenuItem>
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
              gap: 4,
              mt: 2,
              flexWrap: 'wrap',
            }}
          >
            {[
              { label: 'Balance', color: '#FBBF24' },
              { label: 'Balance', color: '#60A5FA' },
              { label: 'Remaining', color: '#D1D5DB' },
              { label: 'Remaining', color: '#D1D5DB' },
            ].map((item, idx) => (
              <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    backgroundColor: item.color,
                  }}
                />
                <Typography variant="caption">{item.label}</Typography>
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
            <Typography variant="h5" sx={{ color: '#1e293b', fontWeight: 600 }}>
              Balance - Fullscreen View
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
              gap: 4,
              mt: 3,
              flexWrap: 'wrap',
            }}
          >
            {[
              { label: 'Balance', color: '#FBBF24' },
              { label: 'Balance', color: '#60A5FA' },
              { label: 'Remaining', color: '#D1D5DB' },
              { label: 'Remaining', color: '#D1D5DB' },
            ].map((item, idx) => (
              <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: '50%',
                    backgroundColor: item.color,
                  }}
                />
                <Typography variant="body2">{item.label}</Typography>
              </Box>
            ))}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BalanceChart;