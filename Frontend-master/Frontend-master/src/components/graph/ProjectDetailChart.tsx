import React, { useState } from 'react';
import {
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
import ProjectCostChart,{generateMockData} from './ProjectCostChart';

const ProjectDetailChart: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState('Dec 2022');
  const [selectedTab, setSelectedTab] = useState('Sales');
  const mockData = generateMockData();

  const handleWarningClick = () => {
    alert('Cost variance detected! Click for more details.');
  };

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

        <ProjectCostChart
          data={mockData}
          estimatedCompletion={30}
          budgetCompletion={25}
          onWarningClick={handleWarningClick}
        />

      </CardContent>
    </Card>
  );
};

export default ProjectDetailChart;