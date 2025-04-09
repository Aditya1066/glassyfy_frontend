import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import './SecondaryGraph.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function SecondaryGraph({ events = [] }) {  // <-- Default empty array
  const data = {
    labels: events.map((event) => `Glass ${event.key}`),
    datasets: [
      {
        label: 'Distance (cm)',
        data: events.map((event) => parseFloat(event.distance_cm)),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Event Key',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Distance (cm)',
        },
      },
    },
  };

  return (
    <div className="secondary-graph-container">
      <h2>Distance Trends</h2>
      <div className="secondary-graph-wrapper">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default SecondaryGraph;
