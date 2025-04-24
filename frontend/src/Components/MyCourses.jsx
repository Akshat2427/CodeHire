import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "./Card";
import { fetchCourses } from "../store/courseReducers";
import { fetchPurchasedCourses } from "../store/purchased_courses";
import Loading from "./Loading";

const MyCourses = () => {
  const dispatch = useDispatch();

  // Sidebar states
  const openSidebar = useSelector((state) => state.ui_store.openSidebar);
  const isCollapsed = useSelector((state) => state.ui_store.isCollapsed || false);
  const fullscreenSidebar = useSelector((state) => state.ui_store.fullscreenSidebar);

  // Redux state
  const purchasedCourses = useSelector((state) => state.purchasedCourses.purchasedCourses);
  const purchasedLoading = useSelector((state) => state.purchasedCourses.loading);
  const courses = useSelector((state) => state.courses.courses);
  const coursesLoading = useSelector((state) => state.courses.loading);

  // Fetch data on mount
  useEffect(() => {
    dispatch(fetchPurchasedCourses());
    if (courses.length === 0) {
      dispatch(fetchCourses());
    }
  }, [dispatch]);

  // Merge and filter data
  const filteredData = purchasedCourses
    .map((courseId) => {
      const courseData = courses.find((course) => course.c_id === courseId);
      return courseData ? { ...courseData, c_id: courseId } : null;
    })
    .filter((course) => course !== null);

  // Loading state
  if (purchasedLoading || coursesLoading) {
    return <Loading />;
  }

  return (
    <div
      className={`p-8 min-h-screen bg-gray-50 transition-all duration-300 ${
        window.innerWidth <= 768
          ? fullscreenSidebar
            ? "hidden"
            : "ml-0"
          : openSidebar
          ? "ml-60"
          : "ml-16"
      }`}
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">🔥 My Courses</h2>

      <div
        className="flex flex-wrap gap-6 overflow-x-auto scrollbar-hide pb-4"
        role="region"
        aria-label="My enrolled courses list"
      >
        {filteredData.length > 0 ? (
          filteredData.map((course) => (
            <div className="min-w-[250px] flex-shrink-0" key={course.c_id}>
              <Card {...course} />
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center w-full">No enrolled courses yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyCourses;
