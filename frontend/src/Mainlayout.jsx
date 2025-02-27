import Sidebar from "./Components/Sidebar";
import Header from "./Components/Header";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Courses from "./Components/Courses";
import CourseDetail from "./Components/CourseDetail";
import SavedCourses from "./Components/SavedCourses";
import HelpCenter from "./Components/HelpCenter";
import Settings from "./Components/Settings";

const MainLayout = () => {
  return (
    <div className="flex">
      
      <div className="w-64 min-h-screen bg-gray-800 text-white fixed left-0 top-0">
        <Sidebar />
      </div>

     
      <div className="flex-1 flex flex-col bg-gray-100 ml-64">
        <Header />

        
        <div className="p-6 overflow-auto flex-1">
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
    </div>
  );
};

export default MainLayout;
