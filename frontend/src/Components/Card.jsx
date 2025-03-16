import React from "react";
import { Bookmark } from "lucide-react"; // Using Lucide for better icons
import { saveCourse } from "../store/saved_courses";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Card = ({ companyImg, title, stages, rating, buttonTitle, id, description, price }) => {
  const purchasedCourses = useSelector((state) => state.purchasedCourses.purchasedCourses);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToSaveCourses = () => {
    dispatch(saveCourse({ id }));
  };

  const handleRouteChange = () => {
    console.log("purchasedCourses", purchasedCourses.find(course => course.id === id));
    if (purchasedCourses.find(course => course.id === id)) {
      navigate(`/course/${id}`);
    } else {
      navigate(`/course/description/${id}`);
    }
  };

  // Generate star rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-start w-80 max-w-xs transform hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden border border-gray-100">
      {/* Save Icon at Top Right */}
      <button
        onClick={addToSaveCourses}
        className="absolute right-4 top-4 text-gray-500 bg-white p-2 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-all z-10 shadow-md"
      >
        <Bookmark size={22} />
      </button>

      {/* Company Image */}
      <div className="w-full h-40 bg-gray-50 rounded-xl overflow-hidden mb-5 relative">
        <img
          src={companyImg}
          alt={`${title} Logo`}
          className="w-full h-full object-contain p-3 transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Course Title */}
      <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>

      {/* Description */}
      <p className="text-gray-600 text-sm line-clamp-3 mb-4">
        {description || "Learn industry-leading skills with this comprehensive course designed to boost your career."}
      </p>

      {/* Stages, Rating, and Price */}
      <div className="w-full mb-5">
        <div className="flex justify-between items-center text-gray-700 mb-2">
          <p className="text-sm font-medium">Stages: <span className="font-semibold">{stages}</span></p>
          <div className="flex items-center space-x-1">
            {renderStars(rating)}
            <span className="text-sm font-semibold text-gray-800 ml-1">({rating})</span>
          </div>
        </div>
        <p className="text-lg font-bold text-gray-900">
          {price ? `$${price}` : "$99.99"} <span className="text-xs text-gray-500 font-normal">/ course</span>
        </p>
      </div>

      {/* Enroll Button */}
      <button
        onClick={handleRouteChange}
        className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl text-base font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg"
      >
        {buttonTitle}
      </button>
    </div>
  );
};

export default Card;