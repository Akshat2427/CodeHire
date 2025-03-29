import React, { useState } from 'react';
import { useSelector } from 'react-redux';




function Profile() {
//   const  role  = "mentor";
    // "student" : "mentor";

  const user = useSelector((state) => state.user.user);
  
  // console.log(user);
  
 

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

  const initialFormData = (role == 'student') ? initialStudentData : initialMentorData;

  const [formData, setFormData] = useState(initialFormData);
  const [isEditing, setIsEditing] = useState(false);
  const openSidebar = useSelector((state) => state.ui_store.openSidebar);
  const fullscreenSidebar = useSelector((state) => state.ui_store.fullscreenSidebar);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    // console.log("Updated user data:", formData);
  };

  return (
    <div>
      <main className={`
       ${
        window.innerWidth <= 768 
          ? (fullscreenSidebar ? "hidden" : "ml-0")
          : (openSidebar ? "ml-60" : "ml-16")
      }
       " p-8  h-screen grid transition-all duration-300 "`}>
        <div className="grid grid-cols-6 gap-8">
          {/* Profile Picture and User Information (similar structure) */}
          {/* Profile Picture */}
          <div className="col-span-2 flex justify-center items-start mt-10">
            <div className="relative">
              <img
                className="h-64 w-64 mt-10 rounded-full border-4 border-gray-300 shadow-lg"
                src={ user.imgUrl === "./images/pfp.jpg"  ? "./images/pfp.jpg" : `https://images.weserv.nl/?url=${encodeURIComponent(user.imgUrl)}`}
                // src={user?.imgUrl || "./images/pfp.jpg"}
                alt="Profile Pic"
              />
             <div className="h-64 w-64 mt-10  flex flex-col items-center p-4 gap-4 ">
                {/* <div className='text-left w-full text-3xl font-bold'>Social Media </div> */}
  {/* GitHub Input */}
  <div className="flex items-center gap-2 w-full">
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnn_FLBfy9aUkcxjAnbOIwnRt1Da8obGqo0w&s" alt="GitHub" className="w-8 h-8" />
    <input 
      type="text" 
      placeholder="GitHub Profile Link" 
      className="flex-1 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 w-1/2"
    />
  </div>

  {/* LinkedIn Input */}
  <div className="flex items-center gap-2 w-full">
    <img src="https://store-images.s-microsoft.com/image/apps.46485.9007199266245564.44dc7699-748d-4c34-ba5e-d04eb48f7960.df3dbdf7-e6b9-4d2a-a5ad-3b91e430d172" alt="LinkedIn" className="w-8 h-8" />
    <input 
      type="text" 
      placeholder="LinkedIn Profile Link" 
      className="flex-1 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 w-1/2"
    />
  </div>
</div>

            </div>
          </div>
          <div className="col-span-4 rounded-lg  p-8">
            <button
              onClick={handleEditClick}
              className="absolute  right-0 mr-24 px-6 py-2 mt-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700"
            >
              Edit
            </button>
            {/* <h2 className="text-2xl font-semibold text-gray-800 mb-5 font-[Poppins]">Profile Details</h2> */}

            <div className="grid gap-4 mt-16">
              <div className="flex items-center">
                <label className="w-32 font-medium text-gray-600">Username:</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                  className="flex-1 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>

              <div className="flex items-center">
                <label className="w-32 font-medium text-gray-600">Email:</label>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                  className="flex-1 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>

              <div className="flex items-center">
                <label className="w-32 font-medium text-gray-600">Phone:</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  readOnly={!isEditing}
                  className="flex-1 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>

              {role === 'student' && (
                <>
                  <div className="flex items-center">
                    <label className="w-32 font-medium text-gray-600">University:</label>
                    <input
                      type="text"
                      name="university"
                      value={formData.university}
                      onChange={handleInputChange}
                      readOnly={!isEditing}
                      className="flex-1 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    />
                  </div>

                  <div className="flex items-center">
                    <label className="w-32 font-medium text-gray-600">Qualification:</label>
                    <input
                      type="text"
                      name="qualification"
                      value={formData.qualification}
                      onChange={handleInputChange}
                      readOnly={!isEditing}
                      className="flex-1 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    />
                  </div>
                  <div className="flex items-center">
                  <label className="w-32 font-medium text-gray-600">Resume:</label>
                   <button
            
              className=" px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-800"
            >
              Upload
            </button>
            </div>
                </>
              )}

              {role === 'mentor' && (
                <>
                  <div className="flex items-center">
                    <label className="w-32 font-medium text-gray-600">Current Job:</label>
                    <input
                      type="text"
                      name="currentJob"
                      value={formData.currentJob}
                      onChange={handleInputChange}
                      readOnly={!isEditing}
                      className="flex-1 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    />
                  </div>

                  <div className="flex items-start">
                    <label className="w-32 font-medium text-gray-600">Avalability:</label>
                    <div className="gap-2 flex justify-start flex-wrap">
                      {formData.availability?.map((skill, index) => (
                        <button
                          key={index}
                          className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Additional fields common for both roles */}
              <div className="flex items-center">
                <label className="w-32 font-medium text-gray-600">Address:</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Optional"
                  readOnly={!isEditing}
                  className="flex-1 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
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
