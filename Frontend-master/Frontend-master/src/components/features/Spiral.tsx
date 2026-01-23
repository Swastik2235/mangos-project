import React from 'react';

interface SpiralData {
  completed: number;
  remaining: number;
  unit?: string;
}

const createSpiral = (centerX: number, centerY: number, maxTurns = 3, scale = 1): string => {
  const radiusIncrement = 15 * scale;
  let pathData = '';
  for (let t = 0; t <= 360 * maxTurns; t += 5) {
    const radius = t * radiusIncrement / 360;
    const x = centerX + radius * Math.cos((t * Math.PI) / 180);
    const y = centerY + radius * Math.sin((t * Math.PI) / 180);
    pathData += t === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;
  }
  return pathData;
};

const calculateSpiralSegments = (completed: number, total: number, totalSteps = 720): number => {
  return (completed / total) * totalSteps;
};

interface SpiralProps {
  data?: SpiralData;
  width?: number;
  height?: number;
}

const Spiral: React.FC<SpiralProps> = ({ 
  data = { completed: 30, remaining: 70, unit: 'L' },
  width = 400,
  height = 400
}) => {
  const centerX = width / 2;
  const centerY = height / 2;
  const scale = Math.min(width, height) / 400; // Adjust scale based on container size

  const total = data.completed + data.remaining;
  const completedSteps = calculateSpiralSegments(data.completed, total);

  const spiralPath = createSpiral(centerX, centerY, 3, scale);
  
  return (
    <svg 
      width="100%" 
      height="100%" 
      viewBox={`0 0 ${width} ${height}`}
    >
      {/* Completed portion (blue) */}
      <path
        d={spiralPath}
        fill="none"
        stroke="#2563EB"
        strokeWidth={2 * scale}
        strokeDasharray={`${completedSteps} ${720}`}
      />
      
      {/* Remaining portion (red) */}
      <path
        d={spiralPath}
        fill="none"
        stroke="#EF4444"
        strokeWidth={3 * scale}
        strokeDasharray={`${720 - completedSteps} ${720}`}
        strokeDashoffset={-completedSteps}
      />

      {/* Completed Value */}
      <text
        x={centerX}
        y={centerY - 20}
        textAnchor="middle"
        fontSize={`${14 * scale}px`}
        fill="#2563EB"
        fontWeight="bold"
      >
        {data.completed}{data.unit}
      </text>

      {/* Remaining Value */}
      <text
        x={centerX}
        y={centerY + 30}
        textAnchor="middle"
        fontSize={`${14 * scale}px`}
        fill="#EF4444"
        fontWeight="bold"
      >
        {data.remaining}{data.unit}
      </text>
    </svg>
  );
};

export default Spiral;