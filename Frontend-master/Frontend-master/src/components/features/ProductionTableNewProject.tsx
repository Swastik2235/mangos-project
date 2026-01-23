// import React from 'react';
import { Box, Typography, Paper, Divider, Grid } from '@mui/material';

// Sample data
const jobCardData = [
  {
    title: 'F4G',
    code: 'JC-187-P-12',
    planned: 500,
    plannedNote: 120,
    operations: { op1: 500, op2: 200, op3: 100 },
    quality: { checked: true, time: '5:38 PM', note: 'ref checked' },
    dispatch: 'Done',
  },
  {
    title: 'A2B',
    code: 'JC-188-P-15',
    planned: 600,
    plannedNote: 150,
    operations: { op1: 600, op2: 300, op3: 120 },
    quality: { checked: true, time: '4:25 PM', note: 'ok' },
    dispatch: 'Pending',
  },
  {
    title: 'Z9K',
    code: 'JC-189-P-16',
    planned: 450,
    plannedNote: 80,
    operations: { op1: 450, op2: 250, op3: 90 },
    quality: { checked: false, time: '--', note: '-' },
    dispatch: 'In Progress',
  },
];

const JobCardTable = () => {
  return (
    <Paper sx={{ p: 2, borderRadius: 2, bgcolor: '#E7EBF0' }}>
      {/* Table Header */}
      <Box display="flex" fontWeight="bold" bgcolor="#E7EBF0" p={1}>
        <Box width="15%">Job Card</Box>
        <Box width="15%">Planned (KG)</Box>
        <Box width="30%">Operations Status (KG)</Box>
        <Box width="20%">Quality Check</Box>
        <Box width="20%">Dispatch Check</Box>
      </Box>
      <Divider />

      {jobCardData.map((row, index) => (
        <Box key={index} display="flex" alignItems="center" p={1} borderBottom="1px solid #ddd">
          {/* Job Card */}
          <Box width="15%">
            <Box
              display="inline-block"
              px={1}
              py={0.5}
              bgcolor="#E7EBF0"
              borderRadius={1}
              fontWeight="bold"
              mb={0.5}
            >
              {row.title}
            </Box>
            <Typography variant="body2">{row.code}</Typography>
          </Box>

          {/* Planned */}
          <Box width="15%">
            <Typography>{row.planned}</Typography>
            <Typography variant="body2" color="text.secondary">
              ({row.plannedNote})
            </Typography>
          </Box>

          {/* Operations Status */}
          <Box width="30%">
            <Grid container spacing={1}>
              <Grid item xs={4}><Typography>1°: {row.operations.op1}</Typography></Grid>
              <Grid item xs={4}><Typography>2°: {row.operations.op2}</Typography></Grid>
              <Grid item xs={4}><Typography>3°: {row.operations.op3}</Typography></Grid>
            </Grid>
          </Box>

          {/* Quality Check */}
          <Box width="20%">
            <Typography>{row.quality.checked ? '✅' : '❌'}</Typography>
            <Typography variant="body2">{row.quality.time}</Typography>
            <Typography variant="caption" color="text.secondary">{row.quality.note}</Typography>
          </Box>

          {/* Dispatch Check */}
          <Box width="20%">
            <Typography fontWeight="medium">{row.dispatch}</Typography>
          </Box>
        </Box>
      ))}
    </Paper>
  );
};

export default JobCardTable;
