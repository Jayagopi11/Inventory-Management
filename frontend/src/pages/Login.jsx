import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginRequest } from "../features/Login/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, isAuthenticated } = useSelector((state) => state.auth || {});


  const [form, setForm] = useState({ email: "", password: "" });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/admin");
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginRequest(form));
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh", backgroundColor: "#f8f9fa" }}
    >
      <div
        className="p-4 bg-white shadow rounded"
        style={{ width: "320px", boxSizing: "border-box" }}
      >
        <h2 className="text-center mb-4" style={{ color: "#007bff" }}>
          Login
        </h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <input
            name="email"
            placeholder="Email"
            type="email"
            className="form-control form-control-sm mb-3"
            value={form.email}
            onChange={handleChange}
            style={{ fontSize: "0.9rem" }}
          />

          <input
            name="password"
            placeholder="Password"
            type="password"
            className="form-control form-control-sm mb-4"
            value={form.password}
            onChange={handleChange}
            style={{ fontSize: "0.9rem" }}
          />

          <button
            type="submit"
            className="btn btn-primary w-100"
            style={{ fontSize: "1rem" }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
