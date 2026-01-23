import React, { useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine
} from 'recharts';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Select,
  MenuItem,
  IconButton,
  SelectChangeEvent,
  Dialog,
  DialogContent
} from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';

const areaData = [
  { project: 0, profit: 0 },
  { project: 10, profit: 10 },
  { project: 20, profit: 25 },
  { project: 30, profit: 40 },
  { project: 40, profit: 55 },
  { project: 50, profit: 60 },
  { project: 60, profit: 58 },
  { project: 70, profit: 55 },
  { project: 80, profit: 40 },
  { project: 90, profit: 20 },
  { project: 100, profit: 5 }
];

const UnrealisedProfitChart: React.FC = () => {
  const [category, setCategory] = useState('Fabrication Total');
  const [openFullscreen, setOpenFullscreen] = useState(false);

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  const toggleFullscreen = () => {
    setOpenFullscreen(!openFullscreen);
  };

  const renderChart = () => (
    <AreaChart
      data={areaData}
      margin={{ top: 20, right: 30, left: 40, bottom: 30 }}
    >
      <CartesianGrid stroke="#cfd8dc" vertical={false} />
      <XAxis
        dataKey="project"
        tick={{ fill: '#334155', fontSize: 14, fontWeight: 500 }}
        label={{
          value: 'No. Of Projects',
          position: 'insideBottom',
          offset: -20,
          fill: '#334155',
          fontSize: 16,
        }}
        tickLine={false}
        axisLine={{ stroke: '#334155', strokeWidth: 2 }}
      />
      <YAxis
        tick={{ fill: '#334155', fontSize: 16, fontWeight: 500 }}
        label={{
          value: 'Unrealised Profit',
          angle: -90,
          position: 'insideLeft',
          offset: 10,
          fill: '#334155',
          fontSize: 16,
          fontWeight: 600,
        }}
        tickLine={false}
        axisLine={{ stroke: '#334155' }}
        domain={[0, 80]}
        tickFormatter={v => `${v}L`}
      />
      <ReferenceLine 
        y={10} 
        stroke="#1976d2" 
        strokeDasharray="6 4" 
        label={{
          value: 'Profit',
          position: 'insideBottomRight',
          fill: '#1976d2',
          fontSize: 16,
          fontWeight: 600,
          dy: 10,
        }} 
      />
      <Tooltip />
      <Area
        type="monotone"
        dataKey="profit"
        stroke="#00695f"
        fill="#80cbc4"
        strokeWidth={5}
        dot={false}
        activeDot={{ r: 6 }}
      />
    </AreaChart>
  );

  return (
    <Card
      sx={{
        borderRadius: 4,
        boxShadow: `
          4px 4px 20px 0px #6F8CB069,
          -6px -6px 20px 0px #FFFFFF,
          2px 2px 4px 0px #728EAB1A
        `,
        background: '#E7EBF0',
        p: 2,
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h3" component="h2" sx={{ color: '#08070f', fontWeight: 600, fontSize: "1.3rem" }}>
            Unrealised Profit
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Select
              value={category}
              onChange={handleCategoryChange}
              size="small"
              sx={{
                minWidth: 160,
                bgcolor: '#E7EBF0',
                boxShadow: '4px 4px 20px 0px #6F8CB069, -6px -6px 20px 0px #FFFFFF, 2px 2px 4px 0px #728EAB1A',
              }}
            >
              <MenuItem value="Fabrication Total">Fabrication Total</MenuItem>
              <MenuItem value="Production Total">Production Total</MenuItem>
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

export default UnrealisedProfitChart;