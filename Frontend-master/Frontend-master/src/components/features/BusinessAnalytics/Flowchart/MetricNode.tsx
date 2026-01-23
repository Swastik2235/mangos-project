import React from 'react';
import { Box } from '@mui/material';
import { MetricCard } from './MetricCard';

export interface MetricNodeData {
  id: string;
  title: string;
  value: string;
  change: number;
  children?: MetricNodeData[];
}

interface MetricNodeProps {
  node: MetricNodeData;
}

export const MetricNode: React.FC<MetricNodeProps> = ({ node }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Box sx={{ position: 'relative', mb: node.children ? 2 : 0 }}>
        <MetricCard 
          title={node.title} 
          value={node.value} 
          change={node.change} 
          isParent={true}
        />
        {node.children && node.children.length > 0 && (
          <Box
            sx={{
              position: 'absolute',
              bottom: -16,
              left: '50%',
              width: '2px',
              height: '16px',
              bgcolor: 'grey.500',
              transform: 'translateX(-50%)',
            }}
          />
        )}
      </Box>
      
      {node.children && node.children.length > 0 && (
        <Box sx={{ position: 'relative' }}>
          {node.children.map((child, index) => (
            <Box 
              key={child.id} 
              sx={{ 
                position: 'relative',
                mt: index === 0 ? 0 : 4,
                '&::before': index !== 0 ? {
                  content: '""',
                  position: 'absolute',
                  top: -32,
                  left: '50%',
                  width: '2px',
                  height: '32px',
                  bgcolor: 'grey.500',
                  transform: 'translateX(-50%)',
                } : undefined
              }}
            >
              <MetricCard
                title={child.title}
                value={child.value}
                change={child.change}
                isParent={false}
              />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};