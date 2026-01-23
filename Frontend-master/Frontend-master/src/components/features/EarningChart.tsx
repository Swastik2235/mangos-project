// import React, { useState, useEffect } from 'react';
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
//   CircularProgress,
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
// import { apiRequest } from '../../utils/apiclient';
// import endpoints from '../../utils/apiEndPoints';

// // Define the structure of the EarningsData interface
// interface EarningsData {
//   day: number;
//   date: string;
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

// const EarningsChart: React.FC = () => {
//   const [view, setView] = useState('%');
//   const [range, setRange] = useState('+/-');
//   const [openFullscreen, setOpenFullscreen] = useState(false);
//   const [earningsData, setEarningsData] = useState<EarningsData[]>([]);
//   const [loading, setLoading] = useState(true);

//   const toggleFullscreen = () => {
//     setOpenFullscreen((prev) => !prev);
//   };
//   const handleViewChange = (event: SelectChangeEvent) => {
//     setView(event.target.value);
//   };

//   const handleRangeChange = (event: SelectChangeEvent) => {
//     setRange(event.target.value);
//   };

//   // Fetch data from API
//  useEffect(() => {
//   const fetchEarningsData = async () => {
//     setLoading(true);
//     try {
//       const response = await apiRequest<{
//         success: boolean;
//         data: {
//           daily_earnings: {
//             date: string;
//             margin_percentage: string;
//             total_profit: string;
//             total_sales: string;
//           }[];
//         };
//       }>("GET", endpoints.getEarnings);

//       const apiData = response?.data?.daily_earnings || [];

//       const mapped: EarningsData[] = apiData.map((item, idx) => ({
//         day: idx + 1,
//         date: item.date,
//         earnings:
//           view === "%"
//             ? parseFloat(item.margin_percentage)
//             : parseFloat(item.total_profit),
//         value: parseFloat(item.total_sales),
//       }));

//       setEarningsData(mapped);
//     } catch (error) {
//       console.error("Error fetching earnings data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchEarningsData();
// }, [view]);

//   // Format numbers to 2 decimal places
//   const formatDecimal = (value: number) => value.toFixed(2);

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
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//             <Typography variant="h3" component="h2" sx={{ color: '#1e293b', fontWeight: 600 }}>
//               Earnings
//             </Typography>
//           </Box>
//           <Box sx={{ display: 'flex', gap: 2 }}>
//             <Select
//               value={view}
//               onChange={handleViewChange}
//               size="small"
//               sx={{
//                 minWidth: 80, bgcolor: '#E7EBF0',
//                 boxShadow: '4px 4px 20px 0px #6F8CB069, -6px -6px 20px 0px #FFFFFF, 2px 2px 4px 0px #728EAB1A',
//                 border: 'none'
//               }}
//             >
//               <MenuItem value="%">%</MenuItem>
//               <MenuItem value="value">Value</MenuItem>
//             </Select>
//             <Select
//               value={range}
//               onChange={handleRangeChange}
//               size="small"
//               sx={{
//                 minWidth: 80, bgcolor: '#E7EBF0',
//                 boxShadow: '4px 4px 20px 0px #6F8CB069, -6px -6px 20px 0px #FFFFFF, 2px 2px 4px 0px #728EAB1A',
//                 border: 'none'
//               }}
//             >
//               <MenuItem value="+/-">+/-</MenuItem>
//               <MenuItem value="custom">Custom</MenuItem>
//             </Select>
//             <IconButton onClick={toggleFullscreen}>
//               <FullscreenIcon />
//             </IconButton>
//           </Box>
//         </Box>

//         <Box sx={{ height: 415, width: '100%', mt: 2 }}>
//           {loading ? (
//             <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
//               <CircularProgress />
//             </Box>
//           ) : (
//             <ResponsiveContainer>
//               <LineChart
//                 data={earningsData}
//                 margin={{ top: 30, right: 30, left: 20, bottom: 20 }}
//               >
//                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
//                 <XAxis
//                   dataKey="date"
//                   axisLine={false}
//                   tickLine={false}
//                   tick={{ fill: '#64748b' }}
//                 />
//                 <YAxis
//                   axisLine={false}
//                   tickLine={false}
//                   tick={{ fill: '#64748b' }}
//                   tickFormatter={formatDecimal}
//                 />
//                 <Tooltip
//                   content={({ payload }) => {
//                     if (payload && payload.length) {
//                       const { date, earnings } = payload[0].payload;
//                       return (
//                         <div style={{
//                           backgroundColor: '#fff',
//                           padding: '10px',
//                           borderRadius: '8px',
//                           boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
//                         }}>
//                           <p><strong>Date: {date}</strong></p>
//                           <p><strong>{view === '%' ? 'Margin %' : 'Profit'}: {earnings.toFixed(2)}</strong></p>
//                         </div>
//                       );
//                     }
//                     return null;
//                   }}
//                 />
//                 <Legend />
//                 <Line
//                   type="monotone"
//                   dataKey="earnings"
//                   stroke="#22c55e"
//                   strokeWidth={2}
//                   dot={(props) => <CustomizedDot {...props} />}
//                   activeDot={{ r: 6 }}
//                   name={view === '%' ? 'Margin %' : 'Profit'}
//                   connectNulls
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           )}
//         </Box>

//         {/* Fullscreen Graph in Dialog */}
//         <Dialog
//           open={openFullscreen}
//           onClose={toggleFullscreen}
//           fullWidth
//           maxWidth="md"
//         >
//           <DialogContent sx={{ height: '80vh' }}>
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart
//                 data={earningsData}
//                 margin={{ top: 30, right: 30, left: 20, bottom: 20 }}
//               >
//                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
//                 <XAxis
//                   dataKey="date"
//                   axisLine={false}
//                   tickLine={false}
//                   tick={{ fill: '#64748b' }}
//                 />
//                 <YAxis
//                   axisLine={false}
//                   tickLine={false}
//                   tick={{ fill: '#64748b' }}
//                   tickFormatter={formatDecimal}
//                 />
//                 <Tooltip
//                   content={({ payload }) => {
//                     if (payload && payload.length) {
//                       const { date, earnings } = payload[0].payload;
//                       return (
//                         <div style={{
//                           backgroundColor: '#fff',
//                           padding: '10px',
//                           borderRadius: '8px',
//                           boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
//                         }}>
//                           <p><strong>Date: {date}</strong></p>
//                           <p><strong>{view === '%' ? 'Margin %' : 'Profit'}: {earnings.toFixed(2)}</strong></p>
//                         </div>
//                       );
//                     }
//                     return null;
//                   }}
//                 />
//                 <Legend />
//                 <Line
//                   type="monotone"
//                   dataKey="earnings"
//                   stroke="#22c55e"
//                   strokeWidth={2}
//                   dot={(props) => <CustomizedDot {...props} />}
//                   activeDot={{ r: 6 }}
//                   name={view === '%' ? 'Margin %' : 'Profit'}
//                   connectNulls
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </DialogContent>
//         </Dialog>
//       </CardContent>
//     </Card>
//   );
// };

// export default EarningsChart;

// import React, { useState, useEffect } from 'react';
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
//   CircularProgress,
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
// import { apiRequest } from '../../utils/apiclient';
// // import endpoints from '../../utils/apiEndPoints';

// // Define the structure of the EarningsData interface
// interface EarningsData {
//   day: string;
//   profit: number;
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

// const EarningsChart: React.FC = () => {
//   const [view, setView] = useState<'value' | '%'>('value');
//   const [range, setRange] = useState('+/-');
//   const [openFullscreen, setOpenFullscreen] = useState(false);
//   const [earningsData, setEarningsData] = useState<EarningsData[]>([]);
//   const [loading, setLoading] = useState(true);

//   const toggleFullscreen = () => {
//     setOpenFullscreen((prev) => !prev);
//   };
//   const handleViewChange = (event: SelectChangeEvent) => {
//     setView(event.target.value as 'value' | '%');
//   };

//   const handleRangeChange = (event: SelectChangeEvent) => {
//     setRange(event.target.value);
//   };

//   // Fetch data from API
//   useEffect(() => {
//     const fetchEarningsData = async () => {
//       setLoading(true);
//       try {
//         const response = await apiRequest<{
//           status: boolean;
//           message: string;
//           data: EarningsData[];
//         }>("GET", "http://43.204.203.153:8000/sales/get-earning-chart-data/");

//         if (response?.status && response.data) {
//           setEarningsData(response.data);
//         }
//       } catch (error) {
//         console.error("Error fetching earnings data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEarningsData();
//   }, []);

//   // Format numbers to 2 decimal places
//   const formatDecimal = (value: number) => value.toFixed(2);

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
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//             <Typography variant="h3" component="h2" sx={{ color: '#1e293b', fontWeight: 600 }}>
//               Earnings
//             </Typography>
//           </Box>
//           <Box sx={{ display: 'flex', gap: 2 }}>
//             <Select
//               value={view}
//               onChange={handleViewChange}
//               size="small"
//               sx={{
//                 minWidth: 80, bgcolor: '#E7EBF0',
//                 boxShadow: '4px 4px 20px 0px #6F8CB069, -6px -6px 20px 0px #FFFFFF, 2px 2px 4px 0px #728EAB1A',
//                 border: 'none'
//               }}
//             >
//               <MenuItem value="value">Value</MenuItem>
//               <MenuItem value="%" disabled>% (Not Available)</MenuItem>
//             </Select>
//             <Select
//               value={range}
//               onChange={handleRangeChange}
//               size="small"
//               sx={{
//                 minWidth: 80, bgcolor: '#E7EBF0',
//                 boxShadow: '4px 4px 20px 0px #6F8CB069, -6px -6px 20px 0px #FFFFFF, 2px 2px 4px 0px #728EAB1A',
//                 border: 'none'
//               }}
//             >
//               <MenuItem value="+/-">+/-</MenuItem>
//               <MenuItem value="custom">Custom</MenuItem>
//             </Select>
//             <IconButton onClick={toggleFullscreen}>
//               <FullscreenIcon />
//             </IconButton>
//           </Box>
//         </Box>

//         <Box sx={{ height: 415, width: '100%', mt: 2 }}>
//           {loading ? (
//             <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
//               <CircularProgress />
//             </Box>
//           ) : (
//             <ResponsiveContainer>
//               <LineChart
//                 data={earningsData}
//                 margin={{ top: 30, right: 30, left: 20, bottom: 20 }}
//               >
//                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
//                 <XAxis
//                   dataKey="day"
//                   axisLine={false}
//                   tickLine={false}
//                   tick={{ fill: '#64748b' }}
//                 />
//                 <YAxis
//                   axisLine={false}
//                   tickLine={false}
//                   tick={{ fill: '#64748b' }}
//                   tickFormatter={formatDecimal}
//                 />
//                 <Tooltip
//                   content={({ payload }) => {
//                     if (payload && payload.length) {
//                       const { day, profit } = payload[0].payload;
//                       return (
//                         <div style={{
//                           backgroundColor: '#fff',
//                           padding: '10px',
//                           borderRadius: '8px',
//                           boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
//                         }}>
//                           <p><strong>Day: {day}</strong></p>
//                           <p><strong>Profit: {profit.toFixed(2)}</strong></p>
//                         </div>
//                       );
//                     }
//                     return null;
//                   }}
//                 />
//                 <Legend />
//                 <Line
//                   type="monotone"
//                   dataKey="profit"
//                   stroke="#22c55e"
//                   strokeWidth={2}
//                   dot={(props) => <CustomizedDot {...props} />}
//                   activeDot={{ r: 6 }}
//                   name="Profit"
//                   connectNulls
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           )}
//         </Box>

//         {/* Fullscreen Graph in Dialog */}
//         <Dialog
//           open={openFullscreen}
//           onClose={toggleFullscreen}
//           fullWidth
//           maxWidth="md"
//         >
//           <DialogContent sx={{ height: '80vh' }}>
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart
//                 data={earningsData}
//                 margin={{ top: 30, right: 30, left: 20, bottom: 20 }}
//               >
//                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
//                 <XAxis
//                   dataKey="day"
//                   axisLine={false}
//                   tickLine={false}
//                   tick={{ fill: '#64748b' }}
//                 />
//                 <YAxis
//                   axisLine={false}
//                   tickLine={false}
//                   tick={{ fill: '#64748b' }}
//                   tickFormatter={formatDecimal}
//                 />
//                 <Tooltip
//                   content={({ payload }) => {
//                     if (payload && payload.length) {
//                       const { day, profit } = payload[0].payload;
//                       return (
//                         <div style={{
//                           backgroundColor: '#fff',
//                           padding: '10px',
//                           borderRadius: '8px',
//                           boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
//                         }}>
//                           <p><strong>Day: {day}</strong></p>
//                           <p><strong>Profit: {profit.toFixed(2)}</strong></p>
//                         </div>
//                       );
//                     }
//                     return null;
//                   }}
//                 />
//                 <Legend />
//                 <Line
//                   type="monotone"
//                   dataKey="profit"
//                   stroke="#22c55e"
//                   strokeWidth={2}
//                   dot={(props) => <CustomizedDot {...props} />}
//                   activeDot={{ r: 6 }}
//                   name="Profit"
//                   connectNulls
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </DialogContent>
//         </Dialog>
//       </CardContent>
//     </Card>
//   );
// };

// export default EarningsChart;



import React, { useState, useEffect } from 'react';
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
  CircularProgress,
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { apiRequest } from '../../utils/apiclient';
import endpoints from "../../utils/apiEndPoints";



interface EarningsData {
  day: string;
  profit: number;
}

const CustomizedDot = (props: { cx: number; cy: number; value: number }) => {
  const { cx, cy, value } = props;
  const isNegative = value < 0;
  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={4}
        fill="white"
        stroke={isNegative ? "#ef4444" : "#22c55e"}
        strokeWidth={2}
      />
      <text
        x={cx}
        y={cy - 10}
        textAnchor="middle"
        fill={isNegative ? "#ef4444" : "#22c55e"}
        fontSize="12"
      >
        {value.toFixed(2)}
      </text>
    </g>
  );
};

const EarningsChart: React.FC = () => {
  const [view, setView] = useState<'value' | '%'>('value');
  const [range, setRange] = useState('+/-');
  const [openFullscreen, setOpenFullscreen] = useState(false);
  const [earningsData, setEarningsData] = useState<EarningsData[]>([]);
  const [loading, setLoading] = useState(true);

  const toggleFullscreen = () => {
    setOpenFullscreen((prev) => !prev);
  };

  const handleViewChange = (event: SelectChangeEvent) => {
    setView(event.target.value as 'value' | '%');
  };

  const handleRangeChange = (event: SelectChangeEvent) => {
    setRange(event.target.value);
  };

 useEffect(() => {
  const fetchEarningsData = async () => {
    setLoading(true);
    try {
      const response = await apiRequest<{
        status: boolean;
        message: string;
        data: EarningsData[];
      }>("GET", endpoints.getEarningsChartData);  // 👈 updated

      if (response?.status && response.data) {
        // Convert profit values to lakhs for display
        const formattedData = response.data.map(item => ({
          ...item,
          profit: item.profit / 100000,
        }));
        setEarningsData(formattedData);
      }
    } catch (error) {
      console.error("Error fetching earnings data:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchEarningsData();
}, []);


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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="h3" component="h2" sx={{ color: '#1e293b', fontWeight: 600 }}>
              Earnings
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Select
              value={view}
              onChange={handleViewChange}
              size="small"
              sx={{
                minWidth: 80, bgcolor: '#E7EBF0',
                boxShadow: '4px 4px 20px 0px #6F8CB069, -6px -6px 20px 0px #FFFFFF, 2px 2px 4px 0px #728EAB1A',
                border: 'none'
              }}
            >
              <MenuItem value="value">Value</MenuItem>
              <MenuItem value="%" disabled>% (Not Available)</MenuItem>
            </Select>
            <Select
              value={range}
              onChange={handleRangeChange}
              size="small"
              sx={{
                minWidth: 80, bgcolor: '#E7EBF0',
                boxShadow: '4px 4px 20px 0px #6F8CB069, -6px -6px 20px 0px #FFFFFF, 2px 2px 4px 0px #728EAB1A',
                border: 'none'
              }}
            >
              <MenuItem value="+/-">+/-</MenuItem>
              <MenuItem value="custom">Custom</MenuItem>
            </Select>
            <IconButton onClick={toggleFullscreen}>
              <FullscreenIcon />
            </IconButton>
          </Box>
        </Box>

        <Box sx={{ height: 415, width: '100%', mt: 2 , color:'#E7EBF0'}}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <CircularProgress />
            </Box>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={earningsData}
                margin={{ top: 30, right: 30, left: 50, bottom: 20 }}
              >
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  vertical={false} 
                  stroke="#e2e8f0"
                  horizontalFill={['#f8fafc', '#fff']}
                />
                
                {/* Zero reference line */}
                <ReferenceLine 
                  y={0} 
                  stroke="#94a3b8" 
                  strokeWidth={1.5} 
                  strokeDasharray="6 6"  // This creates the 6-6 dashed pattern
                />
                
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontWeight: 'bold' }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ 
                    fill: '#64748b',
                    fontSize: 12,
                    fontWeight: 'bold' 
                  }}
                  ticks={[-30, -20, -10, 0, 10, 20, 30]}
                  tickFormatter={(value) => {
                    if (value === 0) return '0';
                    return `${value}L`;
                  }}
                  width={50}
                  domain={[-30, 30]}
                />
                <Tooltip
                  formatter={(value) => [`${value}L`, "Profit"]}
                  labelFormatter={(label) => `Day: ${label}`}
                  contentStyle={{
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="profit"
                  stroke="#22c55e"
                  strokeWidth={2}
                  dot={(props) => <CustomizedDot {...props} />}
                  activeDot={{ r: 6 }}
                  name="Profit"
                  connectNulls
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </Box>

        <Dialog
          open={openFullscreen}
          onClose={toggleFullscreen}
          fullWidth
          maxWidth="md"
        >
          <DialogContent sx={{ height: '80vh' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={earningsData}
                margin={{ top: 30, right: 30, left: 50, bottom: 20 }}
              >
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  vertical={false} 
                  stroke="#e2e8f0"
                  horizontalFill={['#f8fafc', '#fff']}
                />
                
                <ReferenceLine 
                  y={0} 
                  stroke="#94a3b8" 
                  strokeWidth={1.5} 
                  strokeDasharray="6 6" 
                />
                
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#64748b', fontWeight: 'bold' }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ 
                    fill: '#64748b',
                    fontSize: 12,
                    fontWeight: 'bold' 
                  }}
                  ticks={[-30, -20, -10, 0, 10, 20, 30]}
                  tickFormatter={(value) => {
                    if (value === 0) return '0';
                    return `${value}L`;
                  }}
                  width={50}
                  domain={[-30, 30]}
                />
                <Tooltip
                  formatter={(value) => [`${value}L`, "Profit"]}
                  labelFormatter={(label) => `Day: ${label}`}
                  contentStyle={{
                    backgroundColor: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="profit"
                  stroke="#22c55e"
                  strokeWidth={2}
                  dot={(props) => <CustomizedDot {...props} />}
                  activeDot={{ r: 6 }}
                  name="Profit"
                  connectNulls
                />
              </LineChart>
            </ResponsiveContainer>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default EarningsChart;