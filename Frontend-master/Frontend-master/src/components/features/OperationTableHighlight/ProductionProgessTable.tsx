import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Select,
  MenuItem,
  Paper,
  Dialog,
  DialogContent,
  DialogTitle,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ProgressBarTable from './ProgressBarTable';
import MultiProgressBar from './MultiProgressBar';
import VerticalProgressBar from './VerticalProgressBar';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import CloseIcon from '@mui/icons-material/Close';

interface DailyMetric {
  primary: number;
  secondary: number;
  tertiary: number;
}

interface ProductionTableRow {
  id: number;
  type: 'header' | 'subitem';
  activity: string;
  qty: number;
  rate: number;
  operations: string;
  cumulativeValues: number;
  color?: 'blue' | 'orange' | 'green';
  progress?: {
    segments: {
      percentage: number;
      color: string;
    }[];
    trend?: 'positive' | 'negative';
    daysRemaining?: number;
    
  };
  dailyValues?: {
    [key: string]: string;
  };
  dailyMetrics?: {
    [key: string]: DailyMetric;
  };
  verticalMetrics?: {
    [key: string]: DailyMetric;
  };
  category?: 'project' | 'plant' | 'business';
}

const productionTableData: ProductionTableRow[] = [
  {
    id: 1,
    type: 'header',
    activity: 'Project Cycle',
    qty: 30,
    rate: 191,
    operations: '70%',
    cumulativeValues: 191551,
    dailyValues: {
      '01': '₹10.5 L',
      '02': '₹10.5 L',
      '03': '₹10.5 L',
      '04': '₹10.5 L',
      '05': '₹10.5 L',
      '06': '₹10.5 L',
      '07': '₹10.5 L',
    },
    category: 'project'
  },
  {
    id: 11,
    type: 'subitem',
    activity: 'Project 1',
    qty: 30,
    rate: 191,
    operations: '50%',
    cumulativeValues: 191551,
    color: 'blue',
    progress: {
      segments: [
        { percentage: 60, color: '#2563eb' },
        { percentage: 30, color: '#60a5fa' },
        { percentage: 10, color: '#93c5fd' }
      ]
    },
    dailyValues: {
      '01': '₹10.5 L',
      '02': '₹10.5 L',
      '03': '₹10.5 L',
      '04': '₹10.5 L',
      '05': '₹10.5 L',
      '06': '₹10.5 L',
      '07': '₹10.5 L',
    },
    category: 'project'
  },
  {
    id: 12,
    type: 'subitem',
    activity: 'Project 2',
    qty: 30,
    rate: 191,
    operations: '40%',
    cumulativeValues: 191551,
    color: 'blue',
    progress: {
      segments: [
        { percentage: 25, color: '#2563eb' },
        { percentage: 45, color: '#60a5fa' },
        { percentage: 30, color: '#93c5fd' }
      ]
    },
    dailyValues: {
      '01': '₹10.5 L',
      '02': '₹10.5 L',
      '03': '₹10.5 L',
      '04': '₹10.5 L',
      '05': '₹10.5 L',
      '06': '₹10.5 L',
      '07': '₹10.5 L',
    },
    category: 'project'
  },
  {
    id: 13,
    type: 'subitem',
    activity: 'Project 3',
    qty: 30,
    rate: 191,
    operations: '40%',
    cumulativeValues: 191551,
    color: 'blue',
    progress: {
      segments: [
        { percentage: 25, color: '#2563eb' },
        { percentage: 45, color: '#60a5fa' },
        { percentage: 30, color: '#93c5fd' }
      ]
    },
    dailyValues: {
      '01': '₹10.5 L',
      '02': '₹10.5 L',
      '03': '₹10.5 L',
      '04': '₹10.5 L',
      '05': '₹10.5 L',
      '06': '₹10.5 L',
      '07': '₹10.5 L',
    },
    category: 'project'
  },
  {
    id: 2,
    type: 'header',
    activity: 'Plant',
    qty: 30,
    rate: 191,
    operations: '70%',
    cumulativeValues: 191551,
    dailyValues: {
      '01': '₹10.5 L',
      '02': '₹10.5 L',
      '03': '₹10.5 L',
      '04': '₹10.5 L',
      '05': '₹10.5 L',
      '06': '₹10.5 L',
      '07': '₹10.5 L',
    },
    category: 'plant'
  },
  {
    id: 21,
    type: 'subitem',
    activity: 'Manpower',
    qty: 30,
    rate: 191,
    operations: '20%',
    cumulativeValues: 191551,
    color: 'orange',
    dailyMetrics: {
      '01': { primary: 70, secondary:20, tertiary: -55 },
      '02': { primary: 70, secondary: 20, tertiary: -55 },
      '03': { primary: 70, secondary: 20, tertiary: -55 },
      '04': { primary: 70, secondary: 20, tertiary: -55 },
      '05': { primary: 70, secondary: 20, tertiary: -55 },
      '06': { primary: 70, secondary: 20, tertiary: -55 },
      '07': { primary: 70, secondary: 20, tertiary: -55 }
    },
    category: 'plant'
  },
  {
    id: 22,
    type: 'subitem',
    activity: 'Material',
    qty: 30,
    rate: 191,
    operations: '60%',
    cumulativeValues: 191551,
    color: 'green',
    dailyMetrics: {
      '01': { primary: 70, secondary: 20, tertiary: -55 },
      '02': { primary: 70, secondary: 20, tertiary: -55 },
      '03': { primary: 70, secondary: 20, tertiary: -55 },
      '04': { primary: 70, secondary: 20, tertiary: -55 },
      '05': { primary: 70, secondary: 20, tertiary: -55 },
      '06': { primary: 70, secondary: 20, tertiary: -55 },
      '07': { primary: 70, secondary: 20, tertiary: -55 }
    },
    category: 'plant'
  },
  {
    id: 23,
    type: 'subitem',
    activity: 'Machinery',
    qty: 30,
    rate: 191,
    operations: '70%',
    cumulativeValues: 191551,
    color: 'green',
    dailyMetrics: {
      '01': { primary: 70, secondary: 20, tertiary: -55 },
      '02': { primary: 70, secondary: 20, tertiary: -55 },
      '03': { primary: 70, secondary: 20, tertiary: -55 },
      '04': { primary: 70, secondary: 20, tertiary: -55 },
      '05': { primary: 70, secondary: 20, tertiary: -55 },
      '06': { primary: 70, secondary: 20, tertiary: -55 },
      '07': { primary: 70, secondary: 20, tertiary: -55 }
    },
    category: 'plant'
  },
  {
    id: 3,
    type: 'header',
    activity: 'Office',
    qty: 30,
    rate: 191,
    operations: '70%',
    cumulativeValues: 191551,
    dailyValues: {
      '01': '₹10.5 L',
      '02': '₹10.5 L',
      '03': '₹10.5 L',
      '04': '₹10.5 L',
      '05': '₹10.5 L',
      '06': '₹10.5 L',
      '07': '₹10.5 L',
    },
    category: 'business'
  },
  {
    id: 31,
    type: 'subitem',
    activity: 'Methods',
    qty: 30,
    rate: 191,
    operations: '191551',
    cumulativeValues: 191551,
    color: 'green',
    verticalMetrics: {
      '01': { primary: 70, secondary: 20, tertiary: -55 },
      '02': { primary: 70, secondary: 20, tertiary: -55 },
      '03': { primary: 70, secondary: 20, tertiary: -55 },
      '04': { primary: 70, secondary: 20, tertiary: -55 },
      '05': { primary: 70, secondary: 20, tertiary: -55 },
      '06': { primary: 70, secondary: 20, tertiary: -55 },
      '07': { primary: 70, secondary: 20, tertiary: -55 }
    },
    category: 'business'
  },
  {
    id: 32,
    type: 'subitem',
    activity: 'Monetary',
    qty: 30,
    rate: 191,
    operations: '191551',
    cumulativeValues: 191551,
    color: 'green',
    verticalMetrics: {
      '01': { primary: 70, secondary: 20, tertiary: -55 },
      '02': { primary: 70, secondary: 20, tertiary: -55 },
      '03': { primary: 70, secondary: 20, tertiary: -55 },
      '04': { primary: 70, secondary: 20, tertiary: -55 },
      '05': { primary: 70, secondary: 20, tertiary: -55 },
      '06': { primary: 70, secondary: 20, tertiary: -55 },
      '07': { primary: 70, secondary: 20, tertiary: -55 }
    },
    category: 'business'
  },
  {
    id: 33,
    type: 'subitem',
    activity: 'Management',
    qty: 30,
    rate: 191,
    operations: '191551',
    cumulativeValues: 191551,
    color: 'green',
    verticalMetrics: {
      '01': { primary: 70, secondary: 20, tertiary: -55 },
      '02': { primary: 70, secondary: 20, tertiary: -55 },
      '03': { primary: 70, secondary: 20, tertiary: -55 },
      '04': { primary: 70, secondary: 20, tertiary: -55 },
      '05': { primary: 70, secondary: 20, tertiary: -55 },
      '06': { primary: 70, secondary: 20, tertiary: -55 },
      '07': { primary: 70, secondary: 20, tertiary: -55 }
    },
    category: 'business'
  },
];

const ProductionProgressTable: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('Dec 2022');
  const [selectedTab, setSelectedTab] = useState<'Highlights' | 'Project' | 'Plant' | 'Business'>('Highlights');
  const days = ['01', '02', '03', '04', '05', '06', '07'];
  const [openFullscreen, setOpenFullscreen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const filteredData = productionTableData.filter(row => {
    if (!row.category) return false;
    if (selectedTab === 'Highlights') return true;
    if (selectedTab === 'Project') return row.category === 'project';
    if (selectedTab === 'Plant') return row.category === 'plant';
    if (selectedTab === 'Business') return row.category === 'business';
    return true;
  });

  const handleOpenFullscreen = () => {
    setOpenFullscreen(true);
  };

  const handleCloseFullscreen = () => {
    setOpenFullscreen(false);
  };

  const getBorderColor = (activity: string) => {
    switch (activity) {
      case 'Project Cycle': return '#2563eb';
      case 'Plant': return '#f97316';
      case 'Office': return '#22c55e';
      default: return 'transparent';
    }
  };

  // Group items by their parent header
  const groupedItems: Record<number, ProductionTableRow[]> = {};
  filteredData.forEach(row => {
    const parentId = Math.floor(row.id / 10);
    if (!groupedItems[parentId]) {
      groupedItems[parentId] = [];
    }
    groupedItems[parentId].push(row);
  });

  const renderTable = () => (
    <TableContainer component={Paper} sx={{ boxShadow: 'none', bgcolor: openFullscreen ? '#fff' : '#E7EBF0' }}>
      <Table sx={{ minWidth: 650 }} size="small">
        <TableHead>
          <TableRow>
           
            <TableCell sx={{ 
              fontWeight: 600, 
              color: '#1e293b',
              fontFamily: 'Inter, sans-serif',
              fontSize: '13px',
              lineHeight: '14.52px'
            }}>Sr. no.</TableCell>
            <TableCell sx={{ 
              fontWeight: 600, 
              color: '#1e293b',
              fontFamily: 'Inter, sans-serif',
              fontSize: '13px',
              lineHeight: '14.52px'
            }}>Activity</TableCell>
            <TableCell sx={{ 
              fontWeight: 600, 
              color: '#1e293b',
              fontFamily: 'Inter, sans-serif',
              fontSize: '13px',
              lineHeight: '14.52px'
            }}>Qty.</TableCell>
            <TableCell sx={{ 
              fontWeight: 600, 
              color: '#1e293b',
              fontFamily: 'Inter, sans-serif',
              fontSize: '13px',
              lineHeight: '14.52px'
            }}>Rate</TableCell>
            <TableCell sx={{ 
              fontWeight: 600, 
              color: '#1e293b',
              fontFamily: 'Inter, sans-serif',
              fontSize: '13px',
              lineHeight: '14.52px'
            }}>1° 2° 3° Operations</TableCell>
            <TableCell sx={{ 
              fontWeight: 600, 
              color: '#1e293b',
              fontFamily: 'Inter, sans-serif',
              fontSize: '13px',
              lineHeight: '14.52px'
            }}>Cumulative Values</TableCell>
            <TableCell align="center" sx={{ fontWeight: 600, color: '#1e293b' }}>Mon</TableCell>
            <TableCell align="center" sx={{ fontWeight: 600, color: '#1e293b' }}>Tue</TableCell>
            <TableCell align="center" sx={{ fontWeight: 600, color: '#1e293b', bgcolor: 'transparent' }}>Wed</TableCell>
            <TableCell align="center" sx={{ fontWeight: 600, color: '#1e293b' }}>Thu</TableCell>
            <TableCell align="center" sx={{ fontWeight: 600, color: '#1e293b' }}>Fri</TableCell>
            <TableCell align="center" sx={{ fontWeight: 600, color: '#1e293b' }}>Sat</TableCell>
            <TableCell align="center" sx={{ fontWeight: 600, color: '#1e293b' }}>Sun</TableCell>
          </TableRow>
          <TableRow>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell align="center" sx={{ color: '#64748b', fontSize:'11px'}}>01</TableCell>
            <TableCell align="center" sx={{ color: '#64748b', fontSize:'11px'}}>02</TableCell>
            <TableCell align="center" sx={{ color: '#64748b', bgcolor: '#f1f5f9', fontSize:'11px' }}>03</TableCell>
            <TableCell align="center" sx={{ color: '#64748b', fontSize:'11px'}}>04</TableCell>
            <TableCell align="center" sx={{ color: '#64748b', fontSize:'11px'}}>05</TableCell>
            <TableCell align="center" sx={{ color: '#64748b', fontSize:'11px'}}>06</TableCell>
            <TableCell align="center" sx={{ color: '#64748b', fontSize:'11px'}}>07</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.map((row) => {
            const isHeader = row.type === 'header';
            const borderColor = getBorderColor(row.activity);
            
            // Find all subitems with the same parent
            const parentId = Math.floor(row.id / 10);
            const siblings = groupedItems[parentId]?.filter(r => r.type === 'subitem') || [];
            const subItemIndex = siblings.findIndex(r => r.id === row.id);
            const subItemLabel = String.fromCharCode(97 + subItemIndex); // 97 is 'a' in ASCII
            
            return (
              <TableRow
                key={row.id}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  borderBottom: isHeader ? `2px solid ${borderColor}` : 'none',
                  bgcolor: 'transparent',
                }}
              >
                <TableCell>
                  {isHeader ? (
                    <Typography sx={{ color: '#1e293b', fontWeight: 600 ,fontFamily: 'Inter, sans-serif',
                      fontSize: '12px',
                      lineHeight: '14.52px'}}>{row.id}</Typography>
                  ) : (
                    <Typography sx={{ fontSize: '12px',
                      fontFamily: 'Inter, sans-serif',
                      lineHeight: '14.52px',
                      color: '#64748b' }}>
                      {parentId}{subItemLabel}
                    </Typography>
                  )}
                </TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      color: isHeader ? '#1e293b' : '#64748b',
                      fontWeight: isHeader ? 600 : 400,
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '14px',
                      lineHeight: '14.52px',
                    }}
                  >
                    {row.activity}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{ color: '#1e293b', 
                    fontWeight: 500, 
                    fontSize: '12px',
                    fontFamily: 'Inter, sans-serif',
                    lineHeight: '14.52px'}}>
                    {row.qty}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{ color: '#1e293b', fontWeight: 500, fontSize: 11}}>
                    {row.rate}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{ color: '#1e293b', fontWeight: 500, fontSize: 11}}>
                    {row.operations}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{ color: '#1e293b', fontWeight: 500, fontSize: 11}}>
                    {row.cumulativeValues}
                  </Typography>
                </TableCell>
                <TableCell colSpan={7} sx={{ py: 1 }}>
                  {!isHeader && row.progress && (
                    <ProgressBarTable segments={row.progress.segments} />
                  )}
                  {!isHeader && row.dailyMetrics && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      {days.map((day) => (
                        <Box key={day} sx={{ width: '20%' }}>
                          {row.dailyMetrics?.[day] && (
                            <MultiProgressBar
                              metrics={row.dailyMetrics[day]}
                              showSeparate={true}
                              height={3}
                            />
                          )}
                        </Box>
                      ))}
                    </Box>
                  )}
                  {!isHeader && row.verticalMetrics && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      {days.map((day) => (
                        <Box key={day} sx={{ width: '20%' }}>
                          {row.verticalMetrics?.[day] && (
                            <VerticalProgressBar
                              metrics={row.verticalMetrics[day]}
                              height={4}
                              width={60}
                            />
                          )}
                        </Box>
                      ))}
                    </Box>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <>
      <Card sx={{ 
        bgcolor: '#E7EBF0', 
        borderRadius: 2, 
        boxShadow: `
          4px 4px 20px 0px #6F8CB069,
          -6px -6px 20px 0px #FFFFFF,
          2px 2px 4px 0px #728EAB1A
        `, 
        p: 2 
      }}>
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3,
              overflowX: { xs: 'auto', sm: 'visible' },
              flexWrap: { xs: 'nowrap', sm: 'nowrap' },
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': { display: 'none' },
            }}
          >
            {/* Left section with heading and tabs */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                flexShrink: 0,
              }}
            >
             <Typography 
  variant="h3" 
  component="h2" 
  sx={{ 
    color: '#1e293b', 
    fontWeight: 600,
    cursor: 'pointer',
    textDecoration: selectedTab === 'Highlights' ? 'underline' : 'none',
    whiteSpace: 'nowrap',
    flexShrink: 0,
  }}
  onClick={() => setSelectedTab('Highlights')}
>
  Highlights
</Typography>
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  overflowX: 'auto',
                  scrollbarWidth: 'none',
                  '&::-webkit-scrollbar': { display: 'none' },
                }}
              >
                {['Project', 'Plant', 'Business'].map((tab) => (
                  <Typography
                    key={tab}
                    onClick={() => setSelectedTab(tab as 'Project' | 'Plant' | 'Business')}
                    sx={{
                      flexShrink: 0,
                      whiteSpace: 'nowrap',
                      color: selectedTab === tab ? '#1e293b' : '#64748b',
                      cursor: 'pointer',
                      fontWeight: selectedTab === tab ? 600 : 400,
                    }}
                  >
                    {tab}
                  </Typography>
                ))}
              </Box>
            </Box>
          
            {/* Right-side icons */}
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                alignItems: 'center',
                flexShrink: 0,
              }}
            >
              <Paper
                component="form"
                sx={{
                  p: '2px 4px',
                  display: 'flex',
                  alignItems: 'center',
                  width: 200,
                  bgcolor: '#E7EBF0',
                  boxShadow: '4px 4px 20px 0px #6F8CB069, -6px -6px 20px 0px #FFFFFF, 2px 2px 4px 0px #728EAB1A',
                  borderRadius: 2,
                }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1, fontSize: '14px' }}
                  placeholder="Search anything"
                  inputProps={{ 'aria-label': 'search anything' }}
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                  <SearchIcon fontSize="small" />
                </IconButton>
              </Paper>
              <IconButton size="small" aria-label="Export">
                <FileUploadIcon />
              </IconButton>
              <Select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                size="small"
                sx={{
                  minWidth: 120,
                  bgcolor: '#E7EBF0',
                  boxShadow: '4px 4px 20px 0px #6F8CB069, -6px -6px 20px 0px #FFFFFF, 2px 2px 4px 0px #728EAB1A',
                  flexShrink: 0,
                  borderRadius: 2,
                }}
                renderValue={(value) => (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CalendarMonthIcon sx={{ fontSize: '16px', color: '#0f172a' }} />
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
              
              <IconButton size="small">
                <MoreVertIcon />
              </IconButton>
              <IconButton size="small" onClick={handleOpenFullscreen}>
                <FullscreenIcon />
              </IconButton>
            </Box>
          </Box>

          {renderTable()}
        </CardContent>
      </Card>

      {/* Fullscreen Dialog */}
      <Dialog
        fullScreen={fullScreen}
        open={openFullscreen}
        onClose={handleCloseFullscreen}
        maxWidth="xl"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            bgcolor: '#E7EBF0',
            p: 2,
          },
        }}
      >
        <DialogTitle sx={{ p: 0 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <Typography 
                variant="h3" 
                component="h2" 
                sx={{ 
                  color: '#1e293b', 
                  fontWeight: 600,
                }}
              >
                Highlights
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                {['Project', 'Plant', 'Business'].map((tab) => (
                  <Typography
                    key={tab}
                    sx={{
                      color: selectedTab === tab ? '#1e293b' : '#64748b',
                      fontWeight: selectedTab === tab ? 600 : 400,
                    }}
                  >
                    {tab}
                  </Typography>
                ))}
              </Box>
            </Box>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <IconButton onClick={handleCloseFullscreen}>
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          {renderTable()}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductionProgressTable;