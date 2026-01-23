import React, { useState } from "react";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Select,
  MenuItem,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const SalesDashboard: React.FC = () => {
  const [tab, setTab] = useState(1); // default to Sales
  const [selectedDate, setSelectedDate] = useState("Dec 2022");

  const rows = [
    { particulars: "Credit Note", change: 200, netValue: 2200, percentage: 10.74 },
    { particulars: "Damages Charges", change: 500, netValue: 10000, percentage: 10.74 },
    { particulars: "Job Work Charges", change: -600, netValue: 39500, percentage: -10.74 },
    { particulars: "Sales", change: 120, netValue: 1200, percentage: 10.74 },
    { particulars: "Sales Interstate", change: -600, netValue: 39500, percentage: -10.74 },
    { particulars: "Scrap Sales", change: 120, netValue: 1200, percentage: 10.74 },
  ];

  const totalValue = rows.reduce((sum, row) => sum + row.change, 0);

  const renderTable = () => (
    <TableContainer component={Paper} sx={{ boxShadow: "none", border: "1px solid #E7EBF0" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>PARTICULARS</TableCell>
            <TableCell>Date</TableCell>
            <TableCell align="center">Change in value</TableCell>
            <TableCell align="center">Net Value</TableCell>
            <TableCell align="center">(%)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow key={i}>
              <TableCell>{row.particulars}</TableCell>
              <TableCell>-</TableCell>
              <TableCell
                align="center"
                sx={{ color: row.change >= 0 ? "green" : "red", fontWeight: 600 }}
              >
                {row.change > 0 ? `+${row.change}` : row.change}
              </TableCell>
              <TableCell align="center">{row.netValue}</TableCell>
              <TableCell
                align="center"
                sx={{ color: row.percentage >= 0 ? "green" : "red", fontWeight: 600 }}
              >
                {row.percentage > 0 ? `+${row.percentage}%` : `${row.percentage}%`}
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell sx={{ fontWeight: "bold" }}>Sales Accounts</TableCell>
            <TableCell />
            <TableCell />
            <TableCell colSpan={2} align="right" sx={{ fontWeight: "bold" }}>
              {totalValue}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Paper
      sx={{
        p: 2,
        borderRadius: 3,
        bgcolor: "#E7EBF0",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
      }}
    >
      {/* Tabs */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Tabs value={tab} onChange={(_, v) => setTab(v)} textColor="inherit">
          <Tab label="Highlights" value={0} />
          <Tab label="Sales" value={1} />
          <Tab label="Expenses" value={2} />
          <Tab label="Stock" value={3} />
        </Tabs>

        <Box display="flex" alignItems="center" gap={2}>
          <Select
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            size="small"
            sx={{
              borderRadius: 2,
              bgcolor: "#E7EBF0",
              "& .MuiSelect-select": { display: "flex", alignItems: "center", gap: 1 },
            }}
            renderValue={(value) => (
              <Box display="flex" alignItems="center" gap={1}>
                <CalendarMonthIcon sx={{ fontSize: 18, color: "#374151" }} />
                <Typography>{value}</Typography>
              </Box>
            )}
          >
            <MenuItem value="Dec 2022">Dec 2022</MenuItem>
            <MenuItem value="Jan 2023">Jan 2023</MenuItem>
            <MenuItem value="Feb 2023">Feb 2023</MenuItem>
          </Select>

          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Double Tables */}
      {tab === 1 && (
        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2} mt={2}>
          {renderTable()}
          {renderTable()}
        </Box>
      )}
    </Paper>
  );
};

export default SalesDashboard;
