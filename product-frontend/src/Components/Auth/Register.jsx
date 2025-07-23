import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8080/auth";

function Register() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${API_URL}/register`, form)
      .then((res) => {
        setMessage(res.data);
        if (res.data === "User registered successfully!") {
          setTimeout(() => navigate("/login"), 1000);
        }
      })
      .catch(() => setMessage("Registration failed!"));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        {message && <div className="mb-2 text-blue-600">{message}</div>}
        <input
          className="border p-2 rounded w-full mb-4"
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          className="border p-2 rounded w-full mb-4"
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
          type="submit"
        >
          Register
        </button>
        <div className="mt-2 text-sm">
          Already have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </div>
      </form>
    </div>
  );
}

export default Register;