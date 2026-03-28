import React, { useState } from "react";
import Tasks from "./components/Tasks";
import NavBar from "./components/NavBar";
import Timer from "./components/Timer";

const App = () => {
  const [taskList, setTaskList] = useState([]);

  return (
    <div className="min-h-screen bg-white text-black font-mono">
      <NavBar />

      <div className="flex flex-col items-center gap-6 p-6">

        {/* 🔥 TIMER BOX */}
        <div className="w-full max-w-md border-4 border-black border-double rounded-xl p-6 shadow-lg">
          <Timer />
        </div>

        {/* 🔥 TASKS BOX */}
        <div className="w-full max-w-2xl border-4 border-black border-double rounded-xl p-6 shadow-lg">
          <Tasks taskList={taskList} setTaskList={setTaskList} />
        </div>

      </div>
    </div>
  );
};

export default App;