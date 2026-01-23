import React, {useState} from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ReferenceLine, ResponsiveContainer, Cell } from 'recharts';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Select,
  MenuItem,
  IconButton,
  SelectChangeEvent
} from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';

interface MetricData {
  name: string;
  value: number;
}

const metricsData: MetricData[] = [
  { name: 'Liquidity', value: 4.5 },
  { name: 'Turnover', value: -1.8 },
  { name: 'Operating Profitability', value: 3.2 },
  { name: 'Business Risk', value: 1.5 },
  { name: 'Financial Risk', value: 1.6 },
  { name: 'Stability', value: -2.8 },
  { name: 'Coverage Financial', value: 3.8 },
  { name: 'Control', value: -2.5 },
];

const BusinessMetricsChart: React.FC = () => {
  // const [view, setView] = useState('Sales');
  const [category, setCategory] = useState('Fabrication Total');
  const [isFullscreen, setIsFullscreen] = useState(false);

  // const handleViewChange = (event: SelectChangeEvent) => {
  //   setView(event.target.value);
  // };

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };


  // Dynamically add colors to the data
  const processedData = metricsData.map((item) => ({
    ...item,
    fill: item.value >= 0 ? '#4CAF50' : '#f44336', // Add color based on value
  }));

  return (
    // <Paper
    //   elevation={3}
    //   sx={{
    //     p: 4,
    //     borderRadius: 2,
    //     bgcolor: '#f8f9fa',
    //   }}
    // >
    //   <Typography variant="h6" gutterBottom>
    //     Highlights
    //   </Typography>
      // <ResponsiveContainer width="100%" height={400}>
      //   <BarChart
      //     layout="vertical"
      //     data={processedData}
      //     margin={{ top: 20, right: 30, left: 100, bottom: 5 }}
      //   >
      //     <CartesianGrid strokeDasharray="3 3" horizontal={false} />
      //     <XAxis
      //       type="number"
      //       domain={[-5, 5]}
      //       ticks={[-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5]}
      //     />
      //     <YAxis
      //       type="category"
      //       dataKey="name"
      //       tick={{ fill: '#333', fontSize: 12 }}
      //     />
      //     <ReferenceLine x={0} stroke="#000" />
      //     <Bar
      //       dataKey="value"
      //       radius={[0, 4, 4, 0]}
      //       // Use `fill` from processed data
      //       isAnimationActive={false} // Disable animation for a better color display
      //     >
      //       {processedData.map((entry, index) => (
      //         <Bar key={`bar-${index}`} fill={entry.fill} />
      //       ))}
      //     </Bar>
      //   </BarChart>
      // </ResponsiveContainer>
    // </Paper>
  //   <Card
  //   sx={{
  //     borderRadius: 2,
  //     boxShadow: `
  //     4px 4px 20px 0px #6F8CB069,
  //     -6px -6px 20px 0px #FFFFFF,
  //     2px 2px 4px 0px #728EAB1A
  //     `,
  //     background: '#E7EBF0',
  //   }}
  // >

   
  //   <CardContent>
  //     <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
  //       <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
  //         <Typography variant="h3" component="h2" sx={{ color: '#1e293b', fontWeight: 600 }}>
  //         Title
  //         </Typography>
  //       </Box>
  //       <Box sx={{ display: 'flex', gap: 2 }}>
       
  //         <Select
  //           value={category}
  //           onChange={handleCategoryChange}
  //           size="small"
  //           sx={{ minWidth: 160, bgcolor: '#E7EBF0', boxShadow: '4px 4px 20px 0px #6F8CB069, -6px -6px 20px 0px #FFFFFF, 2px 2px 4px 0px #728EAB1A' }}
  //         >
  //           <MenuItem value="Fabrication Total">Fabrication Total</MenuItem>
  //           <MenuItem value="Production Total">Production Total</MenuItem>
  //         </Select>
  //         <IconButton onClick={toggleFullscreen}>
  //           <FullscreenIcon />
  //         </IconButton>
  //       </Box>
  //     </Box>

  //     <ResponsiveContainer width="100%" height={400}>
  //       <BarChart
  //         layout="vertical"
  //         data={processedData}
  //         margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
  //       >
  //         <CartesianGrid strokeDasharray="3 3" horizontal={false} />
  //         <XAxis
  //           type="number"
  //           domain={[-5, 5]}
  //           ticks={[-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5]}
  //         />
  //         <YAxis
  //           type="category"
  //           dataKey="name"
  //           tick={{ fill: '#333', fontSize: 12 }}
  //         />
  //         <ReferenceLine x={0} stroke="#000" />
  //         <Bar
  //           dataKey="value"
  //           radius={[0, 4, 4, 0]}
  //           // Use `fill` from processed data
  //           isAnimationActive={false} // Disable animation for a better color display
  //         >
  //           {processedData.map((entry, index) => (
  //             <Bar key={`bar-${index}`} fill={entry.fill} />
  //           ))}
  //         </Bar>
  //       </BarChart>
  //     </ResponsiveContainer>


  //     </CardContent>
  //     </Card>
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
            <Typography variant="h3" component="h2" sx={{ color: '#1e293b', fontWeight: 600 }}>
              Title
            </Typography>
          </Box>
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
            <IconButton onClick={toggleFullscreen}>
              <FullscreenIcon />
            </IconButton>
          </Box>
        </Box>

        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            layout="vertical"
            data={processedData}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" domain={[-5, 5]} ticks={[-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5]} />
            <YAxis type="category" dataKey="name" tick={{ fill: '#333', fontSize: 12 }} />
            <ReferenceLine x={0} stroke="#000" />
            <Bar dataKey="value" radius={[0, 4, 4, 0]} isAnimationActive={false}>
              {processedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default BusinessMetricsChart;