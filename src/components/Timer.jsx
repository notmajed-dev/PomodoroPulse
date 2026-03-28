import React, { useState, useEffect } from "react";

const Timer = () => {
  const modes = { pomodoro: 25 * 60, short: 5 * 60, long: 15 * 60 };
  const [mode, setMode] = useState("pomodoro");
  const [timeLeft, setTimeLeft] = useState(modes.pomodoro);
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [sessions, setSessions] = useState(0);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      setHasStarted(false);
      if (mode === "pomodoro") {
        const newSessions = sessions + 1;
        setSessions(newSessions);
        if (newSessions % 4 === 0) {
          setMode("long");
          setTimeLeft(modes.long);
        } else {
          setMode("short");
          setTimeLeft(modes.short);
        }
      } else {
        setMode("pomodoro");
        setTimeLeft(modes.pomodoro);
      }
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, mode, sessions]);

  const getButtonLabel = () => {
    if (!hasStarted) return "Start";
    return isRunning ? "Pause" : "Resume";
  };

  const handleToggle = () => {
    if (!hasStarted) {
      setHasStarted(true);
      setIsRunning(true);
    } else {
      setIsRunning(!isRunning);
    }
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setIsRunning(false);
    setHasStarted(false);
    setTimeLeft(modes[newMode]);
  };

  const handleSkip = () => {
    setIsRunning(false);
    setHasStarted(false);
    if (mode === "pomodoro") {
      const newSessions = sessions + 1;
      setSessions(newSessions);
      if (newSessions % 4 === 0) {
        setMode("long");
        setTimeLeft(modes.long);
      } else {
        setMode("short");
        setTimeLeft(modes.short);
      }
    } else {
      setMode("pomodoro");
      setTimeLeft(modes.pomodoro);
    }
  };

  return (
    <div className="bg-white text-black flex flex-col items-center justify-center gap-8 font-mono">
      <div className="flex gap-4">
        <button
          className={`px-4 py-2 rounded border-4 border-black border-double shadow ${
            mode === "pomodoro" ? "bg-black text-white" : "bg-white text-black"
          }`}
          onClick={() => handleModeChange("pomodoro")}
        >
          Pomodoro
        </button>
        <button
          className={`px-4 py-2 rounded border-4 border-black border-double shadow ${
            mode === "short" ? "bg-black text-white" : "bg-white text-black"
          }`}
          onClick={() => handleModeChange("short")}
        >
          Short Break
        </button>
        <button
          className={`px-4 py-2 rounded border-4 border-black border-double shadow ${
            mode === "long" ? "bg-black text-white" : "bg-white text-black"
          }`}
          onClick={() => handleModeChange("long")}
        >
          Long Break
        </button>
      </div>

      <p className="flex items-center justify-center rounded-full h-64 w-64 bg-white text-black text-7xl border-8 border-black border-double shadow-lg">
        {Math.floor(timeLeft / 60)}
        <span className="text-gray-500">:</span>
        {String(timeLeft % 60).padStart(2, "0")}
      </p>

      <div className="flex gap-4">
        <button
          className="px-6 py-2 rounded border-4 border-black border-double shadow bg-black text-white"
          onClick={handleToggle}
        >
          {getButtonLabel()}
        </button>
        <button
          className="px-6 py-2 rounded border-4 border-black border-double shadow bg-white text-black"
          onClick={() => {
            setTimeLeft(modes[mode]);
            setIsRunning(false);
            setHasStarted(false);
          }}
        >
          Reset
        </button>
        <button
          className="px-6 py-2 rounded border-4 border-black border-double shadow bg-white text-black"
          onClick={handleSkip}
        >
          Skip
        </button>
      </div>

      <p className="text-gray-600">Sessions Completed: {sessions}</p>
    </div>
  );
};

export default Timer;