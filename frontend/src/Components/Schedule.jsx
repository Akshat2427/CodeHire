import React from "react";
import { useSelector } from "react-redux";
import { 
  LayoutDashboard, Brush, Code, BookOpen, Video, Edit, 
  FileText, Terminal, Mic, CalendarDays 
} from "lucide-react";

// Map string names to actual React components
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

export default function Schedule() {
  const schedule = useSelector((state) => state.schedule.schedule);

  return (
    <div className=" ml-60 flex flex-col lg:flex-row h-screen bg-gray-50 p-6">
      {/* Left Section - Schedule List */}
      <div className="mt-10 lg:w-1/3 w-full bg-white shadow-lg rounded-lg p-6 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Today's Schedule</h2>
        <div className="space-y-3">
          {schedule.map((event) => (
            <div key={event.id} className="flex items-center justify-between p-3 bg-gray-100 rounded-md">
              {/* Icon & Task Info */}
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-200 rounded-full">{ICON_MAP[event.icon]}</div>
                <div>
                  <p className="text-sm font-semibold">{event.task}</p>
                  <p className="text-xs text-gray-600">{event.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Section - Calendar Placeholder */}
      <div className="lg:w-2/3 w-full flex flex-col items-center justify-center bg-white shadow-lg rounded-lg p-6 ml-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <CalendarDays size={24} /> Calendar View
        </h2>
        <p className="text-gray-500">[Your Calendar Component Goes Here]</p>
      </div>
    </div>
  );
}
