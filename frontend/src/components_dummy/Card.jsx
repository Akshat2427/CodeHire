import React from "react";

const Card = ({ companyImg, title, stages, rating }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 flex  flex-col items-start w-72 hover:shadow-lg transition-shadow">
      {/* Company Image */}
      <img
        src={companyImg}
        alt="Company Logo"
        className="h-32 w-full object-cover rounded-lg"
      />

      {/* Course Title */}
      <h3 className="text-xl font-semibold mt-4">{title}</h3>

      {/* Stages & Rating */}
      <div className="flex justify-between w-full items-center mt-3 text-gray-600">
        <p className="text-base">Stages: {stages}</p>
        <div className="flex items-center">
          <i className="fas fa-star text-yellow-500 mr-1"></i>
          <span className="text-base font-semibold">{rating}</span>
        </div>
      </div>

      {/* Enroll Button */}
      <button className="mt-4 px-5 py-3 bg-blue-500 text-white rounded-lg w-full text-lg text-center hover:bg-blue-600 transition">
        Enroll Now
      </button>
    </div>
  );
};

export default Card;
