import React from "react";
import { useParams } from "react-router-dom";
import { Lock } from "lucide-react";
import Interview from "./Interview";
import Resume from "./Resume";
import OA from "./OA";

function CourseView() {
  const { id } = useParams();
  console.log("id called at CourseView", id);

  const arr = ["Resume", "OA", "Interview"];
  const [active, setActive] = React.useState(arr[0]);

  return (
    <>
      {/* Navigation Stages */}
      <div className="ml-64 pt-18 flex justify-around space-x-4">
        
       <div className="flex justify-center space-x-4">
       {arr.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              if (item !== "Interview") setActive(item); // Prevent click on locked stage
            }}
            className={`flex justify-center items-center px-6 py-3 text-center rounded-lg shadow-md font-semibold transition-all duration-300 cursor-pointer
              ${
                item === "Interview"
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : active === item
                  ? "bg-blue-500 text-white scale-105"
                  : "bg-blue-100 text-blue-800"
              }
            `}
          >
          <div>  {item}</div>
            {item === "Interview" && (
              <Lock size={16} className=" text-gray-500 ml-2" />
            )}
          </div>
        ))}
       </div>
     
      </div>

      {/* Content View */}
      <div className="mt-6">{active === "Resume" ? <Resume /> : active === "OA" ? <OA /> : <Interview />}</div>
    </>
  );
}

export default CourseView;
