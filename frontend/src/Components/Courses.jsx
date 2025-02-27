import React, { useState } from "react";
import Card from "./Card"; // Importing Card Component

const Courses = () => {
  const [selectedCategory, setSelectedCategory] = useState("Development");

  const categories = ["Design", "Marketing", "Development", "Mathematics"];

  // Sample course data
  const maangCourses = [
    { title: "Google SDE", companyImg: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg", stages: 8, rating: 4.7 },
    { title: "Amazon ML", companyImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSN0qIpl2wbLurDxYE3L2TVVMt3TqOG3XAQQ&s", stages: 6, rating: 4.5 },
    { title: "Meta Frontend", companyImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNbpIfA-_GwTVZBVlpCvdIcLVOsCxn4BmqHA&s", stages: 7, rating: 4.6 },
    { title: "Apple iOS Dev", companyImg: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg", stages: 5, rating: 4.4 },
    { title: "Netflix Backend", companyImg: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg", stages: 9, rating: 4.8 },
  ];
  
  const latestCourses = [
    { title: "Juspay SDE", companyImg: "https://static.thearcweb.com/images/PROD/PROD-d8e5f0f6-ef80-4aa1-9a09-c12de42b1124.jpg", stages: 7, rating: 4.5 },
    { title: "Zomato Data Analytics", companyImg: "https://upload.wikimedia.org/wikipedia/commons/7/75/Zomato_logo.png", stages: 6, rating: 4.3 },
    { title: "Swiggy UX/UI", companyImg: "https://upload.wikimedia.org/wikipedia/commons/1/13/Swiggy_logo.png", stages: 5, rating: 4.2 },
    { title: "Ola AI/ML", companyImg: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Ola_Cabs_logo.svg", stages: 8, rating: 4.7 },
    { title: "CRED Finance", companyImg: "https://upload.wikimedia.org/wikipedia/en/0/06/Cred_app_logo.png", stages: 7, rating: 4.6 },
  ];
  
  return (
    <div className="p-8 ml-64 ">
      {/* Section 1: MAANG Courses */}
      <h2 className="text-2xl font-bold mb-4 mt-8">🔥 MAANG Courses</h2>
      <div className="flex space-x-6 overflow-x-auto scrollbar-hide">
        {maangCourses.map((course, index) => (
          <Card key={index} {...course} />
        ))}
      </div>

      {/* Section 2: Category Selector */}
      {/* <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">📚 Choose a Category</h2>
        <div className="flex space-x-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                selectedCategory === category
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div> */}

      {/* Section 3: Latest Courses */}
      <h2 className="text-2xl font-bold mt-8 mb-4">🚀 Latest Courses</h2>
      <div className="flex space-x-6 overflow-x-auto scrollbar-hide">
        {latestCourses.map((course, index) => (
          <Card key={index} {...course} />
        ))}
      </div>

      {/* Section 4: Trending Now */}
      <h2 className="text-2xl font-bold mt-8 mb-4">🌟 Trending Now</h2>
      <div className="flex space-x-6 overflow-x-auto scrollbar-hide">
        <Card title="Razorpay Fintech" companyImg="https://upload.wikimedia.org/wikipedia/en/thumb/1/19/Razorpay_logo.svg/1200px-Razorpay_logo.svg.png" stages={6} rating={4.6} />
        <Card title="Tata AI/ML" companyImg="https://upload.wikimedia.org/wikipedia/commons/9/9a/Tata_logo.svg" stages={5} rating={4.4} />
        <Card title="Paytm Product Management" companyImg="https://upload.wikimedia.org/wikipedia/commons/5/5d/Paytm_logo.png" stages={7} rating={4.5} />
      </div>

      {/* Section 5: Staff Picks */}
      <h2 className="text-2xl font-bold mt-8 mb-4">🎯 Staff Picks</h2>
      <div className="flex space-x-6 overflow-x-auto scrollbar-hide">
        <Card title="SpaceX Aerospace Dev" companyImg="https://upload.wikimedia.org/wikipedia/commons/d/de/SpaceX-Logo.svg" stages={9} rating={4.9} />
        <Card title="Tesla AI Vision" companyImg="https://upload.wikimedia.org/wikipedia/commons/b/bb/Tesla_T_symbol.svg" stages={8} rating={4.8} />
      </div>
    </div>
  );
};

export default Courses;
