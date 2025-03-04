import React from 'react'
import Sidebar from './Components/Sidebar'
import Navbar from './Components/Navbar'
import Courses from './Components/Courses'
import Profile from './Components/Profile'
import Dashboard from './Components/Dashboard'
import AuthPage from './Components/AuthPage'
function App() {
  return (
    <>

      {/* <Navbar title={"Welcome back , Anshul Choudhary"} /> */}
      {/* <Sidebar />
      <Courses/> */}
      {/* <Dashboard></Dashboard> */}
      {/* <Profile role={"mentor"} /> 
       <Profile role={"student"} /> */}
      <AuthPage/>
    </>
  )
}

export default App;
