import { FC } from 'react';
import { useState } from "react";
import { Box, Typography } from '@mui/material';
// import {  Calendar} from 'lucide-react';

const TransactionActivities: FC = () => {
   const profiles = [
     'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61']
     const [date, setDate] = useState("");
     const [date1, setDate1] = useState("");
  return (

    <Box
      sx={{
        p: 3,
        mt:3,
        borderRadius: "4px",
        bgcolor: '#E7EBF0',
        boxShadow: `
          4px 4px 20px 0px #6F8CB069,
          -6px -6px 20px 0px #FFFFFF,
          2px 2px 4px 0px #728EAB1A
        `,
        mb:0
      }}
    >
      {/* Header */}
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
          Transactions Activities
            
        </Typography>
          {/* <Button
                startIcon={<Calendar size={18} />}
                variant="outlined"
                size="small"
                sx={{ borderRadius: '8px' }}
              >
                1 Nov 22 - 28 Dec 22
              </Button>
          */}
          <Box style={{
              // boxShadow: '4px 4px 20px 0px #6F8CB069, -6px -6px 20px 0px #FFFFFF, 2px 2px 4px 0px #728EAB1A',
              backgroundColor: '#E7EBF0',
              color: '#000000',
              borderRadius: 4,
              padding: 6,
              border: 'none',
            }}>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{
              boxShadow: '4px 4px 20px 0px #6F8CB069, -6px -6px 20px 0px #FFFFFF, 2px 2px 4px 0px #728EAB1A',
              backgroundColor: '#E7EBF0',
              color: '#000000',
              borderRadius: 4,
              padding: 6,
              border: 'none',
            }}
            
          /> - <input
          type="date"
          value={date1}
          onChange={(e) => setDate1(e.target.value)}
          style={{
            boxShadow: '4px 4px 20px 0px #6F8CB069, -6px -6px 20px 0px #FFFFFF, 2px 2px 4px 0px #728EAB1A',
            backgroundColor: '#E7EBF0',
            color: '#000000',
            borderRadius: 4,
            padding: 6,
            border: 'none',
          }}
          
        />
          </Box>
      </Box>

      {/* Tasks Box */}
      <Box
        sx={{
          p: 2,
          borderRadius: '12px',
          bgcolor: '#E7EBF0',
          boxShadow: `
            2.5px 2.5px 5px 0px #A7AABB80 inset,
            -2.5px -2.5px 5px 0px #FAFBFF inset
          `,
        }}
      >
        {/* <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 , color:'#505576'}}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            
            <Typography variant="subtitle2" sx={{ fontSize:14}}>Materials purchase order from Purchase Department
                
            </Typography>
            <Box
                component="img"
                src={profiles}
                alt='Profile '
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',

                }}
              />
            <Typography sx={{ fontSize:12 }}>Ameya Kukde</Typography>   

          </Box>
          <Typography variant="subtitle2" sx={{ fontSize:12
            }}>Mon, 23 Nov . 12:30 AM </Typography>
        </Box> */}
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start', // Aligns content to the top
              
                color: '#505576',
            }}
            >
            {/* Left Side */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                <Typography variant="subtitle2" sx={{ fontSize: 14 }}>
                Materials purchase order from Purchase Department
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                component="img"
                src={profiles[0]} // Access the first element of the array
                alt="Profile"
                sx={{
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                }}
                />

                <Typography sx={{ fontSize: 12 }}>Ameya Kukde</Typography>
                </Box>
            </Box>

            {/* Right Side */}
            <Typography variant="subtitle2" sx={{ fontSize: 12 }}>
                Mon, 23 Mar . 12:30 AM
            </Typography>
        </Box>

        
        
      </Box>

    </Box>
  );
};

export default TransactionActivities;