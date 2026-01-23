// import React, { useEffect, useRef, useState } from 'react';
// import * as d3 from 'd3';
// import {
//   Card,
//   CardContent,
//   Typography,
//   Box,
//   Select,
//   MenuItem,
//   IconButton,
//   SelectChangeEvent,
//   Dialog,
//   DialogContent,
// } from '@mui/material';
// import FullscreenIcon from '@mui/icons-material/Fullscreen';

// interface SankeyNode {
//   id: number;
//   name: string;
//   value?: number;
//   change?: string;
//   side: 'left' | 'center' | 'right';
//   x0?: number;
//   x1?: number;
//   y0?: number;
//   y1?: number;
// }

// interface SankeyLink {
//   source: number;
//   target: number;
//   value: number;
// }

// const SankeyChart: React.FC<{ containerHeight?: number | string }> = ({ containerHeight = 350 }) => {
//   const svgRef = useRef<SVGSVGElement>(null);
//   const containerRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (!svgRef.current || !containerRef.current) return;

//     // Clear previous content
//     d3.select(svgRef.current).selectAll("*").remove();

//     const container = containerRef.current;
//     const svg = d3.select(svgRef.current);
    
//     // Set dimensions
//     const margin = { top: 20, right: 50, bottom: 20, left: 50 };
//     const width = container.offsetWidth - margin.left - margin.right;
//     const height = typeof containerHeight === 'number' 
//       ? containerHeight - margin.top - margin.bottom 
//       : container.clientHeight - margin.top - margin.bottom;
    
//     svg.attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`);
    
//     const g = svg.append("g")
//       .attr("transform", `translate(${margin.left},${margin.top})`);

//     // Financial data
//     const nodes: SankeyNode[] = [
//       // Left side - Income sources
//       { id: 0, name: "Sales", value: 2356, change: "+10.74%", side: "left" },
//       { id: 1, name: "Indirect income", value: 2356, change: "+10.74%", side: "left" },
//       { id: 2, name: "Others", value: 2356, change: "+10.74%", side: "left" },
//       { id: 3, name: "Opening stock", value: 2356, change: "+10.74%", side: "left" },
      
//       // Center - Financial processing hub
//       { id: 4, name: "Central Hub", side: "center" },
      
//       // Right side - Expense destinations
//       { id: 5, name: "Profit/loss", value: 2356, change: "+10.74%", side: "right" },
//       { id: 6, name: "Purchase account", value: 2356, change: "+10.74%", side: "right" },
//       { id: 7, name: "Direct Expenses", value: 2356, change: "+10.74%", side: "right" },
//       { id: 8, name: "Indirect Expenses", value: 2356, change: "+10.74%", side: "right" },
//       { id: 9, name: "Closing stock", value: 2356, change: "+10.74%", side: "right" }
//     ];

//     const links: SankeyLink[] = [
//       // Income flows (Green)
//       { source: 0, target: 4, value: 2356 },
//       { source: 1, target: 4, value: 2356 },
//       { source: 2, target: 4, value: 2356 },
//       { source: 3, target: 4, value: 2356 },
      
//       // Expense flows (Red)
//       { source: 4, target: 5, value: 2356 },
//       { source: 4, target: 6, value: 2356 },
//       { source: 4, target: 7, value: 2356 },
//       { source: 4, target: 8, value: 2356 },
//       { source: 4, target: 9, value: 2356 }
//     ];

//     // Position nodes
//     nodes.forEach((node, i) => {
//       if (node.side === "left") {
//         node.x0 = 80;
//         node.x1 = 95;
//         node.y0 = 50 + (i * 70);
//         node.y1 = node.y0 + 40;
//       } else if (node.side === "center") {
//         node.x0 = width / 2 - 60;
//         node.x1 = width / 2 + 60;
//         node.y0 = height / 2 - 60;
//         node.y1 = height / 2 + 60;
//       } else if (node.side === "right") {
//         node.x0 = width - 95;
//         node.x1 = width - 80;
//         const rightIndex = i - 5;
//         node.y0 = 50 + (rightIndex * 55);
//         node.y1 = node.y0 + 40;
//       }
//     });

//     // Create curved flow paths
//     const linkGenerator = d3.linkHorizontal()
//       .source((d: any) => [d.source.x1, d.source.y0 + (d.source.y1 - d.source.y0) / 2])
//       .target((d: any) => [d.target.x0, d.target.y0 + (d.target.y1 - d.target.y0) / 2]);

//     const processedLinks = links.map(link => ({
//       ...link,
//       source: nodes[link.source],
//       target: nodes[link.target]
//     }));

//     // Draw flows
//     const link = g.selectAll(".link")
//       .data(processedLinks)
//       .enter().append("g")
//       .attr("class", "link");

//     link.append("path")
//       .attr("d", linkGenerator as any)
//       .attr("stroke-width", 8)
//       .attr("stroke", (d: any) => {
//         return d.source.side === "left" ? "#22c55e" : "#dc2626";
//       })
//       .attr("fill", "none")
//       .attr("opacity", 0.7);

//     // Draw nodes
//     const node = g.selectAll(".node")
//       .data(nodes)
//       .enter().append("g")
//       .attr("class", "node");

//     // Node rectangles
//     node.append("rect")
//       .attr("x", d => d.x0!)
//       .attr("y", d => d.y0!)
//       .attr("height", d => d.y1! - d.y0!)
//       .attr("width", d => d.x1! - d.x0!)
//       .attr("fill", d => {
//         if (d.side === "center") return "#ffffff";
//         return d.side === "left" ? "#22c55e" : "#dc2626";
//       })
//       .attr("stroke", d => d.side === "center" ? "#e5e7eb" : "none")
//       .attr("stroke-width", 1)
//       .attr("rx", d => d.side === "center" ? 8 : 4);

//     // Central node content
//     const centralNode = nodes.find(n => n.side === "center");
//     if (centralNode) {
//       const centerGroup = g.append("g").attr("class", "center-content");
      
//       // Net Profit/Loss
//       centerGroup.append("text")
//         .attr("x", centralNode.x0! + 60)
//         .attr("y", centralNode.y0! + 20)
//         .attr("text-anchor", "middle")
//         .attr("font-size", "12px")
//         .attr("font-weight", "600")
//         .attr("fill", "#374151")
//         .text("Net Profit/Loss");
      
//       centerGroup.append("text")
//         .attr("x", centralNode.x0! + 60)
//         .attr("y", centralNode.y0! + 35)
//         .attr("text-anchor", "middle")
//         .attr("font-size", "14px")
//         .attr("font-weight", "700")
//         .attr("fill", "#111827")
//         .text("980123");
        
//       // Net Amount
//       centerGroup.append("text")
//         .attr("x", centralNode.x0! + 60)
//         .attr("y", centralNode.y0! + 55)
//         .attr("text-anchor", "middle")
//         .attr("font-size", "12px")
//         .attr("font-weight", "600")
//         .attr("fill", "#374151")
//         .text("Net Amount");
      
//       centerGroup.append("text")
//         .attr("x", centralNode.x0! + 60)
//         .attr("y", centralNode.y0! + 70)
//         .attr("text-anchor", "middle")
//         .attr("font-size", "14px")
//         .attr("font-weight", "700")
//         .attr("fill", "#111827")
//         .text("980123");
        
//       // Net Cost
//       centerGroup.append("text")
//         .attr("x", centralNode.x0! + 60)
//         .attr("y", centralNode.y0! + 90)
//         .attr("text-anchor", "middle")
//         .attr("font-size", "12px")
//         .attr("font-weight", "600")
//         .attr("fill", "#374151")
//         .text("Net Cost");
      
//       centerGroup.append("text")
//         .attr("x", centralNode.x0! + 60)
//         .attr("y", centralNode.y0! + 105)
//         .attr("text-anchor", "middle")
//         .attr("font-size", "14px")
//         .attr("font-weight", "700")
//         .attr("fill", "#111827")
//         .text("980123");
//     }

//     // Node labels
//     node.filter(d => d.side !== "center")
//       .append("text")
//       .attr("x", d => d.side === "left" ? d.x0! - 10 : d.x1! + 10)
//       .attr("y", d => d.y0! + 15)
//       .attr("text-anchor", d => d.side === "left" ? "end" : "start")
//       .attr("font-size", "13px")
//       .attr("font-weight", "600")
//       .attr("fill", "#374151")
//       .text(d => d.name);

//     // Values and percentages
//     node.filter(d => d.side !== "center")
//       .append("text")
//       .attr("x", d => d.side === "left" ? d.x0! - 10 : d.x1! + 10)
//       .attr("y", d => d.y0! + 30)
//       .attr("text-anchor", d => d.side === "left" ? "end" : "start")
//       .attr("font-size", "12px")
//       .attr("fill", "#6b7280")
//       .text(d => `${d.value} ${d.change}`);

//     // Green up arrows
//     node.filter(d => d.side !== "center")
//       .append("text")
//       .attr("x", d => d.side === "left" ? d.x0! - 85 : d.x1! + 80)
//       .attr("y", d => d.y0! + 30)
//       .attr("text-anchor", "middle")
//       .attr("font-size", "10px")
//       .attr("fill", "#22c55e")
//       .text("▲");

//   }, [containerHeight]);

//   return (
//     <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
//       <svg ref={svgRef} style={{ width: '100%', height: '100%' }}></svg>
//     </div>
//   );
// };

// const SankeyFinanceChart: React.FC = () => {
//   const [category, setCategory] = useState<string>('Title 1');
//   const [openFullscreen, setOpenFullscreen] = useState<boolean>(false);

//   const handleCategoryChange = (event: SelectChangeEvent<string>) => {
//     setCategory(event.target.value);
//   };

//   const toggleFullscreen = () => {
//     setOpenFullscreen((prev) => !prev);
//   };

//   const renderChart = (containerHeight: number | string = 400) => (
//     <Box sx={{ 
//       position: 'relative', 
//       height: containerHeight,
//       width: '100%',
//       minHeight: 400
//     }}>
//       <SankeyChart containerHeight={containerHeight} />
//     </Box>
//   );

//   return (
//     <Card sx={{ height: '100%', borderRadius: 3, boxShadow: 2, backgroundColor: "#E7EBF0" }}>
//       <CardContent>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
//           <Typography variant="h6" fontWeight="bold" color="#08070f">
//             Highlights
//           </Typography>
//           <Box sx={{ display: 'flex',  gap: 2 }}>
//             <Select
//               value={category}
//               onChange={handleCategoryChange}
//               size="small"
//               sx={{
//                 minWidth: 80,
//                 bgcolor: '#E7EBF0',
//                 boxShadow: '0 2px 8px #E0E7EF',
//                 fontWeight: 600,
//               }}
//             >
//               <MenuItem value="Title 1">Title 1</MenuItem>
//               <MenuItem value="Title 2">Title 2</MenuItem>
//             </Select>
//             <IconButton onClick={toggleFullscreen} sx={{ color: '#08070f' }}>
//               <FullscreenIcon />
//             </IconButton>
//           </Box>
//         </Box>

//         {renderChart(400)}

//         <Dialog
//           open={openFullscreen}
//           onClose={toggleFullscreen}
//           fullWidth
//           maxWidth="lg"
//           sx={{
//             '& .MuiDialog-paper': {
//               overflow: 'visible',
//             },
//           }}
//         >
//           <DialogContent sx={{ height: '80vh', p: 4 }}>
//             {renderChart('100%')}
//           </DialogContent>
//         </Dialog>
//       </CardContent>
//     </Card>
//   );
// };

// export default SankeyFinanceChart;


import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
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
} from '@mui/material';
import FullscreenIcon from '@mui/icons-material/Fullscreen';

interface SankeyNode {
  id: number;
  name: string;
  value?: number;
  change?: string;
  side: 'left' | 'center' | 'right';
  x0?: number;
  x1?: number;
  y0?: number;
  y1?: number;
}

interface SankeyLink {
  source: number;
  target: number;
  value: number;
}

const SankeyChart: React.FC<{ containerHeight?: number | string }> = ({ containerHeight = 350 }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: typeof containerHeight === 'number' 
            ? containerHeight 
            : containerRef.current.offsetHeight
        });
      }
    };

    handleResize(); // Initial call
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [containerHeight]);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current || dimensions.width === 0) return;

    // Clear previous content
    d3.select(svgRef.current).selectAll("*").remove();

    const svg = d3.select(svgRef.current);
    
    // Set dimensions with responsive margins
    const margin = { 
      top: 20, 
      right: Math.max(50, dimensions.width * 0.05), 
      bottom: 20, 
      left: Math.max(50, dimensions.width * 0.05) 
    };
    
    const width = dimensions.width - margin.left - margin.right;
    const height = dimensions.height - margin.top - margin.bottom;
    
    svg.attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`);
    
    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Financial data
    const nodes: SankeyNode[] = [
      // Left side - Income sources
      { id: 0, name: "Sales", value: 2356, change: "+10.74%", side: "left" },
      { id: 1, name: "Indirect income", value: 2356, change: "+10.74%", side: "left" },
      { id: 2, name: "Others", value: 2356, change: "+10.74%", side: "left" },
      { id: 3, name: "Opening stock", value: 2356, change: "+10.74%", side: "left" },
      
      // Center - Financial processing hub
      { id: 4, name: "Central Hub", side: "center" },
      
      // Right side - Expense destinations
      { id: 5, name: "Profit/loss", value: 2356, change: "+10.74%", side: "right" },
      { id: 6, name: "Purchase account", value: 2356, change: "+10.74%", side: "right" },
      { id: 7, name: "Direct Expenses", value: 2356, change: "+10.74%", side: "right" },
      { id: 8, name: "Indirect Expenses", value: 2356, change: "+10.74%", side: "right" },
      { id: 9, name: "Closing stock", value: 2356, change: "+10.74%", side: "right" }
    ];

    const links: SankeyLink[] = [
      // Income flows (Green)
      { source: 0, target: 4, value: 2356 },
      { source: 1, target: 4, value: 2356 },
      { source: 2, target: 4, value: 2356 },
      { source: 3, target: 4, value: 2356 },
      
      // Expense flows (Red)
      { source: 4, target: 5, value: 2356 },
      { source: 4, target: 6, value: 2356 },
      { source: 4, target: 7, value: 2356 },
      { source: 4, target: 8, value: 2356 },
      { source: 4, target: 9, value: 2356 }
    ];

    // Calculate dynamic spacing based on height
    const leftNodeSpacing = height / (nodes.filter(n => n.side === "left").length);
    const rightNodeSpacing = height / (nodes.filter(n => n.side === "right").length);

    // Position nodes responsively with larger text in mind
    nodes.forEach((node, i) => {
      if (node.side === "left") {
        node.x0 = width * 0.12; // Adjusted to accommodate larger text
        node.x1 = width * 0.18;
        node.y0 = (leftNodeSpacing * i) + (leftNodeSpacing - 50) / 2; // Increased node height
        node.y1 = node.y0 + 50;
      } else if (node.side === "center") {
        node.x0 = width / 2 - Math.min(80, width * 0.12); // Wider center
        node.x1 = width / 2 + Math.min(80, width * 0.12);
        node.y0 = height / 2 - Math.min(80, height * 0.18); // Taller center
        node.y1 = height / 2 + Math.min(80, height * 0.18);
      } else if (node.side === "right") {
        node.x0 = width * 0.82; // Adjusted to accommodate larger text
        node.x1 = width * 0.88;
        const rightIndex = i - 5;
        node.y0 = (rightNodeSpacing * rightIndex) + (rightNodeSpacing - 50) / 2; // Increased node height
        node.y1 = node.y0 + 50;
      }
    });

    // Create curved flow paths
    const linkGenerator = d3.linkHorizontal()
      .source((d: any) => [d.source.x1, d.source.y0 + (d.source.y1 - d.source.y0) / 2])
      .target((d: any) => [d.target.x0, d.target.y0 + (d.target.y1 - d.target.y0) / 2]);

    const processedLinks = links.map(link => ({
      ...link,
      source: nodes[link.source],
      target: nodes[link.target]
    }));

    // Draw flows
    const link = g.selectAll(".link")
      .data(processedLinks)
      .enter().append("g")
      .attr("class", "link");

    link.append("path")
      .attr("d", linkGenerator as any)
      .attr("stroke-width", Math.max(8, width * 0.015)) // Thicker flows
      .attr("stroke", (d: any) => {
        return d.source.side === "left" ? "#22c55e" : "#dc2626";
      })
      .attr("fill", "none")
      .attr("opacity", 0.7);

    // Draw nodes
    const node = g.selectAll(".node")
      .data(nodes)
      .enter().append("g")
      .attr("class", "node");

    // Node rectangles
    node.append("rect")
      .attr("x", d => d.x0!)
      .attr("y", d => d.y0!)
      .attr("height", d => d.y1! - d.y0!)
      .attr("width", d => d.x1! - d.x0!)
      .attr("fill", d => {
        if (d.side === "center") return "#ffffff";
        return d.side === "left" ? "#22c55e" : "#dc2626";
      })
      .attr("stroke", d => d.side === "center" ? "#e5e7eb" : "none")
      .attr("stroke-width", 1)
      .attr("rx", d => d.side === "center" ? 8 : 4);

    // Central node content with larger text
    const centralNode = nodes.find(n => n.side === "center");
    if (centralNode) {
      const centerGroup = g.append("g").attr("class", "center-content");
      
      const centerX = centralNode.x0! + (centralNode.x1! - centralNode.x0!) / 2;
      
      // Larger font sizes for central content
      const titleFontSize = Math.min(16, width * 0.02); // Increased from 12
      const valueFontSize = Math.min(20, width * 0.025); // Increased from 14
      
      // Net Profit/Loss
      centerGroup.append("text")
        .attr("x", centerX)
        .attr("y", centralNode.y0! + (centralNode.y1! - centralNode.y0!) * 0.2)
        .attr("text-anchor", "middle")
        .attr("font-size", `${titleFontSize}px`)
        .attr("font-weight", "600")
        .attr("fill", "#374151")
        .text("Net Profit/Loss");
      
      centerGroup.append("text")
        .attr("x", centerX)
        .attr("y", centralNode.y0! + (centralNode.y1! - centralNode.y0!) * 0.35)
        .attr("text-anchor", "middle")
        .attr("font-size", `${valueFontSize}px`)
        .attr("font-weight", "700")
        .attr("fill", "#111827")
        .text("980123");
        
      // Net Amount
      centerGroup.append("text")
        .attr("x", centerX)
        .attr("y", centralNode.y0! + (centralNode.y1! - centralNode.y0!) * 0.55)
        .attr("text-anchor", "middle")
        .attr("font-size", `${titleFontSize}px`)
        .attr("font-weight", "600")
        .attr("fill", "#374151")
        .text("Net Amount");
      
      centerGroup.append("text")
        .attr("x", centerX)
        .attr("y", centralNode.y0! + (centralNode.y1! - centralNode.y0!) * 0.7)
        .attr("text-anchor", "middle")
        .attr("font-size", `${valueFontSize}px`)
        .attr("font-weight", "700")
        .attr("fill", "#111827")
        .text("980123");
        
      // Net Cost
      centerGroup.append("text")
        .attr("x", centerX)
        .attr("y", centralNode.y0! + (centralNode.y1! - centralNode.y0!) * 0.9)
        .attr("text-anchor", "middle")
        .attr("font-size", `${titleFontSize}px`)
        .attr("font-weight", "600")
        .attr("fill", "#374151")
        .text("Net Cost");
      
      centerGroup.append("text")
        .attr("x", centerX)
        .attr("y", centralNode.y0! + (centralNode.y1! - centralNode.y0!) * 1.05)
        .attr("text-anchor", "middle")
        .attr("font-size", `${valueFontSize}px`)
        .attr("font-weight", "700")
        .attr("fill", "#111827")
        .text("980123");
    }

    // Node labels with larger text
    node.filter(d => d.side !== "center")
      .append("text")
      .attr("x", d => d.side === "left" ? d.x0! - 15 : d.x1! + 15) // More space for larger text
      .attr("y", d => d.y0! + 20) // Adjusted vertical position
      .attr("text-anchor", d => d.side === "left" ? "end" : "start")
      .attr("font-size", `${Math.min(16, width * 0.015)}px`) // Increased from 13
      .attr("font-weight", "600")
      .attr("fill", "#374151")
      .text(d => d.name);

    // Values and percentages with larger text
    node.filter(d => d.side !== "center")
      .append("text")
      .attr("x", d => d.side === "left" ? d.x0! - 15 : d.x1! + 15)
      .attr("y", d => d.y0! + 40) // Adjusted vertical position
      .attr("text-anchor", d => d.side === "left" ? "end" : "start")
      .attr("font-size", `${Math.min(14, width * 0.012)}px`) // Increased from 12
      .attr("fill", "#6b7280")
      .text(d => `${d.value} ${d.change}`);

    // Larger up arrows
    node.filter(d => d.side !== "center")
      .append("text")
      .attr("x", d => d.side === "left" ? d.x0! - (width * 0.1) : d.x1! + (width * 0.1))
      .attr("y", d => d.y0! + 40)
      .attr("text-anchor", "middle")
      .attr("font-size", `${Math.min(14, width * 0.015)}px`) // Increased from 10
      .attr("fill", "#22c55e")
      .text("▲");

  }, [containerHeight, dimensions]);

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      <svg ref={svgRef} style={{ width: '100%', height: '100%' }}></svg>
    </div>
  );
};

const SankeyFinanceChart: React.FC = () => {
  const [category, setCategory] = useState<string>('Title 1');
  const [openFullscreen, setOpenFullscreen] = useState<boolean>(false);

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setCategory(event.target.value);
  };

  const toggleFullscreen = () => {
    setOpenFullscreen((prev) => !prev);
  };

  const renderChart = (containerHeight: number | string = '100%') => (
    <Box sx={{ 
      position: 'relative', 
      height: containerHeight,
      width: '100%',
      minHeight: 450 // Increased minimum height to accommodate larger text
    }}>
      <SankeyChart containerHeight={containerHeight} />
    </Box>
  );

  return (
    <Card sx={{ 
      height: '100%', 
      borderRadius: 3, 
      boxShadow: 2, 
      backgroundColor: "#E7EBF0",
      display: 'flex',
      flexDirection: 'column'
    }}>
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h5" fontWeight="bold" color="#08070f"> {/* Increased to h5 */}
            Highlights
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Select
              value={category}
              onChange={handleCategoryChange}
              size="medium" // Changed from small to medium
              sx={{
                minWidth: 100, // Increased width
                bgcolor: '#E7EBF0',
                boxShadow: '0 2px 8px #E0E7EF',
                fontWeight: 600,
                fontSize: '0.9rem' // Larger font
              }}
            >
              <MenuItem value="Title 1">Title 1</MenuItem>
              <MenuItem value="Title 2">Title 2</MenuItem>
            </Select>
            <IconButton onClick={toggleFullscreen} sx={{ color: '#08070f' }}>
              <FullscreenIcon fontSize="medium" /> {/* Larger icon */}
            </IconButton>
          </Box>
        </Box>

        <Box sx={{ flex: 1 }}>
          {renderChart('100%')}
        </Box>

        <Dialog
          open={openFullscreen}
          onClose={toggleFullscreen}
          fullWidth
          maxWidth="lg"
          sx={{
            '& .MuiDialog-paper': {
              overflow: 'visible',
              height: '90vh'
            },
          }}
        >
          <DialogContent sx={{ height: '100%', p: 4 }}>
            {renderChart('100%')}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default SankeyFinanceChart;
