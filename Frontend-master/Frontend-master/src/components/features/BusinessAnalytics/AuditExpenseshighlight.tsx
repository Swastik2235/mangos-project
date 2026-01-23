import {useState} from 'react';
import { Card, CardContent, Box, MenuItem , Typography,Select, IconButton,SelectChangeEvent } from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';

const RADIAN = Math.PI / 180;

const AuditExpenseshighlight = ({ title = "Audit Meter", value = 90198 }) => {
  const viewBoxSize = 500;
  const centerX = viewBoxSize / 2;
  const centerY = viewBoxSize / 2;
  const outerRadius = 180;
  const innerRadius = outerRadius - 100;
  const needleValue = 85; // Percentage for needle position
  const needleAngle = 180 - (needleValue * 180) / 100;

  // // Create arc path with extended angles
  // const createArc = (radius) => {
  //   const startAngle = 200; // Extended past 180 degrees
  //   const endAngle = -20; // Extended past 0 degrees
  //   const x1 = centerX + radius * Math.cos(-RADIAN * startAngle);
  //   const y1 = centerY + radius * Math.sin(-RADIAN * startAngle);
  //   const x2 = centerX + radius * Math.cos(-RADIAN * endAngle);
  //   const y2 = centerY + radius * Math.sin(-RADIAN * endAngle);
    
  //   return `M ${x1} ${y1} A ${radius} ${radius} 0 1 1 ${x2} ${y2}`;
  // };

  // // Calculate needle points
  // const calculatePointOnArc = (radius, angle) => ({
  //   x: centerX + radius * Math.cos(-RADIAN * angle),
  //   y: centerY + radius * Math.sin(-RADIAN * angle)
  // });

  const createArc = (radius: number): string => {
    const startAngle = 200; // Extended past 180 degrees
    const endAngle = -20; // Extended past 0 degrees
    const x1 = centerX + radius * Math.cos(-RADIAN * startAngle);
    const y1 = centerY + radius * Math.sin(-RADIAN * startAngle);
    const x2 = centerX + radius * Math.cos(-RADIAN * endAngle);
    const y2 = centerY + radius * Math.sin(-RADIAN * endAngle);
  
    return `M ${x1} ${y1} A ${radius} ${radius} 0 1 1 ${x2} ${y2}`;
  };
  
  const calculatePointOnArc = (radius: number, angle: number): { x: number; y: number } => ({
    x: centerX + radius * Math.cos(-RADIAN * angle),
    y: centerY + radius * Math.sin(-RADIAN * angle),
  });
  

  const startPoint = calculatePointOnArc(innerRadius, needleAngle);
  const endPoint = calculatePointOnArc(outerRadius, needleAngle);

  // Calculate arrow points
  const arrowLength = 12;
  const dx = endPoint.x - startPoint.x;
  const dy = endPoint.y - startPoint.y;
  const angle = Math.atan2(dy, dx);
  
  const arrowPoint1X = endPoint.x - arrowLength * Math.cos(angle - Math.PI / 6);
  const arrowPoint1Y = endPoint.y - arrowLength * Math.sin(angle - Math.PI / 6);
  const arrowPoint2X = endPoint.x - arrowLength * Math.cos(angle + Math.PI / 6);
  const arrowPoint2Y = endPoint.y - arrowLength * Math.sin(angle + Math.PI / 6);

  const [view, setView] = useState('Sales');
  const [category, setCategory] = useState('Fabrication Total');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleViewChange = (event: SelectChangeEvent) => {
    setView(event.target.value);
  };

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
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
            {title}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
          {title !== "Outgoing" && (
            <Select
              value={view}
              onChange={handleViewChange}
              size="small"
              sx={{ minWidth: 120, bgcolor: '#E7EBF0', boxShadow: '4px 4px 20px 0px #6F8CB069, -6px -6px 20px 0px #FFFFFF, 2px 2px 4px 0px #728EAB1A' }}
            >
              <MenuItem value="Sales">Sales</MenuItem>
              <MenuItem value="Production">Production</MenuItem>
            </Select>
          )}
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
     <Card className="w-full " sx={{height:400,  background: '#E7EBF0',}}>
       <CardContent className="p-6">
           
         <div className="relative w-full pt-6">
           <svg
             viewBox={`0 0 ${viewBoxSize} ${viewBoxSize/1.8}`}
             className="w-full"
           >
             <defs>
               <linearGradient id="meterGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                 <stop offset="0%" stopColor="#8B1E1E" />
                 <stop offset="50%" stopColor="#D1D1D0" />
                 <stop offset="100%" stopColor="#00704E" />
               </linearGradient>
             </defs>
             {/* Base line */}
             {/* <line
               x1={centerX - outerRadius - 20}
               y1={centerY}
               x2={centerX + outerRadius + 20}
               y2={centerY}
               stroke="#E5E7EB"
               strokeWidth="2"
             /> */}
        
             {/* Inner gray arc */}
             <path
               d={createArc(innerRadius)}
               fill="none"
               stroke="#cdcdcd"
               strokeWidth={20}
               strokeLinecap="round"
             />
        
             {/* Outer colored arc */}
             <path
               d={createArc(outerRadius)}
               fill="none"
               stroke="url(#meterGradient)"
               strokeWidth={40}
               strokeLinecap="round"
             />
             {/* Needle line */}
             <line
               x1={startPoint.x}
               y1={startPoint.y}
               x2={endPoint.x}
               y2={endPoint.y}
               stroke="#94A3B8"
               strokeWidth="1.5"
             />
        
             {/* Arrow head */}
             <path
               d={`M ${endPoint.x} ${endPoint.y} L ${arrowPoint1X} ${arrowPoint1Y} L ${arrowPoint2X} ${arrowPoint2Y} Z`}
               fill="#00704E"
               stroke="white"
               strokeWidth="1"/>
             
             {/* Value display */}
             <text
               x={centerX}
               y={centerY - 20}
               textAnchor="middle"
               className="text-3xl font-semibold"
               fill="#1E293B"
             >
               {value.toLocaleString()}
             </text>
           </svg>
         </div>
       </CardContent>
     </Card>

    </CardContent>
    </Card>
  );
};

export default AuditExpenseshighlight;
