import { useState } from "react";

export default function TaskForm({ onAdd }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text);
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="border rounded-xl px-4 py-2"
        placeholder="Escribe una nueva tarea..."
      />
      <button className="bg-green-500 text-white py-2 rounded-xl hover:bg-green-600 transition">
        Añadir
      </button>
    </form>
  );
}
