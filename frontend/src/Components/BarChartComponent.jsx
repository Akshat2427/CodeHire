import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const AreaChartComponent = () => {
  
  const skillData = [
    { name: "React", frontend: 90, backend: 30 },
    { name: "HTML", frontend: 95, backend: 20 },
    { name: "CSS", frontend: 85, backend: 25 },
    { name: "Node.js", frontend: 40, backend: 90 },
    { name: "Express", frontend: 35, backend: 85 },
    { name: "MongoDB", frontend: 20, backend: 80 },
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-full max-w-full">
      <h3 className="text-lg font-semibold mb-4 text-center md:text-left">Frontend vs Backend Skills</h3>
      <div className="w-full h-64 md:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={skillData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorFrontend" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorBackend" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>

            <XAxis dataKey="name" className="text-xs md:text-sm" />
            <YAxis className="text-xs md:text-sm" />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />

            <Area
              type="monotone"
              dataKey="frontend"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorFrontend)"
            />
            <Area
              type="monotone"
              dataKey="backend"
              stroke="#82ca9d"
              fillOpacity={1}
              fill="url(#colorBackend)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AreaChartComponent;