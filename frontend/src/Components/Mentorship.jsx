import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const mentors = [
    {
        id: 1,
        name: 'John Doe',
        expertise: 'Data Structures & Algorithms',
        experience: '5+ years in FAANG companies',
        rating: 4.8,
        price: '$50/hr',
        image: 'https://i.pravatar.cc/300?img=10',
        bio: 'Passionate mentor with extensive experience in competitive programming and algorithm design.'
    },
    {
        id: 2,
        name: 'Jane Smith',
        expertise: 'System Design & Backend Development',
        experience: '4+ years in Microsoft',
        rating: 4.9,
        price: '$60/hr',
        image: 'https://i.pravatar.cc/300?img=20',
        bio: 'Expert in scalable backend solutions and system architecture with real-world project experience.'
    },
    {
        id: 3,
        name: 'Alice Johnson',
        expertise: 'Front-End Development & UI/UX',
        experience: '3+ years in Google',
        rating: 4.7,
        price: '$45/hr',
        image: 'https://i.pravatar.cc/300?img=30',
        bio: 'Creative front-end developer with a knack for responsive and user-friendly designs.'
    },
    {
        id: 4,
        name: 'Michael Brown',
        expertise: 'Cloud Computing & DevOps',
        experience: '6+ years in AWS and Azure',
        rating: 4.6,
        price: '$55/hr',
        image: 'https://i.pravatar.cc/300?img=40',
        bio: 'Expert in cloud architecture and CI/CD practices, helping companies achieve scalable and reliable solutions.'
    },
    {
        id: 5,
        name: 'Sophia Lee',
        expertise: 'AI & Machine Learning',
        experience: '4+ years in OpenAI Research',
        rating: 4.9,
        price: '$70/hr',
        image: 'https://i.pravatar.cc/300?img=50',
        bio: 'Experienced AI researcher with deep knowledge of neural networks and natural language processing.'
    },
    {
        id: 6,
        name: 'David Wang',
        expertise: 'Cybersecurity & Ethical Hacking',
        experience: '5+ years as a Certified Ethical Hacker',
        rating: 4.8,
        price: '$65/hr',
        image: 'https://i.pravatar.cc/300?img=60',
        bio: 'Specialist in penetration testing and network security, helping businesses secure their systems.'
    },
    {
        id: 7,
        name: 'Emily Davis',
        expertise: 'Software Testing & QA',
        experience: '4+ years in Quality Assurance',
        rating: 4.7,
        price: '$40/hr',
        image: 'https://i.pravatar.cc/300?img=70',
        bio: 'Skilled in automated and manual testing, ensuring the highest quality of software products.'
    }
];


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
