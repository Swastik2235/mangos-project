// import React, { useState } from 'react';
// import {
//   Card,
//   CardContent,
//   Typography,
//   Box,
//   Select,
//   MenuItem,
//   IconButton,
//   SelectChangeEvent,
//   Dialog,
//   DialogContent,
// } from '@mui/material';
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from 'recharts';
// import FullscreenIcon from '@mui/icons-material/Fullscreen';

// // Define the structure of the EarningsData interface
// interface EarningsData {
//   day: number;
//   earnings: number;
//   value: number;
// }

// // Customized dot rendering for the Line chart
// const CustomizedDot = (props: { cx: number; cy: number; value: number }) => {
 

//   const { cx, cy, value } = props;
//   const isNegative = value < 0;



//   return (
//     <g>
//       <circle
//         cx={cx}
//         cy={cy}
//         r={4}
//         fill="white"
//         stroke={isNegative ? "#ef4444" : "#22c55e"}
//         strokeWidth={2}
//       />
//       <text
//         x={cx}
//         y={cy - 10}
//         textAnchor="middle"
//         fill={isNegative ? "#ef4444" : "#22c55e"}
//         fontSize="12"
//       >
//         {value.toFixed(2)}
//       </text>
//     </g>
//   );
// };

// const CostChart: React.FC = () => {
//   const [view, setView] = useState('%');
//   const [range, setRange] = useState('+/-');
//   const [openFullscreen, setOpenFullscreen] = useState(false);

//   const toggleFullscreen = () => {
//     setOpenFullscreen((prev) => !prev);
//   };
//   const handleViewChange = (event: SelectChangeEvent) => {
//     setView(event.target.value);
//   };

//   const handleRangeChange = (event: SelectChangeEvent) => {
//     setRange(event.target.value);
//   };

//   // Sample earnings data for chart
//   const earningsData: EarningsData[] = Array.from({ length: 15 }, (_, i) => ({
//     day: i + 1,
//     earnings: Math.random() * 50 - 25, // Random earnings for demo (could be negative)
//     value: Math.random() * 100, // Random values for demo
//   }));

//   // Format numbers to 2 decimal places
//   const formatDecimal = (value: number) => value.toFixed(2);

//   return (
//     <Card sx={{ 
//       // bgcolor: '#f8fafc',
//        borderRadius: 2, 
//       // boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
//       boxShadow: `
//       4px 4px 20px 0px #6F8CB069,
//       -6px -6px 20px 0px #FFFFFF,
//       2px 2px 4px 0px #728EAB1A
//       `,
//       background: "#E7EBF0", }}>
//       <CardContent>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//             <Typography variant="h3" component="h2" sx={{ color: '#1e293b', fontWeight: 600 }}>
//               Total Cost
//             </Typography>
//           </Box>
//           <Box sx={{ display: 'flex', gap: 2 }}>
//             <Select
//               value={view}
//               onChange={handleViewChange}
//               size="small"
//               sx={{ minWidth: 80, bgcolor: '#E7EBF0',  boxShadow: '4px 4px 20px 0px #6F8CB069, -6px -6px 20px 0px #FFFFFF, 2px 2px 4px 0px #728EAB1A',
//                 border:'none' }}
//             >
//               <MenuItem value="%">%</MenuItem>
//               <MenuItem value="value">Value</MenuItem>
//             </Select>
//             <Select
//               value={range}
//               onChange={handleRangeChange}
//               size="small"
//               sx={{ minWidth: 80, bgcolor: '#E7EBF0',  boxShadow: '4px 4px 20px 0px #6F8CB069, -6px -6px 20px 0px #FFFFFF, 2px 2px 4px 0px #728EAB1A',
//                 border:'none' }}
//             >
//               <MenuItem value="+/-">+/-</MenuItem>
//               <MenuItem value="custom">Custom</MenuItem>
//             </Select>
//              <IconButton onClick={toggleFullscreen}>
//         <FullscreenIcon />
//       </IconButton>
//           </Box>
//         </Box>

//         {/* <Box sx={{ height: 400, width: '100%' }}>
//           <ResponsiveContainer>
//             <LineChart
//               data={earningsData}
//               margin={{ top: 30, right: 30, left: 20, bottom: 20 }}
//             >
//               <CartesianGrid
//                 strokeDasharray="3 3"
//                 vertical={false}
//                 stroke="#e2e8f0"
//               />
//               <XAxis
//                 dataKey="day"
//                 axisLine={false}
//                 tickLine={false}
//                 tick={{ fill: '#64748b' }}
//               />
//               <YAxis
//                 ticks={[-30, -20, -10, 0, 10, 20, 30]}
//                 axisLine={false}
//                 tickLine={false}
//                 tick={{ fill: '#64748b' }}
//                 tickFormatter={formatDecimal} // Format Y-axis tick labels
//               />
//               <Tooltip
//                 content={({ payload }) => {
//                   if (payload && payload.length) {
//                     const { earnings } = payload[0].payload;
//                     return (
//                       <div style={{ backgroundColor: '#fff', padding: '10px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
//                         <p><strong>Day: {payload[0].payload.day}</strong></p>
//                         <p><strong>Earnings: {earnings.toFixed(2)}</strong></p> 
//                       </div>
//                     );
//                   }
//                   return null;
//                 }}
//               />
//               <Legend />
//               <Line
//                 type="monotone"
//                 dataKey="earnings"
//                 stroke="#22c55e"
//                 strokeWidth={2}
//                 dot={(props) => <CustomizedDot {...props} />}
//                 activeDot={{ r: 6 }}
//                 name="Earnings"
//                 connectNulls
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </Box> */}
//          <Box sx={{ height: 400, width: '100%', mt: 2 }}>
//         <ResponsiveContainer>
//           <LineChart
//             data={earningsData}
//             margin={{ top: 30, right: 30, left: 20, bottom: 20 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
//             <XAxis
//               dataKey="day"
//               axisLine={false}
//               tickLine={false}
//               tick={{ fill: '#64748b' }}
//             />
//             <YAxis
//               ticks={[-30, -20, -10, 0, 10, 20, 30]}
//               axisLine={false}
//               tickLine={false}
//               tick={{ fill: '#64748b' }}
//               tickFormatter={formatDecimal}
//             />
//             <Tooltip
//               content={({ payload }) => {
//                 if (payload && payload.length) {
//                   const { earnings } = payload[0].payload;
//                   return (
//                     <div style={{
//                       backgroundColor: '#fff',
//                       padding: '10px',
//                       borderRadius: '8px',
//                       boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
//                     }}>
//                       <p><strong>Day: {payload[0].payload.day}</strong></p>
//                       <p><strong>Earnings: {earnings.toFixed(2)}</strong></p>
//                     </div>
//                   );
//                 }
//                 return null;
//               }}
//             />
//             <Legend />
//             <Line
//               type="monotone"
//               dataKey="earnings"
//               stroke="#22c55e"
//               strokeWidth={2}
//               dot={(props) => <CustomizedDot {...props} />}
//               activeDot={{ r: 6 }}
//               name="Earnings"
//               connectNulls
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       </Box>

//        {/* Fullscreen Graph in Dialog */}
//        <Dialog
//         open={openFullscreen}
//         onClose={toggleFullscreen}
//         fullWidth
//         maxWidth="md"
//       >
//         <DialogContent sx={{ height: '80vh' }}>
//           <ResponsiveContainer width="100%" height="100%">
//             <LineChart
//               data={earningsData}
//               margin={{ top: 30, right: 30, left: 20, bottom: 20 }}
//             >
//               <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
//               <XAxis
//                 dataKey="day"
//                 axisLine={false}
//                 tickLine={false}
//                 tick={{ fill: '#64748b' }}
//               />
//               <YAxis
//                 ticks={[-30, -20, -10, 0, 10, 20, 30]}
//                 axisLine={false}
//                 tickLine={false}
//                 tick={{ fill: '#64748b' }}
//                 tickFormatter={formatDecimal}
//               />
//               <Tooltip
//                 content={({ payload }) => {
//                   if (payload && payload.length) {
//                     const { earnings } = payload[0].payload;
//                     return (
//                       <div style={{
//                         backgroundColor: '#fff',
//                         padding: '10px',
//                         borderRadius: '8px',
//                         boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
//                       }}>
//                         <p><strong>Day: {payload[0].payload.day}</strong></p>
//                         <p><strong>Earnings: {earnings.toFixed(2)}</strong></p>
//                       </div>
//                     );
//                   }
//                   return null;
//                 }}
//               />
//               <Legend />
//               <Line
//                 type="monotone"
//                 dataKey="earnings"
//                 stroke="#22c55e"
//                 strokeWidth={2}
//                 dot={(props) => <CustomizedDot {...props} />}
//                 activeDot={{ r: 6 }}
//                 name="Earnings"
//                 connectNulls
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         </DialogContent>
//       </Dialog>
//       </CardContent>
//     </Card>
//   );
// };

// export default CostChart;


// import React, { useState } from 'react';
// import {
//   Card,
//   CardContent,
//   Typography,
//   Box,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   IconButton,
//   SelectChangeEvent,
//   Dialog,
//   DialogContent,
// } from '@mui/material';
// import {
//   ComposedChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from 'recharts';
// import FullscreenIcon from '@mui/icons-material/Fullscreen';
// import CloseIcon from '@mui/icons-material/Close';


// // Define the structure of the CostData interface
// interface CostData {
//   day: string;
//   cost: number;
//   category?: string;
// }

// const CostChart: React.FC = () => {
//   const [view, setView] = useState('Cost');
//   const [category, setCategory] = useState('Daily');
//   const [openFullscreen, setOpenFullscreen] = useState(false);

//   const toggleFullscreen = () => {
//     setOpenFullscreen((prev) => !prev);
//   };

//   const handleViewChange = (event: SelectChangeEvent) => {
//     setView(event.target.value as string);
//   };

//   const handleCategoryChange = (event: SelectChangeEvent) => {
//     setCategory(event.target.value as string);
//   };

//   // Sample cost data for chart
//   const costData: CostData[] = [
//     { day: 'Day 1', cost: 42000 },
//     { day: 'Day 2', cost: 38000 },
//     { day: 'Day 3', cost: 45000 },
//     { day: 'Day 4', cost: 52000 },
//     { day: 'Day 5', cost: 48000 },
//     { day: 'Day 6', cost: 41000 },
//     { day: 'Day 7', cost: 39000 },
//     { day: 'Day 8', cost: 46000 },
//     { day: 'Day 9', cost: 51000 },
//     { day: 'Day 10', cost: 49000 },
//   ];


//   const items = [
//   { label: 'COST 1', value: '30%', color: '#e65100' },
//   { label: 'COST 2', value: '30%', color: '#ef6c00' },
//   { label: 'COST 3', value: '9%',  color: '#f57c00' },
//   { label: 'COST 4', value: '30%', color: '#fb8c00' },
//   { label: 'COST 5', value: '5%',  color: '#ff9800' },
//   { label: 'COST 6', value: '5%',  color: '#ffa726' },
//   { label: 'COST 7', value: '30%', color: '#ffb74d' },
//   { label: 'COST 8', value: '10%', color: '#ffcc80' },
// ];

//   function buildMultiColorGradient(items: { value: string, color: string }[]): string {
//   let gradientStops: string[] = [];
//   let accumulated = 0;

//   items.forEach((item) => {
//     const val = parseFloat(item.value);
//     const start = accumulated;
//     const end = accumulated + val;
//     gradientStops.push(`${item.color} ${start}%`, `${item.color} ${end}%`);
//     accumulated = end;
//   });

//   return `linear-gradient(to right, ${gradientStops.join(', ')})`;
// }


//   return (
//     <Card sx={{ 
//       borderRadius: 2, 
//       boxShadow: `
//       4px 4px 20px 0px #6F8CB069,
//       -6px -6px 20px 0px #FFFFFF,
//       2px 2px 4px 0px #728EAB1A
//       `,
//       background: "#E7EBF0", 
//     }}>
//       <CardContent>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
//           <Typography variant="h3" component="h2" sx={{ color: '#1e293b', fontWeight: 600 }}>
//             Total Cost
//           </Typography>
//           <Box sx={{ display: 'flex', gap: 2 }}>
//             <FormControl sx={{ m: 1, minWidth: 120 }}>
//               <InputLabel id="view-select-label">View</InputLabel>
//               <Select
//                 labelId="view-select-label"
//                 value={view}
//                 onChange={handleViewChange}
//                 size="small"
//                 sx={{ bgcolor: '#E7EBF0' }}
//               >
//                 <MenuItem value="Cost">Cost</MenuItem>
//                 <MenuItem value="Breakdown">Breakdown</MenuItem>
//               </Select>
//             </FormControl>
//             <FormControl sx={{ m: 1, minWidth: 120 }}>
//               <InputLabel id="category-select-label">Category</InputLabel>
//               <Select
//                 labelId="category-select-label"
//                 value={category}
//                 onChange={handleCategoryChange}
//                 size="small"
//                 disabled={view !== 'Breakdown'}
//                 sx={{ bgcolor: '#E7EBF0' }}
//               >
//                 <MenuItem value="Daily">Daily</MenuItem>
//                 <MenuItem value="Weekly">Weekly</MenuItem>
//                 <MenuItem value="Monthly">Monthly</MenuItem>
//               </Select>
//             </FormControl>
//             <IconButton onClick={toggleFullscreen}>
//               <FullscreenIcon />
//             </IconButton>
//           </Box>
//         </Box>

//         <Box sx={{ height: 400, width: '100%', mt: 2 }}>
//           <ResponsiveContainer>
//             <ComposedChart data={costData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis
//                 dataKey="day"
//                 interval={0}
//                 angle={-45}
//                 textAnchor="end"
//                 dy={10}
//                 tick={{ fontSize: 11 }}
//               />
//               <YAxis label={{ value: 'Cost (INR)', angle: -90, position: 'insideLeft' }} />
//               <Tooltip wrapperStyle={{ fontSize: '12px' }} />
//               <Legend verticalAlign="bottom" align="center" />
// <Bar dataKey="cost" fill="#f97306 " name="Cost (INR)" />
//             </ComposedChart>
//           </ResponsiveContainer>
//         </Box>

//         <Dialog open={openFullscreen} onClose={toggleFullscreen} fullWidth maxWidth="md">
//   <DialogContent sx={{ p: 2 }}>
//     {/* Original chart size preserved */}
//     <Box sx={{ height: 400, width: '100%' }}>
//       <ResponsiveContainer>
//         <ComposedChart data={costData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="day" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Bar dataKey="cost" fill="#f97306" />
//         </ComposedChart>
//       </ResponsiveContainer>
//     </Box>

//     {/* Critical Cost section below the chart */}
//     <Box
//       sx={{
//        mt: 3,
//     p: 1,
//     borderRadius: '16px',
//     backgroundColor:'#e7ebf0' ,
//     boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
//     color: '#fff',
//     display: 'flex',
//     flexDirection: 'column',
//     gap: 2,
//     position: 'relative',
//       }}
//     >
//      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//     <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color:'black' }}>
//       CRITICAL COST
//     </Typography>
//    <IconButton size="small" onClick={toggleFullscreen} sx={{ color: '#000', fontSize: '1.5rem' }}>
//   <CloseIcon sx={{ fontSize: '1.5rem', fontWeight: 700 }} />
// </IconButton>

//   </Box>
// <Box
//   sx={{
//     backgroundImage: buildMultiColorGradient(items),
//     borderRadius: 2,
//     // p: 2,
//     color: '#fff',
//     border: '1px solid rgba(0, 0, 0, 0.1)',
//     boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
//     fontFamily: 'Roboto, sans-serif',
//   }}
// >
//   <Box sx={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto' }}>
//   {items.map((item, idx) => (
//     <Box
//       key={idx}
//       sx={{
//         flex: `0 0 calc(100% / 8)`,
//         px: 1,
//         py: 1,
//         textAlign: 'center',
//         color: '#fff',
//         fontWeight: 600,
//         backdropFilter: 'brightness(0.8)',
//       }}
//     >
//       <Typography variant="body2">{item.label}</Typography>
//       <Typography variant="body2">₹12,000</Typography>
//       <Typography variant="caption">{item.value}</Typography>
//     </Box>
//   ))}
// </Box>

// </Box>


//       <Typography variant="subtitle2" sx={{ mt: 2,color:'black',fontWeight: 600, }}>
//         Total Cost Consume : 100,000/-
//       </Typography>

      
//     </Box>
//   </DialogContent>
// </Dialog>

//       </CardContent>
//     </Card>
//   );
// };

// export default CostChart;

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  FormControl,
  // InputLabel,
  Select,
  MenuItem,
  IconButton,
  SelectChangeEvent,
  Dialog,
  DialogContent,
  CircularProgress,
} from '@mui/material';
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import CloseIcon from '@mui/icons-material/Close';
import { apiRequest } from '../../utils/apiclient';
import endpoints from "../../utils/apiEndPoints";


interface CostData {
  day: string;
  cost: number;
  category?: string;
}

interface ApiCostData {
  label: string;
  amount: number;
}

const CostChart: React.FC = () => {
  const [view, setView] = useState('Cost');
  const [category, setCategory] = useState('Daily');
  const [openFullscreen, setOpenFullscreen] = useState(false);
  const [costData, setCostData] = useState<CostData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
  const fetchCostData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiRequest<{ status: boolean; message: string; data: ApiCostData[] }>(
        "GET",
        endpoints.getCostChartData // ✅ updated
      );

      if (response?.status) {
        const formattedData = response.data.map((item) => ({
          day: item.label,
          cost: item.amount,
        }));

        setCostData(formattedData);
      } else {
        setError(response?.message || "Failed to fetch cost data");
        setCostData(generateDummyData()); // fallback
      }
    } catch (err) {
      setError("Error fetching cost data");
      console.error("Error fetching cost data:", err);
      setCostData(generateDummyData()); // fallback
    } finally {
      setLoading(false);
    }
  };

  fetchCostData();
}, []);


  // Generate dummy data for demonstration
  const generateDummyData = (): CostData[] => {
    const data: CostData[] = [];
    for (let i = 1; i <= 15; i++) {
      data.push({
        day: new Date(2023, 0, i).toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
        }),
        cost: Math.random() * 10000 + 5000,
      });
    }
    return data;
  };

  const toggleFullscreen = () => {
    setOpenFullscreen((prev) => !prev);
  };

  const handleViewChange = (event: SelectChangeEvent) => {
    setView(event.target.value as string);
  };

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  const items = [
    { label: 'COST 1', value: '30%', color: '#e65100' },
    { label: 'COST 2', value: '30%', color: '#ef6c00' },
    { label: 'COST 3', value: '9%',  color: '#f57c00' },
    { label: 'COST 4', value: '30%', color: '#fb8c00' },
    { label: 'COST 5', value: '5%',  color: '#ff9800' },
    { label: 'COST 6', value: '5%',  color: '#ffa726' },
    { label: 'COST 7', value: '30%', color: '#ffb74d' },
    { label: 'COST 8', value: '10%', color: '#ffcc80' },
  ];

  function buildMultiColorGradient(items: { value: string, color: string }[]): string {
    let gradientStops: string[] = [];
    let accumulated = 0;

    items.forEach((item) => {
      const val = parseFloat(item.value);
      const start = accumulated;
      const end = accumulated + val;
      gradientStops.push(`${item.color} ${start}%`, `${item.color} ${end}%`);
      accumulated = end;
    });

    return `linear-gradient(to right, ${gradientStops.join(', ')})`;
  }

  const renderChart = () => (
    <ComposedChart data={costData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
      dataKey="day"
      interval={0}
      angle={-45}
      textAnchor="end"
      dy={10}
      dx={-5} // Adjust label positioning
      tick={{ fontSize: 11 }}
      height={60} // More space for labels
    />
    <YAxis label={{ value: 'Cost (INR)', angle: -90, position: 'insideLeft' }} />
    <Tooltip 
      formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Cost']}
    />
    <Legend verticalAlign="bottom" align="center" />
    <Bar 
      dataKey="cost" 
      fill="#f97306" 
      name="Cost (INR)"
      barSize={30} // Explicit bar width
    />
      </ComposedChart>

  );

  return (
    <Card sx={{ 
      borderRadius: 2, 
      boxShadow: `
      4px 4px 20px 0px #6F8CB069,
      -6px -6px 20px 0px #FFFFFF,
      2px 2px 4px 0px #728EAB1A
      `,
      background: "#E7EBF0", 
    }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h3" component="h2" sx={{ color: '#1e293b', fontWeight: 600 }}>
            
            Cost
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 , overflowX: 'auto',flexWrap: 'nowrap'}}>
            <FormControl sx={{ m: 1, width: 80}}>
              {/* <InputLabel id="view-select-label">View</InputLabel> */}
              <Select
                labelId="view-select-label"
                value={view}
                onChange={handleViewChange}
                size="small"
                sx={{ 
                  bgcolor: '#E7EBF0',
                  boxShadow: '4px 4px 20px 0px #6F8CB069, -6px -6px 20px 0px #FFFFFF, 2px 2px 4px 0px #728EAB1A'
                }}
              >
                <MenuItem value="Cost">Cost</MenuItem>
                <MenuItem value="Breakdown">Breakdown</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, Width: 110 }}>
              {/* <InputLabel id="category-select-label">Category</InputLabel> */}
              <Select
                labelId="category-select-label"
                value={category}
                onChange={handleCategoryChange}
                size="small"
                disabled={view !== 'Breakdown'}
                sx={{ 
                  bgcolor: '#E7EBF0',
                  boxShadow: '4px 4px 20px 0px #6F8CB069, -6px -6px 20px 0px #FFFFFF, 2px 2px 4px 0px #728EAB1A'
                , width: '100%',                  // <-- Important to make select fill FormControl width
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                }}
              >
                <MenuItem value="Daily">Daily</MenuItem>
                <MenuItem value="Weekly">Weekly</MenuItem>
                <MenuItem value="Monthly">Monthly</MenuItem>
              </Select>
            </FormControl>
            <IconButton onClick={toggleFullscreen}>
              <FullscreenIcon />
            </IconButton>
          </Box>
        </Box>

        <Box sx={{ height: 400, width: '100%', mt: 2 }}>
          {loading ? (
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              height: '100%' 
            }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              justifyContent: 'center', 
              alignItems: 'center', 
              height: '100%',
              gap: 2
            }}>
              <Typography color="error">{error}</Typography>
              <Typography variant="body2">Displaying sample data</Typography>
              <ResponsiveContainer width="100%" height="100%">
                {renderChart()}
              </ResponsiveContainer>
            </Box>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              {renderChart()}
            </ResponsiveContainer>
          )}
        </Box>

        <Dialog open={openFullscreen} onClose={toggleFullscreen} fullWidth maxWidth="md">
          <DialogContent sx={{ p: 2 }}>
            <Box sx={{ height: '60vh', width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                {renderChart()}
              </ResponsiveContainer>
            </Box>

            <Box
              sx={{
                mt: 3,
                p: 1,
                borderRadius: '16px',
                backgroundColor:'#e7ebf0',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                color: '#fff',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color:'black' }}>
                  CRITICAL COST
                </Typography>
                <IconButton size="small" onClick={toggleFullscreen} sx={{ color: '#000' }}>
                  <CloseIcon sx={{ fontSize: '1.5rem', fontWeight: 700 }} />
                </IconButton>
              </Box>
              <Box
                sx={{
                  backgroundImage: buildMultiColorGradient(items),
                  borderRadius: 2,
                  color: '#fff',
                  border: '1px solid rgba(0, 0, 0, 0.1)',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                }}
              >
                <Box sx={{ display: 'flex', flexWrap: 'nowrap', overflowX: 'auto' }}>
                  {items.map((item, idx) => (
                    <Box
                      key={idx}
                      sx={{
                        flex: `0 0 calc(100% / 8)`,
                        px: 1,
                        py: 1,
                        textAlign: 'center',
                        color: '#fff',
                        fontWeight: 600,
                        backdropFilter: 'brightness(0.8)',
                      }}
                    >
                      <Typography variant="body2">{item.label}</Typography>
                      <Typography variant="body2">₹12,000</Typography>
                      <Typography variant="caption">{item.value}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>

              <Typography variant="subtitle2" sx={{ mt: 2, color:'black', fontWeight: 600 }}>
                Total Cost Consume : {costData.reduce((sum, item) => sum + item.cost, 0).toFixed(2)}/-
              </Typography>
            </Box>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default CostChart;