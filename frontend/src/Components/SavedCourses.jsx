import React from "react";
import { useSelector } from "react-redux";
import Card from "./Card";
import data from "./Courses/courseData.js";
import { useDispatch } from "react-redux";
import { fetchCourses } from "../store/courseReducers.js";
const SavedCourses = () => {
  const savedCourseIds = useSelector((state) => state.savedCourses.savedCourses);
  const openSidebar = useSelector((state) => state.ui_store.openSidebar);
  const isCollapsed = useSelector((state) => state.ui_store.isCollapsed || false); // Assuming this might be added
  const fullscreenSidebar = useSelector((state) => state.ui_store.fullscreenSidebar);

  // Optimize filtering using a Set for O(n) lookup
  const savedIdsSet = new Set(savedCourseIds.map((item) => item.c_id));
  // const savedCourses = data.filter((course) => savedIdsSet.has(course.id));
  const dispatch = useDispatch();
  const courses = useSelector((state) => state.courses.courses);
  const savedCourses = courses.filter((course) => savedIdsSet.has(course.c_id));

  return (
    <div
      className={`p-8 min-h-screen bg-gray-50 transition-all duration-300 ${
        window.innerWidth <= 768 
          ? (fullscreenSidebar ? "hidden" : "ml-0")
          : (openSidebar ? "ml-60" : "ml-16")
      }`}
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Saved Courses</h2>
      <div
        className="flex flex-wrap gap-6 overflow-x-auto scrollbar-hide pb-4"
        role="region"
        aria-label="Saved courses list"
      >
        {savedCourses.length > 0 ? (
          savedCourses.map((course) => (
            <div
              className="min-w-[250px] flex-shrink-0"
              key={course.c_id}
            >
              <Card {...course} />
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center w-full">
            No saved courses yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default SavedCourses;