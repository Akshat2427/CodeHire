import React from 'react'
import Sidebar from './Components/Sidebar'
import Navbar from './Components/Navbar'
import Courses from './Components/Courses'
import Profile from './Components/Profile'
import Dashboard from './Components/Dashboard'
function App() {
  return (
    <>

      <Navbar title={"Welcome back , Anshul Choudhary"} />
      <Sidebar />
      <Dashboard></Dashboard>
      {/* <Profile role={"mentor"} /> */}
      {/* <Profile role={"student"} /> */}
    </>
  )
}

export default App;
