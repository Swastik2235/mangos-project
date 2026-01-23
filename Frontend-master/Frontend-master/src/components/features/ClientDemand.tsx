// import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LabelList
} from 'recharts';
import { Card, CardContent, Typography, Box } from '@mui/material';

const clientDemandData = [
  { section: 'MSX70X8', quantity: 10 },
  { section: 'MSX80X8', quantity: 12 },
  { section: 'MSX90X8', quantity: 8 },
  { section: 'MSX100X8', quantity: 6 },
  { section: 'MSX110X8', quantity: 4 },
];

const ClientDemandChart = () => {
  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: '4px 4px 12px rgba(0,0,0,0.1)',
      backgroundColor: '#E7EBF0',
      }}
    >
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
          Client Demand
        </Typography>

        <Box sx={{ height: 420 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={clientDemandData}
              margin={{ top: 20, right: 30, left: 10, bottom: 40 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="section"
                label={{ value: 'Sections', position: 'bottom', offset: 20 }}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                label={{ value: 'Quantity', angle: -90, position: 'insideLeft', offset: 10 }}
              />
              <Bar dataKey="quantity" fill="#1976d2">
                <LabelList dataKey="quantity" position="top" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Box>

        {/* Optional BOM Box */}
        <Box
          sx={{
            position: 'absolute',
            top: 20,
            right: 30,
            background: '#fff',
            border: '2px solid #1976d2',
            px: 2,
            py: 0.5,
            fontWeight: 'bold',
            borderRadius: 1,
          }}
        >
          BOM
        </Box>
      </CardContent>
    </Card>
  );
};

export default ClientDemandChart;
