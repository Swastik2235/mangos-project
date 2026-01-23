import { FC, useState } from 'react';
import { Box, Grid, IconButton,Typography } from '@mui/material';
import MisStatCard from '../../components/molecules/cards/MisStatCard';
// import ProductionChart from '../../components/features/ProductionChart';
// import EarningsChart from '../../components/features/EarningChart';
// import ProductionTable from '../../components/features/ProductionTable';
import CircularChart from '../../components/features/CircularChart';
import ExpensesCircularChart from '../../components/features/ExpensesCircularChart';

// import ProgressBars from '../../components/features/ProgessBars';
// import StatusChart from '../../components/features/StatusChart';
// import ProductionProgressTable from '../../components/features/OperationTableHighlight/ProductionProgessTable';

import MeterChart from '../../components/features/MeterChart';






import ProductionTableAisAudit from '../../components/features/ProductionTableAisAudit';
import ExpensesProductionTable from '../../components/features/ExpensesProductionTable';

// import ProductionTableAisIncome from '../../components/features/ProductionTableAisIncome';
import ProductionTableAisProfitability from '../../components/features/ProductionTableAisProfitability';
import ProductionTableFinancialBalanceSheet from '../../components/features/ProductionTableFinancialBalanceSheet';
import ProductionTableFinancialCashFlowSheet from '../../components/features/ProdductionTableFinancialCashFlowSheet';
import BusinessSensitivityChart from '../../components/features/BusinessSensitivityChart';
import ProductionTableIncome from '../../components/features/ProductionTableIncome';

import ProductionTableSankey from '../../components/features/ProductionTableSankey';







// import FinancialBranch,{FinancialData} from '../../components/features/BrachItem/FinancialBranch';
// import {  StockData } from '../../components/features/BrachItem/StockBranch';
// import FinancialFlowDiagram from '../../components/features/BrachItem/FinancialFlowDiagram';
// import BusinessMetricsChart from '../../components/features/BusinessAnalytics/BusinessMetricsChart';
// import BusinessWavyChart from '../../components/features/BusinessAnalytics/BusinessWavyChart';
import  BusinessNodesFlow  from '../../components/features/BusinessAnalytics/Flowchart/BusinessNodesFlow';
// import ProjectDetailChart from '../../components/graph/ProjectDetailChart';
import FinanceHighlightChart from '../../components/features/BusinessAnalytics/FinanceHighlightChart';
import OperatingProfitProfile from '../../components/features/BusinessAnalytics/OperatingProfitProfile';
import OperatingProfitProfile1 from '../../components/features/BusinessAnalytics/OperatingProfitProfile1';

import UnrealisedProfitChart from '../../components/features/BusinessAnalytics/UnrealisedProfitChart';
import BalanceChart from '../../components/features/BusinessAnalytics/BalanceChart';
import BalanceAsset from '../../components/features/BusinessAnalytics/BalanceAsset';
import EquityChart from '../../components/features/BusinessAnalytics/EquityChart';
import LiabilitiesChart from '../../components/features/BusinessAnalytics/LiabilitiesChart';




import CashHighlight from '../../components/features/BusinessAnalytics/CashHighlight';
import SankeyChart1 from '../../components/features/BusinessAnalytics/SankeyChart1';
import SankeySales from '../../components/features/BusinessAnalytics/SankeySales';


import FreeCashFlowChart from '../../components/features/BusinessAnalytics/FreeCashFlowChart';
import CashFlowChart from '../../components/features/BusinessAnalytics/CashFlowChart';
import HighlightCashFlowChart from '../../components/features/BusinessAnalytics/HighlightCashFlowChart';

import CashPosition from '../../components/features/BusinessAnalytics/CashPosition';
import BusinessVarienceChart from '../../components/features/BusinessAnalytics/BusinessVarienceChart';
import BusinessVarience from '../../components/features/BusinessAnalytics/BusinessVarience';



import SensitivityHighlight from '../../components/features/BusinessAnalytics/SensitivityHighlight';
import SensitivityStressCover from '../../components/features/BusinessAnalytics/SensitivityStressCover';
// import AuditExpenseshighlight from '../../components/features/BusinessAnalytics/SensitivityStressCover';



// import FinanceHighChart from '../../components/features/BusinessAnalytics/FinanceHighChart';

import BreakEvenChart from '../../components/features/BusinessAnalytics/BreakEvenChart';
// import BusinessNodesFlow from '../../components/features/BusinessAnalytics/BusinessNodesFlow';
// import NewChart from '../../components/features/BrachItem/NewChart';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ExpensesMeterChart from '../../components/features/ExpensesAuditMeter';






// Audit Aspects
//Revenues
const Revenues: FC = () => (
  <Grid container spacing={3}>
  {/* Stat Cards */}
  <Grid item xs={12} sm={6} md={3}>
    <MisStatCard
      title="Sales:Cost"
      subtitle="Cumulative"
      firstvalue="₹ 10.5 L"
      secondvalue="₹ 08.2 L"
      value="1.28%"
      trend={0.5}
    />
  </Grid>
  <Grid item xs={12} sm={6} md={3}>
    <MisStatCard
      title="Sales:Cost"
      subtitle="Today's"
      firstvalue="₹ 10.5 L"
      secondvalue="₹ 08.2 L"
      value="1.28%"
      trend={0.5}
    />
  </Grid>
  <Grid item xs={12} sm={6} md={3}>
    <MisStatCard
      title="Earnings:Sales"
      subtitle="Cumulative"
      firstvalue="₹ 1 L"
      secondvalue="₹ 10 L"
      value="10%"
      trend={0.5}
    />
  </Grid>
  <Grid item xs={12} sm={6} md={3}>
    <MisStatCard
      title="Earnings:Sales"
      subtitle="Today's"
      firstvalue="₹ 1 L"
      secondvalue="₹ 10 L"
      value="10%"
      trend={0.5}
    />
  </Grid>

  {/* Graphs and Charts */}
  <Grid item xs={12} md={6}>
   <CircularChart
   />
  </Grid>
  <Grid item xs={12} md={6}>
   {/* <CircularChart
   title="Audit Meter"
   /> */}
    <MeterChart
          title="Audit Meter"
        />

  </Grid>
  <Grid item xs={12}>
    {/* <ProductionTable /> */}
    <ProductionTableAisAudit/>

  </Grid>
  <Grid item xs={12}>
    {/* <ProductionTable /> */}
    {/* <ProjectDetailChart/> */}
    
  </Grid>
</Grid>
);
// Expenses
const Expenses: FC = () => {
  const [page, setPage] = useState(0);

  const handlePrev = () => {
    setPage((prev) => Math.max(prev - 1, 0)); // Do not go below 0
  };

  const handleNext = () => {
    setPage((prev) => Math.min(prev + 1, 1)); // Only 0 and 1 allowed
  };

  return (
    <Grid container spacing={3}>
      {/* Stat Cards */}
      <Grid item xs={12} sm={6} md={3}>
        <MisStatCard
          title="Sales:Cost"
          subtitle="Cumulative"
          firstvalue="₹ 10.5 L"
          secondvalue="₹ 08.2 L"
          value="1.28%"
          trend={0.5}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <MisStatCard
          title="Sales:Cost"
          subtitle="Today's"
          firstvalue="₹ 10.5 L"
          secondvalue="₹ 08.2 L"
          value="1.28%"
          trend={0.5}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <MisStatCard
          title="Earnings:Sales"
          subtitle="Cumulative"
          firstvalue="₹ 1 L"
          secondvalue="₹ 10 L"
          value="10%"
          trend={0.5}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <MisStatCard
          title="Earnings:Sales"
          subtitle="Today's"
          firstvalue="₹ 1 L"
          secondvalue="₹ 10 L"
          value="10%"
          trend={0.5}
        />
      </Grid>

      {/* Graphs and Charts */}
      <Grid item xs={12}>
        <Box>
          <Grid container spacing={2}>
            {page === 0 && (
              <>
                <Grid item xs={12} md={6}>
                  {/* <ProgressBars /> */}
                  {/* delete */}
                  {/* <StatusChart title="Highlights"/> mis */}
                  {/* <FinancialBranch data={financialData} /> */}
                  {/* <NewChart/> */}
                  {/* <FinancialFlowDiagram /> */}
                  {/* <FinanceHighlightChart /> */}
                  {/* <StockBranch data={stockData} /> */}
                  {/* <AuditExpenseshighlight/> */}
                   <ExpensesCircularChart
   />

                  
                </Grid>
                <Grid item xs={12} md={6}>
                  {/* <StatusChart title="Business"/>  mis*/}
                  {/* <StockBranch data={stockData} /> */}
                  {/* <FinancialFlowDiagram /> */}
                  {/* <OperatingProfitProfile /> */}
                  {/* <SensitivityStressCover /> */}
                   {/* <OperatingProfitProfile /> */}
                     <ExpensesMeterChart
          title="  Audit Meter"
        />
</Grid>
              </>
            )}
            {page === 1 && (
              <>
                <Grid item xs={12} md={6}>
                
                   <CircularChart/>
   
  
                </Grid>
                <Grid item xs={12} md={6}>
                  {/* <StatusChart title="Business"/>  mis*/}
                  {/* <StockBranch data={stockData} /> */}
                  {/* <FinancialFlowDiagram /> */}
                  {/* <BreakEvenChart /> */}
                  {/* <SensitivityStressCover /> */}

                    <MeterChart title="Audit Meter"/>
                </Grid>
              </>
            )}
          </Grid>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
          <IconButton onClick={handlePrev} disabled={page === 0}>
            <ArrowBackIosIcon />
          </IconButton>
          <IconButton onClick={handleNext} disabled={page === 1}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      </Grid>
      <Grid item xs={12}>
        {/* <ProductionTable /> */}
        {/* <ProductionProgressTable/>  mis */}
        {/* <ProductionTableAisIncome /> */}
            <ExpensesProductionTable/>

      </Grid>
    </Grid>
  );
}
//Profitability


const Profitability: FC = () => {
  const [page, setPage] = useState(0);
  const TOTAL_PAGES = 3; // 6 charts / 2 per page

  const handlePrev = () => {
    setPage((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setPage((prev) => Math.min(prev + 1, TOTAL_PAGES - 1));
  };

  return (
    <Grid container spacing={3}>
      {/* Stat Cards */}
      <Grid item xs={12} sm={6} md={3}>
        <MisStatCard title="Sales:Cost" subtitle="Cumulative" firstvalue="₹ 10.5 L" secondvalue="₹ 08.2 L" value="1.28%" trend={0.5} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <MisStatCard title="Sales:Cost" subtitle="Today's" firstvalue="₹ 10.5 L" secondvalue="₹ 08.2 L" value="1.28%" trend={0.5} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <MisStatCard title="Earnings:Sales" subtitle="Cumulative" firstvalue="₹ 1 L" secondvalue="₹ 10 L" value="10%" trend={0.5} />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <MisStatCard title="Earnings:Sales" subtitle="Today's" firstvalue="₹ 1 L" secondvalue="₹ 10 L" value="10%" trend={0.5} />
      </Grid>

      {/* Chart Pages */}
      <Grid item xs={12}>
        <Box>
          <Grid container spacing={2}>
            {page === 0 && (
              <>
                <Grid item xs={12} md={6}><FinanceHighlightChart/></Grid>
                <Grid item xs={12} md={6}><OperatingProfitProfile1/></Grid>
              </>
            )}
            {page === 1 && (
              <>
                <Grid item xs={12} md={6}><UnrealisedProfitChart /></Grid>
                <Grid item xs={12} md={6}><BreakEvenChart /></Grid>
              </>
            )}
            {page === 2 && (
              <>
                <Grid item xs={12} md={6}><FinanceHighlightChart /></Grid>
                <Grid item xs={12} md={6}><OperatingProfitProfile /></Grid>
              </>
            )}
          </Grid>
        </Box>

        {/* Pagination Controls */}
        <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
          <IconButton onClick={handlePrev} disabled={page === 0}>
            <ArrowBackIosIcon />
          </IconButton>
          <Typography variant="body2" sx={{ mx: 2 }}>
            {/* Page {page + 1} of {TOTAL_PAGES} */}
          </Typography>
          <IconButton onClick={handleNext} disabled={page === TOTAL_PAGES - 1}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      </Grid>

      {/* Table */}
      <Grid item xs={12}>
        <ProductionTableAisProfitability />
      </Grid>
    </Grid>
  );
};



// Financial Statements
//business
// const IncomeStatement: FC = () => (
//   <Grid container spacing={3}>
//     {/* Stat Cards */}
//     <Grid item xs={12} sm={6} md={3}>
//       <MisStatCard
//         title="Sales:Cost"
//         subtitle="Cumulative"
//         firstvalue="₹ 10.5 L"
//         secondvalue="₹ 08.2 L"
//         value="1.28%"
//         trend={0.5}
//       />
//     </Grid>
//     <Grid item xs={12} sm={6} md={3}>
//       <MisStatCard
//         title="Sales:Cost"
//         subtitle="Today's"
//         firstvalue="₹ 10.5 L"
//         secondvalue="₹ 08.2 L"
//         value="1.28%"
//         trend={0.5}
//       />
//     </Grid>
//     <Grid item xs={12} sm={6} md={3}>
//       <MisStatCard
//         title="Earnings:Sales"
//         subtitle="Cumulative"
//         firstvalue="₹ 1 L"
//         secondvalue="₹ 10 L"
//         value="10%"
//         trend={0.5}
//       />
//     </Grid>
//     <Grid item xs={12} sm={6} md={3}>
//       <MisStatCard
//         title="Earnings:Sales"
//         subtitle="Today's"
//         firstvalue="₹ 1 L"
//         secondvalue="₹ 10 L"
//         value="10%"
//         trend={0.5}
//       />
//     </Grid>

//     {/* Graphs and Charts */}
//     <Grid item xs={12} md={6}>
//       {/* <ProgressBars /> */} 
//       {/* delete */}

//       {/* <StatusChart 
//       title="Highlights"/> mis */}
//       {/* <FinancialBranch data={financialData} /> */}
//       {/* <NewChart/> */}
//      {/* <FinancialFlowDiagram /> */}
//        {/* <BusinessVarienceChart/> */}
//        <SankeyChart1 />

  
//     </Grid>

//      <Grid item xs={12} md={6}>
//       {/* <ProgressBars /> */} 
//       {/* delete */}

//       {/* <StatusChart 
//       title="Highlights"/> mis */}
//       {/* <FinancialBranch data={financialData} /> */}
//       {/* <NewChart/> */}
//      {/* <FinancialFlowDiagram /> */}
//                   {/* <SensitivityHighlight/> */}
//                          <SankeySales />




  
//     </Grid>
//     <Grid item xs={12} md={6}>
//       {/* <StatusChart 
//       title="Business"/>  mis*/}
      
//       {/* <StockBranch data={stockData} /> */}
//       {/* <StockBranch data={stockData} /> */}
//     </Grid>
//     <Grid item xs={12}>
//       {/* <ProductionTable /> */}

      
//       {/* <ProductionProgressTable/>  mis */}
//       {/* <ProductionTableAisIncome/> */}
//           <ProductionTableIncome/>


//     </Grid>
//   </Grid>
// );


const IncomeStatement: FC = () => {
  const [page, setPage] = useState(0);

  const maxPage = 3; // 

  const handlePrev = () => {
    setPage((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setPage((prev) => Math.min(prev + 1, maxPage));
  };

  return (
    <Grid container spacing={3}>
      {/* Stat Cards */}
      <Grid item xs={12} sm={6} md={3}>
        <MisStatCard
          title="Sales:Cost"
          subtitle="Cumulative"
          firstvalue="₹ 10.5 L"
          secondvalue="₹ 08.2 L"
          value="1.28%"
          trend={0.5}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <MisStatCard
          title="Sales:Cost"
          subtitle="Today's"
          firstvalue="₹ 10.5 L"
          secondvalue="₹ 08.2 L"
          value="1.28%"
          trend={0.5}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <MisStatCard
          title="Earnings:Sales"
          subtitle="Cumulative"
          firstvalue="₹ 1 L"
          secondvalue="₹ 10 L"
          value="10%"
          trend={0.5}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <MisStatCard
          title="Earnings:Sales"
          subtitle="Today's"
          firstvalue="₹ 1 L"
          secondvalue="₹ 10 L"
          value="10%"
          trend={0.5}
        />
      </Grid>

      {/* Main Content Area */}
      <Grid item xs={12}>
        <Box>
          <Grid container spacing={2}>
            {page === 0 && (
              <>
                <Grid item xs={12} md={6}>
                  <SankeyChart1 />
                </Grid>
                <Grid item xs={12} md={6}>
                  <SankeySales />
                </Grid>
              </>
            )}

            {page === 1 && (
              <>
                <Grid item xs={12} md={6}>
                  <EquityChart />
                </Grid>
                <Grid item xs={12} md={6}>
                  <LiabilitiesChart />
                </Grid>
                <Grid item xs={12}>
                  <ProductionTableSankey />
                </Grid>
              </>
            )}

            {page === 2 && (
              <>
                <Grid item xs={12} md={6}>
                  <SankeyChart1 />
                </Grid>
                <Grid item xs={12} md={6}>
                  <LiabilitiesChart />
                </Grid>
              </>
            )}

            {page === 3 && (
              <>
                <Grid item xs={12} md={6}>
                  <EquityChart />
                </Grid>
                <Grid item xs={12} md={6}>
                  <SankeySales />
                </Grid>
              </>
            )}
          </Grid>
        </Box>

        {/* Navigation Arrows */}
        <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
          <IconButton onClick={handlePrev} disabled={page === 0}>
            <ArrowBackIosIcon />
          </IconButton>
          <IconButton onClick={handleNext} disabled={page === maxPage}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      </Grid>

      {/* Bottom Table - Show only when not on page 1 */}
      {page !== 1 && (
        <Grid item xs={12}>
          <ProductionTableIncome />
        </Grid>
      )}
    </Grid>
  );
};


// Income
const BalanceSheet: FC = () => {
  const [page, setPage] = useState(0);

const handlePrev = () => {
  setPage((prev) => Math.max(prev - 1, 0)); // Do not go below 0
};

const handleNext = () => {
  setPage((prev) => Math.min(prev + 1, 3)); // Go up to page 3 (0 to 3 = 4 pages)
};


  return (
    <Grid container spacing={3}>
      {/* Stat Cards */}
      <Grid item xs={12} sm={6} md={3}>
        <MisStatCard
          title="Sales:Cost"
          subtitle="Cumulative"
          firstvalue="₹ 10.5 L"
          secondvalue="₹ 08.2 L"
          value="1.28%"
          trend={0.5}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <MisStatCard
          title="Sales:Cost"
          subtitle="Today's"
          firstvalue="₹ 10.5 L"
          secondvalue="₹ 08.2 L"
          value="1.28%"
          trend={0.5}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <MisStatCard
          title="Earnings:Sales"
          subtitle="Cumulative"
          firstvalue="₹ 1 L"
          secondvalue="₹ 10 L"
          value="10%"
          trend={0.5}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <MisStatCard
          title="Earnings:Sales"
          subtitle="Today's"
          firstvalue="₹ 1 L"
          secondvalue="₹ 10 L"
          value="10%"
          trend={0.5}
        />
      </Grid>

      {/* Graphs and Charts */}
      <Grid item xs={12}>
        <Box>
         <Grid container spacing={2}>
  {page === 0 && (
    <>
      <Grid item xs={12} md={6}><BalanceChart /></Grid>
      <Grid item xs={12} md={6}><BalanceAsset /></Grid>
    </>
  )}
  {page === 1 && (
    <>
      <Grid item xs={12} md={6}><EquityChart /></Grid>
      <Grid item xs={12} md={6}><LiabilitiesChart /></Grid>
    </>
  )}
  {page === 2 && (
    <>
      <Grid item xs={12} md={6}><BalanceChart /></Grid> {/* Replace with actual chart */}
      <Grid item xs={12} md={6}><LiabilitiesChart /></Grid>
    </>
  )}
  {page === 3 && (
    <>
      <Grid item xs={12} md={6}><EquityChart /></Grid> {/* Replace with actual chart */}
      <Grid item xs={12} md={6}><BalanceAsset /></Grid>
    </>
  )}
</Grid>

        </Box>
       <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
  <IconButton onClick={handlePrev} disabled={page === 0}>
    <ArrowBackIosIcon />
  </IconButton>
  <IconButton onClick={handleNext} disabled={page === 3}>
    <ArrowForwardIosIcon />
  </IconButton>
</Box>

      </Grid>
      <Grid item xs={12}>
       
        <ProductionTableFinancialBalanceSheet />
      </Grid>
    </Grid>
  );
};










//   const handlePrev = () => {
//     setPage((prev) => Math.max(prev - 1, 0));
//   };

//   const handleNext = () => {
//     setPage((prev) => Math.min(prev + 1, 3)); // 4 pages: 0, 1, 2, 3
//   };

//   const renderChart = (index: number) => {
//     switch (index) {
//       case 0:
//         return <CashHighlight />;
//       case 1:
//         return <CashPosition />;
//       case 2:
//         return <FreeCashFlowChart />;
//       case 3:
//         return <CashFlowChart />;
//       case 4:
//         return <HighlightCashFlowChart />;
//       case 5:
//         return <CashFlowChart />;
//       case 6:
//         return <FreeCashFlowChart />;
//       case 7:
//         return <CashPosition />;
//       default:
//         return null;
//     }
//   };

//   const getChartIndexesForPage = (page: number) => {
//     return [page * 2, page * 2 + 1];
//   };

//   return (
//     <Grid container spacing={3}>
//       {/* Stat Cards */}
//       {/* ...Your MisStatCard code remains same... */}

//       {/* Graphs and Charts */}
//       <Grid item xs={12}>
//         <Box>
//           <Grid container spacing={2}>
//             {getChartIndexesForPage(page).map((chartIndex) => (
//               <Grid item xs={12} md={6} key={chartIndex}>
//                 {renderChart(chartIndex)}
//               </Grid>
//             ))}
//           </Grid>
//         </Box>

//         <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
//           <IconButton onClick={handlePrev} disabled={page === 0}>
//             <ArrowBackIosIcon />
//           </IconButton>
//           <IconButton onClick={handleNext} disabled={page === 3}>
//             <ArrowForwardIosIcon />
//           </IconButton>
//         </Box>
//       </Grid>

//       {/* Production Table */}
//       <Grid item xs={12}>
//         <ProductionTableFinancialCashFlowSheet />
//       </Grid>
//     </Grid>
//   );
// };


// Business Analytics FInal demo
//Audit

const CashFlow: FC = () => {
  const [page, setPage] = useState(0);

const handlePrev = () => {
  setPage((prev) => Math.max(prev - 1, 0)); // Do not go below 0
};

const handleNext = () => {
  setPage((prev) => Math.min(prev + 1, 3)); // Go up to page 3 (0 to 3 = 4 pages)
};


  return (
    <Grid container spacing={3}>
      {/* Stat Cards */}
      <Grid item xs={12} sm={6} md={3}>
        <MisStatCard
          title="Sales:Tonnage"
          subtitle="Cumulative"
          firstvalue="₹ 10.5 L"
          secondvalue="₹ 08.2 L"
          value="1.28%"
          trend={0.5}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <MisStatCard
          title="Sales:Cost"
          subtitle="Today's"
          firstvalue="₹ 10.5 L"
          secondvalue="₹ 08.2 L"
          value="1.28%"
          trend={0.5}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <MisStatCard
          title="Cost:Earnings"
          subtitle="Cumulative"
          firstvalue="₹ 1 L"
          secondvalue="₹ 10 L"
          value="10%"
          trend={0.5}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <MisStatCard
          title="Cost:Earnings"
          subtitle="Today's"
          firstvalue="₹ 1 L"
          secondvalue="₹ 10 L"
          value="10%"
          trend={0.5}
        />
      </Grid>

      {/* Graphs and Charts */}
      <Grid item xs={12}>
        <Box>
         <Grid container spacing={2}>
  {page === 0 && (
    <>
      <Grid item xs={12} md={6}><CashHighlight /></Grid>
      <Grid item xs={12} md={6}><CashPosition /></Grid>
    </>
  )}
  {page === 1 && (
    <>
      <Grid item xs={12} md={6}><FreeCashFlowChart /></Grid>
      <Grid item xs={12} md={6}><CashFlowChart /></Grid>
    </>
  )}
  {page === 2 && (
    <>
      <Grid item xs={12} md={6}><HighlightCashFlowChart /></Grid> {/* Replace with actual chart */}
      <Grid item xs={12} md={6}><CashFlowChart /></Grid>
    </>
  )}
  {page === 3 && (
    <>
      <Grid item xs={12} md={6}><FreeCashFlowChart /></Grid> {/* Replace with actual chart */}
      <Grid item xs={12} md={6}><CashPosition /></Grid>
    </>
  )}
</Grid>

        </Box>
       <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
  <IconButton onClick={handlePrev} disabled={page === 0}>
    <ArrowBackIosIcon />
  </IconButton>
  <IconButton onClick={handleNext} disabled={page === 3}>
    <ArrowForwardIosIcon />
  </IconButton>
</Box>

      </Grid>
      <Grid item xs={12}>
        {/* <ProductionTable /> */}
        {/* <ProductionProgressTable/>  mis */}
        <ProductionTableFinancialCashFlowSheet />
      </Grid>
    </Grid>
  );
};

const Production: FC = () => (
<Grid container spacing={3}>
  {/* Stat Cards */}
  <Grid item xs={12} sm={6} md={3}>
    <MisStatCard
      title="Sales:Cost"
      subtitle="Cumulative"
      firstvalue="₹ 10.5 L"
      secondvalue="₹ 08.2 L"
      value="1.28%"
      trend={0.5}
    />
  </Grid>
  <Grid item xs={12} sm={6} md={3}>
    <MisStatCard
      title="Sales:Cost"
      subtitle="Today's"
      firstvalue="₹ 10.5 L"
      secondvalue="₹ 08.2 L"
      value="1.28%"
      trend={0.5}
    />
  </Grid>
  <Grid item xs={12} sm={6} md={3}>
    <MisStatCard
      title="Earnings"
      subtitle="Cumulative"
      firstvalue="₹ 1 L"
      secondvalue="₹ 10 L"
      value="10%"
      trend={0.5}
    />
  </Grid>
  <Grid item xs={12} sm={6} md={3}>
    <MisStatCard
      title="Revenue"
      subtitle="Today's"
      firstvalue="₹ 1 L"
      secondvalue="₹ 10 L"
      value="10%"
      trend={0.5}
    />
  </Grid>

  {/* Graphs and Charts */}
  <Grid item xs={12} md={6}>
   {/* <CircularChart
   /> */}
  </Grid>
  <Grid item xs={12} md={6}>
   {/* <CircularChart
   title="Audit Meter"
   /> */}
    {/* <MeterChart
          title="Audit Meter"
        /> */}

  </Grid>
  <Grid item xs={12}>
    {/* <ProductionTable /> */}
    <ProductionTableAisAudit/>

  </Grid>
  {/* <Grid item xs={12}>
    <ProjectDetailChart/>
    
  </Grid> */}
</Grid>
);

const Operations: FC = () => (
<Grid container spacing={3}>
  {/* Stat Cards */}
  <Grid item xs={12} sm={6} md={3}>
    <MisStatCard
      title="Sales:Cost"
      subtitle="Cumulative"
      firstvalue="₹ 10.5 L"
      secondvalue="₹ 08.2 L"
      value="1.28%"
      trend={0.5}
    />
  </Grid>
  <Grid item xs={12} sm={6} md={3}>
    <MisStatCard
      title="Sales:Cost"
      subtitle="Today's"
      firstvalue="₹ 10.5 L"
      secondvalue="₹ 08.2 L"
      value="1.28%"
      trend={0.5}
    />
  </Grid>
  <Grid item xs={12} sm={6} md={3}>
    <MisStatCard
      title="Earnings"
      subtitle="Cumulative"
      firstvalue="₹ 1 L"
      secondvalue="₹ 10 L"
      value="10%"
      trend={0.5}
    />
  </Grid>
  <Grid item xs={12} sm={6} md={3}>
    <MisStatCard
      title="Revenues"
      subtitle="Today's"
      firstvalue="₹ 1 L"
      secondvalue="₹ 10 L"
      value="10%"
      trend={0.5}
    />
  </Grid>

  {/* Graphs and Charts */}
  <Grid item xs={12} md={6}>
   <BusinessVarienceChart/>

   
  </Grid>
  <Grid item xs={12} md={6}>
   {/* <CircularChart
   title="Audit Meter"
   /> */}
     <BusinessVarience/>


  </Grid>
  <Grid item xs={12}>
    {/* <ProductionTable /> */}
   <BusinessNodesFlow />

  </Grid>
  {/* <Grid item xs={12}>
    <ProjectDetailChart/>
    
  </Grid> */}
</Grid>
);

//business
const Finance: FC = () => {
  const [page, ] = useState(0);

  

  return (
    <Grid container spacing={3}>
      {/* Stat Cards */}
      <Grid item xs={12} sm={6} md={3}>
        <MisStatCard
          title="Sales:Cost"
          subtitle="Cumulative"
          firstvalue="₹ 10.5 L"
          secondvalue="₹ 08.2 L"
          value="1.28%"
          trend={0.5}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <MisStatCard
          title="Sales:Cost"
          subtitle="Today's"
          firstvalue="₹ 10.5 L"
          secondvalue="₹ 08.2 L"
          value="1.28%"
          trend={0.5}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <MisStatCard
          title="Earnings"
          subtitle="Cumulative"
          firstvalue="₹ 1 L"
          secondvalue="₹ 10 L"
          value="10%"
          trend={0.5}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <MisStatCard
          title="Revenue"
          subtitle="Today's"
          firstvalue="₹ 1 L"
          secondvalue="₹ 10 L"
          value="10%"
          trend={0.5}
        />
      </Grid>

      {/* Graphs and Charts */}
      <Grid item xs={12}>
        <Box>
          <Grid container spacing={2}>
            {page === 0 && (
              <>
                <Grid item xs={12} md={6}>
                 
                      <SensitivityHighlight/>

                </Grid>
                <Grid item xs={12} md={6}>
                 
                   <SensitivityStressCover />

                </Grid>
              </>
            )}
            {page === 1 && (
              <>
                <Grid item xs={12} md={6}>
               
                  <SensitivityStressCover />
                </Grid>
                <Grid item xs={12} md={6}>
                
                <SensitivityStressCover />

                </Grid>
              </>
            )}
          </Grid>
        </Box>
        {/* <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
          <IconButton onClick={handlePrev} disabled={page === 0}>
            <ArrowBackIosIcon />
          </IconButton>
          <IconButton onClick={handleNext} disabled={page === 1}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Box> */}
      </Grid>
      <Grid item xs={12}>



        {/* <ProductionTable /> */}
        {/* <ProductionProgressTable/>  mis */}
        {/* <ProductionTableAisIncome /> */}
        <BusinessSensitivityChart/>
      </Grid>
    </Grid>
  );
};

export {Revenues, Expenses,Profitability,IncomeStatement,BalanceSheet, CashFlow, Production, Operations, Finance };




