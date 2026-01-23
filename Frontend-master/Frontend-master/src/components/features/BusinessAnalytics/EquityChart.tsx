// import React, { useEffect, useState, useMemo } from 'react';
// import {
//   Tooltip,  
//   Legend,
//   BarChart, 
//   Bar, 
//   XAxis, 
//   YAxis, 
//   CartesianGrid, 
//   ResponsiveContainer, 
//   LabelList,
//   Cell  // Added Cell to the imports
// } from 'recharts';
// import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import {
//   Card,
//   CardContent,
//   Typography,
//   IconButton,
//   Box,
//   Select,
//   MenuItem,
// } from '@mui/material';
// import { Fullscreen, FullscreenExit } from '@mui/icons-material';

// interface DataItem {
//   name: string;
//   comp1: number;
//   comp2: number;
//   label: string;
//   status: 'inc' | 'dec';
// }

// const rawData: DataItem[] = [
//   { name: 'Comp 1', comp1: 3000, comp2: 0, label: '78012\n+10.74%', status: 'inc' },
//   { name: 'Comp 2', comp1: 7500, comp2: 2000, label: '78012\n+10.74%', status: 'inc' },
//   { name: 'Comp 3', comp1: 0, comp2: 78, label: '78\n+10.74%', status: 'dec' },
//   { name: 'Comp 4', comp1: 7000, comp2: 1000, label: '78012\n+10.74%', status: 'inc' },
//   { name: 'Comp 5', comp1: 900, comp2: 100, label: '78012\n+10.74%', status: 'dec' },
//   { name: 'Comp 6', comp1: 8000, comp2: 2000, label: '78012\n+10.74%', status: 'inc' },
// ];

// interface WaterfallDatum extends DataItem {
//   stackBase: number;
//   stackValue: number;
//   cumulative: number;
// }

// const preprocess = (data: DataItem[]): WaterfallDatum[] => {
//   let running = 0;
//   return data.map((d) => {
//     const base = running;
//     running += d.comp1 + d.comp2;
//     return { 
//       ...d, 
//       stackBase: base, 
//       stackValue: d.comp1 + d.comp2, 
//       cumulative: running 
//     };
//   });
// };

// const CustomLabel: React.FC<any> = ({ x, y, width,  index }) => {
//   if (index === undefined || index >= rawData.length) return null;

//   const { label, status } = rawData[index];
//   const lines = label.split('\n');
//   const Icon = status === 'inc' ? ArrowDropUpIcon : ArrowDropDownIcon;
//   const iconColor = status === 'inc' ? 'green' : 'red';

//   return (
//     <g transform={`translate(${x + width / 2}, ${y - 35})`}>
//       <text fill="#000" textAnchor="middle" fontSize={12}>
//         {lines.map((line, i) => (
//           <tspan key={i} x="0" dy={i === 0 ? 0 : 15}>
//             {line}
//           </tspan>
//         ))}
//       </text>
//       <foreignObject x={-8} y={30} width={20} height={20}>
//         <Icon style={{ fontSize: 16, color: iconColor }} />
//       </foreignObject>
//     </g>
//   );
// };

// const EquityChart = () => {
//   const [fullscreen, setFullscreen] = useState(false);
//   const [title, setTitle] = useState('Title 1');
//   const data = useMemo(() => preprocess(rawData), []);

//   const minY = 0;
//   const maxY = Math.max(...data.map(d => d.cumulative)) * 1.1;

//   const toggleFullscreen = () => {
//     if (!document.fullscreenElement) {
//       document.documentElement.requestFullscreen();
//     } else {
//       document.exitFullscreen?.();
//     }
//   };

//   useEffect(() => {
//     const handleFullscreenChange = () => {
//       setFullscreen(!!document.fullscreenElement);
//     };

//     document.addEventListener('fullscreenchange', handleFullscreenChange);
//     return () => {
//       document.removeEventListener('fullscreenchange', handleFullscreenChange);
//     };
//   }, []);

//   return (
//     <Card
//       elevation={4}
//       sx={{
//         borderRadius: 4,
//         width: fullscreen ? '100vw' : '100%',
//         height: fullscreen ? '100vh' : 'auto',
//         position: fullscreen ? 'fixed' : 'relative',
//         top: 0,
//         left: 0,
//         zIndex: fullscreen ? 9999 : 'auto',
//         backgroundColor: '#E7EBF0',
//       }}
//     >
//       <CardContent sx={{ p: fullscreen ? 4 : 3 }}>
//         <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//           <Typography variant="h6" fontWeight={600}>
//             Equity
//           </Typography>
//           <Box display="flex" alignItems="center" gap={2}>
//             <Select
//               value={title}
//               size="small"
//               onChange={(e) => setTitle(e.target.value)}
//               sx={{ fontSize: 14 }}
//             >
//               <MenuItem value="Title 1">Title 1</MenuItem>
//               <MenuItem value="Title 2">Title 2</MenuItem>
//               <MenuItem value="Title 3">Title 3</MenuItem>
//             </Select>
//             <IconButton onClick={toggleFullscreen}>
//               {fullscreen ? <FullscreenExit /> : <Fullscreen />}
//             </IconButton>
//           </Box>
//         </Box>

//         <ResponsiveContainer width="100%" height={fullscreen ? '80vh' : 400}>
//           <BarChart
//             data={data}
//             margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
//           >
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="name" />
//             <YAxis domain={[minY, maxY]} />
//             <Tooltip 
//               formatter={(value: number, name: string, props: any) => {
//                 if (name === 'Total') {
//                   return [`${props.payload.name}: ${value}`, ''];
//                 }
//                 return [`${name}: ${value}`, ''];
//               }}
//             />
//             <Legend
//               payload={[
//                 { value: 'Comp 1', type: 'square', id: '1', color: '#9E9E9E' },
//                 { value: 'Comp 2', type: 'square', id: '2', color: '#D3D3D3' },
//                 { value: 'Increasing', type: 'circle', id: '3', color: 'green' },
//                 { value: 'Decreasing', type: 'circle', id: '4', color: 'red' },
//               ]}
//             />
            
//             {/* Invisible base for stacking */}
//             <Bar dataKey="stackBase" stackId="a" fill="transparent" />
            
//             {/* Main stacked bars */}
//             <Bar 
//               dataKey="stackValue" 
//               stackId="a" 
//               barSize={60}
//               fill="#9E9E9E"
//             >
//               <LabelList content={<CustomLabel />} />
//               {data.map((entry, index) => (
//                 <Cell 
//                   key={`cell-${index}`}
//                   fill={entry.status === 'inc' ? '#9E9E9E' : '#D3D3D3'}
//                 />
//               ))}
//             </Bar>
//           </BarChart>
//         </ResponsiveContainer>
//       </CardContent>
//     </Card>
//   );
// };

// export default EquityChart;



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
            Equity
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

        <ResponsiveContainer width="100%" height={fullscreen ? '80vh' : 400}>
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
                { value: 'Comp 1', type: 'circle', id: '1', color: '#9E9E9E' },
                { value: 'Comp 2', type: 'circle', id: '2', color: '#D3D3D3' },
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
              fill="#9E9E9E"
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-comp1-${index}`}
                  fill={entry.status === 'inc' ? '#9E9E9E' : '#D3D3D3'}
                />
              ))}
            </Bar>
            
            {/* Comp 2 bar segment */}
            <Bar 
              dataKey="comp2" 
              stackId="a" 
              fill="#D3D3D3"
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