import React from "react";

const StatsCard = ({ title, value, bgColor }) => {
  return (
    <div className={`p-4 rounded-xl text-white ${bgColor}`}>
      <p className="text-lg font-semibold">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};

export default StatsCard;
