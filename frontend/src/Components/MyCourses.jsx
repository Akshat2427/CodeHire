import React from "react";
import { useSelector } from "react-redux"; // Added for sidebar state
import Card from "./Card";
import data from "./Courses/tempUserCourse.json"; // Assuming this will be used

// Sample data (replace with dynamic data from `data` or Redux if intended)

const MyCourses = () => {
  const openSidebar = useSelector((state) => state.ui_store.openSidebar);
  const isCollapsed = useSelector((state) => state.ui_store.isCollapsed || false); // Assuming this might be added
  const fullscreenSidebar = useSelector((state) => state.ui_store.fullscreenSidebar);
  const [inMyCourses, setInMyCourses] = React.useState(false);
  // Optionally use imported data instead of hardcoded array
  // const courses = data.length > 0 ? data : myCoursesArray;
  const purchasedCourses = useSelector((state) => state.purchasedCourses.purchasedCourses);
  const courses = useSelector((state) => state.courses.courses);
  const filteredData = purchasedCourses.map((course) => {
    const courseData = courses.find((item) => item.c_id === course);
    return courseData ? { ...courseData, c_id: course } : null;
  });

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
        {filteredData.length > 0 ? (
          filteredData.map((course) => (
            <div
              className="min-w-[250px] flex-shrink-0"
              key={course.c_id}
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