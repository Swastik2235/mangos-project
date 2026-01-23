import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
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
  DialogContent,
} from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
// import { color } from 'd3';

interface ActivityData {
  name: string;
  value: number;
  label: string;
  percentage: string;
  isPositive: boolean;
  color: string;
}

const activityData: ActivityData[] = [
  {
    name: 'Operating Activities',
    value: 25,
    label: '78,012',
    percentage: '+10.74%',
    isPositive: true,
    color: '#6B7280',
  },
  {
    name: 'Investing Activities',
    value: 30,
    label: '78,012',
    percentage: '-10.74%',
    isPositive: false,
    color: '#6B7280',
  },
  {
    name: 'Financing Activities',
    value: 25,
    label: '78,012',
    percentage: '+10.74%',
    isPositive: true,
    color: '#6B7280',
  },
];

const maxValue = 35;

const CashHighlight: React.FC = () => {
  const [category, setCategory] = useState<string>('Title 1');
  const [openFullscreen, setOpenFullscreen] = useState<boolean>(false);

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setCategory(event.target.value);
  };

  const toggleFullscreen = () => {
    setOpenFullscreen((prev) => !prev);
  };

  const renderChart = (containerHeight: number | string = 400) => (
    <Box sx={{ 
      position: 'relative', 
      height: containerHeight,
      width: '100%',
      minHeight: 400
    }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          layout="vertical"
          data={activityData}
          margin={{ top: 20, right: 80, left: 120, bottom: 20 }}
          barCategoryGap={30}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis
            type="number"
            domain={[0, maxValue]}
            tickFormatter={(v: number) => `${v}L`}
          />
          <YAxis
            type="category"
            dataKey="name"
            tick={{
              fill: '#334155',
              fontWeight: 500,
              fontSize: 13,
            }}
          />
          <ReferenceLine x={0} stroke="#000" />
          <Bar 
            dataKey="value" 
            barSize={28} 
            radius={[0, 8, 8, 0]} 
            isAnimationActive={false}
          >
            {activityData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  index === 0
                    ? "url(#barGradientTouch)"
                    : "url(#barGradientGap)"
                }
              />
            ))}
          </Bar>
          <defs>
            <linearGradient id="barGradientTouch" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#6B7280" />
              <stop offset="60%" stopColor="#6B7280" />
              <stop offset="60%" stopColor="#E5E7EB" />
              <stop offset="100%" stopColor="#E5E7EB" />
            </linearGradient>
            <linearGradient id="barGradientGap" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#E5E7EB" />
              <stop offset="30%" stopColor="#E5E7EB" />
              <stop offset="30%" stopColor="#6B7280" />
              <stop offset="100%" stopColor="#6B7280" />
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>

      <svg
        width="100%"
        height="100%"
        viewBox="0 0 600 360"
        style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
      >
        {activityData.map((entry, index) => (
          <g key={index} transform={`translate(420, ${80 + index * 90})`}>
            <text x="0" y="0" fontSize="13" fill="#000" fontWeight="600">
              {entry.label}
            </text>
            <g>
              <circle
                cx="10"
                cy="14"
                r="8"
                fill={entry.isPositive ? "#22c55e" : "#ef4444"}
              />
              <text
                x="10"
                y="18"
                textAnchor="middle"
                fontSize="13"
                fill="#fff"
                fontWeight="bold"
              >
                {entry.isPositive ? "+" : "−"}
              </text>
              <text
                x="22"
                y="18"
                fontSize="13"
                fill={entry.isPositive ? "#22c55e" : "#ef4444"}
                fontWeight="bold"
              >
                {entry.percentage.replace("+", "").replace("-", "")}
              </text>
            </g>
          </g>
        ))}
      </svg>
    </Box>
  );

  return (
    <Card sx={{ height: '100%', borderRadius: 3, boxShadow: 2, backgroundColor: "#E7EBF0",
 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" fontWeight="bold" color="#08070f">
            Highlights
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Select
              value={category}
              onChange={handleCategoryChange}
              size="small"
              sx={{
                minWidth: 80,
                bgcolor: '#E7EBF0',
                boxShadow: '0 2px 8px #E0E7EF',
                // borderRadius: 2,
                fontWeight: 600,
              }}
            >
              <MenuItem value="Title 1">Title 1</MenuItem>
              <MenuItem value="Title 2">Title 2</MenuItem>
            </Select>
            <IconButton onClick={toggleFullscreen} sx={{ color: '#08070f' }}>
              <FullscreenIcon />
            </IconButton>
          </Box>
        </Box>

        {renderChart(400)}

        <Dialog
          open={openFullscreen}
          onClose={toggleFullscreen}
          fullWidth
          maxWidth="lg"
          sx={{
            '& .MuiDialog-paper': {
              overflow: 'visible',
            },
          }}
        >
          <DialogContent sx={{ height: '80vh', p: 4 }}>
            {renderChart('100%')}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default CashHighlight;