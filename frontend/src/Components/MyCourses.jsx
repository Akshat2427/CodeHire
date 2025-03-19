import React from 'react'
import data from './Courses/tempUserCourse.json'
import Card from './Card'

const myCoursesArray = [
    { id: 1, title: "Google SDE", companyImg: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg", stages: 8, rating: 4.7 , buttonTitle: "Resume" },
   
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
