import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

const TopicChart = ({ data }) => {
  const COLORS = ['#0ea5e9', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  // Transform and sort data
  const chartData = data
    .map(item => ({
      topic: item.topic,
      solved: item.solved,
      accuracy: item.accuracy
    }))
    .sort((a, b) => b.solved - a.solved)
    .slice(0, 6);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="topic" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="solved" name="Problems Solved">
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TopicChart;