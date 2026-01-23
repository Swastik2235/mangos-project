import { useState } from 'react';
import React from 'react';
import {
  Box,
  Typography,
  Select,
  MenuItem,
  IconButton,
  InputBase,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const HeaderSection = ({ selectedTab, setSelectedTab }: { selectedTab: string; setSelectedTab: (tab: string) => void }) => {
  const [selectedDate, setSelectedDate] = useState('Dec 2022');
  const tabs = ['Highlights', 'ROE', 'ROA', 'ROI', 'ROTA', 'ROCE', 'ZScore'];
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const isXSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: isSmallScreen ? 'column' : 'row',
        justifyContent: 'space-between',
        alignItems: isSmallScreen ? 'flex-start' : 'center',
        p: isXSmallScreen ? 1 : 2,
        borderRadius: 3,
        bgcolor: '#E7EBF0',
        boxShadow: '4px 4px 20px 0px #6F8CB069, -6px -6px 20px 0px #FFFFFF, 2px 2px 4px 0px #728EAB1A',
        gap: isSmallScreen ? 2 : 0,
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: isXSmallScreen ? 0.5 : isSmallScreen ? 1 : 3,
        overflowX: isSmallScreen ? 'auto' : 'visible',
        width: isSmallScreen ? '100%' : 'auto',
        pb: isSmallScreen ? 1 : 0,
        scrollbarWidth: 'none',
        '&::-webkit-scrollbar': {
          display: 'none'
        }
      }}>
        {tabs.map((tab) => (
          <Typography
            key={tab}
            onClick={() => setSelectedTab(tab)}
            sx={{
              fontWeight: selectedTab === tab ? 700 : 400,
              color: '#1e293b',
              cursor: 'pointer',
              borderBottom: selectedTab === tab ? '2px solid #1e293b' : 'none',
              pb: 0.5,
              whiteSpace: 'nowrap',
              fontSize: isXSmallScreen ? '0.75rem' : isSmallScreen ? '0.875rem' : '1rem',
              px: isXSmallScreen ? 0.5 : 1,
            }}
          >
            {tab}
          </Typography>
        ))}
      </Box>

      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: isXSmallScreen ? 1 : 2,
        width: isSmallScreen ? '100%' : 'auto',
        mt: isSmallScreen ? 1 : 0,
      }}>
        {!isSmallScreen && (
          <Paper
            component="form"
            sx={{
              p: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              borderRadius: 2,
              bgcolor: '#E7EBF0',
              boxShadow: 'inset 4px 4px 8px #d9dce1, inset -4px -4px 8px #ffffff',
              flex: 1,
              minWidth: 200,
            }}
          >
            <SearchIcon sx={{ ml: 1, mr: 1, color: '#64748b' }} />
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search anything..."
              inputProps={{ 'aria-label': 'search anything' }}
            />
          </Paper>
        )}

        <Select
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          size="small"
          sx={{
            bgcolor: '#E7EBF0',
            px: isXSmallScreen ? 1 : 2,
            py: 1,
            borderRadius: 2,
            boxShadow: 'inset 4px 4px 8px #E7EBF0, inset -4px -4px 8px #E7EBF0',
            minWidth: isXSmallScreen ? '100px' : '120px',
            fontSize: isXSmallScreen ? '0.75rem' : '0.875rem',
          }}
          IconComponent={CalendarMonthIcon}
        >
          <MenuItem value="Dec 2022">Dec 2022</MenuItem>
        </Select>

        <IconButton size={isXSmallScreen ? 'small' : 'medium'}>
          <MoreVertIcon fontSize={isXSmallScreen ? 'small' : 'medium'} />
        </IconButton>
        <IconButton size={isXSmallScreen ? 'small' : 'medium'}>
          <FullscreenIcon fontSize={isXSmallScreen ? 'small' : 'medium'} />
        </IconButton>
      </Box>
    </Box>
  );
};

const TreeNode: React.FC<{
  title: string;
  formula?: string;
  value: string;
  change: string;
  level?: number;
  children?: React.ReactNode;
}> = ({ title, formula, value, change, level = 0, children }) => {
  const isPositive = change.startsWith('+');
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isXSmallScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const levelPadding = isXSmallScreen ? level * 6 : isSmallScreen ? level * 8 : level * 16;

  return (
    <Box sx={{ 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      my: 0.5,
      pl: `${levelPadding}px`
    }}>
      <Paper
        elevation={level === 0 ? 3 : 1}
        sx={{
          borderLeft: `3px solid ${isPositive ? '#10B981' : '#EF4444'}`,
          borderRadius: '4px',
          p: 1,
          width: isXSmallScreen ? 120 : isSmallScreen ? 140 : 180,
          minHeight: isXSmallScreen ? 60 : isSmallScreen ? 70 : 80,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#fff',
          zIndex: 2,
        }}
      >
        <Typography 
          variant="subtitle2" 
          fontWeight={600}
          sx={{ 
            fontSize: isXSmallScreen ? '0.6rem' : isSmallScreen ? '0.7rem' : '0.75rem',
            lineHeight: 1.2,
            mb: 0.3 
          }}
        >
          {title}
        </Typography>
        {formula && (
          <Typography variant="caption" sx={{ 
            fontSize: isXSmallScreen ? '0.5rem' : isSmallScreen ? '0.55rem' : '0.6rem', 
            color: '#64748b' 
          }}>
            {formula}
          </Typography>
        )}
        <Box sx={{ 
          display: 'flex',
          justifyContent: 'space-between',
          mt: 'auto'
        }}>
          <Typography variant="body2" sx={{ 
            fontSize: isXSmallScreen ? '0.65rem' : isSmallScreen ? '0.75rem' : '0.85rem', 
            fontWeight: 'bold' 
          }}>
            {value}
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              fontSize: isXSmallScreen ? '0.65rem' : isSmallScreen ? '0.75rem' : '0.85rem',
              fontWeight: 'bold',
              color: isPositive ? '#10B981' : '#EF4444'
            }}
          >
            {change}
          </Typography>
        </Box>
      </Paper>

      {children && (
        <Box sx={{ 
          position: 'relative',
          mt: isXSmallScreen ? 1 : 2,
          '&:before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            height: isXSmallScreen ? '10px' : '15px',
            width: '1.5px',
            backgroundColor: '#E7EBF0'
          }
        }}>
          <Box sx={{ 
            display: 'flex',
            flexDirection: isSmallScreen ? 'column' : 'row',
            justifyContent: 'center',
            gap: isXSmallScreen ? 1 : 2,
            position: 'relative',
            '&:before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: isSmallScreen ? 0 : '1.5px',
              width: isSmallScreen ? '1.5px' : 'auto',
              backgroundColor: '#E7EBF0'
            }
          }}>
            {React.Children.map(children, (child, index) => (
              <Box key={index} sx={{ position: 'relative' }}>
                {index > 0 && isSmallScreen && (
                  <Box sx={{
                    position: 'absolute',
                    top: isXSmallScreen ? '-10px' : '-15px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '1.5px',
                    height: isXSmallScreen ? '10px' : '15px',
                    backgroundColor: '#E7EBF0'
                  }} />
                )}
                {!isSmallScreen && index > 0 && (
                  <Box sx={{
                    position: 'absolute',
                    top: 0,
                    left: '-50%',
                    width: '100%',
                    height: '1.5px',
                    backgroundColor: '#E7EBF0'
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

const MetricCard = ({
  title,
  subtitle,
  value,
  change,
  isMainMetric = false
}: {
  title: string;
  subtitle?: string;
  value: string;
  change: string;
  isMainMetric?: boolean;
}) => {
  const isPositive = change.startsWith('+');
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isXSmallScreen = useMediaQuery(theme.breakpoints.down('xs'));
  
  return (
    <Paper sx={{
      p: isXSmallScreen ? 1 : 2,
      minWidth: isXSmallScreen ? 140 : isSmallScreen ? 160 : 180,
      borderRadius: 2,
      boxShadow: isMainMetric 
        ? '0px 4px 12px rgba(0, 0, 0, 0.1)' 
        : '0px 2px 4px rgba(0, 0, 0, 0.05)',
      borderLeft: `4px solid ${isPositive ? '#10B981' : '#EF4444'}`,
      backgroundColor: 'white',
      position: 'relative',
      zIndex: 3
    }}>
      <Typography variant="subtitle2" sx={{
        fontWeight: 600,
        color: '#1E293B',
        fontSize: isXSmallScreen ? '0.7rem' : isSmallScreen ? '0.8rem' : '0.875rem',
        mb: subtitle ? 0.5 : 1
      }}>
        {title}
      </Typography>
      
      {subtitle && (
        <Typography variant="caption" sx={{
          color: '#64748B',
          fontSize: isXSmallScreen ? '0.55rem' : isSmallScreen ? '0.65rem' : '0.7rem',
          display: 'block',
          mb: 1
        }}>
          {subtitle}
        </Typography>
      )}
      
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
      }}>
        <Typography variant="h6" sx={{
          fontWeight: 700,
          color: '#1E293B',
          fontSize: isXSmallScreen ? '0.9rem' : isSmallScreen ? '1rem' : '1.1rem'
        }}>
          {value}
        </Typography>
        <Typography variant="body2" sx={{
          fontWeight: 600,
          color: isPositive ? '#10B981' : '#EF4444',
          display: 'flex',
          alignItems: 'center',
          fontSize: isXSmallScreen ? '0.75rem' : '0.875rem'
        }}>
          {change}
        </Typography>
      </Box>
    </Paper>
  );
};

const RoiTreeTable = () => {
  return (
    <Box sx={{
      p: 3,
      bgcolor: '#F8FAFC',
      borderRadius: 2,
      boxShadow: '0px 2px 4px rgba(0,0,0,0.1)'
    }}>
      {/* Vertical line connecting all nodes */}
      <Box sx={{
        position: 'absolute',
        left: '50%',
        top: 80,
        bottom: 20,
        width: '2px',
        bgcolor: '#CBD5E1',
        transform: 'translateX(-50%)',
        zIndex: 1
      }} />

      {/* Level 1 - ROI */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <Paper sx={{
          p: 2,
          width: 200,
          textAlign: 'center',
          borderLeft: '4px solid #10B981',
          bgcolor: 'white',
          boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
          position: 'relative',
          zIndex: 2
        }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}> Return on Investment </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>6.2%</Typography>
            <Typography variant="body1" sx={{ color: '#10B981', fontWeight: 'bold' }}>+12%</Typography>
          </Box>
        </Paper>
      </Box>

      {/* Level 2 - Horizontal Connector */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        height: '40px',
        mb: 2
      }}>
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          height: '2px',
          bgcolor: '#CBD5E1',
          zIndex: 1
        }} />
      </Box>

      {/* Level 2 - Asset Turnover and Profit Margin */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        gap: 6,
        mb: 4,
        position: 'relative'
      }}>
        <Paper sx={{
          p: 2,
          width: 180,
          textAlign: 'center',
          borderLeft: '4px solid #10B981',
          bgcolor: 'white',
          boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
          position: 'relative',
          zIndex: 2
        }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Asset Turnover</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Typography variant="body1">6.2%</Typography>
            <Typography variant="body1" sx={{ color: '#10B981' }}> +12% </Typography>
          </Box>
        </Paper>

        <Paper sx={{
          p: 2,
          width: 180,
          textAlign: 'center',
          borderLeft: '4px solid #10B981',
          bgcolor: 'white',
          boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
          position: 'relative',
          zIndex: 2
        }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}> Profit Margin </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Typography variant="body1">6.2%</Typography>
            <Typography variant="body1" sx={{ color: '#10B981' }}>+12%</Typography>
          </Box>
        </Paper>
      </Box>

      {/* Level 3 - Under Asset Turnover */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        gap: 6,
        mb: 4,
        position: 'relative'
      }}>
        <Paper sx={{
          p: 2,
          width: 180,
          textAlign: 'center',
          borderLeft: '4px solid #10B981',
          bgcolor: 'white',
          boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
          position: 'relative',
          zIndex: 2
        }}>
          <Typography variant="subtitle1">Operating Income</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Typography variant="body1">6.2%</Typography>
            <Typography variant="body1" sx={{ color: '#10B981' }}>+12%</Typography>
          </Box>
        </Paper>

        <Paper sx={{
          p: 2,
          width: 180,
          textAlign: 'center',
          borderLeft: '4px solid #10B981',
          bgcolor: 'white',
          boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
          position: 'relative',
          zIndex: 2
        }}>
          <Typography variant="subtitle1">Assets</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Typography variant="body1">6.2%</Typography>
            <Typography variant="body1" sx={{ color: '#10B981' }}>+12%</Typography>
          </Box>
        </Paper>
      </Box>

      {/* Level 3 - Under Profit Margin */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        mb: 4
      }}>
        <Paper sx={{
          p: 2,
          width: 220,
          textAlign: 'center',
          borderLeft: '4px solid #10B981',
          bgcolor: 'white',
          boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
          position: 'relative',
          zIndex: 2
        }}>
          <Typography variant="subtitle1">Earnings before Interest and tax</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Typography variant="body1">6.2%</Typography>
            <Typography variant="body1" sx={{ color: '#10B981' }}>+12%</Typography>
          </Box>
        </Paper>
      </Box>

      {/* Level 4 - Under Assets */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        gap: 6,
        mb: 4
      }}>
        <Paper sx={{
          p: 2,
          width: 160,
          textAlign: 'center',
          borderLeft: '4px solid #10B981',
          bgcolor: 'white',
          boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
          position: 'relative',
          zIndex: 2
        }}>
          <Typography variant="subtitle1"> Fixed Assets </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Typography variant="body1">6.2%</Typography>
            <Typography variant="body1" sx={{ color: '#10B981' }}> +12% </Typography>
          </Box>
        </Paper>

        <Paper sx={{
          p: 2,
          width: 160,
          textAlign: 'center',
          borderLeft: '4px solid #10B981',
          bgcolor: 'white',
          boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
          position: 'relative',
          zIndex: 2
        }}>
          <Typography variant="subtitle1">Current Assets</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Typography variant="body1">6.2%</Typography>
            <Typography variant="body1" sx={{ color: '#10B981' }}>+12%</Typography>
          </Box>
        </Paper>
      </Box>

      {/* Level 5 - Under Current Assets */}
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        gap: 4,
        flexWrap: 'wrap'
      }}>
        {[
          'Cash & Equivalents',
          'Accounts Receivable',
          'Inventory',
          'Other Current Assets'
        ].map((item) => (
          <Paper key={item} sx={{
            p: 2,
            width: 160,
            textAlign: 'center',
            borderLeft: '4px solid #10B981',
            bgcolor: 'white',
            boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
            position: 'relative',
            zIndex: 2
          }}>
            <Typography variant="subtitle1">{item}</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <Typography variant="body1">6.2%</Typography>
              <Typography variant="body1" sx={{ color: '#10B981' }}>+12%</Typography>
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

const RoeTreeTable = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down( 'md' ));
  const isXSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ 
      mt: 4, 
      p: isXSmallScreen ? 1 : 3, 
      borderRadius: 2, 
      bgcolor: '#E7EBF0',
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.05)',
      position: 'relative'
    }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative'
      }}>
        {/* Level 1: Return on Investments (Main Box) */}
        <Box sx={{ 
          position: 'relative', 
          zIndex: 3,
          mb: 2
        }}>
          <MetricCard 
            title="Return on Equity" 
            value="6.2%" 
            change="+1.2%"
            isMainMetric
          />
          
          {/* Vertical connector down from main box */}
          <Box sx={{
            position: 'absolute',
            bottom: -16,
            left: '50%',
            transform: 'translateX(-50%)',
            height: 16,
            width: 2,
            bgcolor: '#94A3B8',
            zIndex: 2
          }} />
        </Box>

        {/* Level 2: Asset Turnover and Profit Margin */}
        <Box sx={{
          display: 'flex',
          flexDirection: isSmallScreen ? 'column' : 'row',
          justifyContent: 'center',
          gap: isXSmallScreen ? 2 : isSmallScreen ? 4 : 6,
          mt: 2,
          position: 'relative',
          width: '100%'
        }}>
          {/* Horizontal connector line */}
          {!isSmallScreen && (
            <Box sx={{
              position: 'absolute',
              top: -8,
              left: '50%',
              transform: 'translateX(-50%)',
              height: 2,
              width: '80%',
              bgcolor: '#E2E8F0',
              zIndex: 1
            }} />
          )}
          
          {/* Asset Turnover Box with perfect connection */}
          <Box sx={{ 
            position: 'relative',
            zIndex: 3 
          }}>
            <MetricCard 
              title="Asset Turnover" 
              value="6.2%" 
              change="+1.2%"
            />
            
            {/* Vertical connector down */}
            <Box sx={{
              position: 'absolute',
              bottom: isSmallScreen ? 'auto' : -16,
              top: isSmallScreen ? '100%' : 'auto',
              left: '50%',
              transform: 'translateX(-50%)',
              height: isSmallScreen ? 16 : 16,
              width: 2,
              bgcolor: '#94A3B8',
              zIndex: 2
            }} />
          </Box>

          {/* Profit Margin Box with perfect connection */}
          <Box sx={{ 
            position: 'relative',
            zIndex: 3 
          }}>
            <MetricCard 
              title="Profit Margin" 
              value="6.2%" 
              change="+1.2%"
            />
            
            {/* Vertical connector down */}
            <Box sx={{
              position: 'absolute',
              bottom: isSmallScreen ? 'auto' : -16,
              top: isSmallScreen ? '100%' : 'auto',
              left: '50%',
              transform: 'translateX(-50%)',
              height: isSmallScreen ? 16 : 16,
              width: 2,
              bgcolor: '#94A3B8',
              zIndex: 2
            }} />
          </Box>
        </Box>

        {/* Level 3: Connected to Asset Turnover */}
        <Box sx={{
          display: 'flex',
          flexDirection: isSmallScreen ? 'column' : 'row',
          justifyContent: 'center',
          gap: isXSmallScreen ? 2 : isSmallScreen ? 3 : 6,
          mt: isSmallScreen ? 0 : 3,
          position: 'relative',
          width: '100%'
        }}>
          {/* Horizontal connector line for Asset Turnover children */}
          {!isSmallScreen && (
            <Box sx={{
              position: 'absolute',
              top: -8,
              left: '50%',
              transform: 'translateX(-50%)',
              height: 2,
              width: '50%',
              bgcolor: '#E7EBF0',
              zIndex: 1
            }} />
          )}
          
          {/* Operating Income */}
          <Box sx={{ 
            position: 'relative',
            mt: isSmallScreen ? 3 : 0
          }}>
            <MetricCard 
              title="Operating Income" 
              value="6.2%" 
              change="+1.2%"
            />
          </Box>

          {/* Assets */}
          <Box sx={{ 
            position: 'relative',
            mt: isSmallScreen ? 3 : 0
          }}>
            <MetricCard 
              title="Assets" 
              value="6.2%" 
              change="+1.2%"
            />
            
            {/* Vertical connector down */}
            <Box sx={{
              position: 'absolute',
              bottom: isSmallScreen ? 'auto' : -16,
              top: isSmallScreen ? '100%' : 'auto',
              left: '50%',
              transform: 'translateX(-50%)',
              height: isSmallScreen ? 16 : 16,
              width: 2,
              bgcolor: '#94A3B8',
              zIndex: 2
            }} />
          </Box>
        </Box>

        {/* Level 3: Connected to Profit Margin */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: isSmallScreen ? 0 : 3,
          position: 'relative',
          width: '100%'
        }}>
          {/* EBIT */}
          <Box sx={{ 
            position: 'relative',
            mt: isSmallScreen ? 3 : 0
          }}>
            <MetricCard 
              title="EBIT" 
              subtitle="Earnings before interest and tax" 
              value="6.2%" 
              change="+1.2%"
            />
            
            {/* Vertical connector down */}
            <Box sx={{
              position: 'absolute',
              bottom: isSmallScreen ? 'auto' : -16,
              top: isSmallScreen ? '100%' : 'auto',
              left: '50%',
              transform: 'translateX(-50%)',
              height: isSmallScreen ? 16 : 16,
              width: 2,
              bgcolor: '#94A3B8',
              zIndex: 2
            }} />
          </Box>
        </Box>

        {/* Level 4: Connected to Assets */}
        <Box sx={{
          display: 'flex',
          flexDirection: isSmallScreen ? 'column' : 'row',
          justifyContent: 'center',
          gap: isXSmallScreen ? 2 : isSmallScreen ? 3 : 6,
          mt: isSmallScreen ? 0 : 3,
          position: 'relative',
          width: '100%'
        }}>
          {/* Horizontal connector line for Assets children */}
          {!isSmallScreen && (
            <Box sx={{
              position: 'absolute',
              top: -8,
              left: '50%',
              transform: 'translateX(-50%)',
              height: 2,
              width: '30%',
              bgcolor: '#E2E8F0',
              zIndex: 1
            }} />
          )}
          
          {/* Fixed Assets */}
          <Box sx={{ 
            position: 'relative',
            mt: isSmallScreen ? 3 : 0
          }}>
            <MetricCard 
              title="Fixed Assets" 
              value="6.2%" 
              change="+1.2%"
            />
          </Box>

          {/* Current Assets */}
          <Box sx={{ 
            position: 'relative',
            mt: isSmallScreen ? 3 : 0
          }}>
            <MetricCard 
              title="Current Assets" 
              value="6.2%" 
              change="+1.2%"
            />
            
            {/* Vertical connector down */}
            <Box sx={{
              position: 'absolute',
              bottom: isSmallScreen ? 'auto' : -16,
              top: isSmallScreen ? '100%' : 'auto',
              left: '50%',
              transform: 'translateX(-50%)',
              height: isSmallScreen ? 16 : 16,
              width: 2,
              bgcolor: '#94A3B8',
              zIndex: 2
            }} />
          </Box>
        </Box>

        {/* Level 4: Connected to EBIT */}
        <Box sx={{
          display: 'flex',
          flexDirection: isSmallScreen ? 'column' : 'row',
          justifyContent: 'center',
          gap: isXSmallScreen ? 2 : isSmallScreen ? 2 : 4,
          mt: isSmallScreen ? 0 : 3,
          position: 'relative',
          width: '100%',
          flexWrap: 'wrap'
        }}>
          {/* Horizontal connector line for EBIT children */}
          {!isSmallScreen && (
            <Box sx={{
              position: 'absolute',
              top: -8,
              left: '50%',
              transform: 'translateX(-50%)',
              height: 2,
              width: '70%',
              bgcolor: '#E2E8F0',
              zIndex: 1
            }} />
          )}
          
          {/* Operating Income */}
          <Box sx={{ 
            position: 'relative',
            mt: isSmallScreen ? 3 : 0
          }}>
            <MetricCard 
              title="Operating Income" 
              value="6.2%" 
              change="+1.2%"
            />
          </Box>

          {/* Operating Expenses */}
          <Box sx={{ 
            position: 'relative',
            mt: isSmallScreen ? 3 : 0
          }}>
            <MetricCard 
              title="Operating Expenses" 
              value="6.2%" 
              change="+1.2%"
            />
          </Box>

          {/* Non-Operating Income */}
          <Box sx={{ 
            position: 'relative',
            mt: isSmallScreen ? 3 : 0
          }}>
            <MetricCard 
              title="Non-Operating Income" 
              value="6.2%" 
              change="+1.2%"
            />
          </Box>
        </Box>

        {/* Level 5: Connected to Current Assets */}
        <Box sx={{
          display: 'flex',
          flexDirection: isSmallScreen ? 'column' : 'row',
          justifyContent: 'center',
          gap: isXSmallScreen ? 2 : isSmallScreen ? 2 : 4,
          mt: isSmallScreen ? 0 : 3,
          position: 'relative',
          width: '100%',
          flexWrap: 'wrap'
        }}>
          {/* Horizontal connector line for Current Assets children */}
          {!isSmallScreen && (
            <Box sx={{
              position: 'absolute',
              top: -8,
              left: '50%',
              transform: 'translateX(-50%)',
              height: 2,
              width: '80%',
              bgcolor: '#E2E8F0',
              zIndex: 1
            }} />
          )}
          
          {/* Cash & Equivalents */}
          <Box sx={{ 
            position: 'relative',
            mt: isSmallScreen ? 3 : 0
          }}>
            <MetricCard 
              title="Cash & Equivalents" 
              value="6.2%" 
              change="+1.2%"
            />
          </Box>

          {/* Accounts Receivable */}
          <Box sx={{ 
            position: 'relative',
            mt: isSmallScreen ? 3 : 0
          }}>
            <MetricCard 
              title="Accounts Receivable" 
              value="6.2%" 
              change="+1.2%"
            />
          </Box>

          {/* Inventory */}
          <Box sx={{ 
            position: 'relative',
            mt: isSmallScreen ? 3 : 0
          }}>
            <MetricCard 
              title="Inventory" 
              value="6.2%" 
              change="+1.2%"
            />
          </Box>

          {/* Other Current Assets */}
          <Box sx={{ 
            position: 'relative',
            mt: isSmallScreen ? 3 : 0
          }}>
            <MetricCard 
              title="Other Current Assets" 
              value="6.2%" 
              change="+1.2%"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const RotaTreeTable = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isXSmallScreen = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Box sx={{ 
      mt: 4, 
      p: isXSmallScreen ? 0.5 : isSmallScreen ? 1 : 3, 
      borderRadius: 2, 
      bgcolor: '#E7EBF0',
      boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
      overflowX: 'auto'
    }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        flexDirection: isXSmallScreen ? 'column' : 'row',
        alignItems: 'center',
        bgcolor: '#E7EBF0',
        flexWrap: 'wrap',
        gap: isXSmallScreen ? 2 : 4
      }}>
        <TreeNode 
          title="ROTA" 
          formula="Net Profit/Total Assets" 
          value="6.2%" 
          change="+1.2%"
          level={0}
        >
          <TreeNode 
            title="Return on Sales" 
            value="6.2%" 
            change="+1.2%"
            level={1}
          />
          <TreeNode 
            title="Sales per Capital Employed" 
            value="6.2%" 
            change="+1.2%"
            level={1}
          />
        </TreeNode>
      </Box>

      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        mt: 4, 
        flexWrap: 'wrap',
        gap: isXSmallScreen ? 2 : 4
      }}>
        <TreeNode 
          title="COGS/Sales" 
          value="6.2%" 
          change="+1.2%"
          level={0}
        />
        <TreeNode 
          title="SGA Expense/Sales" 
          value="6.2%" 
          change="+1.2%"
          level={0}
        />
        <TreeNode 
          title="Inventory Turnover" 
          formula="Sales/Inventories" 
          value="6.2%" 
          change="+1.2%"
          level={0}
        />
        <TreeNode 
          title="Turnover of Other Items" 
          value="6.2%" 
          change="+1.2%"
          level={0}
        />
        <TreeNode 
          title="Depreciation/Sales" 
          value="6.2%" 
          change="+1.2%"
          level={0}
        />
        <TreeNode 
          title="Fixed Asset Turnover" 
          formula="Sales/PPE" 
          value="6.2%" 
          change="+1.2%"
          level={0}
        />
        <TreeNode 
          title="Creditor Turnover" 
          formula="Sales/Acct" 
          value="6.2%" 
          change="+1.2%"
          level={0}
        />
      </Box>
    </Box>
  );
};

const RoceTreeTable = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isXSmallScreen = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Box sx={{ 
      mt: 4, 
      p: isXSmallScreen ? 0.5 : isSmallScreen ? 1 : 3, 
      borderRadius: 2, 
      bgcolor: '#E7EBF0',
      boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
      overflowX: 'auto'
    }}>
      {/* Main ROCE Node */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        bgcolor: '#E7EBF0',
        mb: 4
      }}>
        <TreeNode 
          title="ROCE" 
          value="6.2%" 
          change="+12%"
          level={0}
        />
      </Box>

      {/* Child Metrics */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: isXSmallScreen ? 'column' : 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: isXSmallScreen ? 2 : isSmallScreen ? 3 : 4,
        mt: 4
      }}>
        <TreeNode 
          title="Return on Sales" 
          value="6.2%" 
          change="+12%"
          level={1}
        />
        <TreeNode 
          title="Sales per Capital Employed" 
          value="6.2%" 
          change="+12%"
          level={1}
        />
        <TreeNode 
          title="COGS/Sales" 
          value="6.2%" 
          change="+12%"
          level={1}
        />
        <TreeNode 
          title="SGA Expense/Sales" 
          value="6.2%" 
          change="+12%"
          level={1}
        />
        <TreeNode 
          title="Inventory Turnover" 
          formula="Sales/Inventories" 
          value="6.2%" 
          change="+12%"
          level={1}
        />
        <TreeNode 
          title="Turnover of Other Items" 
          value="6.2%" 
          change="+12%"
          level={1}
        />
        <TreeNode 
          title="Depreciation/Sales" 
          value="6.2%" 
          change="+12%"
          level={1}
        />
        <TreeNode 
          title="Fixed Asset Turnover" 
          formula="Sales/PPE" 
          value="6.2%" 
          change="+12%"
          level={1}
        />
        <TreeNode 
          title="Creditor Turnover" 
          formula="Sales/Acct" 
          value="6.2%" 
          change="+12%"
          level={1}
        />
      </Box>
    </Box>
  );
};

const ZScoreTree = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isXSmallScreen = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Box sx={{ 
      mt: 4, 
      p: isXSmallScreen ? 0.5 : isSmallScreen ? 1 : 3, 
      borderRadius: 2, 
      bgcolor: '#E7EBF0',
      boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
      overflowX: 'auto'
    }}>
      {/* Tree Structure */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        mb: 4,
        bgcolor: '#E7EBF0',
      }}>
        <Box sx={{ 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          my: 0.5,
          bgcolor: '#E7EBF0',
        }}>
          <Paper
            elevation={3}
            sx={{
              borderLeft: '3px solid #10B981',
              borderRadius: '4px',
              p: 1,
              width: isXSmallScreen ? 140 : isSmallScreen ? 160 : 200,
              minHeight: isXSmallScreen ? 80 : isSmallScreen ? 90 : 100,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#fff',
              zIndex: 2,
            }}
          >
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 'bold',
                mb: 1,
                fontSize: isXSmallScreen ? '1.1rem' : isSmallScreen ? '1.3rem' : '1.5rem'
              }}
            >
              6.2%
            </Typography>
            <Typography 
              variant="subtitle1" 
              sx={{ 
                color: '#64748b',
                mb: 1,
                fontSize: isXSmallScreen ? '0.8rem' : isSmallScreen ? '0.9rem' : '1rem'
              }}
            >
              Z - Score
            </Typography>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#10B981',
                fontWeight: 'bold',
                fontSize: isXSmallScreen ? '0.75rem' : '0.875rem'
              }}
            >
              +1.2%
            </Typography>
          </Paper>

          <Box sx={{ 
            position: 'relative',
            mt: isXSmallScreen ? 1 : 2,
            '&:before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              height: isXSmallScreen ? '10px' : '15px',
              width: '1.5px',
              backgroundColor: '#E7EBF0'
            }
          }}>
            <Box sx={{ 
              display: 'flex',
              flexDirection: isSmallScreen ? 'column' : 'row',
              justifyContent: 'center',
              gap: isXSmallScreen ? 1 : 2,
              position: 'relative',
              '&:before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: isSmallScreen ? 0 : '1.5px',
                width: isSmallScreen ? '1.5px' : 'auto',
                backgroundColor: '#E7EBF0'
              }
            }}>
              {[
                { name: 'Ratio A', value: '6.2' },
                { name: 'Ratio B', value: '6.3' },
                { name: 'Ratio C', value: '2.2' },
                { name: 'Ratio D', value: '0.2' },
                { name: 'Ratio E', value: '1.2' }
              ].map((ratio, index) => (
                <Box key={index} sx={{ position: 'relative' }}>
                  {index > 0 && isSmallScreen && (
                    <Box sx={{
                      position: 'absolute',
                      top: '-15px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '1.5px',
                      height: '15px',
                      backgroundColor: '#E7EBF0'
                    }} />
                  )}
                  {!isSmallScreen && index > 0 && (
                    <Box sx={{
                      position: 'absolute',
                      top: 0,
                      left: '-50%',
                      width: '100%',
                      height: '1.5px',
                      backgroundColor: '#E7EBF0'
                    }} />
                  )}
                  <Paper
                    elevation={1}
                    sx={{
                      borderLeft: '3px solid #E7EBF0',
                      borderRadius: '4px',
                      p: 1,
                      width: isXSmallScreen ? 120 : isSmallScreen ? 140 : 160,
                      minHeight: isXSmallScreen ? 70 : isSmallScreen ? 75 : 80,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#fff',
                    }}
                  >
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        fontWeight: 'bold',
                        mb: 0.5,
                        fontSize: isXSmallScreen ? '0.9rem' : isSmallScreen ? '1rem' : '1.1rem'
                      }}
                    >
                      {ratio.value}
                    </Typography>
                    <Typography 
                      variant="subtitle2" 
                      sx={{ 
                        color: '#64748b',
                        fontSize: isXSmallScreen ? '0.65rem' : isSmallScreen ? '0.75rem' : '0.875rem'
                      }}
                    >
                      {ratio.name}
                    </Typography>
                  </Paper>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Zones Table */}
      <Box sx={{ 
        mt: 5,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        bgcolor: '#E7EBF0'
      }}>
        <Typography variant="subtitle1" sx={{ 
          fontWeight: 'bold',
          mb: 1,
          fontSize: isXSmallScreen ? '0.9rem' : '1rem'
        }}>
          Z - Score 
        </Typography>
        <TableContainer component={Paper} sx={{ 
          width: isXSmallScreen ? '100%' : isSmallScreen ? '90%' : '80%',
          mb: 3
        }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ 
                  fontWeight: 'bold', 
                  backgroundColor: '#ef8e44ff', 
                  color: '#fff',
                  textAlign: 'center',
                  fontSize: isXSmallScreen ? '0.75rem' : '0.875rem'
                }}>
                  Distress Zone
                </TableCell>
                <TableCell sx={{ 
                  fontWeight: 'bold', 
                  backgroundColor: '#A9A9A9',
                  textAlign: 'center',
                  fontSize: isXSmallScreen ? '0.75rem' : '0.875rem'
                }}>
                  Grey Zone
                </TableCell>
                <TableCell sx={{ 
                  fontWeight: 'bold', 
                  backgroundColor: '#10b945ff', 
                  color: '#fff',
                  textAlign: 'center',
                  fontSize: isXSmallScreen ? '0.75rem' : '0.875rem'
                }}>
                  Safe Zone
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell sx={{ 
                  fontWeight: 'bold',
                  textAlign: 'center',
                  bgcolor: '#E7EBF0',
                  fontSize: isXSmallScreen ? '0.75rem' : '0.875rem'
                }}>
                  0
                </TableCell>
                <TableCell sx={{ 
                  fontWeight: 'bold',
                  textAlign: 'center',
                  bgcolor: '#E7EBF0',
                  fontSize: isXSmallScreen ? '0.75rem' : '0.875rem'
                }}>
                  1.3
                </TableCell>
                <TableCell sx={{ 
                  fontWeight: 'bold',
                  textAlign: 'center',
                  bgcolor: '#E7EBF0',
                  fontSize: isXSmallScreen ? '0.75rem' : '0.875rem'
                }}>
                  1.5
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

const FinancialTable = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const isXSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const data = [
    {
      srNo: '1',
      activity: 'ROE',
      formulaTop: 'Current assets',
      formulaBottom: 'Current Liability',
      value: '1.69',
      days: Array(7).fill('0.34%'),
    },
    {
      srNo: '1a',
      activity: 'Net Profit Margin',
      formulaTop: 'Current assets',
      formulaBottom: 'Current Liability',
      value: '1.69',
      days: Array(7).fill('0.34%'),
    },
    {
      srNo: '1b',
      activity: 'Return on Assets',
      formulaTop: 'Current assets',
      formulaBottom: 'Current Liability',
      value: '1.69',
      days: Array(7).fill('0.34%'),
    },
    {
      srNo: '1c',
      activity: 'Financial Leverage',
      formulaTop: 'Current assets',
      formulaBottom: 'Current Liability',
      value: '1.69',
      days: Array(7).fill('0.34%'),
    },
    {
      srNo: '2',
      activity: 'ROI',
      formulaTop: 'Current assets',
      formulaBottom: 'Current Liability',
      value: '1.69',
      days: Array(7).fill('0.34%'),
    },
    {
      srNo: '2a',
      activity: 'Comp 1',
      formulaTop: 'Current assets',
      formulaBottom: 'Current Liability',
      value: '1.69',
      days: Array(7).fill('0.34%'),
    },
    {
      srNo: '2b',
      activity: 'Comp 2',
      formulaTop: 'Current assets',
      formulaBottom: 'Current Liability',
      value: '1.69',
      days: Array(7).fill('0.34%'),
    },
    {
      srNo: '3',
      activity: 'ROTA',
      formulaTop: 'Current assets',
      formulaBottom: 'Current Liability',
      value: '1.69',
      days: Array(7).fill('0.34%'),
    },
    {
      srNo: '3a',
      activity: 'Comp 1',
      formulaTop: 'Current assets',
      formulaBottom: 'Current Liability',
      value: '1.69',
      days: Array(7).fill('0.34%'),
    },
    {
      srNo: '3b',
      activity: 'Comp 2',
      formulaTop: 'Current assets',
      formulaBottom: 'Current Liability',
      value: '1.69',
      days: Array(7).fill('0.34%'),
    },
    {
      srNo: '4',
      activity: 'ROCE',
      formulaTop: 'Current assets',
      formulaBottom: 'Current Liability',
      value: '1.69',
      days: Array(7).fill('0.34%'),
    },
  ];

  const dayHeaders = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <TableContainer 
      component={Paper} 
      sx={{ 
        mt: 2, 
        borderRadius: 2,
        overflowX: 'auto',
        bgcolor: '#E7EBF0',
        maxWidth: '100%'
      }}
    >
      <Table sx={{ 
        minWidth: 650,
        '& .MuiTableCell-root': {
          fontSize: isXSmallScreen ? '0.7rem' : isSmallScreen ? '0.8rem' : '0.875rem',
          px: isXSmallScreen ? 0.5 : 1,
          py: isXSmallScreen ? 0.5 : 1
        }
      }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>Sr.no.</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Activity</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Formula equation</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Value</TableCell>
            {dayHeaders.map((day, index) => (
              <TableCell key={index} sx={{ fontWeight: 'bold' }}>{day}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.srNo}</TableCell>
              <TableCell>{row.activity}</TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    fontSize: isXSmallScreen ? '0.65rem' : isSmallScreen ? '0.75rem' : '0.85rem',
                  }}
                >
                  <Typography variant="body2">{row.formulaTop}</Typography>
                  <Box
                    sx={{ borderBottom: '1px solid #000', width: '100%', my: '2px' }}
                  />
                  <Typography variant="body2">{row.formulaBottom}</Typography>
                </Box>
              </TableCell>
              <TableCell>{row.value}</TableCell>
              {row.days.map((day, i) => (
                <TableCell key={i}>{day}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const FinancialDashboard = () => {
  const [selectedTab, setSelectedTab] = useState('Highlights');
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const isXSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const renderSelectedTabContent = () => {
    switch (selectedTab) {
      case 'ROE':
        return <RoeTreeTable />;
      case 'ZScore':
        return <ZScoreTree />;
      case 'ROTA':
        return <RotaTreeTable />;
      case 'ROCE':
        return <RoceTreeTable />;
      case 'ROI':
        return <RoiTreeTable />;
      case 'Highlights':
      default:
        return <FinancialTable />;
    }
  };

  return (
    <Box 
      p={isXSmallScreen ? 1 : isSmallScreen ? 2 : 3} 
      bgcolor="#E7EBF0" 
      minHeight="100vh"
      sx={{
        overflowX: 'hidden'
      }}
    >
      <HeaderSection selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      {renderSelectedTabContent()}
    </Box>
  );
};

export default FinancialDashboard;