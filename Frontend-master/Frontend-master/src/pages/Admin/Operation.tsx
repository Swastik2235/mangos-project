import React from "react";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TextField,
  TablePagination,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const rows = [
  { id: 1, machine: "CNC25T", operation: "Cutting, Punching & Stamping", shortCode: "CPS", description: "Cutting, Punching & Stamping" },
  { id: 2, machine: "Unjigging Unit", operation: "Unjigging", shortCode: "Unjig", description: "Unjig" },
  { id: 3, machine: "Passivation Tank", operation: "Passivation", shortCode: "Passi", description: "Passivation" },
  { id: 4, machine: "Quenching Tank", operation: "Quenching", shortCode: "Quench", description: "Quenching" },
  { id: 5, machine: "Zinc Bath", operation: "Zinc Bathing", shortCode: "Zinc", description: "Zinc Bathing" },
  { id: 6, machine: "Rinsing Tank a", operation: "Rinsing", shortCode: "Rinsing", description: "Rinsing" },
  { id: 7, machine: "Dryer", operation: "Dryer", shortCode: "Dryer", description: "Dryer" },
  { id: 8, machine: "Pickling Tank A", operation: "Pickling", shortCode: "Pick", description: "Pick" },
  { id: 9, machine: "Trolley 1", operation: "Jigging", shortCode: "Jig1", description: "Jigging" },
  { id: 10, machine: "CNC12T", operation: "CPS", shortCode: "CPS", description: "Cutting, Punching & Stamping" },
];

const OperationsTable: React.FC = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box>
      {/* Header with Title + Filter + Button */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6" fontWeight={600}>
          Operations
        </Typography>
        <Box display="flex" gap={2} alignItems="center">
          <TextField size="small" variant="outlined" placeholder="Filter" />
          <Button variant="contained" color="primary">
            Add New Operation
          </Button>
          
        </Box>
      </Box>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Machine</TableCell>
              <TableCell>Operation</TableCell>
              <TableCell>Short Code</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.machine}</TableCell>
                <TableCell>{row.operation}</TableCell>
                <TableCell>{row.shortCode}</TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>
                  <IconButton color="primary" size="small">
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" size="small">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* Pagination */}
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Box>
  );
};

export default OperationsTable;
