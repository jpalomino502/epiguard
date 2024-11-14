import React from 'react';

export default function AlertsSection({ notifications }) {
  return (
    <div className="alerts-section p-4 bg-white rounded shadow-md">
      <h2 className="text-xl font-semibold">Notifications</h2>
      {notifications.length === 0 ? (
        <p>No new notifications</p>
      ) : (
        <ul>
          {notifications.map((notification) => (
            <li key={notification.id} className="alert-item my-2 p-2 bg-gray-100 rounded">
              <p>{notification.message}</p>
              <small>{new Date(notification.timestamp.seconds * 1000).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
