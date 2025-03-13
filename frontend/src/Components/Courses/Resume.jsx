import React from 'react';
import data from './tempUserCourse.json';
import { NavLink } from 'react-router-dom';

function Resume() {
    console.log("data called at Resume", data.resume.selected_keywords);
    return (
        <div className="container min-h-screen w-full bg-gray-100 py-10 px-5">
            {/* Selected Keywords Section */}
            <div className="ml-52 bg-white shadow-lg rounded-lg p-6 mb-10">
                <h2 className="text-2xl font-semibold mb-4 text-center">Selected Keywords</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {data.resume.selected_keywords.map((item, index) => (
                        <div key={index} className="bg-blue-100 text-blue-800 p-4 rounded-lg text-center shadow-md">
                            {item}
                        </div>
                    ))}
                </div>
            </div>

            {/* Resume Links Section */}
            <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-semibold mb-4 text-center">Resumes</h2>
                <div className="flex flex-wrap justify-center gap-6">
                    {data.resume.former_freshers_cdn.map((item, index) => (
                        <div key={index} className="bg-gray-200 p-4 rounded-lg shadow-md">
                            <NavLink to={item} className="block hover:scale-105 transition-transform">
                                <img 
                                    src="https://marketplace.canva.com/EAFzfwx_Qik/4/0/1131w/canva-blue-simple-professional-cv-resume-T9RPR4DPdiw.jpg" 
                                    alt="Resume" 
                                    className='h-56 w-40 rounded-md shadow-md'
                                />
                            </NavLink>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Resume;
