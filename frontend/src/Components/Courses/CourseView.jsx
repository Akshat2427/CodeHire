import React from 'react'
import { useParams } from "react-router-dom";
import data from './tempUserCourse.json'
import Interview from './Interview';
import Resume from './Resume';
import OA from './OA';


function CourseView() {
    const { id } = useParams();
    console.log("id called at CourseView",id);

    const arr = ["Resume", "OA" , "Interview"];
    const [active, setActive] = React.useState(arr[0]);
    return (
        <>

       <div className='ml-64 pt-14 flex justify-center'>
       
       {arr.map((item, index) => (
            <div key={index} onClick={()=>{setActive(item)}} className="bg-blue-100 text-blue-800 p-4 rounded-lg text-center shadow-md">
                {item}
            </div>
            ))}
       </div>
       {
              active === "Resume" ? <Resume /> : active === "OA" ? <OA /> : <Interview/>
       }
        </>
    )
}

export default CourseView
