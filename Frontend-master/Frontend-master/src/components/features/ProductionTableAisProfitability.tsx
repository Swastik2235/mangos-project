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
  Select,
  MenuItem,
  Paper,
  Stack,
  Tabs,
  Tab,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import { color } from 'd3';

const fabricationData = [
  {
    client: 'Utkarsh',
    product: '3/4 & 5/6mm Frending',
    totalCost: 4344,
    invoiceRate: 2500,
    earning: 3291,
    percent: 132,
    production: 193,
    totalAmount: 2200
  },
  {
    client: 'AnshikaClamp',
    product: 'Anshika Cleat + Clamp',
    totalCost: 18046,
    invoiceRate: 16500,
    earning: -1525,
    percent: -9,
    production: 65524,
    totalAmount: 10000
  },
  {
    client: 'Trafe',
    product: 'Radiators',
    totalCost: 28128,
    invoiceRate: 33500,
    earning: 5372,
    percent: 16,
    production: 415,
    totalAmount: 39500
  },
  {
    client: 'Sanvijay',
    product: 'Drilling angle',
    totalCost: 4017,
    invoiceRate: 2750,
    earning: -1148,
    percent: 10.74,
    production: 38,
    totalAmount: 1200
  }
];

const galvanizationFullData = [
  {
    client: 'Utkarsh',
    product: '3/4 & 5/6mm Frending',
    thick: 44,
    extZinc: 132,
    actualCost: 132,
    zincCost: 90123,
    actualZincCost: 4344,
    galvaLabourCost: 90123,
    ldoLt: 90123,
    ldoRa: 4344,
    electricUnit: 90123,
    electricEnergy: 90123,
    chemEtpCost: 4344,
    overheads: 90123,
    galvaConvCost: 4344,
    totalCost: 4344,
    invoiceRate: 2500,
    earning: 3291,
    percent: 132,
    production: 193,
    totalAmount: 2200,
    remark: 'Remark will be written here.',
    resolved: true
  },
  {
    client: 'AnshikaClamp',
    product: 'Anshika Cleat + Clamp',
    thick: 18,
    extZinc: -9,
    actualCost: -9,
    zincCost: 12145,
    actualZincCost: 18046,
    galvaLabourCost: 12145,
    ldoLt: 12145,
    ldoRa: 18046,
    electricUnit: 12145,
    electricEnergy: 12145,
    chemEtpCost: 18046,
    overheads: 12145,
    galvaConvCost: 18046,
    totalCost: 18046,
    invoiceRate: 16500,
    earning: -1525,
    percent: -9,
    production: 65524,
    totalAmount: 10000,
    remark: 'Remark will be written here.',
    resolved: false
  },
  {
    client: 'Trafe',
    product: 'Radiators',
    thick: 28,
    extZinc: -16,
    actualCost: -16,
    zincCost: 4198,
    actualZincCost: 28128,
    galvaLabourCost: 4198,
    ldoLt: 4198,
    ldoRa: 28128,
    electricUnit: 4198,
    electricEnergy: 4198,
    chemEtpCost: 28128,
    overheads: 4198,
    galvaConvCost: 28128,
    totalCost: 28128,
    invoiceRate: 33500,
    earning: 5372,
    percent: 16,
    production: 415,
    totalAmount: 39500,
    remark: 'Remark will be written here.',
    resolved: true
  },
  {
    client: 'Sanvijay',
    product: 'Drilling angle',
    thick: 40,
    extZinc: 10.74,
    actualCost: 10.74,
    zincCost: 4221,
    actualZincCost: 4017,
    galvaLabourCost: 4221,
    ldoLt: 4221,
    ldoRa: 4017,
    electricUnit: 4221,
    electricEnergy: 4221,
    chemEtpCost: 4017,
    overheads: 4221,
    galvaConvCost: 4017,
    totalCost: 4017,
    invoiceRate: 2750,
    earning: -1148,
    percent: 10.74,
    production: 38,
    totalAmount: 1200,
    remark: 'Remark will be written here.',
    resolved: false
  }
];

const solarData = [
  {
    client: 'Solar Client A',
    product: 'Solar Panels',
    totalCost: 20000,
    invoiceRate: 25000,
    earning: 5000,
    percent: 25,
    production: 100,
    totalAmount: 25000
  },
  {
    client: 'Solar Client B',
    product: 'Solar Panels',
    totalCost: 30000,
    invoiceRate: 25000,
    earning: 5000,
    percent: 25,
    production: 100,
    totalAmount: 25000
  },
  {
    client: 'Solar Client C',
    product: 'Solar Panels',
    totalCost: 40000,
    invoiceRate: 25000,
    earning: 5000,
    percent: 25,
    production: 100,
    totalAmount: 25000
  }
];

const scrapData = [
  {
    client: 'Scrap Buyer X',
    product: 'Metal Scrap',
    totalCost: 8000,
    invoiceRate: 10000,
    earning: 2000,
    percent: 25,
    production: 50,
    totalAmount: 10000
  },
  {
    client: 'Scrap Buyer Y',
    product: 'Plastic Scrap',
    totalCost: 5000,
    invoiceRate: 7000,
    earning: 2000,
    percent: 40,
    production: 30,
    totalAmount: 7000
  },
  {
    client: 'Scrap Buyer Z',
    product: 'Plastic Scrap',
    totalCost: 5000,
    invoiceRate: 7000,
    earning: 2000,
    percent: 40,
    production: 30,
    totalAmount: 7000
  }
];

const tabs = ['Highlights', 'Fabrication', 'Galvanization', 'Solar', 'Scrap'];

const ProductionHighlightsCard: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('Dec 2022');
  const [activeTab, setActiveTab] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const getTableData = () => {
    switch (activeTab) {
      case 1: return fabricationData;
      case 2: return galvanizationFullData;
      case 3: return solarData;
      case 4: return scrapData;
      default: return fabricationData;
    }
  };

  return (
    <Card sx={{ 
      bgcolor: '#E7EBF0', 
      borderRadius: 2, 
      boxShadow: `
        4px 4px 20px 0px #6F8CB069,
        -6px -6px 20px 0px #FFFFFF,
        2px 2px 4px 0px #728EAB1A`, 
      p: 2 
    }}>
      <CardContent>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: isMobile ? 'flex-start' : 'center',
          mb: 3,
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? 2 : 0
        }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 2,
            width: isMobile ? '100%' : 'auto',
            overflowX: isMobile ? 'auto' : 'visible',
            pb: isMobile ? 1 : 0,
          }}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ flexShrink: 0 }}>
              <FiberManualRecordIcon sx={{ fontSize: 10 }} />
              <Typography fontWeight={600}>{tabs[activeTab]}</Typography>
            </Stack>
            <Tabs 
              value={activeTab} 
              onChange={(_, val) => setActiveTab(val)} 
              textColor="primary" 
              indicatorColor="primary" 
              variant={isMobile ? 'scrollable' : 'standard'}
              scrollButtons="auto"
              allowScrollButtonsMobile
              sx={{
                minHeight: 'unset', 
                height: 32,
                '& .MuiTab-root': {
                  textTransform: 'none', 
                  fontSize: 14, 
                  padding: '6px 12px', 
                  minHeight: 'unset',
                  minWidth: 'unset'
                }
              }}
            >
              {tabs.map((tab, i) => (
                <Tab key={i} label={isMobile ? tab.substring(0, 3) : tab} />
              ))}
            </Tabs>
          </Box>
          <Box sx={{ 
            display: 'flex', 
            gap: 2, 
            alignItems: 'center',
            width: isMobile ? '100%' : 'auto',
            justifyContent: isMobile ? 'space-between' : 'flex-end'
          }}>
            <IconButton size="small"><FileDownloadIcon /></IconButton>
            <Select 
              value={selectedDate} 
              onChange={(e) => setSelectedDate(e.target.value)} 
              size="small" 
              startAdornment={<CalendarMonthIcon fontSize="small" sx={{ mr: 1 }} />} 
              sx={{
                minWidth: 120, 
                bgcolor: '#E7EBF0', 
                boxShadow: '4px 4px 20px 0px #6F8CB069, -6px -6px 20px 0px #FFFFFF, 2px 2px 4px 0px #728EAB1A'
              }}
            >
              <MenuItem value="Dec 2022">Dec 2022</MenuItem>
              <MenuItem value="Nov 2022">Nov 2022</MenuItem>
            </Select>
            <IconButton size="small"><MoreVertIcon /></IconButton>
            <IconButton size="small" sx={{ color: '#08070f' }}><FullscreenIcon /></IconButton>
          </Box>
        </Box>

        <Box sx={{ overflowX: 'auto' }}>
          <TableContainer component={Paper} sx={{ 
            boxShadow: 'none', 
            bgcolor: '#E7EBF0',
            minWidth: isMobile ? '800px' : '100%'
          }}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  {activeTab === 2 ? (
                    [
                      'Clients', 'Items', 'Thick', 'Ext Zinc', 'Actual Cost', 'Zinc Cost',
                      'Act Zinc Cost', 'Galva Labour', 'LDO Ltr', 'LDO Ra', 'Electric Unit',
                      'Electric Energy', 'Chemical', 'Overheads', 'Galva Conv', 'Total Cost',
                      'Invoice Rate', 'Earning', '%', 'Production', 'Amount', 'Remark', 'Status'
                    ].map((col, i) => (
                      <TableCell key={i} sx={{ fontWeight: 600, color: '#1e293b' }}>{isMobile ? col.split(' ')[0] : col}</TableCell>
                    ))
                  ) : (
                    ['Clients', 'Items', 'Cost', 'Invoice', 'Earning', '%', 'Production', 'Amount']
                      .map((col, i) => <TableCell key={i} sx={{ fontWeight: 600, color: '#1e293b' }}>{col}</TableCell>)
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {getTableData().map((row: any, index: number) => (
                  <TableRow key={index}>
                    {activeTab === 2 ? (
                      <>
                        <TableCell>{row.client}</TableCell>
                        <TableCell>{row.product}</TableCell>
                        <TableCell>{row.thick}</TableCell>
                        <TableCell>{`${row.extZinc}%`}</TableCell>
                        <TableCell>{`${row.actualCost}%`}</TableCell>
                        <TableCell>{row.zincCost}</TableCell>
                        <TableCell>{row.actualZincCost}</TableCell>
                        <TableCell>{row.galvaLabourCost}</TableCell>
                        <TableCell>{row.ldoLt}</TableCell>
                        <TableCell>{row.ldoRa}</TableCell>
                        <TableCell>{row.electricUnit}</TableCell>
                        <TableCell>{row.electricEnergy}</TableCell>
                        <TableCell>{row.chemEtpCost}</TableCell>
                        <TableCell>{row.overheads}</TableCell>
                        <TableCell>{row.galvaConvCost}</TableCell>
                        <TableCell>{row.totalCost}</TableCell>
                        <TableCell>{row.invoiceRate}</TableCell>
                        <TableCell sx={{ color: row.earning >= 0 ? 'green' : 'red' }}>{row.earning >= 0 ? `+${row.earning}` : row.earning}</TableCell>
                        <TableCell>
                          <Box display="flex" alignItems="center" gap={0.5} color={row.percent >= 0 ? 'green' : 'red'}
                            sx={{ borderRadius: '12px', px: 1, py: 0.5, fontSize: 13, backgroundColor: row.percent >= 0 ? '#e6f4ea' : '#fdecea', width: 'fit-content' }}>
                            {row.percent >= 0 ? <ArrowDropUpIcon fontSize="small" /> : <ArrowDropDownIcon fontSize="small" />}
                            {`${row.percent > 0 ? '+' : ''}${row.percent}%`}
                          </Box>
                        </TableCell>
                        <TableCell>{row.production}</TableCell>
                        <TableCell>{row.totalAmount}</TableCell>
                        <TableCell>{row.remark}</TableCell>
                        <TableCell>
                          <Box display="flex" gap={1} flexDirection={isMobile ? 'column' : 'row'}>
                            <Typography fontSize={13}>
                              <FiberManualRecordIcon sx={{ fontSize: 10, color: row.resolved ? 'green' : 'gray' }} /> {!isMobile && 'Resolved'}
                            </Typography>
                            <Typography fontSize={13}>
                              <FiberManualRecordIcon sx={{ fontSize: 10, color: !row.resolved ? 'red' : 'gray' }} /> {!isMobile && 'Unresolved'}
                            </Typography>
                          </Box>
                        </TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell>{row.client}</TableCell>
                        <TableCell>{row.product}</TableCell>
                        <TableCell>{row.totalCost.toLocaleString()}</TableCell>
                        <TableCell>{row.invoiceRate.toLocaleString()}</TableCell>
                        <TableCell sx={{ color: row.earning >= 0 ? 'green' : 'red' }}>
                          {row.earning >= 0 ? `+${row.earning}` : row.earning}
                        </TableCell>
                        <TableCell>
                          <Box display="flex" alignItems="center" gap={0.5} color={row.percent >= 0 ? 'green' : 'red'}
                            sx={{ borderRadius: '12px', px: 1, py: 0.5, fontSize: 13, backgroundColor: row.percent >= 0 ? '#e6f4ea' : '#fdecea', width: 'fit-content' }}>
                            {row.percent >= 0 ? <ArrowDropUpIcon fontSize="small" /> : <ArrowDropDownIcon fontSize="small" />}
                            {`${row.percent > 0 ? '+' : ''}${row.percent}%`}
                          </Box>
                        </TableCell>
                        <TableCell>{row.production}</TableCell>
                        <TableCell>{row.totalAmount.toLocaleString()}</TableCell>
                      </>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </CardContent>
    </Card>
  );
};


export default ProductionHighlightsCard;
