import React from "react";
import { Bookmark } from "lucide-react"; 
import { saveCourse } from "../store/saved_courses";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { purchaseCourse } from "../store/purchased_courses";

const Card = ({ logo, c_name, stageCount, c_rating, c_id, c_desc, c_price }) => {
  const purchasedCourses = useSelector((state) => state.purchasedCourses.purchasedCourses);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToSaveCourses = () => {
    dispatch(saveCourse({ c_id }));
    toast.success("Added to Saved Courses");
  };

  const handleRouteChange = () => {
    if (purchasedCourses.find(course => course.id === c_id)) {
      navigate(`/course/${c_id}`);
    } else {
      navigate(`/course/description/${c_id}`);
    }
  };

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
    <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 flex flex-col items-start w-72 sm:w-80 max-w-xs transform hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden border border-gray-100">
      <button
        onClick={addToSaveCourses}
        className="absolute right-3 sm:right-4 top-3 sm:top-4 text-gray-500 bg-white p-2 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-all z-10 shadow-md"
      >
        <Bookmark size={20} sm:size={22} />
      </button>

      <div className="w-full h-32 sm:h-40 bg-gray-50 rounded-xl overflow-hidden mb-4 sm:mb-5 relative">
        <img
          src={logo}
          alt={`${c_name} Logo`}
          className="w-full h-full object-contain p-2 sm:p-3 transition-transform duration-300 hover:scale-105"
        />
      </div>

      <h3 className="text-lg sm:text-2xl font-bold text-gray-900 mb-2">{c_name}</h3>

      <p className="text-gray-600 text-xs sm:text-sm line-clamp-3 mb-3 sm:mb-4">
        {c_desc || "Learn industry-leading skills with this comprehensive course designed to boost your career."}
      </p>

      <div className="w-full mb-4 sm:mb-5">
        <div className="flex justify-between items-center text-gray-700 mb-2">
          <p className="text-xs sm:text-sm font-medium">Stages: <span className="font-semibold">{stageCount}</span></p>
          <div className="flex items-center space-x-1">
            {renderStars(c_rating)}
            <span className="text-xs sm:text-sm font-semibold text-gray-800 ml-1">({c_rating})</span>
          </div>
        </div>
        <p className="text-sm sm:text-lg font-bold text-gray-900">
          {c_price ? `$${c_price}` : `$${parseInt(Math.random()*1000)}`} <span className="text-xs text-gray-500 font-normal">/ course</span>
        </p>
      </div>

      <button
        onClick={handleRouteChange}
        className="w-full py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl text-sm sm:text-base font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg"
      >
        {purchasedCourses.find(course => course.c_id === c_id) ? "Go to Course" : "View Details"}
      </button>
    </div>
  );
};

export default Card;
