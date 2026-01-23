// // // import React, { useState } from 'react';
// // // import { Sankey, Tooltip, ResponsiveContainer } from 'recharts';
// // // import {
// // //   Card,
// // //   CardContent,
// // //   Typography,
// // //   Box,
// // //   Select,
// // //   MenuItem,
// // //   IconButton,
// // //   SelectChangeEvent
// // // } from '@mui/material';
// // // import FullscreenIcon from '@mui/icons-material/Fullscreen';

// // // const sankeyData = {
// // //   nodes: [
// // //     { name: 'Sales' },               // 0
// // //     { name: 'Indirect income' },     // 1
// // //     { name: 'Others' },              // 2
// // //     { name: 'Opening stock' },       // 3
// // //     { name: 'Net Amount' },          // 4 (center)
// // //     { name: 'Profit/loss' },         // 5
// // //     { name: 'Purchase account' },    // 6
// // //     { name: 'Direct Expenses' },     // 7
// // //     { name: 'Indirect Expenses' },   // 8
// // //     { name: 'Closing stock' }        // 9
// // //   ],
// // //   links: [
// // //     // Left side (Income → Net Amount)
// // //     { source: 0, target: 4, value: 2356 },
// // //     { source: 1, target: 4, value: 2356 },
// // //     { source: 2, target: 4, value: 2356 },
// // //     { source: 3, target: 4, value: 2356 },

// // //     // Right side (Net Amount → Outcome)
// // //     { source: 4, target: 5, value: 2356 },  // Profit/loss
// // //     { source: 4, target: 6, value: 2356 },  // Purchase account
// // //     { source: 4, target: 7, value: 2356 },  // Direct Expenses
// // //     { source: 4, target: 8, value: 2356 },  // Indirect Expenses
// // //     { source: 4, target: 9, value: 2356 }   // Closing stock
// // //   ]
// // // };


// // // const renderLink = (props: any) => {
// // //   const { source, target, value, percent, path } = props;

// // //   // Provide fallback values to avoid returning null
// // //   const safeSource = source || { x1: 0, y1: 0 };
// // //   const safeTarget = target || { x0: 0, y0: 0, name: '' };
// // //   const safePath = path || '';
// // //   const safeValue = value ?? '';
// // //   const safePercent = percent ?? '';

// // //   const color = safeTarget.name === 'Profit/loss' ? '#28A745' : '#7B3F00';

// // //   return (
// // //     <g>
// // //       <path
// // //         d={safePath}
// // //         stroke={color}
// // //         strokeWidth={26}
// // //         opacity={0.9}
// // //         fill="none"
// // //       />
// // //       <text
// // //         x={(safeSource.x1 + safeTarget.x0) / 2}
// // //         y={(safeSource.y1 + safeTarget.y0) / 2}
// // //         fill="#222"
// // //         fontSize={14}
// // //         fontWeight={600}
// // //         textAnchor="middle"
// // //         alignmentBaseline="middle"
// // //       >
// // //         {safeValue} <tspan fontSize={12} fill="#43a047">{safePercent}</tspan>
// // //       </text>
// // //     </g>
// // //   );
// // // };

// // // const renderNode = (props: any) => {
// // //   if (props.name === 'Net Amount') {
// // //     return (
// // //       <g>
// // //         <rect
// // //           x={props.x0 - 10}
// // //           y={props.y0}
// // //           width={props.x1 - props.x0 + 20}
// // //           height={props.y1 - props.y0}
// // //           fill="#fff"
// // //           stroke="#28A745"
// // //           strokeWidth={2}
// // //           rx={12}
// // //         />
// // //         <text x={(props.x0 + props.x1) / 2} y={props.y0 + 30} textAnchor="middle" fontWeight={700} fontSize={18} fill="#222">
// // //           Net Profit/Loss
// // //         </text>
// // //         <text x={(props.x0 + props.x1) / 2} y={props.y0 + 55} textAnchor="middle" fontWeight={600} fontSize={16} fill="#222">
// // //           980123
// // //         </text>
// // //         <text x={(props.x0 + props.x1) / 2} y={props.y0 + 80} textAnchor="middle" fontWeight={600} fontSize={16} fill="#222">
// // //           Net Amount
// // //         </text>
// // //         <text x={(props.x0 + props.x1) / 2} y={props.y0 + 105} textAnchor="middle" fontWeight={600} fontSize={16} fill="#222">
// // //           980123
// // //         </text>
// // //         <text x={(props.x0 + props.x1) / 2} y={props.y0 + 130} textAnchor="middle" fontWeight={600} fontSize={16} fill="#222">
// // //           Net Cost
// // //         </text>
// // //         <text x={(props.x0 + props.x1) / 2} y={props.y0 + 155} textAnchor="middle" fontWeight={600} fontSize={16} fill="#222">
// // //           980123
// // //         </text>
// // //       </g>
// // //     );
// // //   }

// // //   return (
// // //     <g>
// // //       <rect
// // //         x={props.x0}
// // //         y={props.y0}
// // //         width={props.x1 - props.x0}
// // //         height={props.y1 - props.y0}
// // //         fill="#fff"
// // //         stroke="#bbb"
// // //       />
// // //       <text
// // //         x={props.x1 + 8}
// // //         y={(props.y0 + props.y1) / 2}
// // //         textAnchor="start"
// // //         alignmentBaseline="middle"
// // //         fontWeight={600}
// // //         fontSize={16}
// // //         fill="#1e293b"
// // //       >
// // //         {props.name}
// // //       </text>
// // //     </g>
// // //   );
// // // };

// // // const FinanceHighChart: React.FC = () => {
// // //   const [category, setCategory] = useState('Fabrication Total');
// // //   const [isFullscreen, setIsFullscreen] = useState(false);

// // //   const handleCategoryChange = (event: SelectChangeEvent) => {
// // //     setCategory(event.target.value);
// // //   };

// // //   const toggleFullscreen = () => {
// // //     setIsFullscreen(!isFullscreen);
// // //   };

// // //   return (
// // //     <Card
// // //       sx={{
// // //         borderRadius: 2,
// // //         boxShadow: `
// // //           4px 4px 20px 0px #6F8CB069,
// // //           -6px -6px 20px 0px #FFFFFF,
// // //           2px 2px 4px 0px #728EAB1A
// // //         `,
// // //         background: '#E7EBF0',
// // //       }}
// // //     >
// // //       <CardContent>
// // //         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
// // //           <Typography variant="h3" component="h2" sx={{ color: '#1e293b', fontWeight: 600 }}>
// // //             Highlights
// // //           </Typography>
// // //           <Box sx={{ display: 'flex', gap: 2 }}>
// // //             <Select
// // //               value={category}
// // //               onChange={handleCategoryChange}
// // //               size="small"
// // //               sx={{
// // //                 minWidth: 160,
// // //                 bgcolor: '#E7EBF0',
// // //                 boxShadow: '4px 4px 20px 0px #6F8CB069, -6px -6px 20px 0px #FFFFFF, 2px 2px 4px 0px #728EAB1A'
// // //               }}
// // //             >
// // //               <MenuItem value="Fabrication Total">Fabrication Total</MenuItem>
// // //               <MenuItem value="Production Total">Production Total</MenuItem>
// // //             </Select>
// // //             <IconButton onClick={toggleFullscreen}>
// // //               <FullscreenIcon />
// // //             </IconButton>
// // //           </Box>
// // //         </Box>

// // //         <ResponsiveContainer width="100%" height={400}>
// // //           <Sankey
// // //             data={sankeyData}
// // //             node={renderNode}
// // //             link={renderLink}
// // //             nodePadding={50}
// // //             margin={{ left: 50, right: 50 }}
// // //           >
// // //             <Tooltip />
// // //           </Sankey>
// // //         </ResponsiveContainer>
// // //       </CardContent>
// // //     </Card>
// // //   );
// // // };

// // // export default FinanceHighChart;

// // // import React from 'react';
// // // import {
// // //   Sankey,
// // //   Tooltip,
// // //   ResponsiveContainer
// // // } from 'recharts';
// // // import {
// // //   Card,
// // //   CardContent,
// // //   Typography,
// // //   Box,
// // //   Select,
// // //   MenuItem,
// // //   IconButton
// // // } from '@mui/material';
// // // import FullscreenIcon from '@mui/icons-material/Fullscreen';

// // // const sankeyData = {
// // //   nodes: [
// // //     { name: 'Sales' },
// // //     { name: 'Indirect income' },
// // //     { name: 'Others' },
// // //     { name: 'Opening stock' },
// // //     { name: 'Center' },
// // //     { name: 'Profit/loss' },
// // //     { name: 'Purchase account' },
// // //     { name: 'Direct Expenses' },
// // //     { name: 'Indirect Expenses' },
// // //     { name: 'Closing stock' },
// // //   ],
// // //   links: [
// // //     { source: 0, target: 4, value: 2356, color: '#007F3B', label: '+10.74%' },
// // //     { source: 1, target: 4, value: 2356, color: '#007F3B', label: '+10.74%' },
// // //     { source: 2, target: 4, value: 2356, color: '#007F3B', label: '+10.74%' },
// // //     { source: 3, target: 4, value: 2356, color: '#007F3B', label: '+10.74%' },

// // //     { source: 4, target: 5, value: 2356, color: '#4CAF50', label: '+10.74%' },
// // //     { source: 4, target: 6, value: 2356, color: '#A52A2A', label: '+10.74%' },
// // //     { source: 4, target: 7, value: 2356, color: '#A52A2A', label: '+10.74%' },
// // //     { source: 4, target: 8, value: 2356, color: '#A52A2A', label: '+10.74%' },
// // //     { source: 4, target: 9, value: 2356, color: '#A52A2A', label: '+10.74%' },
// // //   ]
// // // };

// // // const FinanceHighChart: React.FC = () => {
// // //   return (
// // //     <Card sx={{ borderRadius: 4, background: '#f4f6f8', boxShadow: 3 }}>
// // //       <CardContent>
// // //         <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
// // //           <Typography variant="h5" fontWeight={600}>
// // //             Highlights
// // //           </Typography>
// // //           <Box display="flex" gap={2}>
// // //             <Select size="small" value="Title 1">
// // //               <MenuItem value="Title 1">Title 1</MenuItem>
// // //               <MenuItem value="Title 2">Title 2</MenuItem>
// // //             </Select>
// // //             <Select size="small" value="Title 1">
// // //               <MenuItem value="Title 1">Title 1</MenuItem>
// // //               <MenuItem value="Title 2">Title 2</MenuItem>
// // //             </Select>
// // //             <IconButton>
// // //               <FullscreenIcon />
// // //             </IconButton>
// // //           </Box>
// // //         </Box>

// // //         <ResponsiveContainer width="100%" height={500}>
// // //           <Sankey
// // //             data={sankeyData}
// // //             nodePadding={30}
// // //             nodeWidth={20}
// // //             link={({ sourceX, sourceY, targetX, targetY, index }) => {
// // //               const link = sankeyData.links[index];
// // //               return (
// // //                 <g key={`link-${index}`}>
// // //                   <path
// // //                     d={`M${sourceX},${sourceY} C${(sourceX + targetX) / 2},${sourceY} ${(sourceX + targetX) / 2},${targetY} ${targetX},${targetY}`}
// // //                     fill="none"
// // //                     stroke={link.color}
// // //                     strokeWidth={10}
// // //                     opacity={0.8}
// // //                   />
// // //                   <text
// // //                     x={(sourceX + targetX) / 2}
// // //                     y={(sourceY + targetY) / 2 - 5}
// // //                     fontSize={10}
// // //                     fill="#333"
// // //                     textAnchor="middle"
// // //                   >
// // //                     {link.value}
// // //                   </text>
// // //                   <text
// // //                     x={(sourceX + targetX) / 2}
// // //                     y={(sourceY + targetY) / 2 + 10}
// // //                     fontSize={10}
// // //                     fill="#333"
// // //                     textAnchor="middle"
// // //                   >
// // //                     {link.label}
// // //                   </text>
// // //                 </g>
// // //               );
// // //             }}
// // //             node={({ x, y, width, height, index }) => {
// // //               const node = sankeyData.nodes[index];
// // //               return (
// // //                 <g key={`node-${index}`}>
// // //                   <rect
// // //                     x={x}
// // //                     y={y}
// // //                     width={width}
// // //                     height={height}
// // //                     fill="#fff"
// // //                     stroke="#999"
// // //                     strokeWidth={1}
// // //                     rx={8}
// // //                   />
// // //                   <text
// // //                     x={x + width + 6}
// // //                     y={y + height / 2}
// // //                     alignmentBaseline="middle"
// // //                     fontSize={12}
// // //                     fill="#333"
// // //                   >
// // //                     {node.name}
// // //                   </text>
// // //                 </g>
// // //               );
// // //             }}
// // //           >
// // //             <Tooltip />
// // //           </Sankey>
// // //         </ResponsiveContainer>
// // //       </CardContent>
// // //     </Card>
// // //   );
// // // };

// // // export default FinanceHighChart;


// // import React from 'react';
// // import {
// //   Sankey,
// //   Tooltip,
// //   ResponsiveContainer
// // } from 'recharts';
// // import {
// //   Card,
// //   CardContent,
// //   Typography,
// //   Box,
// //   Select,
// //   MenuItem,
// //   IconButton
// // } from '@mui/material';
// // import FullscreenIcon from '@mui/icons-material/Fullscreen';

// // const sankeyData = {
// //   nodes: [
// //     { name: 'Sales' },
// //     { name: 'Indirect income' },
// //     { name: 'Others' },
// //     { name: 'Opening stock' },
// //     { name: 'Center' },
// //     { name: 'Profit/loss' },
// //     { name: 'Purchase account' },
// //     { name: 'Direct Expenses' },
// //     { name: 'Indirect Expenses' },
// //     { name: 'Closing stock' },
// //   ],
// //   links: [
// //     { source: 0, target: 4, value: 2356, color: '#007F3B', label: '+10.74%' },
// //     { source: 1, target: 4, value: 2356, color: '#007F3B', label: '+10.74%' },
// //     { source: 2, target: 4, value: 2356, color: '#007F3B', label: '+10.74%' },
// //     { source: 3, target: 4, value: 2356, color: '#007F3B', label: '+10.74%' },

// //     { source: 4, target: 5, value: 2356, color: '#4CAF50', label: '+10.74%' },
// //     { source: 4, target: 6, value: 2356, color: '#A52A2A', label: '+10.74%' },
// //     { source: 4, target: 7, value: 2356, color: '#A52A2A', label: '+10.74%' },
// //     { source: 4, target: 8, value: 2356, color: '#A52A2A', label: '+10.74%' },
// //     { source: 4, target: 9, value: 2356, color: '#A52A2A', label: '+10.74%' },
// //   ]
// // };

// // const FinanceHighChart = () => {
// //   return (
// //     <Card sx={{ borderRadius: 4, background: '#f4f6f8', boxShadow: 3 }}>
// //       <CardContent>
// //         <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
// //           <Typography variant="h6" fontWeight={600}>
// //             Highlights
// //           </Typography>
// //           <Box display="flex" gap={2}>
// //             <Select size="small" value="Title 1">
// //               <MenuItem value="Title 1">Title 1</MenuItem>
// //               <MenuItem value="Title 2">Title 2</MenuItem>
// //             </Select>
// //             <Select size="small" value="Title 1">
// //               <MenuItem value="Title 1">Title 1</MenuItem>
// //               <MenuItem value="Title 2">Title 2</MenuItem>
// //             </Select>
// //             <IconButton>
// //               <FullscreenIcon />
// //             </IconButton>
// //           </Box>
// //         </Box>

// //         <ResponsiveContainer width="100%" height={500}>
// //           <Sankey
// //             data={sankeyData}
// //             nodePadding={30}
// //             nodeWidth={20}
// //             margin={{ top: 20, bottom: 20 }}
// //             link={({ sourceX, sourceY, targetX, targetY, index }) => {
// //               const link = sankeyData.links[index];
// //               return (
// //                 <g key={`link-${index}`}>
// //                   <path
// //           d={`M${sourceX},${sourceY} C${(sourceX + targetX) / 2},${sourceY} ${(sourceX + targetX) / 2},${targetY} ${targetX},${targetY}`}
// //           fill="none"
// //           stroke={link.color}
// //           strokeWidth={10}
// //           opacity={0.7}
// //           markerEnd={link.target === 5 ? "url(#arrow-green)" : link.target > 5 ? "url(#arrow-brown)" : undefined}
// //         />
// //         <text
// //           x={(sourceX + targetX) / 2}
// //           y={(sourceY + targetY) / 2 - 6}
// //           fontSize={11}
// //           fill="#333"
// //           textAnchor="middle"
// //         >
// //           {link.value} <tspan fontSize={10} fill="#43a047">{link.label}</tspan>
// //         </text>
// //       </g>
// //     );
// //   }}
// //   node={({ x, y, width, height, index }) => {
// //     const node = sankeyData.nodes[index];
// //     // Center node styling
// //    // ...inside node={({ x, y, width, height, index }) => { ... }}
// // if (index === 4) {
// //   // Center node box dimensions
// //   const boxWidth = 170;
// //   const boxHeight = 150;
// //   const centerX = x + width / 2;
// //   const centerY = y + height / 2;

// //   return (
// //     <g key={`node-center`}>
// //       <rect
// //         x={centerX - boxWidth / 2}
// //         y={centerY - boxHeight / 2}
// //         width={boxWidth}
// //         height={boxHeight}
// //         fill="#fff"
// //         stroke="#28A745"
// //         strokeWidth={2.5}
// //         rx={16}
// //         filter="url(#centerShadow)"
// //         style={{
// //           filter: 'drop-shadow(0 4px 18px #28A74510)',
// //         }}
// //       />
// //       <text
// //         x={centerX}
// //         y={centerY - 40}
// //         textAnchor="middle"
// //         fontWeight={700}
// //         fontSize={16}
// //         fill="#23272e"
// //         style={{ fontFamily: 'inherit' }}
// //       >
// //         Net Profit/Loss
// //       </text>
// //       <text
// //         x={centerX}
// //         y={centerY - 10}
// //         textAnchor="middle"
// //         fontWeight={600}
// //         fontSize={15}
// //         fill="#23272e"
// //         style={{ fontFamily: 'inherit' }}
// //       >
// //         980123
// //       </text>
// //       <text
// //         x={centerX}
// //         y={centerY + 12}
// //         textAnchor="middle"
// //         fontWeight={700}
// //         fontSize={15}
// //         fill="#23272e"
// //         style={{ fontFamily: 'inherit' }}
// //       >
// //         Net Amount
// //       </text>
// //       <text
// //         x={centerX}
// //         y={centerY + 35}
// //         textAnchor="middle"
// //         fontWeight={600}
// //         fontSize={14}
// //         fill="#23272e"
// //         style={{ fontFamily: 'inherit' }}
// //       >
// //         980123
// //       </text>
// //       <text
// //         x={centerX}
// //         y={centerY + 47}
// //         textAnchor="middle"
// //         fontWeight={700}
// //         fontSize={15}
// //         fill="#23272e"
// //         style={{ fontFamily: 'inherit' }}
// //       >
// //         Net Cost
// //       </text>
// //       <text
// //         x={centerX}
// //         y={centerY + 70}
// //         textAnchor="middle"
// //         fontWeight={600}
// //         fontSize={14}
// //         fill="#23272e"
// //         style={{ fontFamily: 'inherit' }}
// //       >
// //         980123
// //       </text>
// //     </g>
// //   );
// // }
// // // ...existing code for other nodes...
// //     // Left and right nodes
// //     return (
// //       <g key={`node-${index}`}>
// //         <rect
// //           x={x}
// //           y={y}
// //           width={width}
// //           height={height}
// //           fill="#fff"
// //           stroke="#ccc"
// //           strokeWidth={1}
// //           rx={10}
// //         />
// //         <text
// //           x={index < 4 ? x - 12 : x + width + 8}
// //           y={y + height / 2}
// //           fontSize={14}
// //           fill="#222"
// //           textAnchor={index < 4 ? 'end' : 'start'}
// //           alignmentBaseline="middle"
// //           fontWeight={600}
// //         >
// //           {node.name}
// //         </text>
// //       </g>
// //     );
// //   }}
// // >
// //   <defs>
// //     <filter id="centerShadow" x="-20%" y="-20%" width="140%" height="140%">
// //       <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#28A745" floodOpacity="0.15" />
// //     </filter>
// //     <marker id="arrow-green" markerWidth="10" markerHeight="10" refX="10" refY="5" orient="auto" markerUnits="strokeWidth">
// //       <path d="M0,0 L10,5 L0,10 Z" fill="#28A745" />
// //     </marker>
// //     <marker id="arrow-brown" markerWidth="10" markerHeight="10" refX="10" refY="5" orient="auto" markerUnits="strokeWidth">
// //       <path d="M0,0 L10,5 L0,10 Z" fill="#7B3F00" />
// //     </marker>
// //   </defs>
// //   <Tooltip
// //     content={({ payload }) => {
// //       if (!payload || payload.length === 0) return null;
// //       const link = payload[0].payload;
// //       return (
// //         <div style={{ background: 'white', border: '1px solid #ccc', padding: 8 }}>
// //           <strong>{sankeyData.nodes[link.target].name}</strong> : {link.value}
// //         </div>
// //       );
// //     }}
// //   />
// // </Sankey>

// //         </ResponsiveContainer>
// //       </CardContent>
// //     </Card>
// //   );
// // };

// // export default FinanceHighChart;


// import React from "react";
// import { Sankey, Tooltip, ResponsiveContainer } from "recharts";
// import type { SankeyLink, SankeyNode } from "recharts/types/chart/Sankey";

// import {
//   Card,
//   CardContent,
//   Typography,
//   Box,
//   Select,
//   MenuItem,
//   IconButton,
// } from "@mui/material";
// import FullscreenIcon from "@mui/icons-material/Fullscreen";
// import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

// const sankeyData = {
//   nodes: [
//     { name: "Sales" },
//     { name: "Indirect income" },
//     { name: "Others" },
//     { name: "Opening stock" },
//     { name: "Net Amount Block" },
//     { name: "Profit/loss" },
//     { name: "Purchase account" },
//     { name: "Direct Expenses" },
//     { name: "Indirect Expenses" },
//     { name: "Closing stock" },
//   ],
//   links: [
//     { source: 0, target: 4, value: 2356, color: "#007F3B", label: "+10.74%" },
//     { source: 1, target: 4, value: 2356, color: "#007F3B", label: "+10.74%" },
//     { source: 2, target: 4, value: 2356, color: "#007F3B", label: "+10.74%" },
//     { source: 3, target: 4, value: 2356, color: "#007F3B", label: "+10.74%" },
//     { source: 4, target: 5, value: 2356, color: "#4CAF50", label: "+10.74%" },
//     { source: 4, target: 6, value: 2356, color: "#8B4513", label: "+10.74%" },
//     { source: 4, target: 7, value: 2356, color: "#8B4513", label: "+10.74%" },
//     { source: 4, target: 8, value: 2356, color: "#8B4513", label: "+10.74%" },
//     { source: 4, target: 9, value: 2356, color: "#8B4513", label: "+10.74%" },
//   ],
// };

// const FinanceHighChart: React.FC = () => {
//   return (
//     <Card sx={{ borderRadius: 4, background: "#f4f6f8", boxShadow: 3 }}>
//       <CardContent>
//         <Box
//           display="flex"
//           justifyContent="space-between"
//           alignItems="center"
//           mb={3}
//         >
//           <Typography variant="h5" fontWeight={600}>
//             Highlights
//           </Typography>
//           <Box display="flex" gap={2}>
//             <Select size="small" value="Title 1">
//               <MenuItem value="Title 1">Title 1</MenuItem>
//               <MenuItem value="Title 2">Title 2</MenuItem>
//             </Select>
//             <Select size="small" value="Title 1">
//               <MenuItem value="Title 1">Title 1</MenuItem>
//               <MenuItem value="Title 2">Title 2</MenuItem>
//             </Select>
//             <IconButton>
//               <FullscreenIcon />
//             </IconButton>
//           </Box>
//         </Box>

//         <Box display="flex" justifyContent="center">
//           <Box width="1000px" height={500}>
//             <ResponsiveContainer width="100%" height="100%">
//               <Sankey
//                 data={sankeyData}
//                 nodePadding={30}
//                 nodeWidth={20}
//                 margin={{ left: 150, right: 150 }}
//                 link={({ sourceX, sourceY, targetX, targetY, index }) => {
//                   const link = sankeyData.links[index];
//                   const midX = (sourceX + targetX) / 2;
//                   const pathD = M${sourceX},${sourceY} C${midX},${sourceY} ${midX},${targetY} ${targetX},${targetY};
//                   return (
//                     <g key={link-${index}}>
//                       <path
//                         d={pathD}
//                         fill="none"
//                         stroke={link.color}
//                         strokeWidth={8}
//                         opacity={0.9}
//                         strokeLinecap="round"
//                       />
//                       <text
//                         x={midX}
//                         y={(sourceY + targetY) / 2 - 8}
//                         fontSize={10}
//                         fill="#333"
//                         textAnchor="middle"
//                       >
//                         2356
//                       </text>
//                       <text
//                         x={midX}
//                         y={(sourceY + targetY) / 2 + 6}
//                         fontSize={10}
//                         fill={link.color === "#007F3B" ? "#007F3B" : "#8B4513"}
//                         textAnchor="middle"
//                       >
//                         +10.74%
//                       </text>
//                     </g>
//                   );
//                 }}
//                 node={({ x, y, width, height, index }) => {
//                   const node = sankeyData.nodes[index];
//                   const isLeft = index < 4;
//                   const isRight = index >= 5 && index < 9;

//                   if (node.name === "Net Amount Block") {
//                     const centerX = x + width / 2 - 90; // adjusted to fully center the box
//                     return (
//                       <foreignObject
//                         x={centerX}
//                         y={y - 20}
//                         width={180}
//                         height={90}
//                       >
//                         <Box
//                           sx={{
//                             background: "#fff",
//                             borderRadius: 12,
//                             border: "1.5px solid #ccc",
//                             boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
//                             padding: 1,
//                             display: "flex",
//                             flexDirection: "column",
//                             alignItems: "center",
//                             justifyContent: "center",
//                             fontSize: 12,
//                             fontWeight: 600,
//                             color: "#333",
//                             textAlign: "center",
//                             height: "100%",
//                           }}
//                         >
//                           <div>
//                             Net Profit/Loss
//                             <br />
//                             980123
//                           </div>
//                           <div>
//                             Net Amount
//                             <br />
//                             980123
//                           </div>
//                           <div>
//                             Net Cost
//                             <br />
//                             980123
//                           </div>
//                         </Box>
//                       </foreignObject>
//                     );
//                   }

//                   return (
//                     <g key={node-${index}}>
//                       <rect
//                         x={x}
//                         y={y}
//                         width={width}
//                         height={height}
//                         fill="#fff"
//                         stroke="#999"
//                         strokeWidth={1}
//                         rx={6}
//                       />
//                       <text
//                         x={isLeft ? x - 12 : x + width + 6}
//                         y={y + height / 2}
//                         alignmentBaseline="middle"
//                         fontSize={12}
//                         fill="#333"
//                         textAnchor={isLeft ? "end" : "start"}
//                       >
//                         {node.name}
//                       </text>
//                     </g>
//                   );
//                 }}
//               >
//                 <Tooltip />
//               </Sankey>
//             </ResponsiveContainer>
//           </Box>
//         </Box>
//       </CardContent>
//     </Card>
//   );
// };

// export default FinanceHighChart;


import React from "react";
import { Sankey, Tooltip, ResponsiveContainer } from "recharts";

import {
  Card,
  CardContent,
  Typography,
  Box,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import FullscreenIcon from "@mui/icons-material/Fullscreen";

const sankeyData = {
  nodes: [
    { name: "Sales" },
    { name: "Indirect income" },
    { name: "Others" },
    { name: "Opening stock" },
    { name: "Net Amount Block" },
    { name: "Profit/loss" },
    { name: "Purchase account" },
    { name: "Direct Expenses" },
    { name: "Indirect Expenses" },
    { name: "Closing stock" },
  ],
  links: [
    { source: 0, target: 4, value: 2356, color: "#007F3B", label: "+10.74%" },
    { source: 1, target: 4, value: 2356, color: "#007F3B", label: "+10.74%" },
    { source: 2, target: 4, value: 2356, color: "#007F3B", label: "+10.74%" },
    { source: 3, target: 4, value: 2356, color: "#007F3B", label: "+10.74%" },
    { source: 4, target: 5, value: 2356, color: "#4CAF50", label: "+10.74%" },
    { source: 4, target: 6, value: 2356, color: "#8B4513", label: "+10.74%" },
    { source: 4, target: 7, value: 2356, color: "#8B4513", label: "+10.74%" },
    { source: 4, target: 8, value: 2356, color: "#8B4513", label: "+10.74%" },
    { source: 4, target: 9, value: 2356, color: "#8B4513", label: "+10.74%" },
  ],
};

const FinanceHighChart: React.FC = () => {
  return (
    <Card sx={{ borderRadius: 4, background: "#f4f6f8", boxShadow: 3 }}>
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography variant="h5" fontWeight={600}>
            Highlights
          </Typography>
          <Box display="flex" gap={2}>
            <Select size="small" value="Title 1">
              <MenuItem value="Title 1">Title 1</MenuItem>
              <MenuItem value="Title 2">Title 2</MenuItem>
            </Select>
            <Select size="small" value="Title 1">
              <MenuItem value="Title 1">Title 1</MenuItem>
              <MenuItem value="Title 2">Title 2</MenuItem>
            </Select>
            <IconButton>
              <FullscreenIcon />
            </IconButton>
          </Box>
        </Box>

        <Box display="flex" justifyContent="center">
          <Box width="1000px" height={500}>
            <ResponsiveContainer width="100%" height="100%">
              <Sankey
                data={sankeyData}
                nodePadding={30}
                nodeWidth={20}
                margin={{ left: 150, right: 150 }}
                link={({ sourceX, sourceY, targetX, targetY, index }) => {
                  const link = sankeyData.links[index];
                  const midX = (sourceX + targetX) / 2;
                  const pathD = `M${sourceX},${sourceY} C${midX},${sourceY} ${midX},${targetY} ${targetX},${targetY}`;
                  return (
                    <g key={`link-${index}`}>
                      <path
                        d={pathD}
                        fill="none"
                        stroke={link.color}
                        strokeWidth={8}
                        opacity={0.9}
                        strokeLinecap="round"
                      />
                      <text
                        x={midX}
                        y={(sourceY + targetY) / 2 - 8}
                        fontSize={10}
                        fill="#333"
                        textAnchor="middle"
                      >
                        {link.value}
                      </text>
                      <text
                        x={midX}
                        y={(sourceY + targetY) / 2 + 6}
                        fontSize={10}
                        fill={link.color === "#007F3B" ? "#007F3B" : "#8B4513"}
                        textAnchor="middle"
                      >
                        {link.label}
                      </text>
                    </g>
                  );
                }}
                node={({ x, y, width, height, index }) => {
                  const node = sankeyData.nodes[index];
                  const isLeft = index < 4;

                  if (node.name === "Net Amount Block") {
                    const centerX = x + width / 2 - 90;
                    return (
                      <foreignObject
                        x={centerX}
                        y={y - 20}
                        width={180}
                        height={110}
                        key={`node-${index}`}
                      >
                        <Box
                          sx={{
                            background: "#fff",
                            borderRadius: 12,
                            border: "1.5px solid #ccc",
                            boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
                            padding: 1,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 12,
                            fontWeight: 600,
                            color: "#333",
                            textAlign: "center",
                            height: "100%",
                          }}
                        >
                          <div>
                            Net Profit/Loss
                            <br />
                            980123
                          </div>
                          <div>
                            Net Amount
                            <br />
                            980123
                          </div>
                          <div>
                            Net Cost
                            <br />
                            980123
                          </div>
                        </Box>
                      </foreignObject>
                    );
                  }

                  return (
                    <g key={`node-${index}`}>
                      <rect
                        x={x}
                        y={y}
                        width={width}
                        height={height}
                        fill="#fff"
                        stroke="#999"
                        strokeWidth={1}
                        rx={6}
                      />
                      <text
                        x={isLeft ? x - 12 : x + width + 6}
                        y={y + height / 2}
                        alignmentBaseline="middle"
                        fontSize={12}
                        fill="#333"
                        textAnchor={isLeft ? "end" : "start"}
                      >
                        {node.name}
                      </text>
                    </g>
                  );
                }}
              >
                <Tooltip />
              </Sankey>
            </ResponsiveContainer>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FinanceHighChart;

