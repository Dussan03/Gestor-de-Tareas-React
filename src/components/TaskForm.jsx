import { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [taskText, setTaskText] = useState('');
  const [priority, setPriority] = useState('medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskText.trim() !== "") {
      onAdd({
        id: Date.now(),
        text: taskText,
        priority,
        completed: false
      });
      setTaskText('');
      setPriority('medium');
    }
  };

  const priorityOptions = [
    { 
      level: 'low', 
      label: 'Baja', 
      color: 'bg-green-500',
      activeColor: 'bg-green-600'
    },
    { 
      level: 'medium', 
      label: 'Media', 
      color: 'bg-yellow-500',
      activeColor: 'bg-yellow-600'
    },
    { 
      level: 'high', 
      label: 'Alta', 
      color: 'bg-red-500',
      activeColor: 'bg-red-600'
    }
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="task-input" className="block text-sm font-medium text-gray-700 mb-1">
          Nueva tarea
        </label>
        <input
          id="task-input"
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Escribe la descripción de la tarea..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          autoFocus
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Prioridad
        </label>
        <div className="flex gap-2">
          {priorityOptions.map((option) => (
            <button
              key={option.level}
              type="button"
              onClick={() => setPriority(option.level)}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium text-white transition-all ${
                priority === option.level 
                  ? `${option.activeColor} shadow-md` 
                  : `${option.color} opacity-70 hover:opacity-90`
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={!taskText.trim()}
        className={`w-full py-3 px-4 rounded-lg text-white font-medium transition ${
          taskText.trim() 
            ? 'bg-blue-500 hover:bg-blue-600' 
            : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        Añadir Tarea
      </button>
    </form>
  );
}