import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"; // Import axios for API calls
import { Lock } from "lucide-react";
import Interview from "./Interview";
import Resume from "./Resume";
import OA from "./OA";
import { useSelector } from "react-redux";
import Loading from "../Loading";
import CourseCompleted from "./CourseCompleted";

function CourseView() {
  const { id } = useParams();
  // console.log("id called at CourseView", id);

  const arr = ["Resume", "OA", "Interview"];
  const [active, setActive] = React.useState("Resume");

  // State to store the fetched r_key_words
  const [rKeyWords, setRKeyWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentRound, setCurrentRound] = useState("Resume");
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [isCourseCompleted, setIsCourseCompleted] = useState(false);

  const openSidebar = useSelector((state) => state.ui_store.openSidebar);
  const fullscreenSidebar = useSelector((state) => state.ui_store.fullscreenSidebar);

  // Fetch r_key_words from the backend
  useEffect(() => {
    const fetchRKeyWords = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/user/resume-keywords/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token_codehire")}`,
          },
        });
        setRKeyWords(response.data); // Store the fetched keywords

        const token = localStorage.getItem("token_codehire");
        const progress = await axios.get(`http://localhost:8080/user/current-round/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCurrentRound(progress.data.current_round);
        setLoading(false);
      } // Stop loading
      catch (error) {
        setError("Failed to fetch keywords");
        setLoading(false); // Stop loading
      }
    };



    fetchRKeyWords();
  }, [id]);




  const getLockedStages = () => {
    const currIndex = arr.indexOf(currentRound);
    return arr.slice(currIndex + 1);
  }
  // Define which stages are locked (for now hardcoded, later from DB)
  const lockedStages = getLockedStages();
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const token = localStorage.getItem("token_codehire");
        const response = await axios.get(
          `http://localhost:8080/user/current-round/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCurrentRound(response.data.current_round);
        setProgressPercentage(response.data.progress_percentage);
      } catch (error) {
        console.error("Error fetching current progress:", error);
      }
    };

    fetchProgress();
  }, [id]);


  const handleProgressUpdate = async () => {
    try {
      const token = localStorage.getItem("token_codehire");
      const res = await axios.get(
        `http://localhost:8080/user/current-round/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data.current_round);
      setCurrentRound(res.data.current_round);
      setProgressPercentage(res.data.progress_percentage);
      if (res.data.progress_percentage >= 100) {
        setIsCourseCompleted(true);
      }  
    } catch (err) {
      console.error("Error refreshing progress", err);
    }
  };


  useEffect(() => {
    if (progressPercentage >= 100) {
      setIsCourseCompleted(true);
    }
  }, [progressPercentage]);
  if(isCourseCompleted){
    return <CourseCompleted/>
  }
  if (loading) return <Loading/>;
  if (error) return <div>{error}</div>;

  return (
    <>
      {/* Progress Bar */}
      <div className="w-full px-10 mt-4">
        <div className="w-full bg-gray-300 h-3 rounded">
          <div
            className="bg-blue-500 h-3 rounded transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <p className="text-sm text-right mt-1 text-gray-600">
          Progress: {progressPercentage.toFixed(1)}%
        </p>
      </div>


      {/* Navigation Stages */}
      <div
        className={` 
          ${window.innerWidth <= 768
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
        {active === "Resume" && (
          <Resume rKeyWords={rKeyWords} c_id={id} onProgressUpdate={handleProgressUpdate} setActive={setActive}/>
        )}
        {active === "OA" && !lockedStages.includes("OA") && <OA c_id={id} onProgressUpdate={handleProgressUpdate} setActive={setActive} />}
        {active === "Interview" && !lockedStages.includes("Interview") && <Interview c_id={id} onProgressUpdate={handleProgressUpdate} setActive={setActive} />}
      </div>
    </>
  );
}

export default CourseView;
