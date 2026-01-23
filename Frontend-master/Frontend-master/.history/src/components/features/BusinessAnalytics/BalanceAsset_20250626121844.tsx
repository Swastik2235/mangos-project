import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LabelList, ReferenceLine, Cell
} from 'recharts';
import {
  Card, CardContent, Typography, Box, Select, MenuItem, IconButton, SelectChangeEvent,
  Dialog, DialogContent, CircularProgress
} from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';

// Example data for waterfall
const rawData = [
  { name: 'Comp 1', value: 78012, percent: 10.74 },
  { name: 'Comp 2', value: 78012, percent: 10.74 },
  { name: 'Comp 3', value: 78, percent: 10.74 },
  { name: 'Comp 4', value: 78012, percent: 10.74 },
  { name: 'Comp 5', value: -78012, percent: 10.74 },
  { name: 'Comp 6', value: 78012, percent: 10.74 },
];

// Calculate cumulative values for waterfall
const getWaterfallData = (data: typeof rawData) => {
  let acc = 0;
  return data.map((item, idx) => {
    const prev = acc;
    acc += item.value;
    return {
      ...item,
      start: prev,
      end: acc,
      barValue: item.value,
      fill: item.value >= 0 ? '#0B6C3E' : '#B94A48',
      isTotal: idx === data.length - 1,
    };
  });
};

const waterfallData = getWaterfallData(rawData);

const BalanceAsset: React.FC = () => {
  const [category, setCategory] = useState('Fabrication Total');
  const [openFullscreen, setOpenFullscreen] = useState(false);
  const [loading, setLoading] = useState(false); // You can set this to true when fetching real data

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  const toggleFullscreen = () => {
    setOpenFullscreen(!openFullscreen);
  };

  const renderCustomLabel = (props: any) => {
    const { x, y, width, value, percent, fill } = props;
    let icon = null;
    if (percent !== undefined) {
      icon = fill === '#0B6C3E'
        ? <tspan fontSize={13} dy="-2" dx="2">🟢</tspan>
        : <tspan fontSize={13} dy="-2" dx="2">🔴</tspan>;
    }
    return (
      <g>
        <text x={x + width + 5} y={y + 15} fill="#222" fontSize={13} fontWeight={600}>
          {value}
        </text>
        {percent !== undefined && (
          <text x={x + width + 5} y={y + 30} fontSize={12} fontWeight={500} fill={fill === '#0B6C3E' ? '#0B6C3E' : '#B94A48'}>
            {icon}
            {percent > 0 ? `+${percent.toFixed(2)}%` : `${percent.toFixed(2)}%`}
          </text>
        )}
      </g>
    );
  };

  const renderChart = (height: number | string) => (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        data={waterfallData}
        margin={{ top: 20, right: 30, left: 0, bottom: 40 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          tick={({ x, y, index }) => {
            let label = "";
            if (index < waterfallData.length - 1) {
              label = `${waterfallData[index].name}  +`;
            } else if (index === waterfallData.length - 1) {
              label = `=  ${waterfallData[index].name}`;
            }
            return (
              <text
                x={x}
                y={y + 20}
                textAnchor="middle"
                fill="#22223B"
                fontWeight={500}
                fontSize={16}
                letterSpacing={0.5}
              >
                {label}
              </text>
            );
          }}
          axisLine={{
            stroke: "#22223B",
            strokeWidth: 2,
          }}
          tickLine={false}
          interval={0}
        />
        <YAxis
          domain={[0, 120000]}
          ticks={[0, 1000, 3000, 5000, 7000, 9000, 11000]}
          tick={{ fill: '#22223B', fontSize: 16, fontWeight: 500 }}
          axisLine={{
            stroke: "#22223B",
            strokeWidth: 2,
          }}
          tickLine={false}
        />
        <ReferenceLine y={0} stroke="#000" />
        <Bar
          dataKey="barValue"
          stackId="a"
          minPointSize={5}
          radius={[4, 4, 0, 0]}
          isAnimationActive={false}
        >
          <LabelList
            dataKey="barValue"
            content={renderCustomLabel}
          />
          {waterfallData.map((entry, idx) => (
            <Cell key={idx} fill={entry.fill} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );

  return (
    <>
      <Card
        sx={{
          borderRadius: 2,
          boxShadow: `
            4px 4px 20px 0px #6F8CB069,
            -6px -6px 20px 0px #FFFFFF,
            2px 2px 4px 0px #728EAB1A
          `,
          background: '#E7EBF0',
        }}
      >
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h5" sx={{ color: '#1e293b', fontWeight: 800, fontSize: 15 }}>
              Asset
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Select
                value={category}
                onChange={handleCategoryChange}
                size="small"
                sx={{
                  minWidth: 120,
                  bgcolor: '#E7EBF0',
                  boxShadow: '4px 4px 20px 0px #6F8CB069, -6px -6px 20px 0px #FFFFFF, 2px 2px 4px 0px #728EAB1A',
                }}
              >
                <MenuItem value="Fabrication Total">Current</MenuItem>
                <MenuItem value="Production Total">Previous</MenuItem>
              </Select>
              <IconButton onClick={toggleFullscreen}>
                <FullscreenIcon />
              </IconButton>
            </Box>
          </Box>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 390 }}>
              <CircularProgress />
            </Box>
          ) : (
            renderChart(390)
          )}

          <Box sx={{ display: 'flex', gap: 3, mt: 2, ml: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 16, height: 16, bgcolor: '#0B6C3E', borderRadius: '50%' }} />
              <Typography variant="body2">Comp 1</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 16, height: 16, bgcolor: '#B94A48', borderRadius: '50%' }} />
              <Typography variant="body2">Comp 2</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 16, height: 16, bgcolor: '#0B6C3E', borderRadius: '50%' }} />
              <Typography variant="body2">Increasing</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 16, height: 16, bgcolor: '#B94A48', borderRadius: '50%' }} />
              <Typography variant="body2">Decreasing</Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Dialog
        open={openFullscreen}
        onClose={toggleFullscreen}
        fullWidth
        maxWidth="lg"
        PaperProps={{
          sx: {
            height: '90vh',
            background: '#E7EBF0',
          }
        }}
      >
        <DialogContent sx={{ p: 3 }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h4" sx={{ color: '#1e293b', fontWeight: 800 }}>
              Asset (Fullscreen View)
            </Typography>
          </Box>
          
          {renderChart('80%')}

          <Box sx={{ display: 'flex', gap: 3, mt: 2, ml: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 16, height: 16, bgcolor: '#0B6C3E', borderRadius: '50%' }} />
              <Typography variant="body2">Comp 1</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 16, height: 16, bgcolor: '#B94A48', borderRadius: '50%' }} />
              <Typography variant="body2">Comp 2</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 16, height: 16, bgcolor: '#0B6C3E', borderRadius: '50%' }} />
              <Typography variant="body2">Increasing</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ width: 16, height: 16, bgcolor: '#B94A48', borderRadius: '50%' }} />
              <Typography variant="body2">Decreasing</Typography>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BalanceAsset;