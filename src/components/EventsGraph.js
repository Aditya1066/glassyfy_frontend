import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './EventsGraph.css';

// Register Chart.js Components
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

function EventsGraph({ events }) {
  const data = {
    labels: events.map((event) => event.datetime), // X-axis: datetime
    datasets: [
      {
        label: 'Temperature (°C)',
        data: events.map((event) => event.temperature),
        borderColor: '#FF5733',
        backgroundColor: 'rgba(255, 87, 51, 0.2)',
        borderWidth: 2,
        tension: 0.4,
      },
      {
        label: 'Humidity (%)',
        data: events.map((event) => event.humidity),
        borderColor: '#007BFF',
        backgroundColor: 'rgba(0, 123, 255, 0.2)',
        borderWidth: 2,
        tension: 0.4,
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
          text: 'Datetime',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Value',
        },
      },
    },
  };

  return (
    <div className="events-graph-container">
      <h2>Data Trends</h2>
      <div className="graph-wrapper">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}

export default EventsGraph;
