import React from "react";
import QuizGame from "./QuizGame";

function QuizGamePage() {
  return (
    <div className="gamer-dashboard">
      <div className="dashboard-card">
        <h2>🧠 Start Your Gamer Quiz</h2>
        <QuizGame />
      </div>
    </div>
  );
}

export default QuizGamePage;
