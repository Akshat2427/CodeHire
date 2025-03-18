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

                setQuestions(extractedData);
                console.log("Questions:", extractedData);
            } catch (error) {
                console.error("Error fetching CSV:", error);
            }
        }
        dispatch(fetchSolvedProblems(leetcodeUser));
        fetchLeetCodeQuestions();
    }, []);

    const handleFetchSolved = () => {
        dispatch(fetchSolvedProblems(leetcodeUser)); 
    };

   
    const filteredQuestions = questions.filter(q => {
        if (sortFilter === "solved") return questions.includes(q.title);
        if (sortFilter === "unsolved") return !questions.includes(q.title);
        return true;
    });

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Online Assessment Questions</h1>

           
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
            </div>
        </div>
    );
}

export default OA;