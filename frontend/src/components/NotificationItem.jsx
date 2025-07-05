import React from "react";

const NotificationItem = ({ notification }) => {
  const getColor = () => {
    switch (notification.type) {
      case "warning":
        return "list-group-item-warning";
      case "reminder":
        return "list-group-item-danger";
      case "info":
      default:
        return "list-group-item-info";
    }
  };

  return (
    <div className={`list-group-item ${getColor()}`}>
      <div className="d-flex justify-content-between">
        <span>{notification.message}</span>
        <small>{notification.date}</small>
      </div>
    </div>
  );
};

export default NotificationItem;
