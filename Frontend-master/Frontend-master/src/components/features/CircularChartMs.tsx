import { FC, useState } from 'react';
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
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieLabelRenderProps
} from 'recharts';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import CloseIcon from '@mui/icons-material/Close';
import Spiral from './Spiral';

interface ChartData {
  name: string;
  value: number;
  color: string;
}

interface CircularChartMsProps {
  title: string;
}

const renderOuterLabel = ({ cx, cy, outerRadius }: any) => {
  return (
    <text
      x={cx}
      y={cy - outerRadius - 10}
      fill="#1E293B"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={14}
      fontWeight={700}
    >
      84L
    </text>
  );
};

const renderInnerLabel = ({
  value,
  x,
  y
}: PieLabelRenderProps & { value: number }) => {
  return (
    <text
      x={x}
      y={y}
      fill="#1E293B"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
      fontWeight={600}
    >
      {`${value}L`}
    </text>
  );
};

const CircularChartMs: FC<CircularChartMsProps> = ({ title }) => {
  const [view, setView] = useState('Sales');
  const [category, setCategory] = useState('Fabrication Total');
  const [openFullscreen, setOpenFullscreen] = useState(false);
  const theme = useTheme();
const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
const outerRadiusExtra = openFullscreen ? 180 : isMobile ? 100 : 150;
const innerRadiusExtra = openFullscreen ? 170 : isMobile ? 90 : 140;

const outerRadiusMain = openFullscreen ? 170 : isMobile ? 90 : 140;
const innerRadiusMain = openFullscreen ? 120 : isMobile ? 60 : 100;

const containerHeight = openFullscreen ? '70vh' : isMobile ? 300 : 400;

  const handleViewChange = (event: SelectChangeEvent) => {
    setView(event.target.value);
  };

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  const toggleFullscreen = () => {
    setOpenFullscreen(!openFullscreen);
  };

  const outerData: ChartData[] = [
    { name: 'Tax', value: 10, color: '#60A5FA' },
    { name: 'Incomming', value: 21, color: '#93C5FD' },
    { name: 'Paid', value: 10, color: '#E5E7EB' },
    { name: 'Budgetary line', value: 31, color: '#2563EB' },
  ];

  const extraOuterData: ChartData[] = [
    { name: 'Total', value: 84, color: '#60A5FA' }
  ];

  const renderChart = () => (
    <Box sx={{ height: containerHeight, width: '100%', position: 'relative' }}>
      <ResponsiveContainer>
        <PieChart>
          {/* Outer Ring */}
          <Pie
            data={extraOuterData}
            outerRadius={outerRadiusExtra}
          innerRadius={innerRadiusExtra}
            dataKey="value"
            label={renderOuterLabel}
            labelLine={false}
          >
            {extraOuterData.map((entry, index) => (
              <Cell key={`cell-extra-${index}`} fill={entry.color} />
            ))}
          </Pie>

          {/* Inner Ring */}
          <Pie
            data={outerData}
            cx="50%"
            cy="50%"
            outerRadius={outerRadiusMain}
            innerRadius={innerRadiusMain}
            startAngle={90}
            endAngle={-270}
            dataKey="value"
            label={renderInnerLabel}
            labelLine={false}
          >
            {outerData.map((entry, index) => (
              <Cell key={`cell-outer-${index}`} fill={entry.color} />
            ))}
          </Pie>

          {/* Spiral center graphic */}
          <svg style={{ position: 'absolute', top: 0, left: 0, 
            width: isMobile ? '80%' : '100%',
            height: isMobile ? '80%' : '100%',
            transform: isMobile ? 'translate(1%, -6%)' : 'none', // optional centering
          }}>
            <Spiral
              data={{
                completed: 19,
                remaining: 98,
                unit: 'L'
              }}
            />
          </svg>

          <Tooltip formatter={(value: number, name: string) => [`${value}L`, name]} />
          <Legend
            verticalAlign="bottom"
            align="center"
            layout="horizontal"
            iconType="circle"
            formatter={(value) => value}
          />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );

  return (
    <>
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
            <Box sx={{ display: 'flex', gap: 2 , overflowX: 'auto',flexWrap: 'nowrap'}}>
                                      <FormControl sx={{ m: 1, Width: 80 }}>
              {title !== "Outgoing" && (
                <Select
                  value={view}
                  onChange={handleViewChange}
                  size="small"
                  sx={{
                    // minWidth: 120,
                    bgcolor: '#E7EBF0',
                    boxShadow: '4px 4px 20px 0px #6F8CB069, -6px -6px 20px 0px #E7EBF0, 2px 2px 4px 0px #728EAB1A'
                  }}
                >
                  <MenuItem value="Sales">Sales</MenuItem>
                  <MenuItem value="Production">Production</MenuItem>
                </Select>
              )}
              </FormControl>
              <FormControl sx={{ m: 1, width: 160 }}>   {/* <-- Fixed width */}
              <Select
                value={category}
                onChange={handleCategoryChange}
                size="small"
                sx={{
                  // minWidth: 160,
                  bgcolor: '#E7EBF0',
                  boxShadow: '4px 4px 20px 0px #6F8CB069, -6px -6px 20px 0px #FFFFFF, 2px 2px 4px 0px #728EAB1A'
                }}
              >
                <MenuItem value="Fabrication Total">Fabrication Total</MenuItem>
                <MenuItem value="Production Total">Production Total</MenuItem>
              </Select>
              </FormControl>
              <IconButton onClick={toggleFullscreen}>
                <FullscreenIcon />
              </IconButton>
            </Box>
          </Box>

          {renderChart()}
        </CardContent>
      </Card>

      <Dialog
        open={openFullscreen}
        onClose={toggleFullscreen}
        fullWidth
        maxWidth="lg"
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: 2,
            background: '#E7EBF0',
            maxHeight: '90vh'
          }
        }}
      >
        <DialogContent
          sx={{
            height: '80vh',
            p: 3,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3
            }}
          >
            <Typography variant="h4" sx={{ color: '#1e293b', fontWeight: 600 }}>
              {title} - Fullscreen View
            </Typography>
            <IconButton onClick={toggleFullscreen}>
              <CloseIcon />
            </IconButton>
          </Box>
          {renderChart()}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CircularChartMs;
