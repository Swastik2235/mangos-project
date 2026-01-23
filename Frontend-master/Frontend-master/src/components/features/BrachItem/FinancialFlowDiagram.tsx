// import React from 'react';
// import { FlowConnection } from './FlowConnection';
// import { Maximize2 } from 'lucide-react';

// interface FlowItem {
//   label: string;
//   value: number;
//   growth: string;
//   color?: string;
// }

// interface CenterValues {
//   netProfitLoss: number;
//   netAmount: number;
//   netCost: number;
// }

// const FinancialFlowDiagram: React.FC = () => {
//   const data: { centerValues: CenterValues; leftFlows: FlowItem[]; rightFlows: FlowItem[] } = {
//     centerValues: {
//       netProfitLoss: 980123,
//       netAmount: 980123,
//       netCost: 980123
//     },
//     leftFlows: [
//       { label: 'Sales', value: 2356, growth: '+10.74%' },
//       { label: 'Indirect income', value: 2356, growth: '+10.74%' },
//       { label: 'Others', value: 2356, growth: '+10.74%' },
//       { label: 'Opening stock', value: 2356, growth: '+10.74%' }
//     ],
//     rightFlows: [
//       { label: 'Profit/loss', value: 2356, growth: '+10.74%', color: '#22c55e' },
//       { label: 'Purchase account', value: 2356, growth: '+10.74%', color: '#8B4513' },
//       { label: 'Direct Expenses', value: 2356, growth: '+10.74%', color: '#8B4513' },
//       { label: 'Indirect Expenses', value: 2356, growth: '+10.74%', color: '#8B4513' },
//       { label: 'Closing stock', value: 2356, growth: '+10.74%', color: '#8B4513' }
//     ]
//   };

//   const formatNumber = (num: number) => new Intl.NumberFormat('en-US').format(num);

//   const FlowItem: React.FC<{ flow: FlowItem; align: 'left' | 'right' }> = ({ flow, align }) => (
//     <div className={`flex flex-col ${align === 'right' ? 'items-end' : 'items-start'}`}>
//       <div className="flex items-center gap-2 mb-1">
//         <span className="font-semibold">{formatNumber(flow.value)}</span>
//         <span className="text-green-500 text-sm flex items-center">
//           <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
//             <path d="M8 12l4-4 4 4" />
//           </svg>
//           {flow.growth}
//         </span>
//       </div>
//       <span className="text-gray-600">{flow.label}</span>
//     </div>
//   );

//   return (
//     <div className="w-full max-w-6xl mx-auto bg-gray-50 p-8 rounded-xl">
//       <div className="flex items-center gap-2 mb-6">
//         <div className="grid grid-cols-3 gap-1 w-6 h-6">
//           {[...Array(9)].map((_, i) => (
//             <div key={i} className="bg-gray-900 rounded-sm" />
//           ))}
//         </div>
//         <h2 className="text-2xl font-semibold">Highlights</h2>
//         <div className="ml-auto flex gap-2">
//           <button className="px-4 py-1 bg-white rounded-lg shadow text-sm">
//             Title 1 ▼
//           </button>
//           <button className="px-4 py-1 bg-white rounded-lg shadow text-sm">
//             Title 1 ▼
//           </button>
//           <button className="p-1 border border-gray-200 rounded">
//             <Maximize2 className="w-5 h-5" />
//           </button>
//         </div>
//       </div>

//       <div className="relative min-h-[600px] flex justify-center items-center">
//         <div className="absolute left-0 space-y-12 w-64 top-1/2 -translate-y-1/2">
//           {data.leftFlows.map((flow, index) => (
//             <div key={index} className="relative">
//               <FlowItem flow={flow} align="left" />
//             </div>
//           ))}
//         </div>

//         <div className="bg-white rounded-lg shadow-lg z-10 w-64">
//           <div className="border border-green-500 rounded-lg p-4">
//             <div className="text-center mb-3">
//               <div className="text-gray-600 text-sm">Net Profit/Loss</div>
//               <div className="font-bold text-xl">{formatNumber(data.centerValues.netProfitLoss)}</div>
//             </div>
//             <div className="text-center border-t border-b border-gray-200 py-3 mb-3">
//               <div className="text-gray-600 text-sm">Net Amount</div>
//               <div className="font-bold text-xl">{formatNumber(data.centerValues.netAmount)}</div>
//             </div>
//             <div className="text-center">
//               <div className="text-gray-600 text-sm">Net Cost</div>
//               <div className="font-bold text-xl">{formatNumber(data.centerValues.netCost)}</div>
//             </div>
//           </div>
//         </div>

//         <div className="absolute right-0 space-y-12 w-64 top-1/2 -translate-y-1/2">
//           {data.rightFlows.map((flow, index) => (
//             <div key={index} className="relative">
//               <FlowItem flow={flow} align="right" />
//             </div>
//           ))}
//         </div>

//         <div className="absolute inset-0">
//           {data.leftFlows.map((_, index) => (
//             <FlowConnection
//               key={`left-${index}`}
//               position={index}
//               color="#047857"
//               type="line"
//               reversed={false}
//               centerY={240}
//             />
//           ))}
//           {data.rightFlows.map((flow, index) => (
//             <FlowConnection
//               key={`right-${index}`}
//               position={index}
//               color={flow.color || '#8B4513'}
//               type="arrow"
//               reversed={true}
//               centerY={240}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FinancialFlowDiagram;
import React from 'react';
import { useState } from 'react';
import {
  Select,
  MenuItem,
  IconButton,
  SelectChangeEvent
} from '@mui/material';
import { Box, Typography,  Card, CardContent, Divider } from '@mui/material';
// import { Maximize2 } from 'lucide-react';
import FullscreenIcon from '@mui/icons-material/Fullscreen';

// import { FlowConnection } from './FlowConnection';

interface FlowItem {
  label: string;
  value: number;
  growth: string;
  color?: string;
}

const formatNumber = (num: number) => new Intl.NumberFormat('en-US').format(num);

const FlowItem: React.FC<{ flow: FlowItem; align: 'left' | 'right' }> = ({ flow, align }) => (
  <Box display="flex" flexDirection="column" alignItems={align === 'right' ? 'flex-end' : 'flex-start'}>
    <Box display="flex" alignItems="center" gap={1} mb={1}>
      <Typography fontWeight="bold">{formatNumber(flow.value)}</Typography>
      <Typography color="green" fontSize="small">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 12l4-4 4 4" />
        </svg>
        {flow.growth}
      </Typography>
    </Box>
    <Typography color="textSecondary">{flow.label}</Typography>
  </Box>
);

const FinancialFlowDiagram: React.FC = () => {
  const [category, setCategory] = useState('Fabrication Total');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const data = {
    centerValues: {
      netProfitLoss: 980123,
      netAmount: 980123,
      netCost: 980123,
    },
    leftFlows: [
      { label: 'Sales', value: 2356, growth: '+10.74%' },
      { label: 'Indirect income', value: 2356, growth: '+10.74%' },
      { label: 'Others', value: 2356, growth: '+10.74%' },
      { label: 'Opening stock', value: 2356, growth: '+10.74%' },
    ],
    rightFlows: [
      { label: 'Profit/loss', value: 2356, growth: '+10.74%', color: '#22c55e' },
      { label: 'Purchase account', value: 2356, growth: '+10.74%', color: '#8B4513' },
      { label: 'Direct Expenses', value: 2356, growth: '+10.74%', color: '#8B4513' },
      { label: 'Indirect Expenses', value: 2356, growth: '+10.74%', color: '#8B4513' },
      { label: 'Closing stock', value: 2356, growth: '+10.74%', color: '#8B4513' },
    ],
  };

  return (
    <Card
    sx={{
      borderRadius: 2,
      boxShadow: `
      4px 4px 20px 0px #6F8CB069,
      -6px -6px 20px 0px #FFFFFF,
      2px 2px 4px 0px #728EAB1A
      `,
      background: '#E7EBF0',
    }}
  >

   
    <CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="h3" component="h2" sx={{ color: '#1e293b', fontWeight: 600 }}>
          Highlight
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
       
          <Select
            value={category}
            onChange={handleCategoryChange}
            size="small"
            sx={{ minWidth: 160, bgcolor: '#E7EBF0', boxShadow: '4px 4px 20px 0px #6F8CB069, -6px -6px 20px 0px #FFFFFF, 2px 2px 4px 0px #728EAB1A' }}
          >
            <MenuItem value="Fabrication Total">Fabrication Total</MenuItem>
            <MenuItem value="Production Total">Production Total</MenuItem>
          </Select>
          <IconButton onClick={toggleFullscreen}>
            <FullscreenIcon />
          </IconButton>
        </Box>
      </Box>

      <Box position="relative"top="8%" height={440}  display="flex" justifyContent="center" alignItems="center">
        {/* Left Side */}
        {/* <Box position="absolute" left={0} top="8%" transform="translateY(-50%)" width={200} display="flex" flexDirection="column" gap={4}>
          {data.leftFlows.map((flow, index) => (
            <FlowItem key={index} flow={flow} align="left" />
          ))}
        </Box> */}
        <Box
        position="absolute"
        left={0}
        top="45%"
        sx={{
          transform: "translateY(-50%)",
          width: 200,
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        {data.leftFlows.map((flow, index) => (
          <FlowItem key={index} flow={flow} align="left" />
        ))}
      </Box>


       
        {/* Center Card */}
        <Card sx={{ zIndex: 1, width: 150 , bgcolor:'#E7EBF0' , border:'1px solidrgb(162, 162, 162)'}}>
          <CardContent>
            <Typography variant="body2" align="center" color="textSecondary">
              Net Profit/Loss
            </Typography>
            <Typography variant="h6" align="center">
              {formatNumber(data.centerValues.netProfitLoss)}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body2" align="center" color="textSecondary">
              Net Amount
            </Typography>
            <Typography variant="h6" align="center">
              {formatNumber(data.centerValues.netAmount)}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body2" align="center" color="textSecondary">
              Net Cost
            </Typography>
            <Typography variant="h6" align="center">
              {formatNumber(data.centerValues.netCost)}
            </Typography>
          </CardContent>
        </Card>

        {/* Right Side */}
        {/* <Box position="absolute" right={0} top="8%" transform="translateY(-50%)" width={200} display="flex" flexDirection="column" gap={4}>
          {data.rightFlows.map((flow, index) => (
            <FlowItem key={index} flow={flow} align="right" />
          ))}
        </Box> */}
        
        <Box
          component="div"
          position="absolute"
          right={0}
          top="50%"
          sx={{
            transform: "translateY(-50%)",
            width: 200,
            display: "flex",
            flexDirection: "column",
            gap: 4,
          }}
        >
          {data.rightFlows.map((flow, index) => (
            <FlowItem key={index} flow={flow} align="right" />
          ))}
        </Box>

        {/* Connection Lines */}
      
        {/* <Box position="absolute" top={60} left={335} width="100%" height="100%">
          {data.rightFlows.map((flow, index) => (
            <FlowConnection key={`right-${index}`} position={index} color={flow.color || '#8B4513'} type="arrow" reversed centerY={240} />
          ))}
        </Box>
        <Box position="absolute" top={40} left={10} width="100%" height="100%">
          {data.leftFlows.map((_, index) => (
            <FlowConnection key={`left-${index}`} position={index} color="#047857" type="line" reversed={false} centerY={240} />
          ))}
        </Box> */}

        
      </Box>
      </CardContent>
    </Card>
  );
};

export default FinancialFlowDiagram;
