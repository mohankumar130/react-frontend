import React from "react";
import { Link } from "react-router-dom";
import "./css/HomePage.css";

function HomePage() {
  return (
    <div className="home-wrapper">
      <div className="navbar">
        <div className="logo">🤖 AI DevOps Learning</div>
        <div className="nav-links">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </div>
      <div className="home-content">
        <h1>Welcome to AI-Driven DevOps</h1>
        <p>Empowering automation and innovation with intelligent systems and seamless CI/CD pipelines.</p>
        <Link to="/register" className="cta-button">Start Free</Link>
      </div>
    </div>
  );
}

export default HomePage;
