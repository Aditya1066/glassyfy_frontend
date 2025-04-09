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

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

function EventsGraph({ events }) {
  const data = {
    labels: events.map((event) => `Glass ${event.key}`),  // X-axis labels
    datasets: [
      {
        label: 'Distance (cm)',
        data: events.map((event) => event.distance_cm),
        borderColor: '#28a745',
        backgroundColor: 'rgba(40, 167, 69, 0.2)',
        borderWidth: 2,
        tension: 0.4,
      },
      {
        label: 'Servo Position (°)',
        data: events.map((event) => event.servo_position),
        borderColor: '#ffc107',
        backgroundColor: 'rgba(255, 193, 7, 0.2)',
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
          text: 'Event Key',
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
      <h2>Distance & Servo Position Trends</h2>
      <div className="graph-wrapper">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}

export default EventsGraph;
