import { FC, useState } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  // ListItemText,
  ListItemButton,
  Button,
  useTheme,
  useMediaQuery,
  Typography
} from '@mui/material';
import {
  Home,
  // Database,
  // Calendar,
  // BarChart2,
  // Settings,
  HelpCircle,
  Plus,
  ChevronRight,
  Building2,
  X,
  File,
  LayoutDashboardIcon,
  SquareCheck,
  Briefcase,
  Network,
  Grid3x3Icon,
  FileSpreadsheetIcon
} from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // React Router for navigation
import logo from '../../assets/logo.png';

const drawerWidth = 230;

interface MenuProps {
  mobileOpen?: boolean;
  onClose?: () => void;
}

// const menuItems = [
//   { text: 'Home', icon: <Home />, path: '/' },
//   { text: 'Quick Access', icon: <File />, path: '/quickaccess' },
//   {
//     text: 'Datasets',
//     icon: <LayoutDashboardIcon/>,
//     path: '/datasets',
//     endIcon: <Plus size={16} style={{ color: '#505576' }} />
//   },
//   { text: 'Task Manager', icon: <SquareCheck/>, path: '/task-manager' },
//   { text: 'Projects', icon: <Briefcase />, path: '/projects' },
//   { text: 'Workflows', icon: <Network />, path: '/workflows' },
//   {
//     text: 'Organization',
//     icon: <Building2 />,
//     path: '/organization',
//     endIcon: <ChevronRight size={16} style={{ color: '#505576' }} />
//   },
//   { text: 'Manage Apps', icon: <Grid3x3Icon />, path: '/manageapps' },
//   {
//     text: 'Reports',
//     icon: <FileSpreadsheetIcon />,
//     path: '/reports',
//     endIcon: <Plus size={16} style={{ color: '#505576' }} />
//   },
//   { text: 'Help and Support', icon: <HelpCircle />, path: '/help' },
// ];

export const menuItems = [
  { text: 'Home', icon: <Home />, path: '/', title: "Dashboard" },
  { text: 'Quick Access', icon: <File />, path: '/quickaccess', title: "Quick Access" },
  {
    text: 'Datasets',
    icon: <LayoutDashboardIcon/>,
    path: '/datasetsCollection',
    title: "Datasets",
    endIcon: <Plus size={16} style={{ color: '#505576' }} />
  },
  { text: 'Task Manager', icon: <SquareCheck/>, path: '/taskManager', title: "Task Manager" },
  { text: 'Projects', icon: <Briefcase />, path: '/projects', title: "Projects" },
  { text: 'Workflows', icon: <Network />, path: '/workflows', title: "Workflows" },
  {
    text: 'Organization',
    icon: <Building2 />,
    path: '/organization',
    title: "Organization",
    endIcon: <ChevronRight size={16} style={{ color: '#505576' }} />
  },
  { text: 'Manage Apps', icon: <Grid3x3Icon />, path: '/manageapps', title: "Manage Apps" },
  {
    text: 'Reports',
    icon: <FileSpreadsheetIcon />,
    path: '/reports',
    title: "Reports",
    endIcon: <Plus size={16} style={{ color: '#505576' }} />
  },
  { text: 'Help and Support', icon: <HelpCircle />, path: '/help', title: "Help and Support" },
];

const Menu: FC<MenuProps> = ({ mobileOpen = false, onClose  }) => {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  const navigate = useNavigate();


  // State to track the active menu item
  const [activePath, setActivePath] = useState(window.location.pathname);
  const [isCreateProjectActive, setCreateProjectActive] = useState(false);

  const handleMenuClick = (path: string) => {
    setCreateProjectActive(false); // Reset Create Project state
    setActivePath(path); // Update active path
    navigate(path); // Redirect to the new path
    if (isTablet && onClose) onClose(); // Close the drawer on mobile
  };

  const handleCreateProjectClick = () => {
    setCreateProjectActive(true);
    setActivePath('/createProject');
    navigate('/createProject');
  };

  const MenuContent = (
    <>
      <Box
        sx={{
          p: 2,
          display: 'flex',
          alignItems: 'left',
          // justifyContent: 'space-around',
        }}
      >
        <Box
          component="img"
          src={logo}
          alt="logo"
          sx={{
            width: '50%',
            height: 22,
            margin: 1.5
          }}
        />
        {isTablet && (
          <Button
            onClick={onClose}
            sx={{ minWidth: 'auto', p: 1 }}
          >
            <X size={24} />
          </Button>
        )}
      </Box>

      <List sx={{ px: 2 }}>
        {menuItems.map((item, index) => (
          <Box key={index} sx={{ position: 'relative', mb: 2,  }} >
            {activePath === item.path && !isCreateProjectActive && (
              <Box
                sx={{
                  position: 'absolute',
                  left: '-16px',
                  top: 0,
                  width: '4px',
                  // height: '100%',
                  height: item.text === 'Reports' ? '40%' : '100%', 
                  bgcolor: '#2564E6',
                  borderTopRightRadius: '4px',
                  borderBottomRightRadius: '4px'
                }}
              />
            )}
            <ListItem
              disablePadding
              sx={{
                borderRadius: 2,
                overflow: 'hidden',
                bgcolor: activePath === item.path ? '#E7EBF0' : 'transparent',
                '& .MuiListItemIcon-root': {
                  color: activePath === item.path ? '#2564E6' : '#A7AABB',
                  // minWidth: 20
                  marginRight:1
                },
                '& .MuiListItemText-primary': {
                  color: activePath === item.path ? '#2564E6' : '#505576',
                  fontWeight: activePath === item.path ? 500 : 400
                },
                ...(activePath === item.path && {
                  boxShadow: `
                    4px 4px 20px 0px #6F8CB069,
                    -6px -6px 20px 0px #FFFFFF,
                    2px 2px 4px 0px #728EAB1A
                  `
                }),
              }}
              onClick={() => handleMenuClick(item.path)}
              
            >
              <ListItemButton sx={{display:'flex', justifyContent:'space-between'}} >
                <Box sx={{display:'flex'}}>
                <ListItemIcon  sx={{
                    minWidth: 0,
                    '& svg': {
                      width: 20,
                      height: 20,
                    },
                    color: activePath === item.path ? '#2564E6' : '#505576',
                 
                  }}>
                  {item.icon}
                </ListItemIcon>
                {/* <ListItemText  primary={item.text} sx={{
                    fontSize: "14px", // Set font size
                    fontWeight: 700, // Set font weight
                    color: activePath === item.path ? '#2564E6' : '#505576', // Keep dynamic color logic
                  }}/> */}
                  <Typography sx={{fontSize: '14px', 
                    fontWeight:activePath===item.path ? 700: 400,color: activePath === item.path ? '#2564E6' : '#505576', }}>{item.text}</Typography>
                </Box>
                {item.endIcon && (
                  <Box sx={{ ml: 1, display:'flex',
                  justifyContent:'center'
                   }}>
                    {item.endIcon}
                  </Box>
                )}
              </ListItemButton>
            </ListItem>
            {item.text === 'Reports' && (
              <Box sx={{ p: 0, pt:1 }}>
                <Button
                  variant="contained"
                  startIcon={<Plus size={18} />}
                  fullWidth
                  sx={{
                    textTransform: 'none',
                    borderRadius: '10px',
                    py: 1,
                    background: 'linear-gradient(272.72deg, #2564E6 0.57%, rgba(37, 100, 230, 0.73) 100%)',
                    '&:hover': {
                      background: 'linear-gradient(272.72deg, #2564E6 0.57%, rgba(37, 100, 230, 0.8) 100%)',
                    },
                  }}
                  // onClick={() => navigate('/createProject')} 
                  onClick={handleCreateProjectClick}
                >
                  Create Project
                </Button>
              </Box>
            )}
          </Box>
        ))}
      </List>
     
    </>
  );

  return (
    <>
      {!isTablet && (
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              border: 'none',
              backgroundColor: '#E7EBF0'
            },
          }}
        >
          {MenuContent}
        </Drawer>
      )}

      {isTablet && (
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={onClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', lg: 'none' },
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              border: 'none',
              backgroundColor: '#E7EBF0'
            },
          }}
        >
          {MenuContent}
        </Drawer>
      )}
    </>
  );
};

export default Menu;
