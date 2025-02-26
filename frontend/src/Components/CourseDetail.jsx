import { useParams } from "react-router-dom";
const CourseDetail = () => {
  const { id } = useParams();
  return <div className="text-center text-2xl p-10">Course Details for ID: {id}</div>;
};
export default CourseDetail;