import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSolvedProblems } from "../../store/codingProfile";
import { Link } from "lucide-react";

function OA() {
  const dispatch = useDispatch();
  const { profile, solvedQuestions } = useSelector((state) => state.codingProfile);

  const [allQuestions, setAllQuestions] = useState([]);
  const [testQuestions, setTestQuestions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(2 * 60 * 60); // 2 hours in seconds
  const [testStarted, setTestStarted] = useState(false);
  const [testSubmitted, setTestSubmitted] = useState(false);
  const [leetcodeUser, setLeetcodeUser] = useState(profile.leetcode);

  // Fetch questions from CSV
  useEffect(() => {
    async function fetchLeetCodeQuestions() {
      const csvUrl =
        "https://raw.githubusercontent.com/liquidslr/leetcode-company-wise-problems/main/Amazon/1.%20Thirty%20Days.csv";
      try {
        const response = await fetch(csvUrl);
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
          .filter((row) => row.title);

        setAllQuestions(extractedData);

        // Pre-select 4 questions to show outside
        const shuffled = [...extractedData].sort(() => 0.5 - Math.random());
        setTestQuestions(shuffled.slice(0, 4));
      } catch (error) {
        console.error("Error fetching CSV:", error);
      }
    }
    dispatch(fetchSolvedProblems(leetcodeUser));
    fetchLeetCodeQuestions();
  }, [dispatch, leetcodeUser]);

  // Start the test
  const startTest = () => {
    setTestStarted(true);
    setTestSubmitted(false);
    setTimeLeft(2 * 60 * 60);
  };

  // Timer logic and continuous submission check
  useEffect(() => {
    if (testStarted && !testSubmitted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);

        // Continuously check if all questions are solved
        const allSolved = testQuestions.every((q) =>
          solvedQuestions.includes(q.title)
        );
        if (allSolved) {
          setTestSubmitted(true);
          setTimeLeft(0);
        }
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [testStarted, testSubmitted, timeLeft, testQuestions, solvedQuestions]);

<<<<<<< HEAD
    const handleFetchSolved = () => {
        dispatch(fetchSolvedProblems(leetcodeUser)); 
    };

   
    const filteredQuestions = questions.filter(q => {
        if (sortFilter === "solved") return questions.includes(q.title);
        if (sortFilter === "unsolved") return !questions.includes(q.title);
        return true;
    });
=======
  // Format time
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Submit test
  const submitTest = () => {
    setTestSubmitted(true);
    setTimeLeft(0);
  };
>>>>>>> 23896a794e84f503e3a4d6c5001cd280a84eec66

  return (
    <div className="ml-60 bg-gray-100 flex p-6">
      {!testStarted ? (
        <div className="flex w-full max-w-6xl">
          {/* Left Side: Question Titles */}
          <div className="w-1/3 bg-white p-6 rounded-lg shadow-lg mr-4">
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

<<<<<<< HEAD
           
            <div className="flex gap-4 mb-4 ml-64">
                <input
                    type="text"
                    placeholder="LeetCode Username"
                    value={leetcodeUser}
                    onChange={(e) => setLeetcodeUser(e.target.value)}
                    className="border p-2 rounded"
                />
                <input
                    type="text"
                    placeholder="GFG Username"
                    value={gfgUser}
                    onChange={(e) => setGfgUser(e.target.value)}
                    className="border p-2 rounded"
                />
                <input
                    type="text"
                    placeholder="Coding Ninjas Username"
                    value={codingNinjasUser}
                    onChange={(e) => setCodingNinjasUser(e.target.value)}
                    className="border p-2 rounded"
                />
                <button
                    onClick={handleFetchSolved}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Fetch Solved
                </button>
            </div>

            
            <div className="ml-64 mb-4">
                <label className="mr-2">Sort By:</label>
                <select
                    value={sortFilter}
                    onChange={(e) => setSortFilter(e.target.value)}
                    className="border p-2 rounded"
                >
                    <option value="all">All</option>
                    <option value="solved">Solved</option>
                    <option value="unsolved">Unsolved</option>
                </select>
            </div>

            
            <div className="ml-52 overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-blue-500 text-white">
                        <tr>
                            <th className="py-3 px-4 text-left">#</th>
                            <th className="py-3 px-4 text-left">Difficulty</th>
                            <th className="py-3 px-4 text-left">Title</th>
                            <th className="py-3 px-4 text-left">Frequency</th>
                            <th className="py-3 px-4 text-left">Status</th>
                            <th className="py-3 px-4 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredQuestions.map((q, index) => (
                            <tr key={index} className="border-b hover:bg-gray-100">
                                <td className="py-2 px-4">{index + 1}</td>
                                <td className="py-2 px-4">{q.difficulty}</td>
                                <td className="py-2 px-4 font-semibold">{q.title}</td>
                                <td className="py-2 px-4">{q.frequency}</td>
                                <td className="py-2 px-4 flex items-center">
                                    {questions.includes(q.title) ? (
                                        <CheckCircle className="text-green-500" />
                                    ) : (
                                        <XCircle className="text-red-500" />
                                    )}
                                </td>
                                <td className="py-2 px-4">
                                    <a
                                        href={q.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-1"
                                    >
                                        <Link size={16} /> Solve
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
=======
          {/* Right Side: Description */}
          <div className="w-2/3 bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-blue-600 mb-4">Coding Test</h1>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">About This Test:</h2>
              <ul className="list-disc pl-5 text-gray-700">
                <li>
                  4 questions selected from previous Online Assessments (OAs).
                </li>
                <li>You have 2 hours to complete the test.</li>
                <li>
                  Click the "Solve" link to attempt each problem on LeetCode.
                </li>
                <li>
                  Your progress is tracked based on solved problems in your
                  profile.
                </li>
                <li>
                  Submit the test manually or automatically pass if all
                  questions are solved.
                </li>
              </ul>
>>>>>>> 23896a794e84f503e3a4d6c5001cd280a84eec66
            </div>
            <button
              onClick={startTest}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
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
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition duration-300"
                      >
                        <Link size={16} /> Solve
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
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition duration-300"
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
              <p className="text-lg mt-2">
                Your score will be shown shortly on mail or in our platform.
              </p>
              <button
                onClick={startTest}
                className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Take Another Test
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default OA;