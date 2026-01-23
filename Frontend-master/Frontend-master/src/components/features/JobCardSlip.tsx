// // // // import { Card, CardContent, Typography, Box, Grid } from "@mui/material";

// // // // import uploadIconDownArrow from "../../assets/arrow_drop_down.png";
// // // // import Edit from "../../assets/edit.png";

// // // // const JobCardSlip = () => {
 
// // // //   return (
// // // //     <>
// // // //       <Card
// // // //         sx={{
// // // //           boxShadow: `
// // // //             4px 4px 20px 0px #6F8CB069,
// // // //             -6px -6px 20px 0px #FFFFFF,
// // // //             2px 2px 4px 0px #728EAB1A
// // // //           `,
// // // //           background: "#E7EBF0",
// // // //         }}
// // // //       >
// // // //         <CardContent>
// // // //           <Box
// // // //             sx={{
// // // //               display: "flex",
// // // //               alignItems: "center",
// // // //               justifyContent: "space-between",
// // // //               mb: 3,
// // // //             }}
// // // //           >
// // // //             <Typography variant="h6">
// // // //               Job card cum steel requisition slip
// // // //             </Typography>
// // // //             <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
// // // //               <Grid item>
// // // //                 <Box
// // // //                   sx={{
// // // //                     width: 108,
// // // //                     height: 32,
// // // //                     backgroundColor: "#E7EBF0",
// // // //                     display: "flex",
// // // //                     alignItems: "center",
// // // //                     justifyContent: "center",
// // // //                     cursor: "pointer",
// // // //                     boxShadow: `
// // // //       4px 4px 20px 0px #6F8CB069,
// // // //       -6px -6px 20px 0px #FFFFFF,
// // // //       2px 2px 4px 0px #728EAB1A
// // // //     `,
// // // //                     borderRadius: "8px",
// // // //                     padding: "1.5px",
// // // //                     textAlign: "center",
// // // //                     gap: "8px", // Add space between icon and text
// // // //                   }}
// // // //                 >
// // // //                   <span
// // // //                     style={{
// // // //                       fontSize: "14px",
// // // //                       color: "#000",
// // // //                       fontWeight: 500,
// // // //                       cursor: "pointer",
// // // //                     }}
// // // //                   >
// // // //                     View Table
// // // //                   </span>
// // // //                   <img
// // // //                     src={uploadIconDownArrow} // Replace with your upload icon
// // // //                     alt="Upload Document"
// // // //                     style={{
// // // //                       width: "20px",
// // // //                       height: "20px",
// // // //                       cursor: "pointer",
// // // //                     }}
// // // //                   />
// // // //                 </Box>
// // // //               </Grid>
// // // //               <Grid item>
// // // //                 <Box
// // // //                   sx={{
// // // //                     width: 66,
// // // //                     height: 32,
// // // //                     backgroundColor: "#E7EBF0",
// // // //                     display: "flex",
// // // //                     alignItems: "center",
// // // //                     justifyContent: "center",
// // // //                     cursor: "pointer",
// // // //                     boxShadow: `
// // // //       4px 4px 20px 0px #6F8CB069,
// // // //       -6px -6px 20px 0px #FFFFFF,
// // // //       2px 2px 4px 0px #728EAB1A
// // // //     `,
// // // //                     borderRadius: "8px",
// // // //                     padding: "1.5px",
// // // //                     textAlign: "center",
// // // //                     gap: "8px", // Add space between icon and text
// // // //                   }}
// // // //                 >
// // // //                     <img
// // // //                     src={Edit} // Replace with your upload icon
// // // //                     alt="Upload Document"
// // // //                     style={{
// // // //                       width: "20px",
// // // //                       height: "20px",
// // // //                       cursor: "pointer",
// // // //                     }}
// // // //                   />
// // // //                   <span
// // // //                     style={{
// // // //                       fontSize: "14px",
// // // //                       color: "#000",
// // // //                       fontWeight: 500,
// // // //                       cursor: "pointer",
// // // //                     }}
// // // //                   >
// // // //                     Edit
// // // //                   </span>
                  
// // // //                 </Box>
// // // //               </Grid>
// // // //             </Box>
// // // //           </Box>
// // // //         </CardContent>
// // // //       </Card>
// // // //     </>
// // // //   );
// // // // };

// // // // export default JobCardSlip;



// // // // without excel
// // // import React, { useState, useEffect } from "react";
// // // import { Card, CardContent, Typography, Box, TextField, Button, Grid, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Stack, FormControlLabel, Checkbox } from "@mui/material";
// // // import uploadIconDownArrow from "../../assets/arrow_drop_down.png";
// // // import Edit from "../../assets/edit.png";
// // // import SteelRequisitionTable from "./SteelRequisitionTable";
// // // // import axios from "axios";
// // // import { apiRequest } from '../../utils/apiclient';
// // // import endpoints from '../../utils/apiEndPoints';


// // // type OperationKeys = 'N' | 'M' | 'O' | 'A' | 'B' | 'CPS' | 'HAB' | 'HC';

// // // interface RowData {
// // //   id: number;
// // //   mark: string;
// // //   sections: string;
// // //   section: string;
// // //   material: string;
// // //   length: number;
// // //   width: number;
// // //   wt: number;
// // //   wtPerPc: number;
// // //   qty: number;
// // //   totalWeight: number;
// // //   operations: Record<OperationKeys, boolean>;
// // // }

// // // // interface JobCardHeader {
// // // //   "Job Order No": string;
// // // //   "Client": string;
// // // //   "Project": string | null;
// // // //   "Type of Tower": string;
// // // //   "Instruction": string;
// // // //   "Release Date": string;
// // // //   "JC No": string;
// // // // }




// // // const staticTableData: RowData[] = [
// // //   {
// // //     id: 1,
// // //     mark: 'EJSD',
// // //     sections: 'Done',
// // //     section: 'JNSJD2',
// // //     material: 'HT 10mm PLATE',
// // //     length: 600,
// // //     width: 170,
// // //     wt: 78.5,
// // //     wtPerPc: 8.01,
// // //     qty: 16,
// // //     totalWeight: 0,
// // //     operations: {
// // //       N: true,
// // //       M: false,
// // //       O: false,
// // //       A: false,
// // //       B: true,
// // //       CPS: true,
// // //       HAB: true,
// // //       HC: true,
// // //     },
// // //   },
// // //   {
// // //     id: 2,
// // //     mark: 'EJSD',
// // //     sections: 'Done',
// // //     section: 'CDDI3',
// // //     material: 'HT 10mm PLATE',
// // //     length: 600,
// // //     width: 170,
// // //     wt: 78.5,
// // //     wtPerPc: 8.01,
// // //     qty: 16,
// // //     totalWeight: 0,
// // //     operations: {
// // //       N: true,
// // //       M: true,
// // //       O: true,
// // //       A: false,
// // //       B: false,
// // //       CPS: true,
// // //       HAB: false,
// // //       HC: true,
// // //     },
// // //   },
// // // ];

// // // interface JobCardSlipProps {
// // //   jobCardId: string | undefined;
// // // }

// // // const JobCardSlip: React.FC<JobCardSlipProps> = ({ jobCardId }) => {
// // //   console.log("Job Card ID:", jobCardId);
// // //   const [tableData, setTableData] = useState<RowData[]>(staticTableData);
// // //   const [isEditing, setIsEditing] = useState(false);
// // //   const [isTableVisible, setIsTableVisible] = useState(false);
// // //   const [keyValuePairs, setKeyValuePairs] = useState<{ key: string; value: string }[]>([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState<string | null>(null);
// // //   // const [headerLoading, setHeaderLoading] = useState(true);
// // // // get-job-card-by-id/?id=${jobCardId}

// // //   // Fetch job card headers from API
// // //   useEffect(() => {
// // //     const fetchJobCardHeaders = async () => {
// // //       try {
// // //         const response = await apiRequest<any>(
// // //           "GET",
// // //           `${endpoints.getjobcardlistid}?id=${jobCardId}`
// // //         );

// // //         const firstJobCard = response;

// // //         if (firstJobCard) {
// // //             const formattedData = [
// // //             { key: "Job Order No", value: firstJobCard.Job_order_no },
// // //             { key: "Client", value: firstJobCard["Client"] || "N/A" },
// // //             { key: "Project", value: firstJobCard["Project"] || "N/A" },
// // //             { key: "Type of Tower", value: firstJobCard["Type of Tower"] || "N/A" },
// // //             { key: "Released Date", value: firstJobCard["Release Date"] || "N/A" },
// // //             { key: "JC NO", value: firstJobCard["JC No"] || "N/A" },
// // //             ];
// // //           setKeyValuePairs(formattedData);
// // //         }

// // //         setLoading(false);
// // //       } catch (err) {
// // //         console.error("Error fetching job card headers:", err);
// // //         setError("Failed to load job card data");
// // //         setLoading(false);

// // //         // Optional: Fallback static data
// // //         setKeyValuePairs([
// // //           { key: "Job Order No", value: "JO-140-04" },
// // //           { key: "Client", value: "TATA Projects Ltd" },
// // //           { key: "Project", value: "Fabrication & Galvanization of Tower Material" },
// // //           { key: "Type of Tower", value: "DDQ_BB+Extn" },
// // //           { key: "Released Date", value: "20-Feb-21" },
// // //           { key: "JC NO", value: "JC/140/1399" },
// // //         ]);
// // //       }
// // //     };

// // //    fetchJobCardHeaders();
// // //   }, [jobCardId]);

// // //    useEffect(() => {
// // //     const fetchJobSheet = async () => {
// // //       try {
// // //         const response = await apiRequest<any[]>(
// // //           "GET",
// // //           endpoints.getjobcardsheet
// // //         );

// // //         const transformed = response.map((item, index) => ({
// // //           id: index + 1,
// // //           mark: item.mark_no,
// // //           sections: "Pending",
// // //           section: item.mark_no,
// // //           material: item.section,
// // //           length: parseFloat(item.length),
// // //           width: parseFloat(item.width),
// // //           wt: parseFloat(item.unit),
// // //           wtPerPc: parseFloat(item.wt_and_pcs),
// // //           qty: parseInt(item.total_quantity, 10),
// // //           totalWeight: parseFloat(item.total_weight),
// // //           operations: {
// // //             N: false,
// // //             M: false,
// // //             O: false,
// // //             A: false,
// // //             B: false,
// // //             CPS: false,
// // //             HAB: false,
// // //             HC: false,
// // //           },
// // //         }));
// // //     setTableData(transformed);
// // //         setLoading(false);
// // //       } catch (err) {
// // //         console.error("Error fetching sheet data:", err);
// // //         setTableData(staticTableData);
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchJobSheet();
// // //   }, []);

// // //   const toggleEdit = () => {
// // //     setIsEditing(!isEditing);
// // //   };

// // //   const handleKeyChange = (index: number, newKey: string) => {
// // //     const updatedPairs = [...keyValuePairs];
// // //     updatedPairs[index].key = newKey;
// // //     setKeyValuePairs(updatedPairs);
// // //   };

// // //   const handleValueChange = (index: number, newValue: string) => {
// // //     const updatedPairs = [...keyValuePairs];
// // //     updatedPairs[index].value = newValue;
// // //     setKeyValuePairs(updatedPairs);
// // //   };

// // //   const handleSave = () => {
// // //     setIsEditing(false);
// // //     setKeyValuePairs(keyValuePairs.filter((pair) => pair.key.trim() && pair.value.trim()));
// // //   };

// // //   const handleAddPair = () => {
// // //     const updatedPairs = [...keyValuePairs, { key: "", value: "" }];
// // //     setKeyValuePairs(updatedPairs);
// // //   };

// // //   const handleRemovePair = (index: number) => {
// // //     const updatedPairs = [...keyValuePairs];
// // //     updatedPairs.splice(index, 1);
// // //     setKeyValuePairs(updatedPairs);
// // //   };

// // //   const toggleTable = () => {
// // //     setIsTableVisible(!isTableVisible);
// // //   };

// // //   const handleSectionToggle = (rowId: number) => {
// // //     setTableData((prevData) =>
// // //       prevData.map((row) =>
// // //         row.id === rowId
// // //           ? {
// // //               ...row,
// // //               section: row.section === 'Done' ? 'Pending' : 'Done',
// // //             }
// // //           : row
// // //       )
// // //     );
// // //   };
 
// // //   const handleCheckboxChange = (
// // //     event: React.ChangeEvent<HTMLInputElement>,
// // //     rowId: number,
// // //     key: OperationKeys
// // //   ) => {
// // //     setTableData((prevData) =>
// // //       prevData.map((row) =>
// // //         row.id === rowId
// // //           ? {
// // //               ...row,
// // //               operations: {
// // //                 ...row.operations,
// // //                 [key]: event.target.checked,
// // //               },
// // //             }
// // //           : row
// // //       )
// // //     );
// // //   };
  
// // //   if (loading) {
// // //     return <div>Loading job card data...</div>;
// // //   }

// // //   if (error) {
// // //     return <div>Error: {error}</div>;
// // //   }


  

// // //   return (
// // //     <>
// // //       <Card
// // //         sx={{
// // //           boxShadow: `
// // //             4px 4px 20px 0px #6F8CB069,
// // //             -6px -6px 20px 0px #FFFFFF,
// // //             2px 2px 4px 0px #728EAB1A
// // //           `,
// // //           background: "#E7EBF0",
// // //           borderRadius: "12px",
// // //         }}
// // //       >
// // //         <CardContent>
// // //           <Box
// // //             sx={{
// // //               display: "flex",
// // //               alignItems: "center",
// // //               justifyContent: "space-between",
// // //               mb: 3,
// // //             }}
// // //           >
// // //             <Typography variant="h3">
// // //               Job card cum steel requisition slip
// // //             </Typography>
// // //             <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
// // //               <Grid item>
// // //                 <Box
// // //                   sx={{
// // //                     width: 108,
// // //                     height: 32,
// // //                     backgroundColor: "#E7EBF0",
// // //                     display: "flex",
// // //                     alignItems: "center",
// // //                     justifyContent: "center",
// // //                     cursor: "pointer",
// // //                     boxShadow: `
// // //                       4px 4px 20px 0px #6F8CB069,
// // //                       -6px -6px 20px 0px #FFFFFF,
// // //                       2px 2px 4px 0px #728EAB1A
// // //                     `,
// // //                     borderRadius: "8px",
// // //                     padding: "1.5px",
// // //                     textAlign: "center",
// // //                     gap: "8px",
// // //                   }}
// // //                   onClick={toggleTable}
// // //                 >
// // //                   <span
// // //                     style={{
// // //                       fontSize: "12px",
// // //                       color: "#000",
// // //                       fontWeight: 500,
// // //                       cursor: "pointer",
// // //                     }}
// // //                   >
// // //                     {isTableVisible ? "Close Table" : "View Table"}
// // //                   </span>
// // //                   <img
// // //                     src={uploadIconDownArrow}
// // //                     alt="Upload Document"
// // //                     style={{
// // //                       width: "20px",
// // //                       height: "20px",
// // //                       cursor: "pointer",
// // //                       transform: isTableVisible ? "rotate(180deg)" : "rotate(0deg)",
// // //                       transition: "transform 0.3s",
// // //                     }}
// // //                   />
// // //                 </Box>
// // //               </Grid>
// // //               <Grid item>
// // //                 <Box
// // //                   sx={{
// // //                     width: 66,
// // //                     height: 32,
// // //                     backgroundColor: "#E7EBF0",
// // //                     display: "flex",
// // //                     alignItems: "center",
// // //                     justifyContent: "center",
// // //                     cursor: "pointer",
// // //                     boxShadow: `
// // //                       4px 4px 20px 0px #6F8CB069,
// // //                       -6px -6px 20px 0px #FFFFFF,
// // //                       2px 2px 4px 0px #728EAB1A
// // //                     `,
// // //                     borderRadius: "8px",
// // //                     padding: "1.5px",
// // //                     textAlign: "center",
// // //                     gap: "8px",
// // //                   }}
// // //                   onClick={toggleEdit}
// // //                 >
// // //                   <img
// // //                     src={Edit}
// // //                     alt="Upload Document"
// // //                     style={{
// // //                       width: "15px",
// // //                       height: "15px",
// // //                       cursor: "pointer",
// // //                     }}
// // //                   />
// // //                   <span
// // //                     style={{
// // //                       fontSize: "12px",
// // //                       color: "#000",
// // //                       fontWeight: 500,
// // //                       cursor: "pointer",
// // //                     }}
// // //                   >
// // //                     Edit
// // //                   </span>
// // //                 </Box>
// // //               </Grid>
// // //             </Box>
// // //           </Box>

// // //           {/* Render Key-Value Pairs */}
// // //           <Box
// // //             sx={{
// // //               display: "grid",
// // //               gridTemplateColumns: "1fr 1fr",
// // //               rowGap: 2,
// // //               columnGap: 4,
// // //             }}
// // //           >
// // //             {keyValuePairs.map((pair, index) => (
// // //               <Box
// // //                 key={index}
// // //                 sx={{
// // //                   display: "flex",
// // //                   alignItems: "center",
// // //                   gap: 1,
// // //                 }}
// // //               >
// // //                 {isEditing ? (
// // //                   <>
// // //                     <Box sx={{ display: "flex", alignItems: "center", gap: 1, width: "40%" }}>
// // //                     • 
// // //                       <TextField
// // //                         value={pair.key}
// // //                         onChange={(e) => handleKeyChange(index, e.target.value)}
// // //                         size="small"
// // //                         placeholder="Key"
// // //                         sx={{ width: "calc(100% - 16px)" }}
// // //                       />
// // //                     </Box>
// // //                     <span style={{ margin: "0 5px" }}>:</span>
// // //                     <TextField
// // //                       value={pair.value}
// // //                       onChange={(e) => handleValueChange(index, e.target.value)}
// // //                       size="small"
// // //                       placeholder="Value"
// // //                       sx={{ width: "60%" }}
// // //                     />
// // //                     <Button
// // //                       variant="outlined"
// // //                       color="error"
// // //                       size="small"
// // //                       onClick={() => handleRemovePair(index)}
// // //                       sx={{
// // //                         minWidth: "30px",
// // //                         height: "30px",
// // //                         fontSize: "12px",
// // //                       }}
// // //                     >
// // //                       X
// // //                     </Button>
// // //                   </>
// // //                 ) : (
// // //                   <>
// // //                     <Box
// // //                       sx={{
// // //                         display: "flex",
// // //                         alignItems: "center",
// // //                         gap: 1,
// // //                         width: "40%",
// // //                       }}
// // //                     >
// // //                       <Typography
// // //                         sx={{
// // //                           fontWeight: "500",
// // //                           color: "#505576",
// // //                           flex: 1,
// // //                           fontSize:'14px'
// // //                         }}
// // //                       >
// // //                          • {pair.key}
// // //                       </Typography>
// // //                     </Box>
// // //                     <span style={{ margin: "0 5px" }}>:</span>
// // //                     <Typography
// // //                       sx={{ color: "#070810", flex: 1,fontSize:'14px' }}
// // //                     >
// // //                       {pair.value}
// // //                     </Typography>
// // //                   </>
// // //                 )}
// // //               </Box>
// // //             ))}
// // //           </Box>

// // //           {isEditing && (
// // //             <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
// // //               <Button
// // //                 variant="contained"
// // //                 color="primary"
// // //                 onClick={handleAddPair}
// // //                 sx={{
// // //                   textTransform: "none",
// // //                   fontSize: "14px",
// // //                   fontWeight: "500",
// // //                 }}
// // //               >
// // //                 Add
// // //               </Button>
// // //               <Button
// // //                 variant="contained"
// // //                 color="success"
// // //                 onClick={handleSave}
// // //                 sx={{ textTransform: "none", fontSize: "14px", fontWeight: "500" }}
// // //               >
// // //                 Save
// // //               </Button>
// // //             </Box>
// // //           )}

// // //           <TableContainer component={Paper} sx={{ boxShadow: 'none', bgcolor: '#e7ebf0', mt: '20px' , border: '1px solid #d3d4d9'}}>
// // //             <Table size="small">
// // //               <TableHead>
// // //                 <TableRow style={{ background: '#e1e8f3',padding:"10px" }}>
// // //                   <TableCell sx={{ fontWeight: 600, color: '#7c84a2', borderRight: '1px solid #d3d4d9' }}>Mark</TableCell>
// // //                   <TableCell sx={{ fontWeight: 600, borderRight: '1px solid #d3d4d9' }}></TableCell>
// // //                   <TableCell sx={{ fontWeight: 600, color: '#7c84a2', borderRight: '1px solid #d3d4d9' }}>Section</TableCell>
// // //                   <TableCell sx={{ fontWeight: 600, color: '#7c84a2', borderRight: '1px solid #d3d4d9' }}>Length</TableCell>
// // //                   <TableCell sx={{ fontWeight: 600, color: '#7c84a2', borderRight: '1px solid #d3d4d9' }}>Width</TableCell>
// // //                   <TableCell sx={{ fontWeight: 600, color: '#7c84a2', borderRight: '1px solid #d3d4d9' }}>Unit</TableCell>
// // //                   <TableCell sx={{ fontWeight: 600, color: '#7c84a2', borderRight: '1px solid #d3d4d9' }}>WT/PCS</TableCell>
// // //                   <TableCell sx={{ fontWeight: 600, color: '#7c84a2', borderRight: '1px solid #d3d4d9' }}>QTY</TableCell>
// // //                   <TableCell sx={{ fontWeight: 600, color: '#7c84a2', borderRight: '1px solid #d3d4d9' }}>Total</TableCell>
// // //                   <TableCell sx={{ fontWeight: 600,  color: '#7c84a2',borderRight: '1px solid #d3d4d9' }}>Operations</TableCell>
// // //                   <TableCell sx={{ fontWeight: 600, borderRight: '1px solid #d3d4d9' }}></TableCell>
// // //                   <TableCell sx={{ fontWeight: 600, borderRight: '1px solid #d3d4d9' }}></TableCell>
// // //                   <TableCell sx={{ fontWeight: 600, borderRight: '1px solid #d3d4d9' }}></TableCell>
// // //                   <TableCell sx={{ fontWeight: 600, borderRight: '1px solid #d3d4d9' }}></TableCell>
// // //                   <TableCell sx={{ fontWeight: 600, borderRight: '1px solid #d3d4d9' }}></TableCell>
// // //                 </TableRow>
// // //               </TableHead>
// // //               <TableHead>
// // //                 <TableRow>
// // //                   <TableCell sx={{ color: '#565b7a', borderRight: '1px solid #d3d4d9' }}>NO</TableCell>
// // //                   <TableCell sx={{ borderRight: '1px solid #d3d4d9' }}></TableCell>
// // //                   <TableCell sx={{ color: '#565b7a', borderRight: '1px solid #d3d4d9' }}>(mm)</TableCell>
// // //                   <TableCell sx={{ color: '#565b7a', borderRight: '1px solid #d3d4d9' }}>(mm)</TableCell>
// // //                   <TableCell sx={{ color: '#565b7a', borderRight: '1px solid #d3d4d9' }}>W.T.</TableCell>
// // //                   <TableCell sx={{ borderRight: '1px solid #d3d4d9' }}></TableCell>
// // //                   <TableCell sx={{ color: '#565b7a', borderRight: '1px solid #d3d4d9' }}>QTY</TableCell>
// // //                   <TableCell sx={{ borderRight: '1px solid #d3d4d9' }}></TableCell>
// // //                   <TableCell sx={{ color: '#565b7a', borderRight: '1px solid #d3d4d9' }}>Weight</TableCell>
// // //                   <TableCell sx={{ color: '#565b7a', borderRight: '1px solid #d3d4d9' }}>1,CPS</TableCell>
// // //                   <TableCell sx={{ color: '#565b7a', borderRight: '1px solid #d3d4d9' }}>N</TableCell>
// // //                   <TableCell sx={{ color: '#565b7a', borderRight: '1px solid #d3d4d9' }}>B</TableCell>
// // //                   <TableCell sx={{ color: '#565b7a', borderRight: '1px solid #d3d4d9' }}>CPS</TableCell>
// // //                   <TableCell sx={{ color: '#565b7a', borderRight: '1px solid #d3d4d9' }}>HAB</TableCell>
// // //                   <TableCell sx={{ color: '#565b7a', borderRight: '1px solid #d3d4d9' }}>HC</TableCell>
// // //                 </TableRow>
// // //               </TableHead>
// // //               <TableBody>
// // //                 {tableData.map((row) => (
// // //                   <TableRow key={row.id}>
// // //                     <TableCell sx={{ borderRight: '1px solid #d3d4d9' }}>{row.mark}</TableCell>
// // //                     <TableCell sx={{ borderRight: '1px solid #d3d4d9' }}>
// // //                       <Box sx={{ display: 'flex', alignItems: 'center' }}>
// // //                         <Checkbox checked={row.section === 'Done'} onChange={() => handleSectionToggle(row.id)} size="small" />
// // //                         <Typography sx={{ fontSize: 13 }}>{row.sections}</Typography>
// // //                       </Box>
// // //                     </TableCell>
// // //                     <TableCell sx={{ borderRight: '1px solid #d3d4d9' }}>{row.section}</TableCell>
// // //                     <TableCell sx={{ borderRight: '1px solid #d3d4d9' }}>{row.length}</TableCell>
// // //                     <TableCell sx={{ borderRight: '1px solid #d3d4d9' }}>{row.width}</TableCell>
// // //                     <TableCell sx={{ borderRight: '1px solid #d3d4d9' }}>{row.wt}</TableCell>
// // //                     <TableCell sx={{ borderRight: '1px solid #d3d4d9' }}>{row.wtPerPc}</TableCell>
// // //                     <TableCell sx={{ borderRight: '1px solid #d3d4d9' }}>{row.qty}</TableCell>
// // //                     <TableCell sx={{ borderRight: '1px solid #d3d4d9' }}>{row.totalWeight}</TableCell>
// // //                     <TableCell sx={{ borderRight: '1px solid #d3d4d9' }}>1. CPS</TableCell>

// // //                     {[
// // //                       ['N', 'M', 'O', 'A'],
// // //                       ['B', 'M', 'O', 'A'],
// // //                       ['CPS', 'M', 'O', 'A'],
// // //                       ['HAB', 'M', 'O', 'A'],
// // //                       ['HC', 'M', 'O', 'A'],
// // //                     ].map((ops, idx) => (
// // //                       <TableCell sx={{ borderRight: '1px solid #d3d4d9' }} align="center" key={idx}>
// // //                         <Stack direction="column" spacing={1}>
// // //                           {ops.map((op) => (
// // //                             <FormControlLabel
// // //                               key={op}
// // //                               label={`${op}:`}
// // //                               labelPlacement="start"
// // //                               control={
// // //                                 <Checkbox
// // //                                   checked={row.operations[op as OperationKeys]}
// // //                                   onChange={(e) => handleCheckboxChange(e, row.id, op as OperationKeys)}
// // //                                   size="small"
// // //                                 />
// // //                               }
// // //                             />
// // //                           ))}
// // //                         </Stack>
// // //                       </TableCell>
// // //                     ))}
// // //                   </TableRow>
// // //                 ))}
// // //               </TableBody>
// // //             </Table>
// // //           </TableContainer>

// // //           {isTableVisible && (
// // //             <Box sx={{ mt: 4 }}>
// // //               <SteelRequisitionTable />
// // //             </Box>
// // //           )}
// // //         </CardContent>
// // //       </Card>
// // //     </>
// // //   );
// // // };

// // // export default JobCardSlip;


// // import React, { useState, useEffect } from "react";
// // import { Card, CardContent, Typography, Box, TextField, Button, Grid, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Stack, FormControlLabel, Checkbox } from "@mui/material";
// // import uploadIconDownArrow from "../../assets/arrow_drop_down.png";
// // import Edit from "../../assets/edit.png";
// // import SteelRequisitionTable from "./SteelRequisitionTable";
// // import { apiRequest } from '../../utils/apiclient';
// // import endpoints from '../../utils/apiEndPoints';

// // type OperationKeys = 'N' | 'M' | 'O' | 'A' | 'B' | 'CPS' | 'HAB' | 'HC';

// // interface RowData {
// //   id: number;
// //   mark: string;
// //   sections: string;
// //   section: string;
// //   material: string;
// //   length: number;
// //   width: number;
// //   wt: number;
// //   wtPerPc: number;
// //   qty: number;
// //   totalWeight: number;
// //   operations: Record<OperationKeys, boolean>;
// // }

// // interface JobCardData {
// //   id: number;
// //   company_name: string;
// //   Job_order_no: string;
// //   project_name: string | null;
// //   type_of_tower: string;
// //   note: string;
// //   mark_no: string;
// //   section: string;
// //   length: string;
// //   width: string;
// //   unit: string;
// //   wt_and_pcs: string;
// //   total_quantity: string;
// //   total_weight: string;
// //   operations: null;
// //   remarks: string;
// //   release_date: string;
// //   jc_no: string;
// // }

// // interface JobCardSlipProps {
// //   jobCardId: string | undefined;
// // }

// // const JobCardSlip: React.FC<JobCardSlipProps> = ({ jobCardId }) => {
// //   const [tableData, setTableData] = useState<RowData[]>([]);
// //   const [isEditing, setIsEditing] = useState(false);
// //   const [isTableVisible, setIsTableVisible] = useState(false);
// //   const [keyValuePairs, setKeyValuePairs] = useState<{ key: string; value: string }[]>([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState<string | null>(null);
// //   const [jobCardData, setJobCardData] = useState<JobCardData | null>(null);

// //   // Fetch job card data from API
// //   useEffect(() => {
// //     const fetchJobCardData = async () => {
// //       try {
// //         const response = await apiRequest<JobCardData>(
// //           "GET",
// //           `${endpoints.getjobcardlistid}?id=${jobCardId}`
// //         );

// //         setJobCardData(response);

// //         // Format header data
// //         const formattedData = [
// //           { key: "Job Order No", value: response.Job_order_no || "N/A" },
// //           { key: "Client", value: response.company_name || "N/A" },
// //           { key: "Project", value: response.project_name || "N/A" },
// //           { key: "Type of Tower", value: response.type_of_tower || "N/A" },
// //           { key: "Instruction", value: response.note || "N/A" },
// //           { key: "Released Date", value: response.release_date ? new Date(response.release_date).toLocaleDateString() : "N/A" },
// //           { key: "JC NO", value: response.jc_no || "N/A" },
// //         ];
// //         setKeyValuePairs(formattedData);

// //         // Format table data
// //         const formattedTableData: RowData[] = [{
// //           id: response.id,
// //           mark: response.mark_no || "N/A",
// //           sections: "Pending",
// //           section: response.mark_no || "N/A",
// //           material: response.section || "N/A",
// //           length: parseFloat(response.length) || 0,
// //           width: parseFloat(response.width) || 0,
// //           wt: parseFloat(response.unit) || 0,
// //           wtPerPc: parseFloat(response.wt_and_pcs) || 0,
// //           qty: parseInt(response.total_quantity, 10) || 0,
// //           totalWeight: parseFloat(response.total_weight) || 0,
// //           operations: {
// //             N: false,
// //             M: false,
// //             O: false,
// //             A: false,
// //             B: false,
// //             CPS: false,
// //             HAB: false,
// //             HC: false,
// //           },
// //         }];
        
// //         setTableData(formattedTableData);
// //         setLoading(false);
// //       } catch (err) {
// //         console.error("Error fetching job card data:", err);
// //         setError("Failed to load job card data");
// //         setLoading(false);
// //       }
// //     };

// //     if (jobCardId) {
// //       fetchJobCardData();
// //     }
// //   }, [jobCardId]);

// //   const toggleEdit = () => {
// //     setIsEditing(!isEditing);
// //   };

// //   const handleKeyChange = (index: number, newKey: string) => {
// //     const updatedPairs = [...keyValuePairs];
// //     updatedPairs[index].key = newKey;
// //     setKeyValuePairs(updatedPairs);
// //   };

// //   const handleValueChange = (index: number, newValue: string) => {
// //     const updatedPairs = [...keyValuePairs];
// //     updatedPairs[index].value = newValue;
// //     setKeyValuePairs(updatedPairs);
// //   };

// //   const handleSave = () => {
// //     setIsEditing(false);
// //     setKeyValuePairs(keyValuePairs.filter((pair) => pair.key.trim() && pair.value.trim()));
// //   };

// //   const handleAddPair = () => {
// //     const updatedPairs = [...keyValuePairs, { key: "", value: "" }];
// //     setKeyValuePairs(updatedPairs);
// //   };

// //   const handleRemovePair = (index: number) => {
// //     const updatedPairs = [...keyValuePairs];
// //     updatedPairs.splice(index, 1);
// //     setKeyValuePairs(updatedPairs);
// //   };

// //   const toggleTable = () => {
// //     setIsTableVisible(!isTableVisible);
// //   };

// //   const handleSectionToggle = (rowId: number) => {
// //     setTableData((prevData) =>
// //       prevData.map((row) =>
// //         row.id === rowId
// //           ? {
// //               ...row,
// //               section: row.section === 'Done' ? 'Pending' : 'Done',
// //             }
// //           : row
// //       )
// //     );
// //   };
 
// //   const handleCheckboxChange = (
// //     event: React.ChangeEvent<HTMLInputElement>,
// //     rowId: number,
// //     key: OperationKeys
// //   ) => {
// //     setTableData((prevData) =>
// //       prevData.map((row) =>
// //         row.id === rowId
// //           ? {
// //               ...row,
// //               operations: {
// //                 ...row.operations,
// //                 [key]: event.target.checked,
// //               },
// //             }
// //           : row
// //       )
// //     );
// //   };
  
// //   if (loading) {
// //     return <div>Loading job card data...</div>;
// //   }

// //   if (error) {
// //     return <div>Error: {error}</div>;
// //   }

// //   return (
// //     <>
// //       <Card
// //         sx={{
// //           boxShadow: `
// //             4px 4px 20px 0px #6F8CB069,
// //             -6px -6px 20px 0px #FFFFFF,
// //             2px 2px 4px 0px #728EAB1A
// //           `,
// //           background: "#E7EBF0",
// //           borderRadius: "12px",
// //         }}
// //       >
// //         <CardContent>
// //           <Box
// //             sx={{
// //               display: "flex",
// //               alignItems: "center",
// //               justifyContent: "space-between",
// //               mb: 3,
// //             }}
// //           >
// //             <Typography variant="h3">
// //               Job card cum steel requisition slip
// //             </Typography>
// //             <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
// //               <Grid item>
// //                 <Box
// //                   sx={{
// //                     width: 108,
// //                     height: 32,
// //                     backgroundColor: "#E7EBF0",
// //                     display: "flex",
// //                     alignItems: "center",
// //                     justifyContent: "center",
// //                     cursor: "pointer",
// //                     boxShadow: `
// //                       4px 4px 20px 0px #6F8CB069,
// //                       -6px -6px 20px 0px #FFFFFF,
// //                       2px 2px 4px 0px #728EAB1A
// //                     `,
// //                     borderRadius: "8px",
// //                     padding: "1.5px",
// //                     textAlign: "center",
// //                     gap: "8px",
// //                   }}
// //                   onClick={toggleTable}
// //                 >
// //                   <span
// //                     style={{
// //                       fontSize: "12px",
// //                       color: "#000",
// //                       fontWeight: 500,
// //                       cursor: "pointer",
// //                     }}
// //                   >
// //                     {isTableVisible ? "Close Table" : "View Table"}
// //                   </span>
// //                   <img
// //                     src={uploadIconDownArrow}
// //                     alt="Upload Document"
// //                     style={{
// //                       width: "20px",
// //                       height: "20px",
// //                       cursor: "pointer",
// //                       transform: isTableVisible ? "rotate(180deg)" : "rotate(0deg)",
// //                       transition: "transform 0.3s",
// //                     }}
// //                   />
// //                 </Box>
// //               </Grid>
// //               <Grid item>
// //                 <Box
// //                   sx={{
// //                     width: 66,
// //                     height: 32,
// //                     backgroundColor: "#E7EBF0",
// //                     display: "flex",
// //                     alignItems: "center",
// //                     justifyContent: "center",
// //                     cursor: "pointer",
// //                     boxShadow: `
// //                       4px 4px 20px 0px #6F8CB069,
// //                       -6px -6px 20px 0px #FFFFFF,
// //                       2px 2px 4px 0px #728EAB1A
// //                     `,
// //                     borderRadius: "8px",
// //                     padding: "1.5px",
// //                     textAlign: "center",
// //                     gap: "8px",
// //                   }}
// //                   onClick={toggleEdit}
// //                 >
// //                   <img
// //                     src={Edit}
// //                     alt="Upload Document"
// //                     style={{
// //                       width: "15px",
// //                       height: "15px",
// //                       cursor: "pointer",
// //                     }}
// //                   />
// //                   <span
// //                     style={{
// //                       fontSize: "12px",
// //                       color: "#000",
// //                       fontWeight: 500,
// //                       cursor: "pointer",
// //                     }}
// //                   >
// //                     Edit
// //                   </span>
// //                 </Box>
// //               </Grid>
// //             </Box>
// //           </Box>

// //           {/* Render Key-Value Pairs */}
// //           <Box
// //             sx={{
// //               display: "grid",
// //               gridTemplateColumns: "1fr 1fr",
// //               rowGap: 2,
// //               columnGap: 4,
// //             }}
// //           >
// //             {keyValuePairs.map((pair, index) => (
// //               <Box
// //                 key={index}
// //                 sx={{
// //                   display: "flex",
// //                   alignItems: "center",
// //                   gap: 1,
// //                 }}
// //               >
// //                 {isEditing ? (
// //                   <>
// //                     <Box sx={{ display: "flex", alignItems: "center", gap: 1, width: "40%" }}>
// //                     • 
// //                       <TextField
// //                         value={pair.key}
// //                         onChange={(e) => handleKeyChange(index, e.target.value)}
// //                         size="small"
// //                         placeholder="Key"
// //                         sx={{ width: "calc(100% - 16px)" }}
// //                       />
// //                     </Box>
// //                     <span style={{ margin: "0 5px" }}>:</span>
// //                     <TextField
// //                       value={pair.value}
// //                       onChange={(e) => handleValueChange(index, e.target.value)}
// //                       size="small"
// //                       placeholder="Value"
// //                       sx={{ width: "60%" }}
// //                     />
// //                     <Button
// //                       variant="outlined"
// //                       color="error"
// //                       size="small"
// //                       onClick={() => handleRemovePair(index)}
// //                       sx={{
// //                         minWidth: "30px",
// //                         height: "30px",
// //                         fontSize: "12px",
// //                       }}
// //                     >
// //                       X
// //                     </Button>
// //                   </>
// //                 ) : (
// //                   <>
// //                     <Box
// //                       sx={{
// //                         display: "flex",
// //                         alignItems: "center",
// //                         gap: 1,
// //                         width: "40%",
// //                       }}
// //                     >
// //                       <Typography
// //                         sx={{
// //                           fontWeight: "500",
// //                           color: "#505576",
// //                           flex: 1,
// //                           fontSize:'14px'
// //                         }}
// //                       >
// //                          • {pair.key}
// //                       </Typography>
// //                     </Box>
// //                     <span style={{ margin: "0 5px" }}>:</span>
// //                     <Typography
// //                       sx={{ color: "#070810", flex: 1,fontSize:'14px' }}
// //                     >
// //                       {pair.value}
// //                     </Typography>
// //                   </>
// //                 )}
// //               </Box>
// //             ))}
// //           </Box>

// //           {isEditing && (
// //             <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
// //               <Button
// //                 variant="contained"
// //                 color="primary"
// //                 onClick={handleAddPair}
// //                 sx={{
// //                   textTransform: "none",
// //                   fontSize: "14px",
// //                   fontWeight: "500",
// //                 }}
// //               >
// //                 Add
// //               </Button>
// //               <Button
// //                 variant="contained"
// //                 color="success"
// //                 onClick={handleSave}
// //                 sx={{ textTransform: "none", fontSize: "14px", fontWeight: "500" }}
// //               >
// //                 Save
// //               </Button>
// //             </Box>
// //           )}

// //           <TableContainer component={Paper} sx={{ boxShadow: 'none', bgcolor: '#e7ebf0', mt: '20px' , border: '1px solid #d3d4d9'}}>
// //             <Table size="small">
// //               <TableHead>
// //                 <TableRow style={{ background: '#e1e8f3',padding:"10px" }}>
// //                   <TableCell sx={{ fontWeight: 600, color: '#7c84a2', borderRight: '1px solid #d3d4d9' }}>Mark</TableCell>
// //                   <TableCell sx={{ fontWeight: 600, borderRight: '1px solid #d3d4d9' }}></TableCell>
// //                   <TableCell sx={{ fontWeight: 600, color: '#7c84a2', borderRight: '1px solid #d3d4d9' }}>Section</TableCell>
// //                   <TableCell sx={{ fontWeight: 600, color: '#7c84a2', borderRight: '1px solid #d3d4d9' }}>Length</TableCell>
// //                   <TableCell sx={{ fontWeight: 600, color: '#7c84a2', borderRight: '1px solid #d3d4d9' }}>Width</TableCell>
// //                   <TableCell sx={{ fontWeight: 600, color: '#7c84a2', borderRight: '1px solid #d3d4d9' }}>Unit</TableCell>
// //                   <TableCell sx={{ fontWeight: 600, color: '#7c84a2', borderRight: '1px solid #d3d4d9' }}>WT/PCS</TableCell>
// //                   <TableCell sx={{ fontWeight: 600, color: '#7c84a2', borderRight: '1px solid #d3d4d9' }}>QTY</TableCell>
// //                   <TableCell sx={{ fontWeight: 600, color: '#7c84a2', borderRight: '1px solid #d3d4d9' }}>Total</TableCell>
// //                   <TableCell sx={{ fontWeight: 600,  color: '#7c84a2',borderRight: '1px solid #d3d4d9' }}>Operations</TableCell>
// //                   <TableCell sx={{ fontWeight: 600, borderRight: '1px solid #d3d4d9' }}></TableCell>
// //                   <TableCell sx={{ fontWeight: 600, borderRight: '1px solid #d3d4d9' }}></TableCell>
// //                   <TableCell sx={{ fontWeight: 600, borderRight: '1px solid #d3d4d9' }}></TableCell>
// //                   <TableCell sx={{ fontWeight: 600, borderRight: '1px solid #d3d4d9' }}></TableCell>
// //                   <TableCell sx={{ fontWeight: 600, borderRight: '1px solid #d3d4d9' }}></TableCell>
// //                 </TableRow>
// //               </TableHead>
// //               <TableHead>
// //                 <TableRow>
// //                   <TableCell sx={{ color: '#565b7a', borderRight: '1px solid #d3d4d9' }}>NO</TableCell>
// //                   <TableCell sx={{ borderRight: '1px solid #d3d4d9' }}></TableCell>
// //                   <TableCell sx={{ color: '#565b7a', borderRight: '1px solid #d3d4d9' }}>(mm)</TableCell>
// //                   <TableCell sx={{ color: '#565b7a', borderRight: '1px solid #d3d4d9' }}>(mm)</TableCell>
// //                   <TableCell sx={{ color: '#565b7a', borderRight: '1px solid #d3d4d9' }}>W.T.</TableCell>
// //                   <TableCell sx={{ borderRight: '1px solid #d3d4d9' }}></TableCell>
// //                   <TableCell sx={{ color: '#565b7a', borderRight: '1px solid #d3d4d9' }}>QTY</TableCell>
// //                   <TableCell sx={{ borderRight: '1px solid #d3d4d9' }}></TableCell>
// //                   <TableCell sx={{ color: '#565b7a', borderRight: '1px solid #d3d4d9' }}>Weight</TableCell>
// //                   <TableCell sx={{ color: '#565b7a', borderRight: '1px solid #d3d4d9' }}>1,CPS</TableCell>
// //                   <TableCell sx={{ color: '#565b7a', borderRight: '1px solid #d3d4d9' }}>N</TableCell>
// //                   <TableCell sx={{ color: '#565b7a', borderRight: '1px solid #d3d4d9' }}>B</TableCell>
// //                   <TableCell sx={{ color: '#565b7a', borderRight: '1px solid #d3d4d9' }}>CPS</TableCell>
// //                   <TableCell sx={{ color: '#565b7a', borderRight: '1px solid #d3d4d9' }}>HAB</TableCell>
// //                   <TableCell sx={{ color: '#565b7a', borderRight: '1px solid #d3d4d9' }}>HC</TableCell>
// //                 </TableRow>
// //               </TableHead>
// //               <TableBody>
// //                 {tableData.map((row) => (
// //                   <TableRow key={row.id}>
// //                     <TableCell sx={{ borderRight: '1px solid #d3d4d9' }}>{row.mark}</TableCell>
// //                     <TableCell sx={{ borderRight: '1px solid #d3d4d9' }}>
// //                       <Box sx={{ display: 'flex', alignItems: 'center' }}>
// //                         <Checkbox checked={row.section === 'Done'} onChange={() => handleSectionToggle(row.id)} size="small" />
// //                         <Typography sx={{ fontSize: 13 }}>{row.sections}</Typography>
// //                       </Box>
// //                     </TableCell>
// //                     <TableCell sx={{ borderRight: '1px solid #d3d4d9' }}>{row.section}</TableCell>
// //                     <TableCell sx={{ borderRight: '1px solid #d3d4d9' }}>{row.length}</TableCell>
// //                     <TableCell sx={{ borderRight: '1px solid #d3d4d9' }}>{row.width}</TableCell>
// //                     <TableCell sx={{ borderRight: '1px solid #d3d4d9' }}>{row.wt}</TableCell>
// //                     <TableCell sx={{ borderRight: '1px solid #d3d4d9' }}>{row.wtPerPc}</TableCell>
// //                     <TableCell sx={{ borderRight: '1px solid #d3d4d9' }}>{row.qty}</TableCell>
// //                     <TableCell sx={{ borderRight: '1px solid #d3d4d9' }}>{row.totalWeight}</TableCell>
// //                     <TableCell sx={{ borderRight: '1px solid #d3d4d9' }}>1. CPS</TableCell>

// //                     {[
// //                       ['N', 'M', 'O', 'A'],
// //                       ['B', 'M', 'O', 'A'],
// //                       ['CPS', 'M', 'O', 'A'],
// //                       ['HAB', 'M', 'O', 'A'],
// //                       ['HC', 'M', 'O', 'A'],
// //                     ].map((ops, idx) => (
// //                       <TableCell sx={{ borderRight: '1px solid #d3d4d9' }} align="center" key={idx}>
// //                         <Stack direction="column" spacing={1}>
// //                           {ops.map((op) => (
// //                             <FormControlLabel
// //                               key={op}
// //                               label={`${op}:`}
// //                               labelPlacement="start"
// //                               control={
// //                                 <Checkbox
// //                                   checked={row.operations[op as OperationKeys]}
// //                                   onChange={(e) => handleCheckboxChange(e, row.id, op as OperationKeys)}
// //                                   size="small"
// //                                 />
// //                               }
// //                             />
// //                           ))}
// //                         </Stack>
// //                       </TableCell>
// //                     ))}
// //                   </TableRow>
// //                 ))}
// //               </TableBody>
// //             </Table>
// //           </TableContainer>

// //           {isTableVisible && (
// //             <Box sx={{ mt: 4 }}>
// //               <SteelRequisitionTable />
// //             </Box>
// //           )}
// //         </CardContent>
// //       </Card>
// //     </>
// //   );
// // };

// // export default JobCardSlip;

// import React, { useState, useEffect } from "react";
// import { Card, CardContent, Typography, Box, TextField, Button, Grid, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Stack, FormControlLabel, Checkbox } from "@mui/material";
// import uploadIconDownArrow from "../../assets/arrow_drop_down.png";
// import Edit from "../../assets/edit.png";
// import SteelRequisitionTable from "./SteelRequisitionTable";
// import { apiRequest } from '../../utils/apiclient';
// import endpoints from '../../utils/apiEndPoints';

// type OperationKeys = 'N' | 'M' | 'O' | 'A' | 'B' | 'CPS' | 'HAB' | 'HC';

// interface RowData {
//   id: number;
//   mark: string;
//   sections: string;
//   section: string;
//   material: string;
//   length: number;
//   width: number;
//   wt: number;
//   wtPerPc: number;
//   qty: number;
//   totalWeight: number;
//   operations: Record<OperationKeys, boolean>;
// }

// interface JobCardData {
//   id: number;
//   company_name: string;
//   Job_order_no: string;
//   project_name: string | null;
//   type_of_tower: string;
//   note: string;
//   mark_no: string;
//   section: string;
//   length: string;
//   width: string;
//   unit: string;
//   wt_and_pcs: string;
//   total_quantity: string;
//   total_weight: string;
//   operations: null;
//   remarks: string;
//   release_date: string;
//   jc_no: string;
// }

// interface JobCardSlipProps {
//   jobCardId: string | undefined;
// }

// const JobCardSlip: React.FC<JobCardSlipProps> = ({ jobCardId }) => {
//   const [tableData, setTableData] = useState<RowData[]>([]);
//   const [isEditing, setIsEditing] = useState(false);
//   const [isTableVisible, setIsTableVisible] = useState(false);
//   const [keyValuePairs, setKeyValuePairs] = useState<{ key: string; value: string }[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [jobCardData, setJobCardData] = useState<JobCardData | null>(null);

//   // Fetch job card data from API
//   useEffect(() => {
//     const fetchJobCardData = async () => {
//       try {
//         const response = await apiRequest<JobCardData>(
//           "GET",
//           `${endpoints.getjobcardlistid}?id=${jobCardId}`
//         );

//         setJobCardData(response);

//         // Format header data
//         const formattedData = [
//           { key: "Job Order No", value: response.Job_order_no || "N/A" },
//           { key: "Client", value: response.company_name || "N/A" },
//           { key: "Project", value: response.project_name || "N/A" },
//           { key: "Type of Tower", value: response.type_of_tower || "N/A" },
//           { key: "Instruction", value: response.note || "N/A" },
//           { key: "Released Date", value: response.release_date ? new Date(response.release_date).toLocaleDateString() : "N/A" },
//           { key: "JC NO", value: response.jc_no || "N/A" },
//         ];
//         setKeyValuePairs(formattedData);

//         // Format table data
//         const formattedTableData: RowData[] = [{
//           id: response.id,
//           mark: response.mark_no || "N/A",
//           sections: "Pending",
//           section: response.mark_no || "N/A",
//           material: response.section || "N/A",
//           length: parseFloat(response.length) || 0,
//           width: parseFloat(response.width) || 0,
//           wt: parseFloat(response.unit) || 0,
//           wtPerPc: parseFloat(response.wt_and_pcs) || 0,
//           qty: parseInt(response.total_quantity, 10) || 0,
//           totalWeight: parseFloat(response.total_weight) || 0,
//           operations: {
//             N: false,
//             M: false,
//             O: false,
//             A: false,
//             B: false,
//             CPS: false,
//             HAB: false,
//             HC: false,
//           },
//         }];
        
//         setTableData(formattedTableData);
//         setLoading(false);
//       } catch (err) {
//         console.error("Error fetching job card data:", err);
//         setError("Failed to load job card data");
//         setLoading(false);
//       }
//     };

//     if (jobCardId) {
//       fetchJobCardData();
//     }
//   }, [jobCardId]);

//   const toggleEdit = () => {
//     setIsEditing(!isEditing);
//   };

//   const handleKeyChange = (index: number, newKey: string) => {
//     const updatedPairs = [...keyValuePairs];
//     updatedPairs[index].key = newKey;
//     setKeyValuePairs(updatedPairs);
//   };

//   const handleValueChange = (index: number, newValue: string) => {
//     const updatedPairs = [...keyValuePairs];
//     updatedPairs[index].value = newValue;
//     setKeyValuePairs(updatedPairs);
//   };

//   const handleSave = () => {
//     setIsEditing(false);
//     setKeyValuePairs(keyValuePairs.filter((pair) => pair.key.trim() && pair.value.trim()));
//   };

//   const handleAddPair = () => {
//     const updatedPairs = [...keyValuePairs, { key: "", value: "" }];
//     setKeyValuePairs(updatedPairs);
//   };

//   const handleRemovePair = (index: number) => {
//     const updatedPairs = [...keyValuePairs];
//     updatedPairs.splice(index, 1);
//     setKeyValuePairs(updatedPairs);
//   };

//   const toggleTable = () => {
//     setIsTableVisible(!isTableVisible);
//   };

//   const handleSectionToggle = (rowId: number) => {
//     setTableData((prevData) =>
//       prevData.map((row) =>
//         row.id === rowId
//           ? {
//               ...row,
//               section: row.section === 'Done' ? 'Pending' : 'Done',
//             }
//           : row
//       )
//     );
//   };
 
//   const handleCheckboxChange = (
//     event: React.ChangeEvent<HTMLInputElement>,
//     rowId: number,
//     key: OperationKeys
//   ) => {
//     setTableData((prevData) =>
//       prevData.map((row) =>
//         row.id === rowId
//           ? {
//               ...row,
//               operations: {
//                 ...row.operations,
//                 [key]: event.target.checked,
//               },
//             }
//           : row
//       )
//     );
//   };
  
//   if (loading) {
//     return <div>Loading job card data...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <>
//       <Card
//         sx={{
//           boxShadow: `
//             4px 4px 20px 0px #6F8CB069,
//             -6px -6px 20px 0px #FFFFFF,
//             2px 2px 4px 0px #728EAB1A
//           `,
//           background: "#E7EBF0",
//           borderRadius: "12px",
//         }}
//       >
//         <CardContent>
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//               mb: 3,
//             }}
//           >
//             <Typography variant="h3">
//               Job card cum steel requisition slip
//             </Typography>
//             <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//               <Grid item>
//                 <Box
//                   sx={{
//                     width: 108,
//                     height: 32,
//                     backgroundColor: "#E7EBF0",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     cursor: "pointer",
//                     boxShadow: `
//                       4px 4px 20px 0px #6F8CB069,
//                       -6px -6px 20px 0px #FFFFFF,
//                       2px 2px 4px 0px #728EAB1A
//                     `,
//                     borderRadius: "8px",
//                     padding: "1.5px",
//                     textAlign: "center",
//                     gap: "8px",
//                   }}
//                   onClick={toggleTable}
//                 >
//                   <span
//                     style={{
//                       fontSize: "12px",
//                       color: "#000",
//                       fontWeight: 500,
//                       cursor: "pointer",
//                     }}
//                   >
//                     {isTableVisible ? "Close Table" : "View Table"}
//                   </span>
//                   <img
//                     src={uploadIconDownArrow}
//                     alt="Upload Document"
//                     style={{
//                       width: "20px",
//                       height: "20px",
//                       cursor: "pointer",
//                       transform: isTableVisible ? "rotate(180deg)" : "rotate(0deg)",
//                       transition: "transform 0.3s",
//                     }}
//                   />
//                 </Box>
//               </Grid>
//               <Grid item>
//                 <Box
//                   sx={{
//                     width: 66,
//                     height: 32,
//                     backgroundColor: "#E7EBF0",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     cursor: "pointer",
//                     boxShadow: `
//                       4px 4px 20px 0px #6F8CB069,
//                       -6px -6px 20px 0px #FFFFFF,
//                       2px 2px 4px 0px #728EAB1A
//                     `,
//                     borderRadius: "8px",
//                     padding: "1.5px",
//                     textAlign: "center",
//                     gap: "8px",
//                   }}
//                   onClick={toggleEdit}
//                 >
//                   <img
//                     src={Edit}
//                     alt="Upload Document"
//                     style={{
//                       width: "15px",
//                       height: "15px",
//                       cursor: "pointer",
//                     }}
//                   />
//                   <span
//                     style={{
//                       fontSize: "12px",
//                       color: "#000",
//                       fontWeight: 500,
//                       cursor: "pointer",
//                     }}
//                   >
//                     Edit
//                   </span>
//                 </Box>
//               </Grid>
//             </Box>
//           </Box>

//           {/* Render Key-Value Pairs */}
//           <Box
//             sx={{
//               display: "grid",
//               gridTemplateColumns: "1fr 1fr",
//               rowGap: 2,
//               columnGap: 4,
//             }}
//           >
//             {keyValuePairs.map((pair, index) => (
//               <Box
//                 key={index}
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: 1,
//                 }}
//               >
//                 {isEditing ? (
//                   <>
//                     <Box sx={{ display: "flex", alignItems: "center", gap: 1, width: "40%" }}>
//                     • 
//                       <TextField
//                         value={pair.key}
//                         onChange={(e) => handleKeyChange(index, e.target.value)}
//                         size="small"
//                         placeholder="Key"
//                         sx={{ width: "calc(100% - 16px)" }}
//                       />
//                     </Box>
//                     <span style={{ margin: "0 5px" }}>:</span>
//                     <TextField
//                       value={pair.value}
//                       onChange={(e) => handleValueChange(index, e.target.value)}
//                       size="small"
//                       placeholder="Value"
//                       sx={{ width: "60%" }}
//                     />
//                     <Button
//                       variant="outlined"
//                       color="error"
//                       size="small"
//                       onClick={() => handleRemovePair(index)}
//                       sx={{
//                         minWidth: "30px",
//                         height: "30px",
//                         fontSize: "12px",
//                       }}
//                     >
//                       X
//                     </Button>
//                   </>
//                 ) : (
//                   <>
//                     <Box
//                       sx={{
//                         display: "flex",
//                         alignItems: "center",
//                         gap: 1,
//                         width: "40%",
//                       }}
//                     >
//                       <Typography
//                         sx={{
//                           fontWeight: "500",
//                           color: "#505576",
//                           flex: 1,
//                           fontSize:'14px'
//                         }}
//                       >
//                          • {pair.key}
//                       </Typography>
//                     </Box>
//                     <span style={{ margin: "0 5px" }}>:</span>
//                     <Typography
//                       sx={{ color: "#070810", flex: 1,fontSize:'14px' }}
//                     >
//                       {pair.value}
//                     </Typography>
//                   </>
//                 )}
//               </Box>
//             ))}
//           </Box>

//           {isEditing && (
//             <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={handleAddPair}
//                 sx={{
//                   textTransform: "none",
//                   fontSize: "14px",
//                   fontWeight: "500",
//                 }}
//               >
//                 Add
//               </Button>
//               <Button
//                 variant="contained"
//                 color="success"
//                 onClick={handleSave}
//                 sx={{ textTransform: "none", fontSize: "14px", fontWeight: "500" }}
//               >
//                 Save
//               </Button>
//             </Box>
//           )}

//           <TableContainer component={Paper} sx={{ boxShadow: 'none', bgcolor: '#e7ebf0', mt: '20px' , border: '1px solid #d3d4d9'}}>
//             <Table size="small">
//               <TableHead>
//                 <TableRow style={{ background: '#e1e8f3',padding:"10px" }}>
//                   <TableCell sx={{ fontWeight: 600, color: '#7c84a2', borderRight: '1px solid #d3d4d9' }}>Mark</TableCell>
//                   <TableCell sx={{ fontWeight: 600, borderRight: '1px solid #d3d4d9' }}></TableCell>
//                   <TableCell sx={{ fontWeight: 600, color: '#7c84a2', borderRight: '1px solid #d3d4d9' }}>Section</TableCell>
//                   <TableCell sx={{ fontWeight: 600, color: '#7c84a2', borderRight: '1px solid #d3d4d9' }}>Length</TableCell>
//                   <TableCell sx={{ fontWeight: 600, color: '#7c84a2', borderRight: '1px solid #d3d4d9' }}>Width</TableCell>
//                   <TableCell sx={{ fontWeight: 600, color: '#7c84a2', borderRight: '1px solid #d3d4d9' }}>Unit</TableCell>
//                   <TableCell sx={{ fontWeight: 600, color: '#7c84a2', borderRight: '1px solid #d3d4d9' }}>WT/PCS</TableCell>
//                   <TableCell sx={{ fontWeight: 600, color: '#7c84a2', borderRight: '1px solid #d3d4d9' }}>QTY</TableCell>
//                   <TableCell sx={{ fontWeight: 600, color: '#7c84a2', borderRight: '1px solid #d3d4d9' }}>Total</TableCell>
//                   <TableCell sx={{ fontWeight: 600,  color: '#7c84a2',borderRight: '1px solid #d3d4d9' }}>Operations</TableCell>
//                   <TableCell sx={{ fontWeight: 600, borderRight: '1px solid #d3d4d9' }}></TableCell>
//                   <TableCell sx={{ fontWeight: 600, borderRight: '1px solid #d3d4d9' }}></TableCell>
//                   <TableCell sx={{ fontWeight: 600, borderRight: '1px solid #d3d4d9' }}></TableCell>
//                   <TableCell sx={{ fontWeight: 600, borderRight: '1px solid #d3d4d9' }}></TableCell>
//                   <TableCell sx={{ fontWeight: 600, borderRight: '1px solid #d3d4d9' }}></TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableHead>
//                 <TableRow>
//                   <TableCell sx={{ color: '#565b7a', borderRight: '1px solid #d3d4d9' }}>NO</TableCell>
//                   <TableCell sx={{ borderRight: '1px solid #d3d4d9' }}></TableCell>
//                   <TableCell sx={{ color: '#565b7a', borderRight: '1px solid #d3d4d9' }}>(mm)</TableCell>
//                   <TableCell sx={{ color: '#565b7a', borderRight: '1px solid #d3d4d9' }}>(mm)</TableCell>
//                   <TableCell sx={{ color: '#565b7a', borderRight: '1px solid #d3d4d9' }}>W.T.</TableCell>
//                   <TableCell sx={{ borderRight: '1px solid #d3d4d9' }}></TableCell>
//                   <TableCell sx={{ color: '#565b7a', borderRight: '1px solid #d3d4d9' }}>QTY</TableCell>
//                   <TableCell sx={{ borderRight: '1px solid #d3d4d9' }}></TableCell>
//                   <TableCell sx={{ color: '#565b7a', borderRight: '1px solid #d3d4d9' }}>Weight</TableCell>
//                   <TableCell sx={{ color: '#565b7a', borderRight: '1px solid #d3d4d9' }}>1,CPS</TableCell>
//                   <TableCell sx={{ color: '#565b7a', borderRight: '1px solid #d3d4d9' }}>N</TableCell>
//                   <TableCell sx={{ color: '#565b7a', borderRight: '1px solid #d3d4d9' }}>B</TableCell>
//                   <TableCell sx={{ color: '#565b7a', borderRight: '1px solid #d3d4d9' }}>CPS</TableCell>
//                   <TableCell sx={{ color: '#565b7a', borderRight: '1px solid #d3d4d9' }}>HAB</TableCell>
//                   <TableCell sx={{ color: '#565b7a', borderRight: '1px solid #d3d4d9' }}>HC</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {tableData.map((row) => (
//                   <TableRow key={row.id}>
//                     <TableCell sx={{ borderRight: '1px solid #d3d4d9' }}>{row.mark}</TableCell>
//                     <TableCell sx={{ borderRight: '1px solid #d3d4d9' }}>
//                       <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                         <Checkbox checked={row.section === 'Done'} onChange={() => handleSectionToggle(row.id)} size="small" />
//                         <Typography sx={{ fontSize: 13 }}>{row.sections}</Typography>
//                       </Box>
//                     </TableCell>
//                     <TableCell sx={{ borderRight: '1px solid #d3d4d9' }}>{row.section}</TableCell>
//                     <TableCell sx={{ borderRight: '1px solid #d3d4d9' }}>{row.length}</TableCell>
//                     <TableCell sx={{ borderRight: '1px solid #d3d4d9' }}>{row.width}</TableCell>
//                     <TableCell sx={{ borderRight: '1px solid #d3d4d9' }}>{row.wt}</TableCell>
//                     <TableCell sx={{ borderRight: '1px solid #d3d4d9' }}>{row.wtPerPc}</TableCell>
//                     <TableCell sx={{ borderRight: '1px solid #d3d4d9' }}>{row.qty}</TableCell>
//                     <TableCell sx={{ borderRight: '1px solid #d3d4d9' }}>{row.totalWeight}</TableCell>
//                     <TableCell sx={{ borderRight: '1px solid #d3d4d9' }}>1. CPS</TableCell>

//                     {[
//                       ['N', 'M', 'O', 'A'],
//                       ['B', 'M', 'O', 'A'],
//                       ['CPS', 'M', 'O', 'A'],
//                       ['HAB', 'M', 'O', 'A'],
//                       ['HC', 'M', 'O', 'A'],
//                     ].map((ops, idx) => (
//                       <TableCell sx={{ borderRight: '1px solid #d3d4d9' }} align="center" key={idx}>
//                         <Stack direction="column" spacing={1}>
//                           {ops.map((op) => (
//                             <FormControlLabel
//                               key={op}
//                               label={`${op}:`}
//                               labelPlacement="start"
//                               control={
//                                 <Checkbox
//                                   checked={row.operations[op as OperationKeys]}
//                                   onChange={(e) => handleCheckboxChange(e, row.id, op as OperationKeys)}
//                                   size="small"
//                                 />
//                               }
//                             />
//                           ))}
//                         </Stack>
//                       </TableCell>
//                     ))}
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           {isTableVisible && (
//             <Box sx={{ mt: 4 }}>
//               <SteelRequisitionTable />
//             </Box>
//           )}
//         </CardContent>
//       </Card>
//     </>
//   );
// };

// export default JobCardSlip;

import React, { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Stack,
  FormControlLabel,
  Checkbox,
  CircularProgress,
} from "@mui/material";
// import uploadIconDownArrow from "../../assets/arrow_drop_down.png";
import Edit from "../../assets/edit.png";
import SteelRequisitionTable from "./SteelRequisitionTable";
import { apiRequest } from '../../utils/apiclient';
import endpoints from '../../utils/apiEndPoints';


type OperationKeys = 'N' | 'M' | 'O' | 'A' | 'B' | 'CPS' | 'HAB' | 'HC';

interface RowData {
  id: number;
  mark: string;
  sections: string;
  section: string;
  material: string;
  length: number;
  width: number;
  wt: number;
  wtPerPc: number;
  qty: number;
  totalWeight: number;
  operations: Record<OperationKeys, boolean>;
}

interface JobCardData {
  id: number;
  company_name: string;
  Job_order_no: string;
  project_name: string | null;
  type_of_tower: string;
  note: string;
  mark_no: string;
  section: string;
  length: string;
  width: string;
  unit: string;
  wt_and_pcs: string;
  total_quantity: string;
  total_weight: string;
  operations: null;
  remarks: string;
  release_date: string;
  jc_no: string;
}

interface JobCardSlipProps {
  jobCardId: string | undefined;
  projectId?: string | number;
}



const JobCardSlip: React.FC<JobCardSlipProps> = ({ jobCardId,projectId }) => {
  const [tableData, setTableData] = useState<RowData[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  // const [isTableVisible, setIsTableVisible] = useState(false);
  const [keyValuePairs, setKeyValuePairs] = useState<{ key: string; value: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [jobCardData, setJobCardData] = useState<JobCardData | null>(null);

  const defaultOperations: Record<OperationKeys, boolean> = {
    N: false,
    M: false,
    O: false,
    A: false,
    B: false,
    CPS: false,
    HAB: false,
    HC: false,
  };

  // Fetch job card data from API
  
useEffect(() => {
  const fetchJobCardData = async () => {
    try {
      if (!jobCardId) {
        setError("Job card ID is required");
        setLoading(false);
        return;
      }

      const response = await apiRequest<{ success: boolean; data: JobCardData }>(
        "GET",
        `${endpoints.getjobcardlistid}?id=${jobCardId}`
      );

      if (!response || !response.success || !response.data) {
        throw new Error("No valid data received from server");
      }

      const data = response.data; // ✅ use this for further processing

      setJobCardData(data);

      // Header data formatting
      const formattedData = [
        { key: "Job Order No", value: data.Job_order_no || "N/A" },
        { key: "Client", value: data.company_name || "N/A" },
        { key: "Project", value: data.project_name || "N/A" },
        { key: "Type of Tower", value: data.type_of_tower || "N/A" },
        { key: "Instruction", value: data.note || "N/A" },
        { key: "Released Date", value: data.release_date ? new Date(data.release_date).toLocaleDateString() : "N/A" },
        { key: "JC NO", value: data.jc_no || "N/A" },
      ];
      setKeyValuePairs(formattedData);

      // Table data formatting
      const formattedTableData: RowData[] = [{
        id: data.id,
        mark: data.mark_no || "N/A",
        sections: "Pending",
        section: data.mark_no || "N/A",
        material: data.section || "N/A",
        length: parseFloat(data.length) || 0,
        width: isNaN(parseFloat(data.width)) ? 0 : parseFloat(data.width),
        wt: parseFloat(data.unit) || 0,
        wtPerPc: parseFloat(data.wt_and_pcs) || 0,
        qty: parseInt(data.total_quantity, 10) || 0,
        totalWeight: parseFloat(data.total_weight) || 0,
        operations: { ...defaultOperations },
      }];
      
      setTableData(formattedTableData);

    } catch (err) {
      console.error("Error fetching job card data:", err);
      setError(err instanceof Error ? err.message : "Failed to load job card data");
    } finally {
      setLoading(false);
    }
  };

  fetchJobCardData();
}, [jobCardId]);


  const toggleEdit = useCallback(() => {
    setIsEditing(prev => !prev);
  }, []);


  const handleKeyChange = useCallback((index: number, newKey: string) => {
    setKeyValuePairs(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], key: newKey };
      return updated;
    });
  }, []);

  const handleValueChange = useCallback((index: number, newValue: string) => {
    setKeyValuePairs(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], value: newValue };
      return updated;
    });
  }, []);

  const handleSave = useCallback(() => {
    setIsEditing(false);
    setKeyValuePairs(prev => prev.filter(pair => pair.key.trim() && pair.value.trim()));
  }, []);

  const handleAddPair = useCallback(() => {
    setKeyValuePairs(prev => [...prev, { key: "", value: "" }]);
  }, []);

  const handleRemovePair = useCallback((index: number) => {
    setKeyValuePairs(prev => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
  }, []);

  // const toggleTable = useCallback(() => {
  //   setIsTableVisible(prev => !prev);
  // }, []);

  const handleSectionToggle = useCallback((rowId: number) => {
    setTableData(prev =>
      prev.map(row =>
        row.id === rowId
          ? {
              ...row,
              section: row.section === 'Done' ? 'Pending' : 'Done',
            }
          : row
      )
    );
  }, []);

  const handleCheckboxChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, rowId: number, key: OperationKeys) => {
      setTableData(prev =>
        prev.map(row =>
          row.id === rowId
            ? {
                ...row,
                operations: {
                  ...row.operations,
                  [key]: event.target.checked,
                },
              }
            : row
        )
      );
    },
    []
  );

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

  if (!jobCardData) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <Typography>No job card data available</Typography>
      </Box>
    );
  }


const handleDownload = async () => {
  if (!projectId || isNaN(Number(projectId))) {
    alert("Invalid project ID");
    return;
  }

  try {
    const response = await apiRequest<Blob>(
      "GET",
      `${endpoints.downloadJobCardByProjectId}?project_id=${projectId}`,
      null,
      { responseType: "blob" }
    );

    const url = window.URL.createObjectURL(new Blob([response]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `job_card_${projectId}.xlsx`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error("Download failed:", error);
  }
};



  return (
    <Card
      sx={{
        boxShadow: `
          4px 4px 20px 0px #6F8CB069,
          -6px -6px 20px 0px #FFFFFF,
          2px 2px 4px 0px #728EAB1A
        `,
        background: "#E7EBF0",
        borderRadius: "12px",
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 3,
          }}
        >
          <Typography variant="h3">
            Job card cum steel requisition slip
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Grid item>
              {/* <Button
                variant="outlined"
                sx={{
                  width: 108,
                  height: 32,
                  backgroundColor: "#E7EBF0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: `
                    4px 4px 20px 0px #6F8CB069,
                    -6px -6px 20px 0px #FFFFFF,
                    2px 2px 4px 0px #728EAB1A
                  `,
                  borderRadius: "8px",
                  gap: "8px",
                }}
                onClick={toggleTable}
              >
                <Typography fontSize="12px" fontWeight={500}>
                  {isTableVisible ? "Close Table" : "View Table"}
                </Typography>
                <img
                  src={uploadIconDownArrow}
                  alt="Toggle Table"
                  style={{
                    width: "20px",
                    height: "20px",
                    transform: isTableVisible ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.3s",
                  }}
                />
              </Button> */}
            </Grid>
             <Grid item>

              <Button
                variant="outlined"
                sx={{
                  width: 66,
                  height: 32,
                  backgroundColor: "#E7EBF0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: `
                    4px 4px 20px 0px #6F8CB069,
                    -6px -6px 20px 0px #FFFFFF,
                    2px 2px 4px 0px #728EAB1A
                  `,
                  borderRadius: "8px",
                  gap: "8px",
                }}
                onClick={handleDownload}
              >
                <Typography fontSize="12px" fontWeight={500}>
                  Download
                </Typography>
              </Button>



            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                sx={{
                  width: 66,
                  height: 32,
                  backgroundColor: "#E7EBF0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: `
                    4px 4px 20px 0px #6F8CB069,
                    -6px -6px 20px 0px #FFFFFF,
                    2px 2px 4px 0px #728EAB1A
                  `,
                  borderRadius: "8px",
                  gap: "8px",
                }}
                onClick={toggleEdit}
              >
                <img
                  src={Edit}
                  alt="Edit"
                  style={{
                    width: "15px",
                    height: "15px",
                  }}
                />
                <Typography fontSize="12px" fontWeight={500}>
                  Edit
                </Typography>
              </Button>
            </Grid>
          </Box>
        </Box>

        {/* Key-Value Pairs */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            rowGap: 2,
            columnGap: 4,
          }}
        >
          {keyValuePairs.map((pair, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              {isEditing ? (
                <>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, width: "40%" }}>
                    • 
                    <TextField
                      value={pair.key}
                      onChange={(e) => handleKeyChange(index, e.target.value)}
                      size="small"
                      placeholder="Key"
                      sx={{ width: "calc(100% - 16px)" }}
                    />
                  </Box>
                  <span>:</span>
                  <TextField
                    value={pair.value}
                    onChange={(e) => handleValueChange(index, e.target.value)}
                    size="small"
                    placeholder="Value"
                    sx={{ width: "60%" }}
                  />
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleRemovePair(index)}
                    sx={{
                      minWidth: "30px",
                      height: "30px",
                      fontSize: "12px",
                    }}
                  >
                    X
                  </Button>
                </>
              ) : (
                <>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1, width: "40%" }}>
                    <Typography fontWeight={500} color="#505576" flex={1} fontSize={14}>
                      • {pair.key}
                    </Typography>
                  </Box>
                  <span>:</span>
                  <Typography color="#070810" flex={1} fontSize={14}>
                    {pair.value}
                  </Typography>
                </>
              )}
            </Box>
          ))}
        </Box>

        {isEditing && (
          <Box sx={{ mt: 2, display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="contained"
              onClick={handleAddPair}
              sx={{
                textTransform: "none",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              Add
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={handleSave}
              sx={{ textTransform: "none", fontSize: "14px", fontWeight: "500" }}
            >
              Save
            </Button>
          </Box>
        )}

        <TableContainer 
          component={Paper} 
          sx={{ 
            boxShadow: 'none', 
            bgcolor: '#e7ebf0', 
            mt: '20px',
            border: '1px solid #d3d4d9'
          }}
        >
          <Table size="small">
            <TableHead>
              <TableRow sx={{ background: '#e1e8f3' }}>
                <TableCell sx={{ fontWeight: 600, color: '#7c84a2', borderRight: '1px solid #d3d4d9' }}>Mark</TableCell>
                <TableCell sx={{ fontWeight: 600, borderRight: '1px solid #d3d4d9' }}></TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#7c84a2', borderRight: '1px solid #d3d4d9' }}>Section</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#7c84a2', borderRight: '1px solid #d3d4d9' }}>Length</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#7c84a2', borderRight: '1px solid #d3d4d9' }}>Width</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#7c84a2', borderRight: '1px solid #d3d4d9' }}>Unit</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#7c84a2', borderRight: '1px solid #d3d4d9' }}>WT/PCS</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#7c84a2', borderRight: '1px solid #d3d4d9' }}>QTY</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#7c84a2', borderRight: '1px solid #d3d4d9' }}>Total</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#7c84a2', borderRight: '1px solid #d3d4d9' }}>Operations</TableCell>
                {[...Array(5)].map((_, i) => (
                  <TableCell key={i} sx={{ fontWeight: 600, borderRight: '1px solid #d3d4d9' }}></TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: '#565b7a', borderRight: '1px solid #d3d4d9' }}>NO</TableCell>
                <TableCell sx={{ borderRight: '1px solid #d3d4d9' }}></TableCell>
                <TableCell sx={{ color: '#565b7a', borderRight: '1px solid #d3d4d9' }}>(mm)</TableCell>
                <TableCell sx={{ color: '#565b7a', borderRight: '1px solid #d3d4d9' }}>(mm)</TableCell>
                <TableCell sx={{ color: '#565b7a', borderRight: '1px solid #d3d4d9' }}>W.T.</TableCell>
                <TableCell sx={{ borderRight: '1px solid #d3d4d9' }}></TableCell>
                <TableCell sx={{ color: '#565b7a', borderRight: '1px solid #d3d4d9' }}>QTY</TableCell>
                <TableCell sx={{ borderRight: '1px solid #d3d4d9' }}></TableCell>
                <TableCell sx={{ color: '#565b7a', borderRight: '1px solid #d3d4d9' }}>Weight</TableCell>
                <TableCell sx={{ color: '#565b7a', borderRight: '1px solid #d3d4d9' }}>1,CPS</TableCell>
                <TableCell sx={{ color: '#565b7a', borderRight: '1px solid #d3d4d9' }}>N</TableCell>
                <TableCell sx={{ color: '#565b7a', borderRight: '1px solid #d3d4d9' }}>B</TableCell>
                <TableCell sx={{ color: '#565b7a', borderRight: '1px solid #d3d4d9' }}>CPS</TableCell>
                <TableCell sx={{ color: '#565b7a', borderRight: '1px solid #d3d4d9' }}>HAB</TableCell>
                <TableCell sx={{ color: '#565b7a', borderRight: '1px solid #d3d4d9' }}>HC</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tableData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell sx={{ borderRight: '1px solid #d3d4d9' }}>{row.mark}</TableCell>
                  <TableCell sx={{ borderRight: '1px solid #d3d4d9' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Checkbox 
                        checked={row.section === 'Done'} 
                        onChange={() => handleSectionToggle(row.id)} 
                        size="small" 
                      />
                      <Typography sx={{ fontSize: 13 }}>{row.sections}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ borderRight: '1px solid #d3d4d9' }}>{row.section}</TableCell>
                  <TableCell sx={{ borderRight: '1px solid #d3d4d9' }}>{row.length}</TableCell>
                  <TableCell sx={{ borderRight: '1px solid #d3d4d9' }}>{row.width}</TableCell>
                  <TableCell sx={{ borderRight: '1px solid #d3d4d9' }}>{row.wt}</TableCell>
                  <TableCell sx={{ borderRight: '1px solid #d3d4d9' }}>{row.wtPerPc}</TableCell>
                  <TableCell sx={{ borderRight: '1px solid #d3d4d9' }}>{row.qty}</TableCell>
                  <TableCell sx={{ borderRight: '1px solid #d3d4d9' }}>{row.totalWeight}</TableCell>
                  <TableCell sx={{ borderRight: '1px solid #d3d4d9' }}>1. CPS</TableCell>

                  {[
                    ['N', 'M', 'O', 'A'],
                    ['B', 'M', 'O', 'A'],
                    ['CPS', 'M', 'O', 'A'],
                    ['HAB', 'M', 'O', 'A'],
                    ['HC', 'M', 'O', 'A'],
                  ].map((ops, idx) => (
                    <TableCell 
                      sx={{ borderRight: '1px solid #d3d4d9' }} 
                      align="center" 
                      key={idx}
                    >
                      <Stack direction="column" spacing={1}>
                        {ops.map((op) => (
                          <FormControlLabel
                            key={op}
                            label={`${op}:`}
                            labelPlacement="start"
                            control={
                              <Checkbox
                                checked={row.operations[op as OperationKeys]}
                                onChange={(e) => handleCheckboxChange(e, row.id, op as OperationKeys)}
                                size="small"
                              />
                            }
                            sx={{ margin: 0 }}
                          />
                        ))}
                      </Stack>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* {isTableVisible && (
          <Box sx={{ mt: 4 }}>
            <SteelRequisitionTable />
          </Box>
        )} */}

          { (
          <Box sx={{ mt: 4 }}>
            <SteelRequisitionTable />
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default React.memo(JobCardSlip);