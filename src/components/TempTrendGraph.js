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
import './TempTrendGraph.css';

// Register Chart.js Components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function TempTrendGraph({ temperatureData }) {
  const data = {
    labels: temperatureData.length > 0 ? temperatureData.map((item) => item.timestamp) : ['No Data'], // Handle no data case
    datasets: [
      {
        label: 'Temperature Levels',
        data: temperatureData.length > 0 ? temperatureData.map((item) => item.temperature) : [0], // Handle no data
        backgroundColor: 'rgba(255, 99, 132, 0.5)', // Bar color
        borderColor: 'rgba(255, 99, 132, 1)',
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
    <div className="temp-trend-graph-container">
      <h3>Temperature Trends</h3>
      <div className="temp-trend-graph-wrapper">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default TempTrendGraph;
