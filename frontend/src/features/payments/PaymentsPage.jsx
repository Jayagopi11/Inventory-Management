import React, { useState } from "react";

const PaymentsPage = () => {
  const [form, setForm] = useState({
    type: "Customer",
    name: "",
    amount: "",
    paymentMode: "Cash",
    date: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = () => {
    console.log("Submitting Payment:", form);
  };
  return (
    <div className="container mt-4">
      <h3>Payments & Accounting</h3>
      <div className="card p-4">
        <div className="row g-3">
          <div className="col-md-3">
            <select
              className="form-control"
              name="type"
              value={form.type}
              onChange={handleChange}
            >
              <option>Customer</option>
              <option>Vendor</option>
            </select>
          </div>
          <div className="col-md-3">
            <input
              className="form-control"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2">
            <input
              className="form-control"
              name="amount"
              type="number"
              placeholder="Amount"
              value={form.amount}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-2">
            <select
              className="form-control"
              name="paymentMode"
              value={form.paymentMode}
              onChange={handleChange}
            >
              <option>Cash</option>
              <option>Bank</option>
              <option>UPI</option>
              <option>Card</option>
            </select>
          </div>
          <div className="col-md-2">
            <input
              className="form-control"
              name="date"
              type="date"
              value={form.date}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-12">
            <textarea
              className="form-control"
              name="notes"
              placeholder="Notes"
              value={form.notes}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-12 text-end">
            <button className="btn btn-primary" onClick={handleSubmit}>
              Save Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentsPage;
