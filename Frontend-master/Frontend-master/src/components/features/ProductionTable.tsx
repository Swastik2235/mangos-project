// // import React from 'react';

// // const data = Array.from({ length: 15 }, (_, index) => ({
// //   id: index + 1,
// //   client: 'Client 1',
// //   date: '10/10/2022',
// //   payment: '₹10.5 L',
// //   balance: index % 3 === 0 ? '₹0.0 L' : '₹10.5 L',
// // }));

// // const TransactionBar = ({ color }: { color: string }) => (
// //   <div style={styles.progressWrapper}>
// //     <div style={styles.label}>6.2L</div>
// //     <div style={{ ...styles.barSegment, ...styles[color] }}>
// //       <div style={styles.barLine}></div>
// //       <div style={styles.barLabelTop}>01 Oct</div>
// //       <div style={styles.barLabelBottom}>42%</div>
// //     </div>
// //     <div style={styles.label}>0.5L</div>
// //     <div style={styles.verticalLine}></div>
// //     <div style={styles.paidIndicator}>✓</div>
// //   </div>
// // );

// // export default function TransactionTable() {
// //   return (
// //     <div style={styles.tableContainer}>
// //       <h2 style={styles.tableHeading}>Highlights</h2>
// //       <table style={styles.styledTable}>
// //         <thead>
// //           <tr>
// //             <th style={styles.thtd}>Sr.no</th>
// //             <th style={styles.thtd}>Clients</th>
// //             <th style={styles.thtd}>Date</th>
// //             <th style={styles.thtd}>Payment Amt.</th>
// //             <th style={styles.thtd}>Balance</th>
// //             <th style={styles.thtd}>Transaction Progress</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {data.map((item) => (
// //             <tr key={item.id}>
// //               <td style={styles.thtd}>{item.id}</td>
// //               <td style={styles.thtd}>{item.client}</td>
// //               <td style={styles.thtd}>{item.date}</td>
// //               <td style={styles.thtd}>{item.payment}</td>
// //               <td style={styles.thtd}>{item.balance}</td>
// //               <td style={styles.thtd}>
// //                 <TransactionBar color={item.id % 2 === 0 ? 'orange' : 'blue'} />
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // }

// // const styles: { [key: string]: React.CSSProperties } = {
// //   tableContainer: {
// //     padding: '24px',
// //     fontFamily: 'Segoe UI, sans-serif',
// //     backgroundColor: '#f9fbfd',
// //   },
// //   tableHeading: {
// //     fontSize: '24px',
// //     marginBottom: '16px',
// //   },
// //   styledTable: {
// //     width: '100%',
// //     borderCollapse: 'collapse',
// //     backgroundColor: 'white',
// //     boxShadow: '0 0 8px rgba(0, 0, 0, 0.05)',
// //     borderRadius: '8px',
// //     overflow: 'hidden',
// //   },
// //   thtd: {
// //     padding: '12px 16px',
// //     textAlign: 'left',
// //     borderBottom: '1px solid #eee',
// //     fontSize: '14px',
// //   },
// //   progressWrapper: {
// //     position: 'relative',
// //     display: 'flex',
// //     alignItems: 'center',
// //     gap: '4px',
// //     height: '50px',
// //     background: '#f0f5fa',
// //     borderRadius: '8px',
// //     padding: '8px',
// //     overflow: 'hidden',
// //   },
// //   barSegment: {
// //     position: 'relative',
// //     height: '10px',
// //     borderRadius: '4px',
// //     width: '60%',
// //   },
// //   label: {
// //     fontSize: '12px',
// //     color: '#333',
// //   },
// //   blue: {
// //     background: '#007bff',
// //   },
// //   orange: {
// //     background: '#fd7e14',
// //   },
// //   barLine: {
// //     position: 'absolute',
// //     height: '100%',
// //     width: '2px',
// //     background: '#222',
// //     left: '50%',
// //     top: 0,
// //   },
// //   barLabelTop: {
// //     position: 'absolute',
// //     fontSize: '10px',
// //     color: '#fff',
// //     left: '50%',
// //     transform: 'translateX(-50%)',
// //     top: '-16px',
// //   },
// //   barLabelBottom: {
// //     position: 'absolute',
// //     fontSize: '10px',
// //     color: '#fff',
// //     left: '50%',
// //     transform: 'translateX(-50%)',
// //     top: '16px',
// //   },
// //   verticalLine: {
// //     height: '20px',
// //     width: '1px',
// //     background: '#999',
// //     marginLeft: '8px',
// //   },
// //   paidIndicator: {
// //     fontSize: '12px',
// //     color: 'green',
// //     marginLeft: '4px',
// //   },
// // };

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
//   DialogContent,
//   DialogTitle,
// } from '@mui/material';
// import FullscreenIcon from '@mui/icons-material/Fullscreen';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import FileDownloadIcon from '@mui/icons-material/FileDownload';
// import CloseIcon from '@mui/icons-material/Close';

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
//     {
//       id: 1,
//       type: 'header',
//       activity: 'Sales',
//       qty: 30,
//       rate: 191,
//       cumulativeValues: 191551,
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

// const ProductionTable: React.FC = () => {
//   const [selectedDate, setSelectedDate] = useState('Dec 2022');
//   const [selectedTab, setSelectedTab] = useState('Sales');
//   const [openPopup, setOpenPopup] = useState(false);

//   const handleOpenPopup = () => {
//     setOpenPopup(true);
//   };

//   const handleClosePopup = () => {
//     setOpenPopup(false);
//   };

//   const getDotColor = (color?: string) => {
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

//   const getBorderColor = (type: string) => {
//     switch (type) {
//       case 'Sales':
//         return '#2563eb';
//       case 'Cost':
//         return '#f97316';
//       case 'Earnings':
//         return '#22c55e';
//       default:
//         return 'transparent';
//     }
//   };

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
//               {['Sales', 'Cost', 'Earnings'].map((tab) => (
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
//             <IconButton size="small">
//               <FileDownloadIcon />
//             </IconButton>
//             <Select
//               value={selectedDate}
//               onChange={(e) => setSelectedDate(e.target.value)}
//               size="small"
//               sx={{ minWidth: 120, bgcolor: '#E7EBF0' ,boxShadow: '4px 4px 20px 0px #6F8CB069, -6px -6px 20px 0px #FFFFFF, 2px 2px 4px 0px #728EAB1A'}}
//             >
//               <MenuItem value="Dec 2022">Dec 2022</MenuItem>
//             </Select>
//             <IconButton size="small">
//               <MoreVertIcon />
//             </IconButton>
//             <IconButton size="small" onClick={handleOpenPopup}>
//               <FullscreenIcon />
//             </IconButton>
//           </Box>
//         </Box>

//         <TableContainer component={Paper} sx={{ boxShadow: 'none', bgcolor: '#E7EBF0' }}>
//           <Table sx={{ minWidth: 650 }} 
//           size="small"
//           >
//             <TableHead >
//               <TableRow >
//                 <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Sr. no.</TableCell>
//                 <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Activity</TableCell>
//                 <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Qty.</TableCell>
//                 <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Rate</TableCell>
//                 <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Cumulative Values</TableCell>
//                 <TableCell align="center" sx={{ fontWeight: 600, color: '#1e293b' }}>Mon</TableCell>
//                 <TableCell align="center" sx={{ fontWeight: 600, color: '#1e293b' }}>Tue</TableCell>
//                 <TableCell align="center" sx={{ fontWeight: 600, color: '#1e293b', bgcolor: 'transparent' }}>Wed</TableCell>
//                 <TableCell align="center" sx={{ fontWeight: 600, color: '#1e293b' }}>Thu</TableCell>
//                 <TableCell align="center" sx={{ fontWeight: 600, color: '#1e293b' }}>Fri</TableCell>
//                 <TableCell align="center" sx={{ fontWeight: 600, color: '#1e293b' }}>Sat</TableCell>
//                 <TableCell align="center" sx={{ fontWeight: 600, color: '#1e293b' }}>Sun</TableCell>
//               </TableRow>
//               <TableRow>
//                 <TableCell></TableCell>
//                 <TableCell></TableCell>
//                 <TableCell></TableCell>
//                 <TableCell></TableCell>
//                 <TableCell></TableCell>
//                 <TableCell align="center" sx={{ color: '#64748b' , fontSize:'11px'}}>01</TableCell>
//                 <TableCell align="center" sx={{ color: '#64748b' , fontSize:'11px'}}>02</TableCell>
//                 <TableCell align="center" sx={{ color: '#64748b', bgcolor: '#f1f5f9', fontSize:'11px' }}>03</TableCell>
//                 <TableCell align="center" sx={{ color: '#64748b' , fontSize:'11px'}}>04</TableCell>
//                 <TableCell align="center" sx={{ color: '#64748b' , fontSize:'11px'}}>05</TableCell>
//                 <TableCell align="center" sx={{ color: '#64748b' , fontSize:'11px'}}>06</TableCell>
//                 <TableCell align="center" sx={{ color: '#64748b' , fontSize:'11px'}}>07</TableCell>
//               </TableRow>
//             </TableHead>

//             <TableBody>
//   {productionTableData.map((row) => {
//     const isHeader = row.type === 'header';
//     const borderColor = getBorderColor(row.activity);

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
//             <Typography sx={{ color: '#1e293b', fontWeight: 600 }}>
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

//         <TableCell>
//           <Typography
//             sx={{
//               color: isHeader ? '#1e293b' : '#64748b',
//               fontWeight: isHeader ? 600 : 400,
//               fontSize: 13,
//             }}
//           >
//             {row.activity}
//           </Typography>
//         </TableCell>

//         <TableCell>
//           <Typography sx={{ color: '#1e293b', fontWeight: 500, fontSize: 11 }}>
//             {row.qty}
//           </Typography>
//         </TableCell>

//         <TableCell>
//           <Typography sx={{ color: '#1e293b', fontWeight: 500, fontSize: 11 }}>
//             {row.rate}
//           </Typography>
//         </TableCell>

//         <TableCell>
//           <Typography sx={{ color: '#1e293b', fontWeight: 500, fontSize: 11 }}>
//             {row.cumulativeValues}
//           </Typography>
//         </TableCell>

//         {Object.entries(row.dailyValues).map(([key, value]) => (
//   <TableCell
//     key={key}
//     align="center"
//     sx={{
//       bgcolor: 'transparent',
//       color: '#64748b',
//       fontSize: 11,
//       padding: '0px',
//     }}
//   >
//        <Typography sx={{ fontSize: 11, color: '#64748b' }}>
//       {value.quantity}
//     </Typography>
//     <Typography sx={{ fontSize: 11 }}>{value.amount}</Typography>
 
//   </TableCell>
// ))}

//       </TableRow>
//     );
//   })}
// </TableBody>

//           </Table>
//         </TableContainer>

//         <Dialog
//         open={openPopup}
//         onClose={handleClosePopup}
//         maxWidth="xl" // or "lg", "md", etc
//         fullWidth
//       >
//         <DialogTitle>
         
//           <IconButton
//             aria-label="close"
//             onClick={handleClosePopup}
//             sx={{
//               position: 'absolute',
//               right: 8,
//               top: 8, 
//             }}
//           >
//             <CloseIcon />
//           </IconButton>
//         </DialogTitle>
//         <DialogContent dividers sx={{ bgcolor: '#E7EBF0' }}>
//   {/* Expanded Table inside Popup */}
//   <TableContainer component={Paper} sx={{ boxShadow: 'none', bgcolor: '#E7EBF0' }}>
//     <Box sx={{ overflowX: 'auto' }}> {/* Enable horizontal scrolling */}
//       <Table size="small" sx={{ minWidth: 900 }}>  {/* Adjust minWidth to fit 14 days */}
//         <TableHead>
//           <TableRow>
//             <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Sr. no.</TableCell>
//             <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Activity</TableCell>
//             <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Qty.</TableCell>
//             <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Rate</TableCell>
//             <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Cumulative Values</TableCell>

//             {/* Repeat 7 days twice to make 14 days */}
//             {Array.from({ length: 2 }).flatMap((_, repeatIndex) =>
//               ['01', '02', '03', '04', '05', '06', '07'].map((day) => (
//                 <TableCell key={`${day}-${repeatIndex}`} align="center" sx={{ fontWeight: 600, color: '#1e293b' }}>
//                   Day {Number(day) + repeatIndex * 7} {/* Adjusting Day number */}
//                 </TableCell>
//               ))
//             )}
//           </TableRow>
//         </TableHead>

//         <TableBody>
//           {productionTableData.map((row) => {
//             const isHeader = row.type === 'header';
//             const borderColor = getBorderColor(row.activity);

//             return (
//               <TableRow
//                 key={row.id}
//                 sx={{
//                   '&:last-child td, &:last-child th': { border: 0 },
//                   borderBottom: isHeader ? `2px solid ${borderColor}` : 'none',
//                   bgcolor: 'transparent',
//                 }}
//               >
//                 <TableCell>
//                   {isHeader ? (
//                     <Typography sx={{ color: '#1e293b', fontWeight: 600 }}>{row.id}</Typography>
//                   ) : (
//                     <Box sx={{ display: 'flex', alignItems: 'center', pl: 0 }}>
//                       <Box
//                         sx={{
//                           width: 6,
//                           height: 6,
//                           borderRadius: '50%',
//                           bgcolor: getDotColor(row.color),
//                           mr: 1,
//                         }}
//                       />
//                     </Box>
//                   )}
//                 </TableCell>

//                 <TableCell>
//                   <Typography
//                     sx={{
//                       color: isHeader ? '#1e293b' : '#64748b',
//                       fontWeight: isHeader ? 600 : 400,
//                       fontSize: 13,
//                     }}
//                   >
//                     {row.activity}
//                   </Typography>
//                 </TableCell>

//                 <TableCell>
//                   <Typography sx={{ color: '#1e293b', fontWeight: 500, fontSize: 11 }}>
//                     {row.qty}
//                   </Typography>
//                 </TableCell>

//                 <TableCell>
//                   <Typography sx={{ color: '#1e293b', fontWeight: 500, fontSize: 11 }}>
//                     {row.rate}
//                   </Typography>
//                 </TableCell>

//                 <TableCell>
//                   <Typography sx={{ color: '#1e293b', fontWeight: 500, fontSize: 11 }}>
//                     {row.cumulativeValues}
//                   </Typography>
//                 </TableCell>

//                 {/* Repeat 7 days twice to make 14 days */}
//                 {Array.from({ length: 2 }).flatMap((_, repeatIndex) =>
//                   ['01', '02', '03', '04', '05', '06', '07'].map((day) => (
//                     <TableCell key={`${day}-${repeatIndex}-${row.id}`} align="center" sx={{ color: '#64748b', fontSize: 11, padding: '0px' }}>
//                       <Typography sx={{ fontSize: 13, color: '#64748b'}}>
//                         {row.dailyValues[day]?.quantity || '-'}
//                       </Typography>
//                       <Typography sx={{ fontSize: 13 }}>
//                         {row.dailyValues[day]?.amount || '-'}
//                       </Typography>
//                     </TableCell>
//                   ))
//                 )}
//               </TableRow>
//             );
//           })}
//         </TableBody>
//       </Table>
//     </Box>
//   </TableContainer>
// </DialogContent>

//       </Dialog>
//       </CardContent>
//     </Card>
//   );
// };

// export default ProductionTable;

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
//   DialogContent,
//   DialogTitle,
// } from '@mui/material';
// import FullscreenIcon from '@mui/icons-material/Fullscreen';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import FileDownloadIcon from '@mui/icons-material/FileDownload';
// import CloseIcon from '@mui/icons-material/Close';

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

// const ProductionTable: React.FC = () => {
//   const [selectedDate, setSelectedDate] = useState('Dec 2022');
//   const [selectedTab, setSelectedTab] = useState<'All' | 'Sales' | 'Cost' | 'Earnings'>('All');
//   const [openPopup, setOpenPopup] = useState(false);

//   const handleOpenPopup = () => {
//     setOpenPopup(true);
//   };

//   const handleClosePopup = () => {
//     setOpenPopup(false);
//   };

//   const getDotColor = (color?: string) => {
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

//   const getBorderColor = (type: string) => {
//     switch (type) {
//       case 'Sales':
//         return '#2563eb';
//       case 'Cost':
//         return '#f97316';
//       case 'Earnings':
//         return '#22c55e';
//       default:
//         return 'transparent';
//     }
//   };

//   // Filter rows based on selected tab
//   const filteredRows = selectedTab === 'All' 
//     ? productionTableData 
//     : productionTableData.filter(row => row.category === selectedTab || row.type === 'header' && row.activity === selectedTab);

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
//               {['All', 'Sales', 'Cost', 'Earnings'].map((tab) => (
//                 <Typography
//                   key={tab}
//                   onClick={() => setSelectedTab(tab as 'All' | 'Sales' | 'Cost' | 'Earnings')}
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
//             <IconButton size="small">
//               <FileDownloadIcon />
//             </IconButton>
//             <Select
//               value={selectedDate}
//               onChange={(e) => setSelectedDate(e.target.value)}
//               size="small"
//               sx={{ minWidth: 120, bgcolor: '#E7EBF0' ,boxShadow: '4px 4px 20px 0px #6F8CB069, -6px -6px 20px 0px #FFFFFF, 2px 2px 4px 0px #728EAB1A'}}
//             >
//               <MenuItem value="Dec 2022">Dec 2022</MenuItem>
//             </Select>
//             <IconButton size="small">
//               <MoreVertIcon />
//             </IconButton>
//             <IconButton size="small" onClick={handleOpenPopup}>
//               <FullscreenIcon />
//             </IconButton>
//           </Box>
//         </Box>

//         <TableContainer component={Paper} sx={{ boxShadow: 'none', bgcolor: '#E7EBF0' }}>
//           <Table sx={{ minWidth: 650 }} 
//           size="small"
//           >
//             <TableHead >
//               <TableRow >
//                 <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Sr. no.</TableCell>
//                 <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Activity</TableCell>
//                 <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Qty.</TableCell>
//                 <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Rate</TableCell>
//                 <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Cumulative Values</TableCell>
//                 <TableCell align="center" sx={{ fontWeight: 600, color: '#1e293b' }}>Mon</TableCell>
//                 <TableCell align="center" sx={{ fontWeight: 600, color: '#1e293b' }}>Tue</TableCell>
//                 <TableCell align="center" sx={{ fontWeight: 600, color: '#1e293b', bgcolor: 'transparent' }}>Wed</TableCell>
//                 <TableCell align="center" sx={{ fontWeight: 600, color: '#1e293b' }}>Thu</TableCell>
//                 <TableCell align="center" sx={{ fontWeight: 600, color: '#1e293b' }}>Fri</TableCell>
//                 <TableCell align="center" sx={{ fontWeight: 600, color: '#1e293b' }}>Sat</TableCell>
//                 <TableCell align="center" sx={{ fontWeight: 600, color: '#1e293b' }}>Sun</TableCell>
//               </TableRow>
//               <TableRow>
//                 <TableCell></TableCell>
//                 <TableCell></TableCell>
//                 <TableCell></TableCell>
//                 <TableCell></TableCell>
//                 <TableCell></TableCell>
//                 <TableCell align="center" sx={{ color: '#64748b' , fontSize:'11px'}}>01</TableCell>
//                 <TableCell align="center" sx={{ color: '#64748b' , fontSize:'11px'}}>02</TableCell>
//                 <TableCell align="center" sx={{ color: '#64748b', bgcolor: '#f1f5f9', fontSize:'11px' }}>03</TableCell>
//                 <TableCell align="center" sx={{ color: '#64748b' , fontSize:'11px'}}>04</TableCell>
//                 <TableCell align="center" sx={{ color: '#64748b' , fontSize:'11px'}}>05</TableCell>
//                 <TableCell align="center" sx={{ color: '#64748b' , fontSize:'11px'}}>06</TableCell>
//                 <TableCell align="center" sx={{ color: '#64748b' , fontSize:'11px'}}>07</TableCell>
//               </TableRow>
//             </TableHead>

//             <TableBody>
//               {filteredRows.map((row) => {
//                 const isHeader = row.type === 'header';
//                 const borderColor = getBorderColor(row.activity);

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
//                         <Typography sx={{ color: '#1e293b', fontWeight: 600 }}>
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
//                           color: isHeader ? '#1e293b' : '#64748b',
//                           fontWeight: isHeader ? 600 : 400,
//                           fontSize: 13,
//                         }}
//                       >
//                         {row.activity}
//                       </Typography>
//                     </TableCell>

//                     <TableCell>
//                       <Typography sx={{ color: '#1e293b', fontWeight: 500, fontSize: 11 }}>
//                         {row.qty}
//                       </Typography>
//                     </TableCell>

//                     <TableCell>
//                       <Typography sx={{ color: '#1e293b', fontWeight: 500, fontSize: 11 }}>
//                         {row.rate}
//                       </Typography>
//                     </TableCell>

//                     <TableCell>
//                       <Typography sx={{ color: '#1e293b', fontWeight: 500, fontSize: 11 }}>
//                         {row.cumulativeValues}
//                       </Typography>
//                     </TableCell>

//                     {Object.entries(row.dailyValues).map(([key, value]) => (
//                       <TableCell
//                         key={key}
//                         align="center"
//                         sx={{
//                           bgcolor: 'transparent',
//                           color: '#64748b',
//                           fontSize: 11,
//                           padding: '0px',
//                         }}
//                       >
//                           <Typography sx={{ fontSize: 11, color: '#64748b' }}>
//                           {value.quantity}
//                         </Typography>
//                         <Typography sx={{ fontSize: 11 }}>{value.amount}</Typography>
//                       </TableCell>
//                     ))}
//                   </TableRow>
//                 );
//               })}
//             </TableBody>
//           </Table>
//         </TableContainer>

//         <Dialog
//           open={openPopup}
//           onClose={handleClosePopup}
//           maxWidth="xl"
//           fullWidth
//         >
//           <DialogTitle>
//             <IconButton
//               aria-label="close"
//               onClick={handleClosePopup}
//               sx={{
//                 position: 'absolute',
//                 right: 8,
//                 top: 8, 
//               }}
//             >
//               <CloseIcon />
//             </IconButton>
//           </DialogTitle>
//           <DialogContent dividers sx={{ bgcolor: '#E7EBF0' }}>
//             <TableContainer component={Paper} sx={{ boxShadow: 'none', bgcolor: '#E7EBF0' }}>
//               <Box sx={{ overflowX: 'auto' }}>
//                 <Table size="small" sx={{ minWidth: 900 }}>
//                   <TableHead>
//                     <TableRow>
//                       <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Sr. no.</TableCell>
//                       <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Activity</TableCell>
//                       <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Qty.</TableCell>
//                       <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Rate</TableCell>
//                       <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Cumulative Values</TableCell>
//                       {Array.from({ length: 2 }).flatMap((_, repeatIndex) =>
//                         ['01', '02', '03', '04', '05', '06', '07'].map((day) => (
//                           <TableCell key={`${day}-${repeatIndex}`} align="center" sx={{ fontWeight: 600, color: '#1e293b' }}>
//                             Day {Number(day) + repeatIndex * 7}
//                           </TableCell>
//                         )))
//                       }
//                     </TableRow>
//                   </TableHead>

//                   <TableBody>
//                     {filteredRows.map((row) => {
//                       const isHeader = row.type === 'header';
//                       const borderColor = getBorderColor(row.activity);

//                       return (
//                         <TableRow
//                           key={row.id}
//                           sx={{
//                             '&:last-child td, &:last-child th': { border: 0 },
//                             borderBottom: isHeader ? `2px solid ${borderColor}` : 'none',
//                             bgcolor: 'transparent',
//                           }}
//                         >
//                           <TableCell>
//                             {isHeader ? (
//                               <Typography sx={{ color: '#1e293b', fontWeight: 600 }}>{row.id}</Typography>
//                             ) : (
//                               <Box sx={{ display: 'flex', alignItems: 'center', pl: 0 }}>
//                                 <Box
//                                   sx={{
//                                     width: 6,
//                                     height: 6,
//                                     borderRadius: '50%',
//                                     bgcolor: getDotColor(row.color),
//                                     mr: 1,
//                                   }}
//                                 />
//                               </Box>
//                             )}
//                           </TableCell>

//                           <TableCell>
//                             <Typography
//                               sx={{
//                                 color: isHeader ? '#1e293b' : '#64748b',
//                                 fontWeight: isHeader ? 600 : 400,
//                                 fontSize: 13,
//                               }}
//                             >
//                               {row.activity}
//                             </Typography>
//                           </TableCell>

//                           <TableCell>
//                             <Typography sx={{ color: '#1e293b', fontWeight: 500, fontSize: 11 }}>
//                               {row.qty}
//                             </Typography>
//                           </TableCell>

//                           <TableCell>
//                             <Typography sx={{ color: '#1e293b', fontWeight: 500, fontSize: 11 }}>
//                               {row.rate}
//                             </Typography>
//                           </TableCell>

//                           <TableCell>
//                             <Typography sx={{ color: '#1e293b', fontWeight: 500, fontSize: 11 }}>
//                               {row.cumulativeValues}
//                             </Typography>
//                           </TableCell>

//                           {Array.from({ length: 2 }).flatMap((_, repeatIndex) =>
//                             ['01', '02', '03', '04', '05', '06', '07'].map((day) => (
//                               <TableCell key={`${day}-${repeatIndex}-${row.id}`} align="center" sx={{ color: '#64748b', fontSize: 11, padding: '0px' }}>
//                                 <Typography sx={{ fontSize: 13, color: '#64748b'}}>
//                                   {row.dailyValues[day]?.quantity || '-'}
//                                 </Typography>
//                                 <Typography sx={{ fontSize: 13 }}>
//                                   {row.dailyValues[day]?.amount || '-'}
//                                 </Typography>
//                               </TableCell>
//                             ))
//                           )}
//                         </TableRow>
//                       );
//                     })}
//                   </TableBody>
//                 </Table>
//               </Box>
//             </TableContainer>
//           </DialogContent>
//         </Dialog>
//       </CardContent>
//     </Card>
//   );
// };

// export default ProductionTable;




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
  DialogContent,
  DialogTitle,
  CircularProgress
} from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FileUploadIcon from '@mui/icons-material/FileUpload'; // Import Export-like icon
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

import CloseIcon from '@mui/icons-material/Close';
// import axios from 'axios';
import endpoints from "../../utils/apiEndPoints";
import { apiRequest } from "../../utils/apiclient";
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';

interface DailyValue {
  amount: string;
  quantity: string;

}

interface ProductionTableRow {
  id: number;
  type: 'header' | 'subitem';
  activity: string;
  qty: number;
  rate: number;
  cumulativeValues: number;
  color?: 'blue' | 'orange' | 'green';
  dailyValues: {
    [key: string]: DailyValue;
  };
  category: 'Sales' | 'Cost' | 'Earnings';
}

interface ApiResponse {
  status: boolean;
  message: string;
  data: {
    sales: Array<{
      id: number;
      type: string;
      qty: number;
      rate: number;
      unit: string;
      rate_unit: string;
      cumulativeValue: number;
      daily: {
        [key: string]: {
          qty: number;
          amt: number;
        };
      };
    }>;
    cost: Array<{
      id: number;
      type: string;
      qty: number;
      rate: number;
      unit: string;
      rate_unit: string;
      cumulativeValue: number;
      daily: {
        [key: string]: {
          qty: number;
          amt: number;
        };
      };
    }>;
    earnings: Array<{
      id: number;
      type: string;
      qty: number;
      rate: number;
      unit: string;
      rate_unit: string;
      cumulativeValue: number;
      daily: {
        [key: string]: {
          qty: number;
          amt: number;
        };
      };
    }>;
  };
}

const ProductionTable: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('Feb 2025');
  const [selectedTab, setSelectedTab] = useState<'Sales' | 'Cost' | 'Earnings' | null>(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [tableData, setTableData] = useState<ProductionTableRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

useEffect(() => {
  const fetchData = async () => {
    try {
      const apiData = await apiRequest<{ status: boolean; data?: any }>(
        "GET",
        endpoints.getHighlightReport
      );

      if (apiData.status && apiData.data) {
        transformApiData(apiData.data);
      } else {
        setError("Invalid data format received from API");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to fetch data from API");
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);


  const transformApiData = (apiData: ApiResponse['data']) => {
    const transformedData: ProductionTableRow[] = [];

    // Helper function to transform daily values
    const transformDailyValues = (daily: { [key: string]: { qty: number; amt: number } }) => {
      const transformed: { [key: string]: DailyValue } = {};
      for (const [day, value] of Object.entries(daily)) {
        transformed[day] = {
          quantity: `${value.qty} ${value.qty === 0 ? '' : 'MT'}`.trim(),
          amount: `₹${value.amt} ${value.amt === 0 ? '' : 'L'}`.trim()
        };
      }
      
      // Ensure all days from 01 to 07 are present
      for (let i = 1; i <= 7; i++) {
        const day = i.toString().padStart(2, '0');
        if (!transformed[day]) {
          transformed[day] = {
            quantity: '-',
            amount: '-'
          };
        }
      }
      
      return transformed;
    };

    // Add Sales data
    const salesTotal = apiData.sales.find(item => item.id === 0);
    if (salesTotal) {
      transformedData.push({
        id: 1,
        type: 'header',
        activity: 'Sales',
        qty: salesTotal.qty,
        rate: salesTotal.rate,
        cumulativeValues: salesTotal.cumulativeValue,
        category: 'Sales',
        dailyValues: transformDailyValues(salesTotal.daily)
      });
    }

    apiData.sales.filter(item => item.id !== 0).forEach(item => {
      transformedData.push({
        id: item.id + 10, // Offset to match your existing IDs
        type: 'subitem',
        activity: item.type,
        qty: item.qty,
        rate: item.rate,
        cumulativeValues: item.cumulativeValue,
        color: 'blue',
        category: 'Sales',
        dailyValues: transformDailyValues(item.daily)
      });
    });

    // Add Cost data
    const costTotal = apiData.cost.find(item => item.id === 0);
    if (costTotal) {
      transformedData.push({
        id: 2,
        type: 'header',
        activity: 'Cost',
        qty: costTotal.qty,
        rate: costTotal.rate,
        cumulativeValues: costTotal.cumulativeValue,
        category: 'Cost',
        dailyValues: transformDailyValues(costTotal.daily)
      });
    }

    apiData.cost.filter(item => item.id !== 0).forEach(item => {
      transformedData.push({
        id: item.id + 20, // Offset to match your existing IDs
        type: 'subitem',
        activity: item.type,
        qty: item.qty,
        rate: item.rate,
        cumulativeValues: item.cumulativeValue,
        color: 'orange',
        category: 'Cost',
        dailyValues: transformDailyValues(item.daily)
      });
    });

    // Add Earnings data
    const earningsTotal = apiData.earnings.find(item => item.id === 0);
    if (earningsTotal) {
      transformedData.push({
        id: 3,
        type: 'header',
        activity: 'Earnings',
        qty: earningsTotal.qty,
        rate: earningsTotal.rate,
        cumulativeValues: earningsTotal.cumulativeValue,
        category: 'Earnings',
        dailyValues: transformDailyValues(earningsTotal.daily)
      });
    }

    apiData.earnings.filter(item => item.id !== 0).forEach(item => {
      transformedData.push({
        id: item.id + 30, // Offset to match your existing IDs
        type: 'subitem',
        activity: item.type,
        qty: item.qty,
        rate: item.rate,
        cumulativeValues: item.cumulativeValue,
        color: item.type === 'Profitability' ? 'green' : item.type === 'Total sales' ? 'blue' : 'orange',
        category: 'Earnings',
        dailyValues: transformDailyValues(item.daily)
      });
    });

    setTableData(transformedData);
  };

  const handleOpenPopup = () => {
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const getDotColor = (color?: string) => {
    switch (color) {
      case 'blue':
        return '#2563eb';
      case 'orange':
        return '#f97316';
      case 'green':
        return '#22c55e';
      default:
        return 'transparent';
    }
  };

  const getBorderColor = (type: string) => {
    switch (type) {
      case 'Sales':
        return '#2563eb';
      case 'Cost':
        return '#f97316';
      case 'Earnings':
        return '#22c55e';
      default:
        return 'transparent';
    }
  };

  // Filter rows based on selected tab
  const filteredRows = selectedTab === null 
    ? tableData 
    : tableData.filter(row => row.category === selectedTab || (row.type === 'header' && row.activity === selectedTab));

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (tableData.length === 0) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <Typography>No data available</Typography>
      </Box>
    );
  }

  return (
    <Card sx={{ bgcolor: '#E7EBF0', borderRadius: 2, boxShadow: `
      4px 4px 20px 0px #6F8CB069,
      -6px -6px 20px 0px #FFFFFF,
      2px 2px 4px 0px #728EAB1A
      `, p: 2 }}>
      <CardContent>
      <Box
  sx={{
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 3,
    overflowX: { xs: 'auto', sm: 'visible' }, // allow horizontal scroll on mobile
    flexWrap: { xs: 'nowrap', sm: 'nowrap' }, // avoid wrapping
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
        textDecoration: selectedTab === null ? 'underline' : 'none',
        whiteSpace: 'nowrap', // prevents breaking
        flexShrink: 0,
      }}
      onClick={() => setSelectedTab(null)}
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
      {['Sales', 'Cost', 'Earnings'].map((tab) => (
        <Typography
          key={tab}
          onClick={() => setSelectedTab(tab as 'Sales' | 'Cost' | 'Earnings')}
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
  {/* Add Search Field */}
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
      <CalendarMonthIcon sx={{ fontSize: '16px', color: '#0f172a' }} /> {/*  icon */}
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
    <IconButton size="small" onClick={handleOpenPopup}>
      <FullscreenIcon />
    </IconButton>
  </Box>
</Box>


        <TableContainer component={Paper} sx={{ boxShadow: 'none', bgcolor: '#E7EBF0' }}>
          <Table sx={{ minWidth: 650 }} size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Sr. no.</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Activity</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Qty.</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Rate</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Cumulative Values</TableCell>
                <TableCell align="center" sx={{ fontWeight: 600, color: '#1e293b' }}>Mon</TableCell>
                <TableCell align="center" sx={{ fontWeight: 600, color: '#1e293b' }}>Tue</TableCell>
                <TableCell align="center" sx={{ fontWeight: 600, color: '#1e293b' }}>Wed</TableCell>
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
                <TableCell align="center" sx={{ color: '#64748b',  fontSize:'11px'}}>03</TableCell>
                <TableCell align="center" sx={{ color: '#64748b', fontSize:'11px'}}>04</TableCell>
                <TableCell align="center" sx={{ color: '#64748b', fontSize:'11px'}}>05</TableCell>
                <TableCell align="center" sx={{ color: '#64748b', fontSize:'11px'}}>06</TableCell>
                <TableCell align="center" sx={{ color: '#64748b', fontSize:'11px'}}>07</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredRows.map((row) => {
                const isHeader = row.type === 'header';
                const borderColor = getBorderColor(row.activity);

                return (
<TableRow
  key={row.id}
  sx={{
    '&:last-child td, &:last-child th': { border: 0 },
    borderBottom: isHeader ? `2px solid ${borderColor}` : 'none',
    bgcolor: 'transparent',
    '& td': {
      fontWeight: isHeader ? 600 : 400, // Make all cells in header row bold
    }
  }}
>
  <TableCell>
    {isHeader ? (
      <Typography sx={{ color: '#1e293b', fontWeight: 600 }}>
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
        color: isHeader ? '#1e293b' : '#64748b',
        fontWeight: isHeader ? 700 : 400, // Increased to 700 for more boldness
        fontSize: 13,
      }}
    >
      {row.activity}
    </Typography>
  </TableCell>

  <TableCell>
    <Typography sx={{ 
      color: '#1e293b', 
      fontWeight: isHeader ? 700 : 500, // Make bold for headers
      fontSize: 11 
    }}>
      {row.qty}
    </Typography>
  </TableCell>

  <TableCell>
    <Typography sx={{ 
      color: '#1e293b', 
      fontWeight: isHeader ? 700 : 500, // Make bold for headers
      fontSize: 11 
    }}>
      {row.rate}
    </Typography>
  </TableCell>

  <TableCell>
    <Typography sx={{ 
      color: '#1e293b', 
      fontWeight: isHeader ? 700 : 500, // Make bold for headers
      fontSize: 11 
    }}>
      {row.cumulativeValues}
    </Typography>
  </TableCell>

  {['01', '02', '03', '04', '05', '06', '07'].map((day) => (
    <TableCell
      key={day}
      align="center"
    >
      <Typography sx={{ 
        fontSize: 11, 
        color: '#64748b',
        fontWeight: isHeader ? 700 : 400 // Make bold for headers
      }}>
        {row.dailyValues[day]?.quantity || '-'}
      </Typography>
      <Typography sx={{ 
        fontSize: 11,
        fontWeight: isHeader ? 700 : 400 // Make bold for headers
      }}>
        {row.dailyValues[day]?.amount || '-'}
      </Typography>
    </TableCell>
  ))}
</TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog
          open={openPopup}
          onClose={handleClosePopup}
          maxWidth="xl"
          fullWidth
        >
          <DialogTitle>
            <IconButton
              aria-label="close"
              onClick={handleClosePopup}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8, 
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers sx={{ bgcolor: '#E7EBF0' }}>
            <TableContainer component={Paper} sx={{ boxShadow: 'none', bgcolor: '#E7EBF0' }}>
              <Box sx={{ overflowX: 'auto' }}>
                <Table size="small" sx={{ minWidth: 900 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Sr. no.</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Activity</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Qty.</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Rate</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Cumulative Values</TableCell>
                      {Array.from({ length: 2 }).flatMap((_, repeatIndex) =>
                        ['01', '02', '03', '04', '05', '06', '07'].map((day) => (
                          <TableCell key={`${day}-${repeatIndex}`} align="center" sx={{ fontWeight: 600, color: '#1e293b' }}>
                            Day {Number(day) + repeatIndex * 7}
                          </TableCell>
                        )))
                      }
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {filteredRows.map((row) => {
                      const isHeader = row.type === 'header';
                      const borderColor = getBorderColor(row.activity);

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
      <Typography sx={{ color: '#1e293b', fontWeight: 700 }}> {/* Bold for header rows */}
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
        color: isHeader ? '#1e293b' : '#64748b',
        fontWeight: isHeader ? 700 : 400, // Bold for header rows
        fontSize: 13,
      }}
    >
      {row.activity}
    </Typography>
  </TableCell>

  {/* Qty, Rate, Cumulative Values - Make Bold for Headers */}
  <TableCell>
    <Typography sx={{ 
      color: '#1e293b', 
      fontWeight: isHeader ? 700 : 500, // Bold for header rows
      fontSize: 11 
    }}>
      {row.qty}
    </Typography>
  </TableCell>

  <TableCell>
    <Typography sx={{ 
      color: '#1e293b', 
      fontWeight: isHeader ? 700 : 500, // Bold for header rows
      fontSize: 11 
    }}>
      {row.rate}
    </Typography>
  </TableCell>

  <TableCell>
    <Typography sx={{ 
      color: '#1e293b', 
      fontWeight: isHeader ? 700 : 500, // Bold for header rows
      fontSize: 11 
    }}>
      {row.cumulativeValues}
    </Typography>
  </TableCell>

  {/* Daily Values - Make Bold for Headers */}
  {['01', '02', '03', '04', '05', '06', '07'].map((day) => (
    <TableCell
      key={day}
      align="center"
    >
      <Typography sx={{ 
        fontSize: 11, 
        color: '#64748b',
        fontWeight: isHeader ? 700 : 400 // Bold for header rows
      }}>
        {row.dailyValues[day]?.quantity || '-'}
      </Typography>
      <Typography sx={{ 
        fontSize: 11,
        fontWeight: isHeader ? 700 : 400 // Bold for header rows
      }}>
        {row.dailyValues[day]?.amount || '-'}
      </Typography>
    </TableCell>
  ))}
</TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </Box>
            </TableContainer>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default ProductionTable;