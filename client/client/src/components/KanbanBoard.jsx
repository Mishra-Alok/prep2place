import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Plus, Trash2, GripHorizontal, Check, X } from "lucide-react";
import axios from "axios";
import API_BASE_URL from "../utils/apiConfig";

const API_URL = `${API_BASE_URL}/tasks`;

const KanbanBoard = () => {
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    completed: []
  });
  
  // State for the inline "Add Task" input
  const [addingToColumn, setAddingToColumn] = useState(null);
  const [newTaskContent, setNewTaskContent] = useState("");

  // Fetch tasks from backend on mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const { data } = await axios.get(API_URL);
      const organizedTasks = {
        todo: [],
        inProgress: [],
        completed: []
      };
      
      data.forEach(task => {
        if (organizedTasks[task.column]) {
          organizedTasks[task.column].push(task);
        }
      });
      
      setTasks(organizedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleDragEnd = async (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const newTasks = { ...tasks };
    const [movedTask] = newTasks[source.droppableId].splice(source.index, 1);
    
    // Update the task's column
    movedTask.column = destination.droppableId;
    newTasks[destination.droppableId].splice(destination.index, 0, movedTask);
    
    setTasks(newTasks); // Optimistic UI update

    // Save to backend
    try {
      await axios.put(`${API_URL}/${movedTask.id}`, {
        content: movedTask.content,
        column: movedTask.column
      });
    } catch (error) {
      console.error("Error updating task:", error);
      // Revert on failure
      fetchTasks();
    }
  };

  const handleAddTaskSubmit = async (column) => {
    if (!newTaskContent.trim()) {
      setAddingToColumn(null);
      return;
    }

    const newTaskObj = { 
      id: `task-${Date.now()}`, 
      content: newTaskContent.trim(),
      column: column
    };

    // Optimistic UI update
    setTasks(prev => ({
      ...prev,
      [column]: [...prev[column], newTaskObj]
    }));
    
    setAddingToColumn(null);
    setNewTaskContent("");

    // Save to backend
    try {
      await axios.post(API_URL, newTaskObj);
    } catch (error) {
      console.error("Error adding task:", error);
      fetchTasks(); // Revert on failure
    }
  };

  const removeTask = async (taskId, column) => {
    // Optimistic UI update
    setTasks(prev => ({
      ...prev,
      [column]: prev[column].filter(task => task.id !== taskId)
    }));

    // Delete from backend
    try {
      await axios.delete(`${API_URL}/${taskId}`);
    } catch (error) {
      console.error("Error deleting task:", error);
      fetchTasks(); // Revert on failure
    }
  };

  const columnConfig = {
    todo: { 
      title: "To Do", 
      headerColor: "bg-indigo-600 dark:bg-indigo-700",
      bgColor: "bg-indigo-50 dark:bg-gray-900/50",
      borderColor: "border-indigo-200 dark:border-indigo-800/50",
      taskBorder: "border-gray-200 dark:border-gray-700"
    },
    inProgress: { 
      title: "In Progress", 
      headerColor: "bg-amber-600 dark:bg-amber-700",
      bgColor: "bg-amber-50 dark:bg-gray-900/50",
      borderColor: "border-amber-200 dark:border-amber-800/50",
      taskBorder: "border-gray-200 dark:border-gray-700"
    },
    completed: { 
      title: "Completed", 
      headerColor: "bg-emerald-600 dark:bg-emerald-700",
      bgColor: "bg-emerald-50 dark:bg-gray-900/50",
      borderColor: "border-emerald-200 dark:border-emerald-800/50",
      taskBorder: "border-gray-200 dark:border-gray-700"
    }
  };

  return (
    <div className="container mx-auto p-4 lg:p-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-8 text-center">Project Tasks</h1>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(columnConfig).map(([columnKey, config]) => (
            <div 
              key={columnKey} 
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 flex flex-col"
            >
              <div className={`${config.headerColor} px-6 py-4`}>
                <h2 className="text-white font-bold text-lg flex items-center">
                  {config.title}
                  <span className="ml-2 text-sm font-normal bg-black/20 px-2 py-0.5 rounded-full">
                    {tasks[columnKey].length}
                  </span>
                </h2>
              </div>
              
              <div className="flex-1 p-4 flex flex-col">
                <Droppable droppableId={columnKey}>
                  {(provided) => (
                    <div 
                      ref={provided.innerRef} 
                      {...provided.droppableProps}
                      className={`flex-1 min-h-[300px] ${config.bgColor} rounded-lg p-3 space-y-3`}
                    >
                      {tasks[columnKey].map((task, index) => (
                        <Draggable 
                          key={task.id} 
                          draggableId={task.id} 
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border ${config.taskBorder} 
                                p-4 transition-all duration-200 hover:shadow-md
                                ${snapshot.isDragging ? 'shadow-lg ring-2 ring-indigo-400 rotate-1 relative z-50' : ''}`}
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex items-start space-x-3 pr-2">
                                  <div 
                                    {...provided.dragHandleProps}
                                    className="text-gray-400 hover:text-indigo-500 cursor-grab active:cursor-grabbing mt-0.5"
                                  >
                                    <GripHorizontal size={18} />
                                  </div>
                                  <span className="text-gray-700 dark:text-gray-200 leading-snug break-words">{task.content}</span>
                                </div>
                                <button 
                                  onClick={() => removeTask(task.id, columnKey)}
                                  className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded-md transition-colors duration-200 shrink-0"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}

                      {/* Inline Add Task Input */}
                      {addingToColumn === columnKey && (
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-indigo-300 p-3 mt-3 animate-in fade-in slide-in-from-top-2">
                          <textarea
                            autoFocus
                            placeholder="What needs to be done?"
                            className="w-full text-sm resize-none outline-none text-gray-700 dark:text-gray-200 bg-transparent placeholder-gray-400 dark:placeholder-gray-500"
                            rows={3}
                            value={newTaskContent}
                            onChange={(e) => setNewTaskContent(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleAddTaskSubmit(columnKey);
                              }
                            }}
                          />
                            <div className="flex justify-end gap-2 mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
                            <button
                              onClick={() => setAddingToColumn(null)}
                              className="p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 rounded-md transition"
                            >
                              <X size={16} />
                            </button>
                            <button
                              onClick={() => handleAddTaskSubmit(columnKey)}
                              className="flex items-center gap-1 bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1.5 rounded-md text-sm font-medium transition"
                            >
                              <Check size={16} /> Add
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </Droppable>
                
                {addingToColumn !== columnKey && (
                  <button
                    onClick={() => {
                      setAddingToColumn(columnKey);
                      setNewTaskContent("");
                    }}
                    className={`w-full mt-4 p-3 ${config.bgColor} ${config.borderColor} 
                      border border-dashed rounded-lg flex items-center justify-center
                      text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-indigo-50/50 dark:hover:bg-gray-800 
                      transition-all duration-200 focus:outline-none`}
                  >
                    <Plus className="mr-2" size={18} />
                    <span className="font-medium">Add New Task</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;
