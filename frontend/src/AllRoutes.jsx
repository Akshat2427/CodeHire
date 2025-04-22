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
import ReportDetail from './Components/ReportDetail'
import Mentorship from './Components/Mentorship'
import MentorHired from './Components/MentorHired'
import HelpCenter from './Components/HelpCenter'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setFullScreenSideBar, setSideBar } from './store/ui_store'

const AllRoutes = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const handleResize = () => {
      // console.log("====================================");
      // console.log("window.innerWidth", window.innerWidth);
      // console.log("====================================");

      if (window.innerWidth <= 768) {
        dispatch(setFullScreenSideBar(false));
        dispatch(setSideBar(true));

      } else {
        dispatch(setFullScreenSideBar(true));
        dispatch(setSideBar(true));
      }
    };

    // Call initially to set the correct state on mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup function to remove event listener
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch]);
  return (
    <Routes>
      <Route path='/' element={<Dashboard />} />
      <Route path='/schedule' element={<Schedule />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/saved-courses' element={<SavedCourses />} />
      <Route path='/report' element={<Report />} />
      <Route path='/reports/:userId' element={<ReportDetail />} />
      <Route path='/explore-courses' element={<ExploreCourses />} />
      <Route path='/my-courses' element={<MyCourses />} />
      <Route path="/course/description/:c_id" element={<CourseDescription />} />
      <Route path="/course/:id" element={<CourseView />} />
      <Route path='/helpcenter' element={<HelpCenter />} />
      <Route path="/course/:id" element={<CourseView />} />
      <Route path="/mentorship" element={<Mentorship />} />
      <Route path="/mentor-hired" element={<MentorHired />} />
    </Routes>
  )
}

export default AllRoutes