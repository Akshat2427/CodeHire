import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function Profile() {
  const user = useSelector((state) => state.user.user);
  console.log(user);
  
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
        ${isMobile ? "ml-0 p-4" : openSidebar ? "ml-60" : "ml-16"} 
        transition-all duration-300 grid gap-8
      `}>
        <div className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-6"} gap-8`}>
          
          {/* Profile Picture & Social Media */}
          <div className="col-span-2 flex flex-col items-center mt-10">
            <img
              className="h-32 w-32 md:h-64 md:w-64 rounded-full border-4 border-gray-300 shadow-lg"
              src={user.imgUrl === "./images/pfp.jpg" ? "./images/pfp.jpg" : `https://images.weserv.nl/?url=${encodeURIComponent(user.imgUrl)}`}
              alt="Profile Pic"
            />
            <div className="w-full mt-4 ml-10 flex flex-col gap-3">
              
              {/* GitHub Link */}
              <div className="flex items-center gap-2 w-full">
                <img 
                  src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" 
                  alt="GitHub" 
                  className="w-8 h-8" 
                />
                <div className="w-2/3">
                  <input 
                    type="text" 
                    placeholder="GitHub" 
                    className="w-full text-sm p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  />
                </div>
              </div>

              {/* LinkedIn Link */}
              <div className="flex items-center gap-2 w-full">
                <img 
                  src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" 
                  alt="LinkedIn" 
                  className="w-8 h-8" 
                />
                <div className="w-2/3">
                  <input 
                    type="text" 
                    placeholder="LinkedIn" 
                    className="w-full text-sm p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="col-span-4 bg-white shadow-lg rounded-lg p-4 md:p-8">
            <button
              onClick={handleEditClick}
              className="absolute right-5 px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700"
            >
              Edit
            </button>

            <div className="grid gap-4 mt-10 md:mt-16">
              {Object.keys(formData).map((key) => (
                <div className="flex flex-col md:flex-row md:items-center" key={key}>
                  <label className="font-medium text-gray-600 md:w-32 capitalize">
                    {key.replace(/([A-Z])/g, ' $1')}:
                  </label>
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

            {/* Upload Resume Button for Students */}
            {role === 'student' && (
              <div className="flex items-center mt-4">
                <label className="w-32 font-medium text-gray-600">Resume:</label>
                <button className="px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-800">
                  Upload
                </button>
              </div>
            )}

            {/* Availability Section for Mentors */}
            {role === 'mentor' && (
              <div className="flex flex-col md:flex-row md:items-start mt-4">
                <label className="w-32 font-medium text-gray-600">Availability:</label>
                <div className="gap-2 flex flex-wrap">
                  {formData.availability?.map((day, index) => (
                    <button key={index} className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
                      {day}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Save Button */}
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
