// import React from 'react';

// const data = Array.from({ length: 15 }, (_, index) => ({
//   id: index + 1,
//   client: 'Client 1',
//   date: '10/10/2022',
//   payment: '₹10.5 L',
//   balance: index % 3 === 0 ? '₹0.0 L' : '₹10.5 L',
// }));

// const TransactionBar = ({ color }: { color: string }) => (
//   <div style={styles.progressWrapper}>
//     <div style={styles.label}>6.2L</div>
//     <div style={{ ...styles.barSegment, ...styles[color] }}>
//       <div style={styles.barLine}></div>
//       <div style={styles.barLabelTop}>01 Oct</div>
//       <div style={styles.barLabelBottom}>42%</div>
//     </div>
//     <div style={styles.label}>0.5L</div>
//     <div style={styles.verticalLine}></div>
//     <div style={styles.paidIndicator}>✓</div>
//   </div>
// );

// export default function TransactionTable() {
//   return (
//     <div style={styles.tableContainer}>
//       <h2 style={styles.tableHeading}>Highlights</h2>
      

      
//       <table style={styles.styledTable}>
//         <thead>
//           <tr>
//             <th style={styles.thtd}>Sr.no</th>
//             <th style={styles.thtd}>Clients</th>
//             <th style={styles.thtd}>Date</th>
//             <th style={styles.thtd}>Payment Amt.</th>
//             <th style={styles.thtd}>Balance</th>
//             <th style={styles.thtd}>Transaction Progress</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((item) => (
//             <tr key={item.id}>
//               <td style={styles.thtd}>{item.id}</td>
//               <td style={styles.thtd}>{item.client}</td>
//               <td style={styles.thtd}>{item.date}</td>
//               <td style={styles.thtd}>{item.payment}</td>
//               <td style={styles.thtd}>{item.balance}</td>
//               <td style={styles.thtd}>
//                 <TransactionBar color={item.id % 2 === 0 ? 'orange' : 'blue'} />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// const styles: { [key: string]: React.CSSProperties } = {
//   tableContainer: {
//     padding: '24px',
//     // fontFamily: 'Segoe UI, sans-serif',
//     backgroundColor: '#f9fbfd',
//   },
//   tableHeading: {
//     fontSize: '24px',
//     marginBottom: '16px',
//   },
//   styledTable: {
//     width: '100%',
//     borderCollapse: 'collapse',
//     backgroundColor: 'white',
//     boxShadow: '0 0 8px rgba(0, 0, 0, 0.05)',
//     borderRadius: '8px',
//     overflow: 'hidden',
//   },
//   thtd: {
//     padding: '12px 16px',
//     textAlign: 'left',
//     borderBottom: '1px solid #eee',
//     fontSize: '14px',
//   },
//   progressWrapper: {
//     position: 'relative',
//     display: 'flex',
//     alignItems: 'center',
//     gap: '4px',
//     height: '50px',
//     background: '#f0f5fa',
//     borderRadius: '8px',
//     padding: '8px',
//     overflow: 'hidden',
//   },
//   barSegment: {
//     position: 'relative',
//     height: '10px',
//     borderRadius: '4px',
//     width: '60%',
//   },
//   label: {
//     fontSize: '12px',
//     color: '#333',
//   },
//   blue: {
//     background: '#007bff',
//   },
//   orange: {
//     background: '#fd7e14',
//   },
//   barLine: {
//     position: 'absolute',
//     height: '100%',
//     width: '2px',
//     background: '#222',
//     left: '50%',
//     top: 0,
//   },
//   barLabelTop: {
//     position: 'absolute',
//     fontSize: '10px',
//     color: '#fff',
//     left: '50%',
//     transform: 'translateX(-50%)',
//     top: '-16px',
//   },
//   barLabelBottom: {
//     position: 'absolute',
//     fontSize: '10px',
//     color: '#fff',
//     left: '50%',
//     transform: 'translateX(-50%)',
//     top: '16px',
//   },
//   verticalLine: {
//     height: '20px',
//     width: '1px',
//     background: '#999',
//     marginLeft: '8px',
//   },
//   paidIndicator: {
//     fontSize: '12px',
//     color: 'green',
//     marginLeft: '4px',
//   },
// };


import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  // TextField,
  Select,
  MenuItem,
  LinearProgress,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button
} from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CloseIcon from '@mui/icons-material/Close';

interface ClientData {
  id: number;
  client: string;
  date: string;
  paymentAmt: number;
  balance: number;
  transactionProgress: number;
}

const dummyData: ClientData[] = Array.from({ length: 15 }).map((_, i) => ({
  id: i + 1,
  client: `Client ${i + 1}`,
  date: '10/10/2022',
  paymentAmt: 10.5,
  balance: i % 2 === 0 ? 10.5 : 0,
  transactionProgress: Math.floor(Math.random() * 100),
}));

const FinanceHighlightTable: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('Dec 2022');
  const [openFullscreen, setOpenFullscreen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'Incoming' | 'Outgoing' | 'Finance' | null>(null);

  const filteredData = dummyData.filter((row) =>
    row.client.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenFullscreen = () => {
    setOpenFullscreen(true);
  };

  const handleCloseFullscreen = () => {
    setOpenFullscreen(false);
  };

  return (
    <>
      <Card
        sx={{
          bgcolor: '#E7EBF0',
          borderRadius: '16px',
          boxShadow:
            '4px 4px 20px rgba(111, 140, 176, 0.41), -6px -6px 20px #FFFFFF, 2px 2px 4px rgba(114, 142, 171, 0.1)',
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3,
              overflowX: { xs: 'auto', sm: 'visible' },
              flexWrap: { xs: 'nowrap', sm: 'nowrap' },
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
                  whiteSpace: 'nowrap',
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
                {['Incoming', 'Outgoing', 'Finance'].map((tab) => (
                  <Typography
                    key={tab}
                    onClick={() => setSelectedTab(tab as 'Incoming' | 'Outgoing' | 'Finance')}
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
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
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
                    <CalendarMonthIcon sx={{ fontSize: '16px', color: '#0f172a' }} />
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
              <IconButton size="small" onClick={handleOpenFullscreen}>
                <FullscreenIcon />
              </IconButton>
            </Box>
          </Box>

          <TableContainer
            component={Paper}
            sx={{
              boxShadow: 'none',
              bgcolor: '#E7EBF0',
              borderRadius: 2,
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Sr.no</TableCell>
                  <TableCell>Clients</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Payment Amt.</TableCell>
                  <TableCell>Balance</TableCell>
                  <TableCell>Transaction</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.client}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>₹ {row.paymentAmt} L</TableCell>
                    <TableCell>₹ {row.balance} L</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={row.transactionProgress}
                          sx={{
                            flex: 1,
                            height: 8,
                            borderRadius: 5,
                            bgcolor: '#E7EBF0',
                            '& .MuiLinearProgress-bar': {
                              bgcolor:
                                row.transactionProgress > 75
                                  ? '#22c55e'
                                  : row.transactionProgress > 50
                                  ? '#f97316'
                                  : '#2563eb',
                            },
                          }}
                        />
                        <Typography sx={{ fontSize: 12 }}>
                          {row.transactionProgress}%
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Fullscreen Dialog */}
      <Dialog
        open={openFullscreen}
        onClose={handleCloseFullscreen}
        fullScreen
        maxWidth="xl"
        fullWidth
      >
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Finance Highlights</Typography>
            <IconButton edge="end" onClick={handleCloseFullscreen} aria-label="close">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Sr.no</TableCell>
                  <TableCell>Clients</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>Payment Amt.</TableCell>
                  <TableCell>Balance</TableCell>
                  <TableCell>Transaction</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.client}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>₹ {row.paymentAmt} L</TableCell>
                    <TableCell>₹ {row.balance} L</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={row.transactionProgress}
                          sx={{
                            flex: 1,
                            height: 8,
                            borderRadius: 5,
                            bgcolor: '#E7EBF0',
                            '& .MuiLinearProgress-bar': {
                              bgcolor:
                                row.transactionProgress > 75
                                  ? '#22c55e'
                                  : row.transactionProgress > 50
                                  ? '#f97316'
                                  : '#2563eb',
                            },
                          }}
                        />
                        <Typography sx={{ fontSize: 12 }}>
                          {row.transactionProgress}%
                        </Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseFullscreen} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FinanceHighlightTable;