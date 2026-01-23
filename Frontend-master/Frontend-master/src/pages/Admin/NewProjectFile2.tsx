// ProjectDetail.tsx
import { Box, Typography, Card, CardContent, Grid, LinearProgress,  } from '@mui/material';
import ClientDemand from '../../components/features/ClientDemand';
import SupplyChart from '../../components/features/SupplyChart';
import ProductionTableNewProject from '../../components/features/ProductionTableNewProject';


const ProjectDetail = () => {
  return (
    <Box sx={{ 
      p: 3,
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    }}>
      {/* Project Header */}
      <Typography variant="h5" sx={{ 
        fontWeight: 'bold',
        mb: 2,
        color: '#333'
      }}>
        Projects Screen
      </Typography>
      <Typography variant="h6" sx={{ 
        mb: 3,
        color: '#555'
      }}>
        3D 5G 4A0B
      </Typography>

      {/* 4 Progress Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* PRODUCTION Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            height: '100%',
            borderRadius: 2,
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, fontSize: '1.1rem' }}>
                PRODUCTION
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, fontSize: '0.9rem', color: '#555' }}>
                T / 5L (50M)
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={50} 
                sx={{ 
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: '#e0e0e0',
                  mb: 1,
                  '& .MuiLinearProgress-bar': { borderRadius: 4, backgroundColor: '#ff9800' }
                }} 
              />
              <Typography variant="caption" sx={{ display: 'block', textAlign: 'right', color: '#ff9800', fontWeight: 'bold' }}>
                50%
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* BUSINESS Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            height: '100%',
            borderRadius: 2,
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, fontSize: '1.1rem' }}>
                BUSINESS
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, fontSize: '0.9rem', color: '#555' }}>
                265,000/T
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={100} 
                sx={{ 
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: '#e0e0e0',
                  mb: 1,
                  '& .MuiLinearProgress-bar': { borderRadius: 4, backgroundColor: '#4caf50' }
                }} 
              />
              <Typography variant="caption" sx={{ display: 'block', textAlign: 'right', color: '#4caf50', fontWeight: 'bold' }}>
                100%
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* PROCURRENCY Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            height: '100%',
            borderRadius: 2,
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, fontSize: '1.1rem' }}>
                PROCURRENCY
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, fontSize: '0.9rem', color: '#555' }}>
                Z1 L (80M)
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={75} 
                sx={{ 
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: '#e0e0e0',
                  mb: 1,
                  '& .MuiLinearProgress-bar': { borderRadius: 4, backgroundColor: '#2196f3' }
                }} 
              />
              <Typography variant="caption" sx={{ display: 'block', textAlign: 'right', color: '#2196f3', fontWeight: 'bold' }}>
                75%
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* DELIVERY Card */}
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ 
            height: '100%',
            borderRadius: 2,
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, fontSize: '1.1rem' }}>
                DELIVERY
              </Typography>
              <Typography variant="body1" sx={{ mb: 2, fontSize: '0.9rem', color: '#555' }}>
                10 MARCH
                <Typography variant="caption" sx={{ display: 'block', color: '#f44336' }}>
                  (5 Days Remaining)
                </Typography>
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={10} 
                sx={{ 
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: '#e0e0e0',
                  mb: 1,
                  '& .MuiLinearProgress-bar': { borderRadius: 4, backgroundColor: '#f44336' }
                }} 
              />
              <Typography variant="caption" sx={{ display: 'block', textAlign: 'right', color: '#f44336', fontWeight: 'bold' }}>
                10%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* 2 Charts Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ 
            height: '100%',
            borderRadius: 2,
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <CardContent sx={{ p: 2 }}>
              <ClientDemand />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ 
            height: '100%',
            borderRadius: 2,
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
          }}>
            <CardContent sx={{ p: 2 }}>
              <SupplyChart />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Production Audit Table */}
      <Card sx={{ 
        borderRadius: 2,
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        mb: 4
      }}>
        <CardContent sx={{ p: 2 }}>
          <Typography variant="h6" sx={{ 
            fontWeight: 'bold',
            mb: 2,
            fontSize: '1.1rem'
          }}>
            Production Audit
          </Typography>
                    <ProductionTableNewProject />

          {/* <ProductionTableNew2 /> */}
        </CardContent>
      </Card>

    
    </Box>
  );
};

export default ProjectDetail;