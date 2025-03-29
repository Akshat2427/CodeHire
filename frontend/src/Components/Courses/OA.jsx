import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSolvedProblems } from "../../store/codingProfile";
import { Link as LinkIcon } from "lucide-react";


const OA = () => {
  const dispatch = useDispatch();
  const { profile, solvedQuestions } = useSelector((state) => state.codingProfile);
  const openSidebar = useSelector((state) => state.ui_store.openSidebar);
  const isCollapsed = useSelector((state) => state.ui_store.isCollapsed || false); // Assuming this might be added

  const [allQuestions, setAllQuestions] = useState([]);
  const [testQuestions, setTestQuestions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(2 * 60 * 60); // 2 hours in seconds
  const [testStarted, setTestStarted] = useState(false);
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [leetcodeUser, setLeetcodeUser] = useState(profile.leetcode);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fullscreenSidebar = useSelector((state) => state.ui_store.fullscreenSidebar);

  // Fetch questions from CSV
  useEffect(() => {
    const fetchLeetCodeQuestions = async () => {
      setLoading(true);
      setError(null);
      const csvUrl =
        "https://raw.githubusercontent.com/liquidslr/leetcode-company-wise-problems/main/Amazon/1.%20Thirty%20Days.csv";
      try {
        const response = await fetch(csvUrl);
        if (!response.ok) throw new Error("Failed to fetch questions");
        const csvText = await response.text();
        const rows = csvText.split("\n").map((row) => row.split(","));

        const extractedData = rows
          .slice(1)
          .map((row) => ({
            difficulty: row[0],
            title: row[1],
            frequency: row[2],
            link: row[4],
          }))
          .filter((row) => row.title && row.link);

        setAllQuestions(extractedData);
        const shuffled = [...extractedData].sort(() => 0.5 - Math.random());
        setTestQuestions(shuffled.slice(0, 4));
      } catch (error) {
        console.error("Error fetching CSV:", error);
        setError("Failed to load questions. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    dispatch(fetchSolvedProblems(leetcodeUser));
    fetchLeetCodeQuestions();
  }, [dispatch, leetcodeUser]);

  // Timer logic with cleanup
  useEffect(() => {
    let timer;
    if (testStarted && !testSubmitted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 1;
          const allSolved = testQuestions.every((q) =>
            solvedQuestions.includes(q.title)
          );
          if (allSolved || newTime <= 0) {
            setTestSubmitted(true);
            return 0;
          }
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [testStarted, testSubmitted, timeLeft, testQuestions, solvedQuestions]);

  // Start test
  const startTest = useCallback(() => {
    setTestStarted(true);
    setTestSubmitted(false);
    setTimeLeft(2 * 60 * 60);
  }, []);

  // Submit test
  const submitTest = useCallback(() => {
    setTestSubmitted(true);
    setTimeLeft(0);
  }, []);

  // Format time
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className={`min-h-screen bg-gray-100 p-6 transition-all duration-300  ${
      window.innerWidth <= 768 
        ? (fullscreenSidebar ? "hidden" : "ml-0")
        : (openSidebar ? "ml-60" : "ml-16")
    }`}
    >
      {loading ? (
        <div className="text-center text-gray-600">Loading questions...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : !testStarted ? (
        <div className="flex flex-col lg:flex-row w-full max-w-6xl gap-6">
          {/* Left Side: Question Titles */}
          <div className="lg:w-1/3 w-full bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Test Questions
            </h2>
            <ul className="list-decimal pl-5 text-gray-700">
              {testQuestions.map((q, index) => (
                <li key={index} className="mb-2">
                  {q.title}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side: Description */}
          <div className="lg:w-2/3 w-full bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-blue-600 mb-4">Coding Test</h1>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2 text-gray-800">
                About This Test:
              </h2>
              <ul className="list-disc pl-5 text-gray-700">
                <li>4 questions from previous Online Assessments (OAs).</li>
                <li>You have 2 hours to complete the test.</li>
                <li>Solve each problem on LeetCode via the "Solve" link.</li>
                <li>Progress tracked based on your solved problems.</li>
                <li>
                  Auto-submit when all solved or manually submit early.
                </li>
              </ul>
            </div>
            <button
              onClick={startTest}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
              aria-label="Start coding test"
            >
              Start Test
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-5xl">
          {/* Timer */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-800">
              Time Remaining:{" "}
              <span className="text-blue-600">{formatTime(timeLeft)}</span>
            </h2>
            {timeLeft === 0 && !testSubmitted && (
              <p className="text-red-500 font-bold mt-2">Time's Up!</p>
            )}
          </div>

          {/* Questions Table */}
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg overflow-hidden">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="py-4 px-6 text-left text-sm font-medium">#</th>
                  <th className="py-4 px-6 text-left text-sm font-medium">
                    Difficulty
                  </th>
                  <th className="py-4 px-6 text-left text-sm font-medium">
                    Title
                  </th>
                  <th className="py-4 px-6 text-left text-sm font-medium">
                    Frequency
                  </th>
                  <th className="py-4 px-6 text-left text-sm font-medium">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {testQuestions.map((q, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 transition duration-200"
                  >
                    <td className="py-3 px-6 text-gray-700">{index + 1}</td>
                    <td className="py-3 px-6 text-gray-700">{q.difficulty}</td>
                    <td className="py-3 px-6 font-semibold text-gray-800">
                      {q.title}
                    </td>
                    <td className="py-3 px-6 text-gray-700">{q.frequency}</td>
                    <td className="py-3 px-6">
                      <a
                        href={q.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                        aria-label={`Solve ${q.title} on LeetCode`}
                      >
                        <LinkIcon size={16} /> Solve
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Submit Button */}
          {!testSubmitted && (
            <div className="text-center mt-6">
              <button
                onClick={submitTest}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-300"
                aria-label="Submit test"
              >
                Submit Test
              </button>
            </div>
          )}

          {/* Test Result */}
          {testSubmitted && (
            <div className="text-center mt-6">
              <h2 className="text-2xl font-bold text-green-600">
                Test Submitted Successfully!
              </h2>
              <p className="text-lg mt-2 text-gray-700">
                Your score will be emailed or displayed on the platform soon.
              </p>
              <button
                onClick={startTest}
                className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
                aria-label="Take another test"
              >
                Take Another Test
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OA;