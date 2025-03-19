import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';



const MentorCard = ({ mentor }) => {
    const navigate = useNavigate();

    const handleHire = () => {
        navigate('/mentor-hired', { state: { mentor } });
    };

    return (
        <div className="p-4 m-2 bg-white rounded-2xl shadow-lg flex flex-col items-center">
            <img src={mentor.image} alt={mentor.name} className="w-32 h-32 rounded-full object-cover mb-4" />
            <h3 className="text-xl font-semibold">{mentor.name}</h3>
            <p className="text-gray-600">{mentor.expertise}</p>
            <p className="text-gray-500">{mentor.experience}</p>
            <p className="text-yellow-500">Rating: {mentor.rating} ⭐</p>
            <p className="text-green-600 font-bold">{mentor.price}</p>
            <p className="text-gray-700 text-center mt-2">{mentor.bio}</p>
            <button onClick={handleHire} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg">Hire Now</button>
        </div>
    );
};

const Mentorship = () => {
    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6">Mentorship Program</h2>
            <div className="ml-60 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {mentors.map((mentor) => (
                    <MentorCard key={mentor.id} mentor={mentor} />
                ))}
            </div>
        </div>
    );
};

export default Mentorship;
