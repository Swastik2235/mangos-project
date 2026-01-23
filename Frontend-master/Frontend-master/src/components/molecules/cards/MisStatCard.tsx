import { FC } from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import ArrowUp from "../../../assets/Arrow-Up_Square.png";
import ArrowDown from "../../../assets/Arrow-down_Square.png";
import { PieChart, Pie, ResponsiveContainer, Cell } from "recharts";

interface StatCardProps {
  title: string;
  subtitle?: string;  // Made optional
  value: string;
  trend: number;
  firstvalue?: string;  // Made optional
  secondvalue?: string; // Made optional
}

const data = [
  { name: "Costs", value: 40 },
  { name: "Sales", value: 60 },
];

const COLORS = ["#A3B4A280", "#A3B4A240"]; 

const boxshadowchart = [
  "2.5px 2.5px 5px 0px #A7AABB80 inset",
  "inset -2.5px -2.5px 5px ", 
  "-1px 0px 2px 0px rgba(0, 0, 0, 0.15), -6px -6px 20px 0px #FFFFFF, 4px 4px 2px 0px rgba(111, 140, 176, 0.41)"
];

const MisStatCard: FC<StatCardProps> = ({ 
  title,
  subtitle = "", // Default value
  firstvalue = "", // Default value
  secondvalue = "", // Default value
  value, 
  trend 
}) => {
  const isPositive = trend >= 0;
  const hasTwoValues = firstvalue && secondvalue;

  return (
    <Card sx={{ 
      boxShadow: `
        4px 4px 20px 0px #6F8CB069 ,
        -6px -6px 20px 0px #FFFFFF,
        2px 2px 4px 0px #728EAB1A 
      `,
      background: '#E7EBF0',
    }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Box sx={{ display: 'block' }}>
            <Typography variant="h3" color="#262953">
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="h5" color="#262953">
                {subtitle}
              </Typography>
            )}
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography
              variant="body2"
              sx={{ ml: 0.5, color: isPositive ? 'success.main' : 'error.main',
                      mr: 1, // Add right margin here for spacing

               }}
            >
              {Math.abs(trend)}%
            </Typography>
            <Box component="img" src={isPositive ? ArrowUp : ArrowDown} alt="Trend" sx={{ width: 16, height: 16,
                    ml: 0.5, // Optional: add left margin if needed

             }} />
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {hasTwoValues ? (
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>
              <Box sx={{ display: 'block' }}>
                <Typography
                  variant="h4"
                  sx={{
                    mb: 0,
                    borderBottom: 2,
                    borderColor: '#000',
                  }}
                >
                  {firstvalue}
                </Typography>
                <Typography variant="h4" sx={{ mt: 0.5 }}>
                  {secondvalue}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="h4" sx={{ mb: 0.5, fontWeight: 600 }}>
                  &nbsp; = {value}
                </Typography>
              </Box>
            </Box>
          ) : (
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              {value}
            </Typography>
          )}

          {hasTwoValues && (
            <Box sx={{ width: 52, height: 50, mb: 1 }}>
<Typography variant='h5' sx={{ color: '#A7AABB', '& span': { mx: 0.5 } }}>
  Cost<span>|</span>Sales
</Typography>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={data}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={20}
                    innerRadius={0}
                    fill="#8884d8"
                    label={(entry) => <text fill="#000" fontSize="12">{entry.value}</text>}
                    labelLine={false}
                  >
                    {data.map((_, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]}
                        style={{
                          boxShadow: boxshadowchart[index % boxshadowchart.length],
                          border: '1px solid #ededed'
                        }} 
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default MisStatCard;