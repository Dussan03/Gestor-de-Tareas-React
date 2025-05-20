export default function TaskList({ tasks, onToggle }) {
  if (tasks.length === 0) {
    return <p className="text-center text-gray-500">No hay tareas pendientes.</p>;
  }

  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded-xl"
        >
          <span>{task.text}</span>
          <button
            onClick={() => onToggle(task.id)}
            className="text-green-600 hover:underline"
          >
            Marcar como realizada
          </button>
        </li>
      ))}
    </ul>
  );
}
