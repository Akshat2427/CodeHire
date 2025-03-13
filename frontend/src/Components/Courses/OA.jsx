import React, { useEffect, useState } from 'react';

function OA() {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        async function fetchLeetCodeQuestions() {
            const csvUrl = "https://raw.githubusercontent.com/liquidslr/leetcode-company-wise-problems/main/Amazon/1.%20Thirty%20Days.csv";
        
            try {
                const response = await fetch(csvUrl);
                const csvText = await response.text();
        
                // Convert CSV to an array of rows
                const rows = csvText.split("\n").map(row => row.split(","));
        
                // Extracting relevant columns
                const extractedData = rows.slice(1).map(row => ({
                    difficulty: row[0],
                    title: row[1],
                    frequency: row[2],
                    acceptanceRate: row[3],
                    link: row[4]
                })).filter(row => row.title); // Filter out empty rows
        
                setQuestions(extractedData);
        
            } catch (error) {
                console.error("Error fetching CSV:", error);
            }
        }
        
        fetchLeetCodeQuestions();
    }, []);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Online Assessment Questions</h1>
            <div className="ml-52  overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-blue-500 text-white">
                        <tr>
                            <th className="py-3 px-4 text-left">#</th>
                            <th className="py-3 px-4 text-left">Difficulty</th>
                            <th className="py-3 px-4 text-left">Title</th>
                            <th className="py-3 px-4 text-left">Frequency</th>
                            <th className="py-3 px-4 text-left">Acceptance Rate</th>
                            <th className="py-3 px-4 text-left">Link</th>
                        </tr>
                    </thead>
                    <tbody>
                        {questions.map((q, index) => (
                            <tr key={index} className="border-b hover:bg-gray-100">
                                <td className="py-2 px-4">{index + 1}</td>
                                <td className="py-2 px-4">{q.difficulty}</td>
                                <td className="py-2 px-4 font-semibold">{q.title}</td>
                                <td className="py-2 px-4">{q.frequency}</td>
                                <td className="py-2 px-4">{q.acceptanceRate}</td>
                                <td className="py-2 px-4 text-blue-500 underline">
                                    <a href={q.link} target="_blank" rel="noopener noreferrer">View</a>
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
