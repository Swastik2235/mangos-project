// import { FC } from 'react';
// import { useState } from "react";
// import { Card, CardContent, Typography, Box, IconButton, Grid } from '@mui/material';
// import {  MoreVertical } from 'lucide-react';
// import fullscreenIcon from "../../assets/fullscreen.png";
// import { format, addDays } from 'date-fns';

// interface Task {
//   title: string;
//   project: string;
//   startWeek: number;
//   duration: number;
//   color: string;
// }

// const tasks: Task[] = [
//   { title: 'Project 1', project: 'QS - FAB', startWeek: 1, duration: 2, color: '#CDC6AE' },
//   { title: 'Project 2', project: 'QS - FAB', startWeek: 3, duration: 1, color: '#A3B4A2' },
//   { title: 'TATA', project: 'QS - FAB', startWeek: 2, duration: 2, color: '#A3B4A2' },
//   { title: 'KEC', project: 'QS - FAB', startWeek: 3, duration: 1, color: '#A3B4A2' },
//   { title: 'Project 1', project: 'QS - Galva', startWeek: 1, duration: 3, color: '#CDC6AE' },
//   { title: 'Project 2', project: 'QS - Galva', startWeek: 2, duration: 2, color: '#A3B4A2' },
//   { title: 'Project 3', project: 'QS - Galva', startWeek: 3, duration: 2, color: '#A3B4A2' },
// ];

// const GanttChart: FC = () => {
//   const startDate = new Date(2022, 10, 1); // Nov 1, 2022
//   // const today = new Date();
//   const [date, setDate] = useState("");
//   const [date1, setDate1] = useState("");

//   const generateWeekDays = (weekIndex: number) => {
//     const weekStart = addDays(startDate, weekIndex * 7);
//     return Array.from({ length: 7 }, (_, i) => {
//       const date = addDays(weekStart, i);
//       return {
//         day: format(date, 'EEE'),
//         date: format(date, 'd'),
//       };
//     });
//   };

//   const weeks = Array.from({ length: 3 }, (_, i) => generateWeekDays(i));

  
//   return (
//     <Card sx={{ 
//       mt: 3,  
//       boxShadow: `
//         4px 4px 20px 0px #6F8CB069,
//         -6px -6px 20px 0px #FFFFFF,
//         2px 2px 4px 0px #728EAB1A
//       ` ,background: '#E7EBF0'
//     }}>
//       <CardContent>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
//           <Box sx={{display:'flex'}}><IconButton size="small">
//               <MoreVertical size={20} />
//             </IconButton>
//           <Typography variant="h3" sx={{alignContent: "space-around"}} >Gantt Chart</Typography></Box>
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
//             {/* <Button
//               startIcon={<Calendar size={18} />}
//               variant="outlined"
//               size="small"
//               sx={{ borderRadius: '8px' }}
//             >
//               1 Nov 22 - 28 Dec 22
//             </Button> */}
//             {/* <Box sx={{ 
//             display: 'flex', 
//             alignItems: 'center', 
//             gap: 1,
//             bgcolor: '#E7EBF0',
//             borderRadius: 2,
//             px: 2,
//             py: 1,
//             boxShadow: "4px 4px 20px 0px #6F8CB069,-6px -6px 20px 0px #FFFFFF,2px 2px 4px 0px #728EAB1A"

//           }}>
//             <Box component="img" 
//               src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='4' width='18' height='18' rx='2' ry='2'%3E%3C/rect%3E%3Cline x1='16' y1='2' x2='16' y2='6'%3E%3C/line%3E%3Cline x1='8' y1='2' x2='8' y2='6'%3E%3C/line%3E%3Cline x1='3' y1='10' x2='21' y2='10'%3E%3C/line%3E%3C/svg%3E"
//               sx={{ width: 20, height: 20 }}
//             />
//             <Typography>{format(today, 'dd MMM yy')}</Typography>
//             <Box component="img" 
//               src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E"
//               sx={{ width: 20, height: 20 }}
//             />
//           </Box> */}
//           <Box style={{
//               // boxShadow: '4px 4px 20px 0px #6F8CB069, -6px -6px 20px 0px #FFFFFF, 2px 2px 4px 0px #728EAB1A',
//               backgroundColor: '#E7EBF0',
//               color: '#000000',
//               borderRadius: 4,
//               padding: 6,
//               border: 'none',
//             }}>
//           <input
//             type="date"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//             style={{
//               boxShadow: '4px 4px 20px 0px #6F8CB069, -6px -6px 20px 0px #FFFFFF, 2px 2px 4px 0px #728EAB1A',
//               backgroundColor: '#E7EBF0',
//               color: '#000000',
//               borderRadius: 4,
//               padding: 6,
//               border: 'none',
//             }}
            
//           /> - <input
//           type="date"
//           value={date1}
//           onChange={(e) => setDate1(e.target.value)}
//           style={{
//             boxShadow: '4px 4px 20px 0px #6F8CB069, -6px -6px 20px 0px #FFFFFF, 2px 2px 4px 0px #728EAB1A',
//             backgroundColor: '#E7EBF0',
//             color: '#000000',
//             borderRadius: 4,
//             padding: 6,
//             border: 'none',
//           }}
          
//         />
//           </Box>

//             {/* <IconButton size="small">
//               <ChevronLeft size={20} />
//             </IconButton>
//             <IconButton size="small">
//               <ChevronRight size={20} />
//             </IconButton> */}
//             <IconButton size="small">
//               <MoreVertical size={20} />
//             </IconButton>
            
//             <Grid item>
//                 <Box
//                   sx={{
//                     width: 34,
//                     height: 34,
//                     backgroundColor: "tranparent",
//                     borderRadius: "50%",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     cursor: "pointer",
//                     transition: "background-color 0.3s ease",
//                     "&:hover": {
//                       backgroundColor: "rgba(37, 100, 230, 0.1)",
//                     },
//                   }}
//                   // onClick={toggleExpansion}
//                 >
//                   <img
//                     src={fullscreenIcon}
//                     alt="Fullscreen"
//                     style={{ width: "24px", height: "24px" }}
//                   />
//                 </Box>
//               </Grid>
//           </Box>
//         </Box>

//         <Box sx={{ overflowX: 'auto' }}>
//           <Box sx={{ minWidth: 800 }}>
//             <Box sx={{ display: 'flex', borderBottom: '1px solid #eee', pb: 2 , bgcolor:'#D3E0FA',p:1}}>
//               <Box sx={{ width: 200 }}>
//                 <Typography variant="subtitle2">Title</Typography>
//               </Box>
//               {weeks.map((week, weekIndex) => (
//                 <Box key={weekIndex} sx={{ flex: 1 }}>
//                   <Typography variant="subtitle2" sx={{ textAlign: 'center', mb: 1, color: '#070810 ', fontSize:10}}>
//                     Week {weekIndex + 1}
//                   </Typography>
//                   <Box sx={{ display: 'flex', justifyContent: 'space-around',color: '#505576', fontSize:10 }}>
//                     {week.map((day, dayIndex) => (
//                       <Box key={dayIndex} sx={{ textAlign: 'center' }}>
//                         <Typography variant="caption" display="block">
//                           {day.day}
//                         </Typography>
//                         <Typography variant="caption" display="block">
//                           {day.date}
//                         </Typography>
//                       </Box>
//                     ))}
//                   </Box>
//                 </Box>
//               ))}
//             </Box>

//             {tasks.map((task, index) => (
//               <Box
//                 key={index}
//                 sx={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   borderBottom: '1px solid #eee',
//                   py: 2,
//                 }}
//               >
//                 <Box sx={{ width: 200 }}>
//                   <Typography variant="h4" sx={{color: '#070810'}}>{task.title}</Typography>
//                   <Typography variant="h5"  sx={{color: '#7C7F98'}}>
//                     {task.project}
//                   </Typography>
//                 </Box>
//                 <Box sx={{ flex: 3, display: 'flex', position: 'relative' }}>
//                   <Box
//                     sx={{
//                       position: 'absolute',
//                       left: `${(task.startWeek - 1) * 33.33}%`,
//                       width: `${task.duration * 33.33}%`,
//                       height: '24px',
//                       backgroundColor: task.color,
//                       borderRadius: '4px',
//                       border: '1px solid #dee2e6',
//                     }}
//                   />
//                 </Box>
//               </Box>
//             ))}
//           </Box>
//         </Box>
//       </CardContent>
//     </Card>
//   );
// };

// export default GanttChart;

import { FC } from 'react';
import { useState } from "react";
import { Card, CardContent, Typography, Box,IconButton,Grid } from '@mui/material';
import { format, differenceInDays, addDays } from 'date-fns';
import {  MoreVertical } from 'lucide-react';
import fullscreenIcon from "../../assets/fullscreen.png";
interface SubProject {
  name: string;
  startDate: Date;
  endDate: Date;
  color: string;
  delayDate?: Date; // Optional delay date
  delayColor?: string; // Optional delay color
}

interface Project {
  title: string;
  startDate: Date;
  endDate: Date;
  subProjects: SubProject[];
}

const projects: Project[] = [
  {
    title: 'Project 1',
    startDate: new Date(2024, 10, 2),
    endDate: new Date(2024, 10, 6),
    subProjects: [
      {
        name: 'QS - FAB',
        startDate: new Date(2024, 10, 3),
        endDate: new Date(2024, 10, 5),
        color: '#A3B4A2',
        delayDate: new Date(2024, 10, 6), // Delay end date
        delayColor: '#d3e0fa', // Color for the delay
      },
      {
        name: 'QS - FAB1',
        startDate: new Date(2024, 10, 5),
        endDate: new Date(2024, 10, 6),
        color: '#A3B4A2',
      },
    ],
  },
  {
    title: 'Project 2',
    startDate: new Date(2024, 10, 2),
    endDate: new Date(2024, 10, 5),
    subProjects: [
      {
        name: 'Sub 1',
        startDate: new Date(2024, 10, 2),
        endDate: new Date(2024, 10, 4),
        color: '#A3B4A2',
      },
    ],
  },
  {
    title: 'Project 3',
    startDate: new Date(2024, 10, 4),
    endDate: new Date(2024, 10, 8),
    subProjects: [
      {
        name: 'QS - FAB',
        startDate: new Date(2024, 10, 4),
        endDate: new Date(2024, 10, 5),
        color: '#A3B4A2',
        delayDate: new Date(2024, 10, 6), // Delay end date
        delayColor: '#d3e0fa', // Color for the delay
      },
      {
        name: 'QS - FAB1',
        startDate: new Date(2024, 10, 5),
        endDate: new Date(2024, 10, 6),
        color: '#A3B4A2',
      },
    ],
  },
  {
    title: 'Project 4',
    startDate: new Date(2024, 10, 6),
    endDate: new Date(2024, 10, 8),
    subProjects: [
      {
        name: 'Sub 1',
        startDate: new Date(2024, 10, 7),
        endDate: new Date(2024, 10, 8),
        color: '#A3B4A2',
      },
    ],
  },
];

const GanttChart: FC = () => {
  const startDate = new Date(2024, 10, 1); // Starting timeline
  const totalDays = 7; // Display one week
  // const dayWidth = 100 / totalDays; // Each day occupies equal width

  const [date, setDate] = useState("");
  const [date1, setDate1] = useState("");

  const generateWeekDays = (weekIndex: number) => {
    const weekStart = addDays(startDate, weekIndex * 7);
    return Array.from({ length: 7 }, (_, i) => {
      const date = addDays(weekStart, i);
      return {
        day: format(date, 'EEE'),
        date: format(date, 'd'),
      };
    });
  };

  const weeks = Array.from({ length: 3 }, (_, i) => generateWeekDays(i));

  const calculatePosition = (start: Date): number =>
    (differenceInDays(start, startDate) / totalDays) * 100;

  const calculateWidth = (start: Date, end: Date): number =>
    (differenceInDays(end, start) / totalDays) * 100;

  return (
    <Card sx={{ mt: 3, boxShadow: `
              4px 4px 20px 0px #6F8CB069,
              -6px -6px 20px 0px #FFFFFF,
              2px 2px 4px 0px #728EAB1A
            ` ,background: '#E7EBF0'
          }}>
    <CardContent>
    
         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
           <Box sx={{display:'flex'}}>
           <Typography variant="h3" sx={{alignContent: "space-around"}} >Gantt Chart</Typography></Box>
           <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
             
            
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
             <IconButton size="small">
               <MoreVertical size={20} />
             </IconButton>
          
             <Grid item>
                 <Box
                   sx={{
                     width: 34,
                     height: 34,
                     backgroundColor: "tranparent",
                     borderRadius: "50%",
                     display: "flex",
                     alignItems: "center",
                     justifyContent: "center",
                     cursor: "pointer",
                     transition: "background-color 0.3s ease",
                     "&:hover": {
                       backgroundColor: "rgba(37, 100, 230, 0.1)",
                     },
                   }}
                   // onClick={toggleExpansion}
                 >
                   <img
                     src={fullscreenIcon}
                     alt="Fullscreen"
                     style={{ width: "24px", height: "24px" }}
                   />
                 </Box>
               </Grid>
           </Box>
         </Box>
          {/* Timeline Header */}
          {/* <Box sx={{ display: 'flex', borderBottom: '1px solid #ccc', mb: 2 }}>
            <Box sx={{ width: 200 }}>
                <Typography variant="h4">Projects</Typography>
              </Box>
                {weeks.map((week, weekIndex) => (
                    <Box key={weekIndex} sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" sx={{ textAlign: 'center', mb: 1, color: '#070810 ', fontSize:10}}>
                        Week {weekIndex + 1}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-around',color: '#505576', fontSize:10 }}>
                        {week.map((day, dayIndex) => (
                          <Box key={dayIndex} sx={{ textAlign: 'center' }}>
                            <Typography variant="caption" display="block">
                              {day.day}
                            </Typography>
                            <Typography variant="caption" display="block">
                              {day.date}
                            </Typography>
                          </Box>
                        ))}
                      </Box>
                    </Box>
                ))}
            </Box> */}
  
            <Box sx={{ display: 'flex', borderBottom: '1px solid #ccc', bgcolor:'#D3E0FA',p:1,mb:2 }}>
              <Box sx={{ width: 200 }}>
                <Typography variant="h4">Title</Typography>
              </Box>
              {weeks.map((week, weekIndex) => (
                <Box key={weekIndex} sx={{ flex: 1 }}>
                  <Typography variant="subtitle2" sx={{ textAlign: 'center', mb: 1, color: '#070810 ', fontSize: 10 }}>
                    Week {weekIndex + 1}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-around', color: '#505576', fontSize: 10 }}>
                    {week.map((day, dayIndex) => (
                      <Box
                        key={dayIndex}
                        sx={{
                          textAlign: 'center',
                          // borderRight: dayIndex !== 6 ? '1px solid #ddd' : 'none', // Add vertical lines except on Sunday
                          paddingRight: 1, // Adds space between the day and line
                          // borderRight: '1px solid #ddd',
                        }}
                      >
                        <Typography variant="caption" display="block">
                          {day.day}
                        </Typography>
                        <Typography variant="caption" display="block">
                          {day.date}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              ))}
            </Box>


            {/* Projects and SubProjects */}
            {projects.map((project, index) => (
              <Box key={index} sx={{ borderBottom: '1px solid #ddd', mb: 2 }}>
                {/* Project Timeline */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ width: 200 }}>
                    <Typography variant="h4">{project.title}</Typography>
                  </Box>
                  <Box sx={{ flex: 1, position: 'relative' }}>
                    <Box
                      sx={{
                        position: 'absolute',
                        left: `${calculatePosition(project.startDate)}%`,
                        width: `${calculateWidth(project.startDate, project.endDate)}%`,
                        height: '24px',
                        backgroundColor: '#CDC6AE',
                        borderRadius: '4px',
                        border: '1px solid #CDC6AE',
                      }}
                    />
                    
                  </Box>
                </Box>

                {/* SubProject Timelines */}
                {project.subProjects.map((subProject, subIndex) => (
                  <Box key={subIndex} sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <Box sx={{ width: 200, pl:1}}>
                      <Typography variant="caption">{subProject.name}</Typography>
                    </Box>
                    <Box sx={{ flex: 1, position: 'relative' }}>
                      <Box
                        sx={{
                          position: 'absolute',
                          left: `${calculatePosition(subProject.startDate)}%`,
                          width: `${calculateWidth(subProject.startDate, subProject.endDate)}%`,
                          height: '16px',
                          backgroundColor: subProject.color,
                          borderRadius: '4px',
                        }}
                      />
                      {subProject.delayDate && (
          <Box
            sx={{
              position: 'absolute',
              left: `${calculatePosition(subProject.endDate)}%`,
              width: `${calculateWidth(subProject.endDate, subProject.delayDate)}%`,
              height: '16px',
              backgroundColor: subProject.delayColor,
              // border: ` 1px solid ${subProject.delayColor}`,
              borderRadius: '4px',
            }}
          />
        )}
                    </Box>
                  </Box>
                ))}
              </Box>

            ))}
     
      </CardContent>
    </Card>
  );
};

export default GanttChart;



