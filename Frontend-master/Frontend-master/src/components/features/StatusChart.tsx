import { FC, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Select,
  MenuItem,
  IconButton,
  SelectChangeEvent,
  LinearProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton as MuiIconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import CloseIcon from '@mui/icons-material/Close';

interface StatusChartProps {
  title: string;
}

const StatusChart: FC<StatusChartProps> = ({ title }) => {
  const [category, setCategory] = useState('Fabrication Total');
  const [openFullscreen, setOpenFullscreen] = useState(false);

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  const toggleFullscreen = () => {
    setOpenFullscreen(!openFullscreen);
  };

  interface OperationData {
    label: string;
    primary: number;
    secondary: number;
    tertiary: number;
  }
  
  interface CategoryData {
    label: string;
    items: OperationData[];
  }
  
  const CustomLinearProgress = styled(LinearProgress)(() => ({
    height: 6,
    borderRadius: 3,
    backgroundColor: '#fff',
    '& .MuiLinearProgress-bar': {
      borderRadius: 3,
    },
  }));
  
  const data: CategoryData[] = [
    {
      label: 'Projects',
      items: [
        { label: 'Priority 1', primary: 60, secondary: 80, tertiary: 25 },
        { label: 'Priority 2', primary: 90, secondary: 100, tertiary: 45 },
        { label: 'Priority 3', primary: 100, secondary: 65, tertiary: 10 },
      ]
    },
    {
      label: 'Plants',
      items: [
        { label: 'Manpower (hrs)', primary: 60, secondary: 80, tertiary: 25 },
        { label: 'Material', primary: 90, secondary: 100, tertiary: 45 },
        { label: 'Machinery', primary: 100, secondary: 65, tertiary: 10 },
      ]
    },
    {
      label: 'Business',
      items: [
        { label: 'Methods', primary: 60, secondary: 80, tertiary: 100 },
        { label: 'Monetary', primary: 90, secondary: 50, tertiary: 45 },
        { label: 'Management', primary: 75, secondary: 65, tertiary: 10 },
      ]
    },
    {
      label: '',
      items: [
        { label: ' Operations →', primary: 1, secondary: 2, tertiary: 3 }
      ]
    }
  ];

  const renderChartContent = (isFullscreen: boolean) => (
    <Box sx={{ 
      p: isFullscreen ? 3 : 1,
      height: isFullscreen ? 'calc(100% - 64px)' : 400,
      width: '100%',
      overflow: 'auto',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        {data.map((category, index) => (
          <Box key={index} sx={{ display: 'flex', mb: 2 }}>
            <Typography
              variant={isFullscreen ? "body1" : "subtitle2"}
              sx={{
                color: '#666',
                writingMode: 'vertical-lr',
                transform: 'rotate(180deg)',
                minWidth: isFullscreen ? '32px' : '24px',
                textAlign: 'center',
                mr: 2
              }}
            >
              {category.label}
            </Typography>
            <Box sx={{ flex: 1 }}>
              {category.items.map((item, idx) => (
                <Box key={idx} sx={{ mb: isFullscreen ? 2.5 : 1.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography 
                      variant={isFullscreen ? "body1" : "body2"} 
                      sx={{ 
                        color: '#444', 
                        width: isFullscreen ? '25%' : '20%', 
                        fontSize: isFullscreen ? '0.9rem' : '0.8rem' 
                      }}
                    >
                      {item.label}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, width: isFullscreen ? '75%' : '80%' }}>
                      {[
                        { value: item.primary, color: '#0066cc' },
                        { value: item.secondary, color: '#3399ff' },
                        { value: item.tertiary, color: '#66ccff' }
                      ].map((progress, pIdx) => (
                        <Box key={pIdx} sx={{ flex: 1 }}>
                          <CustomLinearProgress
                            variant="determinate"
                            value={progress.value}
                            sx={{ 
                              '& .MuiLinearProgress-bar': { 
                                backgroundColor: progress.color,
                                height: isFullscreen ? 8 : 6 
                              } 
                            }}
                          />
                          <Typography 
                            variant="caption" 
                            sx={{ 
                              color: '#666', 
                              fontSize: isFullscreen ? '0.8rem' : '0.7rem' 
                            }}
                          >
                            {progress.value}%
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        ))}
      </Box>

      <Box sx={{ 
        mt: 'auto', 
        pt: 2, 
        borderTop: '1px solid #eee',
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center'
      }}>
        <Box sx={{ display: 'flex', gap: isFullscreen ? 4 : 3 }}>
          {[
            { label: 'Primary Operation', color: '#0066cc' },
            { label: 'Secondary Operation', color: '#3399ff' },
            { label: 'Tertiary Operation', color: '#66ccff' }
          ].map((op, index) => (
            <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ 
                width: isFullscreen ? 8 : 6, 
                height: isFullscreen ? 8 : 6, 
                borderRadius: '50%', 
                bgcolor: op.color 
              }} />
              <Typography 
                variant={isFullscreen ? "body2" : "caption"} 
                sx={{ fontSize: isFullscreen ? '0.8rem' : '0.7rem' }}
              >
                {op.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      <Card sx={{ 
        borderRadius: 2,
        boxShadow: `
          4px 4px 20px 0px #6F8CB069,
          -6px -6px 20px 0px #FFFFFF,
          2px 2px 4px 0px #728EAB1A
        `,
        background: "#E7EBF0",
      }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="h3" component="h2" sx={{ color: '#1e293b', fontWeight: 600 }}>
                {title}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Select
                value={category}
                onChange={handleCategoryChange}
                size="small"
                sx={{ 
                  minWidth: 100, 
                  bgcolor: '#E7EBF0',  
                  boxShadow: '4px 4px 20px 0px #6F8CB069, -6px -6px 20px 0px #FFFFFF, 2px 2px 4px 0px #728EAB1A',
                  border: 'none' 
                }}
              >
                <MenuItem value="Fabrication Total">Title 1</MenuItem>
                <MenuItem value="Production Total">Title 2</MenuItem>
              </Select>
              <IconButton onClick={toggleFullscreen}>
                <FullscreenIcon />
              </IconButton>
            </Box>
          </Box>

          <Box sx={{ maxWidth: 1200, margin: 'auto' }}>
            {renderChartContent(false)}
          </Box>
        </CardContent>
      </Card>

      <Dialog
        open={openFullscreen}
        onClose={toggleFullscreen}
        fullWidth
        maxWidth="lg"
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: 2,
            background: "#E7EBF0",
            maxHeight: '90vh'
          }
        }}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          borderBottom: '1px solid #ddd',
          pb: 2
        }}>
          <Typography variant="h4" sx={{ color: '#1e293b', fontWeight: 600 }}>
            {title} - Fullscreen View
          </Typography>
          <MuiIconButton onClick={toggleFullscreen}>
            <CloseIcon />
          </MuiIconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          {renderChartContent(true)}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default StatusChart;