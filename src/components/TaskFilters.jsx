export default function TaskFilters({ activeFilter, setFilter }) {
  const filters = [
    { id: 'all', label: 'Todas' },
    { id: 'pending', label: 'Pendientes' },
    { id: 'completed', label: 'Completadas' },
    { id: 'priority', label: 'Prioritarias' }
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => setFilter(filter.id)}
          className={`px-3 py-1 rounded-full text-sm ${
            activeFilter === filter.id
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}