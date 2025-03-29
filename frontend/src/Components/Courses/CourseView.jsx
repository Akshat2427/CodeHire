import React from "react";
import { useParams } from "react-router-dom";
import { Lock } from "lucide-react";
import Interview from "./Interview";
import Resume from "./Resume";
import OA from "./OA";
import { useSelector } from "react-redux";

function CourseView() {
  const { id } = useParams();
  console.log("id called at CourseView", id);

  const arr = ["Resume", "OA", "Interview"];
  const [active, setActive] = React.useState(arr[0]);

  const openSidebar = useSelector((state) => state.ui_store.openSidebar);
  const fullscreenSidebar = useSelector((state) => state.ui_store.fullscreenSidebar);

  return (
    <>
      {/* Navigation Stages */}
      <div className={` 
         ${
          window.innerWidth <= 768 
            ? (fullscreenSidebar ? "hidden" : "ml-0")
            : (openSidebar ? "ml-60" : "ml-16")
        }
       flex flex-wrap justify-center sm:justify-around px-4 sm:px-10 py-4 bg-gray-100 shadow-md`}>
        {arr.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              if (item !== "#Interview") setActive(item); // Prevent click on locked stage
            }}
            className={`flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 text-center rounded-lg shadow-md font-semibold transition-all duration-300 cursor-pointer
              ${
                item === "Interview"
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : active === item
                  ? "bg-blue-500 text-white scale-105"
                  : "bg-blue-100 text-blue-800"
              }
            `}
          >
            {item}
            {item === "Interview" && <Lock size={16} className="text-gray-500 ml-2" />}
          </div>
        ))}
      </div>

      {/* Content View */}
      <div className="mt-6 px-4 sm:px-10">
        {active === "Resume" ? <Resume /> : active === "OA" ? <OA /> : <Interview />}
      </div>
    </>
  );
}

export default CourseView;
