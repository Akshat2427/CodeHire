import React from "react";

const CalendarComponent = () => {
  return (
    <div className="p-4 bg-white rounded-xl shadow-md">
      <p className="font-bold">January 2022</p>
      <div className="grid grid-cols-7 gap-2 mt-2">
        {[...Array(31).keys()].map((day) => (
          <div key={day} className="p-2 rounded-full bg-gray-100 text-center">
            {day + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarComponent;
