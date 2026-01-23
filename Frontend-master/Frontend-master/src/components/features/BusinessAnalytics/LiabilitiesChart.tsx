import  { useState, useRef } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import {
  Box,
  IconButton,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import { Fullscreen, FullscreenExit } from "@mui/icons-material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const rawData = [
  { name: "Comp 1", comp1: 500, comp2: 100, percent: 10.74 },
  { name: "Comp 2", comp1: 1500, comp2: 1800, percent: 10.74 },
  { name: "Comp 3", comp1: -50, comp2: 128, percent: 10.74 },
  { name: "Comp 4", comp1: 5600, comp2: 2000, percent: 10.74 },
  { name: "Comp 5", comp1: 0, comp2: 78, percent: 10.74 },
  { name: "Comp 6", comp1: 3000, comp2: 4800, percent: 10.74 },
];

const data = rawData.map((d, i) => {
  let base = 0;
  for (let j = 0; j < i; j++) {
    base += rawData[j].comp1 + rawData[j].comp2;
  }
  return { ...d, base };
});

interface CustomizedLabelProps {
  x?: number | string;
  y?: number | string;
  width?: number | string;
  height?: number | string;
  index?: number;
  value?: number | string;
}

const renderCustomizedLabel = (props: CustomizedLabelProps) => {
  const { x, y, width, index } = props;

  // Convert potential string values to numbers
  const numX = typeof x === 'string' ? parseFloat(x) : x ?? 0;
  const numY = typeof y === 'string' ? parseFloat(y) : y ?? 0;
  const numWidth = typeof width === 'string' ? parseFloat(width) : width ?? 0;

  if (index === undefined || index < 0 || index >= data.length) return null;

  const d = data[index];
  const total = d.comp1 + d.comp2;
  const increase = total >= 0;

  const icon = increase ? '🔼' : '🔽';
  const textColor = increase ? "#4caf50" : "#f44336";

  return (
    <g transform={`translate(${numX + numWidth / 2}, ${numY - 35})`}>
      <text fill="#000" textAnchor="middle" fontSize={12} fontWeight="bold">
        {Math.abs(total)}
      </text>
      <text fill={textColor} textAnchor="middle" fontSize={11} dy="16">
        {`${icon} +${d.percent}%`}
      </text>
    </g>
  );
};

const WaterfallChart = () => {
  const [fullscreen, setFullscreen] = useState(false);
  const [title, setTitle] = useState("Liabilities");
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleFullscreen = () => {
    if (!fullscreen && containerRef.current?.requestFullscreen) {
      containerRef.current.requestFullscreen();
    } else if (fullscreen && document.exitFullscreen) {
      document.exitFullscreen();
    }
    setFullscreen(!fullscreen);
  };

  return (
    <div 
      ref={containerRef}
      style={{
        backgroundColor: '#E7EBF0',
        borderRadius: 12,
        padding: 20,
        width: "100%",
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
        position: fullscreen ? 'fixed' : 'relative',
        top: 0,
        left: 0,
        height: fullscreen ? '100vh' : 'auto',
        zIndex: fullscreen ? 9999 : 'auto',
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Box display="flex" alignItems="center">
          <Select
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            variant="standard"
            disableUnderline
            IconComponent={ArrowDropDownIcon}
            sx={{
              fontSize: 18,
              fontWeight: 600,
              '& .MuiSelect-select': { paddingRight: '24px' },
            }}
          >
            <MenuItem value="Liabilities">Liabilities</MenuItem>
            <MenuItem value="Assets">Assets</MenuItem>
            <MenuItem value="Equity">Equity</MenuItem>
          </Select>
        </Box>
        <IconButton onClick={toggleFullscreen} size="small">
          {fullscreen ? <FullscreenExit /> : <Fullscreen />}
        </IconButton>
      </Box>

      <ResponsiveContainer width="100%" height={fullscreen ? '80vh' : 360}>
        <BarChart data={data}>
          <XAxis
            dataKey="name"
            tickFormatter={(name, i) => {
              if (i === data.length - 1) return "= " + name;
              else return name + " +";
            }}
            style={{ fontSize: 12 }}
          />
          <YAxis style={{ fontSize: 12 }} />
          <Tooltip />
          <Bar dataKey="base" stackId="a" fill="transparent" />
          <Bar dataKey="comp1" stackId="a" fill="#a0522d" radius={[4, 4, 0, 0]}>
            <LabelList content={renderCustomizedLabel} />
          </Bar>
          <Bar dataKey="comp2" stackId="a" fill="#8b0000" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

      <Box 
        display="flex" 
        justifyContent="center" 
        gap={4} 
        mt={3}
        flexWrap="wrap"
      >
        <Box display="flex" alignItems="center" gap={1}>
          <Box 
            width={12} 
            height={12} 
            bgcolor="#a0522d" 
            borderRadius={1} 
            display="inline-block" 
          />
          <Typography variant="body2" fontWeight={500}>Comp 1</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <Box 
            width={12} 
            height={12} 
            bgcolor="#8b0000" 
            borderRadius={1} 
            display="inline-block" 
          />
          <Typography variant="body2" fontWeight={500}>Comp 2</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <Box 
            width={10} 
            height={10} 
            bgcolor="#4caf50" 
            borderRadius="50%" 
            display="inline-block" 
          />
          <Typography variant="body2" fontWeight={500}>Increasing</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap={1}>
          <Box 
            width={10} 
            height={10} 
            bgcolor="#f44336" 
            borderRadius="50%" 
            display="inline-block" 
          />
          <Typography variant="body2" fontWeight={500}>Decreasing</Typography>
        </Box>
      </Box>
    </div>
  );
};

export default WaterfallChart;