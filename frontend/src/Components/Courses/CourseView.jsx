import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"; // Import axios for API calls
import { Lock } from "lucide-react";
import Interview from "./Interview";
import Resume from "./Resume";
import OA from "./OA";
import { useSelector } from "react-redux";

function CourseView() {
  const { id } = useParams();
  console.log("id called at CourseView", id);

  const arr = ["Resume", "OA", "Interview"];
  const [active, setActive] = React.useState("Resume");

  // State to store the fetched r_key_words
  const [rKeyWords, setRKeyWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const openSidebar = useSelector((state) => state.ui_store.openSidebar);
  const fullscreenSidebar = useSelector((state) => state.ui_store.fullscreenSidebar);

  // Fetch r_key_words from the backend
  useEffect(() => {
    const fetchRKeyWords = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/user/resume-keywords/${id}`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token_codehire")}`,
          },
        });
        setRKeyWords(response.data); // Store the fetched keywords
        setLoading(false); // Stop loading
      } catch (error) {
        setError("Failed to fetch keywords");
        setLoading(false); // Stop loading
      }
    };

    fetchRKeyWords();
  }, []);

  // Define which stages are locked (for now hardcoded, later from DB)
  const lockedStages = ["OA", "Interview"];

  if (loading) return <div>Loading keywords...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      {/* Navigation Stages */}
      <div
        className={` 
         ${
           window.innerWidth <= 768
             ? fullscreenSidebar
               ? "hidden"
               : "ml-0"
             : openSidebar
             ? "ml-60"
             : "ml-16"
         }
       flex flex-wrap justify-center sm:justify-around px-4 sm:px-10 py-4 bg-gray-100 shadow-md`}
      >
        {arr.map((item, index) => {
          const isLocked = lockedStages.includes(item);
          return (
            <div
              key={index}
              onClick={() => {
                if (!isLocked) setActive(item);
              }}
              className={`flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 text-center rounded-lg shadow-md font-semibold transition-all duration-300
              ${isLocked
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : active === item
                ? "bg-blue-500 text-white scale-105 cursor-pointer"
                : "bg-blue-100 text-blue-800 cursor-pointer"
              }`}
            >
              {item}
              {isLocked && <Lock size={16} className="text-gray-500 ml-2" />}
            </div>
          );
        })}
      </div>

      {/* Content View */}
      <div className="mt-6 px-4 sm:px-10">
        {active === "Resume" && <Resume rKeyWords={rKeyWords} c_id={id}/>}
        {active === "OA" && !lockedStages.includes("OA") && <OA />}
        {active === "Interview" && !lockedStages.includes("Interview") && <Interview />}
      </div>
    </>
  );
}

export default CourseView;
