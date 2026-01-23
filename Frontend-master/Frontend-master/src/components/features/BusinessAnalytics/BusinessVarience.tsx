import { useState } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Bar,
  Line,
  ReferenceLine,
  Tooltip,
} from 'recharts';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Select,
  MenuItem,
  IconButton,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogContent
} from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';

// Custom Legend Component with responsive adjustments
const CustomLegend = ({ isMobile, isTablet }: { isMobile: boolean; isTablet: boolean }) => (
  <Box 
    display="flex" 
    justifyContent="center" 
    alignItems="center" 
    mt={2} 
    gap={isMobile ? 1 : isTablet ? 2 : 4}
    flexWrap="wrap"
  >
    {[
      { color: '#003f88', text: 'Sales' },
      { color: '#4da9ff', text: 'Variance' },
      { color: '#e85d04', text: 'Cost' },
      { color: '#fbbf24', text: 'Variance' }
    ].map((item, index) => (
      <Box key={index} display="flex" alignItems="center" gap={1}>
        <Box sx={{ 
          width: isMobile ? 10 : 14, 
          height: isMobile ? 10 : 14, 
          borderRadius: '50%', 
          bgcolor: item.color 
        }} />
        <Typography 
          variant="body2" 
          fontWeight={600} 
          color={item.color}
          fontSize={isMobile ? '0.75rem' : '0.875rem'}
        >
          {item.text}
        </Typography>
      </Box>
    ))}
  </Box>
);

// Sample data based on the image
const data = [
  { day: '1', sales: 20, cost: -10, salesVariance: 10, costVariance: 0, variance: 10 },
  { day: '2', sales: 25, cost: -20, salesVariance: 5, costVariance: 0, variance: 5 },
  { day: '3', sales: 22, cost: -15, salesVariance: 7, costVariance: 0, variance: 7 },
  { day: '4', sales: 23, cost: -14, salesVariance: 9, costVariance: 0, variance: 9 },
  { day: '5', sales: 28, cost: -12, salesVariance: 12, costVariance: 0, variance: 12 },
  { day: '6', sales: 18, cost: -30, salesVariance: 0, costVariance: -12, variance: -12 },
  { day: '7', sales: 26, cost: -15, salesVariance: 11, costVariance: 0, variance: 11 },
  { day: '8', sales: 19, cost: -18, salesVariance: 8, costVariance: 0, variance: 8 },
  { day: '9', sales: 21, cost: -20, salesVariance: 6, costVariance: 0, variance: 6 },
  { day: '10', sales: 25, cost: -28, salesVariance: 0, costVariance: -3, variance: -3 },
  { day: '11', sales: 20, cost: -19, salesVariance: 1, costVariance: 0, variance: 1 },
  { day: '12', sales: 23, cost: -17, salesVariance: 6, costVariance: 0, variance: 6 },
  { day: '13', sales: 27, cost: -10, salesVariance: 17, costVariance: 0, variance: 17 },
  { day: '14', sales: 24, cost: -22, salesVariance: 2, costVariance: 0, variance: 2 },
  { day: '15', sales: 26, cost: -18, salesVariance: 8, costVariance: 0, variance: 8 },
];

const VarianceChart = () => {
  const [category, setCategory] = useState('Totle Name 1');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const handleCategoryChange = (event: any) => {
    setCategory(event.target.value);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const renderChart = () => (
    <ComposedChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="day"
        tickLine={false}
        axisLine={false}
        label={{
          value: 'Days',
          position: 'insideRight',
          offset: -10,
          fill: '#7B7B93',
          fontWeight: 600,
          fontSize: isMobile ? 10 : 14,
        }}
      />
      <YAxis
        tickFormatter={(val) => `${val}L`}
        domain={[-40, 40]}
        ticks={[-30, -20, -10, 0, 10, 20, 30]}
        axisLine={false}
        tickLine={false}
        label={{
          value: 'Costs',
          angle: -90,
          position: 'insideLeft',
          fill: '#e85d04',
          fontWeight: 600,
          fontSize: isMobile ? 10 : 14,
          offset: 10,
        }}
        width={isMobile ? 40 : 60}
      />
      <Tooltip />
      <ReferenceLine y={0} stroke="#000" />

      {/* Bars */}
      <Bar dataKey="sales" stackId="sales" fill="#003f88" barSize={isMobile ? 12 : 20} />
      <Bar dataKey="salesVariance" stackId="sales" fill="#4da9ff" barSize={isMobile ? 12 : 20} />
      <Bar dataKey="cost" stackId="sales" fill="#e85d04" barSize={isMobile ? 12 : 20} />
      <Bar dataKey="costVariance" stackId="sales" fill="#fbbf24" barSize={isMobile ? 12 : 20} />

      {/* Line Chart */}
      <Line
        type="monotone"
        dataKey="variance"
        stroke="#00b300"
        strokeWidth={2}
        dot={{ 
          stroke: '#fff', 
          strokeWidth: 2, 
          r: isMobile ? 3 : 5, 
          fill: '#00b300' 
        }}
      />
    </ComposedChart>
  );

  return (
    <>
      <Card
        sx={{
          borderRadius: 4,
          boxShadow: `4px 4px 20px #6F8CB069, -6px -6px 20px #FFFFFF, 2px 2px 4px #728EAB1A`,
          background: '#E7EBF0',
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Box>
              <Typography variant={isMobile ? "h6" : "h5"} fontWeight={600}>
                Variance
              </Typography>
              <Typography 
                variant={isMobile ? "caption" : "subtitle2"} 
                fontWeight={600} 
                color="#003f88" 
                sx={{ mt: -0.5 }}
              >
                Sales
              </Typography>
            </Box>
            <Box display="flex" gap={isMobile ? 1 : 2} alignItems="center">
              <Select
                value={category}
                onChange={handleCategoryChange}
                size="small"
                sx={{
                  minWidth: isMobile ? 100 : 140,
                  background: '#E7EBF0',
                  boxShadow: `4px 4px 20px #6F8CB069, -6px -6px 20px #FFFFFF`,
                  '& .MuiSelect-select': {
                    fontSize: isMobile ? '0.75rem' : '0.875rem',
                    padding: isMobile ? '8px 24px 8px 12px' : '8px 32px 8px 16px'
                  }
                }}
              >
                <MenuItem 
                  value="Totle Name 1" 
                  sx={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}
                >
                  Totle Name 1
                </MenuItem>
                <MenuItem 
                  value="Totle Name 2" 
                  sx={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}
                >
                  Totle Name 2
                </MenuItem>
              </Select>
              <IconButton 
                onClick={toggleFullscreen} 
                size={isMobile ? 'small' : 'medium'}
              >
                <FullscreenIcon fontSize={isMobile ? 'small' : 'medium'} />
              </IconButton>
            </Box>
          </Box>

          <Box sx={{ flexGrow: 1, minHeight: isMobile ? 300 : 400 }}>
            <ResponsiveContainer width="100%" height="100%">
              {renderChart()}
            </ResponsiveContainer>
          </Box>
          
          <CustomLegend isMobile={isMobile} isTablet={isTablet} />
        </CardContent>
      </Card>

      {/* Fullscreen Dialog */}
      <Dialog
        open={isFullscreen}
        onClose={toggleFullscreen}
        fullWidth
        maxWidth="md"
        fullScreen={isMobile}
      >
        <DialogContent sx={{ 
          height: isMobile ? '100%' : '80vh',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Box sx={{ flexGrow: 1 }}>
            <ResponsiveContainer width="100%" height="100%">
              {renderChart()}
            </ResponsiveContainer>
          </Box>
          <CustomLegend isMobile={isMobile} isTablet={isTablet} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VarianceChart;