import { motion } from 'framer-motion';

export default function CompletedTasks({ tasks, onToggle, onDelete }) {
  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'border-red-500';
      case 'medium': return 'border-yellow-500';
      case 'low': return 'border-green-500';
      default: return 'border-gray-300';
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Tareas Completadas</h2>
      {tasks.length === 0 ? (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-500 py-4 text-center"
        >
          No hay tareas completadas
        </motion.p>
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.2 }}
              className={`flex items-center justify-between bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow border-l-4 ${getPriorityColor(task.priority)}`}
            >
              <div className="flex items-center gap-3 flex-1">
                {/* Área de checkbox ampliada */}
                <div 
                  onClick={() => onToggle(task.id)}
                  className="flex items-center cursor-pointer"
                >
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    task.completed
                      ? 'bg-green-500 border-green-500'
                      : 'border-gray-300 hover:border-blue-500'
                  }`}>
                    {task.completed && (
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="ml-3 line-through text-gray-400">
                    {task.text}
                  </span>
                </div>
                
                <span className={`text-xs px-2 py-1 rounded-full ${
                  task.priority === 'high' ? 'bg-red-100 text-red-800' :
                  task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {task.priority === 'high' ? 'Alta' : 
                   task.priority === 'medium' ? 'Media' : 'Baja'}
                </span>
              </div>
              <button
                onClick={() => onDelete(task.id)}
                className="text-gray-400 hover:text-red-500 transition-colors ml-2"
                title="Eliminar tarea"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}