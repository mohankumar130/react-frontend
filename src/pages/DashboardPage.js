import React, { useEffect, useState } from "react";
import "./css/GamerDashboard.css";
import QuizGame from "./QuizGame";


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

  const games = ["Valorant", "Call of Duty", "GTA V", "PUBG", "FIFA 24"];

  return (
    <div className="dashboard-wrapper">
      {user && (
        <div className="profile-info">
          <img
            src={`https://api.dicebear.com/7.x/bottts/svg?seed=${user.username}`}
            alt="Profile"
          />
          <span>{user.username}</span>
        </div>
      )}

      <div className="dashboard-content">
        <h1>🎮 GamerHub Dashboard</h1>

        {error && <p className="error-msg">{error}</p>}

        <div className="card-grid">
          <div className="card">
            <h3>🎯 Game List</h3>
            <ul>
              {games.map((game, index) => (
                <li key={index}>🎮 {game}</li>
              ))}
            </ul>
          </div>

          <div className="card">
            <h3>🧠 Quiz Game</h3>
            <QuizGame />
          </div>

          <div className="card">
            <h3>🎲 Number Guess</h3>
            <p>Guess the number between 1–10</p>
            <button onClick={() => alert("Number Guess coming soon!")}>Play</button>
          </div>

          <div className="card">
            <h3>🧩 Sudoku</h3>
            <p>Challenge your brain</p>
            <button disabled>Coming Soon</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
