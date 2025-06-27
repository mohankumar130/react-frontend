import React, { useState } from "react";
import "./css/RegisterPage.css"; // Reusing register styles

function LoginPage() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let loginInput = credentials.username.trim();
    if (/^\d{10}$/.test(loginInput)) {
      loginInput = `+91${loginInput}`;
    }

    alert(`🔐 Logging in:\n${JSON.stringify({ ...credentials, username: loginInput }, null, 2)}`);
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
