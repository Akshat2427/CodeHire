import React from "react";
import { useSelector } from "react-redux"; // Added for sidebar state
import Card from "./Card";
import data from "./Courses/tempUserCourse.json"; // Assuming this will be used

// Sample data (replace with dynamic data from `data` or Redux if intended)
const myCoursesArray = [
  {
    id: 1,
    title: "Google SDE",
    companyImg: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    stages: 8,
    rating: 4.7,
    buttonTitle: "Resume",
  },
];

const MyCourses = () => {
  const openSidebar = useSelector((state) => state.ui_store.openSidebar);
  const isCollapsed = useSelector((state) => state.ui_store.isCollapsed || false); // Assuming this might be added
  const fullscreenSidebar = useSelector((state) => state.ui_store.fullscreenSidebar);
    console.log("fullscreenSidebar" , fullscreenSidebar);

  // Optionally use imported data instead of hardcoded array
  const courses = data.length > 0 ? data : myCoursesArray;

  return (
    <div
      className={`p-8 min-h-screen bg-gray-50 transition-all duration-300 ${
        window.innerWidth <= 768 
          ? (fullscreenSidebar ? "hidden" : "ml-0")
          : (openSidebar ? "ml-60" : "ml-16")
      }`}
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6 ">
        🔥 My Courses
      </h2>
      <div
        className="flex flex-wrap gap-6 overflow-x-auto scrollbar-hide pb-4"
        role="region"
        aria-label="My enrolled courses list"
      >
        {courses.length > 0 ? (
          courses.map((course) => (
            <div
              className="min-w-[250px] flex-shrink-0"
              key={course.id}
            >
              <Card {...course} />
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center w-full">
            No enrolled courses yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default MyCourses;