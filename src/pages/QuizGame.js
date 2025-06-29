import React, { useState } from "react";
import "../pages/css/GamerDashboard.css"; // Reuse existing styles

const quizData = [
  {
    question: "Which company developed GTA V?",
    options: ["Ubisoft", "Rockstar Games", "EA Sports", "Epic Games"],
    answer: "Rockstar Games",
  },
  {
    question: "Valorant is a game in which genre?",
    options: ["MOBA", "Battle Royale", "Tactical Shooter", "RPG"],
    answer: "Tactical Shooter",
  },
  {
    question: "Which engine does Call of Duty use?",
    options: ["Unity", "Frostbite", "Unreal", "IW Engine"],
    answer: "IW Engine",
  },
];

function QuizGame() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState("");
  const [showScore, setShowScore] = useState(false);

  const current = quizData[index];

  const handleSelect = (option) => setSelected(option);

  const handleNext = () => {
    if (selected === current.answer) setScore(score + 1);
    if (index + 1 < quizData.length) {
      setIndex(index + 1);
      setSelected("");
    } else {
      setShowScore(true);
    }
  };

  const restartQuiz = () => {
    setIndex(0);
    setScore(0);
    setSelected("");
    setShowScore(false);
  };

  return (
    <div className="quiz-card">
      <h3>🧠 Gamer Quiz</h3>

      {showScore ? (
        <div>
          <p>🎉 Your Score: {score} / {quizData.length}</p>
          <button onClick={restartQuiz}>🔁 Restart</button>
        </div>
      ) : (
        <>
          <p className="question">{current.question}</p>
          <div className="options">
            {current.options.map((opt, i) => (
              <button
                key={i}
                className={`option-btn ${selected === opt ? "selected" : ""}`}
                onClick={() => handleSelect(opt)}
              >
                {opt}
              </button>
            ))}
          </div>
          <button onClick={handleNext} disabled={!selected} className="next-btn">
            ➡️ Next
          </button>
        </>
      )}
    </div>
  );
}

export default QuizGame;
