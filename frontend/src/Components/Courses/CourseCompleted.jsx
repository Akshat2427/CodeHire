// components/CourseCompleted.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

function CourseCompleted() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-green-100">
      <h1 className="text-4xl font-bold text-green-800 mb-4">
        🎉 Course Completed!
      </h1>
      <p className="text-xl text-green-700 mb-6">
        You have successfully completed this course.
      </p>
      <button
        className="bg-blue-500 text-white px-6 py-3 rounded-md shadow hover:bg-blue-600 transition"
        onClick={() => navigate("/report")}
      >
        Go to Report Section
      </button>
    </div>
  );
}

export default CourseCompleted;
// This component is a simple congratulatory message for course completion.