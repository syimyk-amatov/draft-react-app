import { useEffect, useState } from "react";

interface BarChartItem {
  label: string;
  value: number;
}

interface BarChartProps {
  items: BarChartItem[];
}

export const BarChart = ({ items }: BarChartProps) => {
  const maxValue = Math.max(...items.map((item) => item.value));
  const bars = items.map((item) => {
    const barHeight = (item.value / maxValue) * 100;
    return { ...item, height: barHeight };
  });

  return (
    <div className="bar-chart">
      {bars.map((item) => (
        <div key={item.label} className="bar-chart-item">
          <div className="bar-chart-label">{item.label}</div>
          <div className="bar-chart-bar" style={{ height: `${item.height}%` }}></div>
        </div>
      ))}
    </div>
  );
};

export const BarChartDemo = () => {
  const data = [
    { label: "A", value: 10 },
    { label: "B", value: 20 },
    { label: "C", value: 15 },
  ];

  return (
    <div>
      <h2>Bar Chart Demo</h2>
      <BarChart items={data} />
    </div>
  );
};
