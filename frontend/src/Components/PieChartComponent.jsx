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
    <div className="flex flex-col md:flex-row w-full p-4 md:p-8 bg-gray-50 shadow-md rounded-lg">
      {/* Left: Skill Legend */}
     { window.innerWidth >=768 ?  <div className="w-full md:w-1/4 pr-0 md:pr-8 mb-4 md:mb-0 flex justify-center md:justify-start">
        <div className="space-y-2 flex flex-col">
          {chartData.map((entry, index) => (
            <div key={index} className="flex items-center">
              <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: SKILL_COLOR }}></div>
              <span className="text-gray-700 font-semibold">{entry.skill}</span>
            </div>
          ))}
        </div>
      </div> : <h1 className="text-center font-bold text-2xl">Skill Radar</h1>}

      {/* Right: Radar Chart */}
      <div className="w-full md:w-3/4">
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