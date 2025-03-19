import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';



    const comments =  [
        { user: 'Alice', text: 'John really helped me improve my coding skills!' },
        { user: 'Bob', text: 'Great mentor! Highly recommended.' },
        { user: 'Carol', text: 'Insightful and patient. Loved the sessions.' }
    ]


const MentorHired = () => {
    const location = useLocation();
    const mentor = location.state.mentor ?? {
        id: 1,
        name: 'John Doe',
        username: 'john_doe123',
        expertise: 'Data Structures & Algorithms',
        experience: '5+ years in FAANG companies',
        rating: 4.8,
        price: '$50/hr',
        location: 'San Francisco, CA',
        degree: 'Master of Computer Science',
        workplace: 'Google',
        bio: 'Passionate mentor with extensive experience in competitive programming and algorithm design.',
    };
    const navigate = useNavigate();
    const [commentIndex, setCommentIndex] = useState(0);

    useEffect(() => {
        if (comments.length > 3) {
            const interval = setInterval(() => {
                setCommentIndex((prev) => (prev + 1) % comments.length);
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [mentor]);

    if (!mentor) {
        return <div className="p-6 text-center text-red-600">No mentor selected.</div>;
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

    return (
        <div className="p-10 text-center bg-gray-100 min-h-screen flex flex-col items-center justify-center">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-3xl">
                <h3 className="text-2xl font-semibold mb-2">{mentor.name}</h3>
                <img src={mentor.image} alt={mentor.name} className="w-32 h-32 rounded-full mx-auto mb-4 shadow-md" />
                <p className="text-gray-600 mb-2">Username: <span className="font-medium">{mentor.username}</span></p>
                <p className="text-gray-600 mb-2">Rating: {renderStars(mentor.rating)} <span className="font-medium">({mentor.rating}/5)</span></p>
                <p className="text-gray-600 mb-2">Location: <span className="font-medium">{mentor.location}</span></p>
                <p className="text-gray-600 mb-2">Degree: <span className="font-medium">{mentor.degree}</span></p>
                <p className="text-gray-600 mb-2">Current Workplace: <span className="font-medium">{mentor.workplace}</span></p>
                <p className="text-gray-700 mb-6">{mentor.bio}</p>
                <div className="p-6 border-t border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Comments from Mentees</h3>
                    <div className="overflow-hidden">
                        <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${commentIndex * 100}%)` }}>
                            {comments.map((comment, index) => (
                                <div key={index} className="w-full px-4">
                                    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                                        <p className="text-gray-700 italic">"{comment.text}"</p>
                                        <p className="text-gray-500 text-sm mt-1">- {comment.user}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex justify-center gap-4 mt-6">
                    <button onClick={() => navigate('/mentorship')} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition">Browse More Mentors</button>
                </div>
            </div>
        </div>
    );
};

export default MentorHired;
