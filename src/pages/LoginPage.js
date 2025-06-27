import React, { useState } from "react";
import "./css/RegisterPage.css"; // Reusing styles

function LoginPage() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Logging in:\n${JSON.stringify(credentials, null, 2)}`);
  };

  return (
    <div className="app">
      <div className="card">
        <div className="login-icon">🔐</div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mobile-group">
            <span className="mobile-prefix">+91</span>
            <input
              type="text"
              name="username"
              placeholder="Mobile / Username"
              required
              maxLength="10"
              pattern="\d{10}"
              value={credentials.username}
              onChange={handleChange}
            />
          </div>
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
