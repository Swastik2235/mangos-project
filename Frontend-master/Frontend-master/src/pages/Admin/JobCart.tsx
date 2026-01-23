import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,

  Paper,
  Dialog,
  DialogContent,
  DialogTitle,
  Button,
  Checkbox,
  List,
  ListItem,
  Stack,
  FormControlLabel,
} from '@mui/material';
// import FullscreenIcon from '@mui/icons-material/Fullscreen';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import FileDownloadIcon from '@mui/icons-material/FileDownload';
import CloseIcon from '@mui/icons-material/Close';

import EditIcon from '@mui/icons-material/Edit';

interface DailyValue {
  amount: string;
  quantity: string;
}
interface ProductionTableRow {
  id: number;
  type: 'header' | 'subitem';
  activity: string;
  qty: number;
  rate: number;
  cumulativeValues: number;
  color?: 'blue' | 'orange' | 'green';
  dailyValues: {
    [key: string]: DailyValue;
  };
}

const productionTableData: ProductionTableRow[] = [
    {
      id: 1,
      type: 'header',
      activity: 'Sales',
      qty: 30,
      rate: 191,
      cumulativeValues: 191551,
      dailyValues: {
        '01': { quantity: '10.5 MT' ,amount: '₹10.5 L',},
        '02': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
        '03': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
        '04': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
        '05': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
        '06': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
        '07': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
      }
    },
  {
    id: 11,
    type: 'subitem',
    activity: 'Fabrication Total',
    qty: 30,
    rate: 191,
    cumulativeValues: 191551,
    color: 'blue',
    dailyValues: {
      '01': { quantity: '10.5 MT' ,amount: '₹10.5 L',},
        '02': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
        '03': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
        '04': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
        '05': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
        '06': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
        '07': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
    }
  },
  {
    id: 12,
    type: 'subitem',
    activity: 'Galva Total',
    qty: 30,
    rate: 191,
    cumulativeValues: 191551,
    color: 'blue',
    dailyValues: {
        '01': { quantity: '10.5 MT' ,amount: '₹10.5 L',},
        '02': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
        '03': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
        '04': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
        '05': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
        '06': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
        '07': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
    }
  },
  {
    id: 13,
    type: 'subitem',
    activity: 'Scrap',
    qty: 30,
    rate: 191,
    cumulativeValues: 191551,
    color: 'blue',
    dailyValues: {
      '01': { quantity: '10.5 MT' ,amount: '₹10.5 L',},
        '02': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
        '03': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
        '04': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
        '05': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
        '06': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
        '07': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
    }
  },
  {
    id: 10,
    type: 'subitem',
    activity: 'Solar',
    qty: 30,
    rate: 191,
    cumulativeValues: 191551,
    color: 'blue',
    dailyValues: {
      '01': { quantity: '10.5 MT' ,amount: '₹10.5 L',},
      '02': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
      '03': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
      '04': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
      '05': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
      '06': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
      '07': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
    }
  },
  {
    id: 2,
    type: 'header',
    activity: 'Cost',
    qty: 30,
    rate: 191,
    cumulativeValues: 191551,
    dailyValues: {
      '01': { quantity: '10.5 MT' ,amount: '₹10.5 L',},
        '02': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
        '03': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
        '04': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
        '05': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
        '06': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
        '07': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
    }
  },
  {
    id: 21,
    type: 'subitem',
    activity: 'Critical cost parameter',
    qty: 30,
    rate: 191,
    cumulativeValues: 191551,
    color: 'orange',
    dailyValues: {
      '01': { quantity: '10.5 MT' ,amount: '₹10.5 L',},
      '02': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
      '03': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
      '04': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
      '05': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
      '06': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
      '07': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
    }
  },
  {
    id: 22,
    type: 'subitem',
    activity: 'Manpower cost',
    qty: 30,
    rate: 191,
    cumulativeValues: 191551,
    color: 'orange',
    dailyValues: {
      '01': { quantity: '10.5 MT' ,amount: '₹10.5 L',},
      '02': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
      '03': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
      '04': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
      '05': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
      '06': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
      '07': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
    }
  },
  {
    id: 23,
    type: 'subitem',
    activity: 'Spare consumable and waste disposal',
    qty: 30,
    rate: 191,
    cumulativeValues: 191551,
    color: 'orange',
    dailyValues: {
      '01': { quantity: '10.5 MT' ,amount: '₹10.5 L',},
      '02': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
      '03': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
      '04': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
      '05': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
      '06': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
      '07': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
    }
  },
  {
    id: 3,
    type: 'header',
    activity: 'Earnings',
    qty: 30,
    rate: 191,
    cumulativeValues: 191551,
    dailyValues: {
      '01': { quantity: '10.5 MT' ,amount: '₹10.5 L',},
      '02': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
      '03': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
      '04': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
      '05': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
      '06': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
      '07': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
    }
  },
  {
    id: 31,
    type: 'subitem',
    activity: 'Total sales',
    qty: 30,
    rate: 191,
    cumulativeValues: 191551,
    color: 'blue',
    dailyValues: {
      '01': { quantity: '10.5 MT' ,amount: '₹10.5 L',},
      '02': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
      '03': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
      '04': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
      '05': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
      '06': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
      '07': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
    }
  },
  {
    id: 32,
    type: 'subitem',
    activity: 'Total cost',
    qty: 30,
    rate: 191,
    cumulativeValues: 191551,
    color: 'orange',
    dailyValues: {
      '01': { quantity: '10.5 MT' ,amount: '₹10.5 L',},
      '02': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
      '03': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
      '04': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
      '05': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
      '06': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
      '07': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
    }
  },
  {
    id: 33,
    type: 'subitem',
    activity: 'Profitability',
    qty: 30,
    rate: 191,
    cumulativeValues: 191551,
    color: 'green',
    dailyValues: {
      '01': { quantity: '10.5 MT' ,amount: '₹10.5 L',},
      '02': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
      '03': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
      '04': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
      '05': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
      '06': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
      '07': {quantity: '10.5 MT' ,amount: '₹10.5 L'},
    }
  }
];


// Define all operation keys
type OperationKeys = 'N' | 'M' | 'O' | 'A' | 'B' | 'CPS' | 'HAB' | 'HC';

// Define the shape of each row
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

// Define your static table data
const staticTableData: RowData[] = [
  {
    id: 1,
    mark: 'EJSD',
    sections: 'Done',
    section: 'JNSJD2',
    material: 'HT 10mm PLATE',
    length: 600,
    width: 170,
    wt: 78.5,
    wtPerPc: 8.01,
    qty: 16,
    totalWeight: 0,
    operations: {
      N: true,
      M: false,
      O: false,
      A: false,
      B: true,
      CPS: true,
      HAB: true,
      HC: true,
    },
  },
  {
    id: 2,
    mark: 'EJSD',
    sections: 'Done',
    section: 'CDDI3',
    material: 'HT 10mm PLATE',
    length: 600,
    width: 170,
    wt: 78.5,
    wtPerPc: 8.01,
    qty: 16,
    totalWeight: 0,
    operations: {
      N: true,
      M: true,
      O: true,
      A: false,
      B: false,
      CPS: true,
      HAB: false,
      HC: true,
    },
  },
];



const JobCard: React.FC = () => {
    const [tableData, setTableData] = useState<RowData[]>(staticTableData);
//   const [selectedDate, setSelectedDate] = useState('Dec 2022');
//   const [selectedTab, setSelectedTab] = useState('Sales');
  const [openPopup, setOpenPopup] = useState(false);

//   const handleOpenPopup = () => {
//     setOpenPopup(true);
//   };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const getDotColor = (color?: string) => {
    switch (color) {
      case 'blue':
        return '#2563eb';
      case 'orange':
        return '#f97316';
      case 'green':
        return '#22c55e';
      default:
        return 'transparent';
    }
  };

  const getBorderColor = (type: string) => {
    switch (type) {
      case 'Sales':
        return '#2563eb';
      case 'Cost':
        return '#f97316';
      case 'Earnings':
        return '#22c55e';
      default:
        return 'transparent';
    }
  };


const handleSectionToggle = (rowId: number) => {
  setTableData((prevData) =>
    prevData.map((row) =>
      row.id === rowId
        ? {
            ...row,
            section: row.section === 'Done' ? 'Pending' : 'Done',
          }
        : row
    )
  );
};





const handleCheckboxChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  rowId: number,
  key: OperationKeys
) => {
  setTableData((prevData) =>
    prevData.map((row) =>
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
};








  return (
    <Box>
    <Card sx={{ bgcolor: '#E7EBF0', borderRadius: 2, boxShadow: `
      4px 4px 20px 0px #6F8CB069,
      -6px -6px 20px 0px #FFFFFF,
      2px 2px 4px 0px #728EAB1A
      `, p: 2 }}>
      <CardContent>
   
      <Box
        sx={{
        //   backgroundColor: '#e8edf5',
        //   padding: '20px',
          borderRadius: '8px',
          maxWidth: '1000px',
          position: 'relative',
        }}
      >
        <Box sx={{display:"flex",justifyContent:"space-between"}}>
            <Box>
        <Typography variant="h6" sx={{ mb: 3, color: '#1e1e1e' ,fontWeight:"400"}}>
          Job card cum steel requisition slip
        </Typography>
        </Box>

            {/* Action Buttons */}
            <Box >
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#f0f4ff',
              color: '#1e293b',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              mr: 1,
              textTransform: 'none',
              '&:hover': { backgroundColor: '#e0eaff' },
            }}
          >
            View Table ⏷
          </Button>
          <Button
            variant="contained"
            startIcon={<EditIcon />} 
            sx={{
              backgroundColor: '#f0f4ff',
              color: '#1e293b',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
              textTransform: 'none',
              '&:hover': { backgroundColor: '#e0eaff' },
            }}
          >
           Edit
          </Button>
        </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            padding:"10px 30px"
          }}
        >
          {/* Left Column */}
          <Box>
            <Typography sx={{ mb: 3, color: 'black' }}>
            •<strong style={{color:"grey"}}> Job Order No</strong> : JO-140-04
            </Typography>
            <Typography sx={{ mb: 3, color: 'black' }}>
            •<strong style={{color:"grey"}}> Client</strong> : TATA Projects Ltd
            </Typography>
            <Typography sx={{ mb: 3, color: 'black' }}>
            • <strong style={{color:"grey"}}> Project</strong> : Fabrication & Galvanization of Tower Material
            </Typography>
          </Box>

          {/* Right Column */}
          <Box>
            <Typography sx={{ mb: 3, color: 'black' }}>
            • <strong style={{color:"grey"}}> Type of Tower</strong> : DDQ_BB+Extn
            </Typography>
            <Typography sx={{ mb: 3, color: 'black' }}>
            • <strong style={{color:"grey"}}> Released Date</strong> : 20-Feb-21
            </Typography>
            <Typography sx={{ mb: 3, color: 'black' }}>
            • <strong style={{color:"grey"}}> JC NO</strong> : JC/140/1399
            </Typography>
          </Box>
        </Box>

     
      </Box>
    
        {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      
            <Typography variant="h3" component="h2" sx={{ color: '#1e293b', fontWeight: 600 }}>
              Highlights
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              {['Sales', 'Cost', 'Earnings'].map((tab) => (
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
            <IconButton size="small">
              <FileDownloadIcon />
            </IconButton>
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
            <IconButton size="small" onClick={handleOpenPopup}>
              <FullscreenIcon />
            </IconButton>
          </Box>
        </Box> */}
<TableContainer component={Paper} sx={{ boxShadow: 'none', bgcolor: '#e7ebf0', mt: '20px' , border: '1px solid #d3d4d9'}}>
  <Table size="small">
    <TableHead>
      <TableRow style={{ background: '#e1e8f3',padding:"10px" }}>
        <TableCell sx={{ fontWeight: 600, color: '#7c84a2', borderRight: '1px solid #d3d4d9' }}>Mark</TableCell>
        <TableCell sx={{ fontWeight: 600, borderRight: '1px solid #d3d4d9' }}></TableCell>
        <TableCell sx={{ fontWeight: 600, color: '#7c84a2', borderRight: '1px solid #d3d4d9' }}>Section</TableCell>
        <TableCell sx={{ fontWeight: 600, color: '#7c84a2', borderRight: '1px solid #d3d4d9' }}>Length</TableCell>
        <TableCell sx={{ fontWeight: 600, color: '#7c84a2', borderRight: '1px solid #d3d4d9' }}>Width</TableCell>
        <TableCell sx={{ fontWeight: 600, color: '#7c84a2', borderRight: '1px solid #d3d4d9' }}>Unit</TableCell>
        <TableCell sx={{ fontWeight: 600, color: '#7c84a2', borderRight: '1px solid #d3d4d9' }}>WT/PCS</TableCell>
        <TableCell sx={{ fontWeight: 600, color: '#7c84a2', borderRight: '1px solid #d3d4d9' }}>QTY</TableCell>
        <TableCell sx={{ fontWeight: 600, color: '#7c84a2', borderRight: '1px solid #d3d4d9' }}>Total</TableCell>
        <TableCell sx={{ fontWeight: 600,  color: '#7c84a2',borderRight: '1px solid #d3d4d9' }}>Operations</TableCell>
        <TableCell sx={{ fontWeight: 600, borderRight: '1px solid #d3d4d9' }}></TableCell>
        <TableCell sx={{ fontWeight: 600, borderRight: '1px solid #d3d4d9' }}></TableCell>
        <TableCell sx={{ fontWeight: 600, borderRight: '1px solid #d3d4d9' }}></TableCell>
        <TableCell sx={{ fontWeight: 600, borderRight: '1px solid #d3d4d9' }}></TableCell>
        <TableCell sx={{ fontWeight: 600, borderRight: '1px solid #d3d4d9' }}></TableCell>
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
              <Checkbox checked={row.section === 'Done'} onChange={() => handleSectionToggle(row.id)} size="small" />
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

          {/* Operations columns */}
         {[
  ['N', 'M', 'O', 'A'],
  ['B', 'M', 'O', 'A'],
  ['CPS', 'M', 'O', 'A'],
  ['HAB', 'M', 'O', 'A'],
  ['HC', 'M', 'O', 'A'],
].map((ops, idx) => (
  <TableCell sx={{ borderRight: '1px solid #d3d4d9' }} align="center" key={idx}>
    <Stack direction="column" spacing={1}>
      {ops.map((op) => (
        <FormControlLabel
          key={op}
          label={`${op}:`}
          labelPlacement="start"
          control={
            <Checkbox
              checked={row.operations[op as OperationKeys]}  // Cast here
              onChange={(e) => handleCheckboxChange(e, row.id, op as OperationKeys)}  // And here
              size="small"
            />
          }
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


        <Dialog
        open={openPopup}
        onClose={handleClosePopup}
        maxWidth="xl" // or "lg", "md", etc
        fullWidth
      >
        <DialogTitle>
         
          <IconButton
            aria-label="close"
            onClick={handleClosePopup}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8, 
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ bgcolor: '#E7EBF0' }}>
  {/* Expanded Table inside Popup */}
  <TableContainer component={Paper} sx={{ boxShadow: 'none', bgcolor: '#E7EBF0' }}>
    <Box sx={{ overflowX: 'auto' }}> {/* Enable horizontal scrolling */}
      <Table size="small" sx={{ minWidth: 900 }}>  {/* Adjust minWidth to fit 14 days */}
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Sr. no.</TableCell>
            <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Activity</TableCell>
            <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Qty.</TableCell>
            <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Rate</TableCell>
            <TableCell sx={{ fontWeight: 600, color: '#1e293b' }}>Cumulative Values</TableCell>

            {/* Repeat 7 days twice to make 14 days */}
            {Array.from({ length: 2 }).flatMap((_, repeatIndex) =>
              ['01', '02', '03', '04', '05', '06', '07'].map((day) => (
                <TableCell key={`${day}-${repeatIndex}`} align="center" sx={{ fontWeight: 600, color: '#1e293b' }}>
                  Day {Number(day) + repeatIndex * 7} {/* Adjusting Day number */}
                </TableCell>
              ))
            )}
          </TableRow>
        </TableHead>

        <TableBody>
          {productionTableData.map((row) => {
            const isHeader = row.type === 'header';
            const borderColor = getBorderColor(row.activity);

            return (
              <TableRow
                key={row.id}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  borderBottom: isHeader ? `2px solid ${borderColor}` : 'none',
                  bgcolor: 'transparent',
                }}
              >
                <TableCell>
                  {isHeader ? (
                    <Typography sx={{ color: '#1e293b', fontWeight: 600 }}>{row.id}</Typography>
                  ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center', pl: 0 }}>
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          borderRadius: '50%',
                          bgcolor: getDotColor(row.color),
                          mr: 1,
                        }}
                      />
                    </Box>
                  )}
                </TableCell>

                <TableCell>
                  <Typography
                    sx={{
                      color: isHeader ? '#1e293b' : '#64748b',
                      fontWeight: isHeader ? 600 : 400,
                      fontSize: 13,
                    }}
                  >
                    {row.activity}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography sx={{ color: '#1e293b', fontWeight: 500, fontSize: 11 }}>
                    {row.qty}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography sx={{ color: '#1e293b', fontWeight: 500, fontSize: 11 }}>
                    {row.rate}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Typography sx={{ color: '#1e293b', fontWeight: 500, fontSize: 11 }}>
                    {row.cumulativeValues}
                  </Typography>
                </TableCell>

                {/* Repeat 7 days twice to make 14 days */}
                {Array.from({ length: 2 }).flatMap((_, repeatIndex) =>
                  ['01', '02', '03', '04', '05', '06', '07'].map((day) => (
                    <TableCell key={`${day}-${repeatIndex}-${row.id}`} align="center" sx={{ color: '#64748b', fontSize: 11, padding: '0px' }}>
                      <Typography sx={{ fontSize: 13, color: '#64748b'}}>
                        {row.dailyValues[day]?.quantity || '-'}
                      </Typography>
                      <Typography sx={{ fontSize: 13 }}>
                        {row.dailyValues[day]?.amount || '-'}
                      </Typography>
                    </TableCell>
                  ))
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Box>
  </TableContainer>
</DialogContent>

      </Dialog>
      </CardContent>
   
    </Card>

    <Card sx={{ bgcolor: '#E7EBF0', borderRadius: 2, boxShadow: `
        4px 4px 20px 0px #6F8CB069,
        -6px -6px 20px 0px #FFFFFF,
        2px 2px 4px 0px #728EAB1A
        `, p: 2 ,mt:"60px"}}>
           <CardContent>
      <Box
      sx={{   
        borderRadius: '10px',
        fontFamily: 'sans-serif',
    padding:"10px 20px"
      }}
    >
        <Box sx={{display:"flex",justifyContent:"space-between"}}>
      <Typography sx={{ fontWeight: 600, color: '#1e293b', mb: 1 }}>
        Signatures
      </Typography>
      <Box>
      <Button
        variant="outlined"
        startIcon={<EditIcon />}
        sx={{

          textTransform: 'none',
          borderColor: '#cbd5e1',
          backgroundColor: 'white',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}
      >
        Edit
      </Button>
      </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          color: '#334155',
          fontSize: '14px',
          padding:"0px 10px"
        }}
      >
        <List sx={{ listStyleType: 'disc', pl: 3 }}>
          <ListItem sx={{ display: 'list-item', py: 1 }}>Fabrication</ListItem>
          <ListItem sx={{ display: 'list-item', py: 1 }}>Raw Yard</ListItem>
        </List>

        <List sx={{ listStyleType: 'disc', pl: 3 }}>
          <ListItem sx={{ display: 'list-item', py: 1 }}>Planning</ListItem>
          <ListItem sx={{ display: 'list-item', py: 1 }}>Plant head</ListItem>
        </List>

        <List sx={{ listStyleType: 'disc', pl: 3 }}>
          <ListItem sx={{ display: 'list-item', py: 1 }}>Received By</ListItem>
        </List>
      </Box>
      </Box>
    
   

      </CardContent>
    </Card>
    </Box>
  );
};

export default JobCard;