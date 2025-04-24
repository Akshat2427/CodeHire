import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { logout } from '../store/user';
import axios from 'axios';
const AdminAccess = () => {
    const dispatch = useDispatch();
    const token = localStorage.getItem('token_codehire');
    const [courseData, setCourseData] = useState({
        c_id: "",
        c_name: "",
        c_desc: "",
        c_price: "",
        c_rating: "",
        category: "NONE",
        logo: "",
        stageCount: ""
    });
    const handleClick = () => {
        dispatch(logout());
    }
    const handleAddCourses = async (e) => {
        e.preventDefault();
        //console.log('Course Data:', courseData);
        try {
            const response = await axios.post('http://localhost:8080/admin/add-course', courseData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            console.log('Course added successfully:', response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    }
    return (
        <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
            <form onSubmit={handleAddCourses} className="mb-4 w-full max-w-md bg-white p-6 rounded shadow-md">
                <div className="mb-4">
                    <label htmlFor="c_id" className="block text-gray-700 font-bold mb-2">Course ID</label>
                    <input
                        value={courseData.c_id}
                        onChange={(e) => setCourseData((prevData) => ({ ...prevData, c_id: e.target.value }))}
                        type="text"
                        id="c_id"
                        name="c_id"
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="c_name" className="block text-gray-700 font-bold mb-2">Course Name</label>
                    <input
                        value={courseData.c_name}
                        onChange={(e) => setCourseData((prevData) => ({ ...prevData, c_name: e.target.value }))}
                        type="text"
                        id="c_name"
                        name="c_name"
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="c_desc" className="block text-gray-700 font-bold mb-2">Course Description</label>
                    <textarea
                        id="c_desc"
                        value={courseData.c_desc}
                        onChange={(e) => setCourseData((prevData) => ({ ...prevData, c_desc: e.target.value }))}
                        name="c_desc"
                        className="w-full px-3 py-2 border rounded"
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="c_price" className="block text-gray-700 font-bold mb-2">Course Price</label>
                    <input
                        type="number"
                        value={courseData.c_price}
                        onChange={(e) => setCourseData((prevData) => ({ ...prevData, c_price: e.target.value }))}
                        id="c_price"
                        name="c_price"
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="c_rating" className="block text-gray-700 font-bold mb-2">Course Rating</label>
                    <input
                        type="number"
                        value={courseData.c_rating}
                        onChange={(e) => setCourseData((prevData) => ({ ...prevData, c_rating: e.target.value }))}
                        step="0.1"
                        id="c_rating"
                        name="c_rating"
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="category" className="block text-gray-700 font-bold mb-2">Category</label>
                    <select
                        id="category"
                        onChange={(e) => setCourseData((prevData) => ({ ...prevData, category: e.target.value }))}
                        name="category"
                        className="w-full px-3 py-2 border rounded"
                    >
                        <option value="TRENDING">TRENDING</option>
                        <option value="LATEST">LATEST</option>
                        <option value="STAFF_PICK">STAFF_PICK</option>
                        <option value="NONE" disabled>NONE</option>
                        <option value="MAANG">MAANG</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="logo" className="block text-gray-700 font-bold mb-2">Logo URL</label>
                    <input
                        type="text"
                        value={courseData.logo}
                        onChange={(e) => setCourseData((prevData) => ({ ...prevData, logo: e.target.value }))}
                        id="logo"
                        name="logo"
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="stageCount" className="block text-gray-700 font-bold mb-2">Stage Count</label>
                    <input
                        type="number"
                        value={courseData.stageCount}
                        onChange={(e) => setCourseData((prevData) => ({ ...prevData, stageCount: e.target.value }))}
                        id="stageCount"
                        name="stageCount"
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Add Courses
                </button>
            </form>

            <button onClick={handleClick} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                Logout
            </button>
        </div>
    )
}

export default AdminAccess
