import React from "react";
import { useParams, Link } from "react-router-dom";

const ReportDetail = () => {
  const { userId } = useParams();
  console.log("userId called at ReportDetail", userId);

  // Dummy data ( fetch this based on userId)
  const userReports = {
    U001: {
      name: "John Doe",
      date: "March 18, 2025",
      company: "Amazon",
      img: "https://via.placeholder.com/100?text=Amazon",
      resumeScore: 85,
      oaScore: 75,
      interviewScore: 90,
      weaknesses: [
        "Limited experience with dynamic programming",
        "Needs improvement in concise resume writing",
      ],
      improvements: [
        "Practice more LeetCode medium/hard problems",
        "Highlight key achievements in resume",
        "Enhance behavioral question responses",
      ],
      additionalInsights: "Shows strong problem-solving skills but could benefit from mock interviews.",
    },
    U002: {
      name: "Jane Smith",
      date: "March 15, 2025",
      company: "Google",
      img: "https://via.placeholder.com/100?text=Google",
      resumeScore: 90,
      oaScore: 80,
      interviewScore: 85,
      weaknesses: [
        "Struggles with time management during OAs",
        "Technical explanations could be clearer",
      ],
      improvements: [
        "Simulate timed coding tests",
        "Work on articulating solutions step-by-step",
      ],
      additionalInsights: "Great potential in system design; needs to refine communication skills.",
    },
    U003: {
      name: "Alex Johnson",
      date: "March 10, 2025",
      company: "Microsoft",
      img: "https://via.placeholder.com/100?text=Microsoft",
      resumeScore: 70,
      oaScore: 95,
      interviewScore: 80,
      weaknesses: [
        "Resume lacks specific metrics",
        "Nervousness impacts interview performance",
      ],
      improvements: [
        "Quantify achievements in resume (e.g., 'improved efficiency by 20%')",
        "Practice mock interviews to build confidence",
      ],
      additionalInsights: "Exceptional coding skills; resume and soft skills need polishing.",
    },
  };

  const report = userReports[userId] || {};

  return (
    <div className="min-h-screen bg-gray-100 py-10 flex justify-center">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-8">
        {/* Header */}
        <div className="flex items-center space-x-6 mb-8">
          <img
            src={report.img}
            alt={`${report.company} logo`}
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h1 className="text-3xl font-bold text-blue-700">
              {report.name}'s Performance Report
            </h1>
            <p className="text-sm text-gray-500">
              {report.company} | ID: {userId} | {report.date}
            </p>
          </div>
        </div>

        {/* Scores */}
        <div className="grid grid-cols-3 gap-6 mb-8 text-center">
          <div>
            <p className="text-gray-600">Resume Score</p>
            <p className="text-2xl font-bold text-blue-600">{report.resumeScore}%</p>
          </div>
          <div>
            <p className="text-gray-600">OA Score</p>
            <p className="text-2xl font-bold text-blue-600">{report.oaScore}%</p>
          </div>
          <div>
            <p className="text-gray-600">Interview Score</p>
            <p className="text-2xl font-bold text-blue-600">{report.interviewScore}%</p>
          </div>
        </div>

        {/* Weaknesses */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Weaknesses</h2>
          <ul className="list-disc pl-5 text-gray-700">
            {report.weaknesses?.map((weakness, idx) => (
              <li key={idx} className="mb-2">{weakness}</li>
            ))}
          </ul>
        </div>

        {/* Areas of Improvement */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Areas of Improvement</h2>
          <ul className="list-disc pl-5 text-gray-700">
            {report.improvements?.map((improvement, idx) => (
              <li key={idx} className="mb-2">{improvement}</li>
            ))}
          </ul>
        </div>

        {/* Additional Insights */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Additional Insights</h2>
          <p className="text-gray-700">{report.additionalInsights}</p>
        </div>

        {/* Back Button */}
        <Link to="/report">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300">
            Back to Reports
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ReportDetail;