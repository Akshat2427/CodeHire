import React from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

const data = [
  { month: "Feb", hours: 10 },
  { month: "Mar", hours: 40 },
  { month: "Apr", hours: 20 },
  { month: "May", hours: 30 },
];

const BarChartComponent = () => {
  return (
    <ResponsiveContainer width="100%" height={150}>
      <BarChart data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <Bar dataKey="hours" fill="#7D3C98" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
