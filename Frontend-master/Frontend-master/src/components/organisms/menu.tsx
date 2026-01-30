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
  Typography,
  Collapse
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
import { Build, ExpandLess, ExpandMore, Inventory, Person ,Construction,Engineering,Store,Storage, Business } from '@mui/icons-material';
import GroupIcon from '@mui/icons-material/Group';
import ListAltIcon from '@mui/icons-material/ListAlt';
import LayersIcon from '@mui/icons-material/Layers';
// import SyncAltIcon from '@mui/icons-material/SyncAlt';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
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
  { text: 'MIS Dashboard', icon: <Home />, path: '/mis-dashboard', title: "MIS Dashboard" },
  { text: 'AIS Dashboard', icon: <Home />, path: '/', title: "Dashboard" },
  {
    text: "AIS (Integrations)",
    icon: <Network />,
    path: "/ais",
    title: "AIS Integrations",
    submenu: [
      { text: "Zoho CRM", path: "/zoho-crm", icon: <Business /> },
    ],
  },
  {
    text: "Masters",
    icon: <Storage />,
    path: "/masters",
    submenu: [
      { text: "Employee", path: "/employee", icon: <Person /> },
      {
        text: "Machine",
        path: "/machine",
        icon: <Build />,
        submenu: [
          { text: "Maintenance Record", path: "/machineMaintenance", icon: <Construction /> },
          { text: "Machine Material", path: "/machineMaterial", icon: <Engineering /> },
        ],
      },
      { 
        text: "Inventory", 
        // path: "/inventory", 
        path: "/Inventory", 
        icon: <Inventory />, 
        submenu: [
          { text: "Inventory", path: "/Inventory", icon: <Store /> },
          { text: " Item Master", path: "/inventoryItemMaster", icon: <ListAltIcon   /> },
          { text: "Stock Movement", path: "/inventoryStockDetails", icon: <LocalShippingIcon    /> },
          // { text: "Inventory Item", path: "/inventoryItem", icon: <Store /> },
        ],
      },
      { text: "Client", path: "/client", icon: <GroupIcon /> },
      
    ],
  },
  { text: 'Quick Access', icon: <File />, path: '/quickaccess', title: "Quick Access" },
  {
    text: 'Datasets',
    icon: <LayoutDashboardIcon />,
    path: '/datasetsCollection',
    title: "Datasets",
    endIcon: <Plus size={16} style={{ color: '#505576' }} />
  },
  { text: 'Task Manager', icon: <SquareCheck />, path: '/taskManager', title: "Task Manager" },
  // { text: 'Job Card', icon: <File />, path: '/jobCart', title: "Job Card" },
  { text: 'Department', icon: <Briefcase />, path: '/projects', title: "Department" },
  { text: 'Operations', icon: <Network />, path: '/workflows', title: "Operations" },
  {
    text: 'Organization',
    icon: <Building2 />,
    path: '/organization',
    title: "Organization",
    endIcon: <ChevronRight size={16} style={{ color: '#505576' }} />
  },
 {
  text: "Projects",
  icon: <Grid3x3Icon />,
  path: "/project",
  title: "Projects",
  submenu: [
    { text: "Services", path: "/services", icon: <Person /> },
    { text: "Machines", path: "/machines", icon: <Build /> },
    { text: "Operation", path: "/operation", icon: <Person /> },
  ],
},

{
  text: "Master",
  icon: <LayersIcon />,
  path: "/master",
  title: "Master",
  submenu: [
    {
      text: "Inventory",
      path: "/Inventory",
      icon: <Inventory />,
      submenu: [
        { text: "Inventory", path: "/Inventory", icon: <Store /> },
        { text: "Item Master", path: "/inventoryItemMaster", icon: <ListAltIcon /> },
        { text: "Stock Movement", path: "/inventoryStockDetails", icon: <LocalShippingIcon /> },
      ],
    },
    { text: "Client", path: "/client", icon: <GroupIcon /> },
  ],
},

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
  const [openMasters, setOpenMasters] = useState(false);
  const [openInventory, setOpenInventory] = useState(false);
  const [openMachine, setOpenMachine] = useState(false);
  const [openProjects, setOpenProjects] = useState(false);
  const [openAIS, setOpenAIS] = useState(false);

  const [activePath, setActivePath] = useState(window.location.pathname);
  const [isCreateProjectActive, setCreateProjectActive] = useState(false);
  const handleMastersClick = () => {
    setOpenMasters(!openMasters);
    setActivePath('/masters'); // Ensure "Masters" is marked active when clicked
    
  };
  
  const handleAISClick = () => {
    setOpenAIS(!openAIS);
    setActivePath('/ais');
  };
  const handleMachineClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation(); // Prevents the click from triggering parent handlers
    navigate("/machine"); // Navigate to the machine page
    setOpenMachine((prev) => !prev); // Toggle the submenu
  };
  
  const handleInventoryClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation(); // Prevents parent handlers from triggering
    navigate("/Inventory"); // Navigate to Inventory page
    setOpenInventory((prev) => !prev); // Toggle submenu
  };
  // State to track the active menu item
  // Removed unused variable isMastersActive
  const handleProjectsClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    navigate("/project");   // ✅ navigate parent page
    setOpenProjects((prev) => !prev);
    setActivePath("/project");
  };


  const handleMenuClick = (path: string) => {
    setCreateProjectActive(false); // Reset Create Project state
    setActivePath(path); // Update active path
    navigate(path); // Redirect to the new path
    if (isTablet && onClose) onClose(); // Close the drawer on mobile
  };

  // const handleCreateProjectClick = () => {
  //   setCreateProjectActive(true);
  //   setActivePath('/createProject');
  //   navigate('/createProject');
  // };

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
    <Box key={index} sx={{ position: "relative", mb: 2 }}>
      {activePath === item.path && !isCreateProjectActive && (
        <Box
          sx={{
            position: "absolute",
            left: "-16px",
            top: 0,
            width: "4px",
            height: item.text === "Reports" ? "40%" : "100%",
            bgcolor: "#2564E6",
            borderTopRightRadius: "4px",
            borderBottomRightRadius: "4px",
          }}
        />
      )}

      {/* Masters Menu with Multiple Submenus */}
     {/* AIS (Integrations) */}
            {item.text === "AIS (Integrations)" && item.submenu ? (
              <>
                <ListItem disablePadding sx={{ borderRadius: 2 }} onClick={handleAISClick}>
                  <ListItemButton sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Box sx={{ display: "flex" }}>
                      <ListItemIcon sx={{ minWidth: 0, mr: 1 }}>{item.icon}</ListItemIcon>
                      <Typography sx={{ fontSize: "14px" }}>{item.text}</Typography>
                    </Box>
                    {openAIS ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                </ListItem>
                <Collapse in={openAIS} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.submenu.map((subItem, subIndex) => (
                      <ListItemButton key={subIndex} sx={{ pl: 4 }} onClick={() => navigate(subItem.path)}>
                        <ListItemIcon sx={{ minWidth: 0, mr: 1 }}>{subItem.icon}</ListItemIcon>
                        <Typography sx={{ fontSize: "14px" }}>{subItem.text}</Typography>
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </>
            ) : 
     {/* Masters */}
            item.text === "Masters" && item.submenu ? (
              <>
                <ListItem disablePadding sx={{ borderRadius: 2 }} onClick={handleMastersClick}>
                  <ListItemButton sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Box sx={{ display: "flex" }}>
                      <ListItemIcon sx={{ minWidth: 0, mr: 1 }}>{item.icon}</ListItemIcon>
                      <Typography sx={{ fontSize: "14px" }}>{item.text}</Typography>
                    </Box>
                    {openMasters ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                </ListItem>
                <Collapse in={openMasters} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.submenu.map((subItem, subIndex) => (
                      <Box key={subIndex}>
                        {subItem.text === "Machine" && subItem.submenu ? (
                          <>
                            <ListItemButton sx={{ pl: 4 }} onClick={handleMachineClick}>
                              <ListItemIcon sx={{ minWidth: 0, mr: 1 }}>{subItem.icon}</ListItemIcon>
                              <Typography sx={{ fontSize: "14px" }}>{subItem.text}</Typography>
                              {openMachine ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={openMachine} timeout="auto" unmountOnExit>
                              <List component="div" disablePadding>
                                {subItem.submenu.map((machineItem, machineIndex) => (
                                  <ListItemButton key={machineIndex} sx={{ pl: 6 }} onClick={() => navigate(machineItem.path)}>
                                    <ListItemIcon sx={{ minWidth: 0, mr: 1 }}>{machineItem.icon}</ListItemIcon>
                                    <Typography sx={{ fontSize: "14px" }}>{machineItem.text}</Typography>
                                  </ListItemButton>
                                ))}
                              </List>
                            </Collapse>
                          </>
                        ) : subItem.text === "Inventory" && subItem.submenu ? (
                          <>
                            <ListItemButton sx={{ pl: 4 }} onClick={handleInventoryClick}>
                              <ListItemIcon sx={{ minWidth: 0, mr: 1 }}>{subItem.icon}</ListItemIcon>
                              <Typography sx={{ fontSize: "14px" }}>{subItem.text}</Typography>
                              {openInventory ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            <Collapse in={openInventory} timeout="auto" unmountOnExit>
                              <List component="div" disablePadding>
                                {subItem.submenu.map((inventoryItem, invIndex) => (
                                  <ListItemButton key={invIndex} sx={{ pl: 6 }} onClick={() => navigate(inventoryItem.path)}>
                                    <ListItemIcon sx={{ minWidth: 0, mr: 1 }}>{inventoryItem.icon}</ListItemIcon>
                                    <Typography sx={{ fontSize: "14px" }}>{inventoryItem.text}</Typography>
                                  </ListItemButton>
                                ))}
                              </List>
                            </Collapse>
                          </>
                        ) : (
                          <ListItemButton sx={{ pl: 4 }} onClick={() => navigate(subItem.path)}>
                            <ListItemIcon sx={{ minWidth: 0, mr: 1 }}>{subItem.icon}</ListItemIcon>
                            <Typography sx={{ fontSize: "14px" }}>{subItem.text}</Typography>
                          </ListItemButton>
                        )}
                      </Box>
                    ))}
                  </List>
                </Collapse>
              </>
            ) : item.text === "Projects" && item.submenu ? (
              <>
                <ListItem disablePadding sx={{ borderRadius: 2 }}>
                  <ListItemButton sx={{ display: "flex", justifyContent: "space-between" }} onClick={handleProjectsClick}>
                    <Box sx={{ display: "flex" }}>
                      <ListItemIcon sx={{ minWidth: 0, mr: 1 }}>{item.icon}</ListItemIcon>
                      <Typography sx={{ fontSize: "14px" }}>{item.text}</Typography>
                    </Box>
                    {openProjects ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                </ListItem>
                <Collapse in={openProjects} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.submenu.map((subItem, subIndex) => (
                      <ListItemButton key={subIndex} sx={{ pl: 4 }} onClick={() => navigate(subItem.path)}>
                        <ListItemIcon sx={{ minWidth: 0, mr: 1 }}>{subItem.icon}</ListItemIcon>
                        <Typography sx={{ fontSize: "14px" }}>{subItem.text}</Typography>
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </>
            ) : (
              <ListItem disablePadding sx={{ borderRadius: 2 }} onClick={() => handleMenuClick(item.path)}>
                <ListItemButton sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Box sx={{ display: "flex" }}>
                    <ListItemIcon sx={{ minWidth: 0, mr: 1 }}>{item.icon}</ListItemIcon>
                    <Typography sx={{ fontSize: "14px" }}>{item.text}</Typography>
                  </Box>
                  {item.endIcon && <Box sx={{ ml: 1 }}>{item.endIcon}</Box>}
                </ListItemButton>
              </ListItem>
            )}
          </Box>
        ))}
      </List>

<Box sx={{ flexGrow: 1 }} />
<Box sx={{ px: 2, pb: 2 }}>
  <Button
    variant="outlined"
    color="primary"
    fullWidth
    sx={{
      textTransform: 'none',
      borderRadius: '10px',
      py: 1.2,
      borderColor: '#2564E6',
      color: '#2564E6',
      '&:hover': {
        backgroundColor: '#f0f4ff',
        borderColor: '#2564E6',
      },
    }}
    onClick={() => {
      localStorage.removeItem('isAuthenticated'); // Clear auth flag
      navigate('/login'); // Redirect to login page
    }}
  >
    Logout
  </Button>
</Box>
;




     
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
