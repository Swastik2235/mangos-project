import { FC, useState, useEffect } from 'react';
import {
  AppBar,
  Box,
  IconButton,
  InputBase,
  Tabs,
  Tab,
  Toolbar,
  Typography,
  Button,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Search,
  Bell,
  Clock,
  Menu as MenuIcon
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { menuItems } from './menu'; // Replace with actual path

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header: FC<HeaderProps> = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();
  const [tabIndex, setTabIndex] = useState(0);

  const datasetsRelatedPaths = [
    '/datasetsCollection',
    '/datasets',
    '/jobcardDetail',
    '/projectDetail'
  ];

  const currentTitle = (() => {
    const matchingItem = menuItems.find(item => item.path === location.pathname);

    if (location.pathname.startsWith('/project')) return 'Projects';
    if (datasetsRelatedPaths.includes(location.pathname)) return 'Datasets';
    if (location.pathname === '/createProject') return '';

    return matchingItem?.title || 'Dashboard';
  })();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) =>
    date.toLocaleString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    }).toLowerCase();

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
    const paths = ['/', '/operations', '/finance'];
    navigate(paths[newValue]);
  };

  const pathsWithoutTabs = ['/datasets', '/jobcardDetail', '/datasetsCollection'];

  const shouldShowTabs =
    currentTitle === 'Dashboard' &&
    !pathsWithoutTabs.includes(location.pathname);

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: '#E7EBF0',
        color: 'black',
        boxShadow: 'none',
        right: 'unset'
      }}
    >
      <Toolbar sx={{ gap: 2 }}>
        {isTablet && (
          <IconButton edge="start" onClick={onMenuClick} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
        )}

        {shouldShowTabs ? (
          <Tabs value={tabIndex} onChange={handleTabChange} sx={{ width: 'auto' }}>
            <Tab label="Production" />
            <Tab label="Operations" />
            <Tab label="Finance" />
          </Tabs>
        ) : (
          <Typography variant="h6" component="div" sx={{ width: '23%' }}>
            {currentTitle}
          </Typography>
        )}

        <Box sx={{ flexGrow: 0.54 }} />

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: { xs: 1, sm: 2 },
            width: 'auto',
            maxWidth: { xs: '100%', sm: 'auto' },
            flexWrap: { xs: 'wrap', md: 'nowrap' },
            justifyContent: 'flex-end'
          }}
        >
          {!isMobile && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                borderRadius: 1,
                p: 1,
                boxShadow: `
                  2.5px 2.5px 5px 0px #A7AABB80 inset,
                  -2.5px -2.5px 5px 0px #FAFBFF inset
                `,
                width: { sm: '200px', md: '300px' }
              }}
            >
              <Search size={20} style={{ color: '#6B7280' }} />
              <InputBase
                placeholder="Search anything..."
                sx={{
                  ml: 0,
                  flex: 1,
                  fontSize: '0.875rem',
                  '& input': { padding: '4px 8px' }
                }}
              />
            </Box>
          )}

          <Button
            variant="contained"
            sx={{
              display: 'flex',
              background: 'linear-gradient(276.54deg, #43AF1F 0%, rgba(67, 175, 31, 0.6) 100%)',
              '&:hover': {
                background: 'linear-gradient(276.54deg, #43AF1F 0%, rgba(67, 175, 31, 0.7) 100%)'
              },
              borderRadius: '4px',
              textTransform: 'none',
              padding: '6px 16px',
              boxShadow: `
                4px 4px 20px 0px #6F8CB069,
                -6px -6px 20px 0px #FFFFFF,
                2px 2px 4px 0px #728EAB1A
              `,
              width: '120px',
              height: '40px'
            }}
          >
            <Box
              sx={{
                borderRadius: '50%',
                width: 20,
                height: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '8px'
              }}
            >
              <Clock size={20} />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                color: 'white'
              }}
            >
              <Typography sx={{ fontSize: '12px', fontWeight: 700, lineHeight: 1.2 }}>
                Check-in
              </Typography>
              <Typography sx={{ fontSize: '10px', opacity: 0.9, lineHeight: 1.2 }}>
                {formatTime(currentTime)}
              </Typography>
            </Box>
          </Button>

          <IconButton
            sx={{
              bgcolor: '#E7EBF0',
              boxShadow:
                '4px 4px 20px 0px #6F8CB069, -6px -6px 20px 0px #FFFFFF, 2px 2px 4px 0px #728EAB1A',
              display: { xs: 'none', sm: 'flex' }
            }}
          >
            <Bell size={20} />
          </IconButton>

          <Box
            component="img"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="Profile"
            sx={{
              width: { xs: 32, sm: 40 },
              height: { xs: 32, sm: 40 },
              borderRadius: '50%',
              display: { xs: 'none', sm: 'block' }
            }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
