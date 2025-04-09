import React from 'react';
import './EventsTable.css'; // Keep your existing styles for scroll and design

function EventsTable({ events }) {
  const temperatureMinThreshold = 10; // Set minimum temperature threshold
  const temperatureMaxThreshold = 30; // Set maximum temperature threshold
  const humidityMinThreshold = 20; // Set minimum humidity threshold
  const humidityMaxThreshold = 50; // Set maximum humidity threshold

  const getKeyClass = (temperature, humidity) => {
    if (
      temperature < temperatureMinThreshold ||
      temperature > temperatureMaxThreshold ||
      humidity < humidityMinThreshold ||
      humidity > humidityMaxThreshold
    ) {
      return 'key-out-of-threshold'; // Class for out-of-threshold values
    }
    return 'key-in-threshold'; // Class for values within thresholds
  };

  return (
    <div>
      <h2>Events Log</h2> {/* Title remains static */}
      <div className="table-container"> {/* Scrollable table */}
        <table>
          <thead>
            <tr>
              <th>Key</th>
              <th>ldr_status</th>
              <th>distance_cm</th>
              <th>servo_position</th>
              {/* <th>Temperature</th>
              <th>Timestamp</th>
              <th>Datetime</th> */}
            </tr>
          </thead>
          <tbody>
            {events.length > 0 ? (
              events.map((event) => (
                <tr key={event.key}>
                  <td className={getKeyClass(event.temperature, event.humidity)}>
                    {event.key}
                  </td>
                  <td>{event.ldr_status}</td>
                  <td>{event.distance_cm}</td>
                  <td>{event.servo_position}</td>
                  {/* <td>{event.temperature}</td>
                  <td>{event.timestamp}</td>
                  <td>{event.datetime}</td> */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EventsTable;
