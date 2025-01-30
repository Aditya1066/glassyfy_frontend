import React, { useState, useEffect } from 'react';
import './ControlButtons.css';

function ControlButtons() {
  const [isRunning, setIsRunning] = useState(false);

  // Function to fetch the current status of the button
  const fetchButtonStatus = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/control/status');
      if (!response.ok) {
        throw new Error('Failed to fetch status');
      }
      const data = await response.json();
      setIsRunning(data.status === 'on'); // Set state based on the fetched status
    } catch (error) {
      console.error('Error fetching status:', error);
    }
  };

  useEffect(() => {
    // Fetch the status when the component mounts
    fetchButtonStatus();
  }, []); // Empty dependency array means this runs only once when the component mounts

  // Function to handle button click and send status to the backend
  const handleButtonClick = async () => {
    const status = isRunning ? 'off' : 'on'; // Toggle status between 'on' and 'off'

    try {
      const response = await fetch('https://g-backend-2.onrender.com/api/control', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }), // Send status in the body as JSON
      });

      if (!response.ok) {
        throw new Error('Failed to send status');
      }

      const data = await response.json(); // Get the response in JSON format
      console.log('Status received successfully:', data); // Log the response
      setIsRunning(data.status === 'on'); // Update the button state
    } catch (error) {
      console.error('Error sending status:', error); // Log any error that occurs
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
