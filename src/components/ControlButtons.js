import React, { useState, useEffect } from 'react';
import './ControlButtons.css';

function ControlButtons() {
  const [isRunning, setIsRunning] = useState(false);

  const fetchButtonStatus = async () => {
    try {
      const response = await fetch('https://glassyfy-backend.onrender.com/api/control/status');
      if (!response.ok) throw new Error('Failed to fetch status');
      const data = await response.json();
      setIsRunning(data.status === 'on');
    } catch (error) {
      console.error('Error fetching status:', error);
    }
  };

  useEffect(() => {
    fetchButtonStatus();
  }, []);

  const handleButtonClick = async () => {
    const status = isRunning ? 'off' : 'on';

    try {
      const response = await fetch('https://glassyfy-backend.onrender.com/api/control', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) throw new Error('Failed to send status');

      await response.json(); // Not using returned data directly
      
      await fetchButtonStatus(); // Re-fetch status from backend (Best Practice)
      
    } catch (error) {
      console.error('Error sending status:', error);
    }
  };

  return (
    <div className="control-buttons-card">
      <h2>Control Buttons</h2>
      <button
        className={`btn ${isRunning ? 'running' : 'stopped'}`}
        onClick={handleButtonClick}
      >
        {isRunning ? 'Stop' : 'Start'}
      </button>
      <p className={`status ${isRunning ? 'running' : 'stopped'}`}>
        Status: {isRunning ? 'Running' : 'Stopped'}
      </p>
    </div>
  );
}

export default ControlButtons;
