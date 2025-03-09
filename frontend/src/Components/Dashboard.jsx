import PieChartComponent from "./PieChartComponent";
import BarChartComponent from "./BarChartComponent";
import ScheduleCard from "./ScheduleTask";
import DashboardCard from "./DashboardCard";
import { useDispatch } from "react-redux";
import { pageNameUpdated } from "../store/metaInfo";
import { useSelector } from "react-redux";
const CardsDashboard = ({ title, value, color }) => {
  
  return (
    <div className={`p-4 text-white ${color} rounded-lg shadow-md`}>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-2xl">{value}</p>
    </div>
  );
};

export default function Dashboard() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user.username);
  dispatch(pageNameUpdated(`Hello 👋 , ${user}`));
  return (
    <main className="w-[85vw] ml-[13vw] p-8 h-screen grid gap-6">
      <div className="p-6 bg-gray-100 min-h-screen mt-6">
      <DashboardCard/>

        {/* Schedule & Radar Chart */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Today's Schedule - Left */}
       
          <div className="p-4 bg-white rounded-lg shadow-md h-96">
          <ScheduleCard />
          </div>

          {/* Radar Chart - Right */}
          <PieChartComponent />
        </div>

        {/* Pie Chart */}
      

        {/* Bar Chart - Full Width at Bottom */}
        <div className="w-full">
          <BarChartComponent />
        </div>
      </div>
    </main>
  );
}
