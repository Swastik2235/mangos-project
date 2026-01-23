import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { BranchItem } from './BranchItem';

export interface BranchItemData {
  label: string;
  value: number;
  percentage: number;
}

interface FinancialData {
  title: string;
  centerValue: number;
  branches: {
    left?: BranchItemData[];
    right?: BranchItemData[];
  };
}

const FinancialBranch: React.FC<{ data: FinancialData }> = ({ data }) => {
  return (
    <Box sx={{ p: 4, bgcolor: '#f1f5f9' }}>
      <Typography variant="h5" sx={{ mb: 4, textAlign: 'center' }}>
        {data.title}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
        <Box sx={{ flex: 1, maxWidth: 300 }}>
          {data.branches.left?.map((item, index) => (
            <BranchItem key={index} {...item} />
          ))}
        </Box>
        <Paper
          elevation={3}
          sx={{
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            bgcolor: 'white',
          }}
        >
          <Typography variant="subtitle1">Net Profit/Loss</Typography>
          <Typography variant="h6">{data.centerValue}</Typography>
          <Typography variant="subtitle1">Net Amount</Typography>
          <Typography variant="h6">{data.centerValue}</Typography>
          <Typography variant="subtitle1">Net Cost</Typography>
          <Typography variant="h6">{data.centerValue}</Typography>
        </Paper>
        <Box sx={{ flex: 1, maxWidth: 300 }}>
          {data.branches.right?.map((item, index) => (
            <BranchItem key={index} {...item} isRight />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default FinancialBranch;