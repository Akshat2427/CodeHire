import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function Profile() {
  const user = useSelector((state) => state.user.user);
  const role = user?.role || "student";

  const initialStudentData = {
    username: user?.username || "Student123",
    email: user?.email || "student@example.com",
    phone: user?.phone || "123-456-7890",
    university: user?.university || "Example University",
    qualification: user?.qualification || "Bachelors in Technology",
    address: user?.address || "123 Elm Street, Apt 4B",
    graduation: user?.graduation || "2025",
  };

  const initialMentorData = {
    username: user?.username || "Mentor456",
    email: user?.email || "mentor@example.com",
    phone: user?.phone || "987-654-3210",
    currentJob: user?.currentJob || "Tech Lead at Example Corp",
    techSkills: user?.techSkills || ["React", "Node.js", "MongoDB"],
    address: user?.address || "123 Elm Street, Apt 4B",
    availability: user?.availability || ["Monday", "Tuesday", "Wednesday"],
  };

  const initialFormData = role === 'student' ? initialStudentData : initialMentorData;
  const [formData, setFormData] = useState(initialFormData);
  const [isEditing, setIsEditing] = useState(false);
  const openSidebar = useSelector((state) => state.ui_store.openSidebar);
  const fullscreenSidebar = useSelector((state) => state.ui_store.fullscreenSidebar);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditClick = () => setIsEditing(true);
  const handleSaveClick = () => setIsEditing(false);

  return (
    <div>
      <main className={`
       ${
        isMobile 
          ? "ml-0 p-4 h-auto grid" 
          : (openSidebar ? "ml-60" : "ml-16")
      }
       transition-all duration-300`}>
        <div className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-6"} gap-8`}>
          <div className="col-span-2 flex justify-center items-start mt-10">
            <div className="relative">
              <img
                className={`rounded-full border-5 border-gray-300 shadow-lg ${isMobile ? "h-32 w-32" : "h-64 w-64"}`}
                src={user.imgUrl === "./images/pfp.jpg" ? "./images/pfp.jpg" : `https://images.weserv.nl/?url=${encodeURIComponent(user.imgUrl)}`}
                alt="Profile Pic"
              />
            </div>
          </div>
          <div className="col-span-4 rounded-lg p-4 md:p-8">
            <button
              onClick={handleEditClick}
              className="absolute right-5 px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700"
            >
              Edit
            </button>
            <div className="grid gap-4 mt-10 md:mt-16">
              {Object.keys(formData).map((key) => (
                <div className="flex flex-col md:flex-row md:items-center" key={key}>
                  <label className="font-medium text-gray-600 md:w-32 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</label>
                  <input
                    type="text"
                    name={key}
                    value={formData[key]}
                    onChange={handleInputChange}
                    readOnly={!isEditing}
                    className="flex-1 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  />
                </div>
              ))}
            </div>
            {isEditing && (
              <button
                onClick={handleSaveClick}
                className="mt-6 px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
              >
                Save
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;
