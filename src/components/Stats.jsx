import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Stats = ({ stats, taskList }) => {
  const data = {
    labels: taskList.map((t) => t.text),
    datasets: [
      {
        label: "Pomodoros Completed",
        data: taskList.map((t) => t.pomodoros),
        backgroundColor: "#3b82f6",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Pomodoro Stats" },
    },
  };

  return (
    <div>
      <h2>Stats</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default Stats;