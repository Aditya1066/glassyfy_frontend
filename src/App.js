import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ConnectivityStatus from './components/ConnectivityStatus';
import ControlButtons from './components/ControlButtons';
import EventsTable from './components/EventsTable';
import EventsGraph from './components/EventsGraph'; // Events Graph
import SecondaryGraph from './components/SecondaryGraph'; // Humidity Graph
import TempTrendGraph from './components/TempTrendGraph'; // Temperature Graph
import Login from './components/Login';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [events, setEvents] = useState([]);
  const [temperatureData, setTemperatureData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);

  useEffect(() => {
    const authState = localStorage.getItem('isAuthenticated');
    if (authState === 'true') {
      setIsAuthenticated(true);
    }

    fetchEvents();

    const interval = setInterval(() => {
      fetchEvents();
    }, 1000); // Fetch data every second

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('https://glassyfy-backend.onrender.com/api/events');
      if (response.ok) {
        const data = await response.json();
        setEvents(data);

        const tempData = data.map((event) => ({
          timestamp: event.timestamp,
          temperature: event.temperature,
        }));
        setTemperatureData(tempData);

        const humidData = data.map((event) => ({
          timestamp: event.timestamp,
          humidity: event.humidity,
        }));
        setHumidityData(humidData);
      } else {
        console.error('Failed to fetch events');
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  return (
    <div className="App">
      {!isAuthenticated ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          <Navbar onLogout={handleLogout} />
          <main className="dashboard">
            <section className="dashboard-card connectivity">
              <ConnectivityStatus />
            </section>
            <section className="dashboard-card events">
              <EventsTable events={events} />
            </section>
            <section className="dashboard-card controls">
              <ControlButtons fetchEvents={fetchEvents} />
            </section>

            {/* New Graphs Section */}
            <section className="graphs-section">
              <h2>Real-Time Data Visualization</h2>
              <div className="graphs-container">
                <div className="graph-card">
                  <EventsGraph events={events} />
                </div>
                <div className="graph-card">
                  <SecondaryGraph humidityData={humidityData} />
                </div>
                <div className="graph-card">
                  <TempTrendGraph temperatureData={temperatureData} />
                </div>
              </div>
            </section>
          </main>
        </>
      )}
    </div>
  );
}

export default App;
