import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer, Area
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

const data = [
  { project: 0, revenue: 0, totalCost: 30, fixedCost: 30, variableCost: 0 },
  { project: 25, revenue: 20, totalCost: 35, fixedCost: 30, variableCost: 5 },
  { project: 50, revenue: 50, totalCost: 50, fixedCost: 30, variableCost: 20 },
  { project: 75, revenue: 75, totalCost: 65, fixedCost: 30, variableCost: 35 },
  { project: 100, revenue: 80, totalCost: 80, fixedCost: 30, variableCost: 50 },
];

const BreakEvenChart: React.FC = () => {
  const [category, setCategory] = useState<string>('Fabrication Total');
  const [openFullscreen, setOpenFullscreen] = useState(false);

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setCategory(event.target.value);
  };

  const toggleFullscreen = () => {
    setOpenFullscreen(!openFullscreen);
  };

  const breakEven = data.find(d => d.revenue === d.totalCost);

  const renderChart = () => (
    <LineChart data={data} margin={{ top: 20, right: 110, left: 20, bottom: 30 }}>
      <CartesianGrid stroke="#cfd8dc" vertical={false} />
      <XAxis
        dataKey="project"
        tick={{ fill: '#334155', fontSize: 13, fontWeight: 500 }}
        label={{
          value: 'No. Of Projects',
          position: 'insideBottom',
          offset: -10,
          fill: '#334155',
          fontSize: 13,
          fontWeight: 600,
        }}
        tickLine={false}
        axisLine={{ stroke: '#334155', strokeWidth: 2 }}
        domain={[0, 100]}
        type="number"
      />
      <YAxis
        ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80]}
        tick={{ fill: '#334155', fontSize: 13, fontWeight: 500 }}
        label={{
          value: 'Revenues and cost',
          angle: -90,
          position: 'insideLeft',
          offset: 5,
          fill: '#334155',
          fontSize: 13,
          fontWeight: 600,
        }}
        tickLine={false}
        axisLine={{ stroke: '#334155', strokeWidth: 2 }}
        domain={[0, 80]}
        tickFormatter={v => `${v.toString().padStart(2, '0')}L`}
      />

      {/* Loss Area */}
      <Area
        type="linear"
        dataKey="totalCost"
        stroke="none"
        fill="#f8bbd0"
        fillOpacity={0.5}
        isAnimationActive={false}
      />
      {/* Profit Area */}
      <Area
        type="linear"
        dataKey="revenue"
        stroke="none"
        fill="#c8e6c9"
        fillOpacity={0.5}
        isAnimationActive={false}
      />

      <Line type="linear" dataKey="revenue" stroke="#388e3c" strokeWidth={2} dot={false} name="Total Revenue" />
<Line
  type="linear"
  dataKey="totalCost"
  stroke="#a52a2a"
  strokeWidth={2}
  dot={false}
  name="Total Cost"
/>
      <Line type="linear" dataKey="fixedCost" stroke="#26304a" strokeWidth={2} dot={false} name="Fixed Costs" />
      <Line type="linear" dataKey="variableCost" stroke="#1976d2" strokeWidth={2} dot={false} name="Variable Costs" />

      {/* Break Even Point */}
      {breakEven && (
        <ReferenceLine
          x={breakEven.project}
          y={breakEven.revenue}
          label={{
            value: 'Break Even Point',
            position: 'right',
            fill: '#26304a',
            fontSize: 12,
            fontWeight: 600,
            dx: 6,
          }}
          stroke="#26304a"
          strokeDasharray="3 3"
        />
      )}

      <Tooltip />

      {/* Labels */}
      <ReferenceLine x={100} y={80} label={{ value: 'Total Revenue', position: 'right', fill: '#388e3c', fontSize: 12, fontWeight: 600, dx: 6 }} stroke="none" />
      <ReferenceLine x={100} y={80} label={{ value: 'Total Costs', position: 'left', fill: '#8d6e63', fontSize: 12, fontWeight: 600, dx: -40, dy: -10 }} stroke="none" />
      <ReferenceLine x={100} y={30} label={{ value: 'Fixed Costs', position: 'right', fill: '#26304a', fontSize: 12, fontWeight: 600, dx: 6, dy: -6 }} stroke="none" />
      <ReferenceLine x={100} y={50} label={{ value: 'Variable Costs', position: 'right', fill: '#1976d2', fontSize: 12, fontWeight: 600, dx: 6, dy: 6 }} stroke="none" />
      <ReferenceLine x={10} y={15} label={{ value: 'Loss', position: 'insideLeft', fill: '#b71c1c', fontSize: 13, fontWeight: 600, dx: 6, dy: 30 }} stroke="none" />
      <ReferenceLine x={80} y={70} label={{ value: 'Profit', position: 'insideRight', fill: '#388e3c', fontSize: 13, fontWeight: 600, dx: -15, dy: -30 }} stroke="none" />
    </LineChart>
  );

  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: `
          2px 2px 10px 0px #6F8CB069,
          -3px -3px 10px 0px #FFFFFF,
          1px 1px 2px 0px #728EAB1A
        `,
      background: '#E7EBF0',
        p: 1.5,
      }}
    >
      <CardContent sx={{ p: 1.5 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" component="h2" sx={{ color: '#08070f', fontWeight: 600 ,fontSize:"1.2rem"}}>
            Break Even
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Select
              value={category}
              onChange={handleCategoryChange}
              size="small"
              sx={{
                minWidth: 140,
                bgcolor: '#E7EBF0',
                boxShadow: '2px 2px 10px 0px #6F8CB069, -3px -3px 10px 0px #FFFFFF, 1px 1px 2px 0px #728EAB1A',
              }}
            >
              <MenuItem value="Fabrication Total" sx={{ color: '#08070f' }}>Fabrication Total</MenuItem>
              <MenuItem value="Production Total" sx={{ color: '#08070f' }}>Production Total</MenuItem>
            </Select>
              <IconButton onClick={toggleFullscreen} sx={{ color: '#08070f' }}>
              <FullscreenIcon />
            </IconButton>
          </Box>
        </Box>

        <Box sx={{ height: 420 }}>
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

export default BreakEvenChart;