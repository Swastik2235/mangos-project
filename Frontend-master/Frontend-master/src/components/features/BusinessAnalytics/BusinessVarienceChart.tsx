import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
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
  useTheme,
  useMediaQuery
} from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import GridViewIcon from '@mui/icons-material/GridView';

// Color palette matching the screenshot
const COLOR_SALES = '#388BFF';
const COLOR_VARIANCE_BLUE = '#388BFF';
const COLOR_COST = '#FF9800';
const COLOR_VARIANCE_ORANGE = '#FF9800';
const COLOR_PROFIT = '#4CAF50';
const COLOR_VARIANCE_GREEN = '#4CAF50';

// Data for each ring - exactly matching the screenshot with proper ordering
const outerData = [
  { name: 'Sales', value: 38, color: COLOR_SALES, label: '38L' },
  { name: 'Cost', value: 17, color: COLOR_COST, label: '17L' },
  { name: 'Profit', value: 31, color: COLOR_PROFIT, label: '31L' },
];

const middleData = [
  { name: 'Variance', value: 21, color: COLOR_VARIANCE_BLUE, label: '21L' },
  { name: 'Variance', value: 9, color: COLOR_VARIANCE_ORANGE, label: '09L' },
  { name: 'Variance', value: 18, color: COLOR_VARIANCE_GREEN, label: '18L' },
];

const innerData = [
  { name: 'Variance', value: 17, color: COLOR_VARIANCE_BLUE, label: '17L', icon: '▲' },
  { name: 'Variance', value: 2, color: COLOR_VARIANCE_ORANGE, label: '02L', icon: '▼' },
  { name: 'Variance', value: 3, color: COLOR_VARIANCE_GREEN, label: '03L', icon: '▲' },
];

// SVG pattern for stripes with better visibility
const StripesDefs = () => (
  <defs>
    <pattern id="stripes-blue" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <rect width="4" height="8" fill={COLOR_VARIANCE_BLUE} />
      <rect x="4" width="4" height="8" fill="white" fillOpacity="0.8" />
    </pattern>
    <pattern id="stripes-green" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <rect width="4" height="8" fill={COLOR_VARIANCE_GREEN} />
      <rect x="4" width="4" height="8" fill="white" fillOpacity="0.8" />
    </pattern>
    <pattern id="stripes-orange" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <rect width="4" height="8" fill={COLOR_VARIANCE_ORANGE} />
      <rect x="4" width="4" height="8" fill="white" fillOpacity="0.8" />
    </pattern>
  </defs>
);

const BusinessVarianceChart: React.FC = () => {
  const [category, setCategory] = useState('Title 1');
  const [openFullscreen, setOpenFullscreen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  const toggleFullscreen = () => {
    setOpenFullscreen(!openFullscreen);
  };

  // Custom label renderer
  const renderCustomLabel = (props: any) => {
    const { cx, cy, midAngle, outerRadius, label } = props;
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + (isMobile ? 12 : 18);
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    
    return (
      <text 
        x={x} 
        y={y} 
        fill="#1e293b" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central" 
        fontWeight={600}
        fontSize={isMobile ? 10 : 12}
      >
        {label}
      </text>
    );
  };

  // Render icons in inner ring
  const renderInnerIcons = ({ cx, cy, innerRadius }: { cx: number; cy: number; innerRadius: number }) => {
    return innerData.map((entry, index) => {
      // Adjusted angles to match the exact positioning in the screenshot
      const angles = [30, 150, 270]; // Blue top-right, Orange bottom-left, Green left
      const angle = angles[index];
      const RADIAN = Math.PI / 180;
      const radius = innerRadius * 0.6;
      const x = cx + radius * Math.cos(-angle * RADIAN);
      const y = cy + radius * Math.sin(-angle * RADIAN);
      
      return (
        <text
          key={`icon-${index}`}
          x={x}
          y={y}
          fill={entry.icon === '▲' ? '#ff4444' : '#ff4444'}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={16}
          fontWeight="bold"
        >
          {entry.icon}
        </text>
      );
    });
  };

  const renderChart = () => {
    return (
      <ResponsiveContainer width="100%" height={isMobile ? 280 : 358}>
        <PieChart>
          <StripesDefs />
          <circle cx="50%" cy="50%" r="20%" fill="#E9ECEF" stroke="#E9ECEF" />
          
          {/* Outer Ring */}
          <Pie
            data={outerData}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius="60%"
            outerRadius="80%"
            startAngle={90}
            endAngle={-270}
            paddingAngle={2}
            label={renderCustomLabel}
          >
            {outerData.map((entry, index) => (
              <Cell key={`outer-${index}`} fill={entry.color} />
            ))}
          </Pie>
          
          {/* Middle Ring */}
          <Pie
            data={middleData}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius="45%"
            outerRadius="55%"
            startAngle={90}
            endAngle={-270}
            paddingAngle={2}
            label={renderCustomLabel}
          >
            {middleData.map((entry, index) => (
              <Cell key={`middle-${index}`} fill={entry.color} fillOpacity={0.5} />
            ))}
          </Pie>
          
          {/* Inner Ring */}
          <Pie
            data={innerData}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius="30%"
            outerRadius="40%"
            startAngle={90}
            endAngle={-270}
            paddingAngle={2}
            label={renderCustomLabel}
          >
            {innerData.map((entry, index) => (
              <Cell
                key={`inner-${index}`}
                fill={
                  entry.color === COLOR_VARIANCE_BLUE
                    ? 'url(#stripes-blue)'
                    : entry.color === COLOR_VARIANCE_GREEN
                    ? 'url(#stripes-green)'
                    : 'url(#stripes-orange)'
                }
              />
            ))}
          </Pie>
          
          {/* Render icons */}
          {renderInnerIcons({ cx: 200, cy: 179, innerRadius: 54 })}
        </PieChart>
      </ResponsiveContainer>
    );
  };

  return (
    <Card sx={{
      borderRadius: 4,
      boxShadow: '4px 4px 20px 0px rgba(111, 140, 176, 0.41), -6px -6px 20px 0px #FFFFFF, 2px 2px 4px 0px rgba(114, 142, 171, 0.1)',
      background: '#E7EBF0',
      p: 2,
      height: '100%',
      maxWidth: 600,
      mx: 'auto'
    }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <GridViewIcon sx={{ fontSize: isMobile ? 16 : 18, color: '#374151' }} />
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: isMobile ? '1rem' : '1.25rem', color: '#374151' }}>
              Highlights
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Select
              value={category}
              onChange={handleCategoryChange}
              size="small"
              sx={{
                minWidth: isMobile ? 100 : 120,
                bgcolor: '#E7EBF0',
                borderRadius: 2,
                boxShadow: '0px 2px 8px rgba(231, 235, 240, 0.8)',
                fontSize: isMobile ? '0.75rem' : '0.875rem',
                '& .MuiSelect-select': {
                  py: 1
                }
              }}
            >
              <MenuItem value="Title 1">Title 1</MenuItem>
              <MenuItem value="Title 2">Title 2</MenuItem>
              <MenuItem value="Title 3">Title 3</MenuItem>
            </Select>
            <IconButton 
              onClick={toggleFullscreen} 
              size="small" 
              sx={{ 
                bgcolor: '#E7EBF0',
                '&:hover': {
                  bgcolor: '#d1d5db'
                }
              }}
            >
              <FullscreenIcon fontSize={isMobile ? 'small' : 'medium'} />
            </IconButton>
          </Box>
        </Box>

        {renderChart()}
        {/* Legend */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          mt: 2, 
          gap: 2, 
          flexWrap: 'wrap',
          '& > *': { display: 'flex', alignItems: 'center', gap: 0.5 }
        }}>
          <Box>
            <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: COLOR_SALES }} />
            <Typography variant="caption" sx={{ color: '#6b7280' }}>Sales</Typography>
          </Box>
          <Box>
            <Box sx={{ 
              width: 10, 
              height: 10, 
              borderRadius: '50%',
              background: `repeating-linear-gradient(135deg, ${COLOR_VARIANCE_BLUE}, ${COLOR_VARIANCE_BLUE} 4px, white 4px, white 8px)`
            }} />
            <Typography variant="caption" sx={{ color: '#6b7280' }}>Variance</Typography>
          </Box>
          <Box>
            <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: COLOR_COST }} />
            <Typography variant="caption" sx={{ color: '#6b7280' }}>Cost</Typography>
          </Box>
          <Box>
            <Box sx={{ 
              width: 10, 
              height: 10, 
              borderRadius: '50%',
              background: `repeating-linear-gradient(135deg, ${COLOR_VARIANCE_ORANGE}, ${COLOR_VARIANCE_ORANGE} 4px, white 4px, white 8px)`
            }} />
            <Typography variant="caption" sx={{ color: '#6b7280' }}>Variance</Typography>
          </Box>
          <Box>
            <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: COLOR_PROFIT }} />
            <Typography variant="caption" sx={{ color: '#6b7280' }}>Profit</Typography>
          </Box>
          <Box>
            <Box sx={{ 
              width: 10, 
              height: 10, 
              borderRadius: '50%',
              background: `repeating-linear-gradient(135deg, ${COLOR_VARIANCE_GREEN}, ${COLOR_VARIANCE_GREEN} 4px, white 4px, white 8px)`
            }} />
            <Typography variant="caption" sx={{ color: '#6b7280' }}>Variance</Typography>
          </Box>
        </Box>

        {/* Fullscreen Dialog */}
        <Dialog open={openFullscreen} onClose={toggleFullscreen} fullScreen={isMobile}>
          <DialogContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 4 }}>
            <Box sx={{ width: '100%', height: isMobile ? '80vh' : '70vh', maxWidth: 600 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#374151' }}>
                  Highlights - Fullscreen View
                </Typography>
                <IconButton onClick={toggleFullscreen}>
                  <Typography sx={{ fontSize: 24 }}>×</Typography>
                </IconButton>
              </Box>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <StripesDefs />
                  <circle cx="50%" cy="50%" r="15%" fill="#E9ECEF" stroke="#E9ECEF" />
                  <Pie
                    data={outerData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    innerRadius="60%"
                    outerRadius="80%"
                    startAngle={90}
                    endAngle={-270}
                    paddingAngle={2}
                    label={renderCustomLabel}
                  >
                    {outerData.map((entry, index) => (
                      <Cell key={`outer-fs-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Pie
                    data={middleData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    innerRadius="45%"
                    outerRadius="55%"
                    startAngle={90}
                    endAngle={-270}
                    paddingAngle={2}
                    label={renderCustomLabel}
                  >
                    {middleData.map((entry, index) => (
                      <Cell key={`middle-fs-${index}`} fill={entry.color} fillOpacity={0.5} />
                    ))}
                  </Pie>
                  <Pie
                    data={innerData}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    innerRadius="30%"
                    outerRadius="40%"
                    startAngle={90}
                    endAngle={-270}
                    paddingAngle={2}
                    label={renderCustomLabel}
                  >
                    {innerData.map((entry, index) => (
                      <Cell
                        key={`inner-fs-${index}`}
                        fill={
                          entry.color === COLOR_VARIANCE_BLUE
                            ? 'url(#stripes-blue)'
                            : entry.color === COLOR_VARIANCE_GREEN
                            ? 'url(#stripes-green)'
                            : 'url(#stripes-orange)'
                        }
                      />
                    ))}
                  </Pie>
                  {renderInnerIcons({ cx: 300, cy: 300, innerRadius: 120 })}
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default BusinessVarianceChart;
