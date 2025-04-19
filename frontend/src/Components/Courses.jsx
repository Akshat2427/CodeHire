import React, { useState } from "react";
import Card from "./Card"; // Importing Card Component
import { ChevronRight, ChevronLeft } from "lucide-react"; 
import { useSelector } from "react-redux";

const Courses = () => {
  const [maangScroll, setMaangScroll] = useState(0);
  const [latestScroll, setLatestScroll] = useState(0);
  const [trendingScroll, setTrendingScroll] = useState(0);
  const [staffScroll, setStaffScroll] = useState(0);
  const openSidebar = useSelector((state) => state.ui_store.openSidebar);
  const isCollapsed = useSelector((state) => state.ui_store.isCollapsed || false);
  const fullscreenSidebar = useSelector((state) => state.ui_store.fullscreenSidebar);
    console.log("fullscreenSidebar" , fullscreenSidebar);
  //const courses = useSelector((state) => state.courses_store.courses);

  const coursesPerPage = 5; 

 
  const maangCourses = [
    { id: 24, title: "Google SWE", companyImg: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg", stages: 8, rating: 4.7, buttonTitle: "Enroll Now" },
    { id: 2, title: "Amazon ML", companyImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSN0qIpl2wbLurDxYE3L2TVVMt3TqOG3XAQQ&s", stages: 6, rating: 4.5, buttonTitle: "Enroll Now" },
    { id: 3, title: "Meta Frontend", companyImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNbpIfA-_GwTVZBVlpCvdIcLVOsCxn4BmqHA&s", stages: 7, rating: 4.6, buttonTitle: "Enroll Now" },
    { id: 4, title: "Apple iOS Dev", companyImg: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg", stages: 5, rating: 4.4, buttonTitle: "Enroll Now" },
    { id: 5, title: "Netflix Backend", companyImg: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg", stages: 9, rating: 4.8, buttonTitle: "Enroll Now" },
    { id: 6, title: "Extra MAANG Course", companyImg: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg", stages: 7, rating: 4.6, buttonTitle: "Enroll Now" },
  ];

  const latestCourses = [
    { id: 6, title: "Juspay SDE", companyImg: "https://static.thearcweb.com/images/PROD/PROD-d8e5f0f6-ef80-4aa1-9a09-c12de42b1124.jpg", stages: 7, rating: 4.5, buttonTitle: "Enroll Now" },
    { id: 7, title: "Zomato Data Analytics", companyImg: "https://upload.wikimedia.org/wikipedia/commons/7/75/Zomato_logo.png", stages: 6, rating: 4.3, buttonTitle: "Enroll Now" },
    { id: 8, title: "Swiggy UX/UI", companyImg: "https://upload.wikimedia.org/wikipedia/commons/1/13/Swiggy_logo.png", stages: 5, rating: 4.2, buttonTitle: "Enroll Now" },
    { id: 9, title: "Ola AI/ML", companyImg: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Ola_Cabs_logo.svg", stages: 8, rating: 4.7, buttonTitle: "Enroll Now" },
    { id: 10, title: "CRED Finance", companyImg: "https://upload.wikimedia.org/wikipedia/en/0/06/Cred_app_logo.png", stages: 7, rating: 4.6, buttonTitle: "Enroll Now" },
    { id: 11, title: "Extra Latest Course", companyImg: "https://upload.wikimedia.org/wikipedia/commons/1/13/Swiggy_logo.png", stages: 6, rating: 4.4, buttonTitle: "Enroll Now" },
  ];

  const trendingCourses = [
    { id: 11, title: "Razorpay Fintech", companyImg: "https://upload.wikimedia.org/wikipedia/en/thumb/1/19/Razorpay_logo.svg/1200px-Razorpay_logo.svg.png", stages: 6, rating: 4.6, buttonTitle: "Enroll Now" },
    { id: 12, title: "Tata AI/ML", companyImg: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Tata_logo.svg", stages: 5, rating: 4.4, buttonTitle: "Enroll Now" },
    { id: 13, title: "Paytm ", companyImg: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Paytm_logo.png", stages: 7, rating: 4.5, buttonTitle: "Enroll Now" },
    { id: 14, title: "Extra Trending Course", companyImg: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Paytm_logo.png", stages: 6, rating: 4.5, buttonTitle: "Enroll Now" },
    { id: 18, title: "Razorpay Fintech", companyImg: "https://upload.wikimedia.org/wikipedia/en/thumb/1/19/Razorpay_logo.svg/1200px-Razorpay_logo.svg.png", stages: 6, rating: 4.6, buttonTitle: "Enroll Now" },
    { id: 19, title: "Tata AI/ML", companyImg: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Tata_logo.svg", stages: 5, rating: 4.4, buttonTitle: "Enroll Now" },
    { id: 20, title: "Paytm Product Management", companyImg: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Paytm_logo.png", stages: 7, rating: 4.5, buttonTitle: "Enroll Now" },
  ];

  const staffPicks = [
    { id: 15, title: "SpaceX Aerospace Dev", companyImg: "https://upload.wikimedia.org/wikipedia/commons/d/de/SpaceX-Logo.svg", stages: 9, rating: 4.9, buttonTitle: "Enroll Now" },
    { id: 16, title: "Tesla AI Vision", companyImg: "https://upload.wikimedia.org/wikipedia/commons/b/bb/Tesla_T_symbol.svg", stages: 8, rating: 4.8, buttonTitle: "Enroll Now" },
    { id: 17, title: "Extra Staff Pick", companyImg: "https://upload.wikimedia.org/wikipedia/commons/b/bb/Tesla_T_symbol.svg", stages: 7, rating: 4.7, buttonTitle: "Enroll Now" },
    { id: 21, title: "Razorpay Fintech", companyImg: "https://upload.wikimedia.org/wikipedia/en/thumb/1/19/Razorpay_logo.svg/1200px-Razorpay_logo.svg.png", stages: 6, rating: 4.6, buttonTitle: "Enroll Now" },
    { id: 22, title: "Tata AI/ML", companyImg: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Tata_logo.svg", stages: 5, rating: 4.4, buttonTitle: "Enroll Now" },
    { id: 23, title: "Paytm Product Management", companyImg: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Paytm_logo.png", stages: 7, rating: 4.5, buttonTitle: "Enroll Now" },
  ];

  const handleScroll = (setScroll, currentScroll, totalCourses, direction) => {
    const maxScroll = Math.max(0, totalCourses - coursesPerPage);
    if (direction === 'right') {
      setScroll((prev) => (prev < maxScroll ? prev + 1 : 0));
    } else {
      setScroll((prev) => (prev > 0 ? prev - 1 : maxScroll)); 
    }
  };

  return (
    <div className={`p-8 min-h-screen bg-gray-50 transition-all duration-300 ${
      window.innerWidth <= 768 
        ? (fullscreenSidebar ? "hidden" : "ml-0")
        : (openSidebar ? "ml-60" : "ml-16")
    }`}>
      
      <h2 className="text-2xl font-bold mb-4 ">🔥 MAANG Courses</h2>
      <div className="relative">
        <div className="flex space-x-6 overflow-hidden">
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${maangScroll * 20}%)` }}
          >
            {maangCourses.map((course) => (
              <div className=" w-1/5 flex-shrink-0" key={course.id}>
                <Card {...course} />
              </div>
            ))}
          </div>
        </div>
        {maangCourses.length > coursesPerPage && (
          <>
            <button
              onClick={() => handleScroll(setMaangScroll, maangScroll, maangCourses.length, 'left')}
              className="absolute left-0    top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition"
            >
              <ChevronLeft  size={24} />
            </button>
            <button
              onClick={() => handleScroll(setMaangScroll, maangScroll, maangCourses.length, 'right')}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>

      
      <h2 className="text-2xl font-bold mt-8 mb-4">🚀 Latest Courses</h2>
      <div className="relative">
        <div className="flex space-x-6 overflow-hidden">
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${latestScroll * 20}%)` }}
          >
            {latestCourses.map((course) => (
              <div className="w-1/5 flex-shrink-0" key={course.id}>
                <Card {...course} />
              </div>
            ))}
          </div>
        </div>
        {latestCourses.length > coursesPerPage && (
          <>
            <button
              onClick={() => handleScroll(setLatestScroll, latestScroll, latestCourses.length, 'left')}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => handleScroll(setLatestScroll, latestScroll, latestCourses.length, 'right')}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>

      
      <h2 className="text-2xl font-bold mt-8 mb-4">🌟 Trending Now</h2>
      <div className="relative">
        <div className="flex space-x-6 overflow-hidden">
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${trendingScroll * 20}%)` }}
          >
            {trendingCourses.map((course) => (
              <div className="w-1/5 flex-shrink-0" key={course.id}>
                <Card {...course} />
              </div>
            ))}
          </div>
        </div>
        {trendingCourses.length > coursesPerPage && (
          <>
            <button
              onClick={() => handleScroll(setTrendingScroll, trendingScroll, trendingCourses.length, 'left')}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => handleScroll(setTrendingScroll, trendingScroll, trendingCourses.length, 'right')}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>

      
      <h2 className="text-2xl font-bold mt-8 mb-4">🎯 Staff Picks</h2>
      <div className="relative">
        <div className="flex space-x-6 overflow-hidden">
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${staffScroll * 20}%)` }}
          >
            {staffPicks.map((course) => (
              <div className="w-1/5 flex-shrink-0" key={course.id}>
                <Card {...course} />
              </div>
            ))}
          </div>
        </div>
        {staffPicks.length > coursesPerPage && (
          <>
            <button
              onClick={() => handleScroll(setStaffScroll, staffScroll, staffPicks.length, 'left')}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => handleScroll(setStaffScroll, staffScroll, staffPicks.length, 'right')}
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