import React from "react";
import "./css/HomePage.css";

function HomePage() {
  return (
    <div className="home-wrapper">
      <header className="navbar">
        <h2 className="logo">🌐 MyApp</h2>
        <div className="nav-links">
          <a href="/login">🔐 Login</a>
          <a href="/register">📝 Register</a>
        </div>
      </header>

      <main className="home-content">
        <h1>🏠 Welcome to the Home Page</h1>
        <p>Coming Soon!!!!!!!!!!!!</p>
      </main>
    </div>
  );
}

export default HomePage;
