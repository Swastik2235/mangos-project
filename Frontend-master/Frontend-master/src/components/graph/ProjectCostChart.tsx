import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,Label
} from 'recharts';
import { Box, Typography, Paper, IconButton, Tooltip as MuiTooltip } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
// import { useTheme } from '@mui/material/styles';


// Legend Items
const legendItems = [
  { label: 'Actual Cost ACWP', color: '#FF7043' },
  { label: 'Planned Cost BCWS', color: '#EF5350' },
  { label: 'Earned Value BCWP', color: '#26A69A' },
];

// Chart Configurations
// const chartConfig = {
//   yAxisTicks: [0, 5, 10, 15, 20, 25, 30, 35],
//   referenceLines: [
//     { y: 30, label: 'Estimated at Completion EAC', stroke: '#000', strokeDasharray: '3 3' },
//     { y: 25, label: 'Budget at Completion BAC', stroke: '#666' },
//     { y: 15, label: 'Completion', stroke: '#666' },
//   ],
//   annotations: [
//     { x: 8, label: 'Status Date' },
//     { x: 12, label: 'Planned End' },
//     { x: 14, label: 'Estimated End' },
//   ],
// };

// Chart Legend Component
const ChartLegend: React.FC = () => {
//   const theme = useTheme();

  return (
    <Box display="flex" gap={2} alignItems="center" mb={2}>
      {legendItems.map((item) => (
        <Box key={item.label} display="flex" alignItems="center" gap={1}>
          <Box
            width={12}
            height={12}
            borderRadius="50%"
            bgcolor={item.color}
          />
          <Typography variant="body2" color="textSecondary">
            {item.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

// Warning Icon Component
interface WarningIconProps {
  onClick?: () => void;
}

const WarningIcon: React.FC<WarningIconProps> = ({ onClick }) => (
  <MuiTooltip title="Cost variance detected">
    <IconButton
      onClick={onClick}
      sx={{
        position: 'absolute',
        right: 16,
        top: '25%',
        color: '#f44336',
      }}
    >
      <WarningAmberIcon />
    </IconButton>
  </MuiTooltip>
);

// Project Cost Chart Component
interface CostDataPoint {
  day: number;
  actualCost: number;
  plannedCost: number;
  earnedValue: number;
}

interface ProjectCostChartProps {
  data: CostDataPoint[];
  estimatedCompletion: number;
  budgetCompletion: number;
  onWarningClick?: () => void;
}

const ProjectCostChart: React.FC<ProjectCostChartProps> = ({
  data,
  // estimatedCompletion,
  // budgetCompletion,
  onWarningClick,
}) => {
  return (
    <Paper sx={{ p: 3, position: 'relative' , bgcolor: '#E7EBF0',}}>
      <Typography variant="h6" gutterBottom>
        Projects
      </Typography>

      <ChartLegend />

      <WarningIcon onClick={onWarningClick} />

      <Box height={400}>
        <ResponsiveContainer width="100%" height="100%">
          {/* <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" label={{ value: 'Days', position: 'bottom' }} />
            <YAxis
              label={{ value: 'Cost', angle: -90, position: 'insideLeft' }}
              ticks={chartConfig.yAxisTicks}
            />
            <Tooltip />

            {chartConfig.referenceLines.map((line, index) => (
              <ReferenceLine
                key={index}
                y={line.y}
                label={line.label}
                stroke={line.stroke}
                strokeDasharray={line.strokeDasharray}
              />
            ))}

            <Line
              type="monotone"
              dataKey="actualCost"
              stroke="#FF7043"
              dot={false}
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="plannedCost"
              stroke="#EF5350"
              dot={false}
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="earnedValue"
              stroke="#26A69A"
              dot={false}
              strokeWidth={2}
            />
          </LineChart> */}
           <LineChart width={600} height={400} data={data}>
              <XAxis dataKey="day">
                <Label value="Days" position="bottom" offset={-10} />
              </XAxis>
              <YAxis>
                <Label value="Cost" angle={-90} position="insideLeft" offset={-10} />
              </YAxis>
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <ReferenceLine
                y={30}
                label={
                  <Label value="Estimated at Completion EAC" position="top" offset={10} />
                }
                stroke="#000"
                strokeDasharray="3 3"
              />
              <ReferenceLine
                y={25}
                label={
                  <Label value="Budget at Completion BAC" position="top" offset={10} />
                }
                stroke="#666"
              />
              <ReferenceLine
                y={16}
                label={
                  <Label value="Completion" position="top" offset={10} />
                }
                stroke="#666"
              />
              <ReferenceLine
                x={10}
                label={
                  <Label value="Status Date" angle={90} position="insideRight" offset={-10} />
                }
                stroke="#000"
                strokeDasharray="3 3"
              />
              <ReferenceLine
                x={14}
                label={
                  <Label value="Planned End" angle={90} position="insideRight" offset={-10} />
                }
                stroke="#666"
              />
              <ReferenceLine
                x={15}
                label={
                  <Label value="Estimated End" angle={90} position="insideRight" offset={-10} />
                }
                stroke="#666"
              />
              <Line type="monotone" dataKey="actualCost" stroke="#FF7043" />
              <Line type="monotone" dataKey="plannedCost" stroke="#EF5350" />
              <Line type="monotone" dataKey="earnedValue" stroke="#26A69A" />
           </LineChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

// Mock Data Generator
export const generateMockData = (): CostDataPoint[] => {
  return Array.from({ length: 15 }, (_, i) => ({
    day: i + 1,
    actualCost: Math.min(30, 30 * (1 - Math.exp(-i * 0.3))),
    plannedCost: Math.min(25, 25 * (1 - Math.exp(-i * 0.25))),
    earnedValue: Math.min(15, 15 * (1 - Math.exp(-i * 0.2))),
  }));
};

export default ProjectCostChart;
