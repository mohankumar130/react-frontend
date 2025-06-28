import React, { useState } from "react";
import "./css/RegisterPage.css"; // Reusing register styles

function LoginPage() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let loginInput = credentials.username.trim();
    if (/^\d{10}$/.test(loginInput)) {
      loginInput = `+91${loginInput}`;
    }

    try {
      const res = await fetch("http://172.25.54.219:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: loginInput,
          password: credentials.password
        })
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Login successful!");
        localStorage.setItem("token", data.token);
        window.location.href = "/dashboard";
      } else {
        alert(`❌ ${data.message}`);
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div className="app">
      <div className="card">
        <h2>🔐 Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username or Mobile Number"
            required
            value={credentials.username}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={credentials.password}
            onChange={handleChange}
          />
          <button className="register-btn" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
