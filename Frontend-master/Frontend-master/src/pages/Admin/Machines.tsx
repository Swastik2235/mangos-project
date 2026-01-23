import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  TextField,
  Button,
  Box,
  TablePagination,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const MachinesTable: React.FC = () => {
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const machines = [
    { name: "Trolley 3", desc: "Galva Loading" },
    { name: "CNC25T", desc: "Cutting, Puncing & Stamping" },
    { name: "Unjigging Unit", desc: "Unjigging" },
    { name: "Passivation Tank", desc: "Passivation" },
    { name: "Quenching Tank", desc: "Quenching" },
    { name: "Zinc Bath", desc: "Zinc Dipping" },
    { name: "Rinsing Tank a", desc: "Rinsing" },
    { name: "Dryer", desc: "Dryer" },
    { name: "Pickling Tank A", desc: "Pickling" },
    { name: "Trolley 2", desc: "Galva Loading" },
    { name: "Machine X", desc: "Testing Machine" },
    { name: "Machine Y", desc: "Experimental" },
    { name: "Machine Z", desc: "Assembly" },
    { name: "Machine W", desc: "Packaging" },
  ];

  const filteredMachines = machines.filter(
    (m) =>
      m.name.toLowerCase().includes(filter.toLowerCase()) ||
      m.desc.toLowerCase().includes(filter.toLowerCase())
  );

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Card sx={{ p: 2 }}>
      <CardContent>
        {/* Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6" fontWeight={600}>
            Machines
          </Typography>
          <Box display="flex" gap={2} alignItems="center">
            <TextField
              size="small"
              placeholder="Filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
            <Button variant="contained" color="primary">
              Add New Machine
            </Button>
          </Box>
        </Box>

        {/* Table */}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Machine</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredMachines
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((machine, index) => (
                <TableRow key={index}>
                  <TableCell>{machine.name}</TableCell>
                  <TableCell>{machine.desc}</TableCell>
                  <TableCell>
                    <IconButton color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <TablePagination
          component="div"
          count={filteredMachines.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardContent>
    </Card>
  );
};

export default MachinesTable;