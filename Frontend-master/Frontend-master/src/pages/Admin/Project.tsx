import { FC, useState } from 'react';
import { Grid, Tabs, Tab, Box } from '@mui/material';
import ProjectCard from "../../components/features/ProjectCard";
import { useNavigate } from 'react-router-dom';


// Sample data for ProjectCard status
const projects = [
  { id: 1, name: 'Galva Project', status: 'ongoing' },
  { id: 2, name: 'Project 2', status: 'completed' },
  { id: 3, name: 'Project 3', status: 'archived' },
  { id: 4, name: 'Project 4', status: 'ongoing' },
];

const Project: FC = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('all');

  // Filter the projects based on the selected tab
  const filteredProjects = projects.filter((project) => {
    if (selectedTab === 'all') return true;
    if (selectedTab === 'ongoing' && project.status !== 'completed') return true;
    if (selectedTab === 'archived' && project.status === 'archived') return true;
    return false;
  });

  const handleProjectClick = (projectId: number) => {
    // navigate(`/projectDetail`, { state: { id: projectId } });
    navigate(`/projectDetailNew`, { state: { id: projectId } });
  };
  // const [activeTab, setActiveTab] = useState('Fabrication');

  // const handleChange = (event, newValue) => {
  //   setActiveTab(newValue);
  // };

  return (
    <Box>
      {/* Tabs */}
      <Box sx={{display:'flex', justifyContent:'space-between'}}>
      <Tabs
        // value={activeTab}
        // onChange={handleChange}
        aria-label="project status tabs"
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab 
          label="Fabrication" 
          value="Fabrication" 
          // sx={{ fontWeight: activeTab === 'Fabrication' ? 'bold' : 'normal' }}
        />
        <Tab 
          label="Fab & Galva" 
          value="Fab & Galva" 
          // sx={{ fontWeight: activeTab === 'Fab & Galva' ? 'bold' : 'normal' }}
        />
        <Tab 
        
          label="Galvanization" 
          value="Galvanization" 
          // sx={{ fontWeight: activeTab === 'Galvanization' ? 'bold' : 'normal' }}
        />
        <Tab 
          label="Solar" 
          value="Solar" 
          // sx={{ fontWeight: activeTab === 'Solar' ? 'bold' : 'normal' }}
        />
      </Tabs>

        <Tabs 
          value={selectedTab} 
          onChange={(_, newValue) => setSelectedTab(newValue)} 
          aria-label="project status tabs"
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab label="All" value="all" />
          <Tab label="Ongoing" value="ongoing" />
          <Tab label="Archived" value="archived" />
        </Tabs>

      </Box>
      

      {/* Display Projects */}
      <Grid container spacing={3} mt={1}>
        {filteredProjects.map((project) => (
          <Grid item xs={12} md={6} lg={6} key={project.id}  onClick={() => handleProjectClick(project.id)} >
            <ProjectCard  />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Project;
