import React from "react";

const Notification = ({ type = "info", message, onClose }) => {
  const getAlertClass = () => {
    switch (type) {
      case "success":
        return "alert alert-success";
      case "error":
        return "alert alert-danger";
      case "warning":
        return "alert alert-warning";
      default:
        return "alert alert-info";
    }
  };

  return (
    <div
      className={`${getAlertClass()} alert-dismissible fade show`}
      role="alert"
    >
      <strong className="me-2 text-capitalize">{type}:</strong> {message}
      {onClose && (
        <button
          type="button"
          className="btn-close"
          onClick={onClose}
          aria-label="Close"
        ></button>
      )}
    </div>
  );
};

export default Notification;
