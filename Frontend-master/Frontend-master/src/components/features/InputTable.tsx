// import React, { useState } from 'react';
// import {
//   Card,
//   CardContent,
//   Typography,
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   IconButton,
//   Select,
//   MenuItem,
//   Paper,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button
// } from '@mui/material';

// import FileDownloadIcon from '@mui/icons-material/FileDownload';

// interface DailyValue {
//   amount: string;
//   quantity: string;
// }
// interface ProductionTableRow {
//   id: number;
//   type: 'header' | 'subitem';
//   activity: string;
//   qty: number;
//   rate: number;
//   cumulativeValues: number;
//   color?: 'blue' | 'orange' | 'green';
//   dailyValues: {
//     [key: string]: DailyValue;
//   };
// }

// const productionTableData: ProductionTableRow[] = [
//   {
//     id: 1,
//     type: 'header',
//     activity: 'costs',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     dailyValues: {}
//   },
//   {
//     id: 11,
//     type: 'subitem',
//     activity: 'Fabrication Total',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     color: 'blue',
//     dailyValues: {}
//   },
//   {
//     id: 12,
//     type: 'subitem',
//     activity: 'Galva Total',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     color: 'blue',
//     dailyValues: {}
//   },
//   {
//     id: 13,
//     type: 'subitem',
//     activity: 'Scrap',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     color: 'blue',
//     dailyValues: {}
//   },
//   {
//     id: 10,
//     type: 'subitem',
//     activity: 'Solar',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     color: 'blue',
//     dailyValues: {}
//   },
//   {
//     id: 2,
//     type: 'header',
//     activity: 'Critical Cost',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     dailyValues: {}
//   },
//   {
//     id: 21,
//     type: 'subitem',
//     activity: 'Critical cost parameter',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     color: 'orange',
//     dailyValues: {}
//   },
//   {
//     id: 22,
//     type: 'subitem',
//     activity: 'Manpower cost',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     color: 'orange',
//     dailyValues: {}
//   },
//   {
//     id: 23,
//     type: 'subitem',
//     activity: 'Spare consumable and waste disposal',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     color: 'orange',
//     dailyValues: {}
//   },
//   {
//     id: 3,
//     type: 'header',
//     activity: 'Planning',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     dailyValues: {}
//   },
//   {
//     id: 31,
//     type: 'subitem',
//     activity: 'Total sales',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     color: 'blue',
//     dailyValues: {}
//   },
//   {
//     id: 32,
//     type: 'subitem',
//     activity: 'Total cost',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     color: 'orange',
//     dailyValues: {}
//   },
//   {
//     id: 33,
//     type: 'subitem',
//     activity: 'Profitability',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     color: 'green',
//     dailyValues: {}
//   }
// ];

// const tabToHeader: Record<string, string> = {
//   'Costs': 'costs',
//   'Critical Costs': 'Critical Cost',
//   'Planning': 'Planning',
// };

// const InputTable: React.FC = () => {
//   const [selectedDate, setSelectedDate] = useState('Dec 2022');
//   const [selectedTab, setSelectedTab] = useState('Costs');
//     const [open, setOpen] = useState(false); // popup state


//   // Filter data based on selected tab
//   const filteredRows = React.useMemo(() => {
//     const headerIndex = productionTableData.findIndex(
//       (row) => row.type === 'header' && row.activity === tabToHeader[selectedTab]
//     );
//     if (headerIndex === -1) return [];
//     const rows: ProductionTableRow[] = [];
//     for (
//       let i = headerIndex;
//       i < productionTableData.length &&
//       (i === headerIndex || productionTableData[i].type === 'subitem');
//       i++
//     ) {
//       rows.push(productionTableData[i]);
//       if (
//         i !== headerIndex &&
//         productionTableData[i + 1] &&
//         productionTableData[i + 1].type === 'header'
//       ) {
//         break;
//       }
//     }
//     return rows;
//   }, [selectedTab]);

// const getDotColor = (color?: string) => {
//     switch (color) {
//       case 'blue':
//         return '#2563eb';
//       case 'orange':
//         return '#f97316';
//       case 'green':
//         return '#22c55e';
//       default:
//         return 'transparent';
//     }
//   };



//   return (
//     <Card sx={{
//       bgcolor: '#E7EBF0', borderRadius: 2, boxShadow: `
//       4px 4px 20px 0px #6F8CB069,
//       -6px -6px 20px 0px #FFFFFF,
//       2px 2px 4px 0px #728EAB1A
//       `, p: 2
//     }}>
//       <CardContent>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
//         <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1 }}>
//   <Box sx={{ display: 'flex', gap: 2 }}>
//     {['Costs', 'Critical Costs', 'Planning'].map((tab) => (
//       <Typography
//         key={tab}
//         onClick={() => setSelectedTab(tab)}
//         sx={{
//           color: selectedTab === tab ? '#1e293b' : '#64748b',
//           cursor: 'pointer',
//           fontWeight: selectedTab === tab ? 600 : 400,
//         }}
//       >
//         {tab}
//       </Typography>
//     ))}
//   </Box>
//   <Box sx={{ display: 'flex', gap: 4, mt: 1 }}>
//     <Typography sx={{ fontWeight: 600, color: '#64748b' }}>Daily</Typography>
//     <Typography sx={{ fontWeight: 600, color: '#64748b' }}>Quantity</Typography>
//     <Typography sx={{ fontWeight: 600, color: '#64748b' }}>Updates</Typography>
//   </Box>
// </Box>
// <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
//   <IconButton size="small">
//     <FileDownloadIcon />
//   </IconButton>
//   <Select
//     value={selectedDate}
//     onChange={(e) => setSelectedDate(e.target.value)}
//     size="small"
//     sx={{
//       minWidth: 120, bgcolor: '#E7EBF0',
//       boxShadow: '4px 4px 20px 0px #6F8CB069, -6px -6px 20px 0px #FFFFFF, 2px 2px 4px 0px #728EAB1A'
//     }}
//   >
//     <MenuItem value="Dec 2022">Dec 2022</MenuItem>
//   </Select>
//   {/* Archive button */}
//   <button
//     style={{
//       background: '#64748b',
//       color: '#fff',
//       border: 'none',
//       borderRadius: 4,
//       padding: '6px 16px',
//       fontWeight: 600,
//       cursor: 'pointer'
//     }}
//   >
//     Archive
//   </button>
// </Box>
//         </Box>

//         <TableContainer component={Paper} sx={{ boxShadow: 'none', bgcolor: '#E7EBF0' }}>
//           <Table sx={{ minWidth: 650 }} size="small">
//             <TableHead>
//   <TableRow>
//     <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Sr. no.</TableCell>
//     <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Components</TableCell> {/* activity -> Components */}
//     <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Unit</TableCell>       {/* qty -> Unit */}
//     <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Previous Day</TableCell> {/* rate -> Previous Day */}
//     <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Edit</TableCell>       {/* cumulativeValues -> Edit */}
//   </TableRow>
// </TableHead>

// <TableBody>
//   {filteredRows.map((row) => {
//     const isHeader = row.type === 'header';
//     const borderColor = isHeader ? '#d1d5db' : 'transparent';

//     return (
//       <TableRow
//         key={row.id}
//         sx={{
//           '&:last-child td, &:last-child th': { border: 0 },
//           borderBottom: isHeader ? `2px solid ${borderColor}` : 'none',
//           bgcolor: 'transparent',
//         }}
//       >
//         <TableCell>
//           {isHeader ? (
//             <Typography sx={{ color: '#000', fontWeight: 600 }}>
//               {row.id}
//             </Typography>
//           ) : (
//             <Box sx={{ display: 'flex', alignItems: 'center', pl: 0 }}>
//               <Box
//                 sx={{
//                   width: 6,
//                   height: 6,
//                   borderRadius: '50%',
//                   bgcolor: getDotColor(row.color),
//                   mr: 1,
//                 }}
//               />
//             </Box>
//           )}
//         </TableCell>

//         {/* Components */}
//         <TableCell>
//           <Typography
//             sx={{
//               color: isHeader ? '#000' : '#64748b',
//               fontWeight: isHeader ? 600 : 400,
//               fontSize: 13,
//             }}
//           >
//             {row.activity}
//           </Typography>
//         </TableCell>

//         {/* Unit */}
//         <TableCell>
//           <Typography sx={{ color: '#1e293b', fontWeight: 500, fontSize: 11 }}>
//             {row.qty}
//           </Typography>
//         </TableCell>

//         {/* Previous Day */}
//         <TableCell>
//           <Typography sx={{ color: '#1e293b', fontWeight: 500, fontSize: 11 }}>
//             {row.rate}
//           </Typography>
//         </TableCell>

//         {/* Edit */}
//         <TableCell>
//           <Typography sx={{ color: '#1e293b', fontWeight: 500, fontSize: 11 }}>
//             {row.cumulativeValues}
//           </Typography>
//         </TableCell>
//       </TableRow>
//     );
//   })}
// </TableBody>
//           </Table>
//         </TableContainer>
//           <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
//           <button
//             style={{
//               background: '#60a5fa',
//               color: '#fff',
//               border: 'none',
//               borderRadius: 4,
//               padding: '8px 32px',
//               fontWeight: 600,
//               fontSize: 16,
//               cursor: 'pointer'
//             }}
//             onClick={() => setOpen(true)}
//           >
//             Submit
//           </button>
//         </Box>
//         {/* Popup Dialog */}
//         <Dialog open={open} onClose={() => setOpen(false)}>
//           <DialogTitle>Daily MIS Updated</DialogTitle>
//           <DialogContent>
//             <Typography>Your data has been submitted successfully.</Typography>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setOpen(false)} variant="contained" color="primary">
//               Close
//             </Button>
//           </DialogActions>
//                   </Dialog>


//       </CardContent>
//     </Card>
//   );
// };

// export default InputTable;

// import React, { useState } from 'react';
// import {
//   Card,
//   CardContent,
//   Typography,
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   IconButton,
//   Select,
//   MenuItem,
//   Paper,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   TextField
// } from '@mui/material';
// import FileDownloadIcon from '@mui/icons-material/FileDownload';

// interface DailyValue {
//   amount: string;
//   quantity: string;
// }

// interface ProductionTableRow {
//   id: number;
//   type: 'header' | 'subitem';
//   activity: string;
//   qty: number;
//   rate: number;
//   cumulativeValues: number;
//   color?: 'blue' | 'orange' | 'green';
//   dailyValues: {
//     [key: string]: DailyValue;
//   };
//   category: 'Sales' | 'Cost' | 'Earnings';
// }

// const productionTableData: ProductionTableRow[] = [
//   {
//     id: 1,
//     type: 'header',
//     activity: 'Sales',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     category: 'Sales',
//     dailyValues: {
//       '01': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '02': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '03': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '04': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '05': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '06': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '07': { quantity: '10.5 MT', amount: '₹10.5 L' },
//     }
//   },
//   {
//     id: 11,
//     type: 'subitem',
//     activity: 'Fabrication Total',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     color: 'blue',
//     category: 'Sales',
//     dailyValues: {
//       '01': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '02': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '03': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '04': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '05': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '06': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '07': { quantity: '10.5 MT', amount: '₹10.5 L' },
//     }
//   },
//   {
//     id: 12,
//     type: 'subitem',
//     activity: 'Galva Total',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     color: 'blue',
//     category: 'Sales',
//     dailyValues: {
//       '01': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '02': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '03': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '04': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '05': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '06': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '07': { quantity: '10.5 MT', amount: '₹10.5 L' },
//     }
//   },
//   {
//     id: 13,
//     type: 'subitem',
//     activity: 'Scrap',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     color: 'blue',
//     category: 'Sales',
//     dailyValues: {
//       '01': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '02': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '03': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '04': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '05': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '06': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '07': { quantity: '10.5 MT', amount: '₹10.5 L' },
//     }
//   },
//   {
//     id: 10,
//     type: 'subitem',
//     activity: 'Solar',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     color: 'blue',
//     category: 'Sales',
//     dailyValues: {
//       '01': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '02': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '03': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '04': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '05': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '06': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '07': { quantity: '10.5 MT', amount: '₹10.5 L' },
//     }
//   },
//   {
//     id: 2,
//     type: 'header',
//     activity: 'Cost',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     category: 'Cost',
//     dailyValues: {
//       '01': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '02': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '03': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '04': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '05': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '06': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '07': { quantity: '10.5 MT', amount: '₹10.5 L' },
//     }
//   },
//   {
//     id: 21,
//     type: 'subitem',
//     activity: 'Critical cost parameter',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     color: 'orange',
//     category: 'Cost',
//     dailyValues: {
//       '01': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '02': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '03': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '04': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '05': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '06': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '07': { quantity: '10.5 MT', amount: '₹10.5 L' },
//     }
//   },
//   {
//     id: 22,
//     type: 'subitem',
//     activity: 'Manpower cost',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     color: 'orange',
//     category: 'Cost',
//     dailyValues: {
//       '01': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '02': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '03': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '04': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '05': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '06': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '07': { quantity: '10.5 MT', amount: '₹10.5 L' },
//     }
//   },
//   {
//     id: 23,
//     type: 'subitem',
//     activity: 'Spare consumable and waste disposal',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     color: 'orange',
//     category: 'Cost',
//     dailyValues: {
//       '01': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '02': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '03': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '04': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '05': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '06': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '07': { quantity: '10.5 MT', amount: '₹10.5 L' },
//     }
//   },
//   {
//     id: 3,
//     type: 'header',
//     activity: 'Earnings',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     category: 'Earnings',
//     dailyValues: {
//       '01': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '02': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '03': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '04': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '05': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '06': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '07': { quantity: '10.5 MT', amount: '₹10.5 L' },
//     }
//   },
//   {
//     id: 31,
//     type: 'subitem',
//     activity: 'Total sales',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     color: 'blue',
//     category: 'Earnings',
//     dailyValues: {
//       '01': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '02': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '03': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '04': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '05': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '06': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '07': { quantity: '10.5 MT', amount: '₹10.5 L' },
//     }
//   },
//   {
//     id: 32,
//     type: 'subitem',
//     activity: 'Total cost',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     color: 'orange',
//     category: 'Earnings',
//     dailyValues: {
//       '01': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '02': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '03': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '04': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '05': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '06': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '07': { quantity: '10.5 MT', amount: '₹10.5 L' },
//     }
//   },
//   {
//     id: 33,
//     type: 'subitem',
//     activity: 'Profitability',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     color: 'green',
//     category: 'Earnings',
//     dailyValues: {
//       '01': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '02': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '03': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '04': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '05': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '06': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '07': { quantity: '10.5 MT', amount: '₹10.5 L' },
//     }
//   }
// ];

// const months = [
//   'Jan 2023', 'Feb 2023', 'Mar 2023', 'Apr 2023', 
//   'May 2023', 'Jun 2023', 'Jul 2023', 'Aug 2023',
//   'Sep 2023', 'Oct 2023', 'Nov 2023', 'Dec 2023'
// ];

// const InputTable: React.FC = () => {
//   const [selectedDate, setSelectedDate] = useState(months[0]);
//   const [selectedTab, setSelectedTab] = useState<'Sales' | 'Cost' | 'Earnings'>('Sales');
//   const [open, setOpen] = useState(false);
//   const [editableData, setEditableData] = useState<ProductionTableRow[]>(productionTableData);

//   // Filter data based on selected tab
//   const filteredRows = React.useMemo(() => {
//     return editableData.filter(row => 
//       row.category === selectedTab || 
//       (row.type === 'header' && row.activity === selectedTab)
//     );
//   }, [selectedTab, editableData]);

//   const getDotColor = (color?: string) => {
//     switch (color) {
//       case 'blue': return '#2563eb';
//       case 'orange': return '#f97316';
//       case 'green': return '#22c55e';
//       default: return 'transparent';
//     }
//   };

//   const handleValueChange = (id: number, field: 'qty' | 'rate' | 'cumulativeValues', value: number) => {
//     setEditableData(prevData => 
//       prevData.map(row => 
//         row.id === id ? { ...row, [field]: value } : row
//       )
//     );
//   };

//   const handleDailyValueChange = (id: number, day: string, field: keyof DailyValue, value: string) => {
//     setEditableData(prevData => 
//       prevData.map(row => {
//         if (row.id === id) {
//           const updatedDailyValues = { ...row.dailyValues };
//           updatedDailyValues[day] = { 
//             ...updatedDailyValues[day], 
//             [field]: value 
//           };
//           return { ...row, dailyValues: updatedDailyValues };
//         }
//         return row;
//       })
//     );
//   };

//   return (
//     <Card sx={{
//       bgcolor: '#E7EBF0', borderRadius: 2, boxShadow: `
//       4px 4px 20px 0px #6F8CB069,
//       -6px -6px 20px 0px #FFFFFF,
//       2px 2px 4px 0px #728EAB1A
//       `, p: 2
//     }}>
//       <CardContent>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
//           <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1 }}>
//             <Box sx={{ display: 'flex', gap: 2 }}>
//               {['Sales', 'Cost', 'Earnings'].map((tab) => (
//                 <Typography
//                   key={tab}
//                   onClick={() => setSelectedTab(tab as 'Sales' | 'Cost' | 'Earnings')}
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
//             <Box sx={{ display: 'flex', gap: 4, mt: 1 }}>
//               <Typography sx={{ fontWeight: 600, color: '#64748b' }}>Daily</Typography>
//               <Typography sx={{ fontWeight: 600, color: '#64748b' }}>Quantity</Typography>
//               <Typography sx={{ fontWeight: 600, color: '#64748b' }}>Updates</Typography>
//             </Box>
//           </Box>
//           <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
//             <IconButton size="small">
//               <FileDownloadIcon />
//             </IconButton>
//             <Select
//               value={selectedDate}
//               onChange={(e) => setSelectedDate(e.target.value)}
//               size="small"
//               sx={{
//                 minWidth: 120, bgcolor: '#E7EBF0',
//                 boxShadow: '4px 4px 20px 0px #6F8CB069, -6px -6px 20px 0px #FFFFFF, 2px 2px 4px 0px #728EAB1A'
//               }}
//             >
//               {months.map(month => (
//                 <MenuItem key={month} value={month}>{month}</MenuItem>
//               ))}
//             </Select>
//             <button
//               style={{
//                 background: '#64748b',
//                 color: '#fff',
//                 border: 'none',
//                 borderRadius: 4,
//                 padding: '6px 16px',
//                 fontWeight: 600,
//                 cursor: 'pointer'
//               }}
//             >
//               Archive
//             </button>
//           </Box>
//         </Box>

//         <TableContainer component={Paper} sx={{ boxShadow: 'none', bgcolor: '#E7EBF0' }}>
//           <Table sx={{ minWidth: 650 }} size="small">
//             <TableHead>
//               <TableRow>
//                 <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Sr. no.</TableCell>
//                 <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Components</TableCell>
//                 <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Unit</TableCell>
//                 <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Previous Day</TableCell>
//                 <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Edit</TableCell>
//               </TableRow>
//             </TableHead>

//             <TableBody>
//               {filteredRows.map((row) => {
//                 const isHeader = row.type === 'header';
//                 const borderColor = isHeader ? '#d1d5db' : 'transparent';

//                 return (
//                   <TableRow
//                     key={row.id}
//                     sx={{
//                       '&:last-child td, &:last-child th': { border: 0 },
//                       borderBottom: isHeader ? `2px solid ${borderColor}` : 'none',
//                       bgcolor: 'transparent',
//                     }}
//                   >
//                     <TableCell>
//                       {isHeader ? (
//                         <Typography sx={{ color: '#000', fontWeight: 600 }}>
//                           {row.id}
//                         </Typography>
//                       ) : (
//                         <Box sx={{ display: 'flex', alignItems: 'center', pl: 0 }}>
//                           <Box
//                             sx={{
//                               width: 6,
//                               height: 6,
//                               borderRadius: '50%',
//                               bgcolor: getDotColor(row.color),
//                               mr: 1,
//                             }}
//                           />
//                         </Box>
//                       )}
//                     </TableCell>

//                     <TableCell>
//                       <Typography
//                         sx={{
//                           color: isHeader ? '#000' : '#64748b',
//                           fontWeight: isHeader ? 600 : 400,
//                           fontSize: 13,
//                         }}
//                       >
//                         {row.activity}
//                       </Typography>
//                     </TableCell>

//                     <TableCell>
//                       <TextField
//                         size="small"
//                         value={row.qty}
//                         onChange={(e) => handleValueChange(row.id, 'qty', Number(e.target.value))}
//                         sx={{ width: 80 }}
//                         type="number"
//                       />
//                     </TableCell>

//                     <TableCell>
//                       <TextField
//                         size="small"
//                         value={row.rate}
//                         onChange={(e) => handleValueChange(row.id, 'rate', Number(e.target.value))}
//                         sx={{ width: 80 }}
//                         type="number"
//                       />
//                     </TableCell>

//                     <TableCell>
//                       <TextField
//                         size="small"
//                         value={row.cumulativeValues}
//                         onChange={(e) => handleValueChange(row.id, 'cumulativeValues', Number(e.target.value))}
//                         sx={{ width: 80 }}
//                         type="number"
//                       />
//                     </TableCell>
//                   </TableRow>
//                 );
//               })}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
//           <button
//             style={{
//               background: '#60a5fa',
//               color: '#fff',
//               border: 'none',
//               borderRadius: 4,
//               padding: '8px 32px',
//               fontWeight: 600,
//               fontSize: 16,
//               cursor: 'pointer'
//             }}
//             onClick={() => setOpen(true)}
//           >
//             Submit
//           </button>
//         </Box>

//         <Dialog open={open} onClose={() => setOpen(false)}>
//           <DialogTitle>Daily MIS Updated</DialogTitle>
//           <DialogContent>
//             <Typography>Your data has been submitted successfully.</Typography>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setOpen(false)} variant="contained" color="primary">
//               Close
//             </Button>
//           </DialogActions>
//         </Dialog>
//       </CardContent>
//     </Card>
//   );
// };

// export default InputTable;


// import React, { useState } from 'react';
// import {
//   Card,
//   CardContent,
//   Typography,
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   IconButton,
//   Select,
//   MenuItem,
//   Paper,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   TextField
// } from '@mui/material';
// import FileDownloadIcon from '@mui/icons-material/FileDownload';
// import AddIcon from '@mui/icons-material/Add';

// interface DailyValue {
//   amount: string;
//   quantity: string;
// }

// interface ProductionTableRow {
//   id: number;
//   type: 'header' | 'subitem';
//   activity: string;
//   qty: number;
//   rate: number;
//   cumulativeValues: number;
//   color?: 'blue' | 'orange' | 'green';
//   dailyValues: {
//     [key: string]: DailyValue;
//   };
//   category: 'Sales' | 'Cost' | 'Earnings';
// }

// const initialProductionTableData: ProductionTableRow[] = [
//   {
//     id: 1,
//     type: 'header',
//     activity: 'Sales',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     category: 'Sales',
//     dailyValues: {
//       '01': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '02': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '03': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '04': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '05': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '06': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '07': { quantity: '10.5 MT', amount: '₹10.5 L' },
//     }
//   },
//   {
//     id: 11,
//     type: 'subitem',
//     activity: 'Fabrication Total',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     color: 'blue',
//     category: 'Sales',
//     dailyValues: {
//       '01': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '02': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '03': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '04': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '05': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '06': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '07': { quantity: '10.5 MT', amount: '₹10.5 L' },
//     }
//   },
//   {
//     id: 12,
//     type: 'subitem',
//     activity: 'Galva Total',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     color: 'blue',
//     category: 'Sales',
//     dailyValues: {
//       '01': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '02': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '03': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '04': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '05': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '06': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '07': { quantity: '10.5 MT', amount: '₹10.5 L' },
//     }
//   },
//   {
//     id: 13,
//     type: 'subitem',
//     activity: 'Scrap',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     color: 'blue',
//     category: 'Sales',
//     dailyValues: {
//       '01': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '02': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '03': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '04': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '05': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '06': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '07': { quantity: '10.5 MT', amount: '₹10.5 L' },
//     }
//   },
//   {
//     id: 10,
//     type: 'subitem',
//     activity: 'Solar',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     color: 'blue',
//     category: 'Sales',
//     dailyValues: {
//       '01': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '02': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '03': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '04': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '05': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '06': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '07': { quantity: '10.5 MT', amount: '₹10.5 L' },
//     }
//   },
//   {
//     id: 2,
//     type: 'header',
//     activity: 'Cost',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     category: 'Cost',
//     dailyValues: {
//       '01': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '02': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '03': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '04': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '05': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '06': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '07': { quantity: '10.5 MT', amount: '₹10.5 L' },
//     }
//   },
//   {
//     id: 21,
//     type: 'subitem',
//     activity: 'Critical cost parameter',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     color: 'orange',
//     category: 'Cost',
//     dailyValues: {
//       '01': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '02': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '03': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '04': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '05': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '06': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '07': { quantity: '10.5 MT', amount: '₹10.5 L' },
//     }
//   },
//   {
//     id: 22,
//     type: 'subitem',
//     activity: 'Manpower cost',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     color: 'orange',
//     category: 'Cost',
//     dailyValues: {
//       '01': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '02': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '03': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '04': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '05': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '06': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '07': { quantity: '10.5 MT', amount: '₹10.5 L' },
//     }
//   },
//   {
//     id: 23,
//     type: 'subitem',
//     activity: 'Spare consumable and waste disposal',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     color: 'orange',
//     category: 'Cost',
//     dailyValues: {
//       '01': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '02': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '03': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '04': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '05': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '06': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '07': { quantity: '10.5 MT', amount: '₹10.5 L' },
//     }
//   },
//   {
//     id: 3,
//     type: 'header',
//     activity: 'Earnings',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     category: 'Earnings',
//     dailyValues: {
//       '01': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '02': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '03': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '04': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '05': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '06': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '07': { quantity: '10.5 MT', amount: '₹10.5 L' },
//     }
//   },
//   {
//     id: 31,
//     type: 'subitem',
//     activity: 'Total sales',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     color: 'blue',
//     category: 'Earnings',
//     dailyValues: {
//       '01': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '02': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '03': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '04': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '05': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '06': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '07': { quantity: '10.5 MT', amount: '₹10.5 L' },
//     }
//   },
//   {
//     id: 32,
//     type: 'subitem',
//     activity: 'Total cost',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     color: 'orange',
//     category: 'Earnings',
//     dailyValues: {
//       '01': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '02': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '03': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '04': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '05': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '06': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '07': { quantity: '10.5 MT', amount: '₹10.5 L' },
//     }
//   },
//   {
//     id: 33,
//     type: 'subitem',
//     activity: 'Profitability',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     color: 'green',
//     category: 'Earnings',
//     dailyValues: {
//       '01': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '02': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '03': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '04': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '05': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '06': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '07': { quantity: '10.5 MT', amount: '₹10.5 L' },
//     }
//   }
// ];

// const initialMonths = [
//   'Jan 2023', 'Feb 2023', 'Mar 2023', 'Apr 2023', 
//   'May 2023', 'Jun 2023', 'Jul 2023', 'Aug 2023',
//   'Sep 2023', 'Oct 2023', 'Nov 2023', 'Dec 2023'
// ];

// const InputTable: React.FC = () => {
//   const [months, setMonths] = useState(initialMonths);
//   const [selectedDate, setSelectedDate] = useState(months[0]);
//   const [selectedTab, setSelectedTab] = useState<'Sales' | 'Cost' | 'Earnings'>('Sales');
//   const [open, setOpen] = useState(false);
//   const [openAddMonthDialog, setOpenAddMonthDialog] = useState(false);
//   const [newMonth, setNewMonth] = useState('');
//   const [newYear, setNewYear] = useState('');
//   const [editableData, setEditableData] = useState<ProductionTableRow[]>(initialProductionTableData);

//   // Filter data based on selected tab
//   const filteredRows = React.useMemo(() => {
//     return editableData.filter(row => 
//       row.category === selectedTab || 
//       (row.type === 'header' && row.activity === selectedTab)
//     );
//   }, [selectedTab, editableData]);

//   const getDotColor = (color?: string) => {
//     switch (color) {
//       case 'blue': return '#2563eb';
//       case 'orange': return '#f97316';
//       case 'green': return '#22c55e';
//       default: return 'transparent';
//     }
//   };

//   const handleValueChange = (id: number, field: 'qty' | 'rate' | 'cumulativeValues', value: number) => {
//     setEditableData(prevData => 
//       prevData.map(row => 
//         row.id === id ? { ...row, [field]: value } : row
//       )
//     );
//   };

//   const handleDailyValueChange = (id: number, day: string, field: keyof DailyValue, value: string) => {
//     setEditableData(prevData => 
//       prevData.map(row => {
//         if (row.id === id) {
//           const updatedDailyValues = { ...row.dailyValues };
//           updatedDailyValues[day] = { 
//             ...updatedDailyValues[day], 
//             [field]: value 
//           };
//           return { ...row, dailyValues: updatedDailyValues };
//         }
//         return row;
//       })
//     );
//   };

//   const handleAddNewMonth = () => {
//     if (newMonth && newYear) {
//       const monthName = newMonth.slice(0, 3);
//       const newMonthYear = `${monthName} ${newYear}`;
      
//       if (!months.includes(newMonthYear)) {
//         setMonths([...months, newMonthYear]);
//         setSelectedDate(newMonthYear);
        
//         // Initialize data for the new month
//         setEditableData(prevData => 
//           prevData.map(row => ({
//             ...row,
//             dailyValues: {
//               ...Object.fromEntries(
//                 Array.from({ length: 31 }, (_, i) => [
//                   (i + 1).toString().padStart(2, '0'),
//                   { quantity: '', amount: '' }
//                 ])
//               )
//             }
//           }))
//         );
//       }
      
//       setNewMonth('');
//       setNewYear('');
//       setOpenAddMonthDialog(false);
//     }
//   };

//   return (
//     <Card sx={{
//       bgcolor: '#E7EBF0', borderRadius: 2, boxShadow: `
//       4px 4px 20px 0px #6F8CB069,
//       -6px -6px 20px 0px #FFFFFF,
//       2px 2px 4px 0px #728EAB1A
//       `, p: 2
//     }}>
//       <CardContent>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
//           <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1 }}>
//             <Box sx={{ display: 'flex', gap: 2 }}>
//               {['Sales', 'Cost', 'Earnings'].map((tab) => (
//                 <Typography
//                   key={tab}
//                   onClick={() => setSelectedTab(tab as 'Sales' | 'Cost' | 'Earnings')}
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
//             <Box sx={{ display: 'flex', gap: 4, mt: 1 }}>
//               <Typography sx={{ fontWeight: 600, color: '#64748b' }}>Daily</Typography>
//               <Typography sx={{ fontWeight: 600, color: '#64748b' }}>Quantity</Typography>
//               <Typography sx={{ fontWeight: 600, color: '#64748b' }}>Updates</Typography>
//             </Box>
//           </Box>
//           <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
//             <IconButton size="small">
//               <FileDownloadIcon />
//             </IconButton>
//             <Box sx={{ display: 'flex', alignItems: 'center' }}>
//               <Select
//                 value={selectedDate}
//                 onChange={(e) => setSelectedDate(e.target.value)}
//                 size="small"
//                 sx={{
//                   minWidth: 120, bgcolor: '#E7EBF0',
//                   boxShadow: '4px 4px 20px 0px #6F8CB069, -6px -6px 20px 0px #FFFFFF, 2px 2px 4px 0px #728EAB1A'
//                 }}
//               >
//                 {months.map(month => (
//                   <MenuItem key={month} value={month}>{month}</MenuItem>
//                 ))}
//               </Select>
//               <IconButton 
//                 size="small" 
//                 onClick={() => setOpenAddMonthDialog(true)}
//                 sx={{ ml: 1 }}
//               >
//                 <AddIcon fontSize="small" />
//               </IconButton>
//             </Box>
//             <button
//               style={{
//                 background: '#64748b',
//                 color: '#fff',
//                 border: 'none',
//                 borderRadius: 4,
//                 padding: '6px 16px',
//                 fontWeight: 600,
//                 cursor: 'pointer'
//               }}
//             >
//               Archive
//             </button>
//           </Box>
//         </Box>

//         <TableContainer component={Paper} sx={{ boxShadow: 'none', bgcolor: '#E7EBF0' }}>
//           <Table sx={{ minWidth: 650 }} size="small">
//             <TableHead>
//               <TableRow>
//                 <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Sr. no.</TableCell>
//                 <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Components</TableCell>
//                 <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Unit</TableCell>
//                 <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Previous Day</TableCell>
//                 <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Edit</TableCell>
//               </TableRow>
//             </TableHead>

//             <TableBody>
//               {filteredRows.map((row) => {
//                 const isHeader = row.type === 'header';
//                 const borderColor = isHeader ? '#d1d5db' : 'transparent';

//                 return (
//                   <TableRow
//                     key={row.id}
//                     sx={{
//                       '&:last-child td, &:last-child th': { border: 0 },
//                       borderBottom: isHeader ? `2px solid ${borderColor}` : 'none',
//                       bgcolor: 'transparent',
//                     }}
//                   >
//                     <TableCell>
//                       {isHeader ? (
//                         <Typography sx={{ color: '#000', fontWeight: 600 }}>
//                           {row.id}
//                         </Typography>
//                       ) : (
//                         <Box sx={{ display: 'flex', alignItems: 'center', pl: 0 }}>
//                           <Box
//                             sx={{
//                               width: 6,
//                               height: 6,
//                               borderRadius: '50%',
//                               bgcolor: getDotColor(row.color),
//                               mr: 1,
//                             }}
//                           />
//                         </Box>
//                       )}
//                     </TableCell>

//                     <TableCell>
//                       <Typography
//                         sx={{
//                           color: isHeader ? '#000' : '#64748b',
//                           fontWeight: isHeader ? 600 : 400,
//                           fontSize: 13,
//                         }}
//                       >
//                         {row.activity}
//                       </Typography>
//                     </TableCell>

//                     <TableCell>
//                       <TextField
//                         size="small"
//                         value={row.qty}
//                         onChange={(e) => handleValueChange(row.id, 'qty', Number(e.target.value))}
//                         sx={{ width: 80 }}
//                         type="number"
//                       />
//                     </TableCell>

//                     <TableCell>
//                       <TextField
//                         size="small"
//                         value={row.rate}
//                         onChange={(e) => handleValueChange(row.id, 'rate', Number(e.target.value))}
//                         sx={{ width: 80 }}
//                         type="number"
//                       />
//                     </TableCell>

//                     <TableCell>
//                       <TextField
//                         size="small"
//                         value={row.cumulativeValues}
//                         onChange={(e) => handleValueChange(row.id, 'cumulativeValues', Number(e.target.value))}
//                         sx={{ width: 80 }}
//                         type="number"
//                       />
//                     </TableCell>
//                   </TableRow>
//                 );
//               })}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
//           <button
//             style={{
//               background: '#60a5fa',
//               color: '#fff',
//               border: 'none',
//               borderRadius: 4,
//               padding: '8px 32px',
//               fontWeight: 600,
//               fontSize: 16,
//               cursor: 'pointer'
//             }}
//             onClick={() => setOpen(true)}
//           >
//             Submit
//           </button>
//         </Box>

//         <Dialog open={open} onClose={() => setOpen(false)}>
//           <DialogTitle>Daily MIS Updated</DialogTitle>
//           <DialogContent>
//             <Typography>Your data has been submitted successfully.</Typography>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setOpen(false)} variant="contained" color="primary">
//               Close
//             </Button>
//           </DialogActions>
//         </Dialog>

//         {/* Dialog for adding new month */}
//         <Dialog open={openAddMonthDialog} onClose={() => setOpenAddMonthDialog(false)}>
//           <DialogTitle>Add New Month</DialogTitle>
//           <DialogContent>
//             <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
//               <TextField
//                 label="Month"
//                 select
//                 value={newMonth}
//                 onChange={(e) => setNewMonth(e.target.value)}
//                 fullWidth
//                 size="small"
//               >
//                 {[
//                   'January', 'February', 'March', 'April', 
//                   'May', 'June', 'July', 'August',
//                   'September', 'October', 'November', 'December'
//                 ].map(month => (
//                   <MenuItem key={month} value={month}>{month}</MenuItem>
//                 ))}
//               </TextField>
//               <TextField
//                 label="Year"
//                 value={newYear}
//                 onChange={(e) => setNewYear(e.target.value)}
//                 fullWidth
//                 size="small"
//                 type="number"
//               />
//             </Box>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setOpenAddMonthDialog(false)}>Cancel</Button>
//             <Button 
//               onClick={handleAddNewMonth} 
//               variant="contained" 
//               color="primary"
//               disabled={!newMonth || !newYear}
//             >
//               Add Month
//             </Button>
//           </DialogActions>
//         </Dialog>
//       </CardContent>
//     </Card>
//   );
// };

// export default InputTable;

// import React, { useState } from 'react';
// import {
//   Card,
//   CardContent,
//   Typography,
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   IconButton,
//   Select,
//   MenuItem,
//   Paper,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   TextField
// } from '@mui/material';
// import FileDownloadIcon from '@mui/icons-material/FileDownload';
// import AddIcon from '@mui/icons-material/Add';
// import EditIcon from '@mui/icons-material/Edit';

// interface DailyValue {
//   amount: string;
//   quantity: string;
// }

// interface ProductionTableRow {
//   id: number;
//   type: 'header' | 'subitem';
//   activity: string;
//   qty: number;
//   rate: number;
//   cumulativeValues: number;
//   color?: 'blue' | 'orange' | 'green';
//   dailyValues: {
//     [key: string]: DailyValue;
//   };
//   category: 'Sales' | 'Cost' | 'Earnings';
// }

// const initialProductionTableData: ProductionTableRow[] = [
//   {
//     id: 1,
//     type: 'header',
//     activity: 'Sales',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     category: 'Sales',
//     dailyValues: {
//       '01': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '02': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '03': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '04': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '05': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '06': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '07': { quantity: '10.5 MT', amount: '₹10.5 L' },
//     }
//   },
//   {
//     id: 11,
//     type: 'subitem',
//     activity: 'Fabrication Total',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     color: 'blue',
//     category: 'Sales',
//     dailyValues: {
//       '01': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '02': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '03': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '04': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '05': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '06': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '07': { quantity: '10.5 MT', amount: '₹10.5 L' },
//     }
//   },
//   {
//     id: 12,
//     type: 'subitem',
//     activity: 'Galva Total',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     color: 'blue',
//     category: 'Sales',
//     dailyValues: {
//       '01': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '02': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '03': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '04': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '05': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '06': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '07': { quantity: '10.5 MT', amount: '₹10.5 L' },
//     }
//   },
//   {
//     id: 13,
//     type: 'subitem',
//     activity: 'Scrap',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     color: 'blue',
//     category: 'Sales',
//     dailyValues: {
//       '01': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '02': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '03': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '04': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '05': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '06': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '07': { quantity: '10.5 MT', amount: '₹10.5 L' },
//     }
//   },
//   {
//     id: 10,
//     type: 'subitem',
//     activity: 'Solar',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     color: 'blue',
//     category: 'Sales',
//     dailyValues: {
//       '01': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '02': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '03': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '04': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '05': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '06': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '07': { quantity: '10.5 MT', amount: '₹10.5 L' },
//     }
//   },
//   {
//     id: 2,
//     type: 'header',
//     activity: 'Cost',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     category: 'Cost',
//     dailyValues: {
//       '01': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '02': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '03': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '04': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '05': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '06': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '07': { quantity: '10.5 MT', amount: '₹10.5 L' },
//     }
//   },
//   {
//     id: 21,
//     type: 'subitem',
//     activity: 'Critical cost parameter',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     color: 'orange',
//     category: 'Cost',
//     dailyValues: {
//       '01': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '02': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '03': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '04': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '05': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '06': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '07': { quantity: '10.5 MT', amount: '₹10.5 L' },
//     }
//   },
//   {
//     id: 22,
//     type: 'subitem',
//     activity: 'Manpower cost',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     color: 'orange',
//     category: 'Cost',
//     dailyValues: {
//       '01': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '02': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '03': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '04': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '05': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '06': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '07': { quantity: '10.5 MT', amount: '₹10.5 L' },
//     }
//   },
//   {
//     id: 23,
//     type: 'subitem',
//     activity: 'Spare consumable and waste disposal',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     color: 'orange',
//     category: 'Cost',
//     dailyValues: {
//       '01': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '02': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '03': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '04': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '05': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '06': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '07': { quantity: '10.5 MT', amount: '₹10.5 L' },
//     }
//   },
//   {
//     id: 3,
//     type: 'header',
//     activity: 'Earnings',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     category: 'Earnings',
//     dailyValues: {
//       '01': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '02': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '03': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '04': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '05': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '06': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '07': { quantity: '10.5 MT', amount: '₹10.5 L' },
//     }
//   },
//   {
//     id: 31,
//     type: 'subitem',
//     activity: 'Total sales',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     color: 'blue',
//     category: 'Earnings',
//     dailyValues: {
//       '01': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '02': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '03': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '04': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '05': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '06': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '07': { quantity: '10.5 MT', amount: '₹10.5 L' },
//     }
//   },
//   {
//     id: 32,
//     type: 'subitem',
//     activity: 'Total cost',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     color: 'orange',
//     category: 'Earnings',
//     dailyValues: {
//       '01': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '02': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '03': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '04': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '05': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '06': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '07': { quantity: '10.5 MT', amount: '₹10.5 L' },
//     }
//   },
//   {
//     id: 33,
//     type: 'subitem',
//     activity: 'Profitability',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     color: 'green',
//     category: 'Earnings',
//     dailyValues: {
//       '01': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '02': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '03': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '04': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '05': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '06': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '07': { quantity: '10.5 MT', amount: '₹10.5 L' },
//     }
//   }
// ];


// const initialMonths = [
//   'Feb 2025'
// ];

// const InputTable: React.FC = () => {
//   const [months, setMonths] = useState(initialMonths);
//   const [selectedDate, setSelectedDate] = useState(months[0]);
//   const [selectedTab, setSelectedTab] = useState<'Sales' | 'Cost' | 'Earnings'>('Sales');
//   const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
//   const [openAddMonthDialog, setOpenAddMonthDialog] = useState(false);
//   const [openDataEntryDialog, setOpenDataEntryDialog] = useState(false);
//   const [newMonth, setNewMonth] = useState('');
//   const [newYear, setNewYear] = useState('');
//   const [selectedDay, setSelectedDay] = useState('');
//   const [editableData, setEditableData] = useState<ProductionTableRow[]>(initialProductionTableData);
//   const [tempDailyValues, setTempDailyValues] = useState<Record<string, DailyValue>>({});

//   // Filter data based on selected tab
//   const filteredRows = React.useMemo(() => {
//     return editableData.filter(row => 
//       row.category === selectedTab || 
//       (row.type === 'header' && row.activity === selectedTab)
//     );
//   }, [selectedTab, editableData]);

//   const getDotColor = (color?: string) => {
//     switch (color) {
//       case 'blue': return '#2563eb';
//       case 'orange': return '#f97316';
//       case 'green': return '#22c55e';
//       default: return 'transparent';
//     }
//   };

//   const handleAddNewMonth = () => {
//     if (newMonth && newYear) {
//       const monthName = newMonth.slice(0, 3);
//       const newMonthYear = `${monthName} ${newYear}`;
      
//       if (!months.includes(newMonthYear)) {
//         setMonths([...months, newMonthYear]);
//         setSelectedDate(newMonthYear);
        
//         setEditableData(prevData => 
//           prevData.map(row => ({
//             ...row,
//             dailyValues: {
//               ...Object.fromEntries(
//                 Array.from({ length: 31 }, (_, i) => [
//                   (i + 1).toString().padStart(2, '0'),
//                   { quantity: '', amount: '' }
//                 ])
//               )
//             }
//           }))
//         );
//       }
      
//       setNewMonth('');
//       setNewYear('');
//       setOpenAddMonthDialog(false);
//     }
//   };

//   const handleOpenDataEntry = (day: string) => {
//     setSelectedDay(day);
//     // Initialize temp values with current data
//     const values: Record<string, DailyValue> = {};
//     filteredRows.forEach(row => {
//       if (row.type === 'subitem') {
//         values[row.activity] = row.dailyValues[day] || { quantity: '', amount: '' };
//       }
//     });
//     setTempDailyValues(values);
//     setOpenDataEntryDialog(true);
//   };

//   const handleDailyValueChange = (activity: string, field: keyof DailyValue, value: string) => {
//     setTempDailyValues(prev => ({
//       ...prev,
//       [activity]: {
//         ...prev[activity],
//         [field]: value
//       }
//     }));
//   };

//   const handleSaveDailyValues = () => {
//     setEditableData(prevData => 
//       prevData.map(row => {
//         if (row.type === 'subitem' && tempDailyValues[row.activity]) {
//           return {
//             ...row,
//             dailyValues: {
//               ...row.dailyValues,
//               [selectedDay]: tempDailyValues[row.activity]
//             }
//           };
//         }
//         return row;
//       })
//     );
//     setOpenDataEntryDialog(false);
//     setOpenSuccessDialog(true);
//   };

//   // Generate days for the current month (simplified - assumes 31 days)
//   const daysInMonth = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'));

//   return (
//     <Card sx={{
//       bgcolor: '#E7EBF0', borderRadius: 2, boxShadow: `
//       4px 4px 20px 0px #6F8CB069,
//       -6px -6px 20px 0px #FFFFFF,
//       2px 2px 4px 0px #728EAB1A
//       `, p: 2
//     }}>
//       <CardContent>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
//           <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1 }}>
//             <Box sx={{ display: 'flex', gap: 2 }}>
//               {['Sales', 'Cost', 'Earnings'].map((tab) => (
//                 <Typography
//                   key={tab}
//                   onClick={() => setSelectedTab(tab as 'Sales' | 'Cost' | 'Earnings')}
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
//             <Box sx={{ display: 'flex', gap: 4, mt: 1 }}>
//               <Typography sx={{ fontWeight: 600, color: '#64748b' }}>Daily</Typography>
//               <Typography sx={{ fontWeight: 600, color: '#64748b' }}>Quantity</Typography>
//               <Typography sx={{ fontWeight: 600, color: '#64748b' }}>Updates</Typography>
//             </Box>
//           </Box>
//           <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
//             <IconButton size="small">
//               <FileDownloadIcon />
//             </IconButton>
//             <Box sx={{ display: 'flex', alignItems: 'center' }}>
//               <Select
//                 value={selectedDate}
//                 onChange={(e) => setSelectedDate(e.target.value)}
//                 size="small"
//                 sx={{
//                   minWidth: 120, bgcolor: '#E7EBF0',
//                   boxShadow: '4px 4px 20px 0px #6F8CB069, -6px -6px 20px 0px #FFFFFF, 2px 2px 4px 0px #728EAB1A'
//                 }}
//               >
//                 {months.map(month => (
//                   <MenuItem key={month} value={month}>{month}</MenuItem>
//                 ))}
//               </Select>
//               <IconButton 
//                 size="small" 
//                 onClick={() => setOpenAddMonthDialog(true)}
//                 sx={{ ml: 1 }}
//               >
//                 <AddIcon fontSize="small" />
//               </IconButton>
//             </Box>
//             <button
//               style={{
//                 background: '#64748b',
//                 color: '#fff',
//                 border: 'none',
//                 borderRadius: 4,
//                 padding: '6px 16px',
//                 fontWeight: 600,
//                 cursor: 'pointer'
//               }}
//             >
//               Archive
//             </button>
//           </Box>
//         </Box>

//         <TableContainer component={Paper} sx={{ boxShadow: 'none', bgcolor: '#E7EBF0' }}>
//           <Table sx={{ minWidth: 650 }} size="small">
//             <TableHead>
//               <TableRow>
//                 <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Sr. no.</TableCell>
//                 <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Components</TableCell>
//                 <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Qty</TableCell>
//                 <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Rate</TableCell>
//                 <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Cumulative Values</TableCell>
//                 {daysInMonth.map(day => (
//                   <TableCell key={day} sx={{ fontWeight: 600, color: '#1e293b' }}>
//                     {day}
//                     <IconButton size="small" onClick={() => handleOpenDataEntry(day)}>
//                       <EditIcon fontSize="small" />
//                     </IconButton>
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>

//             <TableBody>
//               {filteredRows.map((row) => {
//                 const isHeader = row.type === 'header';
//                 const borderColor = isHeader ? '#d1d5db' : 'transparent';

//                 return (
//                   <TableRow
//                     key={row.id}
//                     sx={{
//                       '&:last-child td, &:last-child th': { border: 0 },
//                       borderBottom: isHeader ? `2px solid ${borderColor}` : 'none',
//                       bgcolor: 'transparent',
//                     }}
//                   >
//                     <TableCell>
//                       {isHeader ? (
//                         <Typography sx={{ color: '#000', fontWeight: 600 }}>
//                           {row.id}
//                         </Typography>
//                       ) : (
//                         <Box sx={{ display: 'flex', alignItems: 'center', pl: 0 }}>
//                           <Box
//                             sx={{
//                               width: 6,
//                               height: 6,
//                               borderRadius: '50%',
//                               bgcolor: getDotColor(row.color),
//                               mr: 1,
//                             }}
//                           />
//                         </Box>
//                       )}
//                     </TableCell>

//                     <TableCell>
//                       <Typography
//                         sx={{
//                           color: isHeader ? '#000' : '#64748b',
//                           fontWeight: isHeader ? 600 : 400,
//                           fontSize: 13,
//                         }}
//                       >
//                         {row.activity}
//                       </Typography>
//                     </TableCell>

//                     <TableCell>
//                       <Typography>{row.qty}</Typography>
//                     </TableCell>

//                     <TableCell>
//                       <Typography>{row.rate}</Typography>
//                     </TableCell>

//                     <TableCell>
//                       <Typography>{row.cumulativeValues}</Typography>
//                     </TableCell>

//                     {daysInMonth.map(day => (
//                       <TableCell key={day}>
//                         {row.dailyValues[day] ? (
//                           <>
//                             <Typography variant="body2">{row.dailyValues[day].quantity}</Typography>
//                             <Typography variant="body2">{row.dailyValues[day].amount}</Typography>
//                           </>
//                         ) : (
//                           <Typography variant="body2" color="textSecondary">-</Typography>
//                         )}
//                       </TableCell>
//                     ))}
//                   </TableRow>
//                 );
//               })}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         {/* Data Entry Dialog */}
//         <Dialog open={openDataEntryDialog} onClose={() => setOpenDataEntryDialog(false)} maxWidth="md" fullWidth>
//           <DialogTitle>Enter Data for {selectedDay} {selectedDate}</DialogTitle>
//           <DialogContent>
//             <TableContainer component={Paper}>
//               <Table>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell>Component</TableCell>
//                     <TableCell>Quantity</TableCell>
//                     <TableCell>Amount</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {filteredRows
//                     .filter(row => row.type === 'subitem')
//                     .map(row => (
//                       <TableRow key={row.id}>
//                         <TableCell>{row.activity}</TableCell>
//                         <TableCell>
//                           <TextField
//                             value={tempDailyValues[row.activity]?.quantity || ''}
//                             onChange={(e) => handleDailyValueChange(row.activity, 'quantity', e.target.value)}
//                             fullWidth
//                           />
//                         </TableCell>
//                         <TableCell>
//                           <TextField
//                             value={tempDailyValues[row.activity]?.amount || ''}
//                             onChange={(e) => handleDailyValueChange(row.activity, 'amount', e.target.value)}
//                             fullWidth
//                           />
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setOpenDataEntryDialog(false)}>Cancel</Button>
//             <Button onClick={handleSaveDailyValues} color="primary" variant="contained">
//               Save
//             </Button>
//           </DialogActions>
//         </Dialog>

//         {/* Success Dialog */}
//         <Dialog open={openSuccessDialog} onClose={() => setOpenSuccessDialog(false)}>
//           <DialogTitle>Data Saved Successfully</DialogTitle>
//           <DialogContent>
//             <Typography>Your daily data has been updated.</Typography>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setOpenSuccessDialog(false)} color="primary">
//               OK
//             </Button>
//           </DialogActions>
//         </Dialog>

//         {/* Add Month Dialog */}
//         <Dialog open={openAddMonthDialog} onClose={() => setOpenAddMonthDialog(false)}>
//           <DialogTitle>Add New Month</DialogTitle>
//           <DialogContent>
//             <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
//               <TextField
//                 label="Month"
//                 select
//                 value={newMonth}
//                 onChange={(e) => setNewMonth(e.target.value)}
//                 fullWidth
//                 size="small"
//               >
//                 {[
//                   'January', 'February', 'March', 'April', 
//                   'May', 'June', 'July', 'August',
//                   'September', 'October', 'November', 'December'
//                 ].map(month => (
//                   <MenuItem key={month} value={month}>{month}</MenuItem>
//                 ))}
//               </TextField>
//               <TextField
//                 label="Year"
//                 value={newYear}
//                 onChange={(e) => setNewYear(e.target.value)}
//                 fullWidth
//                 size="small"
//                 type="number"
//               />
//             </Box>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setOpenAddMonthDialog(false)}>Cancel</Button>
//             <Button 
//               onClick={handleAddNewMonth} 
//               variant="contained" 
//               color="primary"
//               disabled={!newMonth || !newYear}
//             >
//               Add Month
//             </Button>
//           </DialogActions>
//         </Dialog>
//       </CardContent>
//     </Card>
//   );
// };

// export default InputTable;


// import React, { useState, useEffect } from 'react';
// import {
//   Card,
//   CardContent,
//   Typography,
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   IconButton,
//   Select,
//   MenuItem,
//   Paper,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   TextField,
//   Snackbar,
//   Alert
// } from '@mui/material';
// import FileDownloadIcon from '@mui/icons-material/FileDownload';
// import AddIcon from '@mui/icons-material/Add';
// import EditIcon from '@mui/icons-material/Edit';

// interface DailyValue {
//   amount: string;
//   quantity: string;
// }

// interface ProductionTableRow {
//   id: number;
//   type: 'header' | 'subitem';
//   activity: string;
//   qty: number;
//   rate: number;
//   cumulativeValues: number;
//   color?: 'blue' | 'orange' | 'green';
//   dailyValues: {
//     [key: string]: DailyValue;
//   };
//   category: 'Sales' | 'Cost' | 'Earnings';
// }

// interface ApiResponse {
//   id: number;
//   type: string;
//   date: string;
//   rate: string;
//   unit: string;
//   amount?: string;
//   quantity?: string;
// }

// const initialProductionTableData: ProductionTableRow[] = [
//     {
//       id: 1,
//       type: 'header',
//       activity: 'Sales',
//       qty: 30,
//       rate: 191,
//       cumulativeValues: 191551,
//       category: 'Sales',
//       dailyValues: {
//         '01': { quantity: '10.5 MT' ,amount: '₹10.5 L',},
//         '02': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//         '03': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//         '04': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//         '05': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//         '06': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//         '07': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//       }
//     },
//   {
//     id: 11,
//     type: 'subitem',
//     activity: 'Fabrication Total',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     color: 'blue',
//     category: 'Sales',
//     dailyValues: {
//       '01': { quantity: '10.5 MT' ,amount: '₹10.5 L',},
//         '02': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//         '03': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//         '04': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//         '05': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//         '06': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//         '07': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//     }
//   },
//   {
//     id: 12,
//     type: 'subitem',
//     activity: 'Galva Total',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     color: 'blue',
//     category: 'Sales',
//     dailyValues: {
//         '01': { quantity: '10.5 MT' ,amount: '₹10.5 L',},
//         '02': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//         '03': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//         '04': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//         '05': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//         '06': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//         '07': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//     }
//   },
//   {
//     id: 13,
//     type: 'subitem',
//     activity: 'Scrap',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     color: 'blue',
//     category: 'Sales',
//     dailyValues: {
//       '01': { quantity: '10.5 MT' ,amount: '₹10.5 L',},
//         '02': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//         '03': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//         '04': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//         '05': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//         '06': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//         '07': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//     }
//   },
//   {
//     id: 10,
//     type: 'subitem',
//     activity: 'Solar',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     color: 'blue',
//     category: 'Sales',
//     dailyValues: {
//       '01': { quantity: '10.5 MT' ,amount: '₹10.5 L',},
//       '02': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//       '03': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//       '04': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//       '05': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//       '06': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//       '07': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//     }
//   },
//   {
//     id: 2,
//     type: 'header',
//     activity: 'Cost',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     category: 'Cost',
//     dailyValues: {
//       '01': { quantity: '10.5 MT' ,amount: '₹10.5 L',},
//         '02': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//         '03': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//         '04': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//         '05': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//         '06': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//         '07': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//     }
//   },
//   {
//     id: 21,
//     type: 'subitem',
//     activity: 'Critical cost parameter',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     color: 'orange',
//     category: 'Cost',
//     dailyValues: {
//       '01': { quantity: '10.5 MT' ,amount: '₹10.5 L',},
//       '02': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//       '03': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//       '04': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//       '05': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//       '06': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//       '07': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//     }
//   },
//   {
//     id: 22,
//     type: 'subitem',
//     activity: 'Manpower cost',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     color: 'orange',
//     category: 'Cost',
//     dailyValues: {
//       '01': { quantity: '10.5 MT' ,amount: '₹10.5 L',},
//       '02': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//       '03': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//       '04': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//       '05': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//       '06': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//       '07': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//     }
//   },
//   {
//     id: 23,
//     type: 'subitem',
//     activity: 'Spare consumable and waste disposal',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     color: 'orange',
//     category: 'Cost',
//     dailyValues: {
//       '01': { quantity: '10.5 MT' ,amount: '₹10.5 L',},
//       '02': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//       '03': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//       '04': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//       '05': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//       '06': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//       '07': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//     }
//   },
//   {
//     id: 3,
//     type: 'header',
//     activity: 'Earnings',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     category: 'Earnings',
//     dailyValues: {
//       '01': { quantity: '10.5 MT' ,amount: '₹10.5 L',},
//       '02': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//       '03': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//       '04': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//       '05': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//       '06': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//       '07': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//     }
//   },
//   {
//     id: 31,
//     type: 'subitem',
//     activity: 'Total sales',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     color: 'blue',
//     category: 'Earnings',
//     dailyValues: {
//       '01': { quantity: '10.5 MT' ,amount: '₹10.5 L',},
//       '02': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//       '03': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//       '04': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//       '05': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//       '06': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//       '07': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//     }
//   },
//   {
//     id: 32,
//     type: 'subitem',
//     activity: 'Total cost',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     color: 'orange',
//     category: 'Earnings',
//     dailyValues: {
//       '01': { quantity: '10.5 MT' ,amount: '₹10.5 L',},
//       '02': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//       '03': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//       '04': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//       '05': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//       '06': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//       '07': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//     }
//   },
//   {
//     id: 33,
//     type: 'subitem',
//     activity: 'Profitability',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     color: 'green',
//     category: 'Earnings',
//     dailyValues: {
//       '01': { quantity: '10.5 MT' ,amount: '₹10.5 L',},
//       '02': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//       '03': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//       '04': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//       '05': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//       '06': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//       '07': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
//     }
//   }
// ];

// const initialMonths = ['Feb 2025'];

// const BASE_URL = 'http://43.204.203.153:8000';

// const InputTable: React.FC = () => {
//   const [months, setMonths] = useState(initialMonths);
//   const [selectedDate, setSelectedDate] = useState(months[0]);
//   const [selectedTab, setSelectedTab] = useState<'Sales' | 'Cost' | 'Earnings'>('Sales');
//   const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
//   const [openAddMonthDialog, setOpenAddMonthDialog] = useState(false);
//   const [openDataEntryDialog, setOpenDataEntryDialog] = useState(false);
//   const [newMonth, setNewMonth] = useState('');
//   const [newYear, setNewYear] = useState('');
//   const [selectedDay, setSelectedDay] = useState('');
//   const [editableData, setEditableData] = useState<ProductionTableRow[]>(initialProductionTableData);
//   const [tempDailyValues, setTempDailyValues] = useState<Record<string, DailyValue>>({});
//   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

//   // Filter data based on selected tab
//   const filteredRows = React.useMemo(() => {
//     return editableData.filter(row => 
//       row.category === selectedTab || 
//       (row.type === 'header' && row.activity === selectedTab)
//     );
//   }, [selectedTab, editableData]);

//   // Only allow editing for Sales and Cost tabs
//   const canEdit = selectedTab !== 'Earnings';

//   const getDotColor = (color?: string) => {
//     switch (color) {
//       case 'blue': return '#2563eb';
//       case 'orange': return '#f97316';
//       case 'green': return '#22c55e';
//       default: return 'transparent';
//     }
//   };

//   const handleAddNewMonth = () => {
//     if (newMonth && newYear) {
//       const monthName = newMonth.slice(0, 3);
//       const newMonthYear = `${monthName} ${newYear}`;
      
//       if (!months.includes(newMonthYear)) {
//         setMonths([...months, newMonthYear]);
//         setSelectedDate(newMonthYear);
        
//         setEditableData(prevData => 
//           prevData.map(row => ({
//             ...row,
//             dailyValues: {
//               ...Object.fromEntries(
//                 Array.from({ length: 31 }, (_, i) => [
//                   (i + 1).toString().padStart(2, '0'),
//                   { quantity: '', amount: '' }
//                 ])
//               )
//             }
//           }))
//         );
//       }
      
//       setNewMonth('');
//       setNewYear('');
//       setOpenAddMonthDialog(false);
//     }
//   };

//   const handleOpenDataEntry = (day: string) => {
//     if (!canEdit) return;
    
//     setSelectedDay(day);
//     const values: Record<string, DailyValue> = {};
//     filteredRows.forEach(row => {
//       if (row.type === 'subitem') {
//         values[row.activity] = row.dailyValues[day] || { quantity: '', amount: '' };
//       }
//     });
//     setTempDailyValues(values);
//     setOpenDataEntryDialog(true);
//   };

//   const handleDailyValueChange = (activity: string, field: keyof DailyValue, value: string) => {
//     setTempDailyValues(prev => ({
//       ...prev,
//       [activity]: {
//         ...prev[activity],
//         [field]: value
//       }
//     }));
//   };

//   const saveSalesData = async (activity: string, day: string, data: DailyValue) => {
//     try {
//       const months: { [key: string]: string } = {
//         Jan: '01', Feb: '02', Mar: '03', Apr: '04',
//         May: '05', Jun: '06', Jul: '07', Aug: '08',
//         Sep: '09', Oct: '10', Nov: '11', Dec: '12'
//       };

//       const date = `${selectedDate.split(' ')[1]}-${months[selectedDate.split(' ')[0]]}-${day.padStart(2, '0')}`;
//       const payload = {
//         type: activity,
//         date,
//         rate: data.amount.replace(/[^0-9.]/g, ''),
//         unit: data.quantity.includes('MT') ? 'MT' : 'L',
//         amount: data.amount.replace(/[^0-9.]/g, ''),
//         quantity: data.quantity.replace(/[^0-9.]/g, '')
//       };

//       const response = await fetch(`${BASE_URL}/sales/create-sales/`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload)
//       });

//       if (!response.ok) throw new Error('Failed to save sales data');
//       return await response.json();
//     } catch (error) {
//       console.error('Error saving sales data:', error);
//       throw error;
//     }
//   };

//   const saveCostData = async (activity: string, day: string, data: DailyValue) => {
//     try {
//       const date = `${selectedDate.split(' ')[1]}-${selectedDate.split(' ')[0]}-${day.padStart(2, '0')}`;
//       const payload = {
//         type: activity,
//         date,
//         rate: data.amount.replace(/[^0-9.]/g, ''),
//         unit: data.quantity.includes('MT') ? 'MT' : 'L',
//         amount: data.amount.replace(/[^0-9.]/g, ''),
//         quantity: data.quantity.replace(/[^0-9.]/g, '')
//       };

//       const response = await fetch(`${BASE_URL}/cost/create-cost/`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload)
//       });

//       if (!response.ok) throw new Error('Failed to save cost data');
//       return await response.json();
//     } catch (error) {
//       console.error('Error saving cost data:', error);
//       throw error;
//     }
//   };

//   const handleSaveDailyValues = async () => {
//     try {
//       const promises = [];
      
//       for (const [activity, data] of Object.entries(tempDailyValues)) {
//         if (selectedTab === 'Sales') {
//           promises.push(saveSalesData(activity, selectedDay, data));
//         } else if (selectedTab === 'Cost') {
//           promises.push(saveCostData(activity, selectedDay, data));
//         }
//       }

//       await Promise.all(promises);

//       // Update local state only after successful API calls
//       setEditableData(prevData => 
//         prevData.map(row => {
//           if (row.type === 'subitem' && tempDailyValues[row.activity]) {
//             return {
//               ...row,
//               dailyValues: {
//                 ...row.dailyValues,
//                 [selectedDay]: tempDailyValues[row.activity]
//               }
//             };
//           }
//           return row;
//         })
//       );

//       setOpenDataEntryDialog(false);
//       setSnackbar({ open: true, message: 'Data saved successfully!', severity: 'success' });
//     } catch (error) {
//       setSnackbar({ open: true, message: 'Failed to save data', severity: 'error' });
//       console.error('Error saving data:', error);
//     }
//   };

//   const fetchInitialData = async () => {
//     try {
//       // Fetch sales data
//       const salesResponse = await fetch(`${BASE_URL}/sales/`);
//       const salesData: ApiResponse[] = await salesResponse.json();
      
//       // Fetch cost data
//       const costResponse = await fetch(`${BASE_URL}/cost/`);
//       const costData: ApiResponse[] = await costResponse.json();

//       // Process and merge the data into your table structure
//       // This would involve mapping the API responses to your ProductionTableRow structure
//       // Implementation depends on how you want to display the existing data
      
//     } catch (error) {
//       console.error('Error fetching initial data:', error);
//       setSnackbar({ open: true, message: 'Failed to load initial data', severity: 'error' });
//     }
//   };

//   useEffect(() => {
//     fetchInitialData();
//   }, []);

//   // Generate days for the current month (simplified - assumes 31 days)
//   const daysInMonth = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'));

//   return (
//     <Card sx={{
//       bgcolor: '#E7EBF0', borderRadius: 2, boxShadow: `
//       4px 4px 20px 0px #6F8CB069,
//       -6px -6px 20px 0px #FFFFFF,
//       2px 2px 4px 0px #728EAB1A
//       `, p: 2
//     }}>
//       <CardContent>
//         {/* Header JSX remains the same */}
        
//         <TableContainer component={Paper} sx={{ boxShadow: 'none', bgcolor: '#E7EBF0' }}>
//           <Table sx={{ minWidth: 650 }} size="small">
//             <TableHead>
//               <TableRow>
//                 <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Sr. no.</TableCell>
//                 <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Components</TableCell>
//                 <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Qty</TableCell>
//                 <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Rate</TableCell>
//                 <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Cumulative Values</TableCell>
//                 {daysInMonth.map(day => (
//                   <TableCell key={day} sx={{ fontWeight: 600, color: '#1e293b' }}>
//                     {day}
//                     {canEdit && (
//                       <IconButton 
//                         size="small" 
//                         onClick={() => handleOpenDataEntry(day)}
//                         disabled={!canEdit}
//                       >
//                         <EditIcon fontSize="small" />
//                       </IconButton>
//                     )}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>

//             <TableBody>
//               {filteredRows.map((row) => {
//                 const isHeader = row.type === 'header';
//                 const borderColor = isHeader ? '#d1d5db' : 'transparent';

//                 return (
//                   <TableRow
//                     key={row.id}
//                     sx={{
//                       '&:last-child td, &:last-child th': { border: 0 },
//                       borderBottom: isHeader ? `2px solid ${borderColor}` : 'none',
//                       bgcolor: 'transparent',
//                     }}
//                   >
//                     <TableCell>
//                       {isHeader ? (
//                         <Typography sx={{ color: '#000', fontWeight: 600 }}>
//                           {row.id}
//                         </Typography>
//                       ) : (
//                         <Box sx={{ display: 'flex', alignItems: 'center', pl: 0 }}>
//                           <Box
//                             sx={{
//                               width: 6,
//                               height: 6,
//                               borderRadius: '50%',
//                               bgcolor: getDotColor(row.color),
//                               mr: 1,
//                             }}
//                           />
//                         </Box>
//                       )}
//                     </TableCell>

//                     <TableCell>
//                       <Typography
//                         sx={{
//                           color: isHeader ? '#000' : '#64748b',
//                           fontWeight: isHeader ? 600 : 400,
//                           fontSize: 13,
//                         }}
//                       >
//                         {row.activity}
//                       </Typography>
//                     </TableCell>

//                     <TableCell>
//                       <Typography>{row.qty}</Typography>
//                     </TableCell>

//                     <TableCell>
//                       <Typography>{row.rate}</Typography>
//                     </TableCell>

//                     <TableCell>
//                       <Typography>{row.cumulativeValues}</Typography>
//                     </TableCell>

//                     {daysInMonth.map(day => (
//                       <TableCell key={day}>
//                         {row.dailyValues[day] ? (
//                           <>
//                             <Typography variant="body2">{row.dailyValues[day].quantity}</Typography>
//                             <Typography variant="body2">{row.dailyValues[day].amount}</Typography>
//                           </>
//                         ) : (
//                           <Typography variant="body2" color="textSecondary">-</Typography>
//                         )}
//                       </TableCell>
//                     ))}
//                   </TableRow>
//                 );
//               })}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         {/* Data Entry Dialog */}
//         {canEdit && (
//           <Dialog open={openDataEntryDialog} onClose={() => setOpenDataEntryDialog(false)} maxWidth="md" fullWidth>
//             <DialogTitle>Enter Data for {selectedDay} {selectedDate}</DialogTitle>
//             <DialogContent>
//               <TableContainer component={Paper}>
//                 <Table>
//                   <TableHead>
//                     <TableRow>
//                       <TableCell>Component</TableCell>
//                       <TableCell>Quantity (e.g., 10.5 MT)</TableCell>
//                       <TableCell>Amount (e.g., ₹10.5 L)</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {filteredRows
//                       .filter(row => row.type === 'subitem')
//                       .map(row => (
//                         <TableRow key={row.id}>
//                           <TableCell>{row.activity}</TableCell>
//                           <TableCell>
//                             <TextField
//                               value={tempDailyValues[row.activity]?.quantity || ''}
//                               onChange={(e) => handleDailyValueChange(row.activity, 'quantity', e.target.value)}
//                               fullWidth
//                               placeholder="e.g., 10.5 MT"
//                             />
//                           </TableCell>
//                           <TableCell>
//                             <TextField
//                               value={tempDailyValues[row.activity]?.amount || ''}
//                               onChange={(e) => handleDailyValueChange(row.activity, 'amount', e.target.value)}
//                               fullWidth
//                               placeholder="e.g., ₹10.5 L"
//                             />
//                           </TableCell>
//                         </TableRow>
//                       ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={() => setOpenDataEntryDialog(false)}>Cancel</Button>
//               <Button onClick={handleSaveDailyValues} color="primary" variant="contained">
//                 Save
//               </Button>
//             </DialogActions>
//           </Dialog>
//         )}

//         {/* Add Month Dialog */}
//         <Dialog open={openAddMonthDialog} onClose={() => setOpenAddMonthDialog(false)}>
//           <DialogTitle>Add New Month</DialogTitle>
//           <DialogContent>
//             <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
//               <TextField
//                 label="Month"
//                 select
//                 value={newMonth}
//                 onChange={(e) => setNewMonth(e.target.value)}
//                 fullWidth
//                 size="small"
//               >
//                 {[
//                   'January', 'February', 'March', 'April', 
//                   'May', 'June', 'July', 'August',
//                   'September', 'October', 'November', 'December'
//                 ].map(month => (
//                   <MenuItem key={month} value={month}>{month}</MenuItem>
//                 ))}
//               </TextField>
//               <TextField
//                 label="Year"
//                 value={newYear}
//                 onChange={(e) => setNewYear(e.target.value)}
//                 fullWidth
//                 size="small"
//                 type="number"
//               />
//             </Box>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setOpenAddMonthDialog(false)}>Cancel</Button>
//             <Button 
//               onClick={handleAddNewMonth} 
//               variant="contained" 
//               color="primary"
//               disabled={!newMonth || !newYear}
//             >
//               Add Month
//             </Button>
//           </DialogActions>
//         </Dialog>

//         {/* Snackbar for notifications */}
//         <Snackbar
//           open={snackbar.open}
//           autoHideDuration={6000}
//           onClose={() => setSnackbar({...snackbar, open: false})}
//         >
//           <Alert 
//             onClose={() => setSnackbar({...snackbar, open: false})} 
//             // severity={snackbar.severity}
//             sx={{ width: '100%' }}
//           >
//             {snackbar.message}
//           </Alert>
//         </Snackbar>
//       </CardContent>
//     </Card>
//   );
// };

// export default InputTable;


// import React, { useState, useEffect } from 'react';
// import {
//   Card,
//   CardContent,
//   Typography,
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   IconButton,
//   Select,
//   MenuItem,
//   Paper,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   TextField,
//   Snackbar,
//   Alert
// } from '@mui/material';
// import { Add as AddIcon } from '@mui/icons-material';
// import EditIcon from '@mui/icons-material/Edit';
// import FileDownloadIcon from '@mui/icons-material/FileDownload';
// interface DailyValue {
//   amount: string;
//   quantity: string;
// }

// interface ProductionTableRow {
//   id: number;
//   type: 'header' | 'subitem';
//   activity: string;
//   qty: number;
//   rate: number;
//   cumulativeValues: number;
//   color?: 'blue' | 'orange' | 'green';
//   dailyValues: {
//     [key: string]: DailyValue;
//   };
//   category: 'Sales' | 'Cost' | 'Earnings';
// }

// interface ApiResponse {
//   id: number;
//   type: string;
//   date: string;
//   rate: string;
//   unit: string;
//   amount?: string;
//   quantity?: string;
// }

// const initialProductionTableData: ProductionTableRow[] = [
//   {
//     id: 1,
//     type: 'header',
//     activity: 'Sales',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     category: 'Sales',
//     dailyValues: {
//       '01': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '02': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '03': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '04': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '05': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '06': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '07': { quantity: '10.5 MT', amount: '₹10.5 L' },
//     }
//   },
//   {
//     id: 11,
//     type: 'subitem',
//     activity: 'Fabrication Total',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     color: 'blue',
//     category: 'Sales',
//     dailyValues: {
//       '01': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '02': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '03': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '04': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '05': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '06': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '07': { quantity: '10.5 MT', amount: '₹10.5 L' },
//     }
//   },
//   {
//     id: 12,
//     type: 'subitem',
//     activity: 'Galva Total',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     color: 'blue',
//     category: 'Sales',
//     dailyValues: {
//       '01': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '02': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '03': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '04': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '05': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '06': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '07': { quantity: '10.5 MT', amount: '₹10.5 L' },
//     }
//   },
//   {
//     id: 13,
//     type: 'subitem',
//     activity: 'Scrap',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     color: 'blue',
//     category: 'Sales',
//     dailyValues: {
//       '01': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '02': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '03': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '04': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '05': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '06': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '07': { quantity: '10.5 MT', amount: '₹10.5 L' },
//     }
//   },
//   {
//     id: 10,
//     type: 'subitem',
//     activity: 'Solar',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     color: 'blue',
//     category: 'Sales',
//     dailyValues: {
//       '01': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '02': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '03': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '04': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '05': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '06': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '07': { quantity: '10.5 MT', amount: '₹10.5 L' },
//     }
//   },
//   {
//     id: 2,
//     type: 'header',
//     activity: 'Cost',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     category: 'Cost',
//     dailyValues: {
//       '01': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '02': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '03': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '04': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '05': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '06': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '07': { quantity: '10.5 MT', amount: '₹10.5 L' },
//     }
//   },
//   {
//     id: 21,
//     type: 'subitem',
//     activity: 'Critical cost parameter',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     color: 'orange',
//     category: 'Cost',
//     dailyValues: {
//       '01': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '02': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '03': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '04': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '05': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '06': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '07': { quantity: '10.5 MT', amount: '₹10.5 L' },
//     }
//   },
//   {
//     id: 22,
//     type: 'subitem',
//     activity: 'Manpower cost',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     color: 'orange',
//     category: 'Cost',
//     dailyValues: {
//       '01': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '02': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '03': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '04': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '05': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '06': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '07': { quantity: '10.5 MT', amount: '₹10.5 L' },
//     }
//   },
//   {
//     id: 23,
//     type: 'subitem',
//     activity: 'Spare consumable and waste disposal',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     color: 'orange',
//     category: 'Cost',
//     dailyValues: {
//       '01': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '02': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '03': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '04': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '05': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '06': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '07': { quantity: '10.5 MT', amount: '₹10.5 L' },
//     }
//   },
//   {
//     id: 3,
//     type: 'header',
//     activity: 'Earnings',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     category: 'Earnings',
//     dailyValues: {
//       '01': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '02': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '03': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '04': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '05': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '06': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '07': { quantity: '10.5 MT', amount: '₹10.5 L' },
//     }
//   },
//   {
//     id: 31,
//     type: 'subitem',
//     activity: 'Total sales',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     color: 'blue',
//     category: 'Earnings',
//     dailyValues: {
//       '01': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '02': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '03': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '04': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '05': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '06': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '07': { quantity: '10.5 MT', amount: '₹10.5 L' },
//     }
//   },
//   {
//     id: 32,
//     type: 'subitem',
//     activity: 'Total cost',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     color: 'orange',
//     category: 'Earnings',
//     dailyValues: {
//       '01': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '02': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '03': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '04': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '05': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '06': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '07': { quantity: '10.5 MT', amount: '₹10.5 L' },
//     }
//   },
//   {
//     id: 33,
//     type: 'subitem',
//     activity: 'Profitability',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     color: 'green',
//     category: 'Earnings',
//     dailyValues: {
//       '01': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '02': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '03': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '04': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '05': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '06': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '07': { quantity: '10.5 MT', amount: '₹10.5 L' },
//     }
//   }
// ];

// const initialMonths = ['Feb 2025'];

// const BASE_URL = 'http://43.204.203.153:8000';

// const InputTable: React.FC = () => {
//   const [months, setMonths] = useState(initialMonths);
//   const [selectedDate, setSelectedDate] = useState(months[0]);
//   const [selectedTab, setSelectedTab] = useState<'Sales' | 'Cost' | 'Earnings'>('Sales');
//   // const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
//   const [openAddMonthDialog, setOpenAddMonthDialog] = useState(false);
//   const [openDataEntryDialog, setOpenDataEntryDialog] = useState(false);
//   const [newMonth, setNewMonth] = useState('');
//   const [newYear, setNewYear] = useState('');
//   const [selectedDay, setSelectedDay] = useState('');
//   const [editableData, setEditableData] = useState<ProductionTableRow[]>(initialProductionTableData);
//   const [tempDailyValues, setTempDailyValues] = useState<Record<string, DailyValue>>({});
//   const [snackbar, setSnackbar] = useState<{
//     open: boolean;
//     message: string;
//     severity: 'success' | 'error';
//   }>({ open: false, message: '', severity: 'success' });

//   // Filter data based on selected tab
//   const filteredRows = React.useMemo(() => {
//     return editableData.filter(row => 
//       row.category === selectedTab || 
//       (row.type === 'header' && row.activity === selectedTab)
//     );
//   }, [selectedTab, editableData]);

//   // Only allow editing for Sales and Cost tabs
//   const canEdit = selectedTab !== 'Earnings';

//   const getDotColor = (color?: string) => {
//     switch (color) {
//       case 'blue': return '#2563eb';
//       case 'orange': return '#f97316';
//       case 'green': return '#22c55e';
//       default: return 'transparent';
//     }
//   };

//   const handleAddNewMonth = () => {
//     if (newMonth && newYear) {
//       const monthName = newMonth.slice(0, 3);
//       const newMonthYear = `${monthName} ${newYear}`;
      
//       if (!months.includes(newMonthYear)) {
//         setMonths([...months, newMonthYear]);
//         setSelectedDate(newMonthYear);
        
//         setEditableData(prevData => 
//           prevData.map(row => ({
//             ...row,
//             dailyValues: {
//               ...Object.fromEntries(
//                 Array.from({ length: 31 }, (_, i) => [
//                   (i + 1).toString().padStart(2, '0'),
//                   { quantity: '', amount: '' }
//                 ])
//               )
//             }
//           }))
//         );
//       }
      
//       setNewMonth('');
//       setNewYear('');
//       setOpenAddMonthDialog(false);
//     }
//   };

//   const handleOpenDataEntry = (day: string) => {
//     if (!canEdit) return;
    
//     setSelectedDay(day);
//     const values: Record<string, DailyValue> = {};
//     filteredRows.forEach(row => {
//       if (row.type === 'subitem') {
//         values[row.activity] = row.dailyValues[day] || { quantity: '', amount: '' };
//       }
//     });
//     setTempDailyValues(values);
//     setOpenDataEntryDialog(true);
//   };

//   const handleDailyValueChange = (activity: string, field: keyof DailyValue, value: string) => {
//     setTempDailyValues(prev => ({
//       ...prev,
//       [activity]: {
//         ...prev[activity],
//         [field]: value
//       }
//     }));
//   };

//   const saveSalesData = async (activity: string, day: string, data: DailyValue) => {
//     try {
//       const months: { [key: string]: string } = {
//         Jan: '01', Feb: '02', Mar: '03', Apr: '04',
//         May: '05', Jun: '06', Jul: '07', Aug: '08',
//         Sep: '09', Oct: '10', Nov: '11', Dec: '12'
//       };

//       const date = `${selectedDate.split(' ')[1]}-${months[selectedDate.split(' ')[0]]}-${day.padStart(2, '0')}`;
//       const payload = {
//         type: activity,
//         date,
//         rate: data.amount.replace(/[^0-9.]/g, ''),
//         unit: data.quantity.includes('MT') ? 'MT' : 'L',
//         amount: data.amount.replace(/[^0-9.]/g, ''),
//         quantity: data.quantity.replace(/[^0-9.]/g, '')
//       };

//       const response = await fetch(`${BASE_URL}/sales/create-sales/`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload)
//       });

//       if (!response.ok) throw new Error('Failed to save sales data');
//       return await response.json();
//     } catch (error) {
//       console.error('Error saving sales data:', error);
//       throw error;
//     }
//   };

//   const saveCostData = async (activity: string, day: string, data: DailyValue) => {
//     try {
//       const months: { [key: string]: string } = {
//         Jan: '01', Feb: '02', Mar: '03', Apr: '04',
//         May: '05', Jun: '06', Jul: '07', Aug: '08',
//         Sep: '09', Oct: '10', Nov: '11', Dec: '12'
//       };

//       const date = `${selectedDate.split(' ')[1]}-${months[selectedDate.split(' ')[0]]}-${day.padStart(2, '0')}`;
//       const payload = {
//         type: activity,
//         date,
//         rate: data.amount.replace(/[^0-9.]/g, ''),
//         unit: data.quantity.includes('MT') ? 'MT' : 'L',
//         amount: data.amount.replace(/[^0-9.]/g, ''),
//         quantity: data.quantity.replace(/[^0-9.]/g, '')
//       };

//       const response = await fetch(`${BASE_URL}/mis_app/cost/add-cost/`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload)
//       });

//       if (!response.ok) throw new Error('Failed to save cost data');
//       return await response.json();
//     } catch (error) {
//       console.error('Error saving cost data:', error);
//       throw error;
//     }
//   };

//   const handleSaveDailyValues = async () => {
//     try {
//       const promises = [];
      
//       for (const [activity, data] of Object.entries(tempDailyValues)) {
//         if (selectedTab === 'Sales') {
//           promises.push(saveSalesData(activity, selectedDay, data));
//         } else if (selectedTab === 'Cost') {
//           promises.push(saveCostData(activity, selectedDay, data));
//         }
//       }

//       await Promise.all(promises);

//       // Update local state only after successful API calls
//       setEditableData(prevData => 
//         prevData.map(row => {
//           if (row.type === 'subitem' && tempDailyValues[row.activity]) {
//             return {
//               ...row,
//               dailyValues: {
//                 ...row.dailyValues,
//                 [selectedDay]: tempDailyValues[row.activity]
//               }
//             };
//           }
//           return row;
//         })
//       );

//       setOpenDataEntryDialog(false);
//       setSnackbar({ open: true, message: 'Data saved successfully!', severity: 'success' });
//     } catch (error) {
//       setSnackbar({ open: true, message: 'Failed to save data', severity: 'error' });
//       console.error('Error saving data:', error);
//     }
//   };

//   const fetchInitialData = async () => {
//   try {
//     // Fetch sales data
//     const salesResponse = await fetch(`${BASE_URL}/sales/`);
//     const salesData: ApiResponse[] = await salesResponse.json();
    
//     // Fetch cost data
//     const costResponse = await fetch(`${BASE_URL}/cost/`);
//     const costData: ApiResponse[] = await costResponse.json();

//     // Process and merge the data into your table structure
//     const updatedData = editableData.map(row => {
//       // Process sales data
//       if (row.category === 'Sales') {
//         const salesForActivity = salesData.filter(item => item.type === row.activity);
//         const dailyValues = {...row.dailyValues};
        
//         salesForActivity.forEach(sale => {
//           const day = sale.date.split('-')[2];
//           dailyValues[day] = {
//             quantity: `${sale.quantity} ${sale.unit}`,
//             amount: `₹${sale.amount} L`
//           };
//         });
        
//         return {...row, dailyValues};
//       }
      
//       // Process cost data
//       if (row.category === 'Cost') {
//         const costsForActivity = costData.filter(item => item.type === row.activity);
//         const dailyValues = {...row.dailyValues};
        
//         costsForActivity.forEach(cost => {
//           const day = cost.date.split('-')[2];
//           dailyValues[day] = {
//             quantity: `${cost.quantity} ${cost.unit}`,
//             amount: `₹${cost.amount} L`
//           };
//         });
        
//         return {...row, dailyValues};
//       }
      
//       return row;
//     });

//     setEditableData(updatedData);
    
//   } catch (error) {
//     console.error('Error fetching initial data:', error);
//     setSnackbar({ open: true, message: 'Failed to load initial data', severity: 'error' });
//   }
// };

//   useEffect(() => {
//     fetchInitialData();
//   }, []);

//   // Generate days for the current month (simplified - assumes 31 days)
//   const daysInMonth = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'));

//   return (
//     <Card sx={{
//       bgcolor: '#E7EBF0', borderRadius: 2, boxShadow: `
//       4px 4px 20px 0px #6F8CB069,
//       -6px -6px 20px 0px #FFFFFF,
//       2px 2px 4px 0px #728EAB1A
//       `, p: 2
//     }}>
//       <CardContent>
//         {/* Header Section */}
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//             <Select
//               value={selectedDate}
//               onChange={(e) => setSelectedDate(e.target.value as string)}
//               size="small"
//               sx={{ minWidth: 120, bgcolor: 'white' }}
//             >
//               {months.map((month) => (
//                 <MenuItem key={month} value={month}>{month}</MenuItem>
//               ))}
//             </Select>
            
//             <IconButton 
//               size="small" 
//               onClick={() => setOpenAddMonthDialog(true)}
//               sx={{ bgcolor: 'white' }}
//             >
//               <AddIcon fontSize="small" />
//             </IconButton>
//           </Box>
          
//           <Box sx={{ display: 'flex', gap: 1 }}>
//             {(['Sales', 'Cost', 'Earnings'] as const).map((tab) => (
//               <Button
//                 key={tab}
//                 variant={selectedTab === tab ? 'contained' : 'outlined'}
//                 onClick={() => setSelectedTab(tab)}
//                 size="small"
//               >
//                 {tab}
//               </Button>
//             ))}
//           </Box>
          
//           <IconButton size="small" sx={{ bgcolor: 'white' }}>
//             <FileDownloadIcon fontSize="small" />
//           </IconButton>
//         </Box>

//         <TableContainer component={Paper} sx={{ boxShadow: 'none', bgcolor: '#E7EBF0' }}>
//           <Table sx={{ minWidth: 650 }} size="small">
//             <TableHead>
//               <TableRow>
//                 <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Sr. no.</TableCell>
//                 <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Components</TableCell>
//                 <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Qty</TableCell>
//                 <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Rate</TableCell>
//                 <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Cumulative Values</TableCell>
//                 {daysInMonth.map(day => (
//                   <TableCell key={day} sx={{ fontWeight: 600, color: '#1e293b' }}>
//                     {day}
//                     {canEdit && (
//                       <IconButton 
//                         size="small" 
//                         onClick={() => handleOpenDataEntry(day)}
//                         disabled={!canEdit}
//                       >
//                         <EditIcon fontSize="small" />
//                       </IconButton>
//                     )}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>

//             <TableBody>
//               {filteredRows.map((row) => {
//                 const isHeader = row.type === 'header';
//                 const borderColor = isHeader ? '#d1d5db' : 'transparent';

//                 return (
//                   <TableRow
//                     key={row.id}
//                     sx={{
//                       '&:last-child td, &:last-child th': { border: 0 },
//                       borderBottom: isHeader ? `2px solid ${borderColor}` : 'none',
//                       bgcolor: 'transparent',
//                     }}
//                   >
//                     <TableCell>
//                       {isHeader ? (
//                         <Typography sx={{ color: '#000', fontWeight: 600 }}>
//                           {row.id}
//                         </Typography>
//                       ) : (
//                         <Box sx={{ display: 'flex', alignItems: 'center', pl: 0 }}>
//                           <Box
//                             sx={{
//                               width: 6,
//                               height: 6,
//                               borderRadius: '50%',
//                               bgcolor: getDotColor(row.color),
//                               mr: 1,
//                             }}
//                           />
//                         </Box>
//                       )}
//                     </TableCell>

//                     <TableCell>
//                       <Typography
//                         sx={{
//                           color: isHeader ? '#000' : '#64748b',
//                           fontWeight: isHeader ? 600 : 400,
//                           fontSize: 13,
//                         }}
//                       >
//                         {row.activity}
//                       </Typography>
//                     </TableCell>

//                     <TableCell>
//                       <Typography>{row.qty}</Typography>
//                     </TableCell>

//                     <TableCell>
//                       <Typography>{row.rate}</Typography>
//                     </TableCell>

//                     <TableCell>
//                       <Typography>{row.cumulativeValues}</Typography>
//                     </TableCell>

//                     {daysInMonth.map(day => (
//                       <TableCell key={day}>
//                         {row.dailyValues[day] ? (
//                           <>
//                             <Typography variant="body2">{row.dailyValues[day].quantity}</Typography>
//                             <Typography variant="body2">{row.dailyValues[day].amount}</Typography>
//                           </>
//                         ) : (
//                           <Typography variant="body2" color="textSecondary">-</Typography>
//                         )}
//                       </TableCell>
//                     ))}
//                   </TableRow>
//                 );
//               })}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         {/* Data Entry Dialog */}
//         {canEdit && (
//           <Dialog open={openDataEntryDialog} onClose={() => setOpenDataEntryDialog(false)} maxWidth="md" fullWidth>
//             <DialogTitle>Enter Data for {selectedDay} {selectedDate}</DialogTitle>
//             <DialogContent>
//               <TableContainer component={Paper}>
//                 <Table>
//                   <TableHead>
//                     <TableRow>
//                       <TableCell>Component</TableCell>
//                       <TableCell>Quantity (e.g., 10.5 MT)</TableCell>
//                       <TableCell>Amount (e.g., ₹10.5 L)</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {filteredRows
//                       .filter(row => row.type === 'subitem')
//                       .map(row => (
//                         <TableRow key={row.id}>
//                           <TableCell>{row.activity}</TableCell>
//                           <TableCell>
//                             <TextField
//                               value={tempDailyValues[row.activity]?.quantity || ''}
//                               onChange={(e) => handleDailyValueChange(row.activity, 'quantity', e.target.value)}
//                               fullWidth
//                               placeholder="e.g., 10.5 MT"
//                             />
//                           </TableCell>
//                           <TableCell>
//                             <TextField
//                               value={tempDailyValues[row.activity]?.amount || ''}
//                               onChange={(e) => handleDailyValueChange(row.activity, 'amount', e.target.value)}
//                               fullWidth
//                               placeholder="e.g., ₹10.5 L"
//                             />
//                           </TableCell>
//                         </TableRow>
//                       ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={() => setOpenDataEntryDialog(false)}>Cancel</Button>
//               <Button onClick={handleSaveDailyValues} color="primary" variant="contained">
//                 Save
//               </Button>
//             </DialogActions>
//           </Dialog>
//         )}

//         {/* Add Month Dialog */}
//         <Dialog open={openAddMonthDialog} onClose={() => setOpenAddMonthDialog(false)}>
//           <DialogTitle>Add New Month</DialogTitle>
//           <DialogContent>
//             <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
//               <TextField
//                 label="Month"
//                 select
//                 value={newMonth}
//                 onChange={(e) => setNewMonth(e.target.value)}
//                 fullWidth
//                 size="small"
//               >
//                 {[
//                   'January', 'February', 'March', 'April', 
//                   'May', 'June', 'July', 'August',
//                   'September', 'October', 'November', 'December'
//                 ].map(month => (
//                   <MenuItem key={month} value={month}>{month}</MenuItem>
//                 ))}
//               </TextField>
//               <TextField
//                 label="Year"
//                 value={newYear}
//                 onChange={(e) => setNewYear(e.target.value)}
//                 fullWidth
//                 size="small"
//                 type="number"
//               />
//             </Box>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setOpenAddMonthDialog(false)}>Cancel</Button>
//             <Button 
//               onClick={handleAddNewMonth} 
//               variant="contained" 
//               color="primary"
//               disabled={!newMonth || !newYear}
//             >
//               Add Month
//             </Button>
//           </DialogActions>
//         </Dialog>

//         {/* Snackbar for notifications */}
//         <Snackbar
//           open={snackbar.open}
//           autoHideDuration={6000}
//           onClose={() => setSnackbar({...snackbar, open: false})}
//         >
//           <Alert 
//             onClose={() => setSnackbar({...snackbar, open: false})} 
//             severity={snackbar.severity}
//             sx={{ width: '100%' }}
//           >
//             {snackbar.message}
//           </Alert>
//         </Snackbar>
//       </CardContent>
//     </Card>
//   );
// };

// export default InputTable;

// import React, { useState, useEffect } from 'react';
// import {
//   Card,
//   CardContent,
//   Typography,
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   IconButton,
//   Select,
//   MenuItem,
//   Paper,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   TextField,
//   Snackbar,
//   Alert
// } from '@mui/material';
// import { Add as AddIcon } from '@mui/icons-material';
// import EditIcon from '@mui/icons-material/Edit';
// import FileDownloadIcon from '@mui/icons-material/FileDownload';

// interface DailyValue {
//   amount: string;
//   quantity: string;
// }

// interface ProductionTableRow {
//   id: number;
//   type: 'header' | 'subitem';
//   activity: string;
//   qty: number;
//   rate: number;
//   cumulativeValues: number;
//   color?: 'blue' | 'orange' | 'green';
//   dailyValues: {
//     [key: string]: DailyValue;
//   };
//   category: 'Sales' | 'Cost' | 'Earnings';
// }

// // interface ApiResponse {
// //   id: number;
// //   type: string;
// //   date: string;
// //   rate: string;
// //   unit: string;
// //   amount?: string;
// //   quantity?: string;
// // }

// interface SalesReportItem {
//   date: string;
//   fabrication_total: string;
//   galva_total: string;
//   scrap: string;
//   solar: string;
// }

// const initialProductionTableData: ProductionTableRow[] = [
//   {
//     id: 1,
//     type: 'header',
//     activity: 'Sales',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     category: 'Sales',
//     dailyValues: {}
//   },
//   {
//     id: 11,
//     type: 'subitem',
//     activity: 'Fabrication Total',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     color: 'blue',
//     category: 'Sales',
//     dailyValues: {}
//   },
//   {
//     id: 12,
//     type: 'subitem',
//     activity: 'Galva Total',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     color: 'blue',
//     category: 'Sales',
//     dailyValues: {}
//   },
//   {
//     id: 13,
//     type: 'subitem',
//     activity: 'Scrap',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     color: 'blue',
//     category: 'Sales',
//     dailyValues: {}
//   },
//   {
//     id: 10,
//     type: 'subitem',
//     activity: 'Solar',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     color: 'blue',
//     category: 'Sales',
//     dailyValues: {}
//   },
//   {
//     id: 2,
//     type: 'header',
//     activity: 'Cost',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     category: 'Cost',
//     dailyValues: {
//       '01': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '02': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '03': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '04': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '05': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '06': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '07': { quantity: '10.5 MT', amount: '₹10.5 L' },
//     }
//   },
//   {
//     id: 21,
//     type: 'subitem',
//     activity: 'Critical cost parameter',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     color: 'orange',
//     category: 'Cost',
//     dailyValues: {
//       '01': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '02': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '03': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '04': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '05': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '06': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '07': { quantity: '10.5 MT', amount: '₹10.5 L' },
//     }
//   },
//   {
//     id: 22,
//     type: 'subitem',
//     activity: 'Manpower cost',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     color: 'orange',
//     category: 'Cost',
//     dailyValues: {
//       '01': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '02': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '03': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '04': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '05': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '06': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '07': { quantity: '10.5 MT', amount: '₹10.5 L' },
//     }
//   },
//   {
//     id: 23,
//     type: 'subitem',
//     activity: 'Spare consumable and waste disposal',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     color: 'orange',
//     category: 'Cost',
//     dailyValues: {
//       '01': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '02': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '03': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '04': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '05': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '06': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '07': { quantity: '10.5 MT', amount: '₹10.5 L' },
//     }
//   },
//   {
//     id: 3,
//     type: 'header',
//     activity: 'Earnings',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     category: 'Earnings',
//     dailyValues: {
//       '01': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '02': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '03': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '04': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '05': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '06': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '07': { quantity: '10.5 MT', amount: '₹10.5 L' },
//     }
//   },
//   {
//     id: 31,
//     type: 'subitem',
//     activity: 'Total sales',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     color: 'blue',
//     category: 'Earnings',
//     dailyValues: {
//       '01': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '02': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '03': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '04': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '05': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '06': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '07': { quantity: '10.5 MT', amount: '₹10.5 L' },
//     }
//   },
//   {
//     id: 32,
//     type: 'subitem',
//     activity: 'Total cost',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     color: 'orange',
//     category: 'Earnings',
//     dailyValues: {
//       '01': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '02': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '03': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '04': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '05': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '06': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '07': { quantity: '10.5 MT', amount: '₹10.5 L' },
//     }
//   },
//   {
//     id: 33,
//     type: 'subitem',
//     activity: 'Profitability',
//     qty: 30,
//     rate: 191,
//     cumulativeValues: 191551,
//     color: 'green',
//     category: 'Earnings',
//     dailyValues: {
//       '01': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '02': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '03': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '04': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '05': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '06': { quantity: '10.5 MT', amount: '₹10.5 L' },
//       '07': { quantity: '10.5 MT', amount: '₹10.5 L' },
//     }
//   }
// ];

// const initialMonths = ['Feb 2025'];

// const BASE_URL = 'http://43.204.203.153:8000';

// const InputTable: React.FC = () => {
//   const [months, setMonths] = useState(initialMonths);
//   const [selectedDate, setSelectedDate] = useState(months[0]);
//   const [selectedTab, setSelectedTab] = useState<'Sales' | 'Cost' | 'Earnings'>('Sales');
//   const [openAddMonthDialog, setOpenAddMonthDialog] = useState(false);
//   const [openDataEntryDialog, setOpenDataEntryDialog] = useState(false);
//   const [newMonth, setNewMonth] = useState('');
//   const [newYear, setNewYear] = useState('');
//   const [selectedDay, setSelectedDay] = useState('');
//   const [editableData, setEditableData] = useState<ProductionTableRow[]>(initialProductionTableData);
//   const [tempDailyValues, setTempDailyValues] = useState<Record<string, DailyValue>>({});
//   const [snackbar, setSnackbar] = useState<{
//     open: boolean;
//     message: string;
//     severity: 'success' | 'error';
//   }>({ open: false, message: '', severity: 'success' });

//   const filteredRows = React.useMemo(() => {
//     return editableData.filter(row => 
//       row.category === selectedTab || 
//       (row.type === 'header' && row.activity === selectedTab)
//     );
//   }, [selectedTab, editableData]);

//   const canEdit = selectedTab !== 'Earnings';

//   const getDotColor = (color?: string) => {
//     switch (color) {
//       case 'blue': return '#2563eb';
//       case 'orange': return '#f97316';
//       case 'green': return '#22c55e';
//       default: return 'transparent';
//     }
//   };

//   const handleAddNewMonth = () => {
//     if (newMonth && newYear) {
//       const monthName = newMonth.slice(0, 3);
//       const newMonthYear = `${monthName} ${newYear}`;
      
//       if (!months.includes(newMonthYear)) {
//         setMonths([...months, newMonthYear]);
//         setSelectedDate(newMonthYear);
        
//         setEditableData(prevData => 
//           prevData.map(row => ({
//             ...row,
//             dailyValues: {
//               ...Object.fromEntries(
//                 Array.from({ length: 31 }, (_, i) => [
//                   (i + 1).toString().padStart(2, '0'),
//                   { quantity: '', amount: '' }
//                 ])
//               )
//             }
//           }))
//         );
//       }
      
//       setNewMonth('');
//       setNewYear('');
//       setOpenAddMonthDialog(false);
//     }
//   };

//   const handleOpenDataEntry = (day: string) => {
//     if (!canEdit) return;
    
//     setSelectedDay(day);
//     const values: Record<string, DailyValue> = {};
//     filteredRows.forEach(row => {
//       if (row.type === 'subitem') {
//         values[row.activity] = row.dailyValues[day] || { quantity: '', amount: '' };
//       }
//     });
//     setTempDailyValues(values);
//     setOpenDataEntryDialog(true);
//   };

//   const handleDailyValueChange = (activity: string, field: keyof DailyValue, value: string) => {
//     setTempDailyValues(prev => ({
//       ...prev,
//       [activity]: {
//         ...prev[activity],
//         [field]: value
//       }
//     }));
//   };

//   const saveSalesData = async (activity: string, day: string, data: DailyValue) => {
//     try {
//       const months: { [key: string]: string } = {
//         Jan: '01', Feb: '02', Mar: '03', Apr: '04',
//         May: '05', Jun: '06', Jul: '07', Aug: '08',
//         Sep: '09', Oct: '10', Nov: '11', Dec: '12'
//       };

//       const monthYear = selectedDate.split(' ');
//       const date = `${monthYear[1]}-${months[monthYear[0]]}-${day.padStart(2, '0')}`;
      
//       // Extract numeric values
//       const numericAmount = data.amount.replace(/[^0-9.]/g, '');
//       const numericQuantity = data.quantity.replace(/[^0-9.]/g, '');
//       const unit = data.quantity.includes('MT') ? 'MT' : 'L';
      
//       const payload = {
//         type: activity,
//         date,
//         rate: numericAmount,
//         quantity: numericQuantity,
//         unit,
//         rate_unit: 'L', // Assuming rate unit is always in Lakhs
//       };

//       const response = await fetch(`${BASE_URL}/sales/create-sales/`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload)
//       });

//       if (!response.ok) throw new Error('Failed to save sales data');
//       return await response.json();
//     } catch (error) {
//       console.error('Error saving sales data:', error);
//       throw error;
//     }
//   };

//   const saveCostData = async (activity: string, day: string, data: DailyValue) => {
//     try {
//       const months: { [key: string]: string } = {
//         Jan: '01', Feb: '02', Mar: '03', Apr: '04',
//         May: '05', Jun: '06', Jul: '07', Aug: '08',
//         Sep: '09', Oct: '10', Nov: '11', Dec: '12'
//       };

//       const date = `${selectedDate.split(' ')[1]}-${months[selectedDate.split(' ')[0]]}-${day.padStart(2, '0')}`;
//       const payload = {
//         type: activity,
//         date,
//         rate: data.amount.replace(/[^0-9.]/g, ''),
//         unit: 'MT',
//         rate_unit: 'L',
//         amount: data.amount.replace(/[^0-9.]/g, ''),
//         quantity: data.quantity.replace(/[^0-9.]/g, '')
//       };

//       const response = await fetch(`${BASE_URL}/sales/create-cost/`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload)
//       });

//       if (!response.ok) throw new Error('Failed to save cost data');
//       return await response.json();
//     } catch (error) {
//       console.error('Error saving cost data:', error);
//       throw error;
//     }
//   };

//   const handleSaveDailyValues = async () => {
//     try {
//       const promises = [];
      
//       for (const [activity, data] of Object.entries(tempDailyValues)) {
//         if (selectedTab === 'Sales') {
//           promises.push(saveSalesData(activity, selectedDay, data));
//         } else if (selectedTab === 'Cost') {
//           promises.push(saveCostData(activity, selectedDay, data));
//         }
//       }

//       await Promise.all(promises);

//       // Update local state only after successful API calls
//       setEditableData(prevData => 
//         prevData.map(row => {
//           if (row.type === 'subitem' && tempDailyValues[row.activity]) {
//             return {
//               ...row,
//               dailyValues: {
//                 ...row.dailyValues,
//                 [selectedDay]: tempDailyValues[row.activity]
//               }
//             };
//           }
//           return row;
//         })
//       );

//       setOpenDataEntryDialog(false);
//       setSnackbar({ open: true, message: 'Data saved successfully!', severity: 'success' });
//     } catch (error) {
//       setSnackbar({ open: true, message: 'Failed to save data', severity: 'error' });
//       console.error('Error saving data:', error);
//     }
//   };

// const fetchSalesData = async () => {
//   try {
//     const response = await fetch(`${BASE_URL}/sales/get-sales-report/`);
//     if (!response.ok) {
//       throw new Error('Failed to fetch sales data');
//     }

//     const responseData = await response.json();
//     const salesData = responseData.data || [];
//     const totalData = responseData.total || { daily: {} };

//     setEditableData(prevData =>
//       prevData.map(row => {
//         if (row.category !== 'Sales') return row;

//         const newDailyValues: Record<string, DailyValue> = {};

//         // Handle the subitems
//         if (row.type === 'subitem') {
//           const matchingItem = salesData.find((item: any) => {
//             if (row.activity === 'Fabrication Total' && item.type === 'Fabrication Total') return true;
//             if (row.activity === 'Galva Total' && item.type === 'Galva Total') return true;
//             if (row.activity === 'Solar' && item.type === 'Solar') return true;
//             if (row.activity === 'Scrap' && item.type === 'Scrap') return true;
//             return false;
//           });

//           if (matchingItem && matchingItem.daily) {
//             Object.entries(matchingItem.daily).forEach(([day, dailyData]: [string, any]) => {
//               const paddedDay = day.padStart(2, '0');
//               newDailyValues[paddedDay] = {
//                 quantity: `${dailyData.qty} ${matchingItem.unit}`,
//                 amount: `₹${dailyData.amt || '0.0'} L`
//               };
//             });
//           }
//         }

//         // Handle the Sales header row
//         if (row.type === 'header' && row.activity === 'Sales' && totalData.daily) {
//           Object.entries(totalData.daily).forEach(([day, dailyData]: [string, any]) => {
//             const paddedDay = day.padStart(2, '0');
//             newDailyValues[paddedDay] = {
//               quantity: `${dailyData.qty} ${totalData.unit}`,
//               amount: `₹${dailyData.amt || '0.0'} L`
//             };
//           });
//         }

//         return {
//           ...row,
//           qty: row.type === 'header' ? totalData.qty : salesData.find((item: any) => item.type === row.activity)?.qty || row.qty,
//           rate: row.type === 'header' ? totalData.rate : salesData.find((item: any) => item.type === row.activity)?.rate || row.rate,
//           cumulativeValues: row.type === 'header' ? totalData.cumulativeValue : salesData.find((item: any) => item.type === row.activity)?.cumulativeValue || row.cumulativeValues,
//           dailyValues: newDailyValues
//         };
//       })
//     );
//   } catch (error) {
//     console.error('Error fetching sales data:', error);
//     setSnackbar({ open: true, message: 'Failed to load sales data', severity: 'error' });
//   }
// };

//   const fetchCostData = async () => {
//     try {
//       // Keep your existing cost data fetching logic if needed
//       // Or remove this if you're not fetching cost data from API
//     } catch (error) {
//       console.error('Error fetching cost data:', error);
//     }
//   };

//   useEffect(() => {
//     if (selectedTab === 'Sales') {
//       fetchSalesData();
//     } else if (selectedTab === 'Cost') {
//       fetchCostData();
//     }
//   }, [selectedTab]);

//   const daysInMonth = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'));

//   return (
//     <Card sx={{
//       bgcolor: '#E7EBF0', borderRadius: 2, boxShadow: `
//       4px 4px 20px 0px #6F8CB069,
//       -6px -6px 20px 0px #FFFFFF,
//       2px 2px 4px 0px #728EAB1A
//       `, p: 2
//     }}>
//       <CardContent>
//         {/* Header Section */}
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//             <Select
//               value={selectedDate}
//               onChange={(e) => setSelectedDate(e.target.value as string)}
//               size="small"
//               sx={{ minWidth: 120, bgcolor: 'white' }}
//             >
//               {months.map((month) => (
//                 <MenuItem key={month} value={month}>{month}</MenuItem>
//               ))}
//             </Select>
            
//             <IconButton 
//               size="small" 
//               onClick={() => setOpenAddMonthDialog(true)}
//               sx={{ bgcolor: 'white' }}
//             >
//               <AddIcon fontSize="small" />
//             </IconButton>
//           </Box>
          
//           <Box sx={{ display: 'flex', gap: 1 }}>
//             {(['Sales', 'Cost', 'Earnings'] as const).map((tab) => (
//               <Button
//                 key={tab}
//                 variant={selectedTab === tab ? 'contained' : 'outlined'}
//                 onClick={() => setSelectedTab(tab)}
//                 size="small"
//               >
//                 {tab}
//               </Button>
//             ))}
//           </Box>
          
//           <IconButton size="small" sx={{ bgcolor: 'white' }}>
//             <FileDownloadIcon fontSize="small" />
//           </IconButton>
//         </Box>

//         <TableContainer component={Paper} sx={{ boxShadow: 'none', bgcolor: '#E7EBF0' }}>
//           <Table sx={{ minWidth: 650 }} size="small">
//             <TableHead>
//               <TableRow>
//                 <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Sr. no.</TableCell>
//                 <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Components</TableCell>
//                 <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Qty</TableCell>
//                 <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Rate</TableCell>
//                 <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Cumulative Values</TableCell>
//                 {daysInMonth.map(day => (
//                   <TableCell key={day} sx={{ fontWeight: 600, color: '#1e293b' }}>
//                     {day}
//                     {canEdit && (
//                       <IconButton 
//                         size="small" 
//                         onClick={() => handleOpenDataEntry(day)}
//                         disabled={!canEdit}
//                       >
//                         <EditIcon fontSize="small" />
//                       </IconButton>
//                     )}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>

//             <TableBody>
//               {filteredRows.map((row) => {
//                 const isHeader = row.type === 'header';
//                 const borderColor = isHeader ? '#d1d5db' : 'transparent';

//                 return (
//                   <TableRow
//                     key={row.id}
//                     sx={{
//                       '&:last-child td, &:last-child th': { border: 0 },
//                       borderBottom: isHeader ? `2px solid ${borderColor}` : 'none',
//                       bgcolor: 'transparent',
//                     }}
//                   >
//                     <TableCell>
//                       {isHeader ? (
//                         <Typography sx={{ color: '#000', fontWeight: 600 }}>
//                           {row.id}
//                         </Typography>
//                       ) : (
//                         <Box sx={{ display: 'flex', alignItems: 'center', pl: 0 }}>
//                           <Box
//                             sx={{
//                               width: 6,
//                               height: 6,
//                               borderRadius: '50%',
//                               bgcolor: getDotColor(row.color),
//                               mr: 1,
//                             }}
//                           />
//                         </Box>
//                       )}
//                     </TableCell>

//                     <TableCell>
//                       <Typography
//                         sx={{
//                           color: isHeader ? '#000' : '#64748b',
//                           fontWeight: isHeader ? 600 : 400,
//                           fontSize: 13,
//                         }}
//                       >
//                         {row.activity}
//                       </Typography>
//                     </TableCell>

//                     <TableCell>
//                       <Typography>{row.qty}</Typography>
//                     </TableCell>

//                     <TableCell>
//                       <Typography>{row.rate}</Typography>
//                     </TableCell>

//                     <TableCell>
//                       <Typography>{row.cumulativeValues}</Typography>
//                     </TableCell>

//                     {daysInMonth.map(day => (
//                       <TableCell key={day}>
//                         {row.dailyValues[day] ? (
//                           <>
//                             <Typography variant="body2">{row.dailyValues[day].quantity}</Typography>
//                             <Typography variant="body2">{row.dailyValues[day].amount}</Typography>
//                           </>
//                         ) : (
//                           <Typography variant="body2" color="textSecondary">-</Typography>
//                         )}
//                       </TableCell>
//                     ))}
//                   </TableRow>
//                 );
//               })}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         {/* Data Entry Dialog */}
//         {canEdit && (
//           <Dialog open={openDataEntryDialog} onClose={() => setOpenDataEntryDialog(false)} maxWidth="md" fullWidth>
//             <DialogTitle>Enter Data for {selectedDay} {selectedDate}</DialogTitle>
//             <DialogContent>
//               <TableContainer component={Paper}>
//                 <Table>
//                   <TableHead>
//                     <TableRow>
//                       <TableCell>Component</TableCell>
//                       <TableCell>Quantity (e.g., 10.5 MT)</TableCell>
//                       <TableCell>Amount (e.g., ₹10.5 L)</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {filteredRows
//                       .filter(row => row.type === 'subitem')
//                       .map(row => (
//                         <TableRow key={row.id}>
//                           <TableCell>{row.activity}</TableCell>
//                           <TableCell>
//                             <TextField
//                               value={tempDailyValues[row.activity]?.quantity || ''}
//                               onChange={(e) => handleDailyValueChange(row.activity, 'quantity', e.target.value)}
//                               fullWidth
//                               placeholder="e.g., 10.5 MT"
//                             />
//                           </TableCell>
//                           <TableCell>
//                             <TextField
//                               value={tempDailyValues[row.activity]?.amount || ''}
//                               onChange={(e) => handleDailyValueChange(row.activity, 'amount', e.target.value)}
//                               fullWidth
//                               placeholder="e.g., ₹10.5 L"
//                             />
//                           </TableCell>
//                         </TableRow>
//                       ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={() => setOpenDataEntryDialog(false)}>Cancel</Button>
//               <Button onClick={handleSaveDailyValues} color="primary" variant="contained">
//                 Save
//               </Button>
//             </DialogActions>
//           </Dialog>
//         )}

//         {/* Add Month Dialog */}
//         <Dialog open={openAddMonthDialog} onClose={() => setOpenAddMonthDialog(false)}>
//           <DialogTitle>Add New Month</DialogTitle>
//           <DialogContent>
//             <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
//               <TextField
//                 label="Month"
//                 select
//                 value={newMonth}
//                 onChange={(e) => setNewMonth(e.target.value)}
//                 fullWidth
//                 size="small"
//               >
//                 {[
//                   'January', 'February', 'March', 'April', 
//                   'May', 'June', 'July', 'August',
//                   'September', 'October', 'November', 'December'
//                 ].map(month => (
//                   <MenuItem key={month} value={month}>{month}</MenuItem>
//                 ))}
//               </TextField>
//               <TextField
//                 label="Year"
//                 value={newYear}
//                 onChange={(e) => setNewYear(e.target.value)}
//                 fullWidth
//                 size="small"
//                 type="number"
//               />
//             </Box>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setOpenAddMonthDialog(false)}>Cancel</Button>
//             <Button 
//               onClick={handleAddNewMonth} 
//               variant="contained" 
//               color="primary"
//               disabled={!newMonth || !newYear}
//             >
//               Add Month
//             </Button>
//           </DialogActions>
//         </Dialog>

//         {/* Snackbar for notifications */}
//         <Snackbar
//           open={snackbar.open}
//           autoHideDuration={6000}
//           onClose={() => setSnackbar({...snackbar, open: false})}
//         >
//           <Alert 
//             onClose={() => setSnackbar({...snackbar, open: false})} 
//             severity={snackbar.severity}
//             sx={{ width: '100%' }}
//           >
//             {snackbar.message}
//           </Alert>
//         </Snackbar>
//       </CardContent>
//     </Card>
//   );
// };

// export default InputTable;




// import React, { useState, useEffect } from 'react';
// import {
//   Card,
//   CardContent,
//   Typography,
//   Box,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   IconButton,
//   Select,
//   MenuItem,
//   Paper,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   TextField,
//   Snackbar,
//   Alert
// } from '@mui/material';
// import { Add as AddIcon } from '@mui/icons-material';
// import EditIcon from '@mui/icons-material/Edit';
// import FileDownloadIcon from '@mui/icons-material/FileDownload';

// interface DailyValue {
//   amount: string;
//   quantity: string;
// }

// interface ProductionTableRow {
//   id: number;
//   type: 'header' | 'subitem';
//   activity: string;
//   qty: number;
//   rate: number;
//   cumulativeValues: number;
//   color?: 'blue' | 'orange' | 'green';
//   dailyValues: {
//     [key: string]: DailyValue;
//   };
//   category: 'Sales' | 'Cost' | 'Earnings';
// }

// const initialProductionTableData: ProductionTableRow[] = [
//   {
//     id: 1,
//     type: 'header',
//     activity: 'Sales',
//     qty: 0,
//     rate: 0,
//     cumulativeValues: 0,
//     category: 'Sales',
//     dailyValues: {}
//   },
//   {
//     id: 11,
//     type: 'subitem',
//     activity: 'Fabrication Total',
//     qty: 0,
//     rate: 0,
//     cumulativeValues: 0,
//     color: 'blue',
//     category: 'Sales',
//     dailyValues: {}
//   },
//   {
//     id: 12,
//     type: 'subitem',
//     activity: 'Galva Total',
//     qty: 0,
//     rate: 0,
//     cumulativeValues: 0,
//     color: 'blue',
//     category: 'Sales',
//     dailyValues: {}
//   },
//   {
//     id: 13,
//     type: 'subitem',
//     activity: 'Scrap',
//     qty: 0,
//     rate: 0,
//     cumulativeValues: 0,
//     color: 'blue',
//     category: 'Sales',
//     dailyValues: {}
//   },
//   {
//     id: 10,
//     type: 'subitem',
//     activity: 'Solar',
//     qty: 0,
//     rate: 0,
//     cumulativeValues: 0,
//     color: 'blue',
//     category: 'Sales',
//     dailyValues: {}
//   },
//   {
//     id: 2,
//     type: 'header',
//     activity: 'Cost',
//     qty: 0,
//     rate: 0,
//     cumulativeValues: 0,
//     category: 'Cost',
//     dailyValues: {}
//   },
//   {
//     id: 21,
//     type: 'subitem',
//     activity: 'Critical cost parameter',
//     qty: 0,
//     rate: 0,
//     cumulativeValues: 0,
//     color: 'orange',
//     category: 'Cost',
//     dailyValues: {}
//   },
//   {
//     id: 22,
//     type: 'subitem',
//     activity: 'Manpower cost',
//     qty: 0,
//     rate: 0,
//     cumulativeValues: 0,
//     color: 'orange',
//     category: 'Cost',
//     dailyValues: {}
//   },
//   {
//     id: 23,
//     type: 'subitem',
//     activity: 'Spare consumable and waste disposal',
//     qty: 0,
//     rate: 0,
//     cumulativeValues: 0,
//     color: 'orange',
//     category: 'Cost',
//     dailyValues: {}
//   },
//   {
//     id: 3,
//     type: 'header',
//     activity: 'Earnings',
//     qty: 0,
//     rate: 0,
//     cumulativeValues: 0,
//     category: 'Earnings',
//     dailyValues: {}
//   },
//   {
//     id: 31,
//     type: 'subitem',
//     activity: 'Total sales',
//     qty: 0,
//     rate: 0,
//     cumulativeValues: 0,
//     color: 'blue',
//     category: 'Earnings',
//     dailyValues: {}
//   },
//   {
//     id: 32,
//     type: 'subitem',
//     activity: 'Total cost',
//     qty: 0,
//     rate: 0,
//     cumulativeValues: 0,
//     color: 'orange',
//     category: 'Earnings',
//     dailyValues: {}
//   },
//   {
//     id: 33,
//     type: 'subitem',
//     activity: 'Profitability',
//     qty: 0,
//     rate: 0,
//     cumulativeValues: 0,
//     color: 'green',
//     category: 'Earnings',
//     dailyValues: {}
//   }
// ];

// const initialMonths = ['Feb 2025'];

// const BASE_URL = 'http://43.204.203.153:8000';

// const InputTable: React.FC = () => {
//   const [months, setMonths] = useState(initialMonths);
//   const [selectedDate, setSelectedDate] = useState(months[0]);
//   const [selectedTab, setSelectedTab] = useState<'Sales' | 'Cost' | 'Earnings'>('Sales');
//   const [openAddMonthDialog, setOpenAddMonthDialog] = useState(false);
//   const [openDataEntryDialog, setOpenDataEntryDialog] = useState(false);
//   const [newMonth, setNewMonth] = useState('');
//   const [newYear, setNewYear] = useState('');
//   const [selectedDay, setSelectedDay] = useState('');
//   const [editableData, setEditableData] = useState<ProductionTableRow[]>(initialProductionTableData);
//   const [tempDailyValues, setTempDailyValues] = useState<Record<string, DailyValue>>({});
//   const [snackbar, setSnackbar] = useState<{
//     open: boolean;
//     message: string;
//     severity: 'success' | 'error';
//   }>({ open: false, message: '', severity: 'success' });

//   const filteredRows = React.useMemo(() => {
//     return editableData.filter(row => 
//       row.category === selectedTab || 
//       (row.type === 'header' && row.activity === selectedTab)
//     );
//   }, [selectedTab, editableData]);

//   const canEdit = selectedTab !== 'Earnings';

//   const getDotColor = (color?: string) => {
//     switch (color) {
//       case 'blue': return '#2563eb';
//       case 'orange': return '#f97316';
//       case 'green': return '#22c55e';
//       default: return 'transparent';
//     }
//   };

//   const handleAddNewMonth = () => {
//     if (newMonth && newYear) {
//       const monthName = newMonth.slice(0, 3);
//       const newMonthYear = `${monthName} ${newYear}`;
      
//       if (!months.includes(newMonthYear)) {
//         setMonths([...months, newMonthYear]);
//         setSelectedDate(newMonthYear);
        
//         setEditableData(prevData => 
//           prevData.map(row => ({
//             ...row,
//             dailyValues: {
//               ...Object.fromEntries(
//                 Array.from({ length: 31 }, (_, i) => [
//                   (i + 1).toString().padStart(2, '0'),
//                   { quantity: '', amount: '' }
//                 ])
//               )
//             }
//           }))
//         );
//       }
      
//       setNewMonth('');
//       setNewYear('');
//       setOpenAddMonthDialog(false);
//     }
//   };

//   const handleOpenDataEntry = (day: string) => {
//     if (!canEdit) return;
    
//     setSelectedDay(day);
//     const values: Record<string, DailyValue> = {};
//     filteredRows.forEach(row => {
//       if (row.type === 'subitem') {
//         values[row.activity] = row.dailyValues[day] || { quantity: '', amount: '' };
//       }
//     });
//     setTempDailyValues(values);
//     setOpenDataEntryDialog(true);
//   };

//   const handleDailyValueChange = (activity: string, field: keyof DailyValue, value: string) => {
//     setTempDailyValues(prev => ({
//       ...prev,
//       [activity]: {
//         ...prev[activity],
//         [field]: value
//       }
//     }));
//   };

//   const saveSalesData = async (activity: string, day: string, data: DailyValue) => {
//     try {
//       const months: { [key: string]: string } = {
//         Jan: '01', Feb: '02', Mar: '03', Apr: '04',
//         May: '05', Jun: '06', Jul: '07', Aug: '08',
//         Sep: '09', Oct: '10', Nov: '11', Dec: '12'
//       };

//       const monthYear = selectedDate.split(' ');
//       const date = `${monthYear[1]}-${months[monthYear[0]]}-${day.padStart(2, '0')}`;
      
//       const numericAmount = data.amount.replace(/[^0-9.]/g, '');
//       const numericQuantity = data.quantity.replace(/[^0-9.]/g, '');
//       const unit = data.quantity.includes('MT') ? 'MT' : 'L';
      
//       const payload = {
//         type: activity,
//         date,
//         rate: numericAmount,
//         quantity: numericQuantity,
//         unit,
//         rate_unit: 'L',
//       };

//       const response = await fetch(`${BASE_URL}/sales/create-sales/`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload)
//       });

//       if (!response.ok) throw new Error('Failed to save sales data');
//       return await response.json();
//     } catch (error) {
//       console.error('Error saving sales data:', error);
//       throw error;
//     }
//   };

//   const saveCostData = async (activity: string, day: string, data: DailyValue) => {
//     try {
//       const months: { [key: string]: string } = {
//         Jan: '01', Feb: '02', Mar: '03', Apr: '04',
//         May: '05', Jun: '06', Jul: '07', Aug: '08',
//         Sep: '09', Oct: '10', Nov: '11', Dec: '12'
//       };

//       const date = `${selectedDate.split(' ')[1]}-${months[selectedDate.split(' ')[0]]}-${day.padStart(2, '0')}`;
//       const payload = {
//         type: activity,
//         date,
//         rate: data.amount.replace(/[^0-9.]/g, ''),
//         unit: 'MT',
//         rate_unit: 'L',
//         amount: data.amount.replace(/[^0-9.]/g, ''),
//         quantity: data.quantity.replace(/[^0-9.]/g, '')
//       };

//       const response = await fetch(`${BASE_URL}/sales/create-cost/`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload)
//       });

//       if (!response.ok) throw new Error('Failed to save cost data');
//       return await response.json();
//     } catch (error) {
//       console.error('Error saving cost data:', error);
//       throw error;
//     }
//   };

//   const handleSaveDailyValues = async () => {
//     try {
//       const promises = [];
      
//       for (const [activity, data] of Object.entries(tempDailyValues)) {
//         if (selectedTab === 'Sales') {
//           promises.push(saveSalesData(activity, selectedDay, data));
//         } else if (selectedTab === 'Cost') {
//           promises.push(saveCostData(activity, selectedDay, data));
//         }
//       }

//       await Promise.all(promises);

//       setEditableData(prevData => 
//         prevData.map(row => {
//           if (row.type === 'subitem' && tempDailyValues[row.activity]) {
//             return {
//               ...row,
//               dailyValues: {
//                 ...row.dailyValues,
//                 [selectedDay]: tempDailyValues[row.activity]
//               }
//             };
//           }
//           return row;
//         })
//       );

//       setOpenDataEntryDialog(false);
//       setSnackbar({ open: true, message: 'Data saved successfully!', severity: 'success' });
//     } catch (error) {
//       setSnackbar({ open: true, message: 'Failed to save data', severity: 'error' });
//       console.error('Error saving data:', error);
//     }
//   };

//   const fetchSalesData = async () => {
//     try {
//       const response = await fetch(`${BASE_URL}/sales/get-sales-report/`);
//       if (!response.ok) throw new Error('Failed to fetch sales data');
//       return await response.json();
//     } catch (error) {
//       console.error('Error fetching sales data:', error);
//       throw error;
//     }
//   };

//   const fetchCostData = async () => {
//     try {
//       const response = await fetch(`${BASE_URL}/sales/get-cost-report/`);
//       if (!response.ok) throw new Error('Failed to fetch cost data');
//       return await response.json();
//     } catch (error) {
//       console.error('Error fetching cost data:', error);
//       throw error;
//     }
//   };

//   const fetchEarningsData = async () => {
//     try {
//       const response = await fetch(`${BASE_URL}/sales/get-earning-report/`);
//       if (!response.ok) throw new Error('Failed to fetch earnings data');
//       return await response.json();
//     } catch (error) {
//       console.error('Error fetching earnings data:', error);
//       throw error;
//     }
//   };

//   const processEarningsData = (earningsResponse: any) => {
//     const earningsData = earningsResponse.data || [];
//     const earningsMap: Record<string, any> = {};

//     earningsData.forEach((item: any) => {
//       earningsMap[item.type] = item;
//     });

//     return {
//       totalSales: earningsMap['Total sales']?.qty || 0,
//       totalCost: earningsMap['Total cost']?.qty || 0,
//       profitability: parseFloat(earningsMap['Profitability']?.qty?.replace(/,/g, '') || '0'),
//       dailyValues: {
//         'Total sales': earningsMap['Total sales']?.daily || {},
//         'Total cost': earningsMap['Total cost']?.daily || {},
//         'Profitability': earningsMap['Profitability']?.daily || {}
//       }
//     };
//   };

//   const fetchAllData = async () => {
//     try {
//       const [salesResponse, costResponse, earningsResponse] = await Promise.all([
//         fetchSalesData(),
//         fetchCostData(),
//         fetchEarningsData()
//       ]);

//       const salesData = salesResponse.data || [];
//       const salesTotal = salesResponse.total || { daily: {} };
//       const costData = costResponse.data || [];
//       const costTotal = costResponse.total || { daily: {} };
//       const processedEarnings = processEarningsData(earningsResponse);

//       setEditableData(prevData =>
//         prevData.map(row => {
//           if (row.category === 'Sales') {
//             const newDailyValues: Record<string, DailyValue> = {};

//             if (row.type === 'subitem') {
//               const matchingItem = salesData.find((item: any) => {
//                 if (row.activity === 'Fabrication Total' && item.type === 'Fabrication Total') return true;
//                 if (row.activity === 'Galva Total' && item.type === 'Galva Total') return true;
//                 if (row.activity === 'Solar' && item.type === 'Solar') return true;
//                 if (row.activity === 'Scrap' && item.type === 'Scrap') return true;
//                 return false;
//               });

//               if (matchingItem?.daily) {
//                 Object.entries(matchingItem.daily).forEach(([day, dailyData]: [string, any]) => {
//                   const paddedDay = day.padStart(2, '0');
//                   newDailyValues[paddedDay] = {
//                     quantity: `${dailyData.qty} ${matchingItem.unit}`,
//                     amount: `₹${dailyData.amt || '0.0'} L`
//                   };
//                 });
//               }
//             }

//             return {
//               ...row,
//               qty: row.type === 'header' ? salesTotal.qty : salesData.find((item: any) => item.type === row.activity)?.qty || row.qty,
//               rate: row.type === 'header' ? salesTotal.rate : salesData.find((item: any) => item.type === row.activity)?.rate || row.rate,
//               cumulativeValues: row.type === 'header' ? salesTotal.cumulativeValue : salesData.find((item: any) => item.type === row.activity)?.cumulativeValue || row.cumulativeValues,
//               dailyValues: newDailyValues
//             };
//           }

//           if (row.category === 'Cost') {
//             const newDailyValues: Record<string, DailyValue> = {};

//             if (row.type === 'subitem') {
//               const matchingItem = costData.find((item: any) => {
//                 if (row.activity === 'Critical cost parameter' && item.type === 'Critical cost parameter') return true;
//                 if (row.activity === 'Manpower cost' && item.type === 'Manpower cost') return true;
//                 if (row.activity === 'Spare consumable and waste disposal' && item.type === 'Spare consumable and waste disposal') return true;
//                 return false;
//               });

//               if (matchingItem?.daily) {
//                 Object.entries(matchingItem.daily).forEach(([day, dailyData]: [string, any]) => {
//                   const paddedDay = day.padStart(2, '0');
//                   newDailyValues[paddedDay] = {
//                     quantity: `${dailyData.qty} ${matchingItem.unit}`,
//                     amount: `₹${dailyData.amt || '0.0'} L`
//                   };
//                 });
//               }
//             }

//             return {
//               ...row,
//               qty: row.type === 'header' ? costTotal.qty : costData.find((item: any) => item.type === row.activity)?.qty || row.qty,
//               rate: row.type === 'header' ? costTotal.rate : costData.find((item: any) => item.type === row.activity)?.rate || row.rate,
//               cumulativeValues: row.type === 'header' ? costTotal.cumulativeValue : costData.find((item: any) => item.type === row.activity)?.cumulativeValue || row.cumulativeValues,
//               dailyValues: newDailyValues
//             };
//           }

//           if (row.category === 'Earnings') {
//             const newDailyValues: Record<string, DailyValue> = {};

//             if (row.activity === 'Total sales') {
//               Object.entries(processedEarnings.dailyValues['Total sales']).forEach(([day, dailyData]: [string, any]) => {
//                 const paddedDay = day.padStart(2, '0');
//                 newDailyValues[paddedDay] = {
//                   quantity: `${dailyData.qty} MT`,
//                   amount: `₹${dailyData.amt || '0.0'} L`
//                 };
//               });
//             } else if (row.activity === 'Total cost') {
//               Object.entries(processedEarnings.dailyValues['Total cost']).forEach(([day, dailyData]: [string, any]) => {
//                 const paddedDay = day.padStart(2, '0');
//                 newDailyValues[paddedDay] = {
//                   quantity: `${dailyData.qty} MT`,
//                   amount: `₹${dailyData.amt || '0.0'} L`
//                 };
//               });
//             } else if (row.activity === 'Profitability') {
//               Object.entries(processedEarnings.dailyValues['Profitability']).forEach(([day, dailyData]: [string, any]) => {
//                 const paddedDay = day.padStart(2, '0');
//                 newDailyValues[paddedDay] = {
//                   quantity: `${dailyData.qty} MT`,
//                   amount: `₹${dailyData.amt || '0.0'} L`
//                 };
//               });
//             }

//             return {
//               ...row,
//               qty: row.activity === 'Total sales' ? processedEarnings.totalSales 
//                    : row.activity === 'Total cost' ? processedEarnings.totalCost 
//                    : processedEarnings.profitability,
//               rate: 0,
//               cumulativeValues: 0,
//               dailyValues: newDailyValues
//             };
//           }

//           return row;
//         })
//       );

//       setSnackbar({ open: true, message: 'Data loaded successfully!', severity: 'success' });
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       setSnackbar({ open: true, message: 'Failed to load data', severity: 'error' });
//     }
//   };

//   useEffect(() => {
//     fetchAllData();
//   }, [selectedTab]);

//   const daysInMonth = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'));

//   return (
//     <Card sx={{
//       bgcolor: '#E7EBF0', borderRadius: 2, boxShadow: `
//       4px 4px 20px 0px #6F8CB069,
//       -6px -6px 20px 0px #FFFFFF,
//       2px 2px 4px 0px #728EAB1A
//       `, p: 2
//     }}>
//       <CardContent>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//             <Select
//               value={selectedDate}
//               onChange={(e) => setSelectedDate(e.target.value as string)}
//               size="small"
//               sx={{ minWidth: 120, bgcolor: 'white' }}
//             >
//               {months.map((month) => (
//                 <MenuItem key={month} value={month}>{month}</MenuItem>
//               ))}
//             </Select>
            
//             <IconButton 
//               size="small" 
//               onClick={() => setOpenAddMonthDialog(true)}
//               sx={{ bgcolor: 'white' }}
//             >
//               <AddIcon fontSize="small" />
//             </IconButton>
//           </Box>
          
//           <Box sx={{ display: 'flex', gap: 1 }}>
//             {(['Sales', 'Cost', 'Earnings'] as const).map((tab) => (
//               <Button
//                 key={tab}
//                 variant={selectedTab === tab ? 'contained' : 'outlined'}
//                 onClick={() => setSelectedTab(tab)}
//                 size="small"
//               >
//                 {tab}
//               </Button>
//             ))}
//           </Box>
          
//           <IconButton size="small" sx={{ bgcolor: 'white' }}>
//             <FileDownloadIcon fontSize="small" />
//           </IconButton>
//         </Box>

//         <TableContainer component={Paper} sx={{ boxShadow: 'none', bgcolor: '#E7EBF0' }}>
//           <Table sx={{ minWidth: 650 }} size="small">
//             <TableHead>
//               <TableRow>
//                 <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Sr. no.</TableCell>
//                 <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Components</TableCell>
//                 <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Qty</TableCell>
//                 <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Rate</TableCell>
//                 <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Cumulative Values</TableCell>
//                 {daysInMonth.map(day => (
//                   <TableCell key={day} sx={{ fontWeight: 600, color: '#1e293b' }}>
//                     {day}
//                     {canEdit && (
//                       <IconButton 
//                         size="small" 
//                         onClick={() => handleOpenDataEntry(day)}
//                         disabled={!canEdit}
//                       >
//                         <EditIcon fontSize="small" />
//                       </IconButton>
//                     )}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             </TableHead>

//             <TableBody>
//               {filteredRows.map((row) => {
//                 const isHeader = row.type === 'header';
//                 const borderColor = isHeader ? '#d1d5db' : 'transparent';

//                 return (
//                   <TableRow
//                     key={row.id}
//                     sx={{
//                       '&:last-child td, &:last-child th': { border: 0 },
//                       borderBottom: isHeader ? `2px solid ${borderColor}` : 'none',
//                       bgcolor: 'transparent',
//                     }}
//                   >
//                     <TableCell>
//                       {isHeader ? (
//                         <Typography sx={{ color: '#000', fontWeight: 600 }}>
//                           {row.id}
//                         </Typography>
//                       ) : (
//                         <Box sx={{ display: 'flex', alignItems: 'center', pl: 0 }}>
//                           <Box
//                             sx={{
//                               width: 6,
//                               height: 6,
//                               borderRadius: '50%',
//                               bgcolor: getDotColor(row.color),
//                               mr: 1,
//                             }}
//                           />
//                         </Box>
//                       )}
//                     </TableCell>

//                     <TableCell>
//                       <Typography
//                         sx={{
//                           color: isHeader ? '#000' : '#64748b',
//                           fontWeight: isHeader ? 600 : 400,
//                           fontSize: 13,
//                         }}
//                       >
//                         {row.activity}
//                       </Typography>
//                     </TableCell>

//                     <TableCell>
//                       <Typography>{row.qty}</Typography>
//                     </TableCell>

//                     <TableCell>
//                       <Typography>{row.rate}</Typography>
//                     </TableCell>

//                     <TableCell>
//                       <Typography>{row.cumulativeValues}</Typography>
//                     </TableCell>

//                     {daysInMonth.map(day => (
//                       <TableCell key={day}>
//                         {row.dailyValues[day] ? (
//                           <>
//                             <Typography variant="body2">{row.dailyValues[day].quantity}</Typography>
//                             <Typography variant="body2">{row.dailyValues[day].amount}</Typography>
//                           </>
//                         ) : (
//                           <Typography variant="body2" color="textSecondary">-</Typography>
//                         )}
//                       </TableCell>
//                     ))}
//                   </TableRow>
//                 );
//               })}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         {canEdit && (
//           <Dialog open={openDataEntryDialog} onClose={() => setOpenDataEntryDialog(false)} maxWidth="md" fullWidth>
//             <DialogTitle>Enter Data for {selectedDay} {selectedDate}</DialogTitle>
//             <DialogContent>
//               <TableContainer component={Paper}>
//                 <Table>
//                   <TableHead>
//                     <TableRow>
//                       <TableCell>Component</TableCell>
//                       <TableCell>Quantity (e.g., 10.5 MT)</TableCell>
//                       <TableCell>Amount (e.g., ₹10.5 L)</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {filteredRows
//                       .filter(row => row.type === 'subitem')
//                       .map(row => (
//                         <TableRow key={row.id}>
//                           <TableCell>{row.activity}</TableCell>
//                           <TableCell>
//                             <TextField
//                               value={tempDailyValues[row.activity]?.quantity || ''}
//                               onChange={(e) => handleDailyValueChange(row.activity, 'quantity', e.target.value)}
//                               fullWidth
//                               placeholder="e.g., 10.5 MT"
//                             />
//                           </TableCell>
//                           <TableCell>
//                             <TextField
//                               value={tempDailyValues[row.activity]?.amount || ''}
//                               onChange={(e) => handleDailyValueChange(row.activity, 'amount', e.target.value)}
//                               fullWidth
//                               placeholder="e.g., ₹10.5 L"
//                             />
//                           </TableCell>
//                         </TableRow>
//                       ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </DialogContent>
//             <DialogActions>
//               <Button onClick={() => setOpenDataEntryDialog(false)}>Cancel</Button>
//               <Button onClick={handleSaveDailyValues} color="primary" variant="contained">
//                 Save
//               </Button>
//             </DialogActions>
//           </Dialog>
//         )}

//         <Dialog open={openAddMonthDialog} onClose={() => setOpenAddMonthDialog(false)}>
//           <DialogTitle>Add New Month</DialogTitle>
//           <DialogContent>
//             <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
//               <TextField
//                 label="Month"
//                 select
//                 value={newMonth}
//                 onChange={(e) => setNewMonth(e.target.value)}
//                 fullWidth
//                 size="small"
//               >
//                 {[
//                   'January', 'February', 'March', 'April', 
//                   'May', 'June', 'July', 'August',
//                   'September', 'October', 'November', 'December'
//                 ].map(month => (
//                   <MenuItem key={month} value={month}>{month}</MenuItem>
//                 ))}
//               </TextField>
//               <TextField
//                 label="Year"
//                 value={newYear}
//                 onChange={(e) => setNewYear(e.target.value)}
//                 fullWidth
//                 size="small"
//                 type="number"
//               />
//             </Box>
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={() => setOpenAddMonthDialog(false)}>Cancel</Button>
//             <Button 
//               onClick={handleAddNewMonth} 
//               variant="contained" 
//               color="primary"
//               disabled={!newMonth || !newYear}
//             >
//               Add Month
//             </Button>
//           </DialogActions>
//         </Dialog>

//         <Snackbar
//           open={snackbar.open}
//           autoHideDuration={6000}
//           onClose={() => setSnackbar({...snackbar, open: false})}
//         >
//           <Alert 
//             onClose={() => setSnackbar({...snackbar, open: false})} 
//             severity={snackbar.severity}
//             sx={{ width: '100%' }}
//           >
//             {snackbar.message}
//           </Alert>
//         </Snackbar>
//       </CardContent>
//     </Card>
//   );
// };

// export default InputTable;


import React, { useState, useEffect } from 'react';
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
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Snackbar,
  Alert,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

interface DailyValue {
  amount: string;
  quantity: string;
}

interface ProductionTableRow {
  id: number;
  type: 'header' | 'subitem';
  activity: string;
  qty: number | string;
  rate: number | string;
  cumulativeValues: number | string;
  color?: 'blue' | 'orange' | 'green';
  dailyValues: {
    [key: string]: DailyValue;
  };
  category: 'Sales' | 'Cost' | 'Earnings';
}

const initialProductionTableData: ProductionTableRow[] = [
  {
    id: 1,
    type: 'header',
    activity: 'Sales',
    qty: 0,
    rate: 0,
    cumulativeValues: 0,
    category: 'Sales',
    dailyValues: {}
  },
  {
    id: 11,
    type: 'subitem',
    activity: 'Fabrication Total',
    qty: 0,
    rate: 0,
    cumulativeValues: 0,
    color: 'blue',
    category: 'Sales',
    dailyValues: {}
  },
  {
    id: 12,
    type: 'subitem',
    activity: 'Galva Total',
    qty: 0,
    rate: 0,
    cumulativeValues: 0,
    color: 'blue',
    category: 'Sales',
    dailyValues: {}
  },
  {
    id: 13,
    type: 'subitem',
    activity: 'Scrap',
    qty: 0,
    rate: 0,
    cumulativeValues: 0,
    color: 'blue',
    category: 'Sales',
    dailyValues: {}
  },
  {
    id: 10,
    type: 'subitem',
    activity: 'Solar',
    qty: 0,
    rate: 0,
    cumulativeValues: 0,
    color: 'blue',
    category: 'Sales',
    dailyValues: {}
  },
  {
    id: 2,
    type: 'header',
    activity: 'Cost',
    qty: 0,
    rate: 0,
    cumulativeValues: 0,
    category: 'Cost',
    dailyValues: {}
  },
  {
    id: 21,
    type: 'subitem',
    activity: 'Critical cost parameter',
    qty: 0,
    rate: 0,
    cumulativeValues: 0,
    color: 'orange',
    category: 'Cost',
    dailyValues: {}
  },
  {
    id: 22,
    type: 'subitem',
    activity: 'Manpower cost',
    qty: 0,
    rate: 0,
    cumulativeValues: 0,
    color: 'orange',
    category: 'Cost',
    dailyValues: {}
  },
  {
    id: 23,
    type: 'subitem',
    activity: 'Spare consumable and waste disposal',
    qty: 0,
    rate: 0,
    cumulativeValues: 0,
    color: 'orange',
    category: 'Cost',
    dailyValues: {}
  },
  {
    id: 3,
    type: 'header',
    activity: 'Earnings',
    qty: 0,
    rate: 0,
    cumulativeValues: 0,
    category: 'Earnings',
    dailyValues: {}
  },
  {
    id: 31,
    type: 'subitem',
    activity: 'Total sales',
    qty: 0,
    rate: 0,
    cumulativeValues: 0,
    color: 'blue',
    category: 'Earnings',
    dailyValues: {}
  },
  {
    id: 32,
    type: 'subitem',
    activity: 'Total cost',
    qty: 0,
    rate: 0,
    cumulativeValues: 0,
    color: 'orange',
    category: 'Earnings',
    dailyValues: {}
  },
  {
    id: 33,
    type: 'subitem',
    activity: 'Profitability',
    qty: 0,
    rate: 0,
    cumulativeValues: 0,
    color: 'green',
    category: 'Earnings',
    dailyValues: {}
  }
];

const initialMonths = ['Feb 2025'];

const BASE_URL = 'http://43.204.203.153:8000';

const InputTable: React.FC = () => {
  const [months, setMonths] = useState(initialMonths);
  const [selectedDate, setSelectedDate] = useState(months[0]);
  const [selectedTab, setSelectedTab] = useState<'Sales' | 'Cost' | 'Earnings'>('Sales');
  const [openAddMonthDialog, setOpenAddMonthDialog] = useState(false);
  const [openDataEntryDialog, setOpenDataEntryDialog] = useState(false);
  const [newMonth, setNewMonth] = useState('');
  const [newYear, setNewYear] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [editableData, setEditableData] = useState<ProductionTableRow[]>(initialProductionTableData);
  const [tempDailyValues, setTempDailyValues] = useState<Record<string, DailyValue>>({});
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({ open: false, message: '', severity: 'success' });

  // Add formErrors state for validation
  const [formErrors, setFormErrors] = useState<Record<string, { quantity?: boolean; amount?: boolean }>>({});

  const filteredRows = React.useMemo(() => {
    return editableData.filter(row => 
      row.category === selectedTab || 
      (row.type === 'header' && row.activity === selectedTab)
    );
  }, [selectedTab, editableData]);

  const canEdit = selectedTab !== 'Earnings';

  const getDotColor = (color?: string) => {
    switch (color) {
      case 'blue': return '#2563eb';
      case 'orange': return '#f97316';
      case 'green': return '#22c55e';
      default: return 'transparent';
    }
  };

  const handleAddNewMonth = () => {
    if (newMonth && newYear) {
      const monthName = newMonth.slice(0, 3);
      const newMonthYear = `${monthName} ${newYear}`;
      
      if (!months.includes(newMonthYear)) {
        setMonths([...months, newMonthYear]);
        setSelectedDate(newMonthYear);
        
        setEditableData(prevData => 
          prevData.map(row => ({
            ...row,
            dailyValues: {
              ...Object.fromEntries(
                Array.from({ length: 31 }, (_, i) => [
                  (i + 1).toString().padStart(2, '0'),
                  { quantity: '', amount: '' }
                ])
              )
            }
          }))
        );
      }
      
      setNewMonth('');
      setNewYear('');
      setOpenAddMonthDialog(false);
    }
  };

  const handleOpenDataEntry = (day: string) => {
    if (!canEdit) return;
    
    setSelectedDay(day);
    const values: Record<string, DailyValue> = {};
    filteredRows.forEach(row => {
      if (row.type === 'subitem') {
        values[row.activity] = row.dailyValues[day] || { quantity: '', amount: '' };
      }
    });
    setTempDailyValues(values);
    setOpenDataEntryDialog(true);
  };

  const handleDailyValueChange = (activity: string, field: keyof DailyValue, value: string) => {
    setTempDailyValues(prev => ({
      ...prev,
      [activity]: {
        ...prev[activity],
        [field]: value
      }
    }));
  };

  const saveSalesData = async (activity: string, day: string, data: DailyValue) => {
    try {
      const months: { [key: string]: string } = {
        Jan: '01', Feb: '02', Mar: '03', Apr: '04',
        May: '05', Jun: '06', Jul: '07', Aug: '08',
        Sep: '09', Oct: '10', Nov: '11', Dec: '12'
      };

      const monthYear = selectedDate.split(' ');
      const date = `${monthYear[1]}-${months[monthYear[0]]}-${day.padStart(2, '0')}`;
      
      const numericAmount = data.amount.replace(/[^0-9.]/g, '');
      const numericQuantity = data.quantity.replace(/[^0-9.]/g, '');
      const unit = data.quantity.includes('MT') ? 'MT' : 'L';
      
      const payload = {
        type: activity,
        date,
        rate: numericAmount,
        quantity: numericQuantity,
        unit,
        rate_unit: 'L',
      };

      const response = await fetch(`${BASE_URL}/sales/create-sales/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Failed to save sales data');
      return await response.json();
    } catch (error) {
      console.error('Error saving sales data:', error);
      throw error;
    }
  };

  const saveCostData = async (activity: string, day: string, data: DailyValue) => {
    try {
      const months: { [key: string]: string } = {
        Jan: '01', Feb: '02', Mar: '03', Apr: '04',
        May: '05', Jun: '06', Jul: '07', Aug: '08',
        Sep: '09', Oct: '10', Nov: '11', Dec: '12'
      };

      const date = `${selectedDate.split(' ')[1]}-${months[selectedDate.split(' ')[0]]}-${day.padStart(2, '0')}`;
      const payload = {
        type: activity,
        date,
        rate: data.amount.replace(/[^0-9.]/g, ''),
        unit: 'MT',
        rate_unit: 'L',
        amount: data.amount.replace(/[^0-9.]/g, ''),
        quantity: data.quantity.replace(/[^0-9.]/g, '')
      };

      const response = await fetch(`${BASE_URL}/sales/create-cost/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Failed to save cost data');
      return await response.json();
    } catch (error) {
      console.error('Error saving cost data:', error);
      throw error;
    }
  };

  const handleSaveDailyValues = async () => {
  const newErrors: Record<string, { quantity?: boolean; amount?: boolean }> = {};

  // Validation loop
  for (const [activity, data] of Object.entries(tempDailyValues)) {
    const hasQty = data.quantity.trim() !== '';
    const hasAmt = data.amount.trim() !== '';
    newErrors[activity] = {
      quantity: !hasQty,
      amount: !hasAmt,
    };
  }

  setFormErrors(newErrors);

  // If any errors exist, abort
  const hasErrors = Object.values(newErrors).some(err => err.quantity || err.amount);
  if (hasErrors) {
    setSnackbar({ open: true, message: 'Please fill all required fields', severity: 'error' });
    return;
  }

  try {
    const promises = [];

    for (const [activity, data] of Object.entries(tempDailyValues)) {
      if (selectedTab === 'Sales') {
        promises.push(saveSalesData(activity, selectedDay, data));
      } else if (selectedTab === 'Cost') {
        promises.push(saveCostData(activity, selectedDay, data));
      }
    }

    await Promise.all(promises);

    setEditableData(prevData =>
      prevData.map(row => {
        if (row.type === 'subitem' && tempDailyValues[row.activity]) {
          return {
            ...row,
            dailyValues: {
              ...row.dailyValues,
              [selectedDay]: tempDailyValues[row.activity]
            }
          };
        }
        return row;
      })
    );

    setOpenDataEntryDialog(false);
    setSnackbar({ open: true, message: 'Data saved successfully!', severity: 'success' });
  } catch (error) {
    setSnackbar({ open: true, message: 'Failed to save data', severity: 'error' });
    console.error('Error saving data:', error);
  }
};


  const fetchSalesData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/sales/get-sales-report/`);
      if (!response.ok) throw new Error('Failed to fetch sales data');
      return await response.json();
    } catch (error) {
      console.error('Error fetching sales data:', error);
      throw error;
    }
  };

  const fetchCostData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/sales/get-cost-report/`);
      if (!response.ok) throw new Error('Failed to fetch cost data');
      return await response.json();
    } catch (error) {
      console.error('Error fetching cost data:', error);
      throw error;
    }
  };

  const fetchEarningsData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/sales/get-earning-report/`);
      if (!response.ok) throw new Error('Failed to fetch earnings data');
      return await response.json();
    } catch (error) {
      console.error('Error fetching earnings data:', error);
      throw error;
    }
  };

  const processEarningsData = (earningsResponse: any) => {
    const earningsData = earningsResponse.data || [];
    const earningsSummary = {
      id: earningsResponse.id || 0,
      type: earningsResponse.type || 'Earnings Summary',
      qty: earningsResponse.qty || 0,
      rate: earningsResponse.rate || 0,
      unit: earningsResponse.unit || 'MT',
      rate_unit: earningsResponse.rate_unit || 'L',
      cumulativeValue: earningsResponse.cumulativeValue || '0',
      daily: earningsResponse.daily || {}
    };

    const earningsMap: Record<string, any> = {};

    // Process all earnings items including the summary
    [...earningsData, earningsSummary].forEach((item: any) => {
      earningsMap[item.type] = item;
    });

    return {
      earningsMap,
      totalSales: {
        qty: earningsMap['Total sales']?.qty || 0,
        cumulativeValue: earningsMap['Total sales']?.cumulativeValue || '0'
      },
      totalCost: {
        qty: earningsMap['Total cost']?.qty || 0,
        cumulativeValue: earningsMap['Total cost']?.cumulativeValue || '0'
      },
      profitability: {
        qty: earningsMap['Profitability']?.qty || 0,
        cumulativeValue: earningsMap['Profitability']?.cumulativeValue || '0'
      },
      earningsSummary: earningsMap['Earnings Summary'] || {}
    };
  };

  const fetchAllData = async () => {
    try {
      const [salesResponse, costResponse, earningsResponse] = await Promise.all([
        fetchSalesData(),
        fetchCostData(),
        fetchEarningsData()
      ]);

      

      const salesData = salesResponse.data || [];
      const salesTotal = salesResponse.total || { daily: {} };
      const costData = costResponse.data || [];
      const costTotal = costResponse.total || { daily: {} };
      const { 
        earningsMap, 
        totalSales, 
        totalCost, 
        profitability, 
        earningsSummary 
      } = processEarningsData(earningsResponse);

      setEditableData(prevData =>
        prevData.map(row => {
          if (row.category === 'Sales') {
            const newDailyValues: Record<string, DailyValue> = {};

            // For the Sales header row, show total sales data
            if (row.type === 'header' && row.activity === 'Sales') {
              Object.entries(salesTotal.daily).forEach(([day, dailyData]: [string, any]) => {
                const paddedDay = day.padStart(2, '0');
                newDailyValues[paddedDay] = {
                  quantity: `${dailyData.qty} ${salesTotal.unit}`,
                  amount: `₹${dailyData.amt || '0.0'} ${salesTotal.rate_unit}`
                };
              });
            }
            
            // For subitems
            if (row.type === 'subitem') {
              const matchingItem = salesData.find((item: any) => {
                if (row.activity === 'Fabrication Total' && item.type === 'Fabrication Total') return true;
                if (row.activity === 'Galva Total' && item.type === 'Galva Total') return true;
                if (row.activity === 'Solar' && item.type === 'Solar') return true;
                if (row.activity === 'Scrap' && item.type === 'Scrap') return true;
                return false;
              });

              if (matchingItem?.daily) {
                Object.entries(matchingItem.daily).forEach(([day, dailyData]: [string, any]) => {
                  const paddedDay = day.padStart(2, '0');
                  newDailyValues[paddedDay] = {
                    quantity: `${dailyData.qty} ${matchingItem.unit}`,
                    amount: `₹${dailyData.amt || '0.0'} ${matchingItem.rate_unit}`
                  };
                });
              }
            }

            return {
              ...row,
              qty: row.type === 'header' ? salesTotal.qty : 
                   (salesData.find((item: any) => item.type === row.activity)?.qty ?? row.qty),
              rate: row.type === 'header' ? salesTotal.rate : 
                   (salesData.find((item: any) => item.type === row.activity)?.rate ?? row.rate),
              cumulativeValues: row.type === 'header' ? salesTotal.cumulativeValue : 
                   (salesData.find((item: any) => item.type === row.activity)?.cumulativeValue ?? row.cumulativeValues),
              dailyValues: newDailyValues
            };
          }

          if (row.category === 'Cost') {
            const newDailyValues: Record<string, DailyValue> = {};

            if (row.type === 'header' && row.activity === 'Cost') {
              Object.entries(costTotal.daily).forEach(([day, dailyData]: [string, any]) => {
                const paddedDay = day.padStart(2, '0');
                newDailyValues[paddedDay] = {
                  quantity: `${dailyData.qty} ${costTotal.unit}`,
                  amount: `₹${dailyData.amt || '0.0'} ${costTotal.rate_unit}`
                };
              });
            }
            
            // For subitems
            if (row.type === 'subitem') {
              const matchingItem = costData.find((item: any) => {
                if (row.activity === 'Critical cost parameter' && item.type === 'Critical cost parameter') return true;
                if (row.activity === 'Manpower cost' && item.type === 'Manpower cost') return true;
                if (row.activity === 'Spare consumable and waste disposal' && item.type === 'Spare consumable and waste disposal') return true;
                return false;
              });

              if (matchingItem?.daily) {
                Object.entries(matchingItem.daily).forEach(([day, dailyData]: [string, any]) => {
                  const paddedDay = day.padStart(2, '0');
                  newDailyValues[paddedDay] = {
                    quantity: `${dailyData.qty} ${matchingItem.unit}`,
                    amount: `₹${dailyData.amt || '0.0'} ${matchingItem.rate_unit}`
                  };
                });
              }
            }

            return {
              ...row,
              qty: row.type === 'header' ? costTotal.qty : 
                   (costData.find((item: any) => item.type === row.activity)?.qty ?? row.qty),
              rate: row.type === 'header' ? costTotal.rate : 
                   (costData.find((item: any) => item.type === row.activity)?.rate ?? row.rate),
              cumulativeValues: row.type === 'header' ? costTotal.cumulativeValue : 
                   (costData.find((item: any) => item.type === row.activity)?.cumulativeValue ?? row.cumulativeValues),
              dailyValues: newDailyValues
            };
          }

          if (row.category === 'Earnings') {
            const newDailyValues: Record<string, DailyValue> = {};
            const earningsItem = earningsMap[row.activity] || earningsSummary;

            if (earningsItem?.daily) {
              Object.entries(earningsItem.daily).forEach(([day, dailyData]: [string, any]) => {
                const paddedDay = day.padStart(2, '0');
                newDailyValues[paddedDay] = {
                  quantity: `${dailyData.qty} ${earningsItem.unit || 'MT'}`,
                  amount: `₹${dailyData.amt || '0.0'} ${earningsItem.rate_unit || 'L'}`
                };
              });
            }

            return {
              ...row,
              qty: row.activity === 'Total sales' ? totalSales.qty 
                   : row.activity === 'Total cost' ? totalCost.qty 
                   : row.activity === 'Profitability' ? profitability.qty
                   : earningsSummary.qty || 0,
              rate: row.activity === 'Profitability' ? earningsSummary.rate || 0 : row.rate,
              cumulativeValues: row.activity === 'Total sales' ? totalSales.cumulativeValue
                              : row.activity === 'Total cost' ? totalCost.cumulativeValue
                              : row.activity === 'Profitability' ? profitability.cumulativeValue
                              : earningsSummary.cumulativeValue || '0',
              dailyValues: newDailyValues
            };
          }

          return row;
        })
      );

      setSnackbar({ open: true, message: 'Data loaded successfully!', severity: 'success' });
    } catch (error) {
      console.error('Error fetching data:', error);
      setSnackbar({ open: true, message: 'Failed to load data', severity: 'error' });
    }
  };

  useEffect(() => {
    fetchAllData();
  }, [selectedTab]);

  const daysInMonth = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'));
const theme = useTheme();
const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Card sx={{
      bgcolor: '#E7EBF0', borderRadius: 2, boxShadow: `
      4px 4px 20px 0px #6F8CB069,
      -6px -6px 20px 0px #FFFFFF,
      2px 2px 4px 0px #728EAB1A
      `, p: 2
    }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 ,overflowX: isMobile ? 'auto' : 'visible',flexWrap: isMobile ? 'nowrap' : 'wrap',}}>
               <Box sx={{ display: 'flex', gap: 1 ,flexShrink: 0}}>
            {(['Sales', 'Cost', 'Earnings'] as const).map((tab) => (
              <Button
                key={tab}
                variant={selectedTab === tab ? 'contained' : 'outlined'}
                onClick={() => setSelectedTab(tab)}
                size="small"
              >
                {tab}
              </Button>
            ))}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2,ml:2 }}>
            <Select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value as string)}
              size="small"
              sx={{ minWidth: 120, bgcolor: '#E7EBF0',flexShrink: 0  }}
            >
              {months.map((month) => (
                <MenuItem key={month} value={month}>{month}</MenuItem>
              ))}
            </Select>
            
             <IconButton size="small" sx={{ bgcolor: '#E7EBF0',flexShrink: 0  }}>
            <FileDownloadIcon fontSize="small" />
          </IconButton>

            <IconButton 
              size="small" 
              onClick={() => setOpenAddMonthDialog(true)}
              sx={{ bgcolor: '#E7EBF0' , flexShrink: 0}}
            >
              <AddIcon fontSize="small" />
            </IconButton>

            
          </Box>
          
     
          
         
        </Box>

        <TableContainer component={Paper} sx={{ boxShadow: 'none', bgcolor: '#E7EBF0' }}>
          <Table sx={{ minWidth: 650 }} size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Sr. no.</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Components</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Qty</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Rate</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Cumulative Values</TableCell>
                {daysInMonth.map(day => (
                  <TableCell key={day} sx={{ fontWeight: 600, color: '#1e293b' }}>
                    {day}
                    {canEdit && (
                      <IconButton 
                        size="small" 
                        onClick={() => handleOpenDataEntry(day)}
                        disabled={!canEdit}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredRows.map((row) => {
                const isHeader = row.type === 'header';
                const borderColor = isHeader ? '#d1d5db' : 'transparent';

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
                        <Typography sx={{ color: '#000', fontWeight: 600 }}>
                          {row.id}
                        </Typography>
                      ) : (
                        <Box sx={{ display: 'flex', alignItems: 'center', pl: 0 }}>
                          <Box
                            sx={{
                              width: 6,
                              height: 6,
                              borderRadius: '50%',
                              bgcolor: getDotColor(row.color),
                              mr: 1,
                            }}
                          />
                        </Box>
                      )}
                    </TableCell>

                    <TableCell>
                      <Typography
                        sx={{
                          color: isHeader ? '#000' : '#64748b',
                          fontWeight: isHeader ? 600 : 400,
                          fontSize: 13,
                        }}
                      >
                        {row.activity}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Typography>{row.qty}</Typography>
                    </TableCell>

                    <TableCell>
                      <Typography>{row.rate}</Typography>
                    </TableCell>

                    <TableCell>
                      <Typography>
                        {typeof row.cumulativeValues === 'number' 
                          ? row.cumulativeValues.toLocaleString() 
                          : row.cumulativeValues}
                      </Typography>
                    </TableCell>

                    {daysInMonth.map(day => (
                      <TableCell key={day}>
                        {row.dailyValues[day] ? (
                          <>
                            <Typography variant="body2">{row.dailyValues[day].quantity}</Typography>
                            <Typography variant="body2">{row.dailyValues[day].amount}</Typography>
                          </>
                        ) : (
                          <Typography variant="body2" color="textSecondary">-</Typography>
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>


        {/* Popup edit icon click after */}

        {canEdit && (
          <Dialog open={openDataEntryDialog} onClose={() => setOpenDataEntryDialog(false)} maxWidth="md" fullWidth>
            <DialogTitle>Enter Data for {selectedDay} {selectedDate}</DialogTitle>
            <DialogContent>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Component</TableCell>
                      <TableCell>Quantity (e.g., 10.5 MT)</TableCell>
                      <TableCell>Amount (e.g., ₹10.5 L)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredRows
                      .filter(row => row.type === 'subitem')
                      .map(row => (
                        <TableRow key={row.id}>
                          <TableCell>{row.activity}</TableCell>
                          <TableCell>
                           <TextField
  value={tempDailyValues[row.activity]?.quantity || ''}
  onChange={(e) => handleDailyValueChange(row.activity, 'quantity', e.target.value)}
  fullWidth
  placeholder="e.g., 10.5 MT"
  error={formErrors[row.activity]?.quantity || false}
  helperText={formErrors[row.activity]?.quantity ? 'Required' : ''}
/>

<TextField
  value={tempDailyValues[row.activity]?.amount || ''}
  onChange={(e) => handleDailyValueChange(row.activity, 'amount', e.target.value)}
  fullWidth
  placeholder="e.g., ₹10.5 L"
  error={formErrors[row.activity]?.amount || false}
  helperText={formErrors[row.activity]?.amount ? 'Required' : ''}
/>

                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDataEntryDialog(false)}>Cancel</Button>
              <Button onClick={handleSaveDailyValues} color="primary" variant="contained">
                Save
              </Button>
            </DialogActions>
          </Dialog>
        )}

        <Dialog open={openAddMonthDialog} onClose={() => setOpenAddMonthDialog(false)}>
          <DialogTitle>Add New Month</DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
              <TextField
                label="Month"
                select
                value={newMonth}
                onChange={(e) => setNewMonth(e.target.value)}
                fullWidth
                size="small"
              >
                {[
                  'January', 'February', 'March', 'April', 
                  'May', 'June', 'July', 'August',
                  'September', 'October', 'November', 'December'
                ].map(month => (
                  <MenuItem key={month} value={month}>{month}</MenuItem>
                ))}
              </TextField>
           <TextField
  label="Year"
  select
  value={newYear}
  onChange={(e) => setNewYear(e.target.value)}
  fullWidth
  size="small"
>
  {Array.from({ length: 10 }, (_, i) => {
    const year = new Date().getFullYear() - 2 + i; // show range from 2 years ago to 7 years ahead
    return (
      <MenuItem key={year} value={year.toString()}>
        {year}
      </MenuItem>
    );
  })}
</TextField>

            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenAddMonthDialog(false)}>Cancel</Button>
            <Button 
              onClick={handleAddNewMonth} 
              variant="contained" 
              color="primary"
              disabled={!newMonth || !newYear}
            >
              Add Month
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar({...snackbar, open: false})}
        >
          <Alert 
            onClose={() => setSnackbar({...snackbar, open: false})} 
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </CardContent>
    </Card>
  );
};

export default InputTable;