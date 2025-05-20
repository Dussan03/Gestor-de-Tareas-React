import { useState, useEffect } from "react";
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

  const addTask = (text) => {
    if (text.trim() !== "") {
      const newTask = { id: Date.now(), text, completed: false };
      setTasks([...tasks, newTask]);
      setView("pending");
    }
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Nueva función para eliminar tareas
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Filtrar tareas según la vista activa
  const filteredTasks = tasks.filter(
    (task) => (view === "pending" && !task.completed) || (view === "completed" && task.completed)
  );

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold mb-4 text-center">Gestor de Tareas</h1>

        {/* Navegación de vistas */}
        <div className="flex justify-center gap-4 mb-6">
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
        </div>

        {/* Vista dinámica */}
        {view === "add" && <TaskForm onAdd={addTask} />}
        {view === "pending" && (
          <TaskList 
            tasks={filteredTasks} 
            onToggle={toggleTask} 
            onDelete={deleteTask} 
          />
        )}
        {view === "completed" && (
          <CompletedTasks 
            tasks={filteredTasks} 
            onToggle={toggleTask} 
            onDelete={deleteTask} 
          />
        )}
      </div>
    </div>
  );
}