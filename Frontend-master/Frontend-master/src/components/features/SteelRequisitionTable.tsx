// import React from "react";
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

// interface TableRowData {
//   slNo: number;
//   particulars: string;
//   section: string;
//   quantity: string;
//   unitWeight: string;
// }

// const tableData: TableRowData[] = [
//   { slNo: 1, particulars: "Beam", section: "I-Section", quantity: "15", unitWeight: "200 kg" },
//   { slNo: 2, particulars: "Column", section: "H-Section", quantity: "10", unitWeight: "250 kg" },
//   { slNo: 3, particulars: "Plate", section: "Flat", quantity: "20", unitWeight: "100 kg" },
//   // Add more rows as needed
// ];

// const SteelRequisitionTable: React.FC = () => {
//   return (
//     <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: "12px", mt: 2 }}>
//       <Table>
//         <TableHead>
//           <TableRow sx={{ backgroundColor: "#E7EBF0" }}>
//             <TableCell align="center" sx={{ fontWeight: 700 }}>
//               SL NO
//             </TableCell>
//             <TableCell align="center" sx={{ fontWeight: 700 }}>
//               Particulars
//             </TableCell>
//             <TableCell align="center" sx={{ fontWeight: 700 }}>
//               Section
//             </TableCell>
//             <TableCell align="center" sx={{ fontWeight: 700 }}>
//               Quantity
//             </TableCell>
//             <TableCell align="center" sx={{ fontWeight: 700 }}>
//               Unit Weight
//             </TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {tableData.map((row) => (
//             <TableRow key={row.slNo}>
//               <TableCell align="center">{row.slNo}</TableCell>
//               <TableCell align="center">{row.particulars}</TableCell>
//               <TableCell align="center">{row.section}</TableCell>
//               <TableCell align="center">{row.quantity}</TableCell>
//               <TableCell align="center">{row.unitWeight}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default SteelRequisitionTable;



// import React, { useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   TextField,
//   Button,
// } from "@mui/material";
// import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

// interface TableRowData {
//   [key: string]: string | number;
// }

// const SteelRequisitionTable: React.FC = () => {
//   const [tableData, setTableData] = useState<TableRowData[]>([
//     { Mark: "EJSD", Section: "HT 10mm PLATE", Length: 600, Width: 170, Weight: 78.5, Qty: 16 },
//   ]);
//   const [columns, setColumns] = useState<string[]>([
//     "Mark",
//     "Section",
//     "Length",
//     "Width",
//     "Weight",
//     "Qty",
//   ]);

//   // Handle cell edit
//   const handleEditCell = (rowIndex: number, column: string, value: string) => {
//     const updatedData = [...tableData];
//     updatedData[rowIndex][column] = value;
//     setTableData(updatedData);
//   };

//   // Add new row
//   const handleAddRow = () => {
//     const newRow: TableRowData = {};
//     columns.forEach((col) => (newRow[col] = ""));
//     setTableData([...tableData, newRow]);
//   };

//   // Add new column
//   const handleAddColumn = () => {
//     const newColumn = `Column${columns.length + 1}`;
//     setColumns([...columns, newColumn]);
//     setTableData(
//       tableData.map((row) => ({
//         ...row,
//         [newColumn]: "",
//       }))
//     );
//   };

//   return (
//     <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: "12px", mt: 2 }}>
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={handleAddRow}
//         sx={{ m: 2 }}
//         startIcon={<AddCircleOutlineIcon />}
//       >
//         Add Row
//       </Button>
//       <Button
//         variant="contained"
//         color="secondary"
//         onClick={handleAddColumn}
//         sx={{ m: 2 }}
//         startIcon={<AddCircleOutlineIcon />}
//       >
//         Add Column
//       </Button>
//       <Table>
//         <TableHead>
//           <TableRow>
//             {columns.map((column) => (
//               <TableCell key={column} align="center" sx={{ fontWeight: 700 }}>
//                 {column}
//               </TableCell>
//             ))}
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {tableData.map((row, rowIndex) => (
//             <TableRow key={rowIndex}>
//               {columns.map((column) => (
//                 <TableCell key={column} align="center">
//                   <TextField
//                     value={row[column] || ""}
//                     onChange={(e) => handleEditCell(rowIndex, column, e.target.value)}
//                     variant="outlined"
//                     size="small"
//                     fullWidth
//                   />
//                 </TableCell>
//               ))}
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default SteelRequisitionTable;



// import React, { useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
// } from "@mui/material";
// import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

// interface TableRowData {
//   [key: string]: string | number;
// }

// const SteelRequisitionTable: React.FC = () => {
//   const [tableData, setTableData] = useState<TableRowData[]>([
//     { Mark: "EJSD", Section: "HT 10mm PLATE", Length: 600, Width: 170, Weight: 78.5, Qty: 16 },
//   ]);
//   const [columns, setColumns] = useState<string[]>([
//     "Mark",
//     "Section",
//     "Length",
//     "Width",
//     "Weight",
//     "Qty",
//   ]);

//   const [columnsDimensions, setColumnsDimensions] = useState<string[]>([
//     "No",
//     "(mm)",
//     "(mm)",
//     "(mm)",
//     "WT",
//     "No",
//   ]);

//   // Handle editing header
//   const handleEditHeader = (index: number, value: string) => {
//     const updatedColumns = [...columns];
//     updatedColumns[index] = value;
//     setColumns(updatedColumns);

//     // Ensure each row in the table data aligns with updated headers
//     setTableData((prevData) =>
//       prevData.map((row) => {
//         const updatedRow: TableRowData = {};
//         updatedColumns.forEach((col, colIndex) => {
//           updatedRow[col] = row[columns[colIndex]] || "";
//         });
//         return updatedRow;
//       })
//     );
//   };

//   // Handle cell edit
//   const handleEditCell = (rowIndex: number, column: string, value: string) => {
//     const updatedData = [...tableData];
//     updatedData[rowIndex][column] = value;
//     setTableData(updatedData);
//   };

//   // Add new row
//   const handleAddRow = () => {
//     const newRow: TableRowData = {};
//     columns.forEach((col) => (newRow[col] = ""));
//     setTableData([...tableData, newRow]);
//   };

//   // Add new column
//   const handleAddColumn = () => {
//     const newColumn = `Column${columns.length + 1}`;
//     setColumns([...columns, newColumn]);
//     setTableData(
//       tableData.map((row) => ({
//         ...row,
//         [newColumn]: "",
//       }))
//     );
//   };

//   return (
//     <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: "12px", mt: 2, backgroundColor: "#E7EBF0" }}>
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={handleAddRow}
//         sx={{ m: 2 }}
//         startIcon={<AddCircleOutlineIcon />}
//       >
//         Add Row
//       </Button>
//       <Button
//         variant="contained"
//         color="secondary"
//         onClick={handleAddColumn}
//         sx={{ m: 2 }}
//         startIcon={<AddCircleOutlineIcon />}
//       >
//         Add Column
//       </Button>
//       <Table>
//         <TableHead >
//           <TableRow>
//             {columns.map((column, index) => (
//               <TableCell
//                 key={index}
//                 align="center"
//                 sx={{ border: "1px solid #ccc", minWidth: "150px", fontSize:'14px', fontWeight:700, color:'#505576',backgroundColor: "#D3E0FA" }}
//                 contentEditable
//                 suppressContentEditableWarning
//                 onBlur={(e) => handleEditHeader(index, e.currentTarget.textContent || "")}
//               >
//                 {column}
//               </TableCell>
//             ))}
//           </TableRow>
//           <TableRow>
//             {columnsDimensions.map((column, index) => (
//               <TableCell
//                 key={index}
//                 align="center"
//                 sx={{ border: "1px solid #ccc", minWidth: "150px", fontSize:'12px', fontWeight:700, color:'#505576' }}
//                 contentEditable
//                 suppressContentEditableWarning
//                 onBlur={(e) => handleEditHeader(index, e.currentTarget.textContent || "")}
//               >
//                 {column}
//               </TableCell>
//             ))}
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {tableData.map((row, rowIndex) => (
//             <TableRow key={rowIndex}>
//               {columns.map((column) => (
//                 <TableCell
//                   key={column}
//                   align="center"
//                   sx={{ border: "1px solid #ccc" }}
//                   contentEditable
//                   suppressContentEditableWarning
//                   onBlur={(e) => handleEditCell(rowIndex, column, e.currentTarget.textContent || "")}
//                 >
//                   {row[column]}
//                 </TableCell>
//               ))}
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default SteelRequisitionTable;

// // Static table
// import React, { useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   Checkbox,
// } from "@mui/material";
// import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

// interface TableRowData {
//   [key: string]: string | number | { name: string; checked: boolean };
// }

// const SteelRequisitionTable: React.FC = () => {
//   const [tableData, setTableData] = useState<TableRowData[]>([
//     { Mark: "EJSD", Section: "HT 10mm PLATE", Length: 600, Width: 170, Weight: 78.5, Qty: 16 },
//   ]);
//   const [columns, setColumns] = useState<string[]>([
//     "Mark",
//     "Section",
//     "Length",
//     "Width",
//     "Weight",
//     "Qty",
//   ]);

//   const [columnTypes, setColumnTypes] = useState<Record<string, "text" | "checkbox">>({
//     Mark: "text",
//     Section: "text",
//     Length: "text",
//     Width: "text",
//     Weight: "text",
//     Qty: "text",
//   });

//   // Handle editing header
//   const handleEditHeader = (index: number, value: string) => {
//     const updatedColumns = [...columns];
//     const oldColumn = columns[index];
//     updatedColumns[index] = value;
//     setColumns(updatedColumns);

//     setColumnTypes((prev) => {
//       const updatedColumnTypes = { ...prev };
//       updatedColumnTypes[value] = prev[oldColumn];
//       delete updatedColumnTypes[oldColumn];
//       return updatedColumnTypes;
//     });

//     setTableData((prevData) =>
//       prevData.map((row) => {
//         const updatedRow: TableRowData = {};
//         updatedColumns.forEach((col, colIndex) => {
//           updatedRow[col] =
//             row[columns[colIndex]] ||
//             (columnTypes[col] === "checkbox" ? { name: "", checked: false } : "");
//         });
//         return updatedRow;
//       })
//     );
//   };

//   // Handle cell edit
//   const handleEditCell = (
//     rowIndex: number,
//     column: string,
//     value: string | boolean,
//     field: "name" | "checked" = "name"
//   ) => {
//     const updatedData = [...tableData];
//     if (columnTypes[column] === "checkbox" && typeof updatedData[rowIndex][column] === "object") {
//       updatedData[rowIndex][column] = {
//         ...(updatedData[rowIndex][column] as { name: string; checked: boolean }),
//         [field]: value,
//       };
//     } else if (columnTypes[column] === "text") {
//       updatedData[rowIndex][column] = value as string | number;
//     }
//     setTableData(updatedData);
//   };

//   // Add new row
//   const handleAddRow = () => {
//     const newRow: TableRowData = {};
//     columns.forEach((col) =>
//       (newRow[col] = columnTypes[col] === "checkbox" ? { name: "", checked: false } : "")
//     );
//     setTableData([...tableData, newRow]);
//   };

//   // Add new column
//   const handleAddColumn = () => {
//     const newColumn = `Column${columns.length + 1}`;
//     setColumns([...columns, newColumn]);
//     setColumnTypes({ ...columnTypes, [newColumn]: "text" });
//     setTableData(
//       tableData.map((row) => ({
//         ...row,
//         [newColumn]: "",
//       }))
//     );
//   };

//   // Add new checkbox column
//   const handleAddCheckboxColumn = () => {
//     const newColumn = `CheckboxColumn${columns.length + 1}`;
//     setColumns([...columns, newColumn]);
//     setColumnTypes({ ...columnTypes, [newColumn]: "checkbox" });
//     setTableData(
//       tableData.map((row) => ({
//         ...row,
//         [newColumn]: { name: "", checked: false },
//       }))
//     );
//   };

//   return (
//     <TableContainer
//       component={Paper}
//       sx={{
//         boxShadow: 3,
//         borderRadius: "12px",
//         mt: 2,
//         backgroundColor: "#E7EBF0",
//       }}
//     >
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={handleAddRow}
//         sx={{ m: 2 }}
//         startIcon={<AddCircleOutlineIcon />}
//       >
//         Add Row
//       </Button>
//       <Button
//         variant="contained"
//         color="secondary"
//         onClick={handleAddColumn}
//         sx={{ m: 2 }}
//         startIcon={<AddCircleOutlineIcon />}
//       >
//         Add Column
//       </Button>
//       <Button
//         variant="contained"
//         color="success"
//         onClick={handleAddCheckboxColumn}
//         sx={{ m: 2 }}
//         startIcon={<AddCircleOutlineIcon />}
//       >
//         Add Checkbox Column
//       </Button>

//       <Button
//         variant="contained"
//         color="success"
//         sx={{ m: 2 }}
//       >
//         Upload Excel
//       </Button>
//       <Table>
//         <TableHead>
//           <TableRow>
//             {columns.map((column, index) => (
//               <TableCell
//                 key={index}
//                 align="center"
//                 sx={{
//                   border: "1px solid #ccc",
//                   minWidth: "150px",
//                   fontSize: "14px",
//                   fontWeight: 700,
//                   color: "#505576",
//                   backgroundColor: "#D3E0FA",
//                 }}
//                 contentEditable
//                 suppressContentEditableWarning
//                 onBlur={(e) =>
//                   handleEditHeader(index, e.currentTarget.textContent || "")
//                 }
//               >
//                 {column}
//               </TableCell>
//             ))}
//           </TableRow>
//         </TableHead>
//         <TableBody>
//   {tableData.map((row, rowIndex) => (
//     <TableRow key={rowIndex}>
//       {columns.map((column) => (
//         <TableCell
//           key={column}
//           align="center"
//           sx={{ border: "1px solid #ccc" }}
//         >
//           {columnTypes[column] === "checkbox" ? (
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//               }}
//             >
//               {/* Render Checkbox */}
//               <Checkbox
//                 checked={(row[column] as { checked: boolean }).checked}
//                 onChange={(e) =>
//                   handleEditCell(rowIndex, column, e.target.checked, "checked")
//                 }
//                 sx={{ mr: 1 }}
//               />
//               {/* Render Name */}
//               <div
//                 contentEditable
//                 suppressContentEditableWarning
//                 style={{
//                   outline: "none",
//                   border: "none",
//                   background: "none",
//                   padding: "0 5px",
//                   fontSize: "14px",
//                 }}
//                 onBlur={(e) =>
//                   handleEditCell(rowIndex, column, e.currentTarget.textContent || "", "name")
//                 }
//               >
//                 {(row[column] as { name: string }).name}
//               </div>
//             </div>
//           ) : (
//             // Render Text for non-checkbox columns
//             <div
//               contentEditable
//               suppressContentEditableWarning
//               onBlur={(e) =>
//                 handleEditCell(rowIndex, column, e.currentTarget.textContent || "")
//               }
//             >
//               {row[column] as string | number}
//             </div>
//           )}
//         </TableCell>
//       ))}
//     </TableRow>
//   ))}
// </TableBody>

//       </Table>
//     </TableContainer>
//   );
// };

// export default SteelRequisitionTable;


// //Dynamic table
// import React, { useState, useEffect } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   Checkbox,
// } from "@mui/material";
// import { FileUpload } from 'lucide-react';
// import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

// interface TableRowData {
//   [key: string]: string | number | { name: string; checked: boolean };
// }

// interface SteelRequisitionTableProps {
//   initialData?: TableRowData[];
//   onDataChange?: (data: TableRowData[]) => void;
// }

// const SteelRequisitionTable: React.FC<SteelRequisitionTableProps> = ({
//   initialData,
//   onDataChange
// }) => {
//   // Initialize table data
//   const [tableData, setTableData] = useState<TableRowData[]>(initialData || [
//     { Mark: "EJSD", Section: "HT 10mm PLATE", Length: 600, Width: 170, Weight: 78.5, Qty: 16 },
//   ]);

//   // Initialize columns based on initialData or default columns
//   const [columns, setColumns] = useState<string[]>(() => {
//     if (initialData && initialData.length > 0) {
//       return Object.keys(initialData[0]);
//     }
//     return ["Mark", "Section", "Length", "Width", "Weight", "Qty"];
//   });

//   // Track column types (text or checkbox)
//   const [columnTypes, setColumnTypes] = useState<Record<string, "text" | "checkbox">>({});

//   // Initialize column types when columns change
//   useEffect(() => {
//     const newColumnTypes = { ...columnTypes };
//     columns.forEach(col => {
//       if (!newColumnTypes[col]) {
//         newColumnTypes[col] = "text";
//       }
//     });
//     setColumnTypes(newColumnTypes);
//   }, [columns]);

//   // Update table data when initialData changes
//   useEffect(() => {
//     if (initialData) {
//       setTableData(initialData);
//       if (initialData.length > 0) {
//         setColumns(Object.keys(initialData[0]));
//       }
//     }
//   }, [initialData]);

//   // Notify parent component of data changes
//   useEffect(() => {
//     onDataChange?.(tableData);
//   }, [tableData, onDataChange]);

//   // Handle editing column headers
//   const handleEditHeader = (index: number, value: string) => {
//     if (!value.trim()) return;

//     const updatedColumns = [...columns];
//     const oldColumn = columns[index];
//     updatedColumns[index] = value;
//     setColumns(updatedColumns);

//     // Update column types
//     const updatedColumnTypes = { ...columnTypes };
//     updatedColumnTypes[value] = columnTypes[oldColumn];
//     delete updatedColumnTypes[oldColumn];
//     setColumnTypes(updatedColumnTypes);

//     // Update table data with new column name
//     setTableData(prevData =>
//       prevData.map(row => {
//         const updatedRow = { ...row };
//         Object.defineProperty(
//           updatedRow,
//           value,
//           Object.getOwnPropertyDescriptor(updatedRow, oldColumn) || 
//           { value: '', enumerable: true, configurable: true, writable: true }
//         );
//         delete updatedRow[oldColumn];
//         return updatedRow;
//       })
//     );
//   };

//   // Handle cell editing
//   const handleEditCell = (rowIndex: number, column: string, value: string | boolean, field: "name" | "checked" = "name") => {
//     setTableData(prevData => {
//       const newData = [...prevData];
//       if (columnTypes[column] === "checkbox" && typeof newData[rowIndex][column] === "object") {
//         const cellValue = newData[rowIndex][column] as { name: string; checked: boolean };
//         newData[rowIndex][column] = {
//           ...cellValue,
//           [field]: value
//         };
//       } else {
//         // Convert numeric strings to numbers for number columns
//         if (["Length", "Width", "Weight", "Qty"].includes(column) && !isNaN(Number(value))) {
//           newData[rowIndex][column] = Number(value);
//         } else {
//           newData[rowIndex][column] = value;
//         }
//       }
//       return newData;
//     });
//   };

//   // Add new row
//   const handleAddRow = () => {
//     const newRow: TableRowData = {};
//     columns.forEach(col => {
//       if (columnTypes[col] === "checkbox") {
//         newRow[col] = { name: "", checked: false };
//       } else if (["Length", "Width", "Weight", "Qty"].includes(col)) {
//         newRow[col] = 0;
//       } else {
//         newRow[col] = "";
//       }
//     });
//     setTableData(prev => [...prev, newRow]);
//   };

//   // Add new text column
//   const handleAddColumn = () => {
//     const newColumn = `Column${columns.length + 1}`;
//     setColumns(prev => [...prev, newColumn]);
//     setColumnTypes(prev => ({ ...prev, [newColumn]: "text" }));
//     setTableData(prevData =>
//       prevData.map(row => ({
//         ...row,
//         [newColumn]: ""
//       }))
//     );
//   };

//   // Add new checkbox column
//   const handleAddCheckboxColumn = () => {
//     const newColumn = `CheckboxColumn${columns.length + 1}`;
//     setColumns(prev => [...prev, newColumn]);
//     setColumnTypes(prev => ({ ...prev, [newColumn]: "checkbox" }));
//     setTableData(prevData =>
//       prevData.map(row => ({
//         ...row,
//         [newColumn]: { name: "", checked: false }
//       }))
//     );
//   };

//   return (
//     <TableContainer 
//       component={Paper} 
//       sx={{ 
//         boxShadow: 3, 
//         borderRadius: "12px", 
//         mt: 2, 
//         backgroundColor: "#E7EBF0",
//         overflow: "visible" 
//       }}
//     >
//       <div style={{ padding: "16px", display: "flex", gap: "16px" }}>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={handleAddRow}
//           startIcon={<AddCircleOutlineIcon />}
//         >
//           Add Row
//         </Button>
//         <Button
//           variant="contained"
//           color="secondary"
//           onClick={handleAddColumn}
//           startIcon={<AddCircleOutlineIcon />}
//         >
//           Add Column
//         </Button>
//         <Button
//           variant="contained"
//           color="success"
//           onClick={handleAddCheckboxColumn}
//           startIcon={<AddCircleOutlineIcon />}
//         >
//           Add Checkbox Column
//         </Button>
//       </div>

//       <Table>
//         <TableHead>
//           <TableRow>
//             {columns.map((column, index) => (
//               <TableCell
//                 key={index}
//                 align="center"
//                 sx={{
//                   border: "1px solid #ccc",
//                   minWidth: "150px",
//                   fontSize: "14px",
//                   fontWeight: 700,
//                   color: "#505576",
//                   backgroundColor: "#D3E0FA",
//                   position: "sticky",
//                   top: 0,
//                   zIndex: 1
//                 }}
//               >
//                 <div
//                   contentEditable
//                   suppressContentEditableWarning
//                   onBlur={(e) => handleEditHeader(index, e.currentTarget.textContent || "")}
//                   style={{ 
//                     outline: "none",
//                     padding: "4px",
//                     borderRadius: "4px",
//                     transition: "background-color 0.2s"
//                   }}
//                 >
//                   {column}
//                 </div>
//               </TableCell>
//             ))}
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {tableData.map((row, rowIndex) => (
//             <TableRow key={rowIndex}>
//               {columns.map((column) => (
//                 <TableCell
//                   key={column}
//                   align="center"
//                   sx={{ 
//                     border: "1px solid #ccc",
//                     padding: "8px",
//                     transition: "background-color 0.2s"
//                   }}
//                 >
//                   {columnTypes[column] === "checkbox" ? (
//                     <div style={{ 
//                       display: "flex", 
//                       alignItems: "center", 
//                       justifyContent: "center",
//                       gap: "8px"
//                     }}>
//                       <Checkbox
//                         checked={(row[column] as { checked: boolean }).checked}
//                         onChange={(e) => handleEditCell(rowIndex, column, e.target.checked, "checked")}
//                       />
//                       <div
//                         contentEditable
//                         suppressContentEditableWarning
//                         style={{
//                           outline: "none",
//                           padding: "4px",
//                           borderRadius: "4px",
//                           minWidth: "50px",
//                           fontSize: "14px"
//                         }}
//                         onBlur={(e) => handleEditCell(rowIndex, column, e.currentTarget.textContent || "", "name")}
//                       >
//                         {(row[column] as { name: string }).name}
//                       </div>
//                     </div>
//                   ) : (
//                     <div
//                       contentEditable
//                       suppressContentEditableWarning
//                       onBlur={(e) => handleEditCell(rowIndex, column, e.currentTarget.textContent || "")}
//                       style={{
//                         outline: "none",
//                         padding: "4px",
//                         borderRadius: "4px",
//                         transition: "background-color 0.2s"
//                       }}
//                     >
//                       {row[column]}
//                     </div>
//                   )}
//                 </TableCell>
//               ))}
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// };

// export default SteelRequisitionTable;

//dynamic new
import React, { useState, useRef, ChangeEvent } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Checkbox,
  Box
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import * as XLSX from "xlsx";

interface TableRowData {
  [key: string]: string | number | { name: string; checked: boolean };
}

const SteelRequisitionTable: React.FC = () => {
  const [tableData, setTableData] = useState<TableRowData[]>([
    // { Mark: "EJSD", Section: "HT 10mm PLATE", Length: 600, Width: 170, Weight: 78.5, Qty: 16 },
  ]);
  const [columns, setColumns] = useState<string[]>(
    [
    // "Mark",
    // "Section",
    // "Length",
    // "Width",
    // "Weight",
    // "Qty",
  ]
);

  const [columnTypes, setColumnTypes] = useState<Record<string, "text" | "checkbox">>({
    // Mark: "text",
    // Section: "text",
    // Length: "text",
    // Width: "text",
    // Weight: "text",
    // Qty: "text",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  // const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files?.[0];
  //   if (!file) return;
  
  //   const reader = new FileReader();
  //   reader.onload = (e) => {
  //     try {
  //       const data = new Uint8Array(e.target?.result as ArrayBuffer);
  //       const workbook = XLSX.read(data, { type: 'array' });
  //       const firstSheetName = workbook.SheetNames[0];
  //       const worksheet = workbook.Sheets[firstSheetName];
  
  //       // Convert the sheet to JSON
  //       const jsonData = XLSX.utils.sheet_to_json(worksheet);
  
  //       if (Array.isArray(jsonData) && jsonData.length > 0) {
  //         // Extract headers if data is not empty
  //         const excelHeaders = Object.keys(jsonData[0]);
  
  //         // Update columns state
  //         setColumns(excelHeaders);
  
  //         // Update column types
  //         const newColumnTypes: Record<string, "text" | "checkbox"> = {};
  //         excelHeaders.forEach(header => {
  //           newColumnTypes[header] = "text";
  //         });
  //         setColumnTypes(newColumnTypes);
  
  //         // Update table data
  //         setTableData(jsonData as TableRowData[]);
  //       } else {
  //         // If no data, ensure states are cleared or initialized
  //         setColumns([]);
  //         setColumnTypes({});
  //         setTableData([]);
  //         alert("Uploaded file contains no data.");
  //       }
  //     } catch (error) {
  //       console.error("Error reading Excel file:", error);
  //       alert("Error reading Excel file. Please make sure it's a valid Excel file.");
  //     }
  //   };
  //   reader.readAsArrayBuffer(file);
  
  //   // Reset file input
  //   if (fileInputRef.current) {
  //     fileInputRef.current.value = "";
  //   }
  // };
  

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
  
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
  
        // Convert the sheet to JSON
        const jsonData: unknown[] = XLSX.utils.sheet_to_json(worksheet);
  
        if (Array.isArray(jsonData) && jsonData.length > 0) {
          // Ensure the first item is an object
          const firstRow = jsonData[0];
          if (typeof firstRow === "object" && firstRow !== null) {
            const excelHeaders = Object.keys(firstRow);
  
            // Update columns state
            setColumns(excelHeaders);
  
            // Update column types
            const newColumnTypes: Record<string, "text" | "checkbox"> = {};
            excelHeaders.forEach((header) => {
              newColumnTypes[header] = "text";
            });
            setColumnTypes(newColumnTypes);
  
            // Update table data
            setTableData(jsonData as TableRowData[]);
          } else {
            throw new Error("The first row of the Excel file is not an object.");
          }
        } else {
          // If no data, ensure states are cleared or initialized
          setColumns([]);
          setColumnTypes({});
          setTableData([]);
          alert("Uploaded file contains no data.");
        }
      } catch (error) {
        console.error("Error reading Excel file:", error);
        alert("Error reading Excel file. Please make sure it's a valid Excel file.");
      }
    };
    reader.readAsArrayBuffer(file);
  
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  
  
  
  const handleEditHeader = (index: number, value: string) => {
    const updatedColumns = [...columns];
    const oldColumn = columns[index];
    updatedColumns[index] = value;
    setColumns(updatedColumns);

    setColumnTypes((prev) => {
      const updatedColumnTypes = { ...prev };
      updatedColumnTypes[value] = prev[oldColumn];
      delete updatedColumnTypes[oldColumn];
      return updatedColumnTypes;
    });

    setTableData((prevData) =>
      prevData.map((row) => {
        const updatedRow: TableRowData = {};
        updatedColumns.forEach((col, colIndex) => {
          updatedRow[col] =
            row[columns[colIndex]] ||
            (columnTypes[col] === "checkbox" ? { name: "", checked: false } : "");
        });
        return updatedRow;
      })
    );
  };

  // Handle cell edit
  const handleEditCell = (
    rowIndex: number,
    column: string,
    value: string | boolean,
    field: "name" | "checked" = "name"
  ) => {
    const updatedData = [...tableData];
    if (columnTypes[column] === "checkbox" && typeof updatedData[rowIndex][column] === "object") {
      updatedData[rowIndex][column] = {
        ...(updatedData[rowIndex][column] as { name: string; checked: boolean }),
        [field]: value,
      };
    } else if (columnTypes[column] === "text") {
      updatedData[rowIndex][column] = value as string | number;
    }
    setTableData(updatedData);
  };

  // Add new row
  const handleAddRow = () => {
    const newRow: TableRowData = {};
    columns.forEach((col) =>
      (newRow[col] = columnTypes[col] === "checkbox" ? { name: "", checked: false } : "")
    );
    setTableData([...tableData, newRow]);
  };

  // Add new column
  const handleAddColumn = () => {
    const newColumn = `Column${columns.length + 1}`;
    setColumns([...columns, newColumn]);
    setColumnTypes({ ...columnTypes, [newColumn]: "text" });
    setTableData(
      tableData.map((row) => ({
        ...row,
        [newColumn]: "",
      }))
    );
  };

  // Add new checkbox column
  const handleAddCheckboxColumn = () => {
    const newColumn = `CheckboxColumn${columns.length + 1}`;
    setColumns([...columns, newColumn]);
    setColumnTypes({ ...columnTypes, [newColumn]: "checkbox" });
    setTableData(
      tableData.map((row) => ({
        ...row,
        [newColumn]: { name: "", checked: false },
      }))
    );
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        boxShadow: 3,
        borderRadius: "12px",
        mt: 2,
        backgroundColor: "#E7EBF0",
      }}
    >
      {/* <Button
        variant="contained"
        color="primary"
        onClick={handleAddRow}
        sx={{ m: 2 }}
        startIcon={<AddCircleOutlineIcon />}
      >
        Add Row
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleAddColumn}
        sx={{ m: 2 }}
        startIcon={<AddCircleOutlineIcon />}
      >
        Add Column
      </Button>
      <Button
        variant="contained"
        color="success"
        onClick={handleAddCheckboxColumn}
        sx={{ m: 2 }}
        startIcon={<AddCircleOutlineIcon />}
      >
        Add Checkbox Column
      </Button>

      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={handleFileUpload}
        style={{ display: 'none' }}
        ref={fileInputRef}
      />
      <Button
        variant="contained"
        color="info"
        sx={{ m: 2 }}
        startIcon={<UploadFileIcon />}
        onClick={() => fileInputRef.current?.click()}
      >
        Upload Excel
      </Button> */}

<Box
    sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      p: 2,
    }}
  >
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Button
        variant="contained"
        color="info"
        onClick={handleAddRow}
        startIcon={<AddCircleOutlineIcon />}
      >
        Add Row
      </Button>
      <Button
        variant="contained"
        color="info"
        onClick={handleAddColumn}
        startIcon={<AddCircleOutlineIcon />}
      >
        Add Column
      </Button>
      <Button
        variant="contained"
        color="success"
        onClick={handleAddCheckboxColumn}
        startIcon={<AddCircleOutlineIcon />}
      >
        Add Checkbox Column
      </Button>
    </Box>

    <Box>
      <input
        type="file"
        accept=".xlsx,.xls"
        onChange={handleFileUpload}
        style={{ display: 'none' }}
        ref={fileInputRef}
      />
      <Button
        variant="contained"
        color="info"
        startIcon={<UploadFileIcon />}
        onClick={() => fileInputRef.current?.click()}
      >
        Upload Excel
      </Button>
    </Box>
  </Box>

      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell
                key={index}
                align="center"
                sx={{
                  border: "1px solid #ccc",
                  minWidth: "150px",
                  fontSize: "14px",
                  fontWeight: 700,
                  color: "#505576",
                  backgroundColor: "#D3E0FA",
                }}
                contentEditable
                suppressContentEditableWarning
                onBlur={(e) =>
                  handleEditHeader(index, e.currentTarget.textContent || "")
                }
              >
                {column}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column) => (
                <TableCell
                  key={column}
                  align="center"
                  sx={{ border: "1px solid #ccc" }}
                >
                  {columnTypes[column] === "checkbox" ? (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Checkbox
                        checked={(row[column] as { checked: boolean }).checked}
                        onChange={(e) =>
                          handleEditCell(rowIndex, column, e.target.checked, "checked")
                        }
                        sx={{ mr: 1 }}
                      />
                      <div
                        contentEditable
                        suppressContentEditableWarning
                        style={{
                          outline: "none",
                          border: "none",
                          background: "none",
                          padding: "0 5px",
                          fontSize: "14px",
                        }}
                        onBlur={(e) =>
                          handleEditCell(rowIndex, column, e.currentTarget.textContent || "", "name")
                        }
                      >
                        {(row[column] as { name: string }).name}
                      </div>
                    </div>
                  ) : (
                    <div
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) =>
                        handleEditCell(rowIndex, column, e.currentTarget.textContent || "")
                      }
                    >
                      {row[column] as string | number}
                    </div>
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SteelRequisitionTable;