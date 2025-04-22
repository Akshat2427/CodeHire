import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import courses from './courseData';
import { useSelector } from 'react-redux';

function CourseDescription() {
    const { c_id } = useParams();
    // const courseId = parseInt(id);
    // const viewingCourses = useSelector((state) => state.courses.courses);
    const course = courses.find(course => course.c_id === c_id);
    const [commentIndex, setCommentIndex] = useState(0);

    // Auto-scroll comments every 3 seconds
    useEffect(() => {
        if (course && course.comments.length > 3) {
            const interval = setInterval(() => {
                setCommentIndex((prev) => (prev + 1) % (course.comments.length - 2  ));
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [course]);

    if (!course) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <h2 className="text-2xl text-gray-600">Course not found</h2>
            </div>
        );
    }

  
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span key={i} className={i <= Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}>
                    ★
                </span>
            );
        }
        return stars;
    };

    
    const commentImages = [
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100",
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
        "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=100",
    ];

    
    const expandedDescription = `
        This course is meticulously designed to elevate your skills and increase your chances of landing a role at your dream company. 
        Whether you're aiming to master cutting-edge technologies or refine your expertise in a specialized field, this program offers 
        a comprehensive journey through practical, hands-on learning experiences. Developed in collaboration with industry leaders, 
        it bridges the gap between theoretical knowledge and real-world application, ensuring you’re well-prepared to tackle 
        challenges and excel in a competitive job market. From foundational concepts to advanced techniques, every module is 
        crafted to empower you with the tools and confidence needed to succeed.
    `;

    return (
     <div div className="flex justify-center items-center h-screen w-full pt-20 pl-60 ">
          <div className="min-h-screen bg-gray-100 flex flex-col">
           
            {/* <header className="bg-blue-600 text-white m-4 p-4">
                <h1 className="text-3xl font-bold">Course Details</h1>
            </header> */}

           
            <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8 ">
                <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="flex flex-col md:flex-row-reverse">
                       
                        <div className="md:w-1/3 p-6 flex flex-col items-center bg-gray-50">
                            <img
                                src={course.companyImg}
                                alt={`${course.title} logo`}
                                className="w-40 h-40 object-contain mb-4"
                            />
                            <h1 className="text-3xl font-bold text-gray-900 text-center">
                                {course.title}
                            </h1>
                            <div className="mt-2 text-gray-600 flex flex-col items-center">
                                <span>{course.stages} Stages</span>
                                <div className="flex items-center">
                                    <span className="mr-1">Rating:</span>
                                    {renderStars(course.rating)}
                                    <span className="ml-1">({course.rating}/5)</span>
                                </div>
                            </div>
                        </div>

                        
                        <div className="md:w-2/3 p-6">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                Course Description
                            </h2>
                            <p className="text-gray-600 mb-6">{expandedDescription}</p>

                          
                            <h3 className="text-xl font-semibold text-gray-800 mb-3">
                                What You'll Learn
                            </h3>
                            <ul className="list-disc pl-5 mb-6 text-gray-600">
                                {course.learningSections.map((section, index) => (
                                    <li key={index}>{section}</li>
                                ))}
                            </ul>

                            <div className="flex items-center justify-between">
                                <button className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
                                    {course.buttonTitle}
                                </button>
                                <div className="text-sm text-gray-500">
                                    Course ID: {course.id}
                                </div>
                            </div>
                        </div>
                    </div>

                   
                    <div className="p-6 border-t border-gray-200">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">
                            Student Feedback
                        </h3>
                        <div className="overflow-hidden">
                            <div
                                className="flex transition-transform duration-500"
                                style={{ transform: `translateX(-${commentIndex * 33.33}%)` }}
                            >
                                {course.comments.map((comment, index) => (
                                    <div
                                        key={index}
                                        className="w-1/3 flex-shrink-0 px-2"
                                    >
                                        <div className="bg-gray-100 p-4 rounded-lg shadow-md flex items-start">
                                            <img
                                                src={commentImages[index % commentImages.length]}
                                                alt={`${comment.user} avatar`}
                                                className="w-12 h-12 rounded-full mr-3"
                                            />
                                            <div>
                                                <p className="text-gray-700 italic">"{comment.text}"</p>
                                                <p className="text-gray-500 text-sm mt-1">- {comment.user}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
        </div>
    );
}

export default CourseDescription;