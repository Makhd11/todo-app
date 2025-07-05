import { useEffect, useState } from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("todo-list");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("todo-list", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() !== "") {
      setTasks([...tasks, { text: task, completed: false }]);
      setTask("");
    }
  };

  const toggleComplete = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-pink-100 p-4 flex justify-center items-start">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
          To-Do List
        </h1>

        <div className="relative mb-6">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Next Task ?"
            className="w-full p-3 pr-16 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={addTask}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-full shadow"
          >
            Add
          </button>
        </div>


        <ul className="space-y-3">
          {tasks.map((t, index) => (
            <li
              key={index}
              className="flex items-center justify-between bg-gray-100 hover:bg-gray-200 p-3 rounded-xl shadow-sm transition-all"
            >
              <div className="flex items-center gap-3 flex-1">
               

                <input
                  type="checkbox"
                  checked={t.completed}
                  onChange={() => toggleComplete(index)}
                  className="w-5 h-5"
                />

                <span
                  className={`text-lg ${
                    t.completed ? "line-through text-gray-400" : "text-gray-800"
                  }`}
                >
                  {t.text}
                </span>
              </div>

              <button
                onClick={() => deleteTask(index)}
                className="text-red-500 hover:text-red-700 transition-all"
                title="Delete"
              >
                <i className="far fa-trash-alt text-lg"></i>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
