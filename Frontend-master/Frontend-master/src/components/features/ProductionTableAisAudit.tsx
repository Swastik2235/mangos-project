// import React, { useState } from 'react';
// import {
//   Card,
//   CardContent,
//   Typography,
//   Box,
//   // Table,
//   // TableBody,
//   // TableCell,
//   // TableContainer,
//   // TableHead,
//   // TableRow,
//   IconButton,
//   Select,
//   MenuItem,
  
//   // Paper,
// } from '@mui/material';
// import FullscreenIcon from '@mui/icons-material/Fullscreen';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import DocumentList from './DocumentList/DocumentList';
// import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';


// // interface ProductionTableAisAuditRow {
// //   id: number;
// //   type: 'header' | 'subitem';
// //   activity: string;
// //   qty: number;
// //   rate: number;
// //   cumulativeValues: number;
// //   color?: 'blue' | 'orange' | 'green';
// //   dailyValues: {
// //     [key: string]: string;
// //   };
// // }

// // const ProductionTableAisAuditData: ProductionTableAisAuditRow[] = [
// //   {
// //     id: 1,
// //     type: 'header',
// //     activity: 'Sales',
// //     qty: 30,
// //     rate: 191,
// //     cumulativeValues: 191551,
// //     dailyValues: {
// //       '01': '₹10.5 L',
// //       '02': '₹10.5 L',
// //       '03': '₹10.5 L',
// //       '04': '₹10.5 L',
// //       '05': '₹10.5 L',
// //       '06': '₹10.5 L',
// //       '07': '₹10.5 L',
// //     }
// //   },
// //   {
// //     id: 11,
// //     type: 'subitem',
// //     activity: 'Fabrication Total',
// //     qty: 30,
// //     rate: 191,
// //     cumulativeValues: 191551,
// //     color: 'blue',
// //     dailyValues: {
// //       '01': '₹10.5 L',
// //       '02': '₹10.5 L',
// //       '03': '₹10.5 L',
// //       '04': '₹10.5 L',
// //       '05': '₹10.5 L',
// //       '06': '₹10.5 L',
// //       '07': '₹10.5 L',
// //     }
// //   },
// //   {
// //     id: 12,
// //     type: 'subitem',
// //     activity: 'Galva Total',
// //     qty: 30,
// //     rate: 191,
// //     cumulativeValues: 191551,
// //     color: 'blue',
// //     dailyValues: {
// //       '01': '₹10.5 L',
// //       '02': '₹10.5 L',
// //       '03': '₹10.5 L',
// //       '04': '₹10.5 L',
// //       '05': '₹10.5 L',
// //       '06': '₹10.5 L',
// //       '07': '₹10.5 L',
// //     }
// //   },

// //   {
// //     id: 33,
// //     type: 'subitem',
// //     activity: 'Profitability',
// //     qty: 30,
// //     rate: 191,
// //     cumulativeValues: 191551,
// //     color: 'green',
// //     dailyValues: {
// //       '01': '₹10.5 L',
// //       '02': '₹10.5 L',
// //       '03': '₹10.5 L',
// //       '04': '₹10.5 L',
// //       '05': '₹10.5 L',
// //       '06': '₹10.5 L',
// //       '07': '₹10.5 L',
// //     }
// //   }
// // ];

// const ProductionTableAisAudit: React.FC = () => {
//   const [selectedDate, setSelectedDate] = useState('Feb 2025');
//   const [selectedTab, setSelectedTab] = useState('Sales');

//   // const getDotColor = (color?: string) => {
//   //   switch (color) {
//   //     case 'blue':
//   //       return '#2563eb';
//   //     case 'orange':
//   //       return '#f97316';
//   //     case 'green':
//   //       return '#22c55e';
//   //     default:
//   //       return 'transparent';
//   //   }
//   // };

//   // const getBorderColor = (type: string) => {
//   //   switch (type) {
//   //     case 'Sales':
//   //       return '#2563eb';
//   //     case 'Cost':
//   //       return '#f97316';
//   //     case 'Earnings':
//   //       return '#22c55e';
//   //     default:
//   //       return 'transparent';
//   //   }
//   // };

//   return (
//     <Card sx={{ bgcolor: '#E7EBF0', borderRadius: 2, boxShadow: `
//       4px 4px 20px 0px #6F8CB069,
//       -6px -6px 20px 0px #FFFFFF,
//       2px 2px 4px 0px #728EAB1A
//       `, p: 2 }}>
//       <CardContent>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//             <Typography variant="h3" component="h2" sx={{ color: '#1e293b', fontWeight: 600 }}>
//               Highlights
//             </Typography>
//             <Box sx={{ display: 'flex', gap: 2 }}>
//               {['Fabrication', 'Galvanization', 'Solar'].map((tab) => (
//                 <Typography
//                   key={tab}
//                   onClick={() => setSelectedTab(tab)}
//                   sx={{
//                     color: selectedTab === tab ? '#1e293b' : '#64748b',
//                     cursor: 'pointer',
//                     fontWeight: selectedTab === tab ? 600 : 400,
//                   }}
//                 >
//                   {tab}
//                 </Typography>
//               ))}
//             </Box>
//           </Box>
//           <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
           
//             <Select
//                 value={selectedDate}
//                 onChange={(e) => setSelectedDate(e.target.value)}
//                 size="small"
//                 sx={{
//                   minWidth: 120,
//                   bgcolor: '#E7EBF0',
//                   boxShadow: '4px 4px 20px 0px #6F8CB069, -6px -6px 20px 0px #FFFFFF, 2px 2px 4px 0px #728EAB1A',
//                   flexShrink: 0,
//                   borderRadius: 2,
//                 }}
//                 renderValue={(value) => (
//                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                     <CalendarMonthIcon sx={{ fontSize: '16px', color: '#0f172a' }} />
//                     <Typography sx={{ color: '#0f172a' }}>{value}</Typography>
//                   </Box>
//                 )}
//               >
//                 <MenuItem value="Dec 2022">Dec 2022</MenuItem>
//                 <MenuItem value="Jan 2023">Jan 2023</MenuItem>
//                 <MenuItem value="Feb 2023">Feb 2023</MenuItem>
//               </Select>
//             <IconButton size="small">
//               <MoreVertIcon />
//             </IconButton>
//             <IconButton size="small">
//               <FullscreenIcon />
//             </IconButton>
//           </Box>
//         </Box>

//         <DocumentList/>

//       </CardContent>
//     </Card>
//   );
// };

// export default ProductionTableAisAudit;



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
} from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DocumentList from './DocumentList/DocumentList';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const ProductionTableAisAudit: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedDate, setSelectedDate] = useState('Feb 2025');
  const [selectedTab, setSelectedTab] = useState('Sales');

  return (
    <Card sx={{ 
      bgcolor: '#E7EBF0', 
      borderRadius: 2, 
      boxShadow: `
        4px 4px 20px 0px #6F8CB069,
        -6px -6px 20px 0px #FFFFFF,
        2px 2px 4px 0px #728EAB1A
      `, 
      p: isMobile ? 1 : 2 
    }}>
      <CardContent sx={{ p: isMobile ? 1 : 2 }}>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row', 
          justifyContent: 'space-between', 
          alignItems: isMobile ? 'flex-start' : 'center', 
          mb: 3,
          gap: isMobile ? 2 : 0
        }}>
          <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'flex-start', gap: 2 }}>
            <Typography variant={isMobile ? "h5" : "h3"} component="h2" sx={{ color: '#1e293b', fontWeight: 600 }}>
              Highlights
            </Typography>
            <Box sx={{ 
              display: 'flex', 
              gap: 2,
              flexWrap: isMobile ? 'wrap' : 'nowrap',
              ml: isMobile ? 0 : 2
            }}>
              {['Fabrication', 'Galvanization', 'Solar'].map((tab) => (
                <Typography
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  variant={isMobile ? "body2" : "body1"}
                  sx={{
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
          <Box sx={{ 
            display: 'flex', 
            gap: 2, 
            alignItems: 'center',
            width: isMobile ? '100%' : 'auto',
            justifyContent: isMobile ? 'space-between' : 'flex-end',
            mt: isMobile ? 1 : 0
          }}>
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
                  <Typography sx={{ color: '#0f172a', fontSize: isMobile ? '0.75rem' : 'inherit' }}>
                    {value}
                  </Typography>
                </Box>
              )}
            >
              <MenuItem value="Dec 2022">Dec 2022</MenuItem>
              <MenuItem value="Jan 2023">Jan 2023</MenuItem>
              <MenuItem value="Feb 2023">Feb 2023</MenuItem>
            </Select>
            <Box>
              <IconButton size="small">
                <MoreVertIcon fontSize={isMobile ? "small" : "medium"} />
              </IconButton>
              <IconButton size="small">
                <FullscreenIcon fontSize={isMobile ? "small" : "medium"} />
              </IconButton>
            </Box>
          </Box>
        </Box>

<DocumentList />
      </CardContent>
    </Card>
  );
};

export default ProductionTableAisAudit;