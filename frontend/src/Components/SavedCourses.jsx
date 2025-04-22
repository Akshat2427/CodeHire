import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "./Card";
import { fetchSavedCourses } from "../store/saveCourseThunk";
import Loading from "./Loading";

const SavedCourses = () => {
  const dispatch = useDispatch();
  // const savedCourseIds = useSelector((state) => state.savedCourses.savedCourses);
  // const courses = useSelector((state) => state.courses.courses);
  const { savedCourses, loading, error } = useSelector((state) => state.saved_courses);
  const openSidebar = useSelector((state) => state.ui_store.openSidebar);
  const isCollapsed = useSelector((state) => state.ui_store.isCollapsed || false);
  const fullscreenSidebar = useSelector((state) => state.ui_store.fullscreenSidebar);
  useEffect(() => {
        dispatch(fetchSavedCourses());
    }, [dispatch]);
    if (loading === true) {
      return <Loading/>
    }

    if (error === "failed") {
      return <div className="flex justify-center items-center h-screen">Error: {error}</div>;
    }
  // const savedCourses = useSelector((state) => state.savedCourses.savedCourses);  
  return (
    <div
      className={`p-8 min-h-screen bg-gray-50 transition-all duration-300 ${
        window.innerWidth <= 768 
          ? (fullscreenSidebar ? "hidden" : "ml-0")
          : (openSidebar ? "ml-60" : "ml-16")
      }`}
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Saved Courses</h2>
      <div className="flex flex-wrap gap-6 overflow-x-auto scrollbar-hide pb-4" role="region" aria-label="Saved courses list">
        {savedCourses.length > 0 ? (
          savedCourses.map((course) => (
            <div className="min-w-[250px] flex-shrink-0" key={course.c_id.c_id}>
              <Card {...course.c_id} />
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center w-full">No saved courses yet.</p>
        )}
      </div>
    </div>
  );
};

export default SavedCourses;
