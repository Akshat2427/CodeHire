import React from "react";
import { Link } from "react-router-dom";

const Report = () => {
  // Dummy data for user performance reports
  const userReports = [
    {
      userId: "U001",
      name: "John Doe",
      date: "March 18, 2025",
      company: "Amazon",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSN0qIpl2wbLurDxYE3L2TVVMt3TqOG3XAQQ&s",
      resumeScore: 85,
      oaScore: 75,
      interviewScore: 90,
    },
    {
      userId: "U002",
      name: "Jane Smith",
      date: "March 15, 2025",
      company: "Google",
      img: "https://via.placeholder.com/100?text=Google",
      resumeScore: 90,
      oaScore: 80,
      interviewScore: 87,
    },
    {
      userId: "U003",
      name: "Alex Johnson",
      date: "March 10, 2025",
      company: "Microsoft",
      img: "https://via.placeholder.com/100?text=Microsoft",
      resumeScore: 70,
      oaScore: 95,
      interviewScore: 80,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-10 flex justify-center">
      <div className="w-full max-w-4xl mt-14">
        {/* Header */}
      

        {/* Reports Container */}
        <div className="space-y-6">
          {userReports.map((report) => (
            <div
              key={report.userId}
              className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between transition-all duration-300 hover:shadow-lg"
            >
              {/* Left: Image and Company */}
              <div className="flex items-center space-x-4">
                <img
                  src={report.img}
                  alt={`${report.company} logo`}
                  className="w-20 h-16  object-cover"
                />
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {report.name} ({report.company})
                  </h2>
                  <p className="text-sm text-gray-500">
                    ID: {report.userId} | {report.date}
                  </p>
                </div>
              </div>

              {/* Center: Scores */}
              <div className="flex space-x-6 text-sm">
                <span className="text-gray-600">
                  Resume: <span className="font-bold text-blue-600">{report.resumeScore}%</span>
                </span>
                <span className="text-gray-600">
                  OA: <span className="font-bold text-blue-600">{report.oaScore}%</span>
                </span>
                <span className="text-gray-600">
                  Interview: <span className="font-bold text-blue-600">{report.interviewScore}%</span>
                </span>
              </div>

              {/* Right: View Details Button */}
              <Link to={`/reports/${report.userId}`}>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">
                  View Details
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Report;