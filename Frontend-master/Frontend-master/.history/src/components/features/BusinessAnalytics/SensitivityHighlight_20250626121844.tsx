import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
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

const data = [
  { day: 1, legend1a: 18, legend1b: 25, legend2a: 15, legend1c: 10 },
  { day: 2, legend1a: 20, legend1b: 27, legend2a: 17, legend1c: 9 },
  { day: 3, legend1a: 19, legend1b: 29, legend2a: 22, legend1c: 6 },
  { day: 4, legend1a: 21, legend1b: 31, legend2a: 23, legend1c: 7 },
  { day: 5, legend1a: 16, legend1b: 32, legend2a: 20, legend1c: 8 },
  { day: 6, legend1a: 15, legend1b: 30, legend2a: 18, legend1c: 9 },
  { day: 7, legend1a: 13, legend1b: 27, legend2a: 20, legend1c: 8 },
  { day: 8, legend1a: 12, legend1b: 28, legend2a: 21, legend1c: 7 },
  { day: 9, legend1a: 13, legend1b: 29, legend2a: 19, legend1c: 6 },
  { day: 10, legend1a: 11, legend1b: 28, legend2a: 18, legend1c: 5 },
  { day: 11, legend1a: 10, legend1b: 30, legend2a: 12, legend1c: 6 },
  { day: 12, legend1a: 14, legend1b: 32, legend2a: 14, legend1c: 7 },
  { day: 13, legend1a: 18, legend1b: 30, legend2a: 16, legend1c: 10 },
  { day: 14, legend1a: 17, legend1b: 26, legend2a: 18, legend1c: 11 },
];

const LineSmoothChart: React.FC = () => {
  const [category, setCategory] = useState('All');
  const [openFullscreen, setOpenFullscreen] = useState(false);

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setCategory(event.target.value);
  };

  const toggleFullscreen = () => {
    setOpenFullscreen(!openFullscreen);
  };

  const renderChart = () => (
    <LineChart data={data}>
      <CartesianGrid vertical={false} stroke="#ccc" strokeDasharray="3 3" />
      <XAxis dataKey="day" tick={{ fill: '#333' }} />
      <YAxis domain={[0, 40]} tickFormatter={(val) => `${val}%`} />
      <Tooltip />
      <Legend
        formatter={(value) => {
          if (value.startsWith('legend1')) return 'Legend 1';
          if (value.startsWith('legend2')) return 'Legend 2';
          return value;
        }}
      />
      <Line type="monotone" dataKey="legend1a" stroke="#2196F3" strokeWidth={3} dot={false} />
      <Line type="monotone" dataKey="legend1b" stroke="#f44336" strokeWidth={3} dot={false} />
      <Line type="monotone" dataKey="legend1c" stroke="#FF9800" strokeWidth={3} dot={false} />
      <Line type="monotone" dataKey="legend2a" stroke="#4CAF50" strokeWidth={3} dot={false} />
    </LineChart>
  );

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: `4px 4px 20px #6F8CB069, -6px -6px 20px #FFFFFF, 2px 2px 4px #728EAB1A`,
        background: '#E7EBF0',
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ color: '#1e293b', fontWeight: 600 }}>
            Highlights
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Select
              value={category}
              onChange={handleCategoryChange}
              size="small"
              sx={{
                minWidth: 100,
                bgcolor: '#E7EBF0',
                boxShadow: '4px 4px 20px #6F8CB069, -6px -6px 20px #FFFFFF, 2px 2px 4px #728EAB1A',
              }}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Subset">Subset</MenuItem>
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

export default LineSmoothChart;