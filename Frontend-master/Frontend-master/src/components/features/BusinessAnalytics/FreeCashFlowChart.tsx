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
  DialogContent,
  SelectChangeEvent
} from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
// import { color } from 'd3';

const data = [
  { day: 1, operatingCashFlow: 180, freeCashFlow: 250, netIncome: 100 },
  { day: 2, operatingCashFlow: 200, freeCashFlow: 270, netIncome: 90 },
  { day: 3, operatingCashFlow: 190, freeCashFlow: 290, netIncome: 60 },
  { day: 4, operatingCashFlow: 210, freeCashFlow: 310, netIncome: 70 },
  { day: 5, operatingCashFlow: 160, freeCashFlow: 320, netIncome: 80 },
  { day: 6, operatingCashFlow: 150, freeCashFlow: 300, netIncome: 90 },
  { day: 7, operatingCashFlow: 130, freeCashFlow: 270, netIncome: 80 },
  { day: 8, operatingCashFlow: 120, freeCashFlow: 280, netIncome: 70 },
  { day: 9, operatingCashFlow: 130, freeCashFlow: 290, netIncome: 60 },
  { day: 10, operatingCashFlow: 110, freeCashFlow: 280, netIncome: 50 },
  { day: 11, operatingCashFlow: 100, freeCashFlow: 300, netIncome: 60 },
  { day: 12, operatingCashFlow: 140, freeCashFlow: 320, netIncome: 70 },
  { day: 13, operatingCashFlow: 180, freeCashFlow: 300, netIncome: 100 },
  { day: 14, operatingCashFlow: 170, freeCashFlow: 260, netIncome: 110 },
];

const CashFlowChart: React.FC = () => {
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
      <YAxis domain={[0, 350]} tickCount={8} />
      <Tooltip />
      <Legend />
      <Line 
        type="monotone" 
        dataKey="operatingCashFlow" 
        name="Operating Cash Flow" 
        stroke="#70b45d" // Blue color from the image
        strokeWidth={3} 
        dot={false} 
      />
      <Line 
        type="monotone" 
        dataKey="freeCashFlow" 
        name="Free Cash Flow" 
        stroke="#387f71" // Green color from the image
        strokeWidth={3} 
        dot={false} 
      />
      <Line 
        type="monotone" 
        dataKey="netIncome" 
        name="Net Income" 
        stroke="#69ee3f" // Orange color from the image
        strokeWidth={3} 
        dot={false} 
      />
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
          <Typography variant="h6" sx={{ color: '#08070f', fontWeight: 600, fontSize: '1.3rem' }}>
            Free Cash Flow
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Select
              value={category}
              onChange={handleCategoryChange}
              size="small"
              sx={{
                minWidth: 90,
                bgcolor: '#E7EBF0',
                boxShadow: '4px 4px 20px #6F8CB069, -6px -6px 20px #FFFFFF, 2px 2px 4px #728EAB1A',
              }}
            >
              <MenuItem value="All">All</MenuItem>
              <MenuItem value="Subset">Subset</MenuItem>
            </Select>
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

export default CashFlowChart;