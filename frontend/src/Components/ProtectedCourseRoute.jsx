import { useParams, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedCourseRoute = ({ children }) => {
  const { id } = useParams();
  const purchasedCourses = useSelector((state) => state.purchasedCourses.purchasedCourses);
  const isPurchased = purchasedCourses.some(course => course === id);
  console.log("At the protected route");
  if (!isPurchased) {
    return <Navigate to={`/course/description/${id}`} replace />;
  }
  return children;
};


export default ProtectedCourseRoute;
