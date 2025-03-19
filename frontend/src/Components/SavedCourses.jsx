import React from "react";
import Card from "./Card"; 
import { useSelector } from "react-redux";
import data from "./Courses/courseData.js";

const Courses = () => {
  

  const savedCourseIds = useSelector((state) => state.savedCourses.savedCourses);
  // console.log("savedCourseIds",savedCourseIds)

  // Filter courses that are saved
  const savedCourses = [];
  for(let i=0;i<data.length;i++){
   for(let j=0;j<savedCourseIds.length;j++){
     if(data[i].id === savedCourseIds[j].id){
       savedCourses.push(data[i])
     }
   }
  }
  // console.log("savedCourses",savedCourses)

  return (
    <div className="p-8 ml-64">
      {/* Section 1: MAANG Courses */}
      <div className="flex space-x-6 overflow-x-auto scrollbar-hide mt-8">
        {savedCourses.length > 0 ? (
          savedCourses.map((course) => <Card key={course.id} {...course} />)
        ) : (
          <p className="text-gray-500">No saved courses yet.</p>
        )}
      </div>
    </div>
  );
};

export default Courses;
