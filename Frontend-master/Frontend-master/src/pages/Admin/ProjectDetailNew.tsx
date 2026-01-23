import { FC, useState, useEffect } from 'react';
import { Grid, Box, Tabs, Tab, Typography } from '@mui/material';
import ProjectCard from "../../components/features/ProjectCard";
import NewProjectFile from '../../pages/Admin/NewProjectFile';
import StatCard from '../../components/molecules/cards/StatCard';
import dollorimg from "../../assets/dollar.png";
import refreshimg from "../../assets/refresh.png";
import TaskManager from '../../components/features/TaskManager';
import ProjectDetailChart from '../../components/graph/ProjectDetailChart';
import Erajobcardproject from '../../components/graph/Erajobcardproject';

import SankeyChart from '../../components/features/SankeyChart';
import TransactionActivities from '../../components/features/TransactionActivities';
import ProjectsGraph from '../../components/features/ProjectsGraph';
import GanttChart from '../../components/features/GanttChart';
import CalendarAndEvent from '../../components/features/CalendarAndEvent';
import ChatThread from '../../components/features/ChatThread';
import FileAttachments from '../../components/features/FileAttachment';
import fileimg from "../../assets/Frame 1000004623.png";
import FileCard from "../../components/molecules/cards/FileCard";
import { read, utils } from 'xlsx';
import ExcelViewer from '../../components/molecules/excelView/ExcelViewer';
import ProjectSummary from '../../components/features/ProjectSummary';

const excelFiles = [
  { title: 'Job Card 1', size: '26.9 MB', path: 'https://docs.google.com/spreadsheets/d/1pEOchRSg53LdAwuvJcdXfrafxn0CGKMT/edit?usp=drive_web&ouid=116719613711112232369&rtpof=true' },
  { title: 'Job Card 2', size: '24.5 MB', path: 'https://docs.google.com/spreadsheets/d/1u3AVKxgL5MNuCL0gH3C4rX-_vWNExpen/edit?usp=drive_web&ouid=116719613711112232369&rtpof=true' },
  { title: 'Job Card 3', size: '22.1 MB', path: 'https://docs.google.com/spreadsheets/d/1yR57lyyeKVoZGBHx7TB7pEqAde2K55UE/edit?usp=drive_web&ouid=116719613711112232369&rtpof=true' },
  { title: 'Job Card 4', size: '23.7 MB', path: 'https://docs.google.com/spreadsheets/d/1QAkwsw4oPovcRXgNlGgbgT6pAZNR3Bbm/edit?usp=drive_web&ouid=116719613711112232369&rtpof=true' },
  { title: 'Job Card 5', size: '25.3 MB', path: 'https://docs.google.com/spreadsheets/d/1d6GfNxAc1UoII52dpu_79HzE7cCE2KXg/edit?usp=drive_web&ouid=116719613711112232369&rtpof=true' },
  { title: 'Job Card 6', size: '21.8 MB', path: 'https://docs.google.com/spreadsheets/d/1K9OZ9lvrewpQLn61UMJtgL5K7EFqSFLz/edit?usp=drive_web&ouid=116719613711112232369&rtpof=true' }
];

const ProductDetailNew: FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [bomData, setBomData] = useState<any[][] | null>(null);
  const [jobCardData, setJobCardData] = useState<any[][] | null>(null);
  const [cPData, setCPData] = useState<any[][] | null>(null);
  const [pEData, setPEData] = useState<any[][] | null>(null);
  const [pLData, setPLData] = useState<any[][] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  // Handle job card file selection
  const handleFileSelect = async (path: string) => {
    try {
      setError(null);
      const response = await fetch(path);
      if (!response.ok) throw new Error(`Failed to fetch Job Card file: ${response.statusText}`);

      const data = await response.arrayBuffer();
      const workbook = read(data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = utils.sheet_to_json<any[]>(worksheet, { header: 1 });

      if (!jsonData || jsonData.length === 0) throw new Error('No data found in the Job Card Excel file.');
      setJobCardData(jsonData);
    } catch (err) {
      console.error('Error reading Job Card Excel file:', err);
      setJobCardData(null);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    }
  };

  // Fetch Excel files data
  useEffect(() => {
    const fetchBomExcelFile = async () => {
      try {
        setError(null);
        const response = await fetch('https://docs.google.com/spreadsheets/d/1bdUZAXH3L53xm06vLkM0Z7szrdiVGeXY/edit?gid=1814918131#gid=1814918131');
        if (!response.ok) throw new Error(`Failed to fetch BOM file: ${response.statusText}`);
        
        const data = await response.arrayBuffer();
        const workbook = read(data);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = utils.sheet_to_json<any[]>(worksheet, { header: 1 });

        if (!jsonData || jsonData.length === 0) throw new Error('No data found in the BOM Excel file.');
        setBomData(jsonData);
      } catch (err) {
        console.error('Error reading BOM Excel file:', err);
        setBomData(null);
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      }
    };

    const fetchCPExcelFile = async () => {
      try {
        setError(null);
        const response = await fetch('https://docs.google.com/spreadsheets/d/1n7_KJysfAXVRcBB7x8TIrlY13vo32Sr9/edit?usp=drive_web&ouid=116719613711112232369&rtpof=true');
        if (!response.ok) throw new Error(`Failed to fetch Cutting Plan file: ${response.statusText}`);
        
        const data = await response.arrayBuffer();
        const workbook = read(data);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = utils.sheet_to_json<any[]>(worksheet, { header: 1 });

        if (!jsonData || jsonData.length === 0) throw new Error('No data found in the Cutting Plan Excel file.');
        setCPData(jsonData);
      } catch (err) {
        console.error('Error reading Cutting Plan Excel file:', err);
        setCPData(null);
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      }
    };

    const fetchPEExcelFile = async () => {
      try {
        setError(null);
        const response = await fetch('https://docs.google.com/spreadsheets/d/137OViVGmdkqNiwcuhxSwGbwBD-n6Yq3T/edit?usp=drive_web&ouid=116719613711112232369&rtpof=true');
        if (!response.ok) throw new Error(`Failed to fetch Production Entry file: ${response.statusText}`);
        
        const data = await response.arrayBuffer();
        const workbook = read(data);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = utils.sheet_to_json<any[]>(worksheet, { header: 1 });

        if (!jsonData || jsonData.length === 0) throw new Error('No data found in the Production Entry Excel file.');
        setPEData(jsonData);
      } catch (err) {
        console.error('Error reading Production Entry Excel file:', err);
        setPEData(null);
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      }
    };

    const fetchPLExcelFile = async () => {
      try {
        setError(null);
        const response = await fetch('https://docs.google.com/spreadsheets/d/1KlhoodXRILbsuT_2qNirnlwpiCH8K7Xh/edit?gid=712604106#gid=712604106');
        if (!response.ok) throw new Error(`Failed to fetch Packing List file: ${response.statusText}`);
        
        const data = await response.arrayBuffer();
        const workbook = read(data);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = utils.sheet_to_json<any[]>(worksheet, { header: 1 });

        if (!jsonData || jsonData.length === 0) throw new Error('No data found in the Packing List Excel file.');
        setPLData(jsonData);
      } catch (err) {
        console.error('Error reading Packing List Excel file:', err);
        setPLData(null);
        setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      }
    };

    fetchBomExcelFile();
    fetchCPExcelFile();
    fetchPEExcelFile();
    fetchPLExcelFile();
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      // case 0: // PGCIL Odisha Project
      //   return (
      //     <Box>
      //       <Grid container spacing={5} mt={0} sx={{ pl: 2 }}>
      //         <Grid item xs={12} md={8}>
      //           <ProjectCard />

      //           {/* <TransactionActivities /> */}



      //           {/* <Grid container spacing={5} mt={0}>
      //             <Grid item xs={12} sm={6} md={3} mt={0}>
      //               <StatCard
      //                 title="Spending"
      //                 value="₹103,000"
      //                 trend={-10.74}
      //                 icon={<img src={dollorimg} alt="Dollar Icon" style={{ width: 24, height: 24 }} />}
      //               />
      //             </Grid>
      //             <Grid item xs={12} sm={6} md={3} mt={0}>
      //               <StatCard
      //                 title="Revenue"
      //                 value="₹33,678"
      //                 trend={10.74}
      //                 icon={<img src={refreshimg} alt="Refresh Icon" style={{ width: 24, height: 24 }} />}
      //               />
      //             </Grid>
      //             <Grid item xs={12} sm={6} md={3} mt={0}>
      //               <StatCard
      //                 title="Spending"
      //                 value="₹103,000"
      //                 trend={-10.74}
      //                 icon={<img src={dollorimg} alt="Dollar Icon" style={{ width: 24, height: 24 }} />}
      //               />
      //             </Grid>
      //             <Grid item xs={12} sm={6} md={3} mt={0}>
      //               <StatCard
      //                 title="Revenue"
      //                 value="₹33,678"
      //                 trend={10.74}
      //                 icon={<img src={refreshimg} alt="Refresh Icon" style={{ width: 24, height: 24 }} />}
      //               />
      //             </Grid>
      //           </Grid>

      //           <Grid item xs={12} md={12} mt={2}>
      //             <ProjectsGraph />
      //           </Grid>
      //           <Grid item xs={12} md={12} mt={2}>
      //             <GanttChart />
      //           </Grid>
      //           <Grid item xs={12} md={12} mt={2}>
      //             <ProjectsGraph />
      //           </Grid>
      //           <Grid item xs={12} md={12} mt={2}>
      //             <CalendarAndEvent />
      //           </Grid>
      //           <Grid item xs={12} md={12} mt={2}>
      //             <SankeyChart />
      //           </Grid>
      //           <Grid item xs={12} md={12} mt={2}>
      //             <TaskManager />
      //           </Grid> */}
      //         </Grid>

      //         {/* <Grid item xs={12} md={4}>
      //           <ChatThread />
      //           <FileAttachments />
      //         </Grid> */}

              
      //       </Grid>
      //     </Box>
      //   );



      case 0: // PGCIL Odisha Project
  return (
    <Box>
      <Grid container spacing={5} mt={0} sx={{ pl: 2 }}>
        
        {/* ProjectCard  */}
        {/* <Grid item xs={12} md={8}>
          <ProjectCard />
        </Grid> */}

         {/* <Grid item xs={12} md={4}>
                <ChatThread />
                 <FileAttachments />
             </Grid>
 */}

        {/*  Full Width NewProjectFile */}
        <Grid item xs={12}>
          <NewProjectFile />
        </Grid>

        
      </Grid>
    </Box>
  );


      case 1: // Summary
        return (
             <Box>
            <Grid container spacing={5} mt={0} sx={{ pl: 2 }}>
              <Grid item xs={12} md={8}>
                <ProjectCard />
                <TransactionActivities />

                <Grid container spacing={5} mt={0}>
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
                      icon={<img src={refreshimg} alt="Refresh Icon" style={{ width: 24, height: 24 }} />}
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
                      icon={<img src={refreshimg} alt="Refresh Icon" style={{ width: 24, height: 24 }} />}
                    />
                  </Grid>
                </Grid>

                <Grid item xs={12} md={12} mt={2}>
                  <ProjectsGraph />
                </Grid>
                <Grid item xs={12} md={12} mt={2}>
                  <GanttChart />
                </Grid>
                <Grid item xs={12} md={12} mt={2}>
                  <ProjectsGraph />
                </Grid>
                <Grid item xs={12} md={12} mt={2}>
                  <CalendarAndEvent />
                </Grid>
                <Grid item xs={12} md={12} mt={2}>
                  <SankeyChart />
                </Grid>
                <Grid item xs={12} md={12} mt={2}>
                  <TaskManager />
                </Grid>
              </Grid>

              <Grid item xs={12} md={4}>
                <ChatThread />
                <FileAttachments />
              </Grid>
            </Grid>
          </Box>
        );

      case 2: // Task Manager
        return (
          <>
            <Grid container spacing={5} mt={0} sx={{ pl: 2 }}>
              <Grid item xs={12}>
                <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#333' }}>
                  Bill of Material [BOM]
                </Typography>
              </Grid>

              {bomData && (
                <Grid item xs={12}>
                  {error && <div style={{ color: 'red' }}>{error}</div>}
                  <ExcelViewer data={bomData} />
                </Grid>
              )}
            </Grid>

            <Grid container spacing={5} mt={0} sx={{ pl: 2 }}>
              <Grid item xs={12}>
                <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#333' }}>
                  Job Card
                </Typography>
              </Grid>

              {excelFiles.map((file, index) => (
                <Grid item xs={12} sm={6} md={2} key={index}>
                  <FileCard
                    title={file.title}
                    value={file.size}
                    icon={<img src={fileimg} alt="File Icon" style={{ width: 50, height: 50 }} />}
                    onClick={() => handleFileSelect(file.path)}
                  />
                </Grid>
              ))}

              {jobCardData && (
                <Grid item xs={12}>
                  {error && <div style={{ color: 'red' }}>{error}</div>}
                  <ExcelViewer data={jobCardData} />
                </Grid>
              )}
            </Grid>

            <Grid container spacing={5} mt={0} sx={{ pl: 2 }}>
              <Grid item xs={12}>
                <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#333' }}>
                  Cutting Plan
                </Typography>
              </Grid>

              {cPData && (
                <Grid item xs={12}>
                  {error && <div style={{ color: 'red' }}>{error}</div>}
                  <ExcelViewer data={cPData} />
                </Grid>
              )}
            </Grid>

            <Grid container spacing={5} mt={0} sx={{ pl: 2 }}>
              <Grid item xs={12}>
                <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#333' }}>
                  Production Entry
                </Typography>
              </Grid>

              {pEData && (
                <Grid item xs={12}>
                  {error && <div style={{ color: 'red' }}>{error}</div>}
                  <ExcelViewer data={pEData} />
                </Grid>
              )}
            </Grid>

            <Grid container spacing={5} mt={0} sx={{ pl: 2 }}>
              <Grid item xs={12}>
                <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#333' }}>
                  Packing List
                </Typography>
              </Grid>

              {pLData && (
                <Grid item xs={12}>
                  {error && <div style={{ color: 'red' }}>{error}</div>}
                  <ExcelViewer data={pLData} />
                </Grid>
              )}
            </Grid>
          </>
        );

      case 3: // Reports
        return (
          <>
            <Grid item xs={12} md={12} mt={2}>
              <ProjectDetailChart />
            </Grid>
            <Grid item xs={12} md={12} mt={2}>
              <SankeyChart />
            </Grid>
          </>
        );

      case 4: // ERA
        return (
          <Grid container spacing={5} mt={0} sx={{ pl: 2 }}>
            <Grid item xs={12}>
              <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#333' }}>
                ERA Dashboard
              </Typography>
            </Grid>
            
            {/* <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="ERA Compliance"
                value="85%"
                trend={5.2}
                icon={<img src={dollorimg} alt="ERA Icon" style={{ width: 24, height: 24 }} />}
              />
            </Grid> */}
            
            {/* <Grid item xs={12} sm={6} md={3}>
              <StatCard
                title="ERA Score"
                value="92/100"
                trend={2.1}
                icon={<img src={refreshimg} alt="ERA Icon" style={{ width: 24, height: 24 }} />}
              />
            </Grid>
             */}
            <Grid item xs={12}>
              <Erajobcardproject />
            </Grid>
            
            {/* <Grid item xs={12}>
              <SankeyChart />
            </Grid> */}
          </Grid>
        );

      case 5: // summarynew 
          return (
          <Grid container spacing={5} mt={0} sx={{ pl: 2 }}>
            <Grid item xs={12} md={12}>
              <ProjectSummary />
            </Grid>
          </Grid>
        );

      default:
        return null;
    }
  };

  return (
    <Box>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        textColor="primary"
        sx={{ justifyContent: "flex-start", display: "flex" }}
        TabIndicatorProps={{ style: { display: "none" } }}
      >
        <Tab
          label="PGCIL Odisha Project"
          sx={{ fontWeight: activeTab === 0 ? "bold" : "normal" }}
        />
        <Tab
          label="Summary"
          sx={{ fontWeight: activeTab === 1 ? "bold" : "normal" }}
        />
        <Tab
          label="Task Manager"
          sx={{ fontWeight: activeTab === 2 ? "bold" : "normal" }}
        />
        <Tab
          label="Reports"
          sx={{ fontWeight: activeTab === 3 ? "bold" : "normal" }}
        />
        <Tab
          label="ERA"
          sx={{ fontWeight: activeTab === 4 ? "bold" : "normal" }}
        />

         <Tab
          label="summarynew"
          sx={{ fontWeight: activeTab === 4 ? "bold" : "normal" }}
        />
      </Tabs>


      
      <Box mt={3}>
        {renderTabContent()}
      </Box>
    </Box>
  );
};

export default ProductDetailNew;