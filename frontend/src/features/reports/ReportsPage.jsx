import React, { useState } from "react";

const ReportsPage = () => {
  const [selectedReport, setSelectedReport] = useState("sales");

  const renderReport = () => {
    switch (selectedReport) {
      case "sales":
        return <p>Sales Report will be displayed here</p>;
      case "purchase":
        return <p>Purchase Report will be displayed here</p>;
      case "stock":
        return <p>Stock Report will be displayed here</p>;
      case "activities":
        return <p>Activity Log will be displayed here</p>;
      default:
        return null;
    }
  };
  return (
    <div className="container mt-4">
      <h3>Reports & Audit</h3>
      <div className="btn-group mb-3">
        {["sales", "purchase", "stock", "activities"].map((r) => (
          <button
            key={r}
            className={`btn btn-outline-primary ${
              selectedReport === r ? "active" : ""
            }`}
            onClick={() => setSelectedReport(r)}
          >
            {r.charAt(0).toUpperCase() + r.slice(1)}
          </button>
        ))}
      </div>
      <div className="card p-3">{renderReport()}</div>
    </div>
  );
};

export default ReportsPage;
