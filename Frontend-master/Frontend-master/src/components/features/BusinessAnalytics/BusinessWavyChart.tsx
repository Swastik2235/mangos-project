import React, {useState} from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
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
  'Legend 1': number;
  'Legend 2': number;
  'Legend 3': number;
}

const metricsData: MetricData[] = [
  { name: 'Day 1', 'Legend 1': 15.8, 'Legend 2': 18.2, 'Legend 3': 24.3 },
  { name: 'Day 2', 'Legend 1': 16.2, 'Legend 2': 19.7, 'Legend 3': 25.1 },
  { name: 'Day 3', 'Legend 1': 17.1, 'Legend 2': 20.1, 'Legend 3': 25.9 },
  { name: 'Day 4', 'Legend 1': 17.8, 'Legend 2': 20.5, 'Legend 3': 26.3 },
  { name: 'Day 5', 'Legend 1': 21.2, 'Legend 2': 23.1, 'Legend 3': 28.4 },
  { name: 'Day 6', 'Legend 1': 22.5, 'Legend 2': 24.2, 'Legend 3': 29.1 },
  { name: 'Day 7', 'Legend 1': 19.3, 'Legend 2': 21.4, 'Legend 3': 27.2 },
  { name: 'Day 8', 'Legend 1': 18.5, 'Legend 2': 20.8, 'Legend 3': 26.7 },
  { name: 'Day 9', 'Legend 1': 17.3, 'Legend 2': 19.9, 'Legend 3': 26 },
  { name: 'Day 10', 'Legend 1': 16.7, 'Legend 2': 19.3, 'Legend 3': 25.6 },
  { name: 'Day 11', 'Legend 1': 16.1, 'Legend 2': 18.8, 'Legend 3': 25 },
  { name: 'Day 12', 'Legend 1': 15.6, 'Legend 2': 18.2, 'Legend 3': 24.5 },
  { name: 'Day 13', 'Legend 1': 16.2, 'Legend 2': 18.8, 'Legend 3': 25.1 },
  { name: 'Day 14', 'Legend 1': 19.4, 'Legend 2': 21.5, 'Legend 3': 27.3 },
];

const BusinessWavyChart: React.FC = () => {
  const [category, setCategory] = useState('Fabrication Total');
  const [isFullscreen, setIsFullscreen] = useState(false);


  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

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
      //   <LineChart data={metricsData} margin={{ top: 20, right: 30, left: 40, bottom: 5 }}>
      //     <CartesianGrid strokeDasharray="3 3" />
      //     <XAxis dataKey="name" />
      //     <YAxis type="number" domain={[0, 'dataMax']} />
      //     <Tooltip />
      //     <Legend />
      //     <Line type="monotone" dataKey="Legend 1" stroke="#4CAF50" />
      //     <Line type="monotone" dataKey="Legend 2" stroke="#FFC107" />
      //     <Line type="monotone" dataKey="Legend 3" stroke="#F44336" />
      //   </LineChart>
      // </ResponsiveContainer>
    // </Paper>
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
            sx={{ minWidth: 160, bgcolor: '#E7EBF0', boxShadow: '4px 4px 20px 0px #6F8CB069, -6px -6px 20px 0px #FFFFFF, 2px 2px 4px 0px #728EAB1A' }}
          >
            <MenuItem value="Fabrication Total">Fabrication Total</MenuItem>
            <MenuItem value="Production Total">Production Total</MenuItem>
          </Select>
          <IconButton onClick={toggleFullscreen}>
            <FullscreenIcon />
          </IconButton>
        </Box>
      </Box>


      <Box sx={{ height: 400, width: '100%', position: 'relative' }}>


        {/* --main chart--- */}
        <ResponsiveContainer width="100%" height={400}>
        <LineChart data={metricsData} margin={{ top: 20, right: 30, left: 40, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis type="number" domain={[0, 'dataMax']} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="Legend 1" stroke="#4CAF50" />
          <Line type="monotone" dataKey="Legend 2" stroke="#FFC107" />
          <Line type="monotone" dataKey="Legend 3" stroke="#F44336" />
        </LineChart>
      </ResponsiveContainer>
     
        
      </Box>
    </CardContent>
  </Card>
  );
};

export default BusinessWavyChart;