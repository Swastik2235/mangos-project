import { FC } from 'react';
import { Box, Typography, IconButton, LinearProgress } from '@mui/material';
import {  Circle,
  //  MoreVertical
  } from 'lucide-react';
import onprogressStatus from '../../assets/ongoing.png';
import successImg from '../../assets/success.png';

const ProjectCard: FC = () => {
  const stages = [
    { name: 'Consignment initiated', status: 'completed', percentage:'100%' },
    { name: 'Client Onboarding', status: 'inProgress' , percentage:'45%'  },
    { name: 'Resource allocation', status: 'pending', percentage:'25%'  },
    { name: 'Machine process', status: 'pending', percentage:'20%'  }
  ];

  const tasks = [
    { name: 'Order Placed', date: '23 March' },
    { name: 'Delivery Placed', date: '25 March' },
    { name: 'Order Placed', date: '23 March' }
  ];

  // const profiles = [
  //   'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
  //   'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
  //   'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
  //   'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61'
  // ];

  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 2,
        bgcolor: '#E7EBF0',
        boxShadow: `
          4px 4px 20px 0px #6F8CB069,
          -6px -6px 20px 0px #FFFFFF,
          2px 2px 4px 0px #728EAB1A
        `
      }}
    >
      {/* Header old */}
      {/* <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        
        <Typography
          variant="h3"
          sx={{  display: 'flex', alignItems: 'center' }}
        >
          Galva Project
          <IconButton size="small">
            <Circle size={8} fill="#43AF1F" color="#43AF1F" />
          </IconButton>
          <Typography sx={{ fontSize: 12, fontWeight: 500, color: '#7C7F98' }}>
            Ongoing
          </Typography>
        </Typography>

        <Box
          sx={{
            position: 'relative',
            width: 50,
            height: 18,
            borderRadius: 3,
            boxShadow: `
              4px 4px 20px 0px #6F8CB069,
              -6px -6px 20px 0px #FFFFFF,
              2px 2px 4px 0px #728EAB1A
            `,
          }}
        >
          <LinearProgress
            variant="determinate"
            value={85}
            sx={{
              width: '100%',
              height: '100%',
              borderRadius: 3,
              bgcolor: '#E7EBF0',
              '& .MuiLinearProgress-bar': {
                bgcolor: '#43AF1F',
              },
            }}
          />
          <Typography
            variant="caption"
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: '#fff',
              fontWeight: 'bold',
              fontSize: 10,
            }}
          >
            85%
          </Typography>
        </Box>
      </Box> */}
       {/* Header old */}
       <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          // mb: 2,
        }}
      >
        
        <Typography
          variant="h3"
          sx={{  display: 'flex', alignItems: 'center' }}
        >
          PGCIL Odisha Project
          {/* <IconButton size="small">
            <Circle size={8} fill="#43AF1F" color="#43AF1F" />
          </IconButton>
          <Typography sx={{ fontSize: 12, fontWeight: 500, color: '#7C7F98' }}>
            Ongoing
          </Typography> */}
        </Typography>

        <Box
          sx={{
            position: 'relative',
            width: 90,
            height: 18,
            borderRadius: 3,
            boxShadow: `
              4px 4px 20px 0px #6F8CB069,
              -6px -6px 20px 0px #FFFFFF,
              2px 2px 4px 0px #728EAB1A
            `,
          }}
        >
          <LinearProgress
            variant="determinate"
            value={85}
            sx={{
              width: '100%',
              height: '100%',
              borderRadius: 3,
              bgcolor: '#E7EBF0',
              '& .MuiLinearProgress-bar': {
                bgcolor: '#43AF1F',
              },
            }}
          />
          <Typography
            variant="caption"
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: '#fff',
              fontWeight: 'bold',
              fontSize: 10,
            }}
          >
            85%
          </Typography>
        </Box>
      </Box>


       {/* Header new section */}
       <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 2,
        }}
      >
        
        <Typography
          variant="h3"
          sx={{  display: 'flex', alignItems: 'center' }}
        >
         <Typography sx={{ fontSize: 14, fontWeight: 500, color: '#7C7F98' }}>
         Fabrication and Galvanizing Tower Material
          </Typography>
        </Typography>

        <Box
          sx={{
            position: 'relative',
            // width: 50,
            height: 18,
          }}
        >
          <Typography sx={{ fontSize: 12, fontWeight: 500, color: '#7C7F98' }}>
           Due Date: 1/04/2025
          </Typography>         
         
        </Box>
      </Box>


      {/* Description */}
      <Typography 
        variant="body2" 
        sx={{ 
          mb: 3,
          color: '#505576',
          fontSize: 14,
          lineHeight: '18.23px',
          letterSpacing: '0.2px'
        }}
      >
       Supply of Tower Angles for Transmission Lines under TLM offices of Odisha nroyect
       (Under AM Budget)" [Spcn no. ODp/BBIC&M-25GUL-LBIL|*.]  </Typography>

      {/* Progress Stages */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        {stages.map((stage, index) => (
            <Box 
            key={index}
            sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                position: 'relative',
                width: '100%',
                '&:not(:last-child)::after': {
                content: '""',
                position: 'absolute',
                top: 10,
                left: '50%',
                width: '95%',
                height: 2,
                bgcolor: '#E7EBF0',
                borderStyle: 'dashed',
                marginLeft:1.3,
                color:'#A7AABB'
                }
            }}
            >
            {stage.status === 'completed' ? (
                <Box component="img" src={successImg} alt="OnProgressStatus" sx={{ width: 20, height: 20 }} />
            ) : stage.status === 'inProgress' ? (
                <Box component="img" src={onprogressStatus} alt="OnProgressStatus" sx={{ width: 20, height: 20 }} />
            ) : (
                <Box sx={{ width: 20, height: 20, color:"#A7AABB", backgroundColor:"#A7AABB", borderRadius:'50%'}}></Box>
            )}
            <Typography 
                variant="caption" 
                sx={{ 
                mt: 1,
                fontSize: 12,
                textAlign: 'center',
                maxWidth: 80,
                color: stage.status === 'inProgress' ? 'black' : '#A7AABB'  // Conditional color based on the status
                }}
            >
                {stage.percentage}
            </Typography>
            <Typography 
                variant="caption" 
                sx={{ 
                mt: 1,
                fontSize: 12,
                textAlign: 'center',
                maxWidth: 80,
                color: stage.status === 'inProgress' ? 'black' : '#A7AABB'  // Conditional color based on the status
                }}
            >
                {stage.name}
            </Typography>
            </Box>
        ))}
      </Box>


      {/* Tasks Box */}
      <Box
        sx={{
          p: 2,
          borderRadius: '18px',
          bgcolor: '#E7EBF0',
          boxShadow: `
            2.5px 2.5px 5px 0px #A7AABB80 inset,
            -2.5px -2.5px 5px 0px #FAFBFF inset
          `,
          mb: 3
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2}}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* <Circle size={20} fill="#43AF1F" color="#43AF1F" /> */}
            <Box component="img" src={onprogressStatus} alt="OnProgressStatus" sx={{ width: 20, height: 20 }} />
         
            <Typography variant="h4">Client Onboarding</Typography>
          </Box>
          <Typography variant="h4" sx={{color: '#43AF1F', fontSize:14
            }}>48%</Typography>
        </Box>
        <Box sx={{ height: 1, bgcolor: '#242A54', mb: 2 }} />
        {tasks.map((task, index) => (
          <Box 
            key={index}
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              mb: index !== tasks.length - 1 ? 1 : 0
            }}
          >
            <Typography variant="h5">{task.name}</Typography>
            <Typography variant="h5">{task.date}</Typography>
          </Box>
        ))}
      </Box>

      {/* Footer  OLD*/}
      {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml:1 }}>
          <Box sx={{ display: 'flex', ml: -1 }}>
            {profiles.map((profile, index) => (
              <Box
                key={index}
                component="img"
                src={profile}
                alt={`Profile ${index + 1}`}
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  border: '2px solid #fff',
                  ml: -1,
                  '&:first-of-type': { ml: 0 }
                }}
              />
            ))}
          </Box>
          <Typography variant="body2" sx={{ color: '#7C7F98' }}>
            50+ people associated with this project
          </Typography>
        </Box>
        <IconButton>
          <MoreVertical size={20} />
        </IconButton>
      </Box> */}

       {/* Footer */}
       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml:1 }}>
        
          <Typography variant="body2" sx={{ color: '#7C7F98' }}>
           <b>62</b> Job Cards
          </Typography>
        </Box>
        <Box sx={{display:'flex'}}>
        <IconButton size="small">
            <Circle size={8} fill="#43AF1F" color="#43AF1F" />
          </IconButton>
          <Typography sx={{ fontSize: 12, fontWeight: 500, color: '#7C7F98' }}>
            Ongoing
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ProjectCard;