import React from "react";
import { Bookmark } from "lucide-react"; // Using Lucide for better icons

const Card = ({ companyImg, title, stages, rating , buttonTitle }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-start w-72 hover:shadow-lg transition-shadow relative">
      {/* Save Icon at Top Right */}
      <button className="absolute  right-5 top-5 text-gray-500 bg-gray-300 opacity-50 p-2 rounded-full hover:bg-gray-500 hover:text-gray-100 transition">
        <Bookmark size={20} />
      </button>

      {/* Company Image */}
      <div className="w-full h-1/2 rounded-lg overflow-hidden">
        <img
          src={companyImg}
          alt="Company Logo"
          className="w-full   h-full"
        />
      </div>

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

      {/* Spacer to push button to bottom */}
      <div className="flex-grow"></div>

      {/* Enroll Button */}
      <button className="mt-4 px-5 py-3 bg-blue-500 text-white rounded-lg w-full text-lg text-center hover:bg-blue-600 transition">
        {buttonTitle}
      </button>
    </div>
  );
};

export default Card;

