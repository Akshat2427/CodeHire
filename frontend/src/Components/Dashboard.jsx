import React, { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pageNameUpdated } from "../store/metaInfo";
import PieChartComponent from "./PieChartComponent";
import BarChartComponent from "./BarChartComponent";
import ScheduleCard from "./ScheduleTask";
import DashboardCard from "./DashboardCard";
import PieChartComponentSmallScreen from "./SmallScreenPieChartComponent";
import axios from "axios";
import Loading from "./Loading";

const CardsDashboard = ({ title, value, color }) => {
  return (
    <div
      className={`p-4 text-white ${color} rounded-lg shadow-md flex flex-col justify-between`}
      role="region"
      aria-label={`${title} card`}
    >
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-2xl">{value}</p>
    </div>
  );
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user.username);
  const openSidebar = useSelector((state) => state.ui_store.openSidebar);
  const isCollapsed = useSelector((state) => state.ui_store.isCollapsed || false); // Assuming this might be added
  const fullscreenSidebar = useSelector((state) => state.ui_store.fullscreenSidebar);
  const [data,setData] = useState(null);
  useEffect(()=>{
    async function fetchData(){
      const response = await axios.get("http://localhost:8080/user/dashboard-details",{
        headers: {
          //"Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token_codehire")}`,
        },
      });
      const json = response.data;
      console.log(json);
      setData(json);
    }
    fetchData();
  },[])
  // console.log("fullscreenSidebar" , fullscreenSidebar);
  // Update page name only when user changes
  useEffect(() => {
    dispatch(pageNameUpdated(`Hello 👋 , ${user || "User"}`));
  }, [dispatch, user]);
  if(!data){
    return <Loading/>
  }

  return (
    <main
    className={`p-8 min-h-screen grid gap-6 bg-gray-100 transition-all duration-300 ${
      window.innerWidth <= 768 
        ? (fullscreenSidebar ? "hidden" : "ml-0")
        : (openSidebar ? "ml-60" : "ml-16")
    }`}
    >
      <div className="p-6 rounded-lg">
        <DashboardCard data={data} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="p-4 bg-white rounded-lg shadow-md h-96 overflow-auto">
            <ScheduleCard />
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md h-96">
            <PieChartComponent />
          </div>
        </div>

        <div className="w-full bg-white rounded-lg shadow-md p-4">
      { window.innerWidth <=768 ? <PieChartComponentSmallScreen></PieChartComponentSmallScreen> :   <BarChartComponent />}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;