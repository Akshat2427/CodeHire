import React, { useEffect, useState } from "react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";

const SKILL_COLOR = "#28A745"; // Green color

const RadarChartComponent = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    // Static skill data
    const skillData = [
      { skill: "React", score: 90 },
      { skill: "Node.js", score: 75 },
      { skill: "JavaScript", score: 85 },
      { skill: "CSS", score: 80 },
      { skill: "MongoDB", score: 70 },
      { skill: "Express", score: 78 }
    ];

    setChartData(skillData);
  }, []);

  return (
    <div className="flex w-full p-8 bg-gray-50 shadow-md rounded-lg">
      {/* Left: Skill Legend */}
      <div className="flex-1/4 pr-8">
        {/* <h2 className="text-2xl font-bold text-gray-800 mb-4">Skill Breakdown</h2>
        <p className="text-gray-600 mb-4">This chart represents proficiency levels across different skills.</p> */}

        {/* Skill Legend */}
        <div className="space-y-2 flex justify-center flex-col">
          {chartData.map((entry, index) => (
            <div key={index} className="flex  items-center">
              <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: SKILL_COLOR }}></div>
              <span className="text-gray-700 font-semibold">{entry.skill}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Radar Chart */}
      <div className="flex-3/4">
        <ResponsiveContainer width="100%" height={300}>
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="skill" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} />
            <Radar name="Skills" dataKey="score" stroke={SKILL_COLOR} fill={SKILL_COLOR} fillOpacity={0.6} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RadarChartComponent;
