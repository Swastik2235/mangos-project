import React, { useState } from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  IconButton,
  Select,
  MenuItem,
} from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import MoreVertIcon from '@mui/icons-material/MoreVert';
// import DocumentList from './DocumentList/DocumentList';

import { ValueTable } from './ValueTable';


const tableData1 = [
  {
    particulars: "Item 1",
    date: "2024-03-01",
    changeInValue: 200,
    netValue: 2200,
    percentage: 10.74
  },
  {
    particulars: "Item 2",
    date: "2024-03-01",
    changeInValue: 500,
    netValue: 10000,
    percentage: 10.74
  },
  {
    particulars: "Item 3",
    date: "2024-03-01",
    changeInValue: -600,
    netValue: 39500,
    percentage: -10.74
  },
  {
    particulars: "Item 4",
    date: "2024-03-01",
    changeInValue: 120,
    netValue: 1200,
    percentage: 10.74
  }
];

const tableData2 = [
  {
    particulars: "Item A",
    date: "2024-03-01",
    changeInValue: -600,
    netValue: 39500,
    percentage: -10.74
  },
  {
    particulars: "Item B",
    date: "2024-03-01",
    changeInValue: 120,
    netValue: 1200,
    percentage: 10.74
  },
  {
    particulars: "Item C",
    date: "2024-03-01",
    changeInValue: 120,
    netValue: 1200,
    percentage: 10.74
  }
];


const ProductionTableAisIncome: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('Dec 2022');
  const [selectedTab, setSelectedTab] = useState('Sales');

  return (
    <Card sx={{ bgcolor: '#E7EBF0', borderRadius: 2, boxShadow: `
      4px 4px 20px 0px #6F8CB069,
      -6px -6px 20px 0px #FFFFFF,
      2px 2px 4px 0px #728EAB1A
      `, p: 2 }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="h3" component="h2" sx={{ color: '#1e293b', fontWeight: 600 }}>
              Highlights
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              {['Critial Cost', 'Manpower', 'Spare Consumable'].map((tab) => (
                <Typography
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  sx={{
                    color: selectedTab === tab ? '#1e293b' : '#64748b',
                    cursor: 'pointer',
                    fontWeight: selectedTab === tab ? 600 : 400,
                  }}
                >
                  {tab}
                </Typography>
              ))}
            </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
           
            <Select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              size="small"
              sx={{ minWidth: 120, bgcolor: '#E7EBF0' ,boxShadow: '4px 4px 20px 0px #6F8CB069, -6px -6px 20px 0px #FFFFFF, 2px 2px 4px 0px #728EAB1A'}}
            >
              <MenuItem value="Dec 2022">Dec 2022</MenuItem>
            </Select>
            <IconButton size="small">
              <MoreVertIcon />
            </IconButton>
            <IconButton size="small">
              <FullscreenIcon />
            </IconButton>
          </Box>
        </Box>

        {/* <div className="col-md-12" style={{display:'flex'}}>
          <div className="col-md-6">
            <ValueTable data={tableData1} />
          </div>
          <div className="col-md-6">
            <ValueTable data={tableData2} />
          </div>
        </div> */}
         <Grid container spacing={2}>
      {/* First Table */}
      <Grid item xs={12} sm={6}>
        <ValueTable data={tableData1} />
      </Grid>
      {/* Second Table */}
      <Grid item xs={12} sm={6}>
        <ValueTable data={tableData2} />
      </Grid>
    </Grid>

      </CardContent>
    </Card>
  );
};

export default ProductionTableAisIncome;