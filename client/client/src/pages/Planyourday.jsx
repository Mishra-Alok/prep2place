import React, { useState } from 'react';
import { 
  Calendar, CheckCircle, Circle, Clock, Plus, Trash2, ChevronLeft, ChevronRight 
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const INITIAL_TASKS = [
  { id: '1', title: 'Complete Frontend Module', status: 'In Progress', priority: 'High', time: '10:00 AM' },
  { id: '2', title: 'Review Database Schema', status: 'To Do', priority: 'Medium', time: '02:00 PM' },
  { id: '3', title: 'Write API Documentation', status: 'Done', priority: 'Low', time: '11:00 AM' },
  { id: '4', title: 'Team Sync Meeting', status: 'To Do', priority: 'High', time: '04:00 PM' }
];

export default function Planyourday() {
  const { isDarkMode } = useTheme();
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('planYourDay_tasks');
    if (savedTasks) {
      try {
        return JSON.parse(savedTasks);
      } catch (e) {
        return INITIAL_TASKS;
      }
    }
    return INITIAL_TASKS;
  });
  const [currentDate, setCurrentDate] = useState(new Date());
  const [newTaskTitle, setNewTaskTitle] = useState('');

  React.useEffect(() => {
    localStorage.setItem('planYourDay_tasks', JSON.stringify(tasks));
  }, [tasks]);

  const renderCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const todayStr = new Date().toDateString();

    const days = [];
    for (let i = 0; i < firstDay; i++) {
        days.push(<div key={`empty-${i}`} className="h-12 w-full md:h-14 lg:h-16 border border-transparent"></div>);
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const isToday = date.toDateString() === todayStr;
      const hasTasks = i % 4 === 0; // Mock indicator

      days.push(
        <div 
          key={i} 
          className={`flex flex-col items-center justify-center p-2 rounded-xl cursor-pointer transition-all border ${
            isToday 
              ? 'border-indigo-500 bg-indigo-500 text-white font-bold shadow-md shadow-indigo-500/20' 
              : 'border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-black/20 text-slate-700 dark:text-gray-300 hover:border-indigo-200 dark:hover:border-indigo-500/30 hover:bg-white dark:hover:bg-white/5 font-medium'
          }`}
        >
          <span className="text-sm md:text-base">{i}</span>
          <div className="flex gap-1 mt-1 h-1">
             {hasTasks && !isToday && <div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div>}
             {isToday && <div className="w-1.5 h-1.5 rounded-full bg-white opacity-80"></div>}
          </div>
        </div>
      );
    }
    return days;
  };

  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));

  const addTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    setTasks([{ id: Date.now().toString(), title: newTaskTitle, status: 'To Do', priority: 'Medium', time: '12:00 PM' }, ...tasks]);
    setNewTaskTitle('');
  };

  const toggleTaskStatus = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: t.status === 'Done' ? 'To Do' : 'Done' } : t));
  };
  
  const removeTask = (id) => setTasks(tasks.filter(t => t.id !== id));

  return (
    <div className="min-h-screen pt-12 pb-12 px-4 md:px-8 w-full bg-[#f8fafc] dark:bg-[#0A0A0A] text-slate-900 dark:text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Simple Clean Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 border-b border-slate-200 dark:border-white/10 pb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-2">
              Plan Your Day
            </h1>
            <p className="text-slate-500 dark:text-gray-400 font-medium">
              Organize your schedule and tasks efficiently.
            </p>
          </div>
          <div className="mt-4 md:mt-0 bg-white dark:bg-[#111116] px-5 py-3 rounded-xl border border-slate-200 dark:border-white/10 shadow-sm flex items-center gap-4">
             <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-indigo-500" />
                <span className="font-bold text-slate-700 dark:text-gray-200">
                   {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                </span>
             </div>
             <div className="w-px h-6 bg-slate-200 dark:bg-white/10"></div>
             <div>
                <span className="font-bold text-slate-900 dark:text-white">{tasks.filter(t => t.status === 'Done').length}</span>
                <span className="text-slate-500 dark:text-gray-400 text-sm ml-1">/ {tasks.length} done</span>
             </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="flex flex-col xl:flex-row gap-8">
          
          {/* Calendar Side */}
          <div className="w-full xl:w-[45%] flex flex-col gap-6">
            <div className="bg-white dark:bg-[#111116] rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-white/10 shadow-sm">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                   {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h2>
                <div className="flex gap-1 bg-slate-50 dark:bg-black/20 rounded-lg p-1 border border-slate-100 dark:border-white/5">
                  <button onClick={prevMonth} className="p-2 rounded-md hover:bg-white dark:hover:bg-white/10 text-slate-600 dark:text-gray-400 transition-colors shadow-sm">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button onClick={nextMonth} className="p-2 rounded-md hover:bg-white dark:hover:bg-white/10 text-slate-600 dark:text-gray-400 transition-colors shadow-sm">
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-7 gap-2 text-center mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-xs font-bold text-slate-500 dark:text-gray-500 uppercase">{day}</div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-2">
                {renderCalendarDays()}
              </div>
            </div>
          </div>

          {/* Task List Side */}
          <div className="w-full xl:w-[55%] flex flex-col h-full min-h-[500px] bg-white dark:bg-[#111116] rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm overflow-hidden">
            
            <div className="p-6 md:p-8 border-b border-slate-100 dark:border-white/10 bg-slate-50/50 dark:bg-transparent">
               <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Today's Tasks</h2>
               <form onSubmit={addTask} className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                     <Plus className="w-5 h-5" />
                  </div>
                  <input 
                    type="text" 
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="Add a new task..." 
                    className="w-full bg-slate-50 dark:bg-black/30 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white rounded-xl pl-12 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all font-medium placeholder:text-slate-400"
                  />
               </form>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-3">
               {tasks.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-40 text-slate-400 dark:text-gray-500">
                     <p className="font-medium">You're all caught up for today!</p>
                  </div>
               ) : (
                  tasks.map(task => (
                     <div 
                        key={task.id} 
                        className={`group flex items-center justify-between p-4 rounded-xl border transition-all ${
                           task.status === 'Done'
                             ? 'bg-slate-50/50 dark:bg-white/[0.02] border-slate-100 dark:border-white/5 opacity-70'
                             : 'bg-white dark:bg-[#1A1A24] border-slate-200 dark:border-white/10 hover:border-indigo-300 dark:hover:border-indigo-500/40'
                        }`}
                     >
                        <div className="flex items-start gap-4 flex-1 overflow-hidden">
                           <button 
                              onClick={() => toggleTaskStatus(task.id)}
                              className="mt-0.5 text-slate-400 hover:text-indigo-500 dark:text-gray-500 dark:hover:text-indigo-400 transition-colors focus:outline-none"
                           >
                              {task.status === 'Done' 
                                 ? <CheckCircle className="w-5 h-5 text-emerald-500" fill="currentColor" stroke="white" strokeWidth={1} /> 
                                 : <Circle className="w-5 h-5" />
                              }
                           </button>
                           
                           <div className="flex flex-col min-w-0 pr-4">
                              <span className={`font-semibold text-[15px] truncate transition-all duration-300 ${
                                 task.status === 'Done' 
                                   ? 'text-slate-500 dark:text-gray-500 line-through' 
                                   : 'text-slate-800 dark:text-gray-200'
                              }`}>
                                 {task.title}
                              </span>
                              
                              <div className="flex items-center gap-3 mt-1.5 text-[11px] font-bold uppercase tracking-wider">
                                 <span className="flex items-center gap-1 text-slate-500 dark:text-gray-400">
                                    <Clock className="w-3 h-3" /> {task.time}
                                 </span>
                              </div>
                           </div>
                        </div>

                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                           <button onClick={() => removeTask(task.id)} className="p-2 text-slate-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors">
                              <Trash2 className="w-4 h-4" />
                           </button>
                        </div>
                     </div>
                  ))
               )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
