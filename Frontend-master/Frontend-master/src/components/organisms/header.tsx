// // import React, { FC, useState, useEffect } from 'react';
// // import { AppBar, Box, IconButton, InputBase,Tabs, Tab, Toolbar, Typography, Button, useTheme, useMediaQuery, MenuItem,Select } from '@mui/material';
// // import { Search, Bell, Clock, Menu as MenuIcon } from 'lucide-react';
// // import { useLocation, useNavigate } from 'react-router-dom'; 
// // import { menuItems } from '../organisms/menu'; // Import menuItems
// // import { SelectChangeEvent } from '@mui/material';

// // interface HeaderProps {
// //   onMenuClick?: () => void;
// //   // title?: string;
// // }

// // const Header: FC<HeaderProps> = ({ onMenuClick }) => {
// //   const navigate = useNavigate();
// //   const [currentTime, setCurrentTime] = useState(new Date());
// //   const theme = useTheme();
// //   const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
// //   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
// //   const location = useLocation(); // Use location to get current path
// //   const [tabIndex, setTabIndex] = useState(0);
// //   // const [tabMisIndex, setTabMisIndex] = useState(0);

  
// //   const [selectedCategory, setSelectedCategory] = useState('Audit Aspects'); // State for dropdown value

// //   const datasetsRelatedPaths = ['/datasetsCollection', '/datasets', '/jobcardDetail', '/projectDetail'];

// //   // Determine the title for the current route
// //   const currentTitle = (() => {
// //     const matchingItem = menuItems.find(item => item.path === location.pathname);
    
// //     if (location.pathname.startsWith('/project')) {
// //       return "Projects";
// //     }

// //     // If the path is in datasetsRelatedPaths, force the title to be "Datasets"
// //     if (datasetsRelatedPaths.includes(location.pathname)) {
// //       return "Datasets";
// //     }

// //     if (location.pathname === '/createProject') {
// //       return "";
// //     }
// //     if (location.pathname === '/mis-dashboard'){
// //       return "mis_dashboard"
// //     }
// //     // Otherwise, use the title from the menu items or default to 'Dashboard'
// //     return matchingItem?.title || 'Dashboard';
// //   })();

// //   // Find the title for the current route
// //   // const currentTitle = menuItems.find(item => item.path === location.pathname)?.title || 'Dashboard';

// //   useEffect(() => {
// //     const timer = setInterval(() => {
// //       setCurrentTime(new Date());
// //     }, 1000);
// //     return () => clearInterval(timer);
// //   }, []);

// //   const formatTime = (date: Date) => {
// //     return date.toLocaleString('en-US', {
// //       hour: 'numeric',
// //       minute: '2-digit',
// //       second: '2-digit',
// //       hour12: true
// //     }).toLowerCase();
// //   };
  
// //   // const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
// //   //   setTabIndex(newValue);
// //   //   const paths = ['/', '/operations', '/finance', '/incomeStatement', '/balanceSheet', '/cashFlow' , '/revenues', '/expenses' ,'/profitability'];
// //   //   navigate(paths[newValue]);
// //   // };

// //   const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
// //     setTabIndex(newValue);
// //     let paths: string[] = [];
// //     if (selectedCategory === 'Audit Aspects') {
// //       paths = ['/revenues', '/expenses', '/profitability'];
// //     } else if (selectedCategory === 'Financial Statements') {
// //       paths = ['/incomeStatement', '/balanceSheet', '/cashFlow'];
// //     } else if (selectedCategory === 'Business Analytics') {
// //       paths = ['/production', '/operations', '/finance'];
// //     }
// //     navigate(paths[newValue]);
// //   };

// //   // const handleMisTabChange = (_: React.SyntheticEvent, newValue: number) => {
// //   //   setTabMisIndex(newValue);
// //   //   const paths = ['/mis-dashboard', '/mis-operations', '/mis-finance'];
// //   //   navigate(paths[newValue]);
// //   // };


// //   // const isDashboardPage = currentTitle === 'Dashboard';

// //  // Define the handler function
// // // const handleCategoryChange = (event: SelectChangeEvent<string>) => {
// // //   const value = event.target.value;
// // //   setSelectedCategory(event.target.value as string);
// // //   // Handle the value here
// // //   console.log(value);
// // // };


// // const handleCategoryChange = (event: SelectChangeEvent<string>) => {
// //   const value = event.target.value as string;
// //   setSelectedCategory(value);
// //   setTabIndex(0); // Reset tab index to first tab

// //   // Navigate to the base route for each category
// //   if (value === 'Audit Aspects') {
// //     navigate('/revenues'); // or your audit aspects base route
// //   } else if (value === 'Financial Statements') {
// //         setTabIndex(0);

// //     navigate('/incomeStatement'); // or your financial statements base route
// //   } else if (value === 'Business Analytics') {
// //             setTabIndex(0);

// //     navigate('/production'); // or your business analytics base route
// //   }
// // };




// //   // List of paths where tabs should not be shown
// //   const pathsWithoutTabs = [
// //     '/datasets', 
// //     '/jobcardDetail', 
// //     '/datasetsCollection',
  
// //   ];


// //   // const getTabs = () => {
// //   //   switch (selectedCategory) {
// //   //     case 'Audit Aspects':
// //   //       return (
// //   //         <Tabs value={tabIndex} onChange={handleTabChange} sx={{ width: 'auto' }}>
// //   //           <Tab  label="Revenues" />
// //   //           <Tab label="Expenses" />
// //   //           <Tab label="Profitability" />
// //   //         </Tabs>
// //   //       );
// //   //     case 'Financial Statements':
// //   //       return (
// //   //         <Tabs value={tabIndex} onChange={handleTabChange} sx={{ width: 'auto' }}>
// //   //           <Tab label="Income Statement" />
// //   //           <Tab label="Balance Sheet" />
// //   //           <Tab label="Cash Flow" />
// //   //         </Tabs>
// //   //       );
// //   //     case 'Business Analytics':
// //   //       return (
// //   //         <Tabs value={tabIndex} onChange={handleTabChange} sx={{ width: 'auto' }}>
// //   //           <Tab label="Business Production" />
// //   //           <Tab label="Business Operations" />
// //   //           <Tab label="Business Finance" />
// //   //         </Tabs>
// //   //       );
// //   //     default:
// //   //       return (
// //   //         <Tabs value={tabIndex} onChange={handleTabChange} sx={{ width: 'auto' }}>
// //   //           <Tab label="Ratios" />
// //   //           <Tab label="Variance" />
// //   //           <Tab label="Sensitivity" />
// //   //         </Tabs>
// //   //       );
// //   //   }
// //   // };

// //   // Determine if the current page should show tabs
 
// //   const getTabs = () => {
// //     const tabStyles = {
// //       fontSize: '10px',
// //       paddingBottom:"0px"
// //     };
  
// //     return (
// //       <>
// //         {selectedCategory === 'Audit Aspects' && (
// //           <Tabs value={tabIndex} onChange={handleTabChange} sx={{ width: 'auto' , marginRight:'55px'}}>
// //             <Tab label="Revenues" sx={tabStyles} />
// //             <Tab label="Expenses" sx={tabStyles} />
// //             <Tab label="Profitability" sx={tabStyles} />
// //           </Tabs>
// //         )}
// //         {selectedCategory === 'Financial Statements' && (
// //           <Tabs value={tabIndex} onChange={handleTabChange} sx={{ width: 'auto' }}>
// //             <Tab label="Income Statement" sx={tabStyles} />
// //             <Tab label="Balance Sheet" sx={tabStyles} />
// //             <Tab label="Cash Flow" sx={tabStyles} />
// //           </Tabs>
// //         )}
// //         {selectedCategory === 'Business Analytics' && (
// //           <Tabs value={tabIndex} onChange={handleTabChange} sx={{ width: 'auto', marginRight:'55px' }}>
// //             <Tab label=" RATIOS" sx={tabStyles} />
// //             <Tab label=" VARIANCE" sx={tabStyles} />
// //             <Tab label=" SENSITIVITY" sx={tabStyles} />
// //           </Tabs>
// //         )}
// //         {/* {!['Audit Aspects', 'Financial Statements', 'Business Analytics'].includes(selectedCategory) && (
// //           <Tabs value={tabIndex} onChange={handleTabChange} sx={{ width: 'auto' }}>
// //             <Tab label="Ratios" sx={tabStyles} />
// //             <Tab label="Variance" sx={tabStyles} />
// //             <Tab label="Sensitivity" sx={tabStyles} />
// //           </Tabs>
// //         )} */}
// //       </>
// //     );
// //   };

 
  
// //   // const tabCategories: Record<string, string[]> = {
// //   //   'Audit Aspects': ['Revenues', 'Expenses', 'Profitability'],
// //   //   'Financial Statements': ['Income Statement', 'Balance Sheet', 'Cash Flow'],
// //   //   'Business Analytics': ['Production', 'Operations', 'Finance'],
// //   //   // Default: ['Ratios', 'Variance', 'Sensitivity'],
// //   // };

// //   // const getTabs = () => {
// //   //   const tabs = tabCategories[selectedCategory || 'Default' ] || [];
// //   //   return (
// //   //     <Tabs value={tabIndex} onChange={handleTabChange} sx={{ width: 'auto', marginRight: selectedCategory ? '55px' : undefined }}>
// //   //       {tabs.map((tab, index) => (
// //   //         <Tab key={index} label={tab} sx={{ fontSize: '10px', paddingBottom: '0px' }} />
// //   //       ))}
// //   //     </Tabs>
// //   //   );
// //   // };

// //   const shouldShowTabs = 
// //     (currentTitle === 'Dashboard') && 
// //     !pathsWithoutTabs.includes(location.pathname);

// //   const shouldShowMisTabs = 
// //     (currentTitle === 'mis_dashboard') && 
// //     !pathsWithoutTabs.includes(location.pathname);

// //   return (
// //     <AppBar 
// //       position="fixed" 
// //       sx={{ 
// //         backgroundColor: '#E7EBF0', 
// //         color: 'black', 
// //         boxShadow: 'none', 
// //         right: "unset",
// //       }}
// //     >
// //       <Toolbar sx={{ gap: 2 }}>
// //         {isTablet && (
// //           <IconButton 
// //             edge="start" 
// //             onClick={onMenuClick}
// //             sx={{ mr: 2 }}
// //           >
// //             <MenuIcon />
// //           </IconButton>
// //         )}

// //         {/* // <Tabs value={tabIndex} onChange={handleTabChange} sx={{   width: {md:'auto', lg:'30%'}}}>
// //           // <Tabs value={tabIndex} onChange={handleTabChange} sx={{   width: 'auto'}}>
// //           //   <Tab label="Production" />
// //           //   <Tab label="Operations" />
// //           //   <Tab label="Finance" />
// //           // </Tabs> */}
// //       {shouldShowTabs ? (
// //   <>
// //     <Select
// //       value={selectedCategory}
// //       onChange={handleCategoryChange}
// //       sx={{ width: '200px', marginRight: 2 }}
// //     >
// //       <MenuItem value="Audit Aspects">Audit Aspects</MenuItem>
// //       <MenuItem value="Financial Statements">Financial Statements</MenuItem>
// //       <MenuItem value="Business Analytics">Business Analytics</MenuItem>
// //     </Select>
// //     {getTabs()}
// //   </>
// // ) : shouldShowMisTabs ? (
// //   <> <Typography variant="h6" component="div" sx={{ width: '23%' }}>
// //   MIS Dashboard
// // </Typography>
// //      {/* <Tabs value={tabMisIndex} onChange={handleMisTabChange} sx={{   width: 'auto'}}>
// //             <Tab label="Production" />
// //             <Tab label="Operation" />
// //             <Tab label="Finance" />
// //           </Tabs> */}
// //   </>
// // ) : (
// //   <Typography variant="h6" component="div" sx={{ width: '23%' }}>
// //     {currentTitle}
// //   </Typography>
// // )}

        
// //         {shouldShowTabs   ?( <Box sx={{ flexGrow: 0.1 }} />):( <Box sx={{ flexGrow: 0.54 }} />)}
       
      
       
// //         <Box sx={{ 
// //           display: 'flex', 
// //           alignItems: 'center', 
// //           gap: { xs: 1, sm: 2 },
// //           width: 'auto',
// //           // width: {md:'auto', lg:'58%'},
// //           maxWidth: { xs: '100%', sm: 'auto' },
// //           flexWrap: { xs: 'wrap', md: 'nowrap' },
// //           justifyContent: 'flex-end'
// //         }}>
// //           {!isMobile && (
// //             <Box sx={{ 
// //               display: 'flex', 
// //               alignItems: 'center', 
// //               borderRadius: 1, 
// //               p: 1, 
// //               boxShadow: `
// //                 2.5px 2.5px 5px 0px #A7AABB80 inset,
// //                 -2.5px -2.5px 5px 0px #FAFBFF inset
// //               `,
// //               width: { sm: '200px', md: '300px' }
// //             }}>
// //               <Search size={20} style={{ marginRight: '0px', color: '#6B7280' }} />
// //               <InputBase
// //                 placeholder="Search anything..."
// //                 sx={{
// //                   ml: 0,
// //                   flex: 1,
// //                   fontSize: '0.875rem',
// //                   '& input': { padding: '4px 8px' }
// //                 }}
// //               />
// //             </Box>
// //           )}

// //           <Button
// //             variant="contained"
// //             sx={{
// //               display: 'flex',
// //               // alignItems: 'center',
// //               // gap: 2,
// //               background: 'linear-gradient(276.54deg, #43AF1F 0%, rgba(67, 175, 31, 0.6) 100%)',
// //               '&:hover': { 
// //                 background: 'linear-gradient(276.54deg, #43AF1F 0%, rgba(67, 175, 31, 0.7) 100%)'
// //               },
// //               borderRadius: '4px',
// //               textTransform: 'none',
// //               padding: '6px 16px',
// //               boxShadow: `
// //                 4px 4px 20px 0px #6F8CB069,
// //                 -6px -6px 20px 0px #FFFFFF,
// //                 2px 2px 4px 0px #728EAB1A
// //               `,
// //               // minWidth: { xs: '160px', sm: '180px', lg:'120px' },
// //               width:"120px",
// //               height: '40px'
// //             }}
// //           >
// //             <Box sx={{ 
// //               borderRadius: '50%',
// //               width: 20,
// //               height: 20,
// //               display: 'flex',
// //               alignItems: 'center',
// //               justifyContent: 'center',
// //               marginRight:'8px'
// //             }}>
// //               <Clock size={20} />
// //             </Box>
// //             <Box sx={{ 
// //               display: 'flex', 
// //               flexDirection: 'column', 
// //               alignItems: 'flex-start',
// //               color: 'white'
// //             }}>
// //               <Typography sx={{ 
// //                 fontSize: "12px", 
// //                 fontWeight: 700, 
// //                 lineHeight: 1.2 
// //               }}>
// //                 Check-in
// //               </Typography>
// //               <Typography sx={{ 
// //                 fontSize: "10px",
// //                 opacity: 0.9,
// //                 lineHeight: 1.2
// //               }}>
// //                 {formatTime(currentTime)}
// //               </Typography>
// //             </Box>
// //           </Button>
// //           <IconButton 
// //             sx={{ 
// //               bgcolor: '#E7EBF0',
// //               boxShadow: '4px 4px 20px 0px #6F8CB069, -6px -6px 20px 0px #FFFFFF, 2px 2px 4px 0px #728EAB1A',
// //               display: { xs: 'none', sm: 'flex' }
// //             }}
// //           >
// //             <Bell size={20} />
// //           </IconButton>

// //           <Box
// //             component="img"
// //             src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
// //             alt="Profile"
// //             sx={{ 
// //               width: { xs: 32, sm: 40 }, 
// //               height: { xs: 32, sm: 40 }, 
// //               borderRadius: '50%',
// //               display: { xs: 'none', sm: 'block' }
// //             }}
// //           />
// //         </Box>
// //       </Toolbar>
// //     </AppBar>
// //   );
// // };

// // export default Header;




// import React, { FC, useState, useEffect } from 'react';
// import {
//   AppBar,
//   Box,
//   IconButton,
//   InputBase,
//   Tabs,
//   Tab,
//   Toolbar,
//   Typography,
//   Button,
//   useTheme,
//   useMediaQuery,
//   MenuItem,
//   Select
// } from '@mui/material';
// import { Search, Bell, Clock, Menu as MenuIcon } from 'lucide-react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { menuItems } from '../organisms/menu';
// import { SelectChangeEvent } from '@mui/material';

// interface HeaderProps {
//   onMenuClick?: () => void;
// }

// const Header: FC<HeaderProps> = ({ onMenuClick }) => {
//   const navigate = useNavigate();
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const theme = useTheme();
//   const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const location = useLocation();
//   const [tabIndex, setTabIndex] = useState(0);
//   const [selectedCategory, setSelectedCategory] = useState('Audit Aspects');

//   const datasetsRelatedPaths = ['/datasetsCollection', '/datasets', '/jobcardDetail', '/projectDetail'];

//   const currentTitle = (() => {
//     const matchingItem = menuItems.find(item => item.path === location.pathname);
    
//     if (location.pathname.startsWith('/project')) return 'Projects';
//     if (datasetsRelatedPaths.includes(location.pathname)) return 'Datasets';
//     if (location.pathname === '/createProject') return '';
//     if (location.pathname === '/mis-dashboard') return 'mis_dashboard';
    
//     return matchingItem?.title || 'Dashboard';
//   })();

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 1000);
//     return () => clearInterval(timer);
//   }, []);

//   const formatTime = (date: Date) =>
//     date.toLocaleString('en-US', {
//       hour: 'numeric',
//       minute: '2-digit',
//       second: '2-digit',
//       hour12: true
//     }).toLowerCase();

//   const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
//     setTabIndex(newValue);
//     let paths: string[] = [];
//     if (selectedCategory === 'Audit Aspects') {
//       paths = ['/revenues', '/expenses', '/profitability'];
//     } else if (selectedCategory === 'Financial Statements') {
//       paths = ['/incomeStatement', '/balanceSheet', '/cashFlow'];
//     } else if (selectedCategory === 'Business Analytics') {
//       paths = ['/production', '/operations', '/finance'];
//     }
//     navigate(paths[newValue]);
//   };

//   const handleCategoryChange = (event: SelectChangeEvent<string>) => {
//     const value = event.target.value as string;
//     setSelectedCategory(value);
//     setTabIndex(0);
//     if (value === 'Audit Aspects') navigate('/revenues');
//     else if (value === 'Financial Statements') navigate('/incomeStatement');
//     else if (value === 'Business Analytics') navigate('/production');
//   };

//   const getTabs = () => {
//   const tabStyles = (index: number) => ({
//     fontSize: isMobile ? '13px' : '15px',
//     padding: isMobile ? '6px 8px' : '6px 12px',
//     minWidth: 'unset',
//     fontWeight: tabIndex === index ? 'bold' : 'normal',
//     textTransform: 'none'
//   });

//   return (
//     <>
//       {selectedCategory === 'Audit Aspects' && (
//         <Tabs
//           value={tabIndex}
//           onChange={handleTabChange}
//           sx={{ minWidth: 'unset' }}
//           TabIndicatorProps={{ style: { display: 'none' } }}
//         >
//           <Tab label={isMobile ? 'Rev' : 'Revenues'} sx={tabStyles(0)} />
//           <Tab label={isMobile ? 'Exp' : 'Expenses'} sx={tabStyles(1)} />
//           <Tab label={isMobile ? 'Prof' : 'Profitability'} sx={tabStyles(2)} />
//         </Tabs>
//       )}
//       {selectedCategory === 'Financial Statements' && (
//         <Tabs
//           value={tabIndex}
//           onChange={handleTabChange}
//           sx={{ minWidth: 'unset' }}
//           TabIndicatorProps={{ style: { display: 'none' } }}
//         >
//           <Tab label={isMobile ? 'Income' : 'Income Statement'} sx={tabStyles(0)} />
//           <Tab label={isMobile ? 'Balance' : 'Balance Sheet'} sx={tabStyles(1)} />
//           <Tab label={isMobile ? 'Cash' : 'Cash Flow'} sx={tabStyles(2)} />
//         </Tabs>
//       )}
//       {selectedCategory === 'Business Analytics' && (
//         <Tabs
//           value={tabIndex}
//           onChange={handleTabChange}
//           sx={{ minWidth: 'unset' }}
//           TabIndicatorProps={{ style: { display: 'none' } }}
//         >
//           <Tab label={isMobile ? 'Ratios' : 'Ratios'} sx={tabStyles(0)} />
//           <Tab label={isMobile ? 'Var' : 'Variance'} sx={tabStyles(1)} />
//           <Tab label={isMobile ? 'Sen' : 'Sensitivity'} sx={tabStyles(2)} />
//         </Tabs>
//       )}
//     </>
//   );
// };

//   const pathsWithoutTabs = ['/datasets', '/jobcardDetail', '/datasetsCollection'];
//   const shouldShowTabs = (currentTitle === 'Dashboard') && !pathsWithoutTabs.includes(location.pathname);
//   const shouldShowMisTabs = (currentTitle === 'mis_dashboard') && !pathsWithoutTabs.includes(location.pathname);

//   return (
//     <AppBar
//       position="fixed"
//       sx={{
//         backgroundColor: '#E7EBF0',
//         color: 'black',
//         boxShadow: 'none',
//         right: 'unset'
//       }}
//     >
//       <Toolbar sx={{ gap: 1, padding: isMobile ? '8px' : '16px' }}>
//         {isTablet && (
//           <IconButton edge="start" onClick={onMenuClick} sx={{ mr: 1 }}>
//             <MenuIcon size={isMobile ? 20 : 24} />
//           </IconButton>
//         )}

//         {shouldShowTabs ? (
//           <>
//             <Select
//               value={selectedCategory}
//               onChange={handleCategoryChange}
//               sx={{
//                 width: isMobile ? '120px' : '200px',
//                 marginRight: 1,
//                 fontSize: isMobile ? '12px' : '14px',
//                 height: '40px'
//               }}
//               size="small"
//             >
//               <MenuItem value="Audit Aspects">Audit Aspects</MenuItem>
//               <MenuItem value="Financial Statements">Financial Statements</MenuItem>
//               <MenuItem value="Business Analytics">Business Analytics</MenuItem>
//             </Select>
//             {getTabs()}
//           </>
//         ) : shouldShowMisTabs ? (
//           <Typography variant="h6" component="div" sx={{ width: isMobile ? '100px' : '23%' }}>
//             MIS Dashboard
//           </Typography>
//         ) : (
//           <Typography variant="h6" component="div" sx={{ width: isMobile ? '100px' : '23%' }}>
//             {currentTitle}
//           </Typography>
//         )}

//         {/* <Box sx={{ flexGrow: shouldShowTabs ? 0.1 : 0.54 }} /> */}

//                 <Box sx={{ flexGrow: 0.40 }} />
        

//         {/* <Box
//           sx={{
//             display: 'flex',
//             alignItems: 'center',
//             gap: isMobile ? 0.5 : 2,
//             flexWrap: 'nowrap',
//             justifyContent: 'flex-end'
//           }}
//         > */}

//         <Box
//           sx={{
//             display: 'flex',
//             alignItems: 'center',
//             gap: { xs: 1, sm: 2 },
//             width: 'auto',
//             maxWidth: { xs: '100%', sm: 'auto' },
//             flexWrap: { xs: 'wrap', md: 'nowrap' },
//             justifyContent: 'flex-end'
//           }}
//         >
//           {/* {!isMobile && (
//             <Box
//               sx={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 borderRadius: 1,
//                 p: 1,
//                 boxShadow: `
//                   2.5px 2.5px 5px 0px #A7AABB80 inset,
//                   -2.5px -2.5px 5px 0px #FAFBFF inset
//                 `,
//                 width: { sm: '200px', md: '300px' }
//               }}
//             >
//               <Search size={20} style={{ color: '#6B7280' }} />
//               <InputBase
//                 placeholder="Search anything..."
//                 sx={{
//                   ml: 0,
//                   flex: 1,
//                   fontSize: '0.875rem',
//                   '& input': { padding: '4px 8px' }
//                 }}
//               />
//             </Box>
//           )} */}

//             {!isMobile && (
//                       <Box
//                         sx={{
//                           display: 'flex',
//                           alignItems: 'center',
//                           borderRadius: 1,
//                           p: 1,
//                           boxShadow: `
//                             2.5px 2.5px 5px 0px #A7AABB80 inset,
//                             -2.5px -2.5px 5px 0px #FAFBFF inset
//                           `,
//                           width: { sm: '200px', md: '300px' }
//                         }}
//                       >
//                         <Search size={20} style={{ color: '#6B7280' }} />
//                         <InputBase
//                           placeholder="Search anything..."
//                           sx={{
//                             ml: 0,
//                             flex: 1,
//                             fontSize: '0.875rem',
//                             '& input': { padding: '4px 8px' }
//                           }}
//                         />
//                       </Box>
//                     )}


//           {/* <Button
//             variant="contained"
//             sx={{
//               display: 'flex',
//               background: 'linear-gradient(276.54deg, #43AF1F 0%, rgba(67, 175, 31, 0.6) 100%)',
//               '&:hover': {
//                 background: 'linear-gradient(276.54deg, #43AF1F 0%, rgba(67, 175, 31, 0.7) 100%)'
//               },
//               borderRadius: '4px',
//               textTransform: 'none',
//               padding: isMobile ? '4px 8px' : '6px 16px',
//               boxShadow: `
//                 4px 4px 20px 0px #6F8CB069,
//                 -6px -6px 20px 0px #FFFFFF,
//                 2px 2px 4px 0px #728EAB1A
//               `,
//               width: isMobile ? '90px' : '120px',
//               height: '40px'
//             }}
//           >
//             <Box
//               sx={{
//                 borderRadius: '50%',
//                 width: 20,
//                 height: 20,
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 marginRight: '4px'
//               }}
//             >
//               <Clock size={isMobile ? 16 : 20} />
//             </Box>
//             <Box
//               sx={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'flex-start',
//                 color: 'white'
//               }}
//             >
//               <Typography sx={{ fontSize: isMobile ? '10px' : '12px', fontWeight: 700, lineHeight: 1.2 }}>
//                 Check-in
//               </Typography>
//               <Typography sx={{ fontSize: isMobile ? '9px' : '10px', opacity: 0.9, lineHeight: 1.2 }}>
//                 {formatTime(currentTime)}
//               </Typography>
//             </Box>
//           </Button> */}

//            <Button
//                       variant="contained"
//                       sx={{
//                         display: 'flex',
//                         background: 'linear-gradient(276.54deg, #43AF1F 0%, rgba(67, 175, 31, 0.6) 100%)',
//                         '&:hover': {
//                           background: 'linear-gradient(276.54deg, #43AF1F 0%, rgba(67, 175, 31, 0.7) 100%)'
//                         },
//                         borderRadius: '4px',
//                         textTransform: 'none',
//                         padding: '6px 16px',
//                         boxShadow: `
//                           4px 4px 20px 0px #6F8CB069,
//                           -6px -6px 20px 0px #FFFFFF,
//                           2px 2px 4px 0px #728EAB1A
//                         `,
//                         width: '120px',
//                         height: '40px'
//                       }}
//                     >
//                       <Box
//                         sx={{
//                           borderRadius: '50%',
//                           width: 20,
//                           height: 20,
//                           display: 'flex',
//                           alignItems: 'center',
//                           justifyContent: 'center',
//                           marginRight: '8px'
//                         }}
//                       >
//                         <Clock size={20} />
//                       </Box>
//                       <Box
//                         sx={{
//                           display: 'flex',
//                           flexDirection: 'column',
//                           alignItems: 'flex-start',
//                           color: 'white'
//                         }}
//                       >
//                         <Typography sx={{ fontSize: '12px', fontWeight: 700, lineHeight: 1.2 }}>
//                           Check-in
//                         </Typography>
//                         <Typography sx={{ fontSize: '10px', opacity: 0.9, lineHeight: 1.2 }}>
//                           {formatTime(currentTime)}
//                         </Typography>
//                       </Box>
//                     </Button>
          

//           {!isMobile && (
//             <IconButton
//             sx={{
//               bgcolor: '#E7EBF0',
//               boxShadow:
//                 '4px 4px 20px 0px #6F8CB069, -6px -6px 20px 0px #FFFFFF, 2px 2px 4px 0px #728EAB1A',
//               display: { xs: 'none', sm: 'flex' }
//             }}
//           >
//             <Bell size={20} />
//           </IconButton>
//           )}

//           {!isMobile && (
//             <Box
//               component="img"
//               src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//               alt="Profile"
//                sx={{
//               width: { xs: 32, sm: 40 },
//               height: { xs: 32, sm: 40 },
//               borderRadius: '50%',
//               display: { xs: 'none', sm: 'block' }
//             }}
//             />
//           )}
//         </Box>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Header;




import React, { FC, useState, useEffect } from 'react';
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
  useMediaQuery,
  MenuItem,
  Select
} from '@mui/material';
import { Search, Bell, Clock, Menu as MenuIcon } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { menuItems } from '../organisms/menu';
import { SelectChangeEvent } from '@mui/material';

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header: FC<HeaderProps> = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down(400));
  const location = useLocation();
  const [tabIndex, setTabIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('Audit Aspects');

  const datasetsRelatedPaths = ['/datasetsCollection', '/datasets', '/jobcardDetail', '/projectDetail'];

  const currentTitle = (() => {
    const matchingItem = menuItems.find(item => item.path === location.pathname);
    
    if (location.pathname.startsWith('/project')) return 'Projects';
    if (datasetsRelatedPaths.includes(location.pathname)) return 'Datasets';
    if (location.pathname === '/createProject') return '';
    if (location.pathname === '/mis-dashboard') return 'mis_dashboard';
    
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
      hour12: true
    }).toLowerCase();

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
    let paths: string[] = [];
    if (selectedCategory === 'Audit Aspects') {
      paths = ['/revenues', '/expenses', '/profitability'];
    } else if (selectedCategory === 'Financial Statements') {
      paths = ['/incomeStatement', '/balanceSheet', '/cashFlow'];
    } else if (selectedCategory === 'Business Analytics') {
      paths = ['/production', '/operations', '/finance'];
    }
    navigate(paths[newValue]);
  };

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    const value = event.target.value as string;
    setSelectedCategory(value);
    setTabIndex(0);
    if (value === 'Audit Aspects') navigate('/revenues');
    else if (value === 'Financial Statements') navigate('/incomeStatement');
    else if (value === 'Business Analytics') navigate('/production');
  };

  const getTabs = () => {
    const tabStyles = (index: number) => ({
      fontSize: isSmallMobile ? '11px' : isMobile ? '13px' : '15px',
      padding: isSmallMobile ? '4px 6px' : isMobile ? '6px 8px' : '6px 12px',
      minWidth: 'unset',
      fontWeight: tabIndex === index ? 'bold' : 'normal',
      textTransform: 'none'
    });

    return (
      <>
        {selectedCategory === 'Audit Aspects' && (
          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            sx={{ minWidth: 'unset' }}
            TabIndicatorProps={{ style: { display: 'none' } }}
          >
            <Tab label={isSmallMobile ? 'Revenues' : 'Revenues'} sx={tabStyles(0)} />
            <Tab label={isSmallMobile ? 'Expenses' : 'Expenses'} sx={tabStyles(1)} />
            <Tab label={isSmallMobile ? 'Profitability' : 'Profitability'} sx={tabStyles(2)} />
          </Tabs>
        )}
        {selectedCategory === 'Financial Statements' && (
          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            sx={{ minWidth: 'unset' }}
            TabIndicatorProps={{ style: { display: 'none' } }}
          >
            <Tab label={isSmallMobile ? 'Income Stmt' : 'Income Stmt'} sx={tabStyles(0)} />
            <Tab label={isSmallMobile ? 'Balance Sheet' : 'Balance Sheet'} sx={tabStyles(1)} />
            <Tab label={isSmallMobile ? 'Cash Flow' : 'Cash Flow'} sx={tabStyles(2)} />
          </Tabs>
        )}
        {selectedCategory === 'Business Analytics' && (
          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            sx={{ minWidth: 'unset' }}
            TabIndicatorProps={{ style: { display: 'none' } }}
          >
            <Tab label={isSmallMobile ? 'Ratios' : 'Ratios'} sx={tabStyles(0)} />
            <Tab label={isSmallMobile ? 'Variance' : 'Variance'} sx={tabStyles(1)} />
            <Tab label={isSmallMobile ? 'Sensitivity' : 'Sensitivity'} sx={tabStyles(2)} />
          </Tabs>
        )}
      </>
    );
  };

  const pathsWithoutTabs = ['/datasets', '/jobcardDetail', '/datasetsCollection'];
  const shouldShowTabs = (currentTitle === 'Dashboard') && !pathsWithoutTabs.includes(location.pathname);
  const shouldShowMisTabs = (currentTitle === 'mis_dashboard') && !pathsWithoutTabs.includes(location.pathname);

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
      <Toolbar sx={{ 
        gap: { xs: 0.5, sm: 1, md: 2 },
        padding: { xs: '8px', sm: '12px', md: '16px' },
        minHeight: { xs: '56px', sm: '64px' }
      }}>
        {isTablet && (
          <IconButton edge="start" onClick={onMenuClick} sx={{ mr: { xs: 0.5, sm: 1 } }}>
            <MenuIcon size={isMobile ? 20 : 24} />
          </IconButton>
        )}

        {shouldShowTabs ? (
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' }, 
            alignItems: { xs: 'flex-start', sm: 'center' },
            gap: { xs: 1, sm: 2 },
            width: { xs: '100%', sm: 'auto' }
          }}>
            <Select
              value={selectedCategory}
              onChange={handleCategoryChange}
              sx={{
                width: { xs: '100%', sm: '160px', md: '200px' },
                fontSize: { xs: '12px', sm: '14px' },
                height: '40px',
                '& .MuiSelect-select': {
                  padding: { xs: '8px 12px', sm: '10px 16px' }
                }
              }}
              size="small"
            >
              <MenuItem value="Audit Aspects">Audit Aspects</MenuItem>
              <MenuItem value="Financial Statements">Financial Statements</MenuItem>
              <MenuItem value="Business Analytics">Business Analytics</MenuItem>
            </Select>
            <Box sx={{ width: { xs: '100%', sm: 'auto' } }}>
              {getTabs()}
            </Box>
          </Box>
        ) : (
          <Typography variant="h6" component="div" sx={{ 
            width: { xs: '100px', sm: '23%' },
            fontSize: { xs: '1rem', sm: '1.25rem' }
          }}>
            {shouldShowMisTabs ? 'MIS Dashboard' : currentTitle}
          </Typography>
        )}

        <Box sx={{ flexGrow: 1 }} />

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: { xs: 0.5, sm: 1, md: 2 },
            flexWrap: 'nowrap',
            justifyContent: 'flex-end'
          }}
        >
          {!isMobile && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                borderRadius: 1,
                p: { xs: 0.5, sm: 1 },
                boxShadow: `
                  2.5px 2.5px 5px 0px #A7AABB80 inset,
                  -2.5px -2.5px 5px 0px #FAFBFF inset
                `,
                width: { xs: '160px', sm: '200px', md: '300px' }
              }}
            >
              <Search size={20} style={{ color: '#6B7280' }} />
              <InputBase
                placeholder="Search..."
                sx={{
                  ml: 0,
                  flex: 1,
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  '& input': { 
                    padding: { xs: '2px 4px', sm: '4px 8px' } 
                  }
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
              padding: { xs: '4px 8px', sm: '6px 12px', md: '6px 16px' },
              boxShadow: `
                4px 4px 20px 0px #6F8CB069,
                -6px -6px 20px 0px #FFFFFF,
                2px 2px 4px 0px #728EAB1A
              `,
              width: { xs: 'auto', sm: '120px' },
              height: '40px',
              minWidth: { xs: 'unset', sm: '120px' }
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
                marginRight: { xs: '4px', sm: '8px' }
              }}
            >
              <Clock size={isMobile ? 16 : 20} />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                color: 'white'
              }}
            >
              <Typography sx={{ 
                fontSize: { xs: '10px', sm: '12px' }, 
                fontWeight: 700, 
                lineHeight: 1.2,
                display: { xs: 'none', sm: 'block' }
              }}>
                Check-in
              </Typography>
              <Typography sx={{ 
                fontSize: { xs: '9px', sm: '10px' }, 
                opacity: 0.9, 
                lineHeight: 1.2 
              }}>
                {formatTime(currentTime)}
              </Typography>
            </Box>
          </Button>

          <IconButton
            sx={{
              bgcolor: '#E7EBF0',
              boxShadow: '4px 4px 20px 0px #6F8CB069, -6px -6px 20px 0px #FFFFFF, 2px 2px 4px 0px #728EAB1A',
              display: { xs: 'none', sm: 'flex' },
              p: { xs: '6px', sm: '8px' }
            }}
          >
            <Bell size={isMobile ? 18 : 20} />
          </IconButton>

          <Box
            component="img"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="Profile"
            sx={{
              width: { xs: '32px', sm: '40px' },
              height: { xs: '32px', sm: '40px' },
              borderRadius: '50%',
              display: 'block'
            }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;