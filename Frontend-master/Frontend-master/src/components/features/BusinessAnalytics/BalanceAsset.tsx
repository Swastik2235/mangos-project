// import  { useState, useRef, useMemo } from 'react';
// import {
//   ComposedChart,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   Bar,
//   LabelList,
//   Cell,
//   Legend
// } from 'recharts';
// import {
//   Card,
//   CardHeader,
//   CardContent,
//   IconButton,
//   Box,
// } from '@mui/material';
// import { Fullscreen, FullscreenExit } from '@mui/icons-material';
// import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

// type RawDatum = {
//   name: string;
//   comp1: number;
//   comp2: number;
//   type: 'start' | 'positive' | 'negative' | 'end';
//   label: string;
//   status: 'inc' | 'dec';
// };

// const rawData: RawDatum[] = [
//   { name: 'Comp 1', comp1: 500, comp2: 100, type: 'start', label: '78012\n+10,74%', status: 'inc' },
//   { name: 'Comp 2', comp1: 1500, comp2: 1800, type: 'positive', label: '78012\n+10,74%', status: 'inc' },
//   { name: 'Comp 3', comp1: -50, comp2: 128, type: 'negative', label: '78\n+10,74%', status: 'dec' },
//   { name: 'Comp 4', comp1: 5600, comp2: 2000, type: 'positive', label: '78012\n+10,74%', status: 'inc' },
//   { name: 'Comp 5', comp1: 0, comp2: 78, type: 'negative', label: '78012\n+10,74%', status: 'dec' },
//   { name: 'Comp 6', comp1: 3000, comp2: 4800, type: 'end', label: '78012\n+10,74%', status: 'inc' },
// ];

// interface WaterfallDatum extends RawDatum {
//   base: number;
//   total: number;
//   cumulative: number;
// }

// const preprocess = (data: RawDatum[]): WaterfallDatum[] => {
//   let runningTotal = 0;
//   return data.map((d,) => {
//     if (d.type === 'start') {
//       runningTotal = d.comp1 + d.comp2;
//       return { 
//         ...d, 
//         base: 0,
//         total: d.comp1 + d.comp2,
//         cumulative: runningTotal
//       };
//     }

//     if (d.type === 'end') {
//       return { 
//         ...d, 
//         base: 0,
//         total: runningTotal,
//         cumulative: runningTotal
//       };
//     }

//     const base = runningTotal;
//     runningTotal += d.comp1 + d.comp2;
//     return { 
//       ...d, 
//       base,
//       total: d.comp1 + d.comp2,
//       cumulative: runningTotal
//     };
//   });
// };

// const CustomLabel = ({ x = 0, y = 0, payload }: any) => {
//   if (!payload?.label) return null;

//   const Icon = payload.status === 'inc' ? ArrowDropUpIcon : ArrowDropDownIcon;
//   const iconColor = payload.status === 'inc' ? 'green' : 'red';

//   const [value = '', percent = ''] = payload.label.split('\n');

//   return (
//     <foreignObject x={x - 25} y={y - 60} width={80} height={60}>
//       <div style={{ textAlign: 'center', fontSize: 12, color: '#000', whiteSpace: 'pre-line' }}>
//         <div style={{ display: 'flex', justifyContent: 'center', color: iconColor }}>
//           <Icon fontSize="small" />
//         </div>
//         <div>{value}</div>
//         <div>{percent}</div>
//       </div>
//     </foreignObject>
//   );
// };

// const AssetChart = () => {
//   const [fullscreen, setFullscreen] = useState(false);
//   const cardRef = useRef<HTMLDivElement>(null);
//   const data = useMemo(() => preprocess(rawData), []);

//   const handleFullscreenToggle = () => {
//     if (!fullscreen && cardRef.current?.requestFullscreen) {
//       cardRef.current.requestFullscreen();
//     } else if (fullscreen && document.exitFullscreen) {
//       document.exitFullscreen();
//     }
//     setFullscreen(!fullscreen);
//   };

//   return (
//     <Card
//       ref={cardRef}
//       sx={{
//         bgcolor: '#E7EBF0',
//         borderRadius: 3,
//         boxShadow: 3,
//         position: fullscreen ? 'fixed' : 'relative',
//         inset: fullscreen ? 0 : 'auto',
//         zIndex: fullscreen ? 1300 : 'auto',
//         height: fullscreen ? '100vh' : 'auto',
//       }}
//     >
//       <CardHeader
//         title="Asset"
//         sx={{ pb: 0, '& .MuiCardHeader-title': { fontWeight: 700, fontSize: 20 } }}
//         action={
//           <IconButton onClick={handleFullscreenToggle} aria-label="fullscreen">
//             {fullscreen ? <FullscreenExit /> : <Fullscreen />}
//           </IconButton>
//         }
//       />
//       <CardContent sx={{ height: fullscreen ? '80vh' : 440 }}>
//         <ResponsiveContainer width="100%" height="100%">
//           <ComposedChart data={data} margin={{ top: 24, right: 32, left: 8, bottom: 32 }}>
//             <CartesianGrid stroke="#E0E0E0" vertical={false} />
//             <XAxis 
//               dataKey="name" 
//               tickFormatter={(name, index) => {
//                 if (index === data.length - 1) return `= ${name}`;
//                 return `${name} +`;
//               }}
//             />
//             <YAxis
//               domain={[0, 15000]}
//               tick={{ fontSize: 12, fill: '#4A4A4A' }}
//             />
//             <Tooltip
//               formatter={(value: number, name: string, ) => {
//                 if (name === 'comp1') return [`Comp 1: ${value}`, ''];
//                 if (name === 'comp2') return [`Comp 2: ${value}`, ''];
//                 return [`Total: ${value}`, ''];
//               }}
//             />
//             {/* Invisible base for waterfall effect */}
//             <Bar dataKey="base" stackId="a" fill="transparent" />
            
//             {/* Comp 1 segment */}
//             <Bar 
//               dataKey="comp1" 
//               stackId="a"
//               fill="#004d25"
//             >
//               {data.map(( index) => (
//                 <Cell key={`cell-comp1-${index}`} fill="#004d25" />
//               ))}
//             </Bar>
            
//             {/* Comp 2 segment */}
//             <Bar 
//               dataKey="comp2" 
//               stackId="a"
//               fill="#2ecc71"
//             >
//               {data.map(( index) => (
//                 <Cell key={`cell-comp2-${index}`} fill="#2ecc71" />
//               ))}
//               <LabelList content={<CustomLabel />} />
//             </Bar>
//           </ComposedChart>
//         </ResponsiveContainer>

//         {/* Legend */}
//         {/* <Box mt={
//         4} display="flex" justifyContent="center" gap={4} flexWrap="wrap">
//           <Box display="flex" alignItems="center" gap={1}>
//             <Box
//               sx={{
//                 width: 14,
//                 height: 14,
//                 borderRadius: 0,
//                 backgroundColor: '#004d25',
//               }}
//             />
//             <span style={{ fontWeight: 600 }}>Comp 1</span>
//           </Box>
//           <Box display="flex" alignItems="center" gap={1}>
//             <Box
//               sx={{
//                 width: 14,
//                 height: 14,
//                 borderRadius: 0,
//                 backgroundColor: '#2ecc71',
//               }}
//             />
//             <span style={{ fontWeight: 600 }}>Comp 2</span>
//           </Box>
//           <Box display="flex" alignItems="center" gap={1}>
//             <Box
//               sx={{
//                 width: 14,
//                 height: 14,
//                 borderRadius: '50%',
//                 backgroundColor: 'green',
//               }}
//             />
//             <span style={{ fontWeight: 600 }}>Increasing</span>
//           </Box>
//           <Box display="flex" alignItems="center" gap={1}>
//             <Box
//               sx={{
//                 width: 14,
//                 height: 14,
//                 borderRadius: '50%',
//                 backgroundColor: 'red',
//               }}
//             />
//             <span style={{ fontWeight: 600 }}>Decreasing</span>
//           </Box>
//         </Box> */}

//           <Box display="flex" alignItems="center" mt={2}>
//   <Legend
//     payload={[
//       { value: 'Comp 1', type: 'circle', id: '1', color: '#004d25' },
//       { value: 'Comp 2', type: 'circle', id: '2', color: '#2ecc71' },
//       { value: 'Increasing', type: 'circle', id: '3', color: 'green' },
//       { value: 'Decreasing', type: 'circle', id: '4', color: 'red' },
//     ]}
//   />
// </Box>
//       </CardContent>
//     </Card>
//   );
// };

// export default AssetChart;

import React, { useEffect, useState, useMemo } from 'react';
import {
  Tooltip,  
  Legend,
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer, 
  LabelList,
  Cell
} from 'recharts';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Box,
  Select,
  MenuItem,
} from '@mui/material';
import { Fullscreen, FullscreenExit } from '@mui/icons-material';

interface DataItem {
  name: string;
  comp1: number;
  comp2: number;
  label: string;
  status: 'inc' | 'dec';
}

const rawData: DataItem[] = [
  { name: 'Comp 1', comp1: 3000, comp2: 0, label: '78012\n+10.74%', status: 'inc' },
  { name: 'Comp 2', comp1: 7500, comp2: 2000, label: '78012\n+10.74%', status: 'inc' },
  { name: 'Comp 3', comp1: 0, comp2: 78, label: '78\n+10.74%', status: 'dec' },
  { name: 'Comp 4', comp1: 7000, comp2: 1000, label: '78012\n+10.74%', status: 'inc' },
  { name: 'Comp 5', comp1: 900, comp2: 100, label: '78012\n+10.74%', status: 'dec' },
  { name: 'Comp 6', comp1: 8000, comp2: 2000, label: '78012\n+10.74%', status: 'inc' },
];

interface WaterfallDatum extends DataItem {
  base: number;
  total: number;
}

const preprocess = (data: DataItem[]): WaterfallDatum[] => {
  let runningTotal = 0;
  return data.map((d, index) => {
    const base = index === 0 ? 0 : runningTotal;
    const total = d.comp1 + d.comp2;
    runningTotal += total;
    
    return { 
      ...d, 
      base,
      total
    };
  });
};

const CustomLabel: React.FC<any> = ({ x, y, width, index }) => {
  if (index === undefined || index >= rawData.length) return null;

  const { label, status } = rawData[index];
  const lines = label.split('\n');
  const Icon = status === 'inc' ? ArrowDropUpIcon : ArrowDropDownIcon;
  const iconColor = status === 'inc' ? 'green' : 'red';

  return (
    <g transform={`translate(${x + width / 2}, ${y - 35})`}>
      <text fill="#000" textAnchor="middle" fontSize={12}>
        {lines.map((line, i) => (
          <tspan key={i} x="0" dy={i === 0 ? 0 : 15}>
            {line}
          </tspan>
        ))}
      </text>
      <foreignObject x={-8} y={30} width={20} height={20}>
        <Icon style={{ fontSize: 16, color: iconColor }} />
      </foreignObject>
    </g>
  );
};

const EquityChart = () => {
  const [fullscreen, setFullscreen] = useState(false);
  const [title, setTitle] = useState('Title 1');
  const data = useMemo(() => preprocess(rawData), []);

  const minY = 0;
  const maxY = Math.max(...data.map(d => d.base + d.total)) * 1.2;

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen?.();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <Card
      elevation={4}
      sx={{
        borderRadius: 4,
        width: fullscreen ? '100vw' : '100%',
        height: fullscreen ? '100vh' : 'auto',
        position: fullscreen ? 'fixed' : 'relative',
        top: 0,
        left: 0,
        zIndex: fullscreen ? 9999 : 'auto',
        backgroundColor: '#E7EBF0',
      }}
    >
      <CardContent sx={{ p: fullscreen ? 4 : 3 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight={600}>
            Asset
          </Typography>
          <Box display="flex" alignItems="center" gap={2}>
            <Select
              value={title}
              size="small"
              onChange={(e) => setTitle(e.target.value)}
              sx={{ fontSize: 14 }}
            >
              <MenuItem value="Title 1">Title 1</MenuItem>
              <MenuItem value="Title 2">Title 2</MenuItem>
              <MenuItem value="Title 3">Title 3</MenuItem>
            </Select>
            <IconButton onClick={toggleFullscreen}>
              {fullscreen ? <FullscreenExit /> : <Fullscreen />}
            </IconButton>
          </Box>
        </Box>

        <ResponsiveContainer width="100%" height={fullscreen ? '80vh' : 420}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name" 
              tickFormatter={(name, index) => {
                if (index === data.length - 1) return `= ${name}`;
                return `${name} +`;
              }}
            />
            <YAxis domain={[minY, maxY]} />
            <Tooltip 
              formatter={(value: number, name: string, props: any) => {
                if (name === 'Total') {
                  return [`${props.payload.name}: ${value}`, ''];
                }
                return [`${name}: ${value}`, ''];
              }}
            />
            <Legend
              payload={[
                { value: 'Comp 1', type: 'circle', id: '1', color: '#004d25' },
                { value: 'Comp 2', type: 'circle', id: '2', color: '#2ecc71' },
                { value: 'Increasing', type: 'circle', id: '3', color: 'green' },
                { value: 'Decreasing', type: 'circle', id: '4', color: 'red' },
              ]}
            />
            
            {/* Invisible base for waterfall effect */}
            <Bar dataKey="base" stackId="a" fill="transparent" />
            
            {/* Comp 1 bar segment */}
            <Bar 
              dataKey="comp1" 
              stackId="a" 
              fill="#004d25"
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-comp1-${index}`}
                  fill={entry.status === 'inc' ? '#004d25' : '#2ecc71'}
                />
              ))}
            </Bar>
            
            {/* Comp 2 bar segment */}
            <Bar 
              dataKey="comp2" 
              stackId="a" 
              fill="#2ecc71"
            >
              <LabelList content={<CustomLabel />} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default EquityChart;