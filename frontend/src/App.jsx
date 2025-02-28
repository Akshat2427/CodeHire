import React from 'react'
import Sidebar from './Components/Sidebar'
import Navbar from './Components/Navbar'
import Courses from './Components/Courses'
import Profile from './Components/Profile'
function App() {
  return (
    <>

      <Navbar title={"Profile Details"} />
      <Sidebar />
      {/* <Profile role={"mentor"} /> */}
      <Profile role={"student"} />
    </>
  )
}

export default App;
