import React from "react";

const ScheduleItem = ({ title, time, bgColor }) => {
  return (
    <div className={`p-4 rounded-xl flex items-center justify-between ${bgColor}`}>
      <div className="text-white font-bold">{title}</div>
      <div className="text-white">{time}</div>
    </div>
  );
};

export default ScheduleItem;
