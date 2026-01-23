// import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip,
} from 'recharts';
import { Card, CardContent, Typography, Box } from '@mui/material';

// Sample data for sections and their raw material quantities
const rawMaterialData = [
  { section: 'Section A', quantity: 120 },
  { section: 'Section B', quantity: 98 },
  { section: 'Section C', quantity: 130 },
  { section: 'Section D', quantity: 110 },
];

const RawMaterialChart = () => {
  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: `
          4px 4px 20px 0px #6F8CB069,
          -6px -6px 20px 0px #FFFFFF,
          2px 2px 4px 0px #728EAB1A
        `,
      backgroundColor: '#E7EBF0',
      }}
    >
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          RAW Material Supply Inventory
        </Typography>
        <Box sx={{ height: 410 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={rawMaterialData} margin={{ top: 20, right: 30, left: 0, bottom: 30 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="section"
                label={{ value: 'Sections →', position: 'insideBottom', offset: -10 }}
              />
              <YAxis
                label={{ value: 'Quantity ↑', angle: -90, position: 'insideLeft', offset: 10 }}
              />
              <Tooltip />
              <Bar dataKey="quantity" fill="#2C7BE5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RawMaterialChart;
