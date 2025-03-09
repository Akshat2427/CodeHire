import React from 'react'
import Sidebar from './Components/Sidebar'
import Navbar from './Components/Navbar'
import Courses from './Components/Courses'
import Profile from './Components/Profile'
import Dashboard from './Components/Dashboard'
import AuthPage from './Components/AuthPage'
import AllRoutes from './AllRoutes'
import { useDispatch , useSelector } from 'react-redux'
function App() {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  console.log(user)



  return (
    <>

      {
        user.isAuthenticated ? (
          <>
            <Sidebar />
            <Navbar title={`Hello 👋 , ${user.user.username ?? "User"} `} />
            <AllRoutes />
          </>
        ) : (
          <AuthPage/>
        ) 
      }
     
    </>
  )
}

export default App;
