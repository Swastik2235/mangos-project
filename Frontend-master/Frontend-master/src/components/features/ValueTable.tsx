// import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Box,
} from "@mui/material";
// import { ArrowUpward, ArrowDownward } from "@mui/icons-material";
import ArrowUp from "../../assets/Arrow-Up_Square.png"
import ArrowDown from "../../assets/Arrow-down_Square.png";

interface TableData {
  particulars: string;
  date: string;
  changeInValue: number;
  netValue: number;
  percentage: number;
}

interface ValueTableProps {
  data: TableData[];
  title?: string;
}

export function ValueTable({ data }: ValueTableProps) {
  return (
    <Box sx={{ padding: 2, }} className="rounded-lg shadow-lg">
      {/* {title && (
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", marginBottom: 2 }}
          color="text.primary"
        >
          {title}
        </Typography>
      )} */}
      

        <TableContainer component={Paper} sx={{ bgcolor: '#E7EBF0' }}>
            <Table sx={{ border: "1px solid #ddd" }}>
                <TableHead>
                <TableRow>
                    <TableCell
                    sx={{ fontWeight: "bold", borderBottom: "1px solid #ddd", borderRight: "1px solid #ddd" }}
                    >
                    Particulars
                    </TableCell>
                    <TableCell
                    sx={{ fontWeight: "bold", borderBottom: "1px solid #ddd", borderRight: "1px solid #ddd" }}
                    >
                    Date
                    </TableCell>
                    <TableCell
                    align="right"
                    sx={{ fontWeight: "bold", borderBottom: "1px solid #ddd", borderRight: "1px solid #ddd" }}
                    >
                    Change in value
                    </TableCell>
                    <TableCell
                    align="right"
                    sx={{ fontWeight: "bold", borderBottom: "1px solid #ddd", borderRight: "1px solid #ddd" }}
                    >
                    Net Value
                    </TableCell>
                    <TableCell
                    align="right"
                    sx={{ fontWeight: "bold", borderBottom: "1px solid #ddd" }}
                    >
                    (%)
                    </TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {data.map((row, index) => (
                    <TableRow
                    key={index}
                    sx={{
                        "&:last-child td, &:last-child th": { borderBottom: 0 },
                        "&:hover": { backgroundColor: "#f9f9f9" },
                    }}
                    >
                    <TableCell sx={{ borderRight: "1px solid #ddd" }}>{row.particulars}</TableCell>
                    <TableCell sx={{ borderRight: "1px solid #ddd" }}>{row.date}</TableCell>
                    <TableCell
                        align="right"
                        sx={{ borderRight: "1px solid #ddd" }}
                    >
                        <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end",
                            color: row.changeInValue >= 0 ? "green" : "red",
                        }}
                        >
                        {row.changeInValue >= 0 ? (
                            "+"
                            // <ArrowUpward fontSize="small" /> +
                        ) : (
                            "-"
                            // <ArrowDownward fontSize="small" />
                        )}
                        <Typography sx={{ marginLeft: 0.5 }}>
                            {Math.abs(row.changeInValue)}
                        </Typography>
                        </Box>
                    </TableCell>
                    <TableCell align="right" sx={{ borderRight: "1px solid #ddd" }}>
                        {row.netValue.toLocaleString()}
                    </TableCell>
                        {/* <TableCell
                            align="right"
                            sx={{
                            color: row.percentage >= 0 ? "green" : "red",
                            }}
                        ><Box component="img" src={row.percentage >= 0 ? ArrowUp : ArrowDown} alt="Trend" sx={{ width: 16, height: 16 }} />
                            src={row.percentage >= 0 ? ArrowUp : ArrowDown}
                            {row.percentage >= 0 ? ArrowUp : ArrowDown}
                            {row.percentage}%
                        </TableCell> */}

                        <TableCell
                        align="right"
                        sx={{
                            color: row.percentage >= 0 ? "green" : "red",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "flex-end", // Aligns content to the right within the cell
                        }}
                        >
                        <Box
                            component="img"
                            src={row.percentage >= 0 ? ArrowUp : ArrowDown}
                            alt={row.percentage >= 0 ? "Upward Trend" : "Downward Trend"}
                            sx={{
                            width: 16,
                            height: 16,
                            marginRight: 0.5, // Adds spacing between the icon and the percentage text
                            }}
                        />
                        {row.percentage >= 0 ? "+" : ""}
                        {row.percentage}%
                        </TableCell>

                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>

        {/* <TableContainer component={Paper} sx={{ bgcolor: '#E7EBF0' ,width:'100%' }}>
        <Table sx={{ border: "1px solid #ddd" }}>
            <TableHead>
            <TableRow sx={{ border: "none" }}>
                <TableCell
                sx={{
                    fontWeight: "bold",
                    borderBottom: "1px solid #ddd",
                    borderRight: "1px solid #ddd",
                    padding: "6px",
                    // lineHeight: "1.2",
                }}
                >
                Particulars
                </TableCell>
                <TableCell
                sx={{
                    fontWeight: "bold",
                    borderBottom: "1px solid #ddd",
                    borderRight: "1px solid #ddd",
                    padding: "6px",
                    // lineHeight: "1.2",
                }}
                >
                Date
                </TableCell>
                <TableCell
                align="right"
                sx={{
                    fontWeight: "bold",
                    borderBottom: "1px solid #ddd",
                    borderRight: "1px solid #ddd",
                    padding: "6px",
                    // lineHeight: "1.2",
                }}
                >
                Change in value
                </TableCell>
                <TableCell
                align="right"
                sx={{
                    fontWeight: "bold",
                    borderBottom: "1px solid #ddd",
                    borderRight: "1px solid #ddd",
                    padding: "6px",
                    // lineHeight: "1.2",
                }}
                >
                Net Value
                </TableCell>
                <TableCell
                align="right"
                sx={{
                    fontWeight: "bold",
                    borderBottom: "1px solid #ddd",
                    padding: "6px",
                    // lineHeight: "1.2",
                }}
                >
                (%)
                </TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {data.map((row, index) => (
                <TableRow
                key={index}
                sx={{
                    "&:last-child td, &:last-child th": { borderBottom: 0 },
                    "&:hover": { backgroundColor: "#f9f9f9" },
                    border: "none",
                }}
                >
                <TableCell sx={{ borderRight: "1px solid #ddd", padding: "6px", lineHeight: "1.2" }}>
                    {row.particulars}
                </TableCell>
                <TableCell sx={{ borderRight: "1px solid #ddd", padding: "6px", lineHeight: "1.2" }}>
                    {row.date}
                </TableCell>
                <TableCell
                    align="right"
                    sx={{
                    borderRight: "1px solid #ddd",
                    padding: "6px",
                    lineHeight: "1.2",
                    }}
                >
                    <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        color: row.changeInValue >= 0 ? "green" : "red",
                    }}
                    >
                    {row.changeInValue >= 0 ? (
                        <ArrowUpward fontSize="small" />
                    ) : (
                        <ArrowDownward fontSize="small" />
                    )}
                    <Typography sx={{ marginLeft: 0.5 }}>
                        {Math.abs(row.changeInValue)}
                    </Typography>
                    </Box>
                </TableCell>
                <TableCell
                    align="right"
                    sx={{ borderRight: "1px solid #ddd", padding: "6px", lineHeight: "1.2" }}
                >
                    {row.netValue.toLocaleString()}
                </TableCell>
                <TableCell
                    align="right"
                    sx={{
                    padding: "6px",
                    lineHeight: "1.2",
                    color: row.percentage >= 0 ? "green" : "red",
                    }}
                >
                    {row.percentage >= 0 ? "+" : ""}
                    {row.percentage}%
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer> */}



    </Box>
  );
}
