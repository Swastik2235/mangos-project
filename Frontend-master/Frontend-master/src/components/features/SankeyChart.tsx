import { Box, Typography } from '@mui/material';
import { ResponsiveContainer, Sankey, Tooltip } from 'recharts';

const commonStyles = {
  boxShadow: `
    4px 4px 20px 0px #6F8CB069,
    -6px -6px 20px 0px #FFFFFF,
    2px 2px 4px 0px #728EAB1A
  `,
  background: '#E7EBF0',
  borderRadius: '10px',
  padding: 2,
};

const data = {
  nodes: [
    { name: 'Budget', value: 230 },
    { name: 'Development', value: 140 },
    { name: 'Design', value: 80 },
    { name: 'Marketing', value: 130 },
    { name: 'Complete', value: 140 },
    { name: 'In Progress', value: 90 },
  ],
  links: [
    { source: 0, target: 1, value: 100 },
    { source: 0, target: 2, value: 50 },
    { source: 0, target: 3, value: 80 },
    { source: 1, target: 4, value: 60 },
    { source: 1, target: 5, value: 40 },
    { source: 2, target: 4, value: 30 },
    { source: 2, target: 5, value: 20 },
    { source: 3, target: 4, value: 50 },
    { source: 3, target: 5, value: 30 },
  ],
};

const SankeyChart = () => {
  return (
    <Box sx={commonStyles}>
      <Typography variant="h3"  sx={{ mb: 2,}}>
        Sankey Chart
      </Typography>
      <Box sx={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <Sankey
            data={data}
            nodePadding={50}
            nodeWidth={10}
            linkCurvature={0.5}
            margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
            link={{ stroke: '#2564E6' }}
            node={(nodeProps) => {
              const nodeData = data.nodes[nodeProps.index];
              return (
                <g transform={`translate(${nodeProps.x},${nodeProps.y})`}>
                  <rect
                    x={0}
                    y={0}
                    width={nodeProps.width}
                    height={nodeProps.height}
                    fill="#2564E6"
                    stroke="#ccc"
                  />
                  <text
                    x={nodeProps.width / 2}
                    y={nodeProps.height / 2}
                    textAnchor="middle"
                    dy=".35em"
                    fill="#fff"
                    fontSize="12px"
                  >
                    {nodeProps.name}
                  </text>
                  <text
                    x={nodeProps.width / 2}
                    y={nodeProps.height + 12}
                    textAnchor="middle"
                    fill="#000"
                    fontSize="10px"
                  >
                    {nodeData.value}
                  </text>
                </g>
              );
            }}
          >
            <Tooltip formatter={(value) => `Count: ${value}`} />
          </Sankey>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default SankeyChart;
