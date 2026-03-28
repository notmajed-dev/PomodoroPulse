import React, { useState } from "react";
import Tasks from "./components/Tasks";
import NavBar from "./components/NavBar";
import Timer from "./components/Timer";

const App = () => {
  const [taskList, setTaskList] = useState([]);
  const [currentTaskId, setCurrentTaskId] = useState(null);

  return (
    <div className="min-h-screen bg-white text-black font-mono">
      <NavBar />

      <div className="flex flex-col items-center gap-6 p-6">
        <Timer
          currentTaskId={currentTaskId}
          setCurrentTaskId={setCurrentTaskId}
          taskList={taskList}
          setTaskList={setTaskList}
        />

        <div className="w-full max-w-2xl">
          <Tasks taskList={taskList} setTaskList={setTaskList} />
        </div>
      </div>
    </div>
  );
};

export default App;