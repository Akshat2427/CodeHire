import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./Components/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute";
import Sidebar from "./Components/Sidebar";
import Header from "./Components/Header";
import Welcome from "./Components/Welcome";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Dashboard from "./Components/Dashboard";
import Courses from "./Components/Courses";
import CourseDetail from "./Components/CourseDetail";
import SavedCourses from "./Components/SavedCourses";
import HelpCenter from "./Components/HelpCenter";
import Settings from "./Components/Settings";
import "./index.css";

const MainLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/course/:id" element={<CourseDetail />} />
          <Route path="/saved" element={<SavedCourses />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
