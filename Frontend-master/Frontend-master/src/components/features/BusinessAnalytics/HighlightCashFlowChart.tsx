import  { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Fullscreen, FullscreenExit } from '@mui/icons-material';

interface ChartDataItem {
  name: string;
  start: number;
  value: number;
  label: string;
  borderColor: string;
  end?: number;
}

interface CustomBarProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  fill?: string;
  payload?: {
    borderColor: string;
    label: string;
    [key: string]: any;
  };
  [key: string]: any;
}

const CustomBar = (props: CustomBarProps) => {
  const { x = 0, y = 0, width = 0, height = 0, fill, payload } = props;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fill || "#d1d5db"}
        stroke={payload?.borderColor}
        strokeWidth={2}
        rx={2}
        ry={2}
      />
      <text
        x={x + width / 2}
        y={y + height / 2 + 4}
        fill="#000"
        fontSize={14}
        textAnchor="middle"
      >
        {payload?.label}
      </text>
    </g>
  );
};

const chartData: ChartDataItem[] = [
  {
    name: 'Operating Activities',
    start: 0,
    value: 30,
    label: '12L',
    borderColor: '#14532d',
  },
  {
    name: 'Investing Activities',
    start: 10,
    value: 20,
    label: '12L',
    borderColor: '#14532d',
  },
  {
    name: 'Financing Activities',
    start: 26,
    value: 10,
    label: '12L',
    borderColor: '#7f1d1d',
  },
];

export default function MultiChartHighlightsCard() {
  const [fullscreen, setFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setFullscreen(!fullscreen);
  };

  return (
    <div
      style={{
        backgroundColor: '#E7EBF0',
        borderRadius: 10,
        padding: 5,
        boxShadow: '0 4px 5px rgba(0,0,0,0.05)',
        height: fullscreen ? '100vh' : 'auto',
        width: fullscreen ? '100vw' : 'auto',
        position: fullscreen ? 'fixed' : 'relative',
        top: fullscreen ? 0 : 'auto',
        left: fullscreen ? 0 : 'auto',
        zIndex: fullscreen ? 9999 : 'auto',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>Highlights</h3>
        <span style={{ cursor: 'pointer' }} onClick={toggleFullscreen}>
          {fullscreen ? <FullscreenExit /> : <Fullscreen />}
        </span>
      </div>

      <ResponsiveContainer width="100%" height={fullscreen ? '80vh' : 390}>
        <BarChart
          layout="vertical"
          data={chartData.map((d) => ({ ...d, end: d.start + d.value }))}
          margin={{ top: 10, right: 30, left: 120, bottom: 10 }}
        >
          <CartesianGrid stroke="#e2e8f0" horizontal={false} />
          <XAxis
            type="number"
            domain={[0, 35]}
            tickFormatter={(val) => `${val}L`}
            tick={{ fontSize: 12 }}
            stroke="#000"
          />
          <YAxis
            type="category"
            dataKey="name"
            tick={{ fontSize: 14, fill: '#1e293b' }}
          />
          <Tooltip
            formatter={( item: any) => [item.payload.label, '']}
            cursor={false}
          />
          <Bar
            dataKey="value"
            background={false}
            shape={CustomBar}
            isAnimationActive={false}
            fill="#d1d5db"
          />
        </BarChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 24,
          marginTop: 20,
          fontSize: 14,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 10, height: 12, backgroundColor: '#14532d', borderRadius: '50%' }} />
          <span>Positive</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 10, height: 12, backgroundColor: '#7f1d1d', borderRadius: '50%' }} />
          <span>Negative</span>
        </div>
      </div>
    </div>
  );
}