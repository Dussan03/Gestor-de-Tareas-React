import { useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import CompletedTasks from "./components/CompletedTasks";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [view, setView] = useState("pending");

  const addTask = (text) => {
    const newTask = { id: Date.now(), text, completed: false };
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

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
            Ver Tareas
          </button>
          <button
            className={`px-4 py-2 rounded-xl transition ${
              view === "completed" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => setView("completed")}
          >
            Tareas Realizadas
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
          <TaskList tasks={filteredTasks} onToggle={toggleTask} />
        )}
        {view === "completed" && (
          <CompletedTasks tasks={filteredTasks} onToggle={toggleTask} />
        )}
      </div>
    </div>
  );
}
