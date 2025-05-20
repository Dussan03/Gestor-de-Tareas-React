export default function CompletedTasks({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0) {
    return <p className="text-center text-gray-500">No hay tareas realizadas.</p>;
  }

  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="flex items-center justify-between bg-green-100 px-4 py-2 rounded-xl"
        >
          <span className="line-through text-green-700">{task.text}</span>
          <div className="flex gap-2">
            <button
              onClick={() => onToggle(task.id)}
              className="text-blue-600 hover:underline"
            >
              Mover a pendientes
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="text-red-600 hover:underline"
            >
              Eliminar
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}