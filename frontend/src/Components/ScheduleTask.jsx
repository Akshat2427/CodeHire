import { CheckCircle, Brush, LayoutDashboard, Code, BookOpen, Video, Edit, FileText, Terminal, Mic } from "lucide-react";

const ScheduleCard = () => {
    const schedule = [
        { id: 1, task: "UI Session", time: "9:08 PM", icon: <LayoutDashboard className="text-blue-500" /> },
        { id: 2, task: "Typography", time: "10:00 AM", icon: <Brush className="text-purple-500" /> },
        { id: 3, task: "React Workshop", time: "11:30 AM", icon: <Code className="text-green-500" /> },
        { id: 4, task: "Java Study", time: "12:45 PM", icon: <BookOpen className="text-orange-500" /> },
        { id: 5, task: "Video Editing", time: "2:00 PM", icon: <Video className="text-red-500" /> },
        { id: 6, task: "Essay Writing", time: "3:30 PM", icon: <Edit className="text-yellow-500" /> },
        { id: 7, task: "Interview Prep", time: "5:00 PM", icon: <FileText className="text-indigo-500" /> },
        { id: 8, task: "Linux Commands", time: "6:15 PM", icon: <Terminal className="text-gray-500" /> },
        { id: 9, task: "Podcast Recording", time: "8:00 PM", icon: <Mic className="text-pink-500" /> }
      ];

  return (
    <div className="p-4 bg-white rounded-lg shadow-md h-full overflow-y-scroll scroll-smooth">
      <h3 className="text-lg font-semibold mb-4">Today's Schedule</h3>

      <div className="space-y-3">
        {schedule.map((event) => (
            
          <div
            key={event.id}
            className="flex items-center justify-between p-3 bg-gray-100 rounded-md"
          >
            {/* Left Side: Icon & Task Info */}
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gray-200 rounded-full">{event.icon}</div>
              <div>
                <p className="text-sm font-semibold">{event.task}</p>
                <p className="text-xs text-gray-600">{event.time}</p>
              </div>
            </div>

            {/* Right Side: Tick Button */}
            <button className="text-green-500 hover:text-green-700 transition">
              <CheckCircle size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleCard;
