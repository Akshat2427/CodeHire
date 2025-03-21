import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  LayoutDashboard,
  Brush,
  Code,
  BookOpen,
  Video,
  Edit,
  FileText,
  Terminal,
  Mic,
  CalendarDays,
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

const Schedule = () => {
  const schedule = useSelector((state) => state.schedule.schedule);
  const openSidebar = useSelector((state) => state.ui_store.openSidebar);
  const isCollapsed = useSelector((state) => state.ui_store.isCollapsed || false); // Assuming this might be added
  const localizer = momentLocalizer(moment);

  // Restrict view to valid react-big-calendar views
  const [view, setView] = useState(Views.MONTH);
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);

  // Format and validate events
  useEffect(() => {
    const formattedEvents = schedule
      .map((event) => {
        const start = moment(event.startTime).toDate();
        const end = moment(event.endTime).toDate();

        if (!event.startTime || !event.endTime || isNaN(start.getTime()) || isNaN(end.getTime())) {
          console.warn(`Invalid event: ${event.task}`, event);
          return null;
        }

        return {
          id: event.id,
          title: event.task,
          start,
          end,
          allDay: false,
        };
      })
      .filter(Boolean); // Remove invalid events

    setEvents(formattedEvents);
  }, [schedule]);

  const handleViewChange = useCallback((newView) => {
    setView(newView);
  }, []);

  const handleNavigate = useCallback((newDate) => {
    setDate(newDate);
  }, []);

  // Custom event styling
  const eventPropGetter = useCallback((event) => ({
    style: {
      backgroundColor: "#3182ce",
      color: "white",
      borderRadius: "4px",
      border: "none",
    },
  }), []);

  return (
    <div
      className={`flex flex-col lg:flex-row min-h-screen bg-gray-50 p-6 transition-all duration-300 ${
        openSidebar && !isCollapsed
          ? "ml-60" // Expanded sidebar
          : openSidebar && isCollapsed
          ? "ml-16" // Collapsed sidebar
          : "ml-8" // No sidebar offset
      }`}
    >
      {/* Left Section - Schedule List */}
      <div className="lg:w-1/3 w-full bg-white shadow-lg rounded-lg p-6 mt-10 lg:mt-0 overflow-y-auto max-h-[80vh]">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Today's Schedule</h2>
        <div className="space-y-3">
          {schedule.length === 0 ? (
            <p className="text-gray-500 text-center">No events scheduled</p>
          ) : (
            schedule.map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between p-3 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors duration-200"
                role="listitem"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gray-200 rounded-full">
                    {ICON_MAP[event.icon] || <CalendarDays className="text-gray-500" />}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{event.task}</p>
                    <p className="text-xs text-gray-600">{event.time}</p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Right Section - Calendar */}
      <div className="lg:w-2/3 w-full bg-white shadow-lg rounded-lg p-6 mt-6 lg:mt-0 lg:ml-6">
        <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
          <CalendarDays size={24} /> Calendar View
        </h2>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          date={date}
          view={view}
          onNavigate={handleNavigate}
          onView={handleViewChange}
          views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
          style={{ height: 500, width: "100%" }}
          popup
          drilldownView={Views.DAY}
          eventPropGetter={eventPropGetter}
          className="rounded-md"
          aria-label="Schedule calendar"
        />
      </div>
    </div>
  );
};

export default Schedule;