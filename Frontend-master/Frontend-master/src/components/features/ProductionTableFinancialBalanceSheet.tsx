import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Select,
  MenuItem,
  useMediaQuery,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';


interface TableRow {
  particulars: string;
  date: string;
  changeInValue: number | null;
  netValue: number | null;
  percentage: number | null;
  isHeader?: boolean;
  isSubheader?: boolean;
  isFooter?: boolean;
}

interface ValueTableProps {
  data: TableRow[];
  fullWidth?: boolean;
}

const ValueTable: React.FC<ValueTableProps> = ({ data, fullWidth = false }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ 
      border: '1px solid #E7EBF0',
      bgcolor: '#E7EBF0',
      borderRadius: 1,
      overflow: 'hidden',
      backgroundColor: 'white',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      height: fullWidth ? 'auto' : isMobile ? '350px' : '400px',
      display: 'flex',
      flexDirection: 'column',
      width: '100%'
    }}>
      <Box sx={{ 
        overflow: 'auto',
        
        flex: 1,
        '&::-webkit-scrollbar': {
          width: '6px',
          height: '6px',
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#888',
          borderRadius: '3px',
        }
      }}>
        <table style={{ 
          width: '100%', 
          borderCollapse: 'collapse',
          minWidth: isMobile ? '600px' : '100%'
        }}>
          <thead style={{ position: 'sticky', top: 0, zIndex: 1 }}>
            <tr style={{ backgroundColor: '#E7EBF0' }}>
              <th style={{ 
                padding: '12px',
                textAlign: 'left',
                minWidth: isMobile ? '200px' : '250px',
                position: 'sticky',
                left: 0,
                backgroundColor: '#E7EBF0',
                zIndex: 2
              }}>PARTICULARS</th>
              
              {!isMobile && (
                <th style={{ 
                  padding: '12px',
                  textAlign: 'left',
                  minWidth: '100px',
                  backgroundColor: '#E7EBF0'
                }}>Date</th>
              )}
              
              <th style={{ 
                padding: '12px',
                textAlign: 'right',
                minWidth: '120px',
                backgroundColor: '#E7EBF0'
              }}>{isMobile ? 'Chg' : 'Change'}</th>
              
              <th style={{ 
                padding: '12px',
                textAlign: 'right',
                minWidth: '120px',
                backgroundColor: '#E7EBF0'
              }}>Net Value</th>
              
              <th style={{ 
                padding: '12px',
                textAlign: 'right',
                minWidth: '80px',
                backgroundColor: '#E7EBF0'
              }}>(%)</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} style={{ 
                backgroundColor: row.isHeader ? '#E7EBF0' : 
                                row.isSubheader ? '#E7EBF0' : 
                                row.isFooter ? '#E7EBF0' : 'white',
                borderTop: row.isHeader || row.isSubheader ? '1px solid #E7EBF0' : 'none'
              }}>
                <td style={{ 
                  padding: '12px',
                  position: row.isHeader ? 'sticky' : undefined,
                  left: row.isHeader ? 0 : undefined,
                  backgroundColor: row.isHeader ? '#E7EBF0' : 'inherit',
                  zIndex: row.isHeader ? 1 : undefined,
                  fontWeight: row.isHeader ? 600 : 400,
                  paddingLeft: row.isSubheader ? '24px' : 
                              row.isHeader ? '12px' : 
                              '36px'
                }}>
                  {row.particulars}
                </td>
                
                {!isMobile && (
                  <td style={{ padding: '12px' }}>{row.date}</td>
                )}
                
                <td style={{ 
                  padding: '12px',
                  textAlign: 'right',
                  color: row.changeInValue && row.changeInValue < 0 ? '#d32f2f' : '#2e7d32',
                  fontWeight: row.isHeader || row.isFooter ? 600 : 400
                }}>
                  {row.changeInValue !== null ? row.changeInValue.toLocaleString('en-IN') : ''}
                </td>
                
                <td style={{ 
                  padding: '12px',
                  textAlign: 'right',
                  color: row.netValue && row.netValue < 0 ? '#d32f2f' : '#2e7d32',
                  fontWeight: row.isHeader || row.isFooter ? 600 : 400
                }}>
                  {row.netValue !== null ? row.netValue.toLocaleString('en-IN') : ''}
                </td>
                
                <td style={{ 
                  padding: '12px',
                  textAlign: 'right',
                  color: row.percentage && row.percentage < 0 ? '#d32f2f' : '#2e7d32',
                  fontWeight: row.isHeader || row.isFooter ? 600 : 400
                }}>
                  {row.percentage !== null ? `☐ ${row.percentage > 0 ? '+' : ''}${row.percentage.toLocaleString('en-IN')}%` : ''}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
    </Box>
  );
};

// Data for Highlight tab (4 tables)
const highlightTables: TableRow[][] = [
  [
    { particulars: "LIABILITIES", date: "", changeInValue: null, netValue: null, percentage: null, isHeader: true },
    { particulars: "Capital Account", date: "", changeInValue: 2200, netValue: null, percentage: null },
    { particulars: "Reserves & Surplus", date: "", changeInValue: -3120, netValue: 89000, percentage: 10.74 },
    { particulars: "ASA Agrotech Pvt Ltd", date: "", changeInValue: 337000, netValue: 337000, percentage: 10.74 },
    { particulars: "Budhiya Commercial Private Limited", date: "", changeInValue: -337000, netValue: 337000, percentage: 10.74 },
    { particulars: "Kaushik Sarda", date: "", changeInValue: 10000, netValue: 105000, percentage: 10.74 },
    { particulars: "Pankaj Sarda", date: "", changeInValue: 305000, netValue: 305000, percentage: 10.74 },
    { particulars: "Ramblias Deokaran Sarda", date: "", changeInValue: -337000, netValue: 337000, percentage: 10.74 },
    { particulars: "Shree Metals (Mujbi)...", date: "", changeInValue: -337000, netValue: 337000, percentage: 10.74 },
    { particulars: "Urmiladevi Sarda", date: "", changeInValue: -337000, netValue: 337000, percentage: 10.74 },
    { particulars: "Vandana Sarda", date: "", changeInValue: -337000, netValue: 337000, percentage: 10.74 },
    { particulars: "Loans (Liability)", date: "", changeInValue: null, netValue: null, percentage: null, isSubheader: true },
    { particulars: "Secured Loans", date: "", changeInValue: 10000, netValue: 105000, percentage: 10.74 },
    { particulars: "Unsecured Loans", date: "", changeInValue: 305000, netValue: 305000, percentage: 10.74 },
    { particulars: "Current Liabilities", date: "", changeInValue: null, netValue: null, percentage: null, isSubheader: true },
    { particulars: "Duties & Taxes", date: "", changeInValue: 10000, netValue: 105000, percentage: 10.74 },
    { particulars: "Provisions", date: "", changeInValue: 305000, netValue: 305000, percentage: 10.74 },
    { particulars: "Sundry Creditors", date: "", changeInValue: -337000, netValue: 337000, percentage: 10.74 },
    { particulars: "Other Current Liabilities", date: "", changeInValue: -337000, netValue: 337000, percentage: 10.74 },
    { particulars: "STAFF IMPREST", date: "", changeInValue: -337000, netValue: 337000, percentage: 10.74 },
    { particulars: "Suspense A/C", date: "", changeInValue: 2200, netValue: 2200, percentage: null },
    { particulars: "Total", date: "", changeInValue: 2200, netValue: null, percentage: null, isFooter: true }
  ],
  [
    { particulars: "ASSETS", date: "", changeInValue: null, netValue: null, percentage: null, isHeader: true },
    { particulars: "Fixed Assets", date: "", changeInValue: -3120, netValue: 2200, percentage: 10.74 },
    { particulars: "Buildings", date: "", changeInValue: 337000, netValue: 89000, percentage: 10.74 },
    { particulars: "Computer", date: "", changeInValue: -337000, netValue: 337000, percentage: 10.74 },
    { particulars: "Electronics", date: "", changeInValue: 10000, netValue: 105000, percentage: 10.74 },
    { particulars: "Furniture & Fixtuer", date: "", changeInValue: 305000, netValue: 305000, percentage: 10.74 },
    { particulars: "Office Equipment", date: "", changeInValue: -337000, netValue: 337000, percentage: 10.74 },
    { particulars: "Plant & Machinery", date: "", changeInValue: -337000, netValue: 337000, percentage: 10.74 },
    { particulars: "Land Filling A/C", date: "", changeInValue: -337000, netValue: 337000, percentage: 10.74 },
    { particulars: "Leasehold Land", date: "", changeInValue: -337000, netValue: 337000, percentage: 10.74 },
    { particulars: "Current Assets", date: "", changeInValue: null, netValue: 2200, percentage: null, isSubheader: true },
    { particulars: "Closing Stock", date: "", changeInValue: 10000, netValue: 105000, percentage: 10.74 },
    { particulars: "Deposits (Asset)", date: "", changeInValue: -337000, netValue: 337000, percentage: 10.74 },
    { particulars: "Loans & Advances (Asset)", date: "", changeInValue: -337000, netValue: 337000, percentage: 10.74 },
    { particulars: "Sundry Debtors", date: "", changeInValue: 10000, netValue: 105000, percentage: 10.74 },
    { particulars: "Cash-In-Hand", date: "", changeInValue: 305000, netValue: 305000, percentage: 10.74 },
    { particulars: "Bank Accounts", date: "", changeInValue: -337000, netValue: 337000, percentage: 10.74 },
    { particulars: "FDR With Banks", date: "", changeInValue: -337000, netValue: 337000, percentage: 10.74 },
    { particulars: "Income Tax Funds", date: "", changeInValue: -337000, netValue: 337000, percentage: 10.74 },
    { particulars: "Other Current Assets", date: "", changeInValue: 305000, netValue: 305000, percentage: 10.74 },
    { particulars: "TCS On Purchase", date: "", changeInValue: -337000, netValue: 337000, percentage: 10.74 },
    { particulars: "Profit & Loss A/C", date: "", changeInValue: null, netValue: 2200, percentage: null, isSubheader: true },
    { particulars: "Opening Balance", date: "", changeInValue: 305000, netValue: 305000, percentage: 10.74 },
    { particulars: "Current Period", date: "", changeInValue: -337000, netValue: 337000, percentage: 10.74 },
    { particulars: "Total", date: "", changeInValue: null, netValue: 2200, percentage: null, isFooter: true }
  ],
  [
    { particulars: "Stockholders equity", date: "", changeInValue: null, netValue: null, percentage: null, isHeader: true },
    { particulars: "Common stocks", date: "", changeInValue: 100000, netValue: 105000, percentage: 10.74 },
    { particulars: "Retained earnings", date: "", changeInValue: -10000, netValue: 200000, percentage: 10.74 },
    { particulars: "Accum other comprehensive income", date: "", changeInValue: -10000, netValue: 200000, percentage: 10.74 },
    { particulars: "Less: Treasury stocks", date: "", changeInValue: 305000, netValue: 305000, percentage: null },
    { particulars: "Total stockholder equity", date: "", changeInValue: -500, netValue: 5500, percentage: 10.74, isFooter: true },
    { particulars: "Total liabilities & stockholders equity", date: "", changeInValue: 337000, netValue: 337000, percentage: null, isFooter: true }
  ],
  [
    {
      particulars: "Highlight Item 7",
      date: "2024-03-01",
      changeInValue: 450,
      netValue: 4500,
      percentage: 11.11
    },
    {
      particulars: "Highlight Item 8",
      date: "2024-03-01",
      changeInValue: -350,
      netValue: 3150,
      percentage: -10.0
    }
  ]
];

// Data for other tabs (1 table each)
const tabData = {
  Assets: [
    { particulars: "Computer", date: "", changeInValue: -337000, netValue: 337000, percentage: 10.74 },
    { particulars: "Electronics", date: "", changeInValue: 10000, netValue: 105000, percentage: 10.74 },
    { particulars: "Furniture & Fixtuer", date: "", changeInValue: 305000, netValue: 305000, percentage: 10.74 },
    { particulars: "Office Equipment", date: "", changeInValue: -337000, netValue: 337000, percentage: 10.74 },
    { particulars: "Plant & Machinery", date: "", changeInValue: -337000, netValue: 337000, percentage: 10.74 },
    { particulars: "Land Filling A/C", date: "", changeInValue: -337000, netValue: 337000, percentage: 10.74 },
    { particulars: "Leasehold Land", date: "", changeInValue: -337000, netValue: 337000, percentage: 10.74 },
    { particulars: "Current Assets", date: "", changeInValue: null, netValue: 2200, percentage: null, isSubheader: true },
    { particulars: "Closing Stock", date: "", changeInValue: 10000, netValue: 105000, percentage: 10.74 },
    { particulars: "Deposits (Asset)", date: "", changeInValue: -337000, netValue: 337000, percentage: 10.74 },
    { particulars: "Loans & Advances (Asset)", date: "", changeInValue: -337000, netValue: 337000, percentage: 10.74 },
    { particulars: "Sundry Debtors", date: "", changeInValue: 10000, netValue: 105000, percentage: 10.74 },
    { particulars: "Cash-In-Hand", date: "", changeInValue: 305000, netValue: 305000, percentage: 10.74 },
    { particulars: "Bank Accounts", date: "", changeInValue: -337000, netValue: 337000, percentage: 10.74 },
    { particulars: "FDR With Banks", date: "", changeInValue: -337000, netValue: 337000, percentage: 10.74 },
    { particulars: "Income Tax Funds", date: "", changeInValue: -337000, netValue: 337000, percentage: 10.74 },
    { particulars: "Other Current Assets", date: "", changeInValue: 305000, netValue: 305000, percentage: 10.74 },
    { particulars: "TCS On Purchase", date: "", changeInValue: -337000, netValue: 337000, percentage: 10.74 },
    { particulars: "Profit & Loss A/C", date: "", changeInValue: null, netValue: 2200, percentage: null, isSubheader: true },
    { particulars: "Opening Balance", date: "", changeInValue: 305000, netValue: 305000, percentage: 10.74 },
    { particulars: "Current Period", date: "", changeInValue: -337000, netValue: 337000, percentage: 10.74 },
    { particulars: "Total", date: "", changeInValue: null, netValue: 2200, percentage: null, isFooter: true }
  ],
  Liabilities: [
    { particulars: "LIABILITIES", date: "", changeInValue: null, netValue: null, percentage: null, isHeader: true },
    { particulars: "Capital Account", date: "", changeInValue: 2200, netValue: null, percentage: null },
    { particulars: "Reserves & Surplus", date: "", changeInValue: -3120, netValue: 89000, percentage: 10.74 },
    { particulars: "ASA Agrotech Pvt Ltd", date: "", changeInValue: 337000, netValue: 337000, percentage: 10.74 },
    { particulars: "Budhiya Commercial Private Limited", date: "", changeInValue: -337000, netValue: 337000, percentage: 10.74 },
    { particulars: "Kaushik Sarda", date: "", changeInValue: 10000, netValue: 105000, percentage: 10.74 },
    { particulars: "Pankaj Sarda", date: "", changeInValue: 305000, netValue: 305000, percentage: 10.74 },
    { particulars: "Ramblias Deokaran Sarda", date: "", changeInValue: -337000, netValue: 337000, percentage: 10.74 },
    { particulars: "Shree Metals (Mujbi)...", date: "", changeInValue: -337000, netValue: 337000, percentage: 10.74 },
    { particulars: "Urmiladevi Sarda", date: "", changeInValue: -337000, netValue: 337000, percentage: 10.74 },
    { particulars: "Vandana Sarda", date: "", changeInValue: -337000, netValue: 337000, percentage: 10.74 },
    { particulars: "Loans (Liability)", date: "", changeInValue: null, netValue: null, percentage: null, isSubheader: true },
    { particulars: "Secured Loans", date: "", changeInValue: 10000, netValue: 105000, percentage: 10.74 },
    { particulars: "Unsecured Loans", date: "", changeInValue: 305000, netValue: 305000, percentage: 10.74 },
    { particulars: "Current Liabilities", date: "", changeInValue: null, netValue: null, percentage: null, isSubheader: true },
    { particulars: "Duties & Taxes", date: "", changeInValue: 10000, netValue: 105000, percentage: 10.74 },
    { particulars: "Provisions", date: "", changeInValue: 305000, netValue: 305000, percentage: 10.74 },
    { particulars: "Sundry Creditors", date: "", changeInValue: -337000, netValue: 337000, percentage: 10.74 },
    { particulars: "Other Current Liabilities", date: "", changeInValue: -337000, netValue: 337000, percentage: 10.74 },
    { particulars: "STAFF IMPREST", date: "", changeInValue: -337000, netValue: 337000, percentage: 10.74 },
    { particulars: "Suspense A/C", date: "", changeInValue: 2200, netValue: 2200, percentage: null },
    { particulars: "Total", date: "", changeInValue: 2200, netValue: null, percentage: null, isFooter: true }
  ],
  Equity: [
    { particulars: "Stockholders equity", date: "", changeInValue: null, netValue: null, percentage: null, isHeader: true },
    { particulars: "Common stocks", date: "", changeInValue: 100000, netValue: 105000, percentage: 10.74 },
    { particulars: "Retained earnings", date: "", changeInValue: -10000, netValue: 200000, percentage: 10.74 },
    { particulars: "Accum other comprehensive income", date: "", changeInValue: -10000, netValue: 200000, percentage: 10.74 },
    { particulars: "Less: Treasury stocks", date: "", changeInValue: 305000, netValue: 305000, percentage: null },
    { particulars: "Total stockholder equity", date: "", changeInValue: -500, netValue: 5500, percentage: 10.74, isFooter: true },
    { particulars: "Total liabilities & stockholders equity", date: "", changeInValue: 337000, netValue: 337000, percentage: null, isFooter: true }
  ],
};

const ProductionTableFinancialBalanceSheet: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('Dec 2022');
  const [selectedTab, setSelectedTab] = useState('Highlight');
  const [openFullscreen, setOpenFullscreen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleFullscreenClose = () => {
    setOpenFullscreen(false);
  };

  const renderTables = () => {
    if (selectedTab === 'Highlight') {
      return (
        <Box sx={{
          display: 'flex',
          overflowX: 'auto',
          gap: 2,
          pb: 2,
          bgcolor: '#E7EBF0',
          scrollSnapType: isMobile ? 'x mandatory' : 'none',
          '& > *': {
            scrollSnapAlign: isMobile ? 'start' : 'none',
            minWidth: isMobile ? '85vw' : '350px',
            flexShrink: 0
          }
        }}>
          {highlightTables.map((tableData, index) => (
            <Box key={index} sx={{ height: '100%' }}>
              <ValueTable data={tableData} />
            </Box>
          ))}
        </Box>
      );
    } else {
      return (
        <Box sx={{ width: '100%' }}>
          <ValueTable data={tabData[selectedTab as keyof typeof tabData]} />
        </Box>
      );
    }
  };

  return (
    <>
      <Card sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#E7EBF0'
      }}>
        <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ 
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: isMobile ? 'flex-start' : 'center',
            justifyContent: 'space-between',
            gap: isMobile ? 1 : 2,
            mb: 3,
            pb: 2,
            borderBottom: '1px solid #E7EBF0'
          }}>
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              overflowX: 'auto',
              width: isMobile ? '100%' : 'auto',
              pb: isMobile ? 1 : 0,
              '&::-webkit-scrollbar': { display: 'none' }
            }}>
              <Typography 
                variant={isMobile ? 'body1' : 'h6'}
                onClick={() => setSelectedTab('Highlight')}
                sx={{
                  color: selectedTab === 'Highlight' ? '#1e40af' : '#64748b',
                  fontWeight: selectedTab === 'Highlight' ? 600 : 400,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                Highlights
              </Typography>
              
              {['Assets', 'Liabilities', 'Equity'].map((tab) => (
                <Typography
                  key={tab}
                  variant="body1"
                  onClick={() => setSelectedTab(tab)}
                  sx={{
                    color: selectedTab === tab ? '#1e40af' : '#64748b',
                    fontWeight: selectedTab === tab ? 600 : 400,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {tab}
                </Typography>
              ))}
            </Box>

            <Box sx={{ 
              display: 'flex',
              gap: 1,
              ml: isMobile ? 0 : 'auto'
            }}>
              <Select value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} size="small" startAdornment={<CalendarMonthIcon fontSize="small" sx={{ mr: 1 }} />} sx={{
              minWidth: 120, bgcolor: '#E7EBF0', boxShadow: '4px 4px 20px 0px #6F8CB069, -6px -6px 20px 0px #E7EBF0, 2px 2px 4px 0px #728EAB1A'
            }}>
              <MenuItem value="Dec 2022">Dec 2022</MenuItem>
              <MenuItem value="Nov 2022">Nov 2022</MenuItem>
            </Select>
            <IconButton size="small"><MoreVertIcon /></IconButton>
            <IconButton size="small" sx={{ color: '#08070f' }}><FullscreenIcon /></IconButton>
            </Box>
          </Box>

          <Box sx={{ flex: 1, overflow: 'hidden' }}>
            {renderTables()}
          </Box>
        </CardContent>
      </Card>

      <Dialog
        open={openFullscreen}
        onClose={handleFullscreenClose}
        fullScreen
        PaperProps={{ sx: { backgroundColor: '#E7EBF0' } }}
      >
        <DialogTitle sx={{ 
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #e2e8f0',
          backgroundColor: '#E7EBF0',
          position: 'sticky',
          top: 0,
          zIndex: 1
        }}>
          <Typography variant="h6">
            Financial Balance Sheet - {selectedTab}
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              size="small"
              sx={{ 
                minWidth: 120,
                mr: 1,
                '& .MuiSelect-select': { py: 1 }
              }}
            >
              <MenuItem value="Feb 2025">Feb 2025</MenuItem>
            </Select>
            
            <IconButton onClick={handleFullscreenClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        
        <DialogContent sx={{ p: 3 }}>
          {selectedTab === 'Highlight' ? (
            <Box sx={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
              gap: 3
            }}>
              {highlightTables.map((tableData, index) => (
                <Box key={index}>
                  <ValueTable data={tableData} fullWidth />
                </Box>
              ))}
            </Box>
          ) : (
            <ValueTable data={tabData[selectedTab as keyof typeof tabData]} fullWidth />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductionTableFinancialBalanceSheet;