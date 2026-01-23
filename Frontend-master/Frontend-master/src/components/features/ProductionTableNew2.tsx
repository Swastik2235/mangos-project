// import React from 'react';
import { Box, Typography, Paper, Divider } from '@mui/material';
import { CheckCircle, Circle } from 'lucide-react';

// ✅ Sample multiple section-wise data
const tableData = [
    
  {
    section: 'HT 100X100X10',
    total: 1525,
    completed: 0,
    balance: 1525,
    qc: 'F4G',
    dispatched: true,
  },
  {
    section: 'ISMB 200',
    total: 1000,
    completed: 500,
    balance: 500,
    qc: 'A2B',
    dispatched: false,
  },
  {
    section: 'C Channel 75X40',
    total: 800,
    completed: 800,
    balance: 0,
    qc: 'Z9K',
    dispatched: true,
  },
];

const footerData = {
  label: '← BOM Details',
  total: '10MT',
  completed: '5MT',
  balance: '5MT',
  qcPercent: '50%',
  dispatchPercent: '50%',
};

const DispatchTable = () => {
  return (
    <Paper elevation={3} sx={{ p: 2, borderRadius: 2, bgcolor: '#fff' }}>
      {/* Header */}
      <Box display="flex" fontWeight="bold" bgcolor="#f0f0f0" px={2} py={1}>
        <Box width="20%">Section</Box>
        <Box width="15%">Total (Kg)</Box>
        <Box width="15%">Completed (Kg)</Box>
        <Box width="15%">Balance (Kg)</Box>
        <Box width="15%">QC / JC</Box>
        <Box width="20%">Dispatch Status</Box>
      </Box>
      <Divider />

      {/* Rows */}
      {tableData.map((row, index) => (
        <Box
          key={index}
          display="flex"
          alignItems="center"
          px={2}
          py={1}
          borderBottom="1px solid #eee"
        >
          <Box width="20%">
            <Typography fontWeight={500}>{row.section}</Typography>
          </Box>
          <Box width="15%">
            <Typography>{row.total}</Typography>
          </Box>
          <Box width="15%">
            {row.completed > 0 ? (
              <Typography>{row.completed}</Typography>
            ) : (
              <Circle className="text-gray-500" size={20} />
            )}
          </Box>
          <Box width="15%">
            <Typography>{row.balance}</Typography>
          </Box>
          <Box width="15%">
            <Box
              component="span"
              bgcolor="#d0e8ff"
              color="#0056a3"
              px={1}
              py={0.5}
              fontSize="12px"
              borderRadius={1}
              fontWeight={600}
            >
              {row.qc}
            </Box>
          </Box>
          <Box width="20%" display="flex" alignItems="center" gap={1}>
            <Typography fontSize="20px">📋</Typography>
            {row.dispatched && (
              <CheckCircle className="text-green-500" size={20} />
            )}
          </Box>
        </Box>
      ))}

      {/* Footer */}
      <Box display="flex" fontWeight="bold" bgcolor="#f9f9f9" px={2} py={1}>
        <Box width="20%">{footerData.label}</Box>
        <Box width="15%">{footerData.total}</Box>
        <Box width="15%">{footerData.completed}</Box>
        <Box width="15%">{footerData.balance}</Box>
        <Box width="15%">{footerData.qcPercent}</Box>
        <Box width="20%">{footerData.dispatchPercent}</Box>
      </Box>
    </Paper>
  );
};

export default DispatchTable;
