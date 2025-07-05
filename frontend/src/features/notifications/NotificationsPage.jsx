import React, { useEffect, useState } from "react";
import NotificationItem from "../../components/NotificationItem";
import axios from "axios";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/notifications");
        setNotifications(res.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load notifications.");
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="container mt-4">
      <h3>Notifications</h3>

      {loading && <p>Loading...</p>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && notifications.length === 0 && (
        <div className="alert alert-info">No notifications available.</div>
      )}

      <div className="list-group">
        {notifications.map((note) => (
          <NotificationItem key={note._id || note.id} notification={note} />
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;
