import { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  ReferenceLine, ResponsiveContainer, Label, ReferenceArea,
} from 'recharts';
import {
  Box, Card, CardContent, IconButton, MenuItem,
  Select, Typography, Dialog, DialogContent, useTheme, useMediaQuery
} from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';

const profitData = [
  0.07, 0.065, 0.06, 0.058, 0.055, 0.05, 0.045, 0.04, 0.035, 0.03,
  0.025, 0.02, 0.018, 0.015, 0.012, 0.01, 0.008, 0.005, 0.003, 0.001,
  0, -0.01, -0.015, -0.02, -0.025, -0.03, -0.035, -0.045, -0.055, -0.062
];

let cumulative = 0;
const chartData = profitData.map((value, index) => {
  cumulative += value;
  return {
    percentile: (index + 1) / profitData.length,
    cumulative: parseFloat(cumulative.toFixed(3)),
  };
});

const actualNetProfit = parseFloat(chartData[chartData.length - 1].cumulative.toFixed(3));

const OperatingProfitProfile = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
  const [category, setCategory] = useState('Title 1');
  const [openFullscreen, setOpenFullscreen] = useState(false);

  const toggleFullscreen = () => {
    setOpenFullscreen(!openFullscreen);
  };

  const getChartHeight = () => {
    if (isSmallScreen) return 300;
    if (isMediumScreen) return 350;
    return 440;
  };

  const renderChart = (isFullscreen = false) => (
    <LineChart data={chartData}>
      <defs>
        <linearGradient id="profitGradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#1B5E20" />
          <stop offset="75%" stopColor="#1B5E20" />
          <stop offset="75.1%" stopColor="#7B241C" />
          <stop offset="100%" stopColor="#7B241C" />
        </linearGradient>
      </defs>

      <CartesianGrid stroke="#ddd" vertical={false} />

      <ReferenceArea x1={0} x2={0.25} y1={-0.1} y2={0.63} fill="rgba(27,94,32,0.15)" />
      <ReferenceArea x1={0.25} x2={0.75} y1={-0.1} y2={0.63} fill="rgba(0,0,0,0.06)" />
      <ReferenceArea x1={0.75} x2={1} y1={-0.1} y2={0.63} fill="rgba(123,36,28,0.15)" />

      <ReferenceLine x={0.25} stroke="#1976d2" strokeDasharray="5 5" />
      <ReferenceLine x={0.75} stroke="#1976d2" strokeDasharray="5 5" />
      <ReferenceLine x={1} stroke="#aaa" strokeDasharray="3 3" />

      <ReferenceLine y={actualNetProfit} stroke="#2e7d32" strokeWidth={2}>
        <Label 
          value="Actual Net Profit" 
          position="insideTopRight" 
          fill="#2e7d32" 
          fontSize={isSmallScreen && !isFullscreen ? 10 : 13} 
        />
      </ReferenceLine>

      <XAxis
        type="number"
        dataKey="percentile"
        domain={[0, 1]}
        tickFormatter={(v) => `${Math.round(v * 100)}%`}
        tick={{ fontSize: isSmallScreen && !isFullscreen ? 10 : 12 }}
        label={{
          value: 'Cumulative percentage of customers, ranked from most–to–least profitable',
          position: 'bottom',
          offset: isSmallScreen && !isFullscreen ? 0 : -5,
          fontSize: isSmallScreen && !isFullscreen ? 10 : 13,
          fontWeight: 600,
          fill: '#08070f'
        }}
      />

      <YAxis
        domain={[-0.1, 0.63]}
        tickFormatter={(v) => `${Math.round(v * 100)}%`}
        tick={{ fontSize: isSmallScreen && !isFullscreen ? 10 : 12 }}
        label={{
          value: 'Cumulative net profit',
          angle: -90,
          position: 'insideLeft',
          fontSize: isSmallScreen && !isFullscreen ? 10 : 13,
          fontWeight: 700,
          fill: '#08070f',
          offset: isSmallScreen && !isFullscreen ? 10 : 15
        }}
      />

      <Line
        type="monotone"
        dataKey="cumulative"
        stroke="url(#profitGradient)"
        strokeWidth={isSmallScreen && !isFullscreen ? 3 : 4}
        dot={false}
        isAnimationActive={false}
      />

      {(!isSmallScreen || isFullscreen) && (
        <>
          <text x="12%" y="140" fill="#1B5E20" fontSize={14} fontWeight={500}>
            Most{'\n'}Profitable
          </text>
          <text x="80%" y="250" fill="#7B241C" fontSize={14} fontWeight={500}>
            Least{'\n'}Profitable
          </text>
        </>
      )}
    </LineChart>
  );

  return (
    <Card sx={{ 
      borderRadius: 4,
      background: '#E7EBF0',
      boxShadow: `
        4px 4px 20px 0px #6F8CB069,
        -6px -6px 20px 0px #FFFFFF,
        2px 2px 4px 0px #728EAB1A
      `,
      width: '100%',
      maxWidth: '100%',
      mx: 'auto',
      my: 2
    }}>
      <CardContent sx={{ p: isSmallScreen ? 1 : 2 }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 2,
          flexDirection: isSmallScreen ? 'column' : 'row',
          gap: isSmallScreen ? 1 : 0
        }}>
          <Typography 
            variant="h5" 
            fontWeight={700} 
            color="#08070f" 
            fontSize={isSmallScreen ? "1.1rem" : "1.3rem"}
            sx={{ textAlign: isSmallScreen ? 'center' : 'left' }}
          >
            Operating Profit Profile
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            gap: 1, 
            width: isSmallScreen ? '100%' : 'auto',
            justifyContent: isSmallScreen ? 'space-between' : 'flex-end'
          }}>
            <Select
              size="small"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              sx={{ 
                bgcolor: '#E7EBF0',
                boxShadow: '4px 4px 20px 0px #6F8CB069, -6px -6px 20px 0px #FFFFFF, 2px 2px 4px 0px #728EAB1A',
                minWidth: isSmallScreen ? '48%' : 120
              }}
            >
              <MenuItem value="Title 1" sx={{ color: '#08070f' }}>Title 1</MenuItem>
              <MenuItem value="Title 2" sx={{ color: '#08070f' }}>Title 2</MenuItem>
            </Select>
            <IconButton 
              onClick={toggleFullscreen} 
              sx={{ 
                color: '#08070f',
                alignSelf: 'center'
              }}
              size={isSmallScreen ? 'small' : 'medium'}
            >
              <FullscreenIcon fontSize={isSmallScreen ? 'small' : 'medium'} />
            </IconButton>
          </Box>
        </Box>

        <Box sx={{ height: getChartHeight(), width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            {renderChart()}
          </ResponsiveContainer>
        </Box>

        <Dialog
          open={openFullscreen}
          onClose={toggleFullscreen}
          fullWidth
          maxWidth="lg"
          fullScreen={isSmallScreen}
        >
          <DialogContent sx={{ 
            height: isSmallScreen ? '90vh' : '80vh',
            p: isSmallScreen ? 1 : 3
          }}>
            <ResponsiveContainer width="100%" height="100%">
              {renderChart(true)}
            </ResponsiveContainer>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default OperatingProfitProfile;