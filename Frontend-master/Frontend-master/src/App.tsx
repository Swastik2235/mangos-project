import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Box, CssBaseline, ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import theme from './theme/theme';
import Header from './components/organisms/header';
import Menu from './components/organisms/menu';

import Projects from './pages/Admin/Projects';
import ProductDetail from './pages/Admin/ProjectDetail';
import Datasets from './pages/Admin/Datasets';
import TaskManager from './pages/Admin/TaskManager';
import Employee from './pages/Admin/Employee';
import Services from './pages/Admin/Services';
import Machines from './pages/Admin/Machines';
import Operation from './pages/Admin/Operation';



import Machine from './pages/Admin/Machine';
import MachineMaterial from './pages/Admin/MachineMaterial';
import MachineMaintenance from './pages/Admin/MachineMaintenance';
import Inventory from './pages/Admin/Inventory';
import Clients from './pages/Admin/Clients';
import InventoryCategory from './pages/Admin/InventoryCategory';
import InventoryItem from './pages/Admin/InventoryItem';
import CreateProject from './pages/Admin/CreateProject';
import DatasetsCollection from './pages/Admin/DatasetsCollection';
import JobCardDetail from './pages/Admin/JobCardDetail';

import {
  Production, Operations, Finance, IncomeStatement, 
  BalanceSheet, CashFlow, Revenues, Expenses, Profitability
} from './pages/Admin/Dashboard';

import ProductDetailNew from './pages/Admin/ProjectDetailNew';
import DashboardMis from './pages/Admin/DashboardMisPage';
import Maintenancerecordid from './pages/Admin/MaintenanceRecordId';
import MaintenanceMaterialId from './pages/Admin/MachineMaterialId';
import InventoryItemId from './pages/Admin/InventoryItemId';

import './App.css';
import InventoryItemMaster from './pages/Admin/InventoryItemMaster';
import InventoryStockDetails from './pages/Admin/InventoryStockDetails';
import JobCart from './pages/Admin/JobCart';
import InputTable from './components/features/InputTable';
import Project from './pages/Admin/Project';
import ZohoCRM from './pages/Admin/ZohoCRM';

import Login from './components/organisms/login/login';
// import ProtectedRoute from './components/organisms/ProtectedRoute';
// import Register from './components/organisms/regester';
// import ForgetPassword from './components/organisms/forgetPassword';
import NewPassword from './components/organisms/login/newPassword';

import NewProjectFile from './pages/Admin/NewProjectFile';
import NewProjectFile2 from './pages/Admin/NewProjectFile2';
import Register from './components/organisms/login/regester';
import ForgetPassword from './components/organisms/login/forgetPassword';
import ProtectedRoute from './components/organisms/login/ProtectedRoute';

// import InputTable from '../../components/features/InputTable';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <CssBaseline />
        <Router>
          <MainContent />
        </Router>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

function MainContent() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation(); // Now inside Router context

  // Define paths where the header should not be displayed
  const noHeaderRoutes = ["/machine", "/employee","/machineMaintenance","/machineMaterial","/inventoryCategory","/maintenancerecordid","/maintenancematerialid","/inventoryitemid","/login","/regester","/forgetPassword","/newPassword","/services", "/machines","/operation", "/inventoryItemMaster", "/inventoryStockDetails", "/jobCart", "/project", "/createProject", "/input-table", "/new-project-file", "/new-project-file2"];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  
  const hideMenuPaths = ["/login","/regester","/forgetPassword","/newPassword"];
  const shouldHideMenu = hideMenuPaths.includes(location.pathname);
  

const isLogin = location.pathname === "/login";
const isForget = location.pathname === "/forgetPassword";
const isPassword = location.pathname === "/newPassword";
const isRegester = location.pathname === "/regester";

  return (
    <Box sx={{ display: 'flex' }}>
    {!shouldHideMenu && (
    <Menu mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
  )}
      <Box 
        component="main" 
        sx={{ flexGrow: 1, width: { xs: '100%', lg: `calc(100% - ${240}px)` } }}
      >
        {/* Render Header only if the current path is NOT in the noHeaderRoutes array */}
      {/* Render Header only if current path is NOT in noHeaderRoutes */}
{!noHeaderRoutes.includes(location.pathname) && <Header onMenuClick={handleDrawerToggle} />}

      <Box sx={isLogin || isForget || isPassword || isRegester ? {} : { p: { xs: 2, sm: 3 }, mt: { xs: 7, sm: 5 } }}>
          
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/regester" element={<Register />} />
            <Route path="/forgetPassword" element={<ForgetPassword />} />
            <Route path="/newPassword" element={<NewPassword />} />
         

              <Route
                path="/mis-dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardMis />
                  </ProtectedRoute>
                }
              />


            <Route path="/production" element={<Production />} />
            <Route path="/" element={
               <ProtectedRoute>
              <Production />
              </ProtectedRoute>
               } />
            <Route path="/DASHB" element={<Operations />} />
            <Route path="/finance" element={<Finance />} />
           
            <Route path="/incomeStatement" element={<IncomeStatement />} />
            <Route path="/balanceSheet" element={<BalanceSheet />} />
            <Route path="/cashFlow" element={<CashFlow />} />
            <Route path="/revenues" element={<Revenues />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/profitability" element={<Profitability />} />
           

            <Route path="/projects" element={<Projects />} />
            <Route path="/projectDetail" element={<ProductDetail />} />
            <Route path="/projectDetailNew" element={<ProductDetailNew />} />
            <Route path="/datasetsCollection" element={<DatasetsCollection />} />
           <Route path="/datasets" element={<Datasets />} />

            <Route path="/jobcardDetail/:id" element={<JobCardDetail />} />
           
            <Route path="/taskManager" element={<TaskManager />} />
            <Route path="/project" element={<Project />} />
            <Route path="/jobCart" element={<JobCart />} />
            <Route path="/employee" element={<Employee />} />
            <Route path="/services" element={<Services />} />
            <Route path="/machines" element={<Machines />} />
            <Route path="/operation" element={<Operation />} />
            <Route path="/machine" element={<Machine />} />
            <Route path="/machineMaterial" element={<MachineMaterial />} />
            <Route path="/machineMaintenance" element={<MachineMaintenance />} />
            <Route path="/maintenancerecordid" element={<Maintenancerecordid/>} />
            <Route path="/maintenancematerialid" element={<MaintenanceMaterialId/>} />
            <Route path="/inventory" element={<Inventory />} /> 
            <Route path="/client" element={<Clients />} /> 
            <Route path="/inventoryitemid" element={<InventoryItemId />} /> 
            <Route path="/inventoryCategory" element={<InventoryCategory />} /> 
            <Route path="/inventoryItem" element={<InventoryItem />} /> 
            <Route path="/inventoryItemMaster" element={<InventoryItemMaster />} /> 
            <Route path="/inventoryStockDetails" element={<InventoryStockDetails />} /> 
            <Route path="/createProject" element={<CreateProject />}/>
            <Route path="/input-table" element={<InputTable />} />
            <Route path="/new-project-file" element={<NewProjectFile />} />
            <Route path="/new-project-file2" element={<NewProjectFile2 />} />
            <Route path="/zoho-crm" element={<ZohoCRM />} />



          </Routes>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
