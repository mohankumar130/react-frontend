import React, { useEffect, useState } from "react";
import "./css/GamerDashboard.css";

function DashboardPage() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Not logged in. Redirecting to login...");
      setTimeout(() => window.location.href = "/login", 2000);
      return;
    }

    fetch("http://172.25.54.219:3000/api/profile", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.user) {
          setUser(data.user);
          localStorage.setItem("user", JSON.stringify(data.user));
        } else {
          setError("Invalid token. Please login again.");
          localStorage.removeItem("token");
          setTimeout(() => window.location.href = "/login", 2000);
        }
      })
      .catch((err) => {
        console.error("Dashboard fetch error:", err);
        setError("Something went wrong.");
      });
  }, []);

  return (
    <div className="gamer-dashboard">
      <div className="dashboard-card">
        <h2>🎮 Welcome to GamerHub</h2>
        {error && <p className="error-msg">{error}</p>}

        {user ? (
          <div className="user-info">
            <p>👋 Hello, <strong>{user.username}</strong>!</p>
            <p>🆔 User ID: {user.id}</p>
            <p>🚧 Games are coming soon. Stay tuned!</p>
          </div>
        ) : (
          !error && <p className="loading-text">🔄 Loading player info...</p>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;
