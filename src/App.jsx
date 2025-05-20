import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from 'react-hot-toast';
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import CompletedTasks from "./components/CompletedTasks";

export default function App() {
  // Cargar tareas desde localStorage al inicio
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });

  const [view, setView] = useState("pending");

  // Guardar en localStorage cada vez que cambien las tareas
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Animaciones
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: { x: -100, opacity: 0 }
  };

  const viewVariants = {
    enter: { opacity: 0, x: 50 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  };

  const addTask = (newTask) => {
    if (newTask.text.trim() !== "") {
      setTasks([...tasks, newTask]);
      setView("pending");
      toast.success('Tarea añadida correctamente');
    } else {
      toast.error('El texto de la tarea no puede estar vacío');
    }
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) => {
        const newState = !task.completed;
        if (task.id === id) {
          // Mostrar notificación solo cuando se marca como completada
          if (newState) {
            toast.success('Tarea completada!', {
              icon: '✅',
              style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
              },
            });
          }
          return { ...task, completed: newState };
        }
        return task;
      })
    );
  };

  const deleteTask = (id) => {
    const taskToDelete = tasks.find(task => task.id === id);
    setTasks(tasks.filter((task) => task.id !== id));
    
    toast('Tarea eliminada', {
      icon: '🗑️',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  };

  // Filtrar tareas según la vista activa
  const filteredTasks = tasks.filter(
    (task) => (view === "pending" && !task.completed) || (view === "completed" && task.completed)
  );

  // Ordenar tareas por prioridad (alta -> media -> baja)
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-6">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            fontSize: '14px',
          },
        }}
      />
      
      <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-xl">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold mb-4 text-center"
        >
          Gestor de Tareas
        </motion.h1>

        {/* Navegación de vistas */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center gap-4 mb-6"
        >
          <button
            className={`px-4 py-2 rounded-xl transition ${
              view === "pending" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setView("pending")}
          >
            Tareas Pendientes
          </button>
          <button
            className={`px-4 py-2 rounded-xl transition ${
              view === "completed" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setView("completed")}
          >
            Tareas Completadas
          </button>
          <button
            className={`px-4 py-2 rounded-xl transition ${
              view === "add" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setView("add")}
          >
            Añadir Tarea
          </button>
        </motion.div>

        {/* Vista dinámica con animaciones */}
        <AnimatePresence mode="wait">
          <motion.div
            key={view}
            initial="enter"
            animate="center"
            exit="exit"
            variants={viewVariants}
            transition={{ duration: 0.3 }}
          >
            {view === "add" && <TaskForm onAdd={addTask} />}
            
            {view === "pending" && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <TaskList 
                  tasks={sortedTasks} 
                  onToggle={toggleTask} 
                  onDelete={deleteTask} 
                />
              </motion.div>
            )}
            
            {view === "completed" && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <CompletedTasks 
                  tasks={sortedTasks} 
                  onToggle={toggleTask} 
                  onDelete={deleteTask} 
                />
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}