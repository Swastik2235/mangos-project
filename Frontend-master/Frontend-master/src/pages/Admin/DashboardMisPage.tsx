// import React, { FC, useState } from 'react';
// import { Tabs, Tab, Box, Stack, Typography } from '@mui/material';
// import { ProductionMis, OperationsMis, FinanceMis, InputMis } from './DashboardMIS'; // Assuming this is where the components are defined
// import OperationHighlight from '../../assets/Operation-Highlight.png';
// import ProductionDashboard from '../../assets/Production-Dashboard.png';
// import FinanceHighlights from '../../assets/Finance-Highlights.png';

// const DashboardMis: FC = () => {
//   const [isImageClicked, setIsImageClicked] = useState(false);
//   const [tabIndex, setTabIndex] = useState(1); // Default to "Operations" tab when the image is clicked

//   const handleTabChange = (_event: React.SyntheticEvent, newIndex: number) => {
//     setTabIndex(newIndex);
//   };

//   const handleImageClick = () => {
//     setIsImageClicked(true);
//     setTabIndex(1); // Redirect to "Operations" tab
//   };

//   const handleImageClickProduct = () => {
//     setIsImageClicked(true);
//     setTabIndex(0); // Redirect to "Production" tab
//   };

//   const handleImageClickFinance = () => {
//     setIsImageClicked(true);
//     setTabIndex(2); // Redirect to "Finance" tab
//   };

//   return (
//     <Box>
//       {!isImageClicked ? (
//         <Box
//           sx={{
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             height: '100vh',
//             padding: 2, // Padding for smaller screens
//           }}
//         >
//           <Stack
//             direction={{ xs: 'column', sm: 'row' }} // Display block for mobile (column direction)
//             spacing={4}
//             sx={{
//               width: '100%',
//               justifyContent: 'center',
//               alignItems: 'center',
//             }}
//           >
//             <Box
//               sx={{
//                 textAlign: 'center',
//                 marginTop: { xs: '0%', sm: '10%' }, // Adjust margin for responsiveness
//                 display: 'block', // Ensure block display for mobile
//               }}
//             >
//               <Typography variant="h4" component="div" gutterBottom>
//                 Operation Highlight
//               </Typography>
//               <img
//                 src={OperationHighlight}
//                 alt="Operation Highlight"
//                 style={{ height: '300px', display: 'block', maxWidth: '100%' }}
//                 onClick={handleImageClick} // Call handleImageClick when this image is clicked
//               />
//             </Box>

//             <Box
//               sx={{
//                 textAlign: 'center',
//                 display: 'block', // Ensure block display for mobile
//               }}
//             >
//               <Typography variant="h4" component="div" gutterBottom>
//                 Production Dashboard
//               </Typography>
//               <img
//                 src={ProductionDashboard}
//                 alt="Production Dashboard"
//                 style={{ height: '600px', display: 'block', maxWidth: '100%' }}
//                 onClick={handleImageClickProduct} // Call handleImageClickProduct when this image is clicked
//               />
//             </Box>

//             <Box
//               sx={{
//                 textAlign: 'center',
//                 marginTop: { xs: '0%', sm: '10%' }, // Adjust margin for responsiveness
//                 display: 'block', // Ensure block display for mobile
//               }}
//             >
//               <Typography variant="h4" component="div" gutterBottom>
//                 Finance Highlights
//               </Typography>
//               <img
//                 src={FinanceHighlights}
//                 alt="Finance Highlights"
//                 style={{ height: '300px', display: 'block', maxWidth: '100%' }}
//                 onClick={handleImageClickFinance} // Call handleImageClickFinance when this image is clicked
//               />
//             </Box>
//           </Stack>
//         </Box>
//       ) : (
//      <Box>
//           <Tabs value={tabIndex} onChange={handleTabChange} 
//           variant="scrollable" 
//           scrollButtons="auto" 
//           sx={{ width: 'auto' }}
//           >
//             <Tab label="Production" />
//             <Tab label="Operations" />
//             <Tab label="Finance" />
//              <Tab label="Input" sx={{ marginLeft: 'auto' }} />


//           </Tabs>
//           <Box sx={{ mt: 2 }}>
//             {tabIndex === 0 && <ProductionMis />}
//             {tabIndex === 1 && <OperationsMis />}
//             {tabIndex === 2 && <FinanceMis />}
//             {tabIndex === 3 && <InputMis />}
//           </Box>
//         </Box>
//       )}
//     </Box>
//   );
// };

// export default DashboardMis;
import React, { FC, useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import { ProductionMis, OperationsMis, FinanceMis, InputMis } from './DashboardMIS';

const DashboardMis: FC = () => {
  const [tabIndex, setTabIndex] = useState(0); // Default to "Production" tab

  const handleTabChange = (_event: React.SyntheticEvent, newIndex: number) => {
    setTabIndex(newIndex);
  };

  return (
    <Box>
 <Tabs
  value={tabIndex}
  onChange={handleTabChange}
  variant="scrollable"
  scrollButtons="auto"
  sx={{ width: 'auto' }}
  TabIndicatorProps={{ style: { display: 'none' } }}
>
  <Tab
    label="Production"
    sx={{
      textTransform: 'none',
      fontSize: '1.05rem',
      fontWeight: tabIndex === 0 ? 600 : 400,
      '&:hover': {
        fontWeight: 600,
      },
    }}
  />
  <Tab
    label="Operations"
    sx={{
      textTransform: 'none',
      fontSize: '1.05rem',
      fontWeight: tabIndex === 1 ? 600 : 400,
      '&:hover': {
        fontWeight: 600,
      },
    }}
  />
  <Tab
    label="Finance"
    sx={{
      textTransform: 'none',
      fontSize: '1.05rem',
      fontWeight: tabIndex === 2 ? 600 : 400,
      '&:hover': {
        fontWeight: 600,
      },
    }}
  />
  <Tab
    label="Input"
    sx={{
      marginLeft: 'auto',
      textTransform: 'none',
      fontSize: '1.05rem',
      fontWeight: tabIndex === 3 ? 600 : 400,
      '&:hover': {
        fontWeight: 600,
      },
    }}
  />
</Tabs>
  <Box sx={{ mt: 2 }}>
        {tabIndex === 0 && <ProductionMis />}
        {tabIndex === 1 && <OperationsMis />}
        {tabIndex === 2 && <FinanceMis />}
        {tabIndex === 3 && <InputMis />}
      </Box>
    </Box>
  );
};

export default DashboardMis;
