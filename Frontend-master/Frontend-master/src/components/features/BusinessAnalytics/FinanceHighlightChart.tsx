import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ReferenceLine, ResponsiveContainer, Cell } from 'recharts';
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Dialog,
  DialogContent
} from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
// import { color } from 'd3';

// Example histogram bin data
const histogramData = [
  { bin: '-45%-50%', count: 5 },
  { bin: '-40%-45%', count: 10 },
  { bin: '-35%-40%', count: 15 },
  { bin: '-30%-35%', count: 20 },
  { bin: '-25%-30%', count: 25 },
  { bin: '-20%-25%', count: 30 },
  { bin: '-15%-20%', count: 35 },
  { bin: '-10%-15%', count: 40 },
  { bin: '-5%-10%', count: 45 },
  { bin: '0%-5%', count: 50   },
  { bin: '5%-10%', count: 40 },
  { bin: '10%-15%', count: 35 },
  { bin: '15%-20%', count: 30 },
  { bin: '20%-25%', count: 25 },
  { bin: '25%-30%', count: 20 },
  { bin: '30%-35%', count: 15 },
  { bin: '35%-40%', count: 10 },
  { bin: '40%-45%', count: 5 },
];

// Color bins: red for negative, green for positive
const processedData = histogramData.map((item) => ({
  ...item,
  fill: item.bin.startsWith('-') ? '#8B2C1F' : '#1C7B4A',
}));

const totalNegative = histogramData.filter(d => d.bin.startsWith('-')).reduce((sum, d) => sum + d.count, 0);
const totalPositive = histogramData.filter(d => !d.bin.startsWith('-')).reduce((sum, d) => sum + d.count, 0);
const totalProjects = histogramData.reduce((sum, d) => sum + d.count, 0);

const FinanceHighlightChart: React.FC = () => {
  const [openFullscreen, setOpenFullscreen] = useState(false);

  const toggleFullscreen = () => {
    setOpenFullscreen(!openFullscreen);
  };

  const renderChart = () => (
    <BarChart
      data={processedData}
      margin={{ top: 20, right: 30, left: 10, bottom: 40 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis 
        dataKey="bin"
        type="category"
        tick={{ fontSize: 12 }}
        label={{ value: 'Earnings', position: 'bottom', offset: 20 }}
        interval={0}
        angle={-45}
        textAnchor="end"
        height={70}
      />
      <YAxis 
        label={{ value: 'Projects..', angle: -90, position: 'insideLeft', offset: 10, sx: { fontSize: 14,color: '#08070f' } }}
        allowDecimals={false}
      />
      <ReferenceLine y={0} stroke="#000" />
      <Bar dataKey="count" radius={[4, 4, 0, 0]} isAnimationActive={false}>
        {processedData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.fill} />
        ))}
      </Bar>
    </BarChart>
  );

  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: `
          4px 4px 20px 0px #6F8CB069,
          -6px -6px 20px 0px #E7EBF0,
          2px 2px 4px 0px #728EAB1A
        `,
        background: '#E7EBF0',
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 700,color:'#08070f',fontSize:'1.4rem' }}>Highlights</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ textAlign: 'right', fontSize: 16, mr: 2 }}>
              <div>Total -ve Projects: <b>{totalNegative}</b></div>
              <div>Total +ve Projects: <b>{totalPositive}</b></div>

              <div>Total Projects: <b>{totalProjects}</b></div>
            </Box>
            <IconButton onClick={toggleFullscreen} sx={{ color: '#08070f' }}>
              <FullscreenIcon />
            </IconButton>
          </Box>
        </Box>
        
        <Box sx={{ height: 400 }}>
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </Box>

        {/* Fullscreen Dialog */}
        <Dialog
          open={openFullscreen}
          onClose={toggleFullscreen}
          fullWidth
          maxWidth="md"
        >
          <DialogContent sx={{ height: '80vh' }}>
            <ResponsiveContainer width="100%" height="100%">
              {renderChart()}
            </ResponsiveContainer>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default FinanceHighlightChart;