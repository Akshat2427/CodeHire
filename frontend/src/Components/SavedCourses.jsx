import React from "react";
import Card from "./Card"; 
import { useSelector } from "react-redux";

const Courses = () => {
  const maangCourses = [
    { id: 1, title: "Google SDE", companyImg: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg", stages: 8, rating: 4.7 , buttonTitle: "Enroll Now" },
    { id: 2, title: "Amazon ML", companyImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSN0qIpl2wbLurDxYE3L2TVVMt3TqOG3XAQQ&s", stages: 6, rating: 4.5, buttonTitle: "Enroll Now" },
    { id: 3, title: "Meta Frontend", companyImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNbpIfA-_GwTVZBVlpCvdIcLVOsCxn4BmqHA&s", stages: 7, rating: 4.6, buttonTitle: "Enroll Now" },
    { id: 4, title: "Apple iOS Dev", companyImg: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg", stages: 5, rating: 4.4, buttonTitle: "Enroll Now" },
    { id: 5, title: "Netflix Backend", companyImg: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg", stages: 9, rating: 4.8, buttonTitle: "Enroll Now" },
  ];

  const savedCourseIds = useSelector((state) => state.savedCourses.savedCourses);
  // console.log("savedCourseIds",savedCourseIds)

  // Filter courses that are saved
  const savedCourses = [];
  for(let i=0;i<maangCourses.length;i++){
   for(let j=0;j<savedCourseIds.length;j++){
     if(maangCourses[i].id === savedCourseIds[j].id){
       savedCourses.push(maangCourses[i])
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
