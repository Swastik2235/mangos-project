// import React from 'react';

// interface FlowConnectionProps {
//   type: 'line' | 'arrow';
//   position: number;
//   color: string;
//   reversed: boolean;
//   centerY: number;
// }

// export const FlowConnection: React.FC<FlowConnectionProps> = ({ 
//   type, 
//   position, 
//   color, 
//   reversed,
//   centerY 
// }) => {
//   const baseY = position * 100 + 50;
//   const width = 180;

//   // Calculate control points for the curve
//   const path = reversed
//     ? `M 0 ${centerY} 
//        C ${width * 0.3} ${centerY} ${width * 0.7} ${baseY} ${width} ${baseY}`
//     : `M ${width} ${centerY} 
//        C ${width * 0.7} ${centerY} ${width * 0.3} ${baseY} 0 ${baseY}`;

//   return (
//     <svg className="absolute h-full w-full overflow-visible pointer-events-none">
//       <path
//         d={path}
//         stroke={color}
//         strokeWidth="3"
//         fill="none"
//         strokeLinecap="round"
//       />
//       {type === 'arrow' && (
//         <path
//           d={reversed ? 
//             `M ${width - 12} ${baseY - 6} L ${width} ${baseY} L ${width - 12} ${baseY + 6}` :
//             `M 12 ${baseY - 6} L 0 ${baseY} L 12 ${baseY + 6}`
//           }
//           fill={color}
//         />
//       )}
//     </svg>
//   );
// };
import React from 'react';
// import { Box, Typography, Button, Card, CardContent, Divider } from '@mui/material';
// import { Maximize2 } from 'lucide-react';

interface FlowConnectionProps {
  type: 'line' | 'arrow';
  position: number;
  color: string;
  reversed: boolean;
  centerY: number;
}

export const FlowConnection: React.FC<FlowConnectionProps> = ({
  type,
  position,
  color,
  reversed,
  centerY,
}) => {
  const baseY = position * 100 + 50;
  const width = 180;
//   const centerX = reversed ? 0 : width;

  const path =
   reversed
    ?
     `M 0 ${centerY} C ${width * 0.3} ${centerY} ${width * 0.7} ${baseY} ${width} ${baseY}`
    : 
    `M ${width} ${centerY} C ${width * 0.7} ${centerY} ${width * 0.3} ${baseY} 0 ${baseY}`
    ;

  return (
    <svg style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'visible' }}>
      <path
        d={path}
        stroke={color}
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      {type === 'arrow' && (
        <path
          d={
            reversed
              ? `M ${width - 12} ${baseY - 6} L ${width} ${baseY} L ${width - 12} ${baseY + 6}`
              : `M 12 ${baseY - 6} L 0 ${baseY} L 12 ${baseY + 6}`
          }
          fill={color}
        />
      )}
    </svg>
  );
};