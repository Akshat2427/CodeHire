import React from "react";
import data from "./tempUserCourse.json";
import { NavLink } from "react-router-dom";
import { UploadCloud, Info } from "lucide-react";

function Resume() {
  console.log("data called at Resume", data.resume.selected_keywords);

  return (
    <div className="container min-h-screen w-full bg-gray-100 py-10 px-10 relative">
      {/* Selected Keywords Section */}
      <div className="ml-52 bg-white shadow-lg rounded-lg p-6 mb-10 relative">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold pl-2">Selected Keywords</h2>
          {/* Info Icon with Tooltip */}
          <div className=" group absolute left-2">
            <Info className="text-gray-500 cursor-pointer" size={20} />
            <span className="absolute left-0 top-7 hidden w-64 bg-gray-800 text-white text-xs p-2 rounded-md shadow-lg group-hover:block">
              These are the keywords preferred by companies when evaluating resumes.
            </span>
          </div>
        </div>

        {/* Keywords List */}
        <div className="flex flex-wrap gap-3">
          {data.resume.selected_keywords.map((item, index) => (
            <div key={index} className="bg-blue-100 text-blue-800 px-5 py-2 rounded-md shadow-md">
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Resume Links Section */}
      <div className="ml-52 bg-white shadow-lg rounded-lg p-6 relative">
        <div className="flex items-center justify-between ">
        <h2 className="text-2xl font-semibold mb-4 pl-2">Resumes</h2>
        <div className=" group absolute left-2 top-8">
            <Info className="text-gray-500 cursor-pointer" size={20} />
            <span className="absolute left-0 top-7 hidden w-64 bg-gray-800 text-white text-xs p-2 rounded-md shadow-lg group-hover:block">
              These are the Resumes odf students who havebeen shortlisted.
            </span>
          </div>
          </div>
        <div className="flex flex-wrap gap-6">
          {data.resume.former_freshers_cdn.map((item, index) => (
            <div key={index} className="bg-gray-200 p-3 rounded-lg shadow-md">
              <NavLink to={item} className="block hover:scale-105 transition-transform">
                <img
                  src="https://marketplace.canva.com/EAFzfwx_Qik/4/0/1131w/canva-blue-simple-professional-cv-resume-T9RPR4DPdiw.jpg"
                  alt="Resume"
                  className="h-56 w-44 rounded-md shadow-md"
                />
              </NavLink>
            </div>
          ))}
        </div>

        {/* Upload Button (Bottom Right) */}
        <button className="absolute bottom-4 right-6 bg-blue-500 text-white px-6 py-3 rounded-lg flex items-center gap-2 shadow-lg hover:bg-blue-600 transition-all">
          <UploadCloud size={20} /> Upload Resume
        </button>
      </div>
    </div>
  );
}

export default Resume;
