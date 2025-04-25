import React, { useEffect, useRef, useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../store/courseReducers";
import Card from "./Card"; // Importing Card Component
import Loading from "./Loading";

const Courses = () => {
  console.log()
  const openSidebar = useSelector((state) => state.ui_store.openSidebar);
  const isCollapsed = useSelector((state) => state.ui_store.isCollapsed || false);
  const fullscreenSidebar = useSelector((state) => state.ui_store.fullscreenSidebar);
  const dispatch = useDispatch();
  const { courses, status, error } = useSelector((state) => state.courses);

  const [maangCourses, setMaangCourses] = useState([]);
  const [latestCourses, setLatestCourses] = useState([]);
  const [trendingCourses, setTrendingCourses] = useState([]);
  const [staffPicks, setStaffPicks] = useState([]);

  const maangRef = useRef(null);
  const latestRef = useRef(null);
  const trendingRef = useRef(null);
  const staffRef = useRef(null);

  const scrollByAmount = 300;

  const scrollContainer = (ref, direction) => {
    if (ref.current) {
      const scrollValue = direction === "left" ? -scrollByAmount : scrollByAmount;
      ref.current.scrollBy({
        left: scrollValue,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const maang = courses.filter(course => course.category === "MAANG");
    const latest = courses.filter(course => course.category === "LATEST");
    const trending = courses.filter(course => course.category === "TRENDING");
    const staff = courses.filter(course => course.category === "STAFF_PICK");

    setMaangCourses(maang);
    setLatestCourses(latest);
    setTrendingCourses(trending);
    setStaffPicks(staff);
  }, [courses]);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCourses());
      
    }
  }, [dispatch, status]);

  if (status === "loading") {
    return <Loading/>
  }

  if (status === "failed") {
    return <div className="flex justify-center items-center h-screen">Error: {error}</div>;
  }

  const coursesPerPage = 5;

  return (
    <div className={`p-8 min-h-screen bg-gray-50 transition-all duration-300 ${window.innerWidth <= 768
      ? (fullscreenSidebar ? "hidden" : "ml-0")
      : (openSidebar ? "ml-60" : "ml-16")
      }`}>

      {/* MAANG Courses */}
      <h2 className="text-2xl font-bold mb-4">🔥 MAANG Courses</h2>
      <div className="relative">
        <div ref={maangRef} className="flex space-x-6 overflow-x-auto scrollbar-hide">
          {maangCourses.map((course) => (
            <div className="min-w-[380px] max-w-[410px] flex-shrink-0 p-2" key={course.c_id}>
              <Card {...course} />
            </div>
          ))}
        </div>
        {maangCourses.length > coursesPerPage && (
          <>
            <button onClick={() => scrollContainer(maangRef, "left")}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition"
            >
              <ChevronLeft size={24} />
            </button>
            <button onClick={() => scrollContainer(maangRef, "right")}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>

      {/* Latest Courses */}
      <h2 className="text-2xl font-bold mt-8 mb-4">🚀 Latest Courses</h2>
      <div className="relative">
        <div ref={latestRef} className="flex space-x-6 overflow-x-auto scrollbar-hide">
          {latestCourses.map((course) => (
            <div className="min-w-[380px] max-w-[410px] flex-shrink-0 p-2" key={course.c_id}>
              <Card {...course} />
            </div>
          ))}
        </div>
        {latestCourses.length > coursesPerPage && (
          <>
            <button onClick={() => scrollContainer(latestRef, "left")}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition"
            >
              <ChevronLeft size={24} />
            </button>
            <button onClick={() => scrollContainer(latestRef, "right")}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>

      {/* Trending Courses */}
      <h2 className="text-2xl font-bold mt-8 mb-4">🌟 Trending Now</h2>
      <div className="relative">
        <div ref={trendingRef} className="flex space-x-6 overflow-x-auto scrollbar-hide">
          {trendingCourses.map((course) => (
            <div className="min-w-[380px] max-w-[410px] flex-shrink-0 p-2" key={course.c_id}>
              <Card {...course} />
            </div>
          ))}
        </div>
        {trendingCourses.length > coursesPerPage && (
          <>
            <button onClick={() => scrollContainer(trendingRef, "left")}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition"
            >
              <ChevronLeft size={24} />
            </button>
            <button onClick={() => scrollContainer(trendingRef, "right")}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>

      {/* Staff Picks */}
      <h2 className="text-2xl font-bold mt-8 mb-4">🎯 Staff Picks</h2>
      <div className="relative">
        <div ref={staffRef} className="flex space-x-6 overflow-x-auto scrollbar-hide">
          {staffPicks.map((course) => (
            <div className="min-w-[380px] max-w-[410px] flex-shrink-0 p-2" key={course.c_id}>
              <Card {...course} />
            </div>
          ))}
        </div>
        {staffPicks.length > coursesPerPage && (
          <>
            <button onClick={() => scrollContainer(staffRef, "left")}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition"
            >
              <ChevronLeft size={24} />
            </button>
            <button onClick={() => scrollContainer(staffRef, "right")}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Courses;
