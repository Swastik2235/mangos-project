import { FC, useState, useEffect } from 'react';
import { Box, Grid, IconButton } from '@mui/material';
import MisStatCard from '../../components/molecules/cards/MisStatCard';
import ProductionChart from '../../components/features/ProductionChart';
import EarningsChart from '../../components/features/EarningChart';
import ProductionTable from '../../components/features/ProductionTable';
import ProductionFinanceTable from '../../components/features/ProductionFinanceTable';
import CircularChartMs from '../../components/features/CircularChartMs';
import OutgoingFinanceChart from '../../components/features/OutgoingFinanceChart';
import StatusChart from '../../components/features/StatusChart';
import StatusChart1 from '../../components/features/StatusChart1';
import ProductionProgressTable from '../../components/features/OperationTableHighlight/ProductionProgessTable';
import SalesChart from '../../components/features/SalesChart';
import CostChart from '../../components/features/CostChart';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import InputTable from '../../components/features/InputTable';
import { apiRequest } from '../../utils/apiclient';
import ProjectChart from '../../components/features/ProjectChart';
import PlantChart from '../../components/features/PlantChart';
import HighlightFinanceChart from '../../components/features/HighlightFinanceChart';
import BalanceFinanceChart from '../../components/features/BalanceFinanceChart';
import endpoints from "../../utils/apiEndPoints";
  



interface SalesCostData {
  total_sales: number;
  total_cost: number;
  ratio_percent: string;
  change: string;
  change_direction: 'up' | 'down';
}

interface EarningsSalesData {
  total_earnings: number;
  total_sales: number;
  ratio_percent: string;
  change: string;
  change_direction: 'up' | 'down';
}

interface TonnageData {
  total_sales_amt?: number;
  total_tonnage?: number;
  ratio?: number;
  ratio_percent?: string;
  change?: string;
  change_direction?: 'up' | 'down';
}

interface RevenueData {
  total_sales_amt: number;
  total_tonnage: number;
  ratio: number | null;
  ratio_percent: string;
  change: string;
  change_direction: 'up' | 'down';
}

interface CostEarningsData {
  total_cost_amt: number;
  total_earnings: number;
  ratio: number;
  ratio_percent: string;
  change: string;
  change_direction: 'up' | 'down';
}

interface TodaySalesCostData {
  total_sales_amt: number;
  total_cost_amt: number;
  ratio: number | null;
  ratio_percent: string;
  change: string;
  change_direction: 'up' | 'down';

}

const ProductionMis: FC = () => {
  const [statPage, setStatPage] = useState(0);
  const [chartPage, setChartPage] = useState(0);
  const [saleCostData, setSaleCostData] = useState<{
    today?: SalesCostData;
    cumulative?: SalesCostData;
  }>({});
  const [earningsData, setEarningsData] = useState<{
    today?: EarningsSalesData;
    cumulative?: EarningsSalesData;
  }>({});
  const [salesTonnageData, setSalesTonnageData] = useState<TonnageData | null>(null);
  const [revenueData, setRevenueData] = useState<RevenueData | null>(null);
  const [costEarningsData, setCostEarningsData] = useState<CostEarningsData | null>(null);
  const [todaySalesCostData, setTodaySalesCostData] = useState<TodaySalesCostData | null>(null);
  const [loading, setLoading] = useState({
    salesCostToday: true,
    salesCostCumulative: true,
    earningsToday: true,
    earningsCumulative: true,
    tonnage: true,
    revenue: true,
    costEarnings: true,
    todaySalesCost: true
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(value);
  };

  const calculateTrend = (change: string, direction: 'up' | 'down') => {
    const numericChange = parseFloat(change.replace('%', '')) || 0;
    return direction === 'up' ? numericChange : -numericChange;
  };

  const formatRatioPercent = (ratio: string) => {
    const num = parseFloat(ratio.replace('%', ''));
    return num.toLocaleString('en-IN') + '%';
  };

  const formatTonnage = (value: number) => {
    return `${value.toFixed(2)} Tons`;
  };


useEffect(() => {
  const fetchAllData = async () => {
    try {
      // Fetch Sales:Cost Data
      const [todaySalesCost, cumulativeSalesCost] = await Promise.all([
        apiRequest<{ status: boolean; data: SalesCostData }>(
          "GET",
          endpoints.getSalesCostRatioToday
        ),
        apiRequest<{ status: boolean; data: SalesCostData }>(
          "GET",
          endpoints.getSalesCostRatio
        )
      ]);

      if (todaySalesCost.status) {
        setSaleCostData(prev => ({ ...prev, today: todaySalesCost.data }));
      }
      if (cumulativeSalesCost.status) {
        setSaleCostData(prev => ({ ...prev, cumulative: cumulativeSalesCost.data }));
      }

      // Fetch Earnings:Sales Data
      const [todayEarningsSales, cumulativeEarningsSales] = await Promise.all([
        apiRequest<{ status: boolean; data: EarningsSalesData }>(
          "GET",
          endpoints.getEarningsSalesRatioToday
        ),
        apiRequest<{ status: boolean; data: EarningsSalesData }>(
          "GET",
          endpoints.getEarningsSalesRatio
        )
      ]); 

      if (todayEarningsSales.status) {
        setEarningsData(prev => ({ ...prev, today: todayEarningsSales.data }));
      }
      if (cumulativeEarningsSales.status) {
        setEarningsData(prev => ({ ...prev, cumulative: cumulativeEarningsSales.data }));
      }

      // Fetch Sales:Tonnage Data
      const tonnageResponse = await apiRequest<{
        status: boolean;
        data: TonnageData;
      }>(
        "GET",
        endpoints.getSalesTonnageRatio
      );

      if (tonnageResponse.status) {
        setSalesTonnageData(tonnageResponse.data);
      }

      // Fetch Today's Revenue Data
      const revenueResponse = await apiRequest<{
        status: boolean;
        data: RevenueData;
      }>(
        "GET",
        endpoints.getTodaysRevenue
      );

      if (revenueResponse.status) {
        setRevenueData(revenueResponse.data);
      }

      // Fetch Cost:Earnings Data
      const costEarningsResponse = await apiRequest<{
        status: boolean;
        data: CostEarningsData;
      }>(
        "GET",
        endpoints.getCostToEarningsRatio
      );

      if (costEarningsResponse.status) {
        setCostEarningsData(costEarningsResponse.data);
      }

      // Fetch Today's Sales:Cost Data for Cost:Tonnage card
      const todaySalesCostResponse = await apiRequest<{
        status: boolean;
        data: TodaySalesCostData;
      }>(
        "GET",
        endpoints.getTodaySalesCostRatio
      );

      if (todaySalesCostResponse.status) {
        setTodaySalesCostData(todaySalesCostResponse.data);
      }

    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading({
        salesCostToday: false,
        salesCostCumulative: false,
        earningsToday: false,
        earningsCumulative: false,
        tonnage: false,
        revenue: false,
        costEarnings: false,
        todaySalesCost: false
      });
    }
  };

  fetchAllData();
}, []);

  
  const handleStatPrev = () => setStatPage(0);
  const handleStatNext = () => setStatPage(1);
  const handleChartPrev = () => setChartPage(prev => Math.max(prev - 1, 0));
  const handleChartNext = () => setChartPage(prev => Math.min(prev + 1, 2));

  return (
    <Grid container spacing={3}>
      {/* First 4 Stat Cards */}
      {statPage === 0 && (
        <>
         <Grid container spacing={2} sx={{ ml: 0 ,p:2}}>
          <Grid item xs={12} sm={6} md={3}>
            <MisStatCard
              title="Sales:Cost"
              subtitle="Today's"
              firstvalue={loading.salesCostToday ? 'Loading...' : 
                formatCurrency(saleCostData.today?.total_sales || 0)}
              secondvalue={loading.salesCostToday ? 'Loading...' : 
                formatCurrency(saleCostData.today?.total_cost || 0)}
              value={loading.salesCostToday ? '...' : 
                `${saleCostData.today?.ratio_percent || '0'}%`}
              trend={loading.salesCostToday ? 0 : 
                calculateTrend(
                  saleCostData.today?.change || '0', 
                  saleCostData.today?.change_direction || 'up'
                )}
            />
          </Grid>
          {/* Sales:Cost Cumulative */}
          <Grid item xs={12} sm={6} md={3}>
            <MisStatCard
              title="Sales:Cost"
              subtitle="Cumulative"
              firstvalue={loading.salesCostCumulative ? 'Loading...' : 
                formatCurrency(saleCostData.cumulative?.total_sales || 0)}
              secondvalue={loading.salesCostCumulative ? 'Loading...' : 
                formatCurrency(saleCostData.cumulative?.total_cost || 0)}
              value={loading.salesCostCumulative ? '...' : 
                `${saleCostData.cumulative?.ratio_percent || '0'}%`}
              trend={loading.salesCostCumulative ? 0 : 
                calculateTrend(
                  saleCostData.cumulative?.change || '0', 
                  saleCostData.cumulative?.change_direction || 'up'
                )}
            />
          </Grid>
          {/* Earnings:Sales Cumulative */}
          <Grid item xs={12} sm={6} md={3}>
            <MisStatCard
              title="Earnings:Sales"
              subtitle="Cumulative"
              firstvalue={loading.earningsCumulative ? 'Loading...' : 
                formatCurrency(earningsData.cumulative?.total_earnings || 0)}
              secondvalue={loading.earningsCumulative ? 'Loading...' : 
                formatCurrency(earningsData.cumulative?.total_sales || 0)}
              value={loading.earningsCumulative ? '...' : 
                `${earningsData.cumulative?.ratio_percent || '0'}%`}
              trend={loading.earningsCumulative ? 0 : 
                calculateTrend(
                  earningsData.cumulative?.change || '0', 
                  earningsData.cumulative?.change_direction || 'up'
                )}
            />
          </Grid>
          {/* Earnings:Sales Today */}
          <Grid item xs={12} sm={6} md={3}>
            <MisStatCard
              title="Earnings:Sales"
              subtitle="Today's"
              firstvalue={loading.earningsToday ? 'Loading...' : 
                formatCurrency(earningsData.today?.total_earnings || 0)}
              secondvalue={loading.earningsToday ? 'Loading...' : 
                formatCurrency(earningsData.today?.total_sales || 0)}
              value={loading.earningsToday ? '...' : 
                `${earningsData.today?.ratio_percent || '0'}%`}
              trend={loading.earningsToday ? 0 : 
                calculateTrend(
                  earningsData.today?.change || '0', 
                  earningsData.today?.change_direction || 'up'
                )}
            />
          </Grid>
          </Grid>
        </>
      )}
      {/* Second 4 Stat Cards - Production specific */}
      {statPage === 1 && (
        <>
         <Grid container spacing={2} sx={{ ml: 0 ,p:2}}>
          <Grid item xs={12} sm={6} md={3}>
            <MisStatCard
              title="Sales:Tonnage"
              subtitle="Cumulative"
              firstvalue={loading.tonnage ? 'Loading...' : 
                salesTonnageData ? formatCurrency(salesTonnageData.total_sales_amt ?? 0) : '₹ 0'}
              secondvalue={loading.tonnage ? 'Loading...' : 
                salesTonnageData && salesTonnageData.total_tonnage !== undefined
                  ? formatTonnage(salesTonnageData.total_tonnage)
                  : '0 Tons'}
              value={loading.tonnage ? '...' : 
                salesTonnageData ? formatRatioPercent(salesTonnageData.ratio_percent ?? '0') : '0%'}
              trend={loading.tonnage ? 0 : 
                salesTonnageData ? calculateTrend(
                  salesTonnageData.change ?? '0',
                  salesTonnageData.change_direction ?? 'up'
                ) : 0}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MisStatCard
              title="Sales:Cost"
              subtitle="Today's"
              firstvalue={loading.todaySalesCost ? 'Loading...' : 
                todaySalesCostData ? formatCurrency(todaySalesCostData.total_sales_amt) : '₹ 0'}
              secondvalue={loading.todaySalesCost ? 'Loading...' : 
                todaySalesCostData ? formatCurrency(todaySalesCostData.total_cost_amt) : '₹ 0'}
              value={loading.todaySalesCost ? '...' : 
                todaySalesCostData ? 
                  (todaySalesCostData.ratio_percent !== 'undefined' ? 
                   formatRatioPercent(todaySalesCostData.ratio_percent) : '0%') : '0%'}
              trend={loading.todaySalesCost ? 0 : 
                todaySalesCostData ? calculateTrend(
                  todaySalesCostData.change,
                  todaySalesCostData.change_direction
                ) : 0}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MisStatCard
              title="Cost:Earnings"
              subtitle="Cumulative"
              firstvalue={loading.costEarnings ? 'Loading...' : 
                costEarningsData ? formatCurrency(costEarningsData.total_cost_amt) : '₹ 0'}
              secondvalue={loading.costEarnings ? 'Loading...' : 
                costEarningsData ? formatCurrency(costEarningsData.total_earnings) : '₹ 0'}
              value={loading.costEarnings ? '...' : 
                costEarningsData ? costEarningsData.ratio_percent : '0%'}
              trend={loading.costEarnings ? 0 : 
                costEarningsData ? calculateTrend(
                  costEarningsData.change,
                  costEarningsData.change_direction
                ) : 0}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MisStatCard
              title="Revenue"
              subtitle="Today's"
              firstvalue={loading.revenue ? 'Loading...' : 
                revenueData ? formatCurrency(revenueData.total_sales_amt) : '₹ 0'}
              secondvalue={loading.revenue ? 'Loading...' : 
                revenueData ? formatTonnage(revenueData.total_tonnage) : '0 Tons'}
              value={loading.revenue ? '...' : 
                revenueData ? formatRatioPercent(revenueData.ratio_percent) : '0%'}
              trend={loading.revenue ? 0 : 
                revenueData ? calculateTrend(
                  revenueData.change,
                  revenueData.change_direction
                ) : 0}
            />
          </Grid>
          </Grid>
        </>
      )}

      {/* Stat Cards Navigation */}
      <Grid item xs={12}>
        <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
          <IconButton onClick={handleStatPrev} disabled={statPage === 0}>
            <ArrowBackIosIcon />
          </IconButton>
          <IconButton onClick={handleStatNext} disabled={statPage === 1}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      </Grid>

      {/* Charts */}
      <Grid item xs={12}>
        <Box>
          <Grid container spacing={2}>
            {chartPage === 0 && (
              <>
                <Grid item xs={12} md={6}>
                  <ProductionChart />
                </Grid>
                <Grid item xs={12} md={6}>
                  <EarningsChart />
                </Grid>
              </>
            )}
            {chartPage === 1 && (
              <>
                <Grid item xs={12} md={6}>
                  <SalesChart />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CostChart />
                </Grid>
              </>
            )}
            {chartPage === 2 && (
              <>
                <Grid item xs={12} md={6}>
                  <SalesChart />
                </Grid>
                <Grid item xs={12} md={6}>
                  <EarningsChart />
                </Grid>
              </>
            )}
          </Grid>
        </Box>
        
        {/* Charts Navigation */}
        <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
          <IconButton onClick={handleChartPrev} disabled={chartPage === 0}>
            <ArrowBackIosIcon />
          </IconButton>
          <IconButton onClick={handleChartNext} disabled={chartPage === 2}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      </Grid>

      {/* Production Table */}
      <Grid item xs={12}>
        <ProductionTable />
      </Grid>
    </Grid>
  );
};

const OperationsMis: FC = () => {
  const [statPage, setStatPage] = useState(0);
  const [chartPage, setChartPage] = useState(0);
  // const [operationsStats] = useState([
  //   { title: "Productivity", value: "85%", trend: 1.2 },
  //   { title: "Efficiency", value: "92%", trend: 0.8 },
  //   { title: "Quality", value: "98%", trend: 0.5 },
  //   { title: "OEE", value: "76%", trend: -0.3 }
  // ]);

  const handleStatPrev = () => setStatPage(0);
  const handleStatNext = () => setStatPage(1);
  const handleChartPrev = () => setChartPage(prev => Math.max(prev - 1, 0));
  const handleChartNext = () => setChartPage(prev => Math.min(prev + 1, 3));

  return (
    <Grid container spacing={3} sx={{ p: 2 }}>
      {/* Stat Cards */}
      {statPage === 0 && (
        <Grid container spacing={2} sx={{ ml: 0, p: 2 }}>
          <Grid item xs={12} sm={6} md={3}>
            <MisStatCard
              title="Delivered:Total"
              subtitle="Projects"
              firstvalue="₹ 10 L"
              secondvalue="₹ 20 L"
              value="50%"
              trend={1.28}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MisStatCard
              title="Produced:Total"
              subtitle="Material"
              firstvalue="₹ 50MT"
              secondvalue="₹ 100MT"
              value="50%"
              trend={1.28}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MisStatCard
              title="Required:Total"
              subtitle="Manpower"
              firstvalue="₹ 50"
              secondvalue="₹ 100 L"
              value="50%"
              trend={10}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <MisStatCard
              title="Engaged:Total"
              subtitle="Machinery's"
              firstvalue="₹ 15 L"
              secondvalue="₹ 30 L"
              value="10%"
              trend={10}
            />
          </Grid>
        </Grid>
      )}
      
        {statPage === 1 && (
        <>
         <Grid container spacing={2} sx={{ ml: 0 ,p:2}}>
         <Grid item xs={12} sm={6} md={3}>
            <MisStatCard
              title="Sales:Cost"
              subtitle="Cumulative"
              firstvalue="₹ 10.5 L"
              secondvalue="₹ 0.82 L"
              value="1.28%"
              trend={1.28}
            />
          </Grid>
        <Grid item xs={12} sm={6} md={3}>
            <MisStatCard
              title="Sales:Cost"
              subtitle="Today's"
              firstvalue="₹ 10.5 L"
              secondvalue="₹ 08.2 L"
              value="1.28%"
              trend={1.28}
            />
          </Grid>
        <Grid item xs={12} sm={6} md={3}>
            <MisStatCard
              title="Earnings"
              subtitle="Cumulative"
              firstvalue="₹ 1L"
              secondvalue="₹ 10L"
              value="10%"
              trend={1.28}
            />
          </Grid>
      <Grid item xs={12} sm={6} md={3}>
            <MisStatCard
              title="Revenue"
              subtitle="Today's"
              firstvalue="₹ 50L"
              secondvalue="₹ 100L"
              value="50%"
              trend={1.28}
            />
          </Grid>
          </Grid>
        </>
      )}


      {/* Stat Cards Navigation */}
      <Grid item xs={12}>
        <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
          <IconButton onClick={handleStatPrev} disabled={statPage === 0}>
            <ArrowBackIosIcon />
          </IconButton>
          <IconButton onClick={handleStatNext} disabled={statPage === 1}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      </Grid>

      {/* Charts */}
      <Grid item xs={12}>
        <Box>
          <Grid container spacing={2}>
  {chartPage === 0 && (
    <>
      <Grid item xs={12} md={6}>
        <StatusChart title="Highlights" />
      </Grid>
      <Grid item xs={12} md={6}>
        <StatusChart1 />
      </Grid>
    </>
  )}
  {chartPage === 1 && (
    <>
      <Grid item xs={12} md={6}>
        <ProjectChart />
      </Grid>
      <Grid item xs={12} md={6}>
        <PlantChart />
      </Grid>
    </>
  )}
  {chartPage === 2 && (
    <>
      <Grid item xs={12} md={6}>
        <PlantChart />
      </Grid>
      <Grid item xs={12} md={6}>
        <ProjectChart />
      </Grid>
    </>
  )}
  {chartPage === 3 && (
    <>
      <Grid item xs={12} md={6}>
        <StatusChart1 />
      </Grid>
      <Grid item xs={12} md={6}>
        <ProjectChart />
      </Grid>
    </>
  )}
</Grid>

        </Box>

        {/* Charts Navigation */}
        <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
          <IconButton onClick={handleChartPrev} disabled={chartPage === 0}>
            <ArrowBackIosIcon />
          </IconButton>
         
          <IconButton onClick={handleChartNext} disabled={chartPage === 3}>
  <ArrowForwardIosIcon />
</IconButton>

        </Box>
      </Grid>

      {/* Production Table */}
      <Grid item xs={12}>
        <ProductionProgressTable />
      </Grid>
    </Grid>
  );
};

const FinanceMis: FC = () => {
  const [statPage, setStatPage] = useState(0);
  const [chartPage, setChartPage] = useState(0);
  // const [saleCostData] = useState({
  //   today_sales: "₹ 10.5 L",
  //   today_cost: "₹ 08.2 L",
  //   today_ratio: "1.28%",
  //   cumulative_sales: "₹ 10.5 L",
  //   cumulative_cost: "₹ 08.2 L",
  //   cumulative_ratio: "1.28%"
  // });
  // const [earningsData] = useState({
  //   today_earnings: "₹ 1 L",
  //   today_sales: "₹ 10 L",
  //   today_ratio: "10%",
  //   cumulative_earnings: "₹ 1 L",
  //   cumulative_sales: "₹ 10 L",
  //   cumulative_ratio: "10%"
  // });
  // const [additionalStats] = useState([
  //   { title: "Revenue Growth", value: "12%", trend: 1.5 },
  //   { title: "Profit Margin", value: "18%", trend: 0.7 },
  //   { title: "ROI", value: "22%", trend: 1.1 },
  //   { title: "Cash Flow", value: "₹5.2M", trend: -0.4 }
  // ]);

  const handleStatPrev = () => setStatPage(0);
  const handleStatNext = () => setStatPage(1);
  const handleChartPrev = () => setChartPage(prev => Math.max(prev - 1, 0));
const handleChartNext = () => setChartPage(prev => Math.min(prev + 1, 3));

  


 return (
    <Grid container spacing={3} sx={{ p: 2 }}>
      {/* Stat Cards */}
      {statPage === 0 && (
        <Grid container spacing={2} sx={{ ml: 0, p: 2 }}>
          <Grid item xs={12} sm={6} md={3}>
            <MisStatCard
              title="Sales:Cost"
              subtitle="Cumulative"
              firstvalue="₹ 10.5 L"
              secondvalue="₹ 0.82 L"
              value="1.28%"
              trend={1.28}
            />
          </Grid>
        <Grid item xs={12} sm={6} md={3}>
            <MisStatCard
              title="Sales:Cost"
              subtitle="Today's"
              firstvalue="₹ 10.5 L"
              secondvalue="₹ 08.2 L"
              value="1.28%"
              trend={1.28}
            />
          </Grid>
        <Grid item xs={12} sm={6} md={3}>
            <MisStatCard
              title="Earnings"
              subtitle="Cumulative"
              firstvalue="₹ 1L"
              secondvalue="₹ 10L"
              value="10%"
              trend={1.28}
            />
          </Grid>
      <Grid item xs={12} sm={6} md={3}>
            <MisStatCard
              title="Revenue"
              subtitle="Today's"
              firstvalue="₹ 50L"
              secondvalue="₹ 100L"
              value="50%"
              trend={1.28}
            />
          </Grid>
        </Grid>
      )}
      
        {statPage === 1 && (
        <>
         <Grid container spacing={2} sx={{ ml: 0 ,p:2}}>
         <Grid item xs={12} sm={6} md={3}>
            <MisStatCard
              title="Income:Total"
              subtitle="Cumulative"
              firstvalue="₹ 10.5 L"
              secondvalue="₹ 0.82 L"
              value="1.28%"
              trend={1.28}
            />
          </Grid>
        <Grid item xs={12} sm={6} md={3}>
            <MisStatCard
              title="Paid:Total"
              subtitle="Cumulative"
              firstvalue="₹ 10.5 L"
              secondvalue="₹ 08.2 L"
              value="1.28%"
              trend={1.28}
            />
          </Grid>
        <Grid item xs={12} sm={6} md={3}>
            <MisStatCard
              title="Bal-In:Total"
              subtitle="Cumulative"
              firstvalue="₹ 1L"
              secondvalue="₹ 10L"
              value="10%"
              trend={1.28}
            />
          </Grid>
      <Grid item xs={12} sm={6} md={3}>
            <MisStatCard
              title="Bal-Out:Total"
              subtitle="Cumulative"
              firstvalue="₹ 50L"
              secondvalue="₹ 100L"
              value="50%"
              trend={0.5}
            />
          </Grid>
          </Grid>
        </>
      )}


      {/* Stat Cards Navigation */}
      <Grid item xs={12}>
        <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
          <IconButton onClick={handleStatPrev} disabled={statPage === 0}>
            <ArrowBackIosIcon />
          </IconButton>
          <IconButton onClick={handleStatNext} disabled={statPage === 1}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      </Grid>

      {/* Charts */}
    <Grid item xs={12}>
        <Box>
          <Grid container spacing={2}>
            {chartPage === 0 && (
              <>
                <Grid item xs={12} md={6}>
                  <HighlightFinanceChart />
                </Grid>
                <Grid item xs={12} md={6}>
                  <BalanceFinanceChart />
                </Grid>
              </>
            )}
            {chartPage === 1 && (
              <>
                <Grid item xs={12} md={6}>
                  <CircularChartMs title="Incomming" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <OutgoingFinanceChart title="Outgoing" />
                </Grid>
              </>
            )}
            {chartPage === 2 && (
              <>
                <Grid item xs={12} md={6}>
                  <HighlightFinanceChart />
                </Grid>
                <Grid item xs={12} md={6}>
                  <OutgoingFinanceChart title="Outgoing" />
                </Grid>
              </>
            )}
            {chartPage === 3 && (
              <>
                <Grid item xs={12} md={6}>
                  <HighlightFinanceChart />
                </Grid>
                <Grid item xs={12} md={6}>
                  <BalanceFinanceChart />
                </Grid>
              </>
            )}
          </Grid>
        </Box>

        {/* Charts Navigation */}
        <Box display="flex" justifyContent="center" alignItems="center" mb={2}>
          <IconButton onClick={handleChartPrev} disabled={chartPage === 0}>
            <ArrowBackIosIcon />
          </IconButton>
          <IconButton onClick={handleChartNext} disabled={chartPage === 3}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      </Grid>

      {/* Production Table */}
      <Grid item xs={12}>
        <ProductionFinanceTable />
      </Grid>
    </Grid>
  );

};

const InputMis: FC = () => (
  <Grid container spacing={3}>
    <Grid item xs={12}>
      <InputTable />
    </Grid>
  </Grid>
);

export { ProductionMis, OperationsMis, FinanceMis, InputMis };