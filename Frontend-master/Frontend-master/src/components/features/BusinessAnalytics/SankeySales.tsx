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
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Fullscreen as FullscreenIcon } from '@mui/icons-material';

interface SalesNode {
  id: number;
  name: string;
  value?: number;
  change?: string;
  side: 'left' | 'center';
  x0?: number;
  x1?: number;
  y0?: number;
  y1?: number;
}

interface SalesLink {
  source: number;
  target: number;
  value: number;
}

const SalesChart: React.FC<{ containerHeight?: number | string }> = ({ containerHeight = 400 }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    // Clear previous content
    d3.select(svgRef.current).selectAll("*").remove();

    const container = containerRef.current;
    const svg = d3.select(svgRef.current);
    
    // Set dimensions with responsive margins
    const margin = { 
      top: 20, 
      right: isMobile ? 60 : 120, 
      bottom: 20, 
      left: isMobile ? 100 : 200 
    };
    const width = container.offsetWidth - margin.left - margin.right;
    const height = typeof containerHeight === 'number' 
      ? containerHeight - margin.top - margin.bottom 
      : container.clientHeight - margin.top - margin.bottom;
    
    svg.attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`);
    
    const g = svg.append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Sales data
    const nodes: SalesNode[] = [
      { id: 0, name: "Credit Note", value: 2356, change: "+10.74%", side: "left" },
      { id: 1, name: "Damages Charges", value: 2356, change: "+10.74%", side: "left" },
      { id: 2, name: "Job Work Charges", value: 2356, change: "+10.74%", side: "left" },
      { id: 3, name: "Sales", value: 2356, change: "+10.74%", side: "left" },
      { id: 4, name: "Sales Interstate", value: 2356, change: "+10.74%", side: "left" },
      { id: 5, name: "Scrap Sales", value: 2356, change: "+10.74%", side: "left" },
      { id: 6, name: "Net Sale", side: "center" }
    ];

    const links: SalesLink[] = [
      { source: 0, target: 6, value: 2356 },
      { source: 1, target: 6, value: 2356 },
      { source: 2, target: 6, value: 2356 },
      { source: 3, target: 6, value: 2356 },
      { source: 4, target: 6, value: 2356 },
      { source: 5, target: 6, value: 2356 }
    ];

    // Position nodes
    nodes.forEach((node, i) => {
      if (node.side === "left") {
        node.x0 = 0;
        node.x1 = isMobile ? 15 : 20;
        node.y0 = 10 + (i * (height - 60) / 6);
        node.y1 = node.y0 + (isMobile ? 30 : 35);
      } else if (node.side === "center") {
        node.x0 = width - (isMobile ? 100 : 160);
        node.x1 = width - (isMobile ? 20 : 30);
        node.y0 = height / 2 - (isMobile ? 40 : 50);
        node.y1 = height / 2 + (isMobile ? 40 : 50);
      }
    });

    // Create smooth curved paths
    const linkGenerator = d3.linkHorizontal()
      .source((d: any) => [d.source.x1, d.source.y0 + (d.source.y1 - d.source.y0) / 2])
      .target((d: any) => [d.target.x0, d.target.y0 + (d.target.y1 - d.target.y0) / 2]);

    const processedLinks = links.map(link => ({
      ...link,
      source: nodes[link.source],
      target: nodes[link.target]
    }));

    // Draw flows with consistent styling
    const link = g.selectAll(".link")
      .data(processedLinks)
      .enter().append("g")
      .attr("class", "link");

    link.append("path")
      .attr("d", linkGenerator as any)
      .attr("stroke-width", isMobile ? 12 : 20)
      .attr("stroke", "#059669")
      .attr("fill", "none")
      .attr("opacity", 0.9);

    // Draw nodes
    const node = g.selectAll(".node")
      .data(nodes)
      .enter().append("g")
      .attr("class", "node");

    // Left side bars
    node.filter(d => d.side === "left")
      .append("rect")
      .attr("x", d => d.x0!)
      .attr("y", d => d.y0!)
      .attr("height", d => d.y1! - d.y0!)
      .attr("width", d => d.x1! - d.x0!)
      .attr("fill", "#059669")
      .attr("rx", 6);

    // Central Net Sale box
    node.filter(d => d.side === "center")
      .append("rect")
      .attr("x", d => d.x0!)
      .attr("y", d => d.y0!)
      .attr("height", d => d.y1! - d.y0!)
      .attr("width", d => d.x1! - d.x0!)
      .attr("fill", "#ffffff")
      .attr("stroke", "#059669")
      .attr("stroke-width", 2)
      .attr("rx", 12);

    // Central node content
    const centralNode = nodes.find(n => n.side === "center");
    if (centralNode) {
      const centerGroup = g.append("g").attr("class", "center-content");
      
      centerGroup.append("text")
        .attr("x", centralNode.x0! + (centralNode.x1! - centralNode.x0!) / 2)
        .attr("y", centralNode.y0! + (isMobile ? 20 : 30))
        .attr("text-anchor", "middle")
        .attr("font-size", isMobile ? "14px" : "16px")
        
        .attr("font-weight", "600")
        .attr("fill", "#374151")
        .text("Net Sale");
      
      centerGroup.append("text")
        .attr("x", centralNode.x0! + (centralNode.x1! - centralNode.x0!) / 2)
        .attr("y", centralNode.y0! + (isMobile ? 40 : 55))
        .attr("text-anchor", "middle")
        .attr("font-size", isMobile ? "16px" : "18px")
        .attr("font-weight", "700")
        .attr("fill", "#111827")
        .text("980123");
        
      centerGroup.append("rect")
        .attr("x", centralNode.x0! + (centralNode.x1! - centralNode.x0!) / 2 - (isMobile ? 30 : 40))
        .attr("y", centralNode.y0! + (isMobile ? 53 : 68))
        .attr("width", 12)
        .attr("height", 12)
        .attr("fill", "#059669")
        .attr("rx", 2);
        
      centerGroup.append("text")
        .attr("x", centralNode.x0! + (centralNode.x1! - centralNode.x0!) / 2 - (isMobile ? 15 : 20))
        .attr("y", centralNode.y0! + (isMobile ? 63 : 78))
        .attr("text-anchor", "start")
        .attr("font-size", isMobile ? "12px" : "14px")
        .attr("font-weight", "600")
        .attr("fill", "#059669")
        .text("+10.74%");
    }

    // Left side labels and values
    node.filter(d => d.side === "left")
      .each(function(d) {
        const nodeGroup = d3.select(this);
        
        nodeGroup.append("text")
          .attr("x", d.x0! - 10)
          .attr("y", d.y0! + (isMobile ? 10 : 12))
          .attr("text-anchor", "end")
          .attr("font-size", isMobile ? "12px" : "15px")
          .attr("font-weight", "500")
          .attr("fill", "#374151")
          .text(isMobile ? d.name.split(' ')[0] : d.name);
        
        nodeGroup.append("text")
          .attr("x", d.x1! + 10)
          .attr("y", d.y0! + (isMobile ? 10 : 12))
          .attr("text-anchor", "start")
          .attr("font-size", isMobile ? "12px" : "14px")
          .attr("font-weight", "600")
          .attr("fill", "#111827")
          .text(d.value!.toString());
        
        nodeGroup.append("rect")
          .attr("x", d.x1! + (isMobile ? 35 : 55))
          .attr("y", d.y0! + (isMobile ? 3 : 5))
          .attr("width", 12)
          .attr("height", 12)
          .attr("fill", "#059669")
          .attr("rx", 2);
        
        nodeGroup.append("text")
          .attr("x", d.x1! + (isMobile ? 50 : 75))
          .attr("y", d.y0! + (isMobile ? 13 : 15))
          .attr("text-anchor", "start")
          .attr("font-size", isMobile ? "12px" : "14px")
          .attr("font-weight", "600")
          .attr("fill", "#059669")
          .text(d.change!);
      });

  }, [containerHeight, isMobile]);

  return (
    <Box 
      ref={containerRef} 
      sx={{ 
        width: '100%', 
        height: '100%',
        minHeight: typeof containerHeight === 'number' ? containerHeight : 400
      }}
    >
      <svg ref={svgRef} style={{ width: '100%', height: '100%' }}></svg>
    </Box>
  );
};

const SalesFlowCard: React.FC = () => {
  const [category, setCategory] = useState<string>('Title 1');
  const [openFullscreen, setOpenFullscreen] = useState<boolean>(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleCategoryChange = (event: SelectChangeEvent<string>) => {
    setCategory(event.target.value);
  };

  const toggleFullscreen = () => {
    setOpenFullscreen((prev) => !prev);
  };

  const renderChart = (containerHeight: number | string = 400) => (
    <Box sx={{ 
      position: 'relative', 
      height: containerHeight,
      width: '100%',
      minHeight: 400
    }}>
      <SalesChart containerHeight={containerHeight} />
    </Box>
  );

  return (
    <Card sx={{ 
      height: '100%', 
      borderRadius: 3, 
      boxShadow: 2, 
      backgroundColor: "#E7EBF0",
    }}>
      <CardContent>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 4,
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? 2 : 0
        }}>
          <Typography variant="h6" fontWeight="bold" color="#08070f">
            Sales Flow
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            gap: 2,
            width: isMobile ? '100%' : 'auto',
            justifyContent: isMobile ? 'space-between' : 'flex-end'
          }}>
            <Select
              value={category}
              onChange={handleCategoryChange}
              size="small"
              sx={{
                minWidth: isMobile ? '40%' : 80,
                bgcolor: '#E7EBF0',
                boxShadow: '0 2px 8px #E0E7EF',
                fontWeight: 600,
              }}
            >
              <MenuItem value="Title 1">Title 1</MenuItem>
              <MenuItem value="Title 2">Title 2</MenuItem>
            </Select>
            <Select
              value="Title 1"
              size="small"
              sx={{
                minWidth: isMobile ? '40%' : 80,
                bgcolor: '#E7EBF0',
                boxShadow: '0 2px 8px #E0E7EF',
                fontWeight: 600,
              }}
            >
              <MenuItem value="Title 1">Title 1</MenuItem>
              <MenuItem value="Title 2">Title 2</MenuItem>
            </Select>
            {!isMobile && (
              <IconButton onClick={toggleFullscreen} sx={{ color: '#08070f' }}>
                <FullscreenIcon />
              </IconButton>
            )}
          </Box>
        </Box>

        <Box sx={{
          backgroundColor: '#E7EBF0',
          borderRadius: 1,
          border: '1px solid #e2e8f0',
          overflow: 'hidden',
          minHeight: 400
        }}>
          {renderChart(400)}
        </Box>

        {isMobile && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <IconButton onClick={toggleFullscreen} sx={{ color: '#08070f' }}>
              <FullscreenIcon />
            </IconButton>
          </Box>
        )}

        <Dialog
          open={openFullscreen}
          onClose={toggleFullscreen}
          fullWidth
          maxWidth="lg"
          fullScreen={isMobile}
          sx={{
            '& .MuiDialog-paper': {
              overflow: 'visible',
            },
          }}
        >
          <DialogContent sx={{ height: isMobile ? '100%' : '80vh', p: 4 }}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              mb: 3 
            }}>
              <Typography variant={isMobile ? "h5" : "h5"} fontWeight="bold" color="#08070f">
                Sales Flow Overview
              </Typography>
              <IconButton onClick={toggleFullscreen} sx={{ color: '#08070f' }}>
                <FullscreenIcon />
              </IconButton>
            </Box>
            {renderChart(isMobile ? 'calc(100% - 100px)' : 'calc(100% - 60px)')}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default SalesFlowCard;