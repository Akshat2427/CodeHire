import React, { useEffect, useRef, useState } from "react";
import { ScrollMenu } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';
import Card from "./Card"; // Importing Card Component
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses } from "../store/courseReducers";
import Loading from "./Loading";

const Courses = () => {
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
  }

  useEffect(() => {
    const maang = courses.filter(course => course.category === "MAANG");
    const latest = courses.filter(course => course.category === "LATEST");
    const trending = courses.filter(course => course.category === "TRENDING");
    const staff = courses.filter(course => course.category === "STAFF_PICK");

    setMaangCourses(maang);
    setLatestCourses(latest);
    setTrendingCourses(trending);
    setStaffPicks(staff);
  }, [courses])


  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCourses());
    }

  }, [dispatch, status]);
  if (status === "loading") {
    return <Loading/>
  }
  if (status === "failed") {
    return <div className="flex justify-center items-center h-screen">Error: {error}</div>
  }

  const coursesPerPage = 5;

  // const maangCourses = [
  //   { id: 24, c_name: "Google SWE", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg", stages: 8, rating: 4.7, buttonTitle: "Enroll Now" },
  //   { id: 2, c_name: "Amazon ML", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSN0qIpl2wbLurDxYE3L2TVVMt3TqOG3XAQQ&s", stages: 6, rating: 4.5, buttonTitle: "Enroll Now" },
  //   { id: 3, c_name: "Meta Frontend", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNbpIfA-_GwTVZBVlpCvdIcLVOsCxn4BmqHA&s", stages: 7, rating: 4.6, buttonTitle: "Enroll Now" },
  //   { id: 4, c_name: "Apple iOS Dev", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg", stages: 5, rating: 4.4, buttonTitle: "Enroll Now" },
  //   { id: 5, c_name: "Netflix Backend", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg", stages: 9, rating: 4.8, buttonTitle: "Enroll Now" },
  //   { id: 6, c_name: "Extra MAANG Course", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg", stages: 7, rating: 4.6, buttonTitle: "Enroll Now" },
  // ];

  // const latestCourses = [
  //   { id: 6, title: "Juspay SDE", logo: "https://static.thearcweb.com/images/PROD/PROD-d8e5f0f6-ef80-4aa1-9a09-c12de42b1124.jpg", stages: 7, rating: 4.5, buttonTitle: "Enroll Now" },
  //   { id: 7, title: "Zomato Data Analytics", logo: "https://upload.wikimedia.org/wikipedia/commons/7/75/Zomato_logo.png", stages: 6, rating: 4.3, buttonTitle: "Enroll Now" },
  //   { id: 8, title: "Swiggy UX/UI", logo: "https://upload.wikimedia.org/wikipedia/commons/1/13/Swiggy_logo.png", stages: 5, rating: 4.2, buttonTitle: "Enroll Now" },
  //   { id: 9, title: "Ola AI/ML", logo: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Ola_Cabs_logo.svg", stages: 8, rating: 4.7, buttonTitle: "Enroll Now" },
  //   { id: 10, title: "CRED Finance", logo: "https://upload.wikimedia.org/wikipedia/en/0/06/Cred_app_logo.png", stages: 7, rating: 4.6, buttonTitle: "Enroll Now" },
  //   { id: 11, title: "Extra Latest Course", logo: "https://upload.wikimedia.org/wikipedia/commons/1/13/Swiggy_logo.png", stages: 6, rating: 4.4, buttonTitle: "Enroll Now" },
  // ];

  // const trendingCourses = [
  //   { id: 11, title: "Razorpay Fintech", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/1/19/Razorpay_logo.svg/1200px-Razorpay_logo.svg.png", stages: 6, rating: 4.6, buttonTitle: "Enroll Now" },
  //   { id: 12, title: "Tata AI/ML", logo: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Tata_logo.svg", stages: 5, rating: 4.4, buttonTitle: "Enroll Now" },
  //   { id: 13, title: "Paytm ", logo: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Paytm_logo.png", stages: 7, rating: 4.5, buttonTitle: "Enroll Now" },
  //   { id: 14, title: "Extra Trending Course", logo: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Paytm_logo.png", stages: 6, rating: 4.5, buttonTitle: "Enroll Now" },
  //   { id: 18, title: "Razorpay Fintech", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/1/19/Razorpay_logo.svg/1200px-Razorpay_logo.svg.png", stages: 6, rating: 4.6, buttonTitle: "Enroll Now" },
  //   { id: 19, title: "Tata AI/ML", logo: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Tata_logo.svg", stages: 5, rating: 4.4, buttonTitle: "Enroll Now" },
  //   { id: 20, title: "Paytm Product Management", logo: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Paytm_logo.png", stages: 7, rating: 4.5, buttonTitle: "Enroll Now" },
  // ];

  // const staffPicks = [
  //   { id: 15, title: "SpaceX Aerospace Dev", logo: "https://upload.wikimedia.org/wikipedia/commons/d/de/SpaceX-Logo.svg", stages: 9, rating: 4.9, buttonTitle: "Enroll Now" },
  //   { id: 16, title: "Tesla AI Vision", logo: "https://upload.wikimedia.org/wikipedia/commons/b/bb/Tesla_T_symbol.svg", stages: 8, rating: 4.8, buttonTitle: "Enroll Now" },
  //   { id: 17, title: "Extra Staff Pick", logo: "https://upload.wikimedia.org/wikipedia/commons/b/bb/Tesla_T_symbol.svg", stages: 7, rating: 4.7, buttonTitle: "Enroll Now" },
  //   { id: 21, title: "Razorpay Fintech", logo: "https://upload.wikimedia.org/wikipedia/en/thumb/1/19/Razorpay_logo.svg/1200px-Razorpay_logo.svg.png", stages: 6, rating: 4.6, buttonTitle: "Enroll Now" },
  //   { id: 22, title: "Tata AI/ML", logo: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Tata_logo.svg", stages: 5, rating: 4.4, buttonTitle: "Enroll Now" },
  //   { id: 23, title: "Paytm Product Management", logo: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Paytm_logo.png", stages: 7, rating: 4.5, buttonTitle: "Enroll Now" },
  // ];


  return (
    <div className={`p-8 min-h-screen bg-gray-50 transition-all duration-300 ${window.innerWidth <= 768
        ? (fullscreenSidebar ? "hidden" : "ml-0")
        : (openSidebar ? "ml-60" : "ml-16")
      }`}>

      <h2 className="text-2xl font-bold mb-4">🔥 MAANG Courses</h2>
      <div className="relative">
        <ScrollMenu>
          <div ref={maangRef} className="flex space-x-6 overflow-hidden">
            <div
              className="flex transition-transform duration-500"
            >
              {maangCourses.map((course) => (
                <div className=" w-1/5 flex-shrink-0" key={course.c_id}>
                  <Card {...course} />
                </div>
              ))}
            </div>
          </div>
        </ScrollMenu>
        {maangCourses.length > coursesPerPage && (
          <>
            <button onClick={() => scrollContainer(maangRef, "left")}
              className="absolute left-0    top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition"
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


      <h2 className="text-2xl font-bold mt-8 mb-4">🚀 Latest Courses</h2>
      <div className="relative">
        <ScrollMenu>
          <div ref={latestRef} className="flex space-x-6 overflow-hidden">
            <div
              className="flex transition-transform duration-500"
            >
              {latestCourses.map((course) => (
                <div className="w-1/5 flex-shrink-0" key={course.c_id}>
                  <Card {...course} />
                </div>
              ))}
            </div>
          </div>
        </ScrollMenu>
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
      <h2 className="text-2xl font-bold mt-8 mb-4">🌟 Trending Now</h2>
      <div className="relative">
        <ScrollMenu>
          <div ref={trendingRef} className="flex space-x-6 overflow-hidden">
            <div
              className="flex transition-transform duration-500"
            >
              {trendingCourses.map((course) => (
                <div className="w-1/5 flex-shrink-0" key={course.c_id}>
                  <Card {...course} />
                </div>
              ))}
            </div>
          </div>
        </ScrollMenu>
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


      <h2 className="text-2xl font-bold mt-8 mb-4">🎯 Staff Picks</h2>
      <div className="relative">
        <ScrollMenu>
          <div ref={staffRef} className="flex space-x-6 overflow-hidden">
            <div
              className="flex transition-transform duration-500"
            >
              {staffPicks.map((course) => (
                <div className="w-1/5 flex-shrink-0" key={course.c_id}>
                  <Card {...course} />
                </div>
              ))}
            </div>
          </div>
        </ScrollMenu>
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