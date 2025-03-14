import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { 
  LayoutDashboard, Brush, Code, BookOpen, Video, Edit, 
  FileText, Terminal, Mic, CalendarDays 
} from "lucide-react";

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
  const localizer = momentLocalizer(moment);
  

  const [view, setView] = useState("month");

  const onView = useCallback((newView) => setView(newView), []);

  const [events, setEvents] = useState([]);

  useEffect(() => {
    
    const formattedEvents = schedule.map((event) => ({
      id: event.id,
      title: event.task,
      start: new Date(event.startTime), 
      end: new Date(event.endTime), 
    }));
    setEvents(formattedEvents);
  }, [schedule]);

  return (
    <div className="ml-60 flex flex-col lg:flex-row h-screen bg-gray-50 p-6">
      {/* Left Section - Schedule List */}
      <div className="mt-10 lg:w-1/3 w-full bg-white shadow-lg rounded-lg p-6 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Today's Schedule</h2>
        <div className="space-y-3">
          {schedule.map((event) => (
            <div key={event.id} className="flex items-center justify-between p-3 bg-gray-100 rounded-md">
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

      {/* Right Section - Calendar */}
      <div className="lg:w-2/3 w-full flex flex-col bg-white shadow-lg rounded-lg p-6 ml-6 mt-10">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <CalendarDays size={24} /> Calendar View
        </h2>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500, width: "100%" }}
          views={{ month: true, week: true, day: true, agenda: true }} 
          defaultView={view} 
          onView={onView}
        />
      </div>
    </div>
  );
}
