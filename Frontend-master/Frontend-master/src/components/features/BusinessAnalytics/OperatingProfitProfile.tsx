import { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ReferenceLine,
  ResponsiveContainer, Cell, Line
} from 'recharts';
import {
  Card, CardContent, Typography, Box,
  IconButton, Select, MenuItem, SelectChangeEvent,
  Dialog, DialogContent
} from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';

const profitData = [
  0.07, 0.065, 0.06, 0.058, 0.055, 0.05, 0.045, 0.04, 0.035, 0.03,
  0.025, 0.02, 0.018, 0.015, 0.012, 0.01, 0.008, 0.005, 0.003, 0.001,
  0, -0.002, -0.004, -0.006, -0.008, -0.01, -0.012, -0.014, -0.016, -0.018,
];

let cumulative = 0;
const chartData = profitData.map((value, i) => {
  cumulative += value;
  return {
    index: i,
    percentile: (i + 1) / profitData.length,
    value,
    cumulative,
    barColor: value >= 0 ? '#B7E2A7' : '#E6B7B7'
  };
});

const greenLine = chartData.slice(0, Math.floor(chartData.length * 0.25));
const greyLine = chartData.slice(Math.floor(chartData.length * 0.25), Math.floor(chartData.length * 0.75));
const brownLine = chartData.slice(Math.floor(chartData.length * 0.75));

const OperatingProfitProfile = () => {
  const [category, setCategory] = useState('Title 1');
  const [openFullscreen, setOpenFullscreen] = useState(false);

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  const toggleFullscreen = () => {
    setOpenFullscreen(!openFullscreen);
  };

  const renderChart = () => (
    <BarChart data={chartData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="percentile"
        type="number"
        domain={[0, 1]}
        tickFormatter={(v) => `${Math.round(v * 100)}%`}
        ticks={[0, 0.25, 0.5, 0.75, 1]}
      />
      <YAxis
        domain={[-0.1, 0.3]}
        tickFormatter={(v) => `${Math.round(v * 100)}%`}
      />
      <ReferenceLine y={0} stroke="#888" />
      <ReferenceLine y={chartData[chartData.length - 1].cumulative} stroke="#888" strokeDasharray="3 3" />
      <ReferenceLine x={0.25} stroke="#1C7B4A" strokeDasharray="4 2" />
      <ReferenceLine x={0.75} stroke="#1C7B4A" strokeDasharray="4 2" />
      <Bar dataKey="value" radius={[2, 2, 0, 0]} isAnimationActive={false}>
        {chartData.map((entry, idx) => (
          <Cell key={idx} fill={entry.barColor} />
        ))}
      </Bar>
      <Line
        type="monotone"
        data={greenLine}
        dataKey="cumulative"
        stroke="#1C7B4A"
        strokeWidth={4}
        dot={false}
        isAnimationActive={false}
      />
      <Line
        type="monotone"
        data={greyLine}
        dataKey="cumulative"
        stroke="#5A5A5A"
        strokeWidth={4}
        dot={false}
        isAnimationActive={false}
      />
      <Line
        type="monotone"
        data={brownLine}
        dataKey="cumulative"
        stroke="#7C2D12"
        strokeWidth={4}
        dot={false}
        isAnimationActive={false}
      />
    </BarChart>
  );

  return (
    <Card sx={{ 
      borderRadius: 2, 
      background: '#E7EBF0', 
      boxShadow: `
        4px 4px 20px 0px #6F8CB069,
        -6px -6px 20px 0px #FFFFFF,
        2px 2px 4px 0px #728EAB1A
      `
    }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            Operating Profit Profile
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Select
              value={category}
              onChange={handleCategoryChange}
              size="small"
              sx={{
                minWidth: 100,
                bgcolor: '#E7EBF0',
                boxShadow: '4px 4px 20px 0px #6F8CB069, -6px -6px 20px 0px #FFFFFF, 2px 2px 4px 0px #728EAB1A'
              }}
            >
              <MenuItem value="Title 1">Title 1</MenuItem>
              <MenuItem value="Title 2">Title 2</MenuItem>
            </Select>
            <IconButton onClick={toggleFullscreen}>
              <FullscreenIcon />
            </IconButton>
          </Box>
        </Box>
        
        <Box sx={{ height: 400 }}>
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </Box>

        <Box sx={{ textAlign: 'right', mt: 1, fontSize: 16 }}>
          <span style={{ color: '#000' }}>Actual Net Profit</span>
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

export default OperatingProfitProfile;