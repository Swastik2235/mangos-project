import { useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Select,
  MenuItem,
  IconButton,
  Dialog,
  DialogContent,
  CircularProgress,
  useTheme,
  useMediaQuery
} from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';

const outerRing = [{ name: 'Total', value: 900 }];

const middleRing = [
  { name: 'Solar', value: 300, color: '#FDE68A' },
  { name: 'Galvanization', value: 300, color: '#E5E7EB' },
  { name: 'Fabrication', value: 300, color: '#BFDBFE' },
];

const innerRing = [
  { name: 'Correction', value: 100, color: '#7C2D12' },
  { name: 'Pending', value: 100, color: '#D1D5DB' },
  { name: 'Done', value: 100, color: '#15803D' },
  { name: 'Correction', value: 100, color: '#7C2D12' },
  { name: 'Pending', value: 100, color: '#D1D5DB' },
  { name: 'Done', value: 100, color: '#15803D' },
  { name: 'Correction', value: 100, color: '#7C2D12' },
  { name: 'Pending', value: 100, color: '#D1D5DB' },
  { name: 'Done', value: 100, color: '#15803D' },
];

const CircularChartWithOuterRing = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [openFullscreen, setOpenFullscreen] = useState(false);
  const [loading,] = useState(false); // Added loading state

  const toggleFullscreen = () => {
    setOpenFullscreen((prev) => !prev);
  };
  const renderInnerLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius
  }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) / 2;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="#fff"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={isSmallScreen ? 10 : 14}
        fontWeight="bold"
      >
        100
      </text>
    );
  };

  const renderChart = () => {
    // Adjust chart dimensions based on screen size
    const outerRadius = isSmallScreen ? 120 : 185;
    const middleRadius = isSmallScreen ? 110 : 170;
    const innerRadius = isSmallScreen ? 70 : 110;
    const innerInnerRadius = isSmallScreen ? 40 : 70;

    return (
      <PieChart>
        {/* OUTERMOST BORDER RING */}
        <Pie
          data={outerRing}
          dataKey="value"
          outerRadius={outerRadius}
          innerRadius={outerRadius - 7}
          startAngle={82}
          endAngle={-262}
        >
          <Cell fill="#1f2937" />
        </Pie>

        {/* MIDDLE RING */}
        <Pie
          data={middleRing}
          dataKey="value"
          outerRadius={middleRadius}
          innerRadius={innerRadius}
          startAngle={90}
          endAngle={-270}
          label={({ name, value, cx, cy, midAngle, innerRadius, outerRadius }) => {
            const RADIAN = Math.PI / 180;
            const radius = innerRadius + (outerRadius - innerRadius) / 2;
            const x = cx + radius * Math.cos(-midAngle * RADIAN);
            const y = cy + radius * Math.sin(-midAngle * RADIAN);

            const MAX_LENGTH = isSmallScreen ? 6 : 10;
            const truncatedName = name.length > MAX_LENGTH ? name.slice(0, MAX_LENGTH) + "…" : name;

            const valueFontSize = isSmallScreen ? 10 : 14;
            const nameFontSize = isSmallScreen ? 8 : 12;

            return (
              <text
                x={x}
                y={y}
                fill="#1f2937"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                <tspan fontSize={valueFontSize}>{value}</tspan>
                <tspan x={x} y={y + (isSmallScreen ? 10 : 14)} fontSize={nameFontSize}>
                  {truncatedName}
                </tspan>
              </text>
            );
          }}
        >
          {middleRing.map((entry, index) => (
            <Cell key={`mid-${index}`} fill={entry.color} />
          ))}
        </Pie>

        {/* INNER RING with "100" Labels */}
        <Pie
          data={innerRing}
          dataKey="value"
          outerRadius={innerRadius}
          innerRadius={innerInnerRadius}
          startAngle={90}
          endAngle={-270}
          label={renderInnerLabel}
          labelLine={false}
        >
          {innerRing.map((entry, index) => (
            <Cell key={`inner-${index}`} fill={entry.color} />
          ))}
        </Pie>

        <Tooltip />
        <Legend
          wrapperStyle={{
            paddingTop: isSmallScreen ? '10px' : '20px',
            fontSize: isSmallScreen ? '12px' : '14px'
          }}
          verticalAlign="bottom"
          height={36}
          iconType="circle"
          payload={[
            { value: 'Correction', type: 'circle', color: '#7C2D12' },
            { value: 'Pending', type: 'circle', color: '#D1D5DB' },
            { value: 'Done', type: 'circle', color: '#15803D' },
            { value: 'Total', type: 'circle', color: '#1f2937' },
          ]}
        />
      </PieChart>
    );
  };

  return (
    <Card sx={{
      background: '#E7EBF0',
      borderRadius: 3,
      boxShadow: `
        4px 4px 20px 0px #6F8CB069,
        -6px -6px 20px 0px #FFFFFF,
        2px 2px 4px 0px #728EAB1A
      `,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header Row */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
            flexWrap: 'wrap',
            gap: 1
          }}
        >
          <Typography variant="h3" component="h2" sx={{
            color: '#08070f',
            fontWeight: 600,
            fontSize: isSmallScreen ? '1.1rem' : '1.4rem'
          }}>
            Highlights
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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

            <IconButton onClick={toggleFullscreen} size="small" sx={{ color: '#08070f' }}>
              <FullscreenIcon fontSize={isSmallScreen ? 'small' : 'medium'} />
            </IconButton>
          </Box>
        </Box>

        {/* Chart Section */}
        <Box sx={{
          flexGrow: 1,
          position: 'relative',
          minHeight: isSmallScreen ? '300px' : '400px'
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
          ) : (
            <>
              <ResponsiveContainer width="100%" height="100%">
                {renderChart()}
              </ResponsiveContainer>

              {/* 900 Value on Top */}
              <Box
                sx={{
                  position: 'absolute',
                  top: isSmallScreen ? '5px' : '10px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  fontWeight: 'bold',
                  fontSize: isSmallScreen ? 14 : 18,
                  color: '#1f2937',
                }}
              >
                900
              </Box>
            </>
          )}
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
            flexDirection: 'column'
          }}>
            <Box sx={{ flexGrow: 1 }}>
              <ResponsiveContainer width="100%" height="100%">
                {renderChart()}
              </ResponsiveContainer>
            </Box>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default CircularChartWithOuterRing;