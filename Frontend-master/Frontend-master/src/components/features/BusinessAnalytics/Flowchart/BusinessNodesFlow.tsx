import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  useTheme, 
  IconButton,
  Card,
  CardContent,
  Select,
  MenuItem,
  InputBase,
  Tabs,
  Tab,
  useMediaQuery,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogContent,
  Tooltip
} from '@mui/material';
import {
  Fullscreen,
  DateRange,
  MoreVert,
  Search,
  FileDownload
} from '@mui/icons-material';

interface TreeNodeProps {
  title: string;
  value: string;
  budget: string;
  actual: string;
  children?: React.ReactNode;
  level?: number;
}

const TreeNode: React.FC<TreeNodeProps> = ({ 
  title, 
  value, 
  budget, 
  actual, 
  children,
  level = 0 
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isOverBudget = parseFloat(actual.replace('L', '')) > parseFloat(budget.replace('L', ''));
  
  // Format the value to ensure proper display
  const formatValue = (val: string) => {
    if (val.includes('.')) {
      const [whole, decimal] = val.split('.');
      return (
        <>
          {whole}.<span style={{ fontSize: '0.8em' }}>{decimal.replace('L', '')}L</span>
        </>
      );
    }
    return val;
  };

  return (
    <Box sx={{ 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      my: 0.5
    }}>
      {/* Vertical connector line above the node */}
      {level > 0 && (
        <Box sx={{
          position: 'absolute',
          top: -15,
          left: '50%',
          transform: 'translateX(-50%)',
          height: 15,
          width: 2,
          backgroundColor: theme.palette.divider
        }} />
      )}

      <Tooltip title={`${title}: ${value} (Budget: ${budget}, Actual: ${actual})`}>
        <Paper
          elevation={level === 0 ? 3 : 1}
          sx={{
            borderLeft: `3px solid ${isOverBudget ? theme.palette.error.main : theme.palette.success.main}`,
            borderRadius: '4px',
            p: isMobile ? 1 : 1.5,
            width: isMobile ? 100 : isTablet ? 120 : 140,
            height: isMobile ? 80 : 100,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: theme.palette.background.paper,
            zIndex: 2,
          }}
        >
          <Typography 
            variant="subtitle2" 
            fontWeight={600}
            sx={{ 
              fontSize: isMobile ? '0.65rem' : '0.75rem',
              lineHeight: 1.2,
              mb: 0.3,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              width: '100%',
              textAlign: 'center'
            }}
          >
            {title}
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              fontSize: isMobile ? '0.85rem' : '1rem',
              fontWeight: 500,
              my: 0.5,
              textAlign: 'center',
              lineHeight: 1.1
            }}
          >
            {formatValue(value)}
          </Typography>
          <Box sx={{ 
            display: 'flex',
            justifyContent: 'space-between',
            mt: 'auto',
            gap: 0.5
          }}>
            <Box sx={{ flex: 1 }}>
              <Typography variant="caption" sx={{ fontSize: isMobile ? '0.55rem' : '0.6rem', display: 'block' }}>Budget</Typography>
              <Typography variant="body2" sx={{ fontSize: isMobile ? '0.65rem' : '0.75rem' }}>{budget}</Typography>
            </Box>
            <Box sx={{ flex: 1, textAlign: 'right' }}>
              <Typography variant="caption" sx={{ fontSize: isMobile ? '0.55rem' : '0.6rem', display: 'block' }}>Actual</Typography>
              <Typography variant="body2" sx={{ fontSize: isMobile ? '0.65rem' : '0.75rem' }}>{actual}</Typography>
            </Box>
          </Box>
        </Paper>
      </Tooltip>

      {children && (
        <Box sx={{ 
          position: 'relative',
          mt: 2,
          '&:before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            height: '15px',
            width: '2px',
            backgroundColor: theme.palette.divider
          }
        }}>
          <Box sx={{ 
            display: 'flex',
            justifyContent: 'center',
            gap: isMobile ? 1 : isTablet ? 1.5 : 2,
            position: 'relative',
            '&:before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '2px',
              backgroundColor: theme.palette.divider
            }
          }}>
            {React.Children.map(children, (child, index) => (
              <Box key={index} sx={{ position: 'relative' }}>
                {index > 0 && (
                  <Box sx={{
                    position: 'absolute',
                    top: 0,
                    left: '-50%',
                    width: '100%',
                    height: '2px',
                    backgroundColor: theme.palette.divider
                  }} />
                )}
                {child}
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

const PerformanceTree: React.FC = () => {
  const theme = useTheme();
  const [selectedDate, setSelectedDate] = React.useState('May 2023');
  const [activeTab, setActiveTab] = React.useState(0);
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
  setActiveTab(newValue);
};


  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Table data for both Cost and Sales tabs
  const tableData = [
    { id: 1, project: 'Project/ client', actual: 91203, budget: 91203, variance: 91203, variancePercent: '-1.2% @' },
    { id: 2, project: 'Project/ client', actual: 91203, budget: 91203, variance: 91203, variancePercent: '-0.5% @' },
    { id: 3, project: 'Project/ client', actual: 91203, budget: 91203, variance: 91203, variancePercent: '-1.2% @' },
    { id: 4, project: 'Project/ client', actual: 91203, budget: 91203, variance: 91203, variancePercent: '-0.5% @' },
  ];

  const renderContent = () => (
    <>
      {activeTab === 0 && (
        /* Highlights tab content */
        <>
          <Box sx={{ 
            display: 'flex',
            justifyContent: 'center',
            mt: 1
          }}>
            <TreeNode 
              title="Profit" 
              value="1.13L" 
              budget="1L" 
              actual="1.13L"
              level={0}
            >
              <TreeNode 
                title="Total Sales" 
                value="1.13L" 
                budget="1L" 
                actual="1.13L"
                level={1}
              />
              <TreeNode 
                title="Total Cost" 
                value="1.13L" 
                budget="1L" 
                actual="1.13L"
                level={1}
              />
            </TreeNode>
          </Box>

          {/* Second Level Tree */}
          <Box sx={{ 
            display: 'flex',
            justifyContent: 'center',
            mt: 4,
            gap: isMobile ? 1 : isTablet ? 2 : 4,
            flexWrap: 'wrap'
          }}>
            <TreeNode 
              title="Fabrication Total" 
              value="1.13L" 
              budget="1L" 
              actual="1.13L"
              level={1}
            />
            <TreeNode 
              title="Galva Total" 
              value="1.13L" 
              budget="1L" 
              actual="1.13L"
              level={1}
            />
            <TreeNode 
              title="Scarp" 
              value="1.13L" 
              budget="1L" 
              actual="1.13L"
              level={1}
            />
            <TreeNode 
              title="Critical cost parameter" 
              value="1.13L" 
              budget="1L" 
              actual="1.13L"
              level={1}
            />
            <TreeNode 
              title="Manpower cost" 
              value="1.13L" 
              budget="1L" 
              actual="1.13L"
              level={1}
            />
            <TreeNode 
              title="Spare consumable and waste disposal" 
              value="1.13L" 
              budget="1L" 
              actual="1.13L"
              level={1}
            />
          </Box>

          {/* Third Level Tree */}
          <Box sx={{ 
            display: 'flex',
            justifyContent: 'center',
            mt: 4,
            gap: isMobile ? 1 : isTablet ? 2 : 4,
            flexWrap: 'wrap'
          }}>
            <TreeNode 
              title="Wage Rate" 
              value="1.13L" 
              budget="1L" 
              actual="1.13L"
              level={1}
            />
            <TreeNode 
              title="Labour Efficiency" 
              value="1.13L" 
              budget="1L" 
              actual="1.13L"
              level={1}
            />
            <TreeNode 
              title="Materials Price" 
              value="1.13L" 
              budget="1L" 
              actual="1.13L"
              level={1}
            />
            <TreeNode 
              title="Materials Usage" 
              value="1.13L" 
              budget="1L" 
              actual="1.13L"
              level={1}
            />
          </Box>

          {/* Legend */}
          <Box sx={{ 
            mt: 2,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: isMobile ? 1 : 2,
            flexWrap: 'wrap'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Box sx={{ 
                width: 10, 
                height: 10, 
                backgroundColor: theme.palette.success.main,
                borderRadius: '2px'
              }} />
              <Typography variant="caption" sx={{ fontSize: isMobile ? '0.6rem' : '0.7rem' }}>Within Budget</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Box sx={{ 
                width: 10, 
                height: 10, 
                backgroundColor: theme.palette.error.main,
                borderRadius: '2px'
              }} />
              <Typography variant="caption" sx={{ fontSize: isMobile ? '0.6rem' : '0.7rem' }}>Over Budget</Typography>
            </Box>
          </Box>
        </>
      )}

      {(activeTab === 1 || activeTab === 2) && (
        /* Cost and Sales tab content - Same Table view */
        <TableContainer component={Paper} sx={{ 
          bgcolor: '#E7EBF0',
          boxShadow: '4px 4px 20px 0px #6F8CB069, -6px -6px 20px 0px #FFFFFF, 2px 2px 4px 0px #728EAB1A',
          borderRadius: 2,
          mt: 2,
          maxWidth: '100%',
          overflowX: 'auto'
        }}>
          <Table sx={{ minWidth: isMobile ? 600 : 'unset' }}>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}>Sr. no.</TableCell>
                <TableCell sx={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}>Project/ client</TableCell>
                <TableCell sx={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}>Actual</TableCell>
                <TableCell sx={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}>Budget</TableCell>
                <TableCell sx={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}>Variance</TableCell>
                <TableCell sx={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}>Variance in %</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell sx={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}>{row.id}</TableCell>
                  <TableCell sx={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}>{row.project}</TableCell>
                  <TableCell sx={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}>{row.actual.toLocaleString()}</TableCell>
                  <TableCell sx={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}>{row.budget.toLocaleString()}</TableCell>
                  <TableCell sx={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}>{row.variance.toLocaleString()}</TableCell>
                  <TableCell sx={{ 
                    fontSize: isMobile ? '0.75rem' : '0.875rem',
                    color: theme.palette.error.main
                  }}>
                    {row.variancePercent}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
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
        p: isMobile ? 1 : 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <CardContent sx={{ flexGrow: 1 }}>
          {/* Header with Tabs and Search/Date/Icons */}
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
            mb: 3
          }}>
            {/* Tabs Section */}
            <Box 
              display="flex" 
              alignItems="center" 
              overflow="auto" 
              sx={{ 
                flex: isMobile ? '1 1 100%' : '0 1 auto',
                order: isMobile ? 2 : 1
              }}
            >
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                textColor="primary"
                indicatorColor="primary"
                variant={isMobile ? 'scrollable' : 'standard'}
                scrollButtons="auto"
                sx={{ minHeight: 'unset' }}
              >
                <Tab 
                  label="Highlights" 
                  sx={{ 
                    textTransform: 'none', 
                    fontSize: isMobile ? '0.875rem' : '1.25rem',
                    fontWeight: 'bold',
                    minWidth: 'unset',
                    px: isMobile ? 1 : 2
                  }} 
                />
                <Tab 
                  label="Cost" 
                  sx={{ 
                    textTransform: 'none',
                    fontSize: isMobile ? '0.875rem' : '1.20rem',
                    minWidth: 'unset',
                    px: isMobile ? 1 : 2
                  }} 
                />
                <Tab 
                  label="Sales" 
                  sx={{ 
                    textTransform: 'none',
                    fontSize: isMobile ? '0.875rem' : '1.20rem',
                    minWidth: 'unset',
                    px: isMobile ? 1 : 2
                  }} 
                />
              </Tabs>
            </Box>

            {/* Search and Icons Section */}
            <Box 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1,
                flex: '0 1 auto',
                order: isMobile ? 1 : 2
              }}
            >
              {/* Search Field - Hidden on mobile */}
              {!isMobile && (
                <Paper
                  component="form"
                  sx={{
                    p: '2px 4px',
                    display: 'flex',
                    alignItems: 'center',
                    width: isTablet ? 160 : 200,
                    bgcolor: '#E7EBF0',
                    boxShadow: '4px 4px 20px 0px #6F8CB069, -6px -6px 20px 0px #FFFFFF, 2px 2px 4px 0px #728EAB1A',
                    borderRadius: 2,
                  }}
                >
                  <InputBase
                    sx={{ ml: 1, flex: 1, fontSize: '14px' }}
                    placeholder="Search..."
                    inputProps={{ 'aria-label': 'search anything' }}
                  />
                  <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                    <Search fontSize="small" />
                  </IconButton>
                </Paper>
              )}

              {/* Export Icon */}
              <IconButton size="small" aria-label="Export">
                <FileDownload fontSize={isMobile ? 'small' : 'medium'} />
              </IconButton>
              
              {/* Date Selector */}
              <Select
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                size="small"
                sx={{
                  minWidth: isMobile ? 90 : 120,
                  bgcolor: '#E7EBF0',
                  boxShadow: '4px 4px 20px 0px #6F8CB069, -6px -6px 20px 0px #FFFFFF, 2px 2px 4px 0px #728EAB1A',
                  borderRadius: 2,
                  '& .MuiSelect-select': {
                    padding: isMobile ? '8px 20px 8px 8px' : '8px 24px 8px 12px',
                    fontSize: isMobile ? '0.75rem' : '0.875rem'
                  }
                }}
                renderValue={(value) => (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <DateRange sx={{ fontSize: isMobile ? '14px' : '16px', color: '#0f172a' }} />
                    {!isMobile && <Typography sx={{ color: '#0f172a', fontSize: isMobile ? '0.75rem' : '0.875rem' }}>{value}</Typography>}
                  </Box>
                )}
              >
                <MenuItem value="Apr 2023" sx={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}>Apr 2023</MenuItem>
                <MenuItem value="May 2023" sx={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}>May 2023</MenuItem>
                <MenuItem value="Jun 2023" sx={{ fontSize: isMobile ? '0.75rem' : '0.875rem' }}>Jun 2023</MenuItem>
              </Select>
              
              <IconButton size="small">
                <MoreVert fontSize={isMobile ? 'small' : 'medium'} />
              </IconButton>
              
              <IconButton size="small" onClick={toggleFullscreen}>
                <Fullscreen fontSize={isMobile ? 'small' : 'medium'} />
              </IconButton>
            </Box>
          </Box>

          {renderContent()}
        </CardContent>
      </Card>

      {/* Fullscreen Dialog */}
      <Dialog
        open={isFullscreen}
        onClose={toggleFullscreen}
        fullWidth
        maxWidth="lg"
        fullScreen={isMobile}
      >
        <DialogContent sx={{ 
          height: isMobile ? '100%' : '80vh',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: '#E7EBF0',
          p: isMobile ? 1 : 3
        }}>
          <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
            {renderContent()}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PerformanceTree;