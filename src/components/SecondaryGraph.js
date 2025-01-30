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

// Register Chart.js Components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function SecondaryGraph({ humidityData }) {
  const data = {
    labels: humidityData.length > 0 ? humidityData.map((item) => item.timestamp) : ['No Data'], // Handle no data case
    datasets: [
      {
        label: 'Humidity Levels',
        data: humidityData.length > 0 ? humidityData.map((item) => item.humidity) : [0], // Handle no data
        backgroundColor: 'rgba(54, 162, 235, 0.5)', // Bar color
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#333',
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: '#333',
        },
      },
    },
  };

  return (
    <div className="secondary-graph-container">
      <h3>Humidity Trends</h3>
      <div className="secondary-graph-wrapper">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default SecondaryGraph;
