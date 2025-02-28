import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const AreaChartComponent = () => {
  // Sample data for frontend and backend skills
  const skillData = [
    { name: "React", frontend: 90, backend: 30 },
    { name: "HTML", frontend: 95, backend: 20 },
    { name: "CSS", frontend: 85, backend: 25 },
    { name: "Node.js", frontend: 40, backend: 90 },
    { name: "Express", frontend: 35, backend: 85 },
    { name: "MongoDB", frontend: 20, backend: 80 },
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Frontend vs Backend Skills</h3>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart
          data={skillData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            {/* Frontend Skill Gradient */}
            <linearGradient id="colorFrontend" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>

            {/* Backend Skill Gradient */}
            <linearGradient id="colorBackend" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>

          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />

          {/* Frontend Area */}
          <Area
            type="monotone"
            dataKey="frontend"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorFrontend)"
          />

          {/* Backend Area */}
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
  );
};

export default AreaChartComponent;
