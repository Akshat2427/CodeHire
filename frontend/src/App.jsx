import React from 'react'
import Sidebar from './Components/Sidebar'
import Navbar from './Components/Navbar'
import Courses from './Components/Courses'
import Dashboard from './Components/Dashboard'
function App() {
  return (
    <>

      <Navbar />
      <Sidebar />
      {/* <Courses /> */}
      <Dashboard/>
    </>
  )
}

export default App;
