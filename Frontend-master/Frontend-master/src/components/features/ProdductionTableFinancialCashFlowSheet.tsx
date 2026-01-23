import { useState } from 'react';
import {
  Box,
  Typography,
  Divider,
  IconButton,
  MenuItem,
  Select,
  // SelectChangeEvent,
  Tabs,
  Tab,
  Dialog,
  DialogContent,

  DialogTitle,
  DialogActions,
  Button,
  useMediaQuery,
  useTheme,
  Paper
} from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';


const ProductionTableFinancialCashFlowSheet = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedDate, setSelectedDate] = useState('Dec 2022');
  const [activeTab, setActiveTab] = useState(0);
  const [fullscreenOpen, setFullscreenOpen] = useState(false);

  // Removed unused handleDateChange function

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleFullscreenOpen = () => {
    setFullscreenOpen(true);
  };

  const handleFullscreenClose = () => {
    setFullscreenOpen(false);
  };

 const cashFlowData = [
  {
    section: "OPERATING ACTIVITIES",
    items: [
      {
        particulars: "Net Profit Before Tax",
        date: "2022-12-31",
        changeInValue: -600,
        netValue: 39500,
        percentage: -10.74,
      },
      { particulars: "Adjustments for:", isSubHeader: true },
      {
        particulars: "Depreciation",
        changeInValue: -600,
        netValue: 39500,
        percentage: -10.74,
      },
      {
        particulars: "Preliminary Expenses w/off",
        changeInValue: -600,
        netValue: 38500,
        percentage: -10.74,
      },
      {
        particulars: "Deferred Revenue Expenditure",
        changeInValue: 120,
        netValue: 39000,
        percentage: 10.74,
      },
      {
        particulars: "(Profit)/Loss on sale of Assets",
        changeInValue: 200,
        netValue: 39500,
        percentage: 10.74,
      },
      {
        particulars: "Interest & Finance Charges",
        changeInValue: 500,
        netValue: 39500,
        percentage: 10.74,
      },
      {
        particulars: "Interest on FD",
        changeInValue: -600,
        netValue: 39500,
        percentage: -10.74,
      },
      {
        particulars: "Dividend Income",
        changeInValue: -600,
        netValue: 39500,
        percentage: -10.74,
      },
    ],
  },
  {
    section: "Operating Profit before Working",
    items: [
      {
        particulars: "Capital Changes",
        changeInValue: -500,
        netValue: 39500,
        percentage: -10.74,
      },
      { particulars: "Adjustments for:", isSubHeader: true },
      {
        particulars: "Decrese/(Increase) in Receivables",
        changeInValue: 120,
        netValue: 39500,
        percentage: 10.74,
      },
      {
        particulars: "Decrease/(Increase) in Inventories",
        changeInValue: 200,
        netValue: 39500,
        percentage: 10.74,
      },
      {
        particulars: "Increase/(Decrease) in Payables",
        changeInValue: 500,
        netValue: 39500,
        percentage: 10.74,
      },
      {
        particulars: "Cash generated from operations",
        changeInValue: 0,
        netValue: 39500,
        percentage: 0,
      },
      {
        particulars: "Income Tax paid",
        changeInValue: 0,
        netValue: 39500,
        percentage: 0,
      },
      {
        particulars: "Net Cash flow from Operating activities",
        changeInValue: 0,
        netValue: 39500,
        percentage: 0,
      },
    ],
  },
  {
    section: "INVESTING ACTIVITIES",
    items: [
      {
        particulars: "Purchase of Fixed Assets",
        changeInValue: 500,
        netValue: 39500,
        percentage: 10.74,
      },
      {
        particulars: "Mutual Fund",
        changeInValue: -600,
        netValue: 39500,
        percentage: -10.74,
      },
      {
        particulars: "Sale of Fixed Assets",
        changeInValue: 120,
        netValue: 39500,
        percentage: 10.74,
      },
      {
        particulars: "Increase in Advances & others",
        changeInValue: 200,
        netValue: 39500,
        percentage: 10.74,
      },
      {
        particulars: "Interest on FD",
        changeInValue: 500,
        netValue: 39500,
        percentage: 10.74,
      },
      {
        particulars: "Dividend Income",
        changeInValue: 500,
        netValue: 39500,
        percentage: 10.74,
      },
      {
        particulars: "Net Cash used in Investing activities",
        changeInValue: 500,
        netValue: 39500,
        percentage: 10.74,
      },
    ],
  },
  {
    section: "FINANCING ACTIVITIES",
    items: [
      {
        particulars: "Proceeds from Long term Borrowings",
        changeInValue: 500,
        netValue: 39500,
        percentage: 10.74,
      },
      {
        particulars: "Interest paid",
        changeInValue: -600,
        netValue: 39500,
        percentage: -10.74,
      },
      {
        particulars: "Net Cash used in financing activities",
        changeInValue: 120,
        netValue: 39500,
        percentage: 10.74,
      },
      {
        particulars: "Net increase in Cash & Cash Equivalents",
        changeInValue: 200,
        netValue: 39500,
        percentage: 10.74,
      },
      {
        particulars: "Cash and Cash equivalents as at 01.04....",
        changeInValue: 120,
        netValue: 39500,
        percentage: 10.74,
      },
      {
        particulars: "Cash and Cash equivalents as at 31.03....",
        changeInValue: 600,
        netValue: 39500,
        percentage: 10.74,
      },
    ],
  },
  {
    section: "Cash & Cash Equivalents",
    items: [
      {
        particulars: "Cash in Hand",
        changeInValue: 500,
        netValue: 39500,
        percentage: 10.74,
      },
      {
        particulars: "Cash at Bank",
        changeInValue: -600,
        netValue: 39500,
        percentage: -10.74,
      },
      {
        particulars: "Total",
        changeInValue: 0,
        netValue: 39500,
        percentage: 0,
      },
    ],
  },
];

  // Filter data based on active tab
  const filteredData =
    activeTab === 0
      ? cashFlowData
      : [cashFlowData[activeTab - 1]]; // tab 1 = Operating, 2 = Investing, 3 = Financing

  const renderTable = (fullscreen = false) => {
  return (
    <Box 
      borderRadius={fullscreen ? 0 : 2} 
      bgcolor={fullscreen ? '#E7EBF0' : '#E7EBF0'} 
      boxShadow={fullscreen ? 0 : 2}
      p={fullscreen ? 0 : 2}
      width="100%"
      height={fullscreen ? '100%' : 'auto'}
      overflow="auto"  // Changed to auto for better mobile scrolling
    >
      {/* Table Header - Now shows all columns in mobile too */}
      <Box 
        display="flex" 
        bgcolor="#E7EBF0" 
        px={2} 
        py={1}
        sx={{
          position: fullscreen ? 'sticky' : 'static',
          top: 0,
          zIndex: 1,
          minWidth: isSmallScreen && !fullscreen ? '800px' : '100%' // Ensures all columns are visible
        }}
      >
        <Typography sx={{ width: isSmallScreen && !fullscreen ? '30%' : '40%', minWidth: '120px' }}>Particulars</Typography>
        <Typography sx={{ width: isSmallScreen && !fullscreen ? '15%' : '10%', minWidth: '80px', textAlign: 'center' }}>Date</Typography>
        <Typography sx={{ width: isSmallScreen && !fullscreen ? '15%' : '10%', minWidth: '80px', textAlign: 'center' }}>Change</Typography>
        <Typography sx={{ width: isSmallScreen && !fullscreen ? '20%' : '20%', minWidth: '80px', textAlign: 'center' }}>Value</Typography>
        <Typography sx={{ width: isSmallScreen && !fullscreen ? '20%' : '20%', minWidth: '80px', textAlign: 'center' }}>%</Typography>
      </Box>
      <Divider />

      {/* Filtered Table Rows */}
      {filteredData.map((section, sIdx) => (
        <Box key={sIdx} sx={{ minWidth: isSmallScreen && !fullscreen ? '800px' : '100%' }}>
          <Typography 
            fontWeight="bold" 
            bgcolor="#E7EBF0" 
            px={2} 
            py={1} 
            mt={2}
            sx={{
              position: fullscreen ? 'sticky' : 'static',
              top: fullscreen ? '48px' : 'auto',
              zIndex: 1,
              minWidth: isSmallScreen && !fullscreen ? '800px' : '100%'
            }}
          >
            {section.section}
          </Typography>

          {section.items.map((row, idx) => (
            <Box
              key={idx}
              display="flex"
              alignItems="center"
              px={2}
              py={0.5}
              bgcolor={row.isSubHeader ? '#E7EBF0' : '#E7EBF0'}
              sx={{
                fontWeight: row.isSubHeader ? 600 : 400,
                fontStyle: row.isSubHeader ? 'italic' : 'normal',
                minWidth: isSmallScreen && !fullscreen ? '800px' : '100%'
              }}
            >
              <Typography sx={{ width: isSmallScreen && !fullscreen ? '30%' : '40%', minWidth: '120px' }}>
                {row.particulars}
              </Typography>
              <Typography sx={{ width: isSmallScreen && !fullscreen ? '15%' : '10%', minWidth: '80px', textAlign: 'center' }}>
                {row.date || ''}
              </Typography>
              <Typography
                sx={{
                  width: isSmallScreen && !fullscreen ? '15%' : '10%',
                  minWidth: '80px',
                  textAlign: 'center',
                  color: typeof row.changeInValue === 'number'
                    ? row.changeInValue >= 0 ? 'green' : 'red'
                    : 'inherit',
                }}
              >
                {row.changeInValue !== undefined ? row.changeInValue : ''}
              </Typography>
              <Typography sx={{ width: isSmallScreen && !fullscreen ? '20%' : '20%', minWidth: '80px', textAlign: 'center' }}>
                {row.netValue !== undefined ? row.netValue : ''}
              </Typography>
              <Typography sx={{ width: isSmallScreen && !fullscreen ? '20%' : '20%', minWidth: '80px', textAlign: 'center' }}>
                {row.percentage !== undefined ? `${row.percentage.toFixed(2)}%` : ''}
              </Typography>
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
};

  return (
    <>
      <Paper elevation={3} sx={{ p: isSmallScreen ? 1 : 2, borderRadius: 2 ,     bgcolor:'#E7EBF0'
}}>
        {/* Header with Tabs */}
        <Box 
          display="flex" 
          justifyContent="space-between" 
          mb={2}
          flexDirection={isSmallScreen ? 'column' : 'row'}
          gap={isSmallScreen ? 2 : 0}
          alignItems={isSmallScreen ? 'flex-start' : 'center'}

        >
          <Box display="flex" alignItems="center" gap={1} overflow="auto" width={isSmallScreen ? '100%' : 'auto' }>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              textColor="primary"
              indicatorColor="primary"
              variant={isSmallScreen ? 'scrollable' : 'standard'}
              scrollButtons="auto"
              sx={{ minHeight: 'unset' }}
            >
              <Tab 
                label="Highlights" 
                sx={{ 
                  textTransform: 'none', 
                  fontSize: isSmallScreen ? '1rem' : '1.25rem',
                  fontWeight: 'bold',
                  minWidth: 'unset',
                  px: isSmallScreen ? 1 : 2
                }} 
              />
              <Tab 
                label="Operating" 
                sx={{ 
                  textTransform: 'none',
                  minWidth: 'unset',
                  px: isSmallScreen ? 1 : 2
                }} 
              />
              <Tab 
                label="Investing" 
                sx={{ 
                  textTransform: 'none',
                  minWidth: 'unset',
                  px: isSmallScreen ? 1 : 2
                }} 
              />
              <Tab 
                label="Financing" 
                sx={{ 
                  textTransform: 'none',
                  minWidth: 'unset',
                  px: isSmallScreen ? 1 : 2
                }} 
              />
            </Tabs>
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
         <Select
  value={selectedDate}
  onChange={(e) => setSelectedDate(e.target.value)}
  size="small"
  sx={{
    minWidth: 120,
    bgcolor: '#E7EBF0',
    boxShadow: '4px 4px 20px 0px #6F8CB069, -6px -6px 20px 0px #E7EBF0, 2px 2px 4px 0px #728EAB1A',
    flexShrink: 0,
    borderRadius: 2,
  }}
  renderValue={(value) => (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <CalendarMonthIcon sx={{ fontSize: '16px', color: '#0f172a' }} /> {/*  icon */}
      <Typography sx={{ color: '#0f172a' }}>{value}</Typography>
    </Box>
  )}
>
  <MenuItem value="Dec 2022">
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <CalendarMonthIcon sx={{ fontSize: '16px', color: '#0f172a' }} />
      Dec 2022
    </Box>
  </MenuItem>
  <MenuItem value="Jan 2023">Jan 2023</MenuItem>
  <MenuItem value="Feb 2023">Feb 2023</MenuItem>
</Select>

            <IconButton onClick={handleFullscreenOpen} size="small">
              <FullscreenIcon fontSize={isSmallScreen ? 'small' : 'medium'} />
            </IconButton>
          </Box>
        </Box>

        {renderTable()}
      </Paper>

      {/* Fullscreen Dialog */}
      <Dialog
        open={fullscreenOpen}
        onClose={handleFullscreenClose}
        fullScreen
        PaperProps={{
          sx: {
      bgcolor: '#E7EBF0',
            p: 2
          }
        }}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          borderBottom: '1px solid #E7EBF0',
          pb: 2,
          bgcolor: '#E7EBF0'
        }}>
          <Typography variant="h6" fontWeight={600}>
            Cash Flow Statement - {activeTab === 0 ? 'Highlights' : 
              activeTab === 1 ? 'Operating Activities' : 
              activeTab === 2 ? 'Investing Activities' : 'Financing Activities'}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton onClick={handleFullscreenClose}>
              <FullscreenExitIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ p: 0, bgcolor: '#E7EBF0' }}>
          {renderTable(true)}
        </DialogContent>
        <DialogActions sx={{ borderTop: '1px solid #E7EBF0', pt: 2, bgcolor: '#E7EBF0' }}>
          <Button onClick={handleFullscreenClose} variant="contained" color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProductionTableFinancialCashFlowSheet;