import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Checkbox,
  Box,
} from "@mui/material";

const JobCardUI: React.FC = () => {
  return (
    <Card sx={{ p: 3, bgcolor: "#E7EBF0", borderRadius: 2, boxShadow: 2 }}>
      <CardContent>
        {/* Header */}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h6" fontWeight={600}>
              Era
            </Typography>
            <Typography variant="body2">Umred.</Typography>
            <Typography variant="body2">Job Order No: JC / 149 / 1354</Typography>
            <Typography variant="body2">Client: PHOENIX STRUCTURE AND ENGG. PVT LTD.</Typography>
            <Typography variant="body2">Project: PHOENIX STRUCTURE ENGINEERING PVT. LTD.</Typography>
            <Typography variant="body2">
              Tanks: Pickling -B Rinsing 1 Zinc Kettle Quenching Flux Dryer Passivation
            </Typography>
            <Typography variant="body2">Loading Stand: 1</Typography>
            <Typography variant="body2">Trolley: 1</Typography>
          </Grid>
          <Grid item xs={6} textAlign="right">
            <Typography variant="h6" fontWeight={600}>
              Galva Job Card
            </Typography>
            <Typography variant="body2">Cum STEEL REQUISITION SLIP</Typography>
            <Typography variant="body2">Format No: ERA/PPC/RD/003</Typography>
            <Typography variant="body2">Released Date: 16-Jul-2022</Typography>
            <Typography variant="body2">LOT: 55</Typography>
            <Typography variant="body2">Total Jig Weight: 6896</Typography>
          </Grid>
        </Grid>

        {/* First Table */}
        <Box mt={3}>
          <Table size="small" sx={{ border: "1px solid #ccc" }}>
            <TableHead>
              <TableRow>
                <TableCell>Section</TableCell>
                <TableCell>Material Type</TableCell>
                <TableCell>Length (mm)</TableCell>
                <TableCell>Width (mm)</TableCell>
                <TableCell>Thickness (mm)</TableCell>
                <TableCell>Weight</TableCell>
                <TableCell>Remark</TableCell>
                <TableCell>Jig</TableCell>
                <TableCell colSpan={2} align="center">Degreasing</TableCell>
                <TableCell colSpan={2} align="center">Pickling -B</TableCell>
                <TableCell colSpan={2} align="center">Rinsing 1</TableCell>
                <TableCell colSpan={2} align="center">Flux</TableCell>
                <TableCell colSpan={2} align="center">Dryer</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={8}></TableCell>
                <TableCell>in</TableCell>
                <TableCell>out</TableCell>
                <TableCell>in</TableCell>
                <TableCell>out</TableCell>
                <TableCell>in</TableCell>
                <TableCell>out</TableCell>
                <TableCell>in</TableCell>
                <TableCell>out</TableCell>
                <TableCell>in</TableCell>
                <TableCell>out</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Tower</TableCell>
                <TableCell>ANGLE AND PLATE</TableCell>
                <TableCell>1</TableCell>
                <TableCell>1</TableCell>
                <TableCell>1</TableCell>
                <TableCell>6896</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                {[...Array(10)].map((_, i) => (
                  <TableCell key={i}>
                    <Checkbox size="small" />
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </Box>

        {/* Zinc Table */}
        <Box mt={4}>
          <Typography variant="subtitle1" fontWeight={600}>
            Zinc:
          </Typography>
          <Table size="small" sx={{ border: "1px solid #ccc", mt: 1 }}>
            <TableHead>
              <TableRow>
                <TableCell>Section</TableCell>
                <TableCell>Material Type</TableCell>
                <TableCell>Length (mm)</TableCell>
                <TableCell>Width (mm)</TableCell>
                <TableCell>Thickness (mm)</TableCell>
                <TableCell>Weight</TableCell>
                <TableCell>Remark</TableCell>
                <TableCell>Min. Coating Required</TableCell>
                <TableCell>Min. Coating</TableCell>
                <TableCell>Max. Coating</TableCell>
                <TableCell>Avg. Coating</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Tower</TableCell>
                <TableCell>ANGLE AND PLATE</TableCell>
                <TableCell>1</TableCell>
                <TableCell>1</TableCell>
                <TableCell>1</TableCell>
                <TableCell>6896</TableCell>
                <TableCell>36</TableCell>
                <TableCell>80</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>

        {/* Footer */}
        <Box mt={4} display="flex" justifyContent="space-between">
          <Typography variant="body2">(Prepared By) Rajendra</Typography>
          <Typography variant="body2">(Authorized By) Nilesh</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default JobCardUI;





