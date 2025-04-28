import { BookOpen, Clock, CheckCircle, XCircle } from "lucide-react"; // Import Lucide Icons
import Loading from "./Loading";

const cardData = [
  { key:"totalCourses", title: "All Courses", color: "text-red-500", icon: <BookOpen className="text-red-500" /> },
  { key:"hoursSpent", title: "Hours Spent", color: "text-blue-500", icon: <Clock className="text-blue-500" /> },
  { key: "completedCourses", title: "Completed", color: "text-purple-500", icon: <CheckCircle className="text-purple-500" /> },
  { key: "uncompletedCourses", title: "Uncompleted", color: "text-indigo-500", icon: <XCircle className="text-indigo-500" /> }
];

const CardsDashboard = ({ title, value, color, icon, data }) => (
  <div className="p-4 bg-white rounded-lg shadow-lg flex items-center gap-4 w-full">
    <div className="w-12 h-12 flex items-center justify-center bg-gray-200 rounded-full">
      {icon}    
    </div>
    <div>
      <h3 className={`text-lg font-semibold ${color}`}>{title}</h3>
      <p className="text-2xl font-bold text-gray-700">{value}</p>
    </div>
  </div>
);

export default function DashboardCard({ data }) {
  // if(!data){
  //   return <Loading/>
  // }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
      {cardData.map((card, index) => (
        <CardsDashboard 
          key={index}
          title={card.title}
          value={data?.[card.key] || 0} // dynamically pick value using key
          color={card.color}
          icon={card.icon}
        />
      ))}
    </div>
  );
}
