import React, { useState } from 'react';
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
import { Treemap, ResponsiveContainer } from 'recharts';

const treemapData = [
  {
    name: 'Total Liabilities',
    value: 21576,
    fill: '#6B1F1F',
    children: [
      {
        name: 'Current Liabilities',
        value: 6932,
        fill: '#8B2D2D',
        change: '+10.74%',
        icon: 'up'
      },
      {
        name: 'Non-current Liabilities',
        value: 6932,
        fill: '#8B2D2D',
        change: '-10.74%',
        icon: 'down'
      }
    ],
    change: '+10.74%',
    icon: 'up'
  },
  {
    name: 'Total Equity',
    value: 112358,
    fill: '#888888',
    children: [
      {
        name: 'Share Capital',
        value: 11235,
        fill: '#AAAAAA',
        change: '+10.74%',
        icon: 'up'
      },
      {
        name: 'Retained Earning',
        value: 1693,
        fill: '#AAAAAA',
        change: '-10.74%',
        icon: 'down'
      }
    ],
    change: '+10.74%',
    icon: 'up'
  },
  {
    name: 'Total Assets',
    value: 21576,
    fill: '#006D4B',
    children: [
      {
        name: 'Current Assets',
        value: 6932,
        fill: '#00875A',
        change: '+10.74%',
        icon: 'up'
      },
      {
        name: 'Non-current Assets',
        value: 6932,
        fill: '#00875A',
        change: '+10.74%',
        icon: 'up'
      }
    ],
    change: '+10.74%',
    icon: 'up'
  }
];

const CustomizedContent = (props: any) => {
  const { depth, x, y, width, height, name, value, fill, change, icon } = props;

  if (depth === 1) {
    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          rx={18}
          fill={fill}
          stroke="#fff"
          strokeWidth={3}
        />
        <text
          x={x + width/2}
          y={y + height/2 - 10}
          textAnchor="middle"
          fontSize={16}
          fill="#fff"
          fontWeight="bold"
        >
          {name}
        </text>
        <text
          x={x + width/2}
          y={y + height/2 + 15}
          textAnchor="middle"
          fontSize={14}
          fill="#fff"
        >
          {value.toLocaleString()}{' '}
          <tspan fill={icon === 'up' ? '#00C853' : '#F44336'}>
            {icon === 'up' ? '▲' : '▼'} {change}
          </tspan>
        </text>
      </g>
    );
  }

  if (depth === 2) {
    return (
      <g>
        <rect
          x={x + 4}
          y={y + 4}
          width={width - 8}
          height={height - 8}
          rx={10}
          fill={fill}
          stroke="#fff"
          strokeWidth={2}
        />
        <text
          x={x + width/2}
          y={y + height/2 - 5}
          textAnchor="middle"
          fontSize={14}
          fill="#fff"
          fontWeight="bold"
        >
          {name}
        </text>
        <text
          x={x + width/2}
          y={y + height/2 + 15}
          textAnchor="middle"
          fontSize={12}
          fill="#fff"
        >
          {value.toLocaleString()}{' '}
          <tspan fill={icon === 'up' ? '#00C853' : '#F44336'}>
            {icon === 'up' ? '▲' : '▼'} {change}
          </tspan>
        </text>
      </g>
    );
  }

  return null;
};

const BalanceChart: React.FC = () => {
  const [category, setCategory] = useState('Fabrication Total');
  const [openFullscreen, setOpenFullscreen] = useState(false);

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  const toggleFullscreen = () => {
    setOpenFullscreen((prev) => !prev);
  };

  return (
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="h5" component="h2" sx={{ color: '#1e293b', fontWeight: 700 }}>
              Highlights
            </Typography>
          </Box>
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
              <MenuItem value="Fabrication Total">Fabrication Total</MenuItem>
              <MenuItem value="Production Total">Production Total</MenuItem>
            </Select>
            <IconButton onClick={toggleFullscreen}>
              <FullscreenIcon />
            </IconButton>
          </Box>
        </Box>
        
        <Box sx={{ height: 400 }}>
          <ResponsiveContainer width="100%" height="100%">
            <Treemap
              data={treemapData}
              dataKey="value"
              aspectRatio={4/3}
              stroke="#fff"
              content={<CustomizedContent />}
            />
          </ResponsiveContainer>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mt: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 12, height: 12, bgcolor: '#006D4B', borderRadius: '50%' }} />
            <Typography variant="caption" color="#1e293b">Total Assets</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 12, height: 12, bgcolor: '#6B1F1F', borderRadius: '50%' }} />
            <Typography variant="caption" color="#1e293b">Total Liabilities</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 12, height: 12, bgcolor: '#888888', borderRadius: '50%' }} />
            <Typography variant="caption" color="#1e293b">Total Shareholders' Equity</Typography>
          </Box>
        </Box>

        <Dialog
          open={openFullscreen}
          onClose={toggleFullscreen}
          fullWidth
          maxWidth="md"
        >
          <DialogContent sx={{ height: '80vh' }}>
            <Box sx={{ height: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <Treemap
                  data={treemapData}
                  dataKey="value"
                  aspectRatio={4/3}
                  stroke="#fff"
                  content={<CustomizedContent />}
                />
              </ResponsiveContainer>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mt: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 12, height: 12, bgcolor: '#006D4B', borderRadius: '50%' }} />
                <Typography variant="caption" color="#1e293b">Total Assets</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 12, height: 12, bgcolor: '#6B1F1F', borderRadius: '50%' }} />
                <Typography variant="caption" color="#1e293b">Total Liabilities</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 12, height: 12, bgcolor: '#888888', borderRadius: '50%' }} />
                <Typography variant="caption" color="#1e293b">Total Shareholders' Equity</Typography>
              </Box>
            </Box>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default BalanceChart;