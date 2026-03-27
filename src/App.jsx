import { React, useEffect, useState } from "react";

const App = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [session, setSession] = useState(1);
  function toMinutes(timeLeft) {
    var remainingMinutes = Math.floor(timeLeft / 60);
    var remainingSeconds = timeLeft % 60;
    if (remainingSeconds < 10) remainingSeconds = "0" + remainingSeconds;
    return `${remainingMinutes}:${remainingSeconds}`;
  }

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    if (timeLeft === 0) {
      if (isBreak) {
        setTimeLeft(25 * 60);
        setIsBreak(false);
      } else {
        setTimeLeft(5 * 60);
        setIsBreak(true);
        setSession((prev) => prev + 1);
      }
      setIsRunning(false);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isRunning, timeLeft]);

  return (
    <div className="flex flex-col mb-8 justify-center items-center h-screen w-screen bg-red-400">
      <h1 className=" hover:underline hover: decoration-white hover:underline-offset-2 text-9xl font-bold text-white">
        PomoFocus
      </h1>

      <div className="flex justify-center items-center">
        {toMinutes(timeLeft)}
      </div>
      <p className="text-white text-xl">Session: {session}</p>
      <button
        onClick={() => {
          setIsRunning(!isRunning);
        }}
      >
        {isRunning ? "Pause" : "Resume"}
      </button>

      <button
  onClick={() => {
    if (isBreak) {
      setIsBreak(false);
      setTimeLeft(25 * 60);
      setSession(prev => prev + 1);
    } else {
      setIsBreak(true);
      setTimeLeft(5 * 60);
    }
    setIsRunning(false); 
  }}
>
  Skip
</button>

    </div>
  );
};

export default App;
