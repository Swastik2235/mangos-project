import React, { useState } from 'react';
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
} from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ReferenceArea,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';

interface Zone {
  name: string;
  color: string;
  start: number;
  end: number;
}

const ZONES: Zone[] = [
  { name: 'Distress Zone', color: '#FF9800', start: 0, end: 1.5 },
  { name: 'Grey Zone', color: '#888888', start: 1.5, end: 3.0 },
  { name: 'Safe zone', color: '#4CAF50', start: 3.0, end: 4.5 }
];

const STRESS_SCORE = 1.3; // Example score

const SensitivityStressCover: React.FC = () => {
  const [category, setCategory] = useState<string>('Fabrication Total');
  const [openFullscreen, setOpenFullscreen] = useState<boolean>(false);

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setCategory(event.target.value);
  };

  const toggleFullscreen = () => {
    setOpenFullscreen((prev) => !prev);
  };

  const renderChart = (height: number | string = 400) => (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        data={[{ score: STRESS_SCORE }]}
        margin={{ top: 70, right: 30, left: 20, bottom: 90 }}
      >
        {/* Colored zones */}
        {ZONES.map((zone) => (
          <ReferenceArea
            key={zone.name}
            x1={zone.start}
            x2={zone.end}
            y1={0}
            y2={1}
            stroke="none"
            fill={zone.color}
            fillOpacity={0.9}
            label={
              ({ viewBox }) => {
                const { x, width, y, height } = viewBox;
                return (
                  <text
                    x={x + width / 2}
                    y={y + height / 2 + 10}
                    textAnchor="middle"
                    fill="#fff"
                    fontSize={18}
                    fontWeight={500}
                    style={{ pointerEvents: 'none', userSelect: 'none' }}
                  >
                    {zone.name}
                  </text>
                );
              }
            }
          />
        ))}

        {/* Axis */}
        <XAxis
          type="number"
          domain={[0, 4.5]}
          ticks={[0, 1.3, 1.5, 3.0, 4.5]}
          tick={{ fontWeight: 600, fontSize: 16 }}
          axisLine={false}
          tickLine={false}
          dataKey="score"
        />
        <YAxis hide />
        
        {/* Arrow and score */}
        <ReferenceLine
          x={STRESS_SCORE}
          stroke="#1e293b"
          strokeWidth={0}
          label={{
            value: '↓',
            position: 'bottom',
            fontSize: 32,
            fill: '#1e293b',
            dy: 10, 
            dx: 0,
            textAnchor: 'middle'
          }}
        />
        <ReferenceLine
          x={STRESS_SCORE}
          stroke="#1e293b"
          strokeWidth={0}
          label={{
            value: STRESS_SCORE.toString(),
            position: 'bottom',
            fill: '#1e293b',
            fontWeight: 700,
            fontSize: 22,
            dy: 40,
            dx: 0,
            textAnchor: 'middle'
          }}
        />
        
        {/* Hide bar */}
        <Bar dataKey="score" fill="transparent" />
      </BarChart>
    </ResponsiveContainer>
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ color: '#1e293b', fontWeight: 600 }}>
            Stress Score
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Select
              value={category}
              onChange={handleCategoryChange}
              size="small"
              sx={{
                minWidth: 120,
                bgcolor: '#E7EBF0',
                boxShadow: '4px 4px 20px 0px #6F8CB069, -6px -6px 20px 0px #FFFFFF, 2px 2px 4px 0px #728EAB1A',
              }}
            >
              <MenuItem value="Fabrication Total">Title 1</MenuItem>
              <MenuItem value="Production Total">Title 2</MenuItem>
            </Select>
            <IconButton onClick={toggleFullscreen}>
              <FullscreenIcon />
            </IconButton>
          </Box>
        </Box>
        
        {renderChart()}

        {/* Fullscreen Dialog */}
        <Dialog
          open={openFullscreen}
          onClose={toggleFullscreen}
          fullWidth
          maxWidth="lg"
          sx={{
            '& .MuiDialog-paper': {
              overflow: 'visible',
            },
          }}
        >
          <DialogContent sx={{ height: '80vh', p: 4 }}>
            {renderChart('100%')}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default SensitivityStressCover;