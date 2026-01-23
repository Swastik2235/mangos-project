import { FC } from 'react';
// import { useLocation } from 'react-router-dom';
import { Grid,  Box } from '@mui/material';
import ProjectCard from "../../components/features/ProjectCard";
import ProjectsGraph from '../../components/features/ProjectsGraph';
import StatCard from '../../components/molecules/cards/StatCard';
import dollorimg from "../../assets/dollar.png";
import refreshimg from "../../assets/refresh.png";
import GanttChart from '../../components/features/GanttChart';
import TransactionActivities from '../../components/features/TransactionActivities';
import ChatThread from '../../components/features/ChatThread';
import FileAttachments from '../../components/features/FileAttachment';
import SankeyChart from '../../components/features/SankeyChart';
import TaskManager from '../../components/features/TaskManager';
import CalendarAndEvent from '../../components/features/CalendarAndEvent';

const ProjectDetail: FC = () => {
//   const location = useLocation();
//   const { id } = location.state || {}; // Get project ID from state
//   <p>Project ID: {id}</p>

  return (
    <Box>
        <Grid container spacing={3} mt={1}>
            <Grid item xs={12} md={8}>
                <ProjectCard />
                <TransactionActivities />

                <Grid container spacing={5} mt={0}>
                    <Grid item xs={12} sm={6} md={3} mt={0}  >
                        <StatCard
                            title="Spending"
                            value="₹103,000"
                            trend={-10.74}
                            icon={<img src={dollorimg} alt="Dollar Icon" style={{ width: 24, height: 24, }} />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} mt={0}>
                        <StatCard
                            title="Revenue"
                            value="₹33,678"
                            trend={10.74}
                            icon={<img src={refreshimg} alt="Dollar Icon" style={{ width: 24, height: 24 }} />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} mt={0}>
                        <StatCard
                            title="Spending"
                            value="₹103,000"
                            trend={-10.74}
                            icon={<img src={dollorimg} alt="Dollar Icon" style={{ width: 24, height: 24 }} />}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3} mt={0}>
                        <StatCard
                            title="Revenue"
                            value="₹33,678"
                            trend={10.74}
                            icon={<img src={refreshimg} alt="Dollar Icon" style={{ width: 24, height: 24 }} />}
                        />
                    </Grid>
                </Grid>

                <Grid item xs={12} md={12} mt={2}>
                    <ProjectsGraph />
                </Grid>
                <Grid item xs={12} md={12} mt={2}>
                    <GanttChart/>
                </Grid>
                <Grid item xs={12} md={12} mt={2}>
                    <ProjectsGraph />
                </Grid>
                <Grid item xs={12} md={12} mt={2}>
                    <CalendarAndEvent/>
                </Grid>
                <Grid item xs={12} md={12} mt={2}>
                    <SankeyChart/>
                </Grid>
                <Grid item xs={12} md={12} mt={2}>
                    <TaskManager/>
                </Grid>
            </Grid>

            <Grid item xs={12} md={4}>
                <ChatThread/>
                <FileAttachments />
            </Grid>
        </Grid>
    </Box>

  );
};

export default ProjectDetail;
