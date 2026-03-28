import React, { useState } from "react";

const Tasks = () => {
  const [taskList, setTaskList] = useState([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim() === "") return;
    setTaskList([
      ...taskList,
      { id: Date.now(), text: newTask, completed: false },
    ]);
    setNewTask("");
  };

  const toggleComplete = (id) => {
    setTaskList(
      taskList.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className="w-full flex flex-col items-center gap-6 font-mono">
      <div className="flex gap-2">
        <input
          value={newTask}
          onChange={(event) => setNewTask(event.target.value)}
          placeholder="What are you working on???"
          className="px-6 py-3 w-full max-w-md text-lg rounded border-4 border-black border-double shadow bg-white text-black"
        />
        <button
          onClick={addTask}
          className="px-4 py-2 rounded border-4 border-black border-double shadow bg-black text-white"
        >
          Add
        </button>
      </div>

      <ul className="w-80 flex flex-col gap-3">
        {taskList.map((task) => (
          <li
            key={task.id}
            className="flex items-center gap-3 px-4 py-2 rounded border-4 border-black border-double shadow bg-white"
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task.id)}
              className="h-5 w-5 accent-black cursor-pointer"
            />
            <span
              className={`${
                task.completed
                  ? "line-through text-gray-500"
                  : "text-black"
              }`}
            >
              {task.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;