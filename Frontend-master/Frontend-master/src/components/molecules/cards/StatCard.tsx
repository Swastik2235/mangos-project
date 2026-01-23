import { FC } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
// import { TrendingUp, TrendingDown } from 'lucide-react';
// import PositiveGraphIconography from "../../../assets/PositiveGraphIconography.png";
// import NegativeGraphIconography from "../../../assets/NegativeGraphIconography.png";
import ArrowUp from "../../../assets/Arrow-Up_Square.png";
import ArrowDown from "../../../assets/Arrow-down_Square.png";
import { useLocation } from 'react-router-dom'; // Import useLocation
interface StatCardProps {
  title: string;
  value: string;
  trend: number;
  icon: React.ReactNode;
}

const StatCard: FC<StatCardProps> = ({ title, value, trend, icon }) => {
  const isPositive = trend >= 0;

  const location = useLocation(); // Get the current route
  const isProductDetailPage = location.pathname === "/productDetail"; // Check if the current page is /productDetail
  // const isProductDetailPageNew = location.pathname === "/productDetailNew";
  return (
    <Card sx={{ 
      boxShadow: `
        4px 4px 20px 0px #6F8CB069 ,
        -6px -6px 20px 0px #FFFFFF,
        2px 2px 4px 0px #728EAB1A 
      `,
      background: '#E7EBF0',
      }}
   >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box  sx={{
              mr: 1,
              color: 'primary.main',
              borderRadius: 50,
              boxShadow: `-2.5px -2.5px 5px 0px #FAFBFF inset`,
              p:0.5,
              width: 34,
              height: 34
            }}>{icon}</Box>

            <Typography variant="subtitle2" color="text.secondary">
              {title}
            </Typography>
          </Box>
          {/* <Box component="img" src={isPositive ? PositiveGraphIconography : NegativeGraphIconography} alt="Trend" sx={{ width: 40, height: 41 }} /> */}
          {!isProductDetailPage  && (
            <></>
            // <Box
            //   component="img"
            //   src={isPositive ? PositiveGraphIconography : NegativeGraphIconography}
            //   alt="Trend"
            //   sx={{ width: 40, height: 41 }}
            // />
          )}


        </Box>
        <Typography variant="h2" sx={{ mb: 1, fontWeight: 600 }}>
          {value}
        </Typography>
         {/* {isPositive ? (
            <TrendingUp size={16} color="green" />
          ) : (
            <TrendingDown size={16} color="red" />
          )} */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box component="img" src={isPositive ? ArrowUp : ArrowDown} alt="Trend" sx={{ width: 16, height: 16 }} />
         
          <Typography
            variant="body2"
            sx={{ ml: 0.5, color: isPositive ? 'success.main' : 'error.main' }}
          >
            {Math.abs(trend)}%
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatCard;