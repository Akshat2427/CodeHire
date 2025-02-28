import Progress from "./ProgressBar";
import PieChartComponent from "./PieChartComponent";
import StatsCard from "./StatsCard";
import ScheduleItem from "./ScheduleItem";
import Card from "./Card";
import CardContent from "./CardContent";

const Dashboard = () => {
  const userName = "Anshul";
  const totalCourses = 20;
  const completedCourses = 10;
  const uncompletedCourses = totalCourses - completedCourses;
  const hoursSpent = 40;
  const completionPercentage = (completedCourses / totalCourses) * 100;

  const pieData = [
    { name: "Skills", value: 50 },
    { name: "English", value: 30 },
    { name: "UI/UX", value: 20 },
  ];

  const userCourses = ["UI/UX Design", "English Conversation", "Web Development"];

  const schedule = [
    { name: "UI Session", time: "9:08 PM", bgColor: "bg-red-300" },
    { name: "Typography", time: "10:00 AM", bgColor: "bg-purple-300" },
  ];

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="col-span-3 text-2xl font-bold">Welcome Back, {userName}!</div>

      {/* Stats Section */}
      <div className="grid grid-cols-4 gap-2 col-span-3">
        <StatsCard title="All Courses" value={totalCourses} bgColor="bg-red-400" className="h-24" />
        <StatsCard title="Hours Spent" value={hoursSpent} bgColor="bg-blue-400" className="h-24" />
        <StatsCard title="Completed" value={completedCourses} bgColor="bg-purple-400" className="h-24" />
        <StatsCard title="Uncompleted" value={uncompletedCourses} bgColor="bg-purple-600" className="h-24" />
      </div>

      {/* Learning Progress */}
      <Card className="col-span-2 h-32">
        <CardContent>
          <p className="font-bold">Hours Spent Learning</p>
          <div className="h-20 bg-gray-200 rounded-lg mt-2"></div>
        </CardContent>
      </Card>

      {/* Top Learning Topics (Pie Chart) */}
      <Card className="h-32">
        <CardContent>
          <p className="font-bold">Top Learning</p>
          <PieChartComponent data={pieData} />
        </CardContent>
      </Card>

      {/* Schedule Section */}
      <Card className="col-span-2 h-32">
        <CardContent>
          <p className="font-bold">Today's Schedule</p>
          <div className="mt-2">
            {schedule.map((item, index) => (
              <ScheduleItem key={index} name={item.name} time={item.time} bgColor={item.bgColor} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Course Progress Bar */}
      <Card className="h-24">
        <CardContent>
          <p className="font-bold">Total</p>
          <p>{completedCourses}/{totalCourses} from Courses you have done!</p>
          <Progress value={completionPercentage} className="mt-2" />
        </CardContent>
      </Card>

      {/* Your Courses Section */}
      <Card className="col-span-3 h-32">
        <CardContent>
          <p className="font-bold">Your Courses</p>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {userCourses.map((course, index) => (
              <div key={index} className="p-2 bg-gray-200 rounded-lg text-sm">{course}</div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
