import { CheckCircle, Brush, LayoutDashboard, Code, BookOpen, Video, Edit, FileText, Terminal, Mic } from "lucide-react";
import  { useSelector } from "react-redux";

const ScheduleCard = () => {
  const schedule = useSelector(state => state.schedule.schedule)
  const ICON_MAP = {
    LayoutDashboard: <LayoutDashboard className="text-blue-500" />,
    Brush: <Brush className="text-purple-500" />,
    Code: <Code className="text-green-500" />,
    BookOpen: <BookOpen className="text-orange-500" />,
    Video: <Video className="text-red-500" />,
    Edit: <Edit className="text-yellow-500" />,
    FileText: <FileText className="text-indigo-500" />,
    Terminal: <Terminal className="text-gray-500" />,
    Mic: <Mic className="text-pink-500" />,
  };

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
            <div className="p-2 bg-gray-200 rounded-full">{ICON_MAP[event.icon]}</div>

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
