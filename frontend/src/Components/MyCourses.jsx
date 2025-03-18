import React from 'react'
import data from './Courses/tempUserCourse.json'
import Card from './Card'

const myCoursesArray = [
    { id: 1, title: "Google SDE", companyImg: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg", stages: 8, rating: 4.7 , buttonTitle: "Resume" },
    { id: 2, title: "Amazon ML", companyImg: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSN0qIpl2wbLurDxYE3L2TVVMt3TqOG3XAQQ&s", stages: 6, rating: 4.5, buttonTitle: "Resume" },
    {id:3 , title:data.info.company_name , companyImg: data.info.imgUrl, stages: 5, rating: 4.5, buttonTitle: "Resume" }
]
const MyCourses = () => {
  return (
    <div className='flex '>
        <div className=' ml-64'>
    <h2 className="text-2xl font-bold mb-4 mt-8">🔥 My Courses</h2>
      <div className="flex space-x-6 overflow-x-auto scrollbar-hide">
        {myCoursesArray.map((course, index) => (
          <Card   key={index} {...course}   />
        ))}
      </div>
    </div>
    </div>
  )
}
export default MyCourses 
