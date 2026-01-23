import React, { useState, useEffect, useCallback } from 'react';
import {
    Card,
    CardContent,
    Typography,
    Box,
    Select,
    MenuItem,
    IconButton,
    SelectChangeEvent,
    Dialog,
    DialogContent,
    FormControl,
    // InputLabel,
    CircularProgress,
} from '@mui/material';
import {
    ComposedChart,
    Bar,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import { apiRequest } from '../../utils/apiclient';
import endpoints from '../../utils/apiEndPoints';

interface ProductionData {
    day: number;
    fabrication: number;
    galvanization: number;
    scrap: number;
    critical: number;
    manpower: number;
    consumables: number;
    total: number;
    production_date?: string;
    daily_total_mt?: number;
    quantity_own_zinc?: string | number;
    quantity_job_work?: string | number;
    own_steel_towers_quantity?: string | number;
    job_work_towers_quantity?: string | number;
}

interface SalesData {
    day: string;
    sales_quantity: number;
    cost_quantity: number;
    profit: number;
}

interface ApiResponse<T> {
    status: string | boolean;
    data: T;
    message?: string;
    success?: boolean;
}

const ProductionChart: React.FC = () => {
    const [view, setView] = useState('Sales');
    const [category, setCategory] = useState('Fabrication Total');
    const [openFullscreen, setOpenFullscreen] = useState(false);
    const [fabrication, setFabrication] = useState<ProductionData[]>([]);
    const [galvanizationData, setGalvanizationData] = useState<ProductionData[]>([]);
    const [solarData, setSolarData] = useState<ProductionData[]>([]);
    const [chartData, setChartData] = useState<(ProductionData | SalesData)[]>([]);
    const [loading, setLoading] = useState(true);

    const handleViewChange = (event: SelectChangeEvent) => setView(event.target.value);
    const handleCategoryChange = (event: SelectChangeEvent) => setCategory(event.target.value);
    const toggleFullscreen = () => setOpenFullscreen(prev => !prev);

    const generateProductionData = (): ProductionData[] => Array.from({ length: 15 }, (_, i) => ({
        day: i + 1,
        fabrication: Math.random() * 10 + 5,
        galvanization: Math.random() * 8 + 4,
        scrap: Math.random() * 6 + 2,
        critical: -(Math.random() * 8 + 4),
        manpower: -(Math.random() * 6 + 3),
        consumables: -(Math.random() * 4 + 2),
        total: Math.random() * 20 - 10,
    }));

    const fetchSalesData = useCallback(async () => {
        try {
            setLoading(true);
            const response = await apiRequest<ApiResponse<SalesData[]>>(
                "GET",
                endpoints.getTotalProductionChartData
            );

            if ((response.status === true || response.success) && response.data) {
                setChartData(response.data);
            } else {
                console.error("Failed to fetch sales data:", response.message);
                setChartData(generateProductionData());
            }
        } catch (error) {
            console.error("Error fetching sales data:", error);
            setChartData(generateProductionData());
        } finally {
            setLoading(false);
        }
    }, []);

    const Getfabrication = useCallback(async () => {
        try {
            setLoading(true);
            const response = await apiRequest<ApiResponse<ProductionData[]>>(
                "GET",
                endpoints.getTotalProductionFabrication
            );
            if (response.success && response.data) {
                setFabrication(response.data);
            } else {
                console.error("Failed to fetch fabrication data:", response.message);
                setFabrication(generateProductionData());
            }
        } catch (error) {
            console.error("Error fetching fabrication data:", error);
            setFabrication(generateProductionData());
        } finally {
            setLoading(false);
        }
    }, []);

    const GetGalvanizationData = useCallback(async () => {
        try {
            setLoading(true);
            const response = await apiRequest<ApiResponse<ProductionData[]>>(
                "GET",
                endpoints.getTotalProductionGalva
            );
            if (response.success && response.data) {
                setGalvanizationData(response.data);
            } else {
                console.error("Failed to fetch galvanization data:", response.message);
                setGalvanizationData(generateProductionData());
            }
        } catch (error) {
            console.error("Error fetching galvanization data:", error);
            setGalvanizationData(generateProductionData());
        } finally {
            setLoading(false);
        }
    }, []);

    const GetSolarData = useCallback(async () => {
        try {
            setLoading(true);
            const response = await apiRequest<ApiResponse<ProductionData[]>>(
                "GET",
                endpoints.getTotalProductionSolar
            );
            if (response.success && response.data) {
                setSolarData(response.data);
            } else {
                console.error("Failed to fetch solar data:", response.message);
                setSolarData(generateProductionData());
            }
        } catch (error) {
            console.error("Error fetching solar data:", error);
            setSolarData(generateProductionData());
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (view === "Production") {
            if (category === "Fabrication Total") {
                Getfabrication();
            } else if (category === "Galvanization") {
                GetGalvanizationData();
            } else if (category === "Solar") {
                GetSolarData();
            }
        } else if (view === "Sales") {
            fetchSalesData();
        }
    }, [view, category, Getfabrication, GetGalvanizationData, GetSolarData, fetchSalesData]);

    useEffect(() => {
        let processedData: (ProductionData | SalesData)[] = [];

        if (view === "Production") {
            if (category === "Fabrication Total") {
                processedData = fabrication
                    .map(item => ({
                        ...item,
                        production_date: item.production_date,
                        daily_total_mt: Number(item.daily_total_mt || 0),
                    }))
                    .filter(item => item.production_date);
            } else if (category === "Galvanization") {
                processedData = galvanizationData
                    .map(item => ({
                        ...item,
                        production_date: item.production_date,
                        daily_total_mt: Number(item.quantity_own_zinc || 0) + Number(item.quantity_job_work || 0),
                    }))
                    .filter(item => item.production_date);
            } else if (category === "Solar") {
                processedData = solarData
                    .map(item => ({
                        ...item,
                        production_date: item.production_date,
                        daily_total_mt: item.daily_total_mt 
                            ? Number(item.daily_total_mt)
                            : Number(item.own_steel_towers_quantity || 0) + Number(item.job_work_towers_quantity || 0),
                    }))
                    .filter(item => item.production_date);
            } else {
                processedData = generateProductionData();
            }
            setChartData(processedData);
        }
    }, [fabrication, galvanizationData, solarData, view, category]);

    const renderChart = () => {
        const xAxisDataKey = view === "Sales" 
            ? "day" 
            : ["Fabrication Total", "Galvanization", "Solar"].includes(category) 
                ? "production_date" 
                : "day";

        return (
            <ComposedChart
                data={view === "Sales" ? chartData as SalesData[] : chartData as ProductionData[]}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey={xAxisDataKey}
                    interval={0}
                    angle={-45}
                    textAnchor="end"
                    dy={10}
                    tick={{ fontSize: 11 }}
                />
                <YAxis label={{ 
                    value: view === "Sales" ? 'Quantity/Profit' : 'Production (MT)', 
                    angle: -90, 
                    position: 'insideLeft' 
                }} />
                <Tooltip wrapperStyle={{ fontSize: '12px' }} />
                <Legend wrapperStyle={{ fontSize: '12px', color: '#64748b' }} />

                {view === "Sales" ? (
                    <>
                    <Bar dataKey="sales_quantity" fill="#2563eb" name="Sales Quantity" />
                    <Bar dataKey="cost_quantity" fill="#f97316" name="Cost Quantity" />
                    <Line type="monotone" dataKey="profit" stroke="#22c55e" strokeWidth={2} dot={{ r: 4 }} name="Profit" />
                    </>
                ) : view === "Production" && category === "Fabrication Total" ? (
                    <Bar dataKey="daily_total_mt" fill="#2563eb" name="Fabrication Total (MT)" />
                ) : view === "Production" && category === "Galvanization" ? (
                    <Bar dataKey="daily_total_mt" fill="#60a5fa" name="Galvanization (MT)" />
                ) : view === "Production" && category === "Solar" ? (
                    <Bar dataKey="daily_total_mt" fill="#93c5fd" name="Solar (MT)" />
                ) : (
                    <>
                        <Bar dataKey="fabrication" stackId="a" fill="#2563eb" name="Fabrication" />
                        <Bar dataKey="galvanization" stackId="a" fill="#3b82f6" name="Galvanization" />
                        <Bar dataKey="scrap" stackId="a" fill="#60a5fa" name="Scrap" />
                        <Bar dataKey="critical" stackId="a" fill="#f97316" name="Critical" />
                        <Bar dataKey="manpower" stackId="a" fill="#fb923c" name="Manpower" />
                        <Bar dataKey="consumables" stackId="a" fill="#fdba74" name="Consumables" />
                        <Line type="monotone" dataKey="total" stroke="#22c55e" strokeWidth={2} dot={{ r: 4 }} name="Total" />
                    </>
                )}
            </ComposedChart>
        );
    };

    return (
        <Card sx={{
            borderRadius: 2,
            boxShadow: `
                4px 4px 20px 0px #6F8CB069,
                -6px -6px 20px 0px #FFFFFF,
                2px 2px 4px 0px #728EAB1A
            `,
            background: "#E7EBF0",
        }}>
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h3" component="h2" sx={{ color: '#1e293b', fontWeight: 600 }}>
                        Total Production
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2 , overflowX: 'auto',flexWrap: 'nowrap' }}>
                        <FormControl sx={{ m: 1, Width: 80 }}>
                            {/* <InputLabel id="view-select-label">View</InputLabel> */}
                            <Select
                                labelId="view-select-label"
                                value={view}
                                onChange={handleViewChange}
                                size="small"
                                sx={{ bgcolor: '#E7EBF0', boxShadow: '4px 4px 20px 0px #6F8CB069, -6px -6px 20px 0px #FFFFFF, 2px 2px 4px 0px #728EAB1A' }}
                            >
                                <MenuItem value="Sales">Sales</MenuItem>
                                <MenuItem value="Production">Production</MenuItem>
                            </Select>
                        </FormControl>
                       <FormControl sx={{ m: 1, width: 110 }}>   {/* <-- Fixed width */}
                            {/* <InputLabel id="category-select-label">Category</InputLabel> */}
                            <Select
                                labelId="category-select-label"
                                value={category}
                                onChange={handleCategoryChange}
                                size="small"
                                disabled={view !== 'Production'}
                                sx={{
                                bgcolor: '#E7EBF0',
                                boxShadow: '4px 4px 20px 0px #6F8CB069, -6px -6px 20px 0px #FFFFFF, 2px 2px 4px 0px #728EAB1A',
                                width: '100%',                  // <-- Important to make select fill FormControl width
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',      // <-- Truncate long text with ...
                                }}
                            >
                                <MenuItem value="Fabrication Total">Fabrication Total</MenuItem>
                                <MenuItem value="Galvanization">Galvanization</MenuItem>
                                <MenuItem value="Production Total">Production Total</MenuItem>
                                <MenuItem value="Fabrication + Galvanization">Fabrication + Galvanization</MenuItem>
                                <MenuItem value="Solar">Solar</MenuItem>
                            </Select>
                            </FormControl>

                        <IconButton onClick={toggleFullscreen}>
                            <FullscreenIcon />
                        </IconButton>
                    </Box>
                </Box>

                <Box sx={{ height: 400, width: '100%', mt: 2 }}>
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <ResponsiveContainer>
                            {renderChart()}
                        </ResponsiveContainer>
                    )}
                </Box>

                <Dialog
                    open={openFullscreen}
                    onClose={toggleFullscreen}
                    fullWidth
                    maxWidth="md"
                >
                    <DialogContent sx={{ height: '80vh' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            {renderChart()}
                        </ResponsiveContainer>
                    </DialogContent>
                </Dialog>
            </CardContent>
        </Card>
    );
};

export default ProductionChart;