import React, { useState } from 'react';
import './ConnectivityStatus.css'; // Import custom styles

function ConnectivityStatus() {
  const [isConnected, setIsConnected] = useState(true);
  const [isWifiConnected, setIsWifiConnected] = useState(true);

  const toggleConnection = () => {
    setIsConnected(!isConnected);
  };

  const toggleWifiConnection = () => {
    setIsWifiConnected(!isWifiConnected);
  };

  return (
    <div className="connectivity-card">
      <h2>Device Connectivity Status</h2>
      <p className={`status ${isConnected ? 'connected' : 'disconnected'}`}>
        Status: {isConnected ? 'Connected' : 'Disconnected'}
      </p>
      <p className={`status ${isWifiConnected ? 'connected' : 'disconnected'}`}>
        WiFi Status: {isWifiConnected ? 'Connected' : 'Disconnected'}
      </p>
    </div>
  );
}

export default ConnectivityStatus;
