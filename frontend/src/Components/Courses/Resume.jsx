import React, { useEffect, useState } from "react";
import data from "./tempUserCourse.json";
import { NavLink } from "react-router-dom";
import { UploadCloud, Info } from "lucide-react";
import axios from "axios";

function Resume({ rKeyWords,c_id, onProgressUpdate , setActive}) {
  const [resumeFile, setResumeFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [geminResponse,setGeminiResponse] = useState("");

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setResumeFile(file);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("keywords", JSON.stringify(rKeyWords));

    try {
      setUploading(true);
      setUploadStatus(null);

      const token = localStorage.getItem("token_codehire");

      const response = await axios.post(
        `http://localhost:8080/user/upload-resume/${c_id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      // console.log(response.data.analysis.split("/")[0]);
      setGeminiResponse(response.data.analysis);

      const resp = await axios.post(`http://localhost:8080/user/update-progress/${c_id}`,{
        current_round: "OA",
        progress_percentage: 33.33,
        score: response.data.analysis.split("/")[0],
      },{
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      onProgressUpdate();

      setTimeout(() => {
        setActive("OA");
      },1000)


      setUploadStatus("Resume uploaded and evaluated successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      setUploadStatus("Error uploading resume. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container min-h-screen w-full bg-gray-100 py-10 px-4 sm:px-10 relative">
      {/* Keywords Block */}
      <div className="mx-auto max-w-4xl bg-white shadow-lg rounded-lg p-6 mb-10 relative">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Selected Keywords</h2>
          <div className="group relative">
            <Info className="text-gray-500 cursor-pointer" size={20} />
            <span className="absolute left-0 top-7 hidden w-64 bg-gray-800 text-white text-xs p-2 rounded-md shadow-lg group-hover:block">
              These are the keywords preferred by companies when evaluating resumes.
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {rKeyWords.map((item, index) => (
            <div
              key={index}
              className="bg-blue-100 text-blue-800 px-5 py-2 rounded-md shadow-md"
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Resume Upload Block */}
      <div className="mx-auto max-w-4xl bg-white shadow-lg rounded-lg p-6 relative">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Resumes</h2>
          <div className="group relative">
            <Info className="text-gray-500 cursor-pointer" size={20} />
            <span className="absolute left-0 top-7 hidden w-64 bg-gray-800 text-white text-xs p-2 rounded-md shadow-lg group-hover:block">
              These are the resumes of students who have been shortlisted.
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {data.resume.former_freshers_cdn.map((item, index) => (
            <div key={index} className="bg-gray-200 p-3 rounded-lg shadow-md">
              <NavLink
                to={item}
                className="block hover:scale-105 transition-transform"
              >
                <img
                  src="https://marketplace.canva.com/EAFzfwx_Qik/4/0/1131w/canva-blue-simple-professional-cv-resume-T9RPR4DPdiw.jpg"
                  alt="Resume"
                  className="h-48 w-full object-cover rounded-md shadow-md"
                />
              </NavLink>
            </div>
          ))}
        </div>

        {/* Hidden input for file selection */}
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="hidden"
          id="resume-upload"
        />

        {/* Upload button */}
        <button
          className="mt-6 w-full sm:w-auto bg-blue-500 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 shadow-lg hover:bg-blue-600 transition-all"
          onClick={() => document.getElementById("resume-upload").click()}
          disabled={uploading}
        >
          <UploadCloud size={20} />
          {uploading ? "Uploading..." : "Upload Resume"}
        </button>

        {/* Upload Status */}
        {uploadStatus && (
          <p className="mt-4 text-sm text-center text-gray-700">{uploadStatus}</p>
        )}

        {
          uploadStatus && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">Evaluation of Resume: </h3>
              <p className="text-sm text-gray-700">{geminResponse}</p>
            </div>
          )
        }
      </div>
    </div>
  );
}

export default Resume;
