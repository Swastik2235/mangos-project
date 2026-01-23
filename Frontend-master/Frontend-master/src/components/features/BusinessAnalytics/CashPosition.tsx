import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ReferenceLine, 
  ResponsiveContainer, LabelList, Line, Tooltip,
} from 'recharts';
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
// import { color } from 'd3';

interface CashData {
  day: number;
  debit: number;
  credit: number;
  value: number;
}

const cashData: CashData[] = [
  { day: 1, debit: -15, credit: 25, value: 1527 },
  { day: 2, debit: -10, credit: 30, value: 1527 },
  { day: 3, debit: -12, credit: 20, value: 1527 },
  { day: 4, debit: -18, credit: 22, value: 1527 },
  { day: 5, debit: -20, credit: 28, value: 15279 },
  { day: 6, debit: -14, credit: 18, value: 1527 },
  { day: 7, debit: -16, credit: 26, value: 1527 },
  { day: 8, debit: -13, credit: 24, value: 1527 },
  { day: 9, debit: -17, credit: 19, value: 1527 },
  { day: 10, debit: -11, credit: 21, value: 1527 },
  { day: 11, debit: -19, credit: 29, value: 1527 },
  { day: 12, debit: -15, credit: 27, value: 1527 },
  { day: 13, debit: -13, credit: 23, value: 1527 },
  { day: 14, debit: -18, credit: 28, value: 1527 },
  { day: 15, debit: -16, credit: 25, value: 1527 },
];

const CashPosition: React.FC = () => {
  const [category, setCategory] = useState<string>('Fabrication Total');
  const [openFullscreen, setOpenFullscreen] = useState<boolean>(false);

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setCategory(event.target.value);
  };

  const toggleFullscreen = () => {
    setOpenFullscreen((prev) => !prev);
  };

  const renderChart = (height: number | string = 365) => (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        data={cashData}
        margin={{ top: 20, right: 30, left: 0, bottom: 30 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="day" 
          tick={{ fill: '#1e293b', fontSize: 13 }} 
          label={{ value: 'Days', position: 'bottom', offset: 10 }} 
        />
        <YAxis 
          domain={[-30, 30]} 
          ticks={[-30, -25, -20, -15, -10, -5, 0, 5, 10, 15, 20, 25, 30]} 
          tick={{ fill: '#1e293b', fontSize: 13 }} 
        />
        <ReferenceLine y={0} stroke="#000" />
        <Tooltip />
        <Bar dataKey="debit" fill="#7B2C21" radius={[4, 4, 0, 0]}>
          <LabelList dataKey="value" position="top" fill="#1e293b" fontSize={12} />
        </Bar>
        <Bar dataKey="credit" fill="#217B4A" radius={[4, 4, 0, 0]}>
          <LabelList dataKey="value" position="top" fill="#1e293b" fontSize={12} />
        </Bar>
        <Line type="monotone" dataKey="value" stroke="#fff" strokeWidth={2} dot={{ r: 3, fill: '#fff' }} />
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
          <Typography variant="h5" sx={{ color: '#08070f', fontWeight: 600,fontSize:'1.3rem' }}>
            Cash Position
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Select
              value={category}
              onChange={handleCategoryChange}
              size="small"
              sx={{
                minWidth: 90,
                bgcolor: '#E7EBF0',
                boxShadow: '4px 4px 20px 0px #6F8CB069, -6px -6px 20px 0px #FFFFFF, 2px 2px 4px 0px #728EAB1A',
              }}
            >
              <MenuItem value="Fabrication Total">Title 1</MenuItem>
              <MenuItem value="Production Total">Title 2</MenuItem>
            </Select>
            <IconButton onClick={toggleFullscreen} sx={{ color: '#08070f' }}>
              <FullscreenIcon />
            </IconButton>
          </Box>
        </Box>
        
        {renderChart()}

        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'end', mt: 2, gap: 6 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mr: 3 }}>
            <Box sx={{ width: 12, height: 12, bgcolor: '#217B4A', borderRadius: '50%' }} />
            <Typography variant="body2" sx={{ color: '#217B4A', fontSize: 13 }}>Credit amount</Typography>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={{ width: 12, height: 12, bgcolor: '#7B2C21', borderRadius: '50%' }} />
            <Typography variant="body2" sx={{ color: '#7B2C21', fontSize: 13 }}>Debit amount</Typography>
          </Box>
        </Box>

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

export default CashPosition;