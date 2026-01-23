import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { BranchItem } from './BranchItem';

export interface BranchItemData {
  label: string;
  value: number;
  percentage: number;
}

export interface StockData {
  title: string;
  totalValue: number;
  categories: {
    opening: BranchItemData[];
    closing: BranchItemData[];
  };
}

interface StockBranchProps {
  data: StockData;
}

export const StockBranch: React.FC<StockBranchProps> = ({ data }) => {
  return (
    <Box sx={{ p: 4,  mt: 4, bgcolor: '#E7EBF0', borderRadius: 2, boxShadow: `
      4px 4px 20px 0px #6F8CB069,
      -6px -6px 20px 0px #FFFFFF,
      2px 2px 4px 0px #728EAB1A
      `,}}>
      <Typography variant="h5" sx={{ mb: 4, textAlign: 'center' }}>
        {data.title}
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
        <Box sx={{ flex: 1, maxWidth: 400 }}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              mb: 3,
              textAlign: 'center',
             bgcolor: '#E7EBF0'
            }}
          >
            <Typography variant="h6">Opening Stocks</Typography>
            <Typography variant="h5">{data.totalValue}</Typography>
          </Paper>
          {data.categories.opening.map((item, index) => (
            <BranchItem key={index} {...item} />
          ))}
        </Box>
        <Box sx={{ flex: 1, maxWidth: 400 }}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              mb: 3,
              textAlign: 'center',
              bgcolor: '#E7EBF0'
            }}
          >
            <Typography variant="h6">Closing Stocks</Typography>
            <Typography variant="h5">{data.totalValue}</Typography>
          </Paper>
          {data.categories.closing.map((item, index) => (
            <BranchItem key={index} {...item} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default StockBranch;