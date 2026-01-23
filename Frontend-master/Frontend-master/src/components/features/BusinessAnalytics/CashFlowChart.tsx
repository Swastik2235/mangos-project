import React, { useState, useRef, useMemo } from 'react';
import {
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Bar,
  LabelList,
  Line,
  Cell,
} from 'recharts';
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
  Box,
  Stack,
} from '@mui/material';
import { Fullscreen, FullscreenExit } from '@mui/icons-material';

/**
 * -----------------------------------------------------------------------------
 * Cash‑flow Waterfall chart component – pixel‑matched to reference UI
 * -----------------------------------------------------------------------------
 * •   MUI Card shell on a soft blue background
 * •   Bright‑green "total" bars, grey middle bars with coloured borders
 * •   Horizontal connector line for running total (solid grey)
 * •   Legend + fullscreen toggle exactly as in mock‑up
 * -----------------------------------------------------------------------------
 */

// ──────────────────────────────────────────────────────────────────────────────
// Types
// ──────────────────────────────────────────────────────────────────────────────
type RawDatum = {
  name: string;
  value: number;
  type: 'start' | 'positive' | 'negative' | 'end';
};

interface WaterfallDatum extends RawDatum {
  stackBase: number;
  stackValue: number;
  cumulative: number;
}

// ──────────────────────────────────────────────────────────────────────────────
// Static data (to be replaced with API payload in production)
// ──────────────────────────────────────────────────────────────────────────────
const rawData: RawDatum[] = [
  { name: '18.10.22', value: 25, type: 'start' },
  { name: 'Operation', value: 30, type: 'positive' },
  { name: 'Investing', value: -10, type: 'negative' },
  { name: 'Financing', value: 55, type: 'positive' },
  { name: '19.10.22', value: 100, type: 'end' },
];

// ──────────────────────────────────────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────────────────────────────────────
const preprocess = (data: RawDatum[]): WaterfallDatum[] => {
  let running = 0;
  return data.map((d) => {
    if (d.type === 'start') {
      running = d.value;
      return { ...d, stackBase: 0, stackValue: d.value, cumulative: running };
    }

    if (d.type === 'end') {
      return { ...d, stackBase: 0, stackValue: running, cumulative: running };
    }

    const base = running;
    running += d.value;
    return { ...d, stackBase: base, stackValue: d.value, cumulative: running };
  });
};

const barFill = '#C4C4C4';
const green = '#29B138';
const brown = '#782F2F';

// ──────────────────────────────────────────────────────────────────────────────
// Legend helper
// ──────────────────────────────────────────────────────────────────────────────
interface LegendProps {
  colour: string;
  border?: string;
  label: string;
}

const LegendSwatch: React.FC<LegendProps> = ({ colour, border, label }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
    <Box
      sx={{
        width: 14,
        height: 14,
        borderRadius: '50%',
        backgroundColor: colour,
        border: `2px solid ${border ?? colour}`,
      }}
    />
    <span style={{ fontWeight: 600 }}>{label}</span>
  </Box>
);

// ──────────────────────────────────────────────────────────────────────────────
// Main component
// ──────────────────────────────────────────────────────────────────────────────
const CashflowWaterfallChart: React.FC = () => {
  const [fullscreen, setFullscreen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const data = useMemo(() => preprocess(rawData), []);

  const minY = Math.min(...data.map((d) => d.cumulative));
  const maxY = Math.max(...data.map((d) => d.cumulative));

  const handleFullscreenToggle = () => {
    if (!fullscreen && cardRef.current?.requestFullscreen) {
      cardRef.current.requestFullscreen();
    } else if (fullscreen && document.exitFullscreen) {
      document.exitFullscreen();
    }
    setFullscreen(!fullscreen);
  };

  return (
    <Card
      ref={cardRef}
      sx={{
        bgcolor: '#E7EBF0',
        borderRadius: 3,
        boxShadow: 3,
        position: fullscreen ? 'fixed' : 'relative',
        inset: fullscreen ? 0 : 'auto',
        zIndex: fullscreen ? 1300 : 'auto',
        height: fullscreen ? '100vh' : 'auto',
      }}
    >
      {/* Header */}
      <CardHeader
        title="Cashflow"
        sx={{ pb: 0, '& .MuiCardHeader-title': { fontWeight: 700, fontSize: 20 } }}
        action={
          <IconButton onClick={handleFullscreenToggle} aria-label="toggle fullscreen">
            {fullscreen ? <FullscreenExit /> : <Fullscreen />}
          </IconButton>
        }
      />

      {/* Chart */}
      <CardContent sx={{ height: fullscreen ? '80vh' : 440 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 24, right: 32, left: 8, bottom: 32 }}>
            <CartesianGrid stroke="#E0E0E0" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 13 }} axisLine={{ stroke: '#000', strokeWidth: 1 }} />
            <YAxis domain={[minY - 10, maxY + 10]} hide />
            <Tooltip
              cursor={{ fill: 'transparent' }}
              formatter={(_value: number, _key, ctx) => {
                const p = ctx?.payload as WaterfallDatum;
                if (p.type === 'start' || p.type === 'end') return [`Total: ${p.cumulative}`, ''];
                return [`Change: ${p.stackValue > 0 ? '+' : ''}${p.stackValue}`, ''];
              }}
            />

            {/* Invisible base to stack on */}
            <Bar dataKey="stackBase" stackId="wf" fill="transparent" />

            {/* Waterfall bars */}
            <Bar dataKey="stackValue" stackId="wf" barSize={56} isAnimationActive={false} radius={[0, 0, 0, 0]}>
              <LabelList
                dataKey="stackValue"
                position="top"
                formatter={(v: number) => (v >= 0 ? `+${v}` : `${v}`)}
                style={{ fill: '#000', fontWeight: 600, fontSize: 14 }}
              />
              {data.map((entry, idx) => (
                <Cell
                  key={`cell-${idx}`}
                  fill={entry.type === 'start' || entry.type === 'end' ? green : barFill}
                  stroke={
                    entry.type === 'positive' ? green : entry.type === 'negative' ? brown : 'transparent'
                  }
                  strokeWidth={entry.type === 'positive' || entry.type === 'negative' ? 2 : 0}
                />
              ))}
            </Bar>

            {/* Connector line for cumulative total */}
            <Line
              type="linear"
              dataKey="cumulative"
              stroke="#B0B8C5"
              strokeWidth={1}
              dot={false}
              isAnimationActive={false}
            />
          </ComposedChart>
        </ResponsiveContainer>

        {/* Legend */}
        <Stack direction="row" justifyContent="center" spacing={4} mt={4}>
          <LegendSwatch colour={green} label="No change" />
          <LegendSwatch colour="#ffffff" border={green} label="Positive" />
          <LegendSwatch colour={brown} label="Negative" />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CashflowWaterfallChart;
