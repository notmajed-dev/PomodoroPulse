import React, { useState, useEffect } from "react";
import { RotateCcw, SkipForward } from "lucide-react";

const Timer = () => {
  const modes = { pomodoro: 25 * 60, short: 5 * 60, long: 15 * 60 };

  const MIN_TIME = 25 * 60;
  const MAX_TIME = 180 * 60;

  const quotes = [
    "Focus on being productive instead of busy.",
    "Your future is created by what you do today.",
    "Small progress is still progress.",
    "Stay consistent. It pays off.",
    "Discipline beats motivation.",
    "Do it now. Sometimes ‘later’ becomes never.",
    "Great things take time.",
    "One task at a time. One step closer.",
  ];

  const [mode, setMode] = useState("pomodoro");
  const [timeLeft, setTimeLeft] = useState(modes.pomodoro);
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [sessions, setSessions] = useState(0);
  const [quote, setQuote] = useState(quotes[0]);

  useEffect(() => {
    let timer;

    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      setHasStarted(false);

      // change quote
      setQuote(quotes[Math.floor(Math.random() * quotes.length)]);

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

  const handleToggle = () => {
    if (!hasStarted) {
      setHasStarted(true);
      setIsRunning(true);
    } else {
      setIsRunning(!isRunning);
    }
  };

  const handleSkip = () => {
    setIsRunning(false);
    setHasStarted(false);

    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);

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

  const increaseTime = () => {
    setTimeLeft((prev) => Math.min(prev + 5 * 60, MAX_TIME));
  };

  const decreaseTime = () => {
    setTimeLeft((prev) => Math.max(prev - 5 * 60, MIN_TIME));
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setIsRunning(false);
    setHasStarted(false);
    setTimeLeft(modes[newMode]);
  };

  return (
    <div className="text-black flex flex-col items-center gap-6 font-mono">

      {/* Mode buttons */}
      <div className="flex gap-4">
        {["pomodoro", "short", "long"].map((m) => (
          <button
            key={m}
            onClick={() => handleModeChange(m)}
            className={`px-4 py-2 border-4 border-black border-double rounded-full ${
              mode === m ? "bg-black text-white" : ""
            }`}
          >
            {m === "pomodoro"
              ? "Pomodoro"
              : m === "short"
              ? "Short Break"
              : "Long Break"}
          </button>
        ))}
      </div>

      {/* Quote */}
      <p className="text-gray-600 italic text-center max-w-md">
        "{quote}"
      </p>

      {/* Timer + side buttons */}
      <div className="flex items-center gap-6">

        <button
          onClick={decreaseTime}
          className="h-12 w-12 flex items-center justify-center border-4 border-black border-double rounded-full"
        >
          -5
        </button>

        <div className="flex items-center justify-center h-64 w-64 rounded-full border-8 border-black border-double text-7xl">
          {Math.floor(timeLeft / 60)}
          <span className="text-gray-500">:</span>
          {String(timeLeft % 60).padStart(2, "0")}
        </div>

        <button
          onClick={increaseTime}
          className="h-12 w-12 flex items-center justify-center border-4 border-black border-double rounded-full"
        >
          +5
        </button>

      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">

        {/* Reset */}
        <button
          onClick={() => {
            setTimeLeft(modes[mode]);
            setIsRunning(false);
            setHasStarted(false);
          }}
          className="h-12 w-12 flex items-center justify-center border-4 border-black border-double rounded-full"
        >
          <RotateCcw size={20} />
        </button>

        {/* Start */}
        <button
          onClick={handleToggle}
          className="px-8 py-3 rounded-full border-4 border-black border-double bg-black text-white font-bold"
        >
          {hasStarted ? (isRunning ? "Pause" : "Resume") : "Start"}
        </button>

        {/* Skip */}
        <button
          onClick={handleSkip}
          className="h-12 w-12 flex items-center justify-center border-4 border-black border-double rounded-full"
        >
          <SkipForward size={20} />
        </button>

      </div>

      <p className="text-gray-600">Sessions Completed: {sessions}</p>
    </div>
  );
};

export default Timer;