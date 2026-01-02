import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
} from 'recharts';

import type { ValueType, NameType, Payload } from 'recharts/types/component/DefaultTooltipContent';
import './MetricChart.css';

interface MetricChartProps {
  data: Array<{ month: string; value: number }>;
  color?: string;
}

const nf = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 });

const formatNumber = (v: unknown) => {
  const n = typeof v === 'number' ? v : Number(v);
  return Number.isFinite(n) ? nf.format(n) : '';
};

type TooltipContentProps = {
  active?: boolean;
  payload?: Array<Payload<ValueType, NameType>>;
};

const ValueTooltip: React.FC<TooltipContentProps> = ({ active, payload }) => {
  if (!active || !payload?.length) return null;

  const value = payload[0]?.value;

  return <div className="metric-tooltip">{formatNumber(value)}</div>;
};

export const MetricChart: React.FC<MetricChartProps> = ({ data, color = '#000000' }) => {
  return (
      <div className="metric-chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data} margin={{ top: 18, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#D3D3D3" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#D3D3D3" stopOpacity={0.3} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="0" stroke="#f0f0f0" vertical={false} />

            <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#999', fontSize: 12, fontFamily: 'Poppins' }}
                dy={10}
            />

            <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#999', fontSize: 12, fontFamily: 'Poppins' }}
                dx={-10}
                tickFormatter={(v) => formatNumber(v)}
            />

            <Tooltip
                content={<ValueTooltip />}
                cursor={false}
            />

            <Area
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={2}
                strokeDasharray="3 3"
                fill="url(#colorValue)"
                animationDuration={500}
                activeDot={{ r: 6, fill: '#000', stroke: '#000', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
  );
};
