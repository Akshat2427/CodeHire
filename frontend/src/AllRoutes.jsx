import { Routes, Route } from 'react-router-dom'
import Dashboard from './Components/Dashboard'
import Schedule from './Components/Schedule'
import Profile from './Components/Profile'
import SavedCourses from './Components/SavedCourses'
import Report from './Components/Report'
import ExploreCourses from './Components/Courses'
import MyCourses from './Components/MyCourses'
import CourseView from './Components/Courses/CourseView'
import CourseDescription from './Components/Courses/CourseDescription'

const AllRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='/schedule' element={<Schedule />} />
      <Route path='/profile' element={<Profile   />} />
      <Route path='/saved-courses' element={<SavedCourses/>}/>
      <Route path='/report' element={<Report/>}/>
      <Route path='/explore-courses' element={<ExploreCourses/>}/>
      <Route path='/my-courses' element={<MyCourses/>}/>
      <Route path="/course/description/:id" element={<CourseDescription />} /> 
       <Route path="/course/:id" element={<CourseView />} />
     
    </Routes>
  )
}

export default AllRoutes