import { Link } from "react-router-dom";
const CourseCard = ({ course }) => (
  <div className="bg-white p-4 rounded-xl shadow-md">
    <img src={course.image} alt={course.title} className="w-full h-40 object-cover rounded-lg" />
    <h2 className="text-lg font-semibold mt-2">{course.title}</h2>
    <Link to={`/course/${course.id}`} className="text-blue-500 mt-2 block">View Course</Link>
  </div>
);
export default CourseCard;