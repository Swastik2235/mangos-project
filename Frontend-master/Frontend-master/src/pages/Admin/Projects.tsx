import { FC, useState } from 'react';
import { Grid, Tabs, Tab, Box, Typography, FormControl, InputLabel, Select, MenuItem, IconButton, Button, Card, CardContent, Divider, Avatar, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Stack, Paper } from '@mui/material';
import { MoreVert, FilterList } from "@mui/icons-material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from 'react-router-dom';


// Define types for our project data
type Project = {
  id: number;
  company: string;
  logo: string;
  totalUnit: string;
  dueDate: string;
  completion: number;
  type: 'galvanization' | 'fabrication' | 'fab_galva' | 'solar';
};

const projectsData: Project[] = [
  {
    id: 1,
    company: "Bajaj India Pvt Ltd",
    logo: 'src/assets/ongoing.png',
    totalUnit: "5/10",
    dueDate: "23 June",
    completion: 80,
    type: 'galvanization'
  },
  {
    id: 2,
    company: "Hero Pvt Ltd",
    logo: 'src/assets/ongoing.png',
    totalUnit: "5/10",
    dueDate: "23 June",
    completion: 50,
    type: 'galvanization'
  },
  {
    id: 3,
    company: "BSNL",
    logo: 'src/assets/ongoing.png',
    totalUnit: "5/10",
    dueDate: "23 June",
    completion: 80,
    type: 'galvanization'
  },
  {
    id: 4,
    company: "Tata Steel",
    logo: 'src/assets/ongoing.png',
    totalUnit: "3/8",
    dueDate: "25 June",
    completion: 60,
    type: 'fabrication'
  },
  {
    id: 5,
    company: "Jindal Steel",
    logo: 'src/assets/ongoing.png',
    totalUnit: "7/12",
    dueDate: "28 June",
    completion: 45,
    type: 'fabrication'
  },
  {
    id: 6,
    company: "Adani Solar",
    logo: 'src/assets/ongoing.png',
    totalUnit: "2/5",
    dueDate: "30 June",
    completion: 90,
    type: 'solar'
  },

   {
    id: 7,
    company: "Tata Solar",
    logo: 'src/assets/ongoing.png',
    totalUnit: "3/7",
    dueDate: "2 July",
    completion: 75,
    type: 'solar'
  },
  {
    id: 8,
    company: "Reliance Fab",
    logo: 'src/assets/ongoing.png',
    totalUnit: "4/6",
    dueDate: "1 July",
    completion: 70,
    type: 'fab_galva'
  },

  {
    id: 9,
    company: "Adani Infrastructure",
    logo: 'src/assets/ongoing.png',
    totalUnit: "5/8",
    dueDate: "3 July",
    completion: 65,
    type: 'fab_galva'
  },
];

const purchaseOrders = [
  { company: "Tata", type: "Fabrication", qty: 10, date: "20 Jun 2021", amount: "₹450,102", change: "+3.20" },
  { company: "Tata", type: "Fabrication", qty: 10, date: "20 Jun 2021", amount: "₹450,102", change: "+3.20" },
  { company: "Tata", type: "Fabrication", qty: 10, date: "20 Jun 2021", amount: "₹450,102", change: "+3.20" }
];

const Projects: FC = () => {
    const navigate = useNavigate();

  const [selectedTab, setSelectedTab] = useState('all');
  const [activeTypeTab, setActiveTypeTab] = useState<'galvanization' | 'fabrication' | 'fab_galva' | 'solar'>('galvanization');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(
    projectsData.filter(project => project.type === 'galvanization')
  );

  const handleTypeTabChange = (type: 'galvanization' | 'fabrication' | 'fab_galva' | 'solar') => {
    setActiveTypeTab(type);
    const filtered = projectsData.filter(project => project.type === type);
    setFilteredProjects(filtered);
  };

  const ProjectCard = ({  company, logo, totalUnit, dueDate, completion }: Project) => (
    <Card 
      sx={{ 
        borderRadius: 4,
        cursor: 'pointer',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.02)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }
      }}
      onClick={() => navigate(`/new-project-file`)}
    >
      <Box
        bgcolor="#fff"
        borderRadius={4}
        boxShadow="0 2px 8px rgba(0,0,0,0.1)"
        overflow="hidden"
        sx={{ transition: '0.3s', '&:hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.15)' } }}
      >
        <Box height={80} bgcolor="lightblue" position="relative">
          <Box
            component="img"
            src={logo}
            alt={company}
            sx={{
              width: 60,
              height: 60,
              borderRadius: '50%',
              border: '3px solid white',
              position: 'absolute',
              left: '50%',
              top: '100%',
              transform: 'translate(-50%, -50%)',
              bgcolor: '#fff',
              objectFit: 'cover',
            }}
          />
        </Box>

        <Box textAlign="center" pt={5} pb={2} px={2}>
          <Typography fontWeight={600} fontSize={16} mb={1}>
            {company}
          </Typography>

          <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <Box>
              <Typography fontSize={12} color="text.secondary">
                Total Unit
              </Typography>
              <Typography fontWeight={600} fontSize={14}>
                {totalUnit} <span style={{ fontSize: 12 }}>MT</span>
              </Typography>
            </Box>
            <Box>
              <Typography fontSize={12} color="text.secondary">
                Due Date
              </Typography>
              <Typography fontWeight={600} fontSize={14} color="error">
                {dueDate}
              </Typography>
            </Box>
            <Box>
              <Typography fontSize={12} color="text.secondary">
                {completion}% Completed
              </Typography>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  border: '3px solid green',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 12,
                  fontWeight: 600,
                  color: 'green',
                }}
              >
                {completion}%
              </Box>
            </Box>
          </Box>

          <Box display="flex" justifyContent="space-between" mt={2}>
            {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day, idx) => (
              <Box key={day} textAlign="center">
                <Box
                  bgcolor="green"
                  height={10 + (idx % 3) * 10}
                  width={6}
                  borderRadius={2}
                  mx="auto"
                />
                <Typography variant="caption" display="block">
                  {day}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Card>
  );

  const HeaderStats = ({ onTabClick }: { onTabClick: (type: 'galvanization' | 'fabrication' | 'fab_galva' | 'solar') => void }) => {
    const stats = [
      {
        label: 'Galvanization',
        value: '5/10mt',
        percent: '4.5%',
        image: 'src/assets/ongoing.png',
        type: 'galvanization'
      },
      {
        label: 'Fabrication',
        value: '34.394mt',
        percent: '4.5%',
        image: 'src/assets/ongoing.png',
        type: 'fabrication'
      },
      {
        label: 'Fab+Galva',
        value: '34.394mt',
        percent: '4.5%',
        image: 'src/assets/ongoing.png',
        type: 'fab_galva'
      },
      {
        label: 'Solar',
        value: '34.394mt',
        percent: '4.5%',
        image: 'src/assets/ongoing.png',
        type: 'solar'
      },
    ];

    return (
      <Box
        bgcolor="#f9fafb"
        p={2}
        borderRadius={4}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        gap={2}
        boxShadow={1}
        flexWrap="wrap"
      >
        {stats.map((item) => (
          <Box
            key={item.label}
            display="flex"
            alignItems="center"
            gap={1.5}
            p={1}
            minWidth={180}
            onClick={() => onTabClick(item.type as any)}
            sx={{
              cursor: 'pointer',
              backgroundColor: activeTypeTab === item.type ? '#e8f4fd' : 'transparent',
              borderRadius: 2,
              '&:hover': {
                backgroundColor: '#f0f0f0'
              }
            }}
          >
            <img
              src={item.image}
              alt={item.label}
              width={40}
              height={40}
            />
            <Box>
              <Typography variant="subtitle1" fontWeight="600">
                {item.label}
              </Typography>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography variant="body1" fontWeight="500">
                  {item.value}
                </Typography>
                <Typography variant="body2" color="green">
                  {item.percent}
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    );
  };

  return (
    <Box>
      <Box sx={{display:'flex', justifyContent:'space-between'}}>
        <Tabs
          value={activeTypeTab}
          onChange={(_, newValue) => handleTypeTabChange(newValue)}
          aria-label="project type tabs"
          textColor="primary"
          indicatorColor="primary"
        >
          <Tab 
            label="Fabrication" 
            value="fabrication"
          />
          <Tab 
            label="Fab & Galva" 
            value="fab_galva"
          />
          <Tab 
            label="Galvanization" 
            value="galvanization"
          />
          <Tab 
            label="Solar" 
            value="solar"
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
      
      <Box p={3}>
        <HeaderStats onTabClick={handleTypeTabChange} />

        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} mt={2}>
          <Typography variant="h6">Projects</Typography>
          <Box display="flex" gap={2}>
            <FormControl size="small">
              <InputLabel>Select</InputLabel>
              <Select defaultValue="" label="Select">
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Bajaj">Bajaj</MenuItem>
                <MenuItem value="Hero">Hero</MenuItem>
              </Select>
            </FormControl>
            <IconButton>
              <FilterList />
            </IconButton>
            <Button variant="outlined">Due Date</Button>
            <IconButton>
              <MoreVert />
            </IconButton>
          </Box>
        </Box>

        <Grid container spacing={2}>
          {filteredProjects.map((project) => (
            <Grid item xs={12} sm={6} md={4} key={project.id}>
              <ProjectCard {...project} />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Grid container spacing={3} sx={{ padding: '0px 25px' }}>
        {/* Job Order Card */}
        <Grid item xs={12} md={6}>
          <Card elevation={1} sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Job Order
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <TableContainer>
                <Table>
                  <TableHead sx={{ '& *': { fontSize: 12 } }}>
                    <TableRow style={{backgroundColor:"rgb(247 247 247)",}}>
                      <TableCell style={{color: "gray",padding:"0px 20px"}}><strong>Projects</strong></TableCell>
                      <TableCell style={{color: "gray",padding:"0px 20px"}}><strong>Job Cards</strong></TableCell>
                      <TableCell style={{color: "gray",padding:"0px 20px"}}><strong>Planning Weight</strong></TableCell>
                      <TableCell style={{color: "gray",padding:"0px 20px"}}><strong>Status</strong></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody sx={{ '& *': { fontSize: 12 } }}>
                    {[
                      {
                        logo: "/assets/tata.png",
                        name: "Tata",
                        type: "Fabrication",
                        codeColor: "purple",
                        codeInitial: "F",
                        jobCard: "JC/578947",
                        subCode: "JC-158-01",
                        weight: "4211.3 kg",
                        percent: "43.5%",
                        status: "Verified",
                        date: "20 Jun 2021"
                      },
                      {
                        logo: "/assets/hero.png",
                        name: "Hero",
                        type: "Galvanization",
                        codeColor: "blue",
                        codeInitial: "O",
                        jobCard: "JC/578947",
                        subCode: "JC-158-01",
                        weight: "4211.3 kg",
                        percent: "43.5%",
                        status: "Verified",
                        date: "20 Jun 2021"
                      },
                      {
                        logo: "/assets/bajaj.png",
                        name: "Bajaj",
                        type: "Fabrication",
                        codeColor: "green",
                        codeInitial: "FG",
                        jobCard: "JC/578947",
                        subCode: "JC-158-01",
                        weight: "4211.3 kg",
                        percent: "43.5%",
                        status: "Verified",
                        date: "20 Jun 2021"
                      },
                      {
                        logo: "/assets/mahindra.png",
                        name: "Mahindra",
                        type: "Solar",
                        codeColor: "orange",
                        codeInitial: "S",
                        jobCard: "JC/578947",
                        subCode: "JC-158-01",
                        weight: "4211.3 kg",
                        percent: "43.5%",
                        status: "Verified",
                        date: "20 Jun 2021"
                      }
                    ].map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Avatar src={row.logo} />
                            <Box>
                              <Typography fontWeight={600}>{row.name}</Typography>
                              <Typography variant="body2" color="text.secondary">{row.type}</Typography>
                            </Box>
                          </Stack>
                        </TableCell>

                        <TableCell>
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Avatar
                              sx={{
                                bgcolor: row.codeColor,
                                color: "white",
                                fontSize: 12,
                                width: 32,
                                height: 32
                              }}
                            >
                              {row.codeInitial}
                            </Avatar>
                            <Box>
                              <Typography variant="body2" fontWeight={500}>{row.jobCard}</Typography>
                              <Typography variant="body2" color="text.secondary">{row.subCode}</Typography>
                            </Box>
                          </Stack>
                        </TableCell>

                        <TableCell>
                          <Typography fontWeight={600} color="green">{row.weight}</Typography>
                          <Typography variant="body2" color="green">{row.percent}</Typography>
                        </TableCell>

                        <TableCell>
                          <Stack spacing={0.5}>
                            <Stack direction="row" spacing={1} alignItems="center">
                              <CheckCircleIcon color="success" fontSize="small" />
                              <Typography variant="body2" color="success.main">{row.status}</Typography>
                            </Stack>
                            <Typography variant="caption" color="text.secondary">{row.date}</Typography>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Purchase Orders Card */}
        <Grid item xs={12} md={6}>
          <Card elevation={1} sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Purchase Orders
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <TableContainer component={Paper} elevation={0}>
                <Table size="small" aria-label="purchase orders table">
                  <TableHead sx={{ '& *': { fontSize: 12 } }}>
                    <TableRow style={{backgroundColor:"rgb(247 247 247)",}}>
                      <TableCell style={{color: "gray",padding:"0px 20px"}}><strong>Company</strong></TableCell>
                      <TableCell style={{color: "gray",padding:"0px 20px"}}><strong>Quantity</strong></TableCell>
                      <TableCell style={{color: "gray",padding:"0px 20px"}}><strong>Date</strong></TableCell>
                      <TableCell align="right" style={{color: "gray",padding:"0px 20px"}}><strong>Amount</strong></TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {purchaseOrders.map((po, index) => (
                      <TableRow key={index} hover>
                        <TableCell>
                          <Box display="flex" alignItems="center" gap={1}>
                            <Avatar src="/assets/tata.png" sx={{ width: 24, height: 24 }} />
                            <Typography fontWeight={600}>{po.company}</Typography>
                          </Box>
                        </TableCell>

                        <TableCell>{po.qty}</TableCell>

                        <TableCell>{po.date}</TableCell>

                        <TableCell align="right">
                          <Typography fontWeight={600}>{po.amount}</Typography>
                          <Typography variant="body2" color="green">
                            {po.change}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Projects;