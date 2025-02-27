import { useNavigate } from "react-router-dom";

const CourseCard = ({ course }) => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer transform hover:scale-105 transition duration-300 "
      onClick={() => navigate(`/course/${course.id}`)}
    >
      <img src={course.image} alt={course.title} className="w-full h-[180px] object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold">{course.title}</h2>
        <p className="text-gray-600">{course.description}</p>
      </div>
    </div>
  );
};

export default CourseCard;
