import { useState } from 'react';
import {
  Card,
  CardContent,
  Box,
  MenuItem,
  Typography,
  Select,
  IconButton,
  // SelectChangeEvent,
  Dialog,
  DialogContent,
  useTheme,
  useMediaQuery
} from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';

const RADIAN = Math.PI / 180;

const MeterChart = ({ title = "Audit Meter", value = 90198 }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // Dynamic sizing based on screen size
  const viewBoxSize = isSmallScreen ? 300 : 500;
  const centerX = viewBoxSize / 2;
  const centerY = viewBoxSize / 2;
  const outerRadius = viewBoxSize * 0.36; // 180 for 500, 108 for 300
  const innerRadius = outerRadius - (viewBoxSize * 0.2); // 100 for 500, 60 for 300
  const needleValue = 85; // Percentage for needle position
  const needleAngle = 180 - (needleValue * 180) / 100;

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
  const arrowLength = isSmallScreen ? 8 : 12;
  const dx = endPoint.x - startPoint.x;
  const dy = endPoint.y - startPoint.y;
  const angle = Math.atan2(dy, dx);

  const arrowPoint1X = endPoint.x - arrowLength * Math.cos(angle - Math.PI / 6);
  const arrowPoint1Y = endPoint.y - arrowLength * Math.sin(angle - Math.PI / 6);
  const arrowPoint2X = endPoint.x - arrowLength * Math.cos(angle + Math.PI / 6);
  const arrowPoint2Y = endPoint.y - arrowLength * Math.sin(angle + Math.PI / 6);

  // const [view, setView] = useState('Sales');
  // const [category, setCategory] = useState('Fabrication Total');
  const [openFullscreen, setOpenFullscreen] = useState(false);

  // const handleViewChange = (event: SelectChangeEvent) => {
  //   setView(event.target.value);
  // };

  // const handleCategoryChange = (event: SelectChangeEvent) => {
  //   setCategory(event.target.value);
  // };

  const toggleFullscreen = () => {
    setOpenFullscreen(!openFullscreen);
  };

  const renderMeter = (fullscreen = false) => (
    <svg
      viewBox={`0 0 ${viewBoxSize} ${viewBoxSize / 1.8}`}
      style={{
        width: '100%',
        height: fullscreen ? '100%' : 'auto',
        maxHeight: '400px'
      }}
    >
      <defs>
        <linearGradient id="meterGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8B1E1E" />
          <stop offset="50%" stopColor="#D1D1D0" />
          <stop offset="100%" stopColor="#00704E" />
        </linearGradient>
      </defs>

      {/* Inner gray arc */}
      <path
        d={createArc(innerRadius)}
        fill="none"
        stroke="#cdcdcd"
        strokeWidth={isSmallScreen ? 15 : 20}
        strokeLinecap="round"
      />

      {/* Outer colored arc */}
      <path
        d={createArc(outerRadius)}
        fill="none"
        stroke="url(#meterGradient)"
        strokeWidth={isSmallScreen ? 30 : 40}
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
        strokeWidth="1"
      />

      {/* Value display */}
      <text
        x={centerX}
        y={centerY - (isSmallScreen ? 15 : 20)}
        textAnchor="middle"
        fontSize={isSmallScreen ? "16px" : "24px"} // Even smaller sizes
        fontWeight="00"
        fill="#1E293B"
      >
        {value.toLocaleString()}
      </text>
    </svg>
  );

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
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: isSmallScreen ? 'flex-start' : 'center', // Combined into one
          mb: 3,
          flexDirection: isSmallScreen ? 'column' : 'row',
          gap: isSmallScreen ? 2 : 0
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography
              variant="h3"
              component="h2"
              sx={{
                color: '#08070f',
                fontWeight: 600,
                fontSize: isSmallScreen ? '1.1rem' : '1.4rem'
              }}
            >
              {title}
            </Typography>
          </Box>
          <Box sx={{
            display: 'flex',
            gap: 2,
            width: isSmallScreen ? '100%' : 'auto',
            flexDirection: isSmallScreen ? 'column' : 'row'
          }}>
            {title !== "Outgoing" && (
              <Select
                size="small"
                value="Title 1"
                sx={{
                  minWidth: 70,
                  bgcolor: '#E7EBF0',
                  boxShadow: '4px 4px 20px 0px #6F8CB069, -6px -6px 20px 0px #FFFFFF, 2px 2px 4px 0px #08070f',
                  border: 'none',
                  '& .MuiSelect-select': {
                    padding: isSmallScreen ? '6px' : '8px',
                  },
                }}
                MenuProps={{
                  PaperProps: {
                    elevation: 4, // ✅ adds elevation to dropdown
                    sx: {
                      backgroundColor: '#E7EBF0',
                      boxShadow: `
          0px 4px 20px rgba(0, 0, 0, 0.25), 
          0px 2px 10px rgba(0, 0, 0, 0.15)
        `,
                      mt: 1, // margin from anchor
                    },
                  },
                }}
              >
                <MenuItem value="Title 1" sx={{ color: '#08070f' }}>Title 1</MenuItem>
                <MenuItem value="Title 2" sx={{ color: '#08070f' }}>Title 2</MenuItem>
              </Select>
            )}
            {/* <Select
              value={category}
              onChange={handleCategoryChange}
              size="small"
              sx={{ 
                minWidth: 160, 
                bgcolor: '#E7EBF0', 
                boxShadow: '4px 4px 20px 0px #6F8CB069, -6px -6px 20px 0px #FFFFFF, 2px 2px 4px 0px #728EAB1A',
                width: isSmallScreen ? '100%' : 'auto'
              }}
            >
              <MenuItem value="Fabrication Total">Fabrication Total</MenuItem>
              <MenuItem value="Production Total">Production Total</MenuItem>
            </Select> */}
            <IconButton onClick={toggleFullscreen} size="small" sx={{ color: '#08070f' }}>
              <FullscreenIcon fontSize={isSmallScreen ? 'small' : 'medium'} />
            </IconButton>
          </Box>
        </Box>

        <Box sx={{
          height: isSmallScreen ? 300 : 420,
          background: '#E7EBF0',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          {renderMeter()}
        </Box>

        {/* Fullscreen Dialog */}
        <Dialog
          open={openFullscreen}
          onClose={toggleFullscreen}
          fullWidth
          maxWidth="md"
          fullScreen={isSmallScreen}
        >
          <DialogContent sx={{
            height: isSmallScreen ? '100%' : '80vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: '#E7EBF0'
          }}>
            <Box sx={{
              width: '100%',
              height: '100%',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              {renderMeter(true)}
            </Box>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default MeterChart;