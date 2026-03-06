import React, { useState, useEffect, useMemo } from "react";
import { PlusCircle, Edit2, Trash2, X, Check } from "lucide-react";
import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";
import axios from "axios";
import { useTheme } from "../context/ThemeContext";

const API_URL = `${API_BASE_URL}/events`;

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: { "en-US": enUS },
});

const CalendarPage = () => {
  const { isDarkMode } = useTheme();
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [editEventId, setEditEventId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventDate, setNewEventDate] = useState(new Date());

  // Fetch events on mount
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data } = await axios.get(API_URL);
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  // Add a new event
  const handleAddEvent = async () => {
    if (newEventTitle.trim() && newEventDate) {
      const start = new Date(newEventDate);
      const end = new Date(start.getTime() + 60 * 60 * 1000); // 1 hour duration by default

      const newEvent = {
        id: `event-${Date.now()}`,
        title: newEventTitle.trim(),
        start,
        end,
      };

      // Optimistic UI update
      setEvents((prev) => [...prev, newEvent]);
      setShowAddModal(false);
      setNewEventTitle("");

      try {
        await axios.post(API_URL, newEvent);
      } catch (error) {
        console.error("Error adding event:", error);
        fetchEvents(); // Revert on failure
      }
    }
  };

  // Edit an event (title only for now to keep it simple)
  const handleEditEvent = async (eventId) => {
    if (editTitle.trim()) {
      const eventToUpdate = events.find(e => e.id === eventId);
      if (!eventToUpdate) return;

      const updatedEvent = { ...eventToUpdate, title: editTitle.trim() };

      // Optimistic upate
      setEvents((prev) => prev.map((e) => (e.id === eventId ? updatedEvent : e)));
      setEditEventId(null);

      try {
        await axios.put(`${API_URL}/${eventId}`, updatedEvent);
      } catch (error) {
        console.error("Error updating event:", error);
        fetchEvents(); // Revert
      }
    }
  };

  // Delete an event
  const handleDeleteEvent = async (eventId) => {
    setEvents((prev) => prev.filter((e) => e.id !== eventId)); // Optimistic UI

    try {
      await axios.delete(`${API_URL}/${eventId}`);
    } catch (error) {
      console.error("Error deleting event:", error);
      fetchEvents();
    }
  };

  // Map events to Big Calendar format (ensure dates are objects)
  const eventList = useMemo(() => {
    return events.map((event) => ({
      ...event,
      start: new Date(event.start),
      end: new Date(event.end),
    }));
  }, [events]);

  return (
    <div className="h-full bg-gray-50 dark:bg-gray-900 transition-colors duration-200 p-4">
      <style>{`
        .calendar-dark .rbc-month-view, .calendar-dark .rbc-time-view, .calendar-dark .rbc-header { border-color: #374151; }
        .calendar-dark .rbc-day-bg + .rbc-day-bg { border-color: #374151; }
        .calendar-dark .rbc-month-row + .rbc-month-row { border-color: #374151; }
        .calendar-dark .rbc-header + .rbc-header { border-color: #374151; }
        .calendar-dark .rbc-off-range-bg { background-color: #1f2937; }
        .calendar-dark .rbc-today { background-color: rgba(79, 70, 229, 0.1); }
        .calendar-dark .rbc-button-link { color: #d1d5db; }
        .calendar-dark .rbc-toolbar button { color: #d1d5db; }
        .calendar-dark .rbc-toolbar button:active, .calendar-dark .rbc-toolbar button.rbc-active { background-color: #374151; border-color: #4b5563; }
        .calendar-dark .rbc-toolbar button:hover { background-color: #374151; color: #fff; border-color: #4b5563; }
        .calendar-dark .rbc-event { background-color: #4f46e5; border: 1px solid #4338ca; }
        .calendar-dark .rbc-event:hover { background-color: #6366f1; }
        .calendar-dark .rbc-day-slot .rbc-time-slot { border-color: #374151; }
        .calendar-dark .rbc-agenda-view table { border-color: #374151; color: #d1d5db; }
        .calendar-dark .rbc-agenda-view table tbody > tr > td + td { border-color: #374151; }
        .calendar-dark .rbc-agenda-view table thead > tr > th { border-color: #374151; }
        .calendar-dark .rbc-agenda-view table tbody > tr:hover { background-color: #374151; }
        .calendar-dark .rbc-day-bg:hover { background-color: #374151; cursor: pointer; }
      `}</style>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-8 text-center">
          Calendar & Events
        </h1>

        <div className="flex flex-col lg:flex-row gap-8 min-h-[600px] h-[75vh]">
          {/* Calendar Section (Left) */}
          <div className={`flex-1 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 min-w-0 flex flex-col ${isDarkMode ? 'calendar-dark text-gray-200' : ''}`}>
            <div className="flex-1 w-full min-h-[500px]">
              <BigCalendar
                localizer={localizer}
                events={eventList}
                startAccessor="start"
                endAccessor="end"
                onSelectEvent={(event) => {
                  setEditEventId(event.id);
                  setEditTitle(event.title);
                }}
                onSelectSlot={({ start }) => {
                  setDate(start);
                  setNewEventDate(start);
                  setShowAddModal(true);
                }}
                selectable
                style={{ height: '100%' }}
              />
            </div>
          </div>

          {/* Events Section (Right) */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col lg:w-1/3 shrink-0 overflow-hidden">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                {date.toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </h2>
              <button
                onClick={() => {
                  setNewEventDate(date);
                  setShowAddModal(true);
                }}
                className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
              >
                <PlusCircle size={18} />
                <span>Add Event</span>
              </button>
            </div>

            <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
              {events
                .filter((event) => format(new Date(event.start), "yyyy-MM-dd") === format(date, "yyyy-MM-dd"))
                .map((event) => (
                  <div key={event.id} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                    {editEventId === event.id ? (
                      <div className="space-y-3">
                          <textarea
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="w-full p-2 border border-blue-300 dark:border-indigo-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
                          rows="2"
                        />
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => setEditEventId(null)}
                            className="flex items-center gap-1 px-3 py-1.5 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors duration-200"
                          >
                            <X size={16} />
                            Cancel
                          </button>
                          <button
                            onClick={() => handleEditEvent(event.id)}
                            className="flex items-center gap-1 px-3 py-1.5 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors duration-200"
                          >
                            <Check size={16} />
                            Save
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p className="text-gray-800 dark:text-gray-200 font-medium break-words leading-tight">{event.title}</p>
                          <span className="text-xs text-gray-500">
                            {format(new Date(event.start), "h:mm a")} - {format(new Date(event.end), "h:mm a")}
                          </span>
                        </div>
                        <div className="flex gap-2 ml-4 shrink-0">
                          <button
                            onClick={() => {
                              setEditEventId(event.id);
                              setEditTitle(event.title);
                            }}
                            className="text-gray-400 hover:text-indigo-600 p-1.5 rounded transition-colors duration-200"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteEvent(event.id)}
                            className="text-gray-400 hover:text-red-500 p-1.5 rounded transition-colors duration-200"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
            </div>
            {events.filter((event) => format(new Date(event.start), "yyyy-MM-dd") === format(date, "yyyy-MM-dd")).length === 0 && (
              <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-gray-100 dark:border-gray-700 rounded-xl mt-4 min-h-[200px]">
                <p className="text-gray-400 dark:text-gray-500 text-center italic">No events scheduled for this day.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Event Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 w-full max-w-sm animate-in zoom-in-95">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-1">Add New Event</h3>
            <p className="text-sm text-gray-500 mb-5">
              Scheduling for {format(newEventDate, "MMM do, yyyy")}
            </p>
            
            <textarea
              autoFocus
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
              placeholder="Event title or description..."
              className="w-full p-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 mb-6 resize-none outline-none placeholder-gray-400 dark:placeholder-gray-500"
              rows="3"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleAddEvent();
                }
              }}
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setNewEventTitle("");
                }}
                className="px-4 py-2 font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleAddEvent}
                className="px-5 py-2 font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Add Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPage;
