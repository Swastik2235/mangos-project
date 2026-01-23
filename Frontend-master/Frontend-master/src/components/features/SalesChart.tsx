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
//   FormControl,
//   InputLabel,
//   CircularProgress,
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
// import axios from 'axios';

// interface SaleData {
//   sale_date: string;
//   total_sales: string;
// }

// interface ChartData {
//   date: string;
//   label: string;
//   sales: number;
// }

// const SalesChart: React.FC = () => {
//   const [view, setView] = useState<'Sales' | 'Production'>('Sales');
//   const [category, setCategory] = useState('Fabrication Total');
//   const [openFullscreen, setOpenFullscreen] = useState(false);
//   const [salesData, setSalesData] = useState<ChartData[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchSalesData = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get('http://43.204.203.153:8000/mis_app/sale/get-sale/');
//         const rawData: SaleData[] = response.data.data;

//         const processedData = rawData.map(item => {
//           const date = new Date(item.sale_date);
//           const formattedDate = `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}`;

//           return {
//             date: item.sale_date,
//             label: formattedDate,
//             sales: parseFloat(item.total_sales)
//           };
//         });

//         processedData.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
//         setSalesData(processedData);
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to fetch sales data');
//         setLoading(false);
//         console.error('Error fetching sales data:', err);
//       }
//     };

//     if (view === 'Sales') {
//       fetchSalesData();
//     } else {
//       setLoading(false);
//     }
//   }, [view]);

//   const handleViewChange = (event: SelectChangeEvent) => {
//     setView(event.target.value as 'Sales' | 'Production');
//   };

//   const handleCategoryChange = (event: SelectChangeEvent) => {
//     setCategory(event.target.value);
//   };

//   const toggleFullscreen = () => {
//     setOpenFullscreen((prev) => !prev);
//   };

//   const productionData = Array.from({ length: 15 }, (_, i) => ({
//     day: i + 1,
//     daily_total_mt: Math.random() * 100 + 50,
//     label: `Day ${i + 1}`,
//     production_date: `2023-01-${i < 9 ? '0' + (i + 1) : i + 1}`
//   }));

//   const chartData = view === 'Sales' ? salesData : productionData;
//   const yKey = view === 'Sales' ? 'sales' : 'daily_total_mt';

//   const renderChart = (isFullscreen: boolean) => (
//     <ComposedChart 
//       data={chartData}
//       margin={isFullscreen ? { top: 20, right: 30, left: 20, bottom: 60 } : { top: 20, right: 30, left: 20, bottom: 60 }}
//     >
//       <CartesianGrid strokeDasharray="3 3" />
//       <XAxis
//         dataKey={view === 'Sales' ? 'label' : 'production_date'}
//         interval={0}
//         angle={-45}
//         textAnchor="end"
//         height={60}
//         tick={{ fontSize: isFullscreen ? 12 : 11 }}
//       />
//       <YAxis />
//       <Tooltip />
//       <Legend 
//         verticalAlign="bottom" 
//         align="center"
//         payload={[
//           { value: 'Legend 4', type: 'rect', color: '#3b82f6' },
//           { value: 'Legend 5', type: 'rect', color: '#2563eb' },
//           { value: 'Legend 4', type: 'rect', color: '#3b82f6' },
//           { value: 'Legend 5', type: 'rect', color: '#2563eb' }
//         ]}
//       />
//       <Bar
//         dataKey={yKey}
//         fill="#3b82f6"
//         name="Legend 4"
//         barSize={isFullscreen ? 20 : 10}
//         radius={[4, 4, 0, 0]}
//       />
//     </ComposedChart>
//   );

//   return (
//     <Card sx={{
//       borderRadius: 2,
//       boxShadow: `
//         4px 4px 20px 0px #6F8CB069,
//         -6px -6px 20px 0px #FFFFFF,
//         2px 2px 4px 0px #728EAB1A
//       `,
//       background: "#E7EBF0",
//     }}>
//       <CardContent>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
//           <Typography variant="h3" component="h2" sx={{ color: '#1e293b', fontWeight: 600 }}>
//             Total {view}
//           </Typography>
//           <Box sx={{ display: 'flex', gap: 2 }}>
//             <FormControl sx={{ m: 1, minWidth: 120 }}>
//               <InputLabel id="view-select-label">View</InputLabel>
//               <Select
//                 labelId="view-select-label"
//                 value={view}
//                 onChange={handleViewChange}
//                 size="small"
//                 sx={{ 
//                   bgcolor: '#E7EBF0',
//                   boxShadow: '4px 4px 20px 0px #6F8CB069, -6px -6px 20px 0px #FFFFFF, 2px 2px 4px 0px #728EAB1A'
//                 }}
//               >
//                 <MenuItem value="Sales">Sales</MenuItem>
//                 <MenuItem value="Production">Production</MenuItem>
//               </Select>
//             </FormControl>
//             <FormControl sx={{ m: 1, minWidth: 120 }}>
//               <InputLabel id="category-select-label">Category</InputLabel>
//               <Select
//                 labelId="category-select-label"
//                 value={category}
//                 onChange={handleCategoryChange}
//                 size="small"
//                 disabled={view !== 'Production'}
//                 sx={{ 
//                   bgcolor: '#E7EBF0',
//                   boxShadow: '4px 4px 20px 0px #6F8CB069, -6px -6px 20px 0px #FFFFFF, 2px 2px 4px 0px #728EAB1A'
//                 }}
//               >
//                 <MenuItem value="Fabrication Total">Fabrication Total</MenuItem>
//                 <MenuItem value="Galvanization">Galvanization</MenuItem>
//                 <MenuItem value="Production Total">Production Total</MenuItem>
//                 <MenuItem value="Fabrication + Galvanization">Fabrication + Galvanization</MenuItem>
//                 <MenuItem value="Solar">Solar</MenuItem>
//               </Select>
//             </FormControl>
//             <IconButton onClick={toggleFullscreen}>
//               <FullscreenIcon />
//             </IconButton>
//           </Box>
//         </Box>

//         <Box sx={{ 
//           height: 400, 
//           width: '100%', 
//           mt: 2,
//           overflow: 'hidden',
//           position: 'relative'
//         }}>
//           {loading ? (
//             <Box sx={{ 
//               display: 'flex', 
//               justifyContent: 'center', 
//               alignItems: 'center', 
//               height: '100%' 
//             }}>
//               <CircularProgress />
//             </Box>
//           ) : error ? (
//             <Box sx={{ 
//               display: 'flex', 
//               justifyContent: 'center', 
//               alignItems: 'center', 
//               height: '100%' 
//             }}>
//               <Typography color="error">{error}</Typography>
//             </Box>
//           ) : (
//             <Box sx={{
//               width: `${Math.max(chartData.length * 20, 1000)}px`,
//               height: '100%'
//             }}>
//               <ResponsiveContainer width="100%" height="120%">
//                 {renderChart(false)}
//               </ResponsiveContainer>
//             </Box>
//           )}
//         </Box>

//         <Dialog 
//           open={openFullscreen} 
//           onClose={toggleFullscreen} 
//           fullWidth 
//           maxWidth="xl"
//           sx={{
//             '& .MuiDialog-paper': {
//               overflow: 'hidden',
//               maxHeight: '90vh'
//             }
//           }}
//         >
//           <DialogContent sx={{ 
//             height: '80vh', 
//             p: 0,
//             display: 'flex',
//             flexDirection: 'column'
//           }}>
//             <Box sx={{ 
//               flex: 1,
//               minWidth: '90%',
//               overflow: 'auto',
//               '&::-webkit-scrollbar': {
//                 width: '2px',
//                 height: '8px'
//               },
//               '&::-webkit-scrollbar-thumb': {
//                 backgroundColor: '#c1c1c1',
//                 borderRadius: '4px'
//               }
//             }}>
//               <Box sx={{
//                 width: `${Math.max(chartData.length * 20, 1000)}px`,
//                 height: '100%'
//               }}>
//                 <ResponsiveContainer width="100%" height="100%">
//                   {renderChart(true)}
//                 </ResponsiveContainer>
//               </Box>
//             </Box>
//           </DialogContent>
//         </Dialog>
//       </CardContent>
//     </Card>
//   );
// };

// export default SalesChart;


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
  FormControl,
  // InputLabel,
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
// import axios from 'axios';
import endpoints from "../../utils/apiEndPoints";
import { apiRequest } from '../../utils/apiclient';


interface ChartDataItem {
  date: string;
  amount: number;
}

interface ChartData {
  date: string;
  sales: number;
  label: string;
}

const SalesChart: React.FC = () => {
  const [view, setView] = useState<'Sales' | 'Production'>('Sales');
  const [category, setCategory] = useState('Fabrication Total');
  const [openFullscreen, setOpenFullscreen] = useState(false);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
  const fetchChartData = async () => {
    try {
      setLoading(true);
      const response = await apiRequest<{
        status: boolean;
        data: ChartDataItem[];
      }>("GET", endpoints.getSalesChartData); // ✅ updated

      if (!response.status) {
        throw new Error("Failed to fetch chart data");
      }

      const rawData: ChartDataItem[] = response.data;

      const processedData = rawData.map(item => ({
        date: item.date,
        sales: item.amount,
        label: item.date,
      }));

      setChartData(processedData);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch chart data");
      setLoading(false);
      console.error("Error fetching chart data:", err);
    }
  };

  if (view === "Sales") {
    fetchChartData();
  } else {
    setLoading(false);
  }
}, [view]);


  const handleViewChange = (event: SelectChangeEvent) => {
    setView(event.target.value as 'Sales' | 'Production');
  };

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  const toggleFullscreen = () => {
    setOpenFullscreen((prev) => !prev);
  };

  const productionData = Array.from({ length: 15 }, (_, i) => ({
    date: `Day ${i + 1}`,
    daily_total_mt: Math.random() * 100 + 50,
    label: `Day ${i + 1}`,
    production_date: `2023-01-${i < 9 ? '0' + (i + 1) : i + 1}`
  }));

  const dataToDisplay = view === 'Sales' ? chartData : productionData;
  const yKey = view === 'Sales' ? 'sales' : 'daily_total_mt';
  const barName = view === 'Sales' ? 'Sales (₹)' : `${category} (MT)`;
  const barFill = view === 'Sales' ? '#3b82f6' : '#2563eb';

  const renderChart = (isFullscreen: boolean) => {
    // Fixed Y-axis ticks as shown in your screenshot
    const yAxisTicks = [0, 1000, 3000, 5000, 7000, 9000];

    return (
      <ComposedChart
        data={dataToDisplay}
        margin={isFullscreen ? { top: 20, right: 30, left: 20, bottom: 60 } : { top: 20, right: 30, left: 20, bottom: 60 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="label"
          interval={0}
          angle={-45}
          textAnchor="end"
          height={60}
          tick={{ fontSize: isFullscreen ? 12 : 11 }}
        />

        {/* <XAxis
  dataKey="label"
  interval={0} // Show all labels
  angle={-45}
  textAnchor="end"
  height={60}
  tick={{ fontSize: isFullscreen ? 12 : 11 }}
  tickMargin={5} // Reduced space between ticks
  minTickGap={1} // Minimum gap between ticks
  scale="point" // This evenly spaces points regardless of actual values
/> */}
        <YAxis
          ticks={yAxisTicks}
          tickFormatter={(value) => value.toLocaleString()}
        />
        <Tooltip
          formatter={(value: number) =>
            view === 'Sales'
              ? [`₹${value.toLocaleString()}`, barName]
              : [`${value.toFixed(2)}`, barName]
          }
        />
        <Legend />
        <Bar
          dataKey={yKey}
          fill={barFill}
          name={barName}
          barSize={isFullscreen ? 20 : 10}
          radius={[4, 4, 0, 0]}
        />
      </ComposedChart>
    );
  };

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
             {view}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 , overflowX: 'auto',flexWrap: 'nowrap'}}>
            <FormControl sx={{ m: 1, width: 80 }}>
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
                <MenuItem value="Sales">Sales</MenuItem>
                <MenuItem value="Production">Production</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, Width: 110 }}>
              {/* <InputLabel id="category-select-label">Category</InputLabel> */}
              <Select
                labelId="category-select-label"
                value={category}
                onChange={handleCategoryChange}
                size="small"
                disabled={view !== 'Production'}
                sx={{
                  bgcolor: '#E7EBF0',
                  boxShadow: '4px 4px 20px 0px #6F8CB069, -6px -6px 20px 0px #FFFFFF, 2px 2px 4px 0px #728EAB1A',
                  width: '100%',                  // <-- Important to make select fill FormControl width
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis', 
                }}
              >
                <MenuItem value="Fabrication Total">Fabrication Total</MenuItem>
                <MenuItem value="Galvanization">Galvanization</MenuItem>
                <MenuItem value="Production Total">Production Total</MenuItem>
                <MenuItem value="Fabrication + Galvanization">Fabrication + Galvanization</MenuItem>
                <MenuItem value="Solar">Solar</MenuItem>
              </Select>
            </FormControl>
            <IconButton onClick={toggleFullscreen}>
              <FullscreenIcon />
            </IconButton>
          </Box>
        </Box>

        <Box sx={{
          height: 400,
          width: '100%',
          mt: 2,
          overflow: 'hidden',
          position: 'relative'
        }}>
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
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%'
            }}>
              <Typography color="error">{error}</Typography>
            </Box>
          ) : (
            <Box sx={{
              height: 400,
              width: '100%',
              overflow: 'hidden' // Remove scrolling
            }}>
              <ResponsiveContainer width="100%" height="120%">
                {renderChart(false)}
              </ResponsiveContainer>
            </Box>
          )}
        </Box>

        <Dialog
          open={openFullscreen}
          onClose={toggleFullscreen}
          fullWidth
          maxWidth="xl"
          sx={{
            '& .MuiDialog-paper': {
              overflow: 'hidden',
              maxHeight: '90vh'
            }
          }}
        >
          <DialogContent sx={{
            height: '80vh',
            p: 0,
            display: 'flex',
            flexDirection: 'column'
          }}>
            <Box sx={{
              flex: 1,
              minWidth: '90%',
              overflow: 'auto',
              '&::-webkit-scrollbar': {
                width: '2px',
                height: '8px'
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#c1c1c1',
                borderRadius: '4px'
              }
            }}>
              <Box sx={{
                width: `${Math.max(dataToDisplay.length * 20, 1000)}px`,
                height: '100%'
              }}>
                <ResponsiveContainer width="100%" height="100%">
                  {renderChart(true)}
                </ResponsiveContainer>
              </Box>
            </Box>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default SalesChart;