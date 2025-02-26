import CourseCard from "./CourseCard";
const courses = [
  { id: 1, title: "UI UX Design", image: "https://via.placeholder.com/200" },
  { id: 2, title: "Figma", image: "https://via.placeholder.com/200" },
  { id: 3, title: "Python", image: "https://via.placeholder.com/200" },
  { id: 4, title: "iOS Development", image: "https://via.placeholder.com/200" },
];
const Courses = () => (
  <div className="ml-64 p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {
    courses.map(course => (
      <CourseCard key={course.id} course={course} />
    ))
    }
  </div>
);
export default Courses;