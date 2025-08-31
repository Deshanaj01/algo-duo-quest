import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const ProgressChart = ({ data }) => {
  // Transform data for the chart
  const chartData = data.map(item => ({
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    xp: item.xp,
    problems: item.problemsSolved
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Legend />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="xp"
          stroke="#0ea5e9"
          strokeWidth={2}
          name="XP Earned"
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="problems"
          stroke="#10b981"
          strokeWidth={2}
          name="Problems Solved"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ProgressChart;   