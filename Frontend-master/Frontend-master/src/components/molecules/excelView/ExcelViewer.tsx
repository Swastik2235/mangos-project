
// import React from 'react';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
// } from '@mui/material';

// interface ExcelViewerProps {
//   data: any[][] | null;
// }

// const ExcelViewer: React.FC<ExcelViewerProps> = ({ data }) => {
//   if (!data || data.length === 0) return null;

//   const headers = data[0];
//   const rows = data.slice(1);

//   return (
//     <TableContainer sx={{ maxHeight: 440 }}>
//       <Table stickyHeader>
//         <TableHead>
//           <TableRow>
//             {headers.map((header: any, index: number) => (
//               <TableCell key={index} sx={{ fontWeight: 'bold' }}>
//                 {header}
//               </TableCell>
//             ))}
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row: any[], rowIndex: number) => (
//             <TableRow key={rowIndex}>
//               {row.map((cell: any, cellIndex: number) => (
//                 <TableCell key={cellIndex}>{cell}</TableCell>
//               ))}
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default ExcelViewer;


// import React from 'react';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Box,
//   Typography,
// } from '@mui/material';

// interface ExcelViewerProps {
//   data: any[][] | null;
// }

// const ExcelViewer: React.FC<ExcelViewerProps> = ({ data }) => {
//   if (!data || data.length === 0) {
//     return (
//       <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           height: '100%',
//           color: '#757575',
//         }}
//       >
//         <Typography variant="h6">No data to display</Typography>
//       </Box>
//     );
//   }

//   const headers = data[0];
//   const rows = data.slice(1);

//   return (
//     <Box
//       sx={{
//         overflowX: 'auto',
//         border: '1px solid #e0e0e0',
//         borderRadius: '8px',
//         maxHeight: '80vh',
//         boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
//       }}
//     >
//       <TableContainer>
//         <Table
//           stickyHeader
//           sx={{
//             minWidth: 750,
//             '& .MuiTableCell-root': {
//               border: '1px solid #d3d3d3',
//             },
//           }}
//         >
//           <TableHead>
//             <TableRow>
//               {headers.map((header: any, index: number) => (
//                 <TableCell
//                   key={index}
//                   sx={{
//                     fontWeight: 'bold',
//                     backgroundColor: '#f9f9f9',
//                     textAlign: 'center',
//                     color: '#333',
//                     fontSize: '1rem',
//                     minWidth: 120,
//                     whiteSpace: 'nowrap',
//                   }}
//                 >
//                   {header || ' '}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows.map((row: any[], rowIndex: number) => (
//               <TableRow
//                 key={rowIndex}
//                 sx={{
//                   '&:nth-of-type(odd)': { backgroundColor: '#f7f7f7' },
//                   '&:nth-of-type(even)': { backgroundColor: '#ffffff' },
//                   '&:hover': { backgroundColor: '#ececec' },
//                 }}
//               >
//                 {row.map((cell: any, cellIndex: number) => (
//                   <TableCell
//                     key={cellIndex}
//                     sx={{
//                       textAlign: 'center',
//                       minWidth: 120,
//                       fontSize: '0.875rem',
//                       color: '#555',
//                       whiteSpace: 'nowrap',
//                     }}
//                   >
//                     {cell || ' '}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// };

// export default ExcelViewer;

// import React from 'react';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Box,
//   Typography,
// } from '@mui/material';

// interface ExcelViewerProps {
//   data: any[][] | null;
// }

// const ExcelViewer: React.FC<ExcelViewerProps> = ({ data }) => {
//   if (!data || data.length === 0) {
//     return (
//       <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           height: '100%',
//           color: '#757575',
//         }}
//       >
//         <Typography variant="h6">No data to display</Typography>
//       </Box>
//     );
//   }

//   const headers = data[0];
//   const rows = data.slice(1);

//   return (
//     <Box
//       sx={{
//         overflow: 'auto',
//         maxHeight: '80vh',
//         border: '1px solid #ddd',
//         borderRadius: '8px',
//         boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
//         backgroundColor: '#f4f4f420',
//       }}
//     >
//       <Box
//         sx={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           padding: '16px 0',
//           backgroundColor: '#f8f8f880',
//           borderBottom: '2px solid #e0e0e0',
//         }}
//       >
//         <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#333' }}>
//           Job Card Excel
//         </Typography>
//       </Box>
//       <TableContainer>
//         <Table
//           stickyHeader
//           sx={{
//             minWidth: 900,
//             '& .MuiTableCell-root': {
//               border: '1px solid #e0e0e0',
//             },
//             '& .MuiTableHead-root': {
//               backgroundColor: '#f1f1f1',
//             },
//           }}
//         >
//           <TableHead>
//             <TableRow>
//               {headers.map((header: any, index: number) => (
//                 <TableCell
//                   key={index}
//                   sx={{
//                     fontWeight: 'bold',
//                     // backgroundColor: '#d3d3d3',
//                     textAlign: 'center',
//                     fontSize: '1rem',
//                     padding: '8px',
//                   }}
//                 >
//                   {header || ' '}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {rows.map((row: any[], rowIndex: number) => (
//               <TableRow
//                 key={rowIndex}
//                 sx={{
//                   '&:nth-of-type(odd)': { backgroundColor: '#fff80' },
//                   '&:nth-of-type(even)': { backgroundColor: '#f9f9f980' },
//                   '&:hover': {
//                     backgroundColor: '#eaf7ff',
//                   },
//                   transition: 'background-color 0.3s ease',
//                 }}
//               >
//                 {row.map((cell: any, cellIndex: number) => (
//                   <TableCell
//                     key={cellIndex}
//                     sx={{
//                       textAlign: 'left',
//                       padding: '6px 10px',
//                       fontSize: '0.9rem',
//                       color: '#555',
//                       whiteSpace: 'nowrap',
//                     }}
//                   >
//                     {cell || ' '}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// };

// export default ExcelViewer;

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Typography,
} from '@mui/material';

interface ExcelViewerProps {
  data: any[][] | null;
}

const ExcelViewer: React.FC<ExcelViewerProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          color: '#757575',
        }}
      >
        <Typography variant="h6">No data to display</Typography>
      </Box>
    );
  }

  const headers = data[0];
  const rows = data.slice(1);

  return (
    <Box
      sx={{
        overflow: 'auto',
        maxHeight: '80vh',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f4f4f420',
      }}
    >
      
      <TableContainer sx={{ maxHeight: '70vh', overflowY: 'auto' }}>
        <Table
          stickyHeader
          sx={{
            minWidth: 900,
            '& .MuiTableCell-root': {
              border: '1px solid #e0e0e0',
            },
            '& .MuiTableHead-root': {
              backgroundColor: '#f1f1f1',
            },
          }}
        >
          <TableHead>
            <TableRow>
              {headers.map((header: string, index: number) => (
                <TableCell
                  key={index}
                  sx={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    fontSize: '1rem',
                    padding: '8px',
                  }}
                >
                  {header || ' '}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: any[], rowIndex: number) => (
              <TableRow
                key={rowIndex}
                sx={{
                  '&:nth-of-type(odd)': { backgroundColor: '#fff80' },
                  '&:nth-of-type(even)': { backgroundColor: '#f9f9f980' },
                  '&:hover': {
                    backgroundColor: '#eaf7ff',
                  },
                  transition: 'background-color 0.3s ease',
                }}
              >
                {row.map((cell: any, cellIndex: number) => (
                  <TableCell
                    key={cellIndex}
                    sx={{
                      textAlign: 'left',
                      padding: '6px 10px',
                      fontSize: '0.9rem',
                      color: '#555',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {cell || ' '}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ExcelViewer;


