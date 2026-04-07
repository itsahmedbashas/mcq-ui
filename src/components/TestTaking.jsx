import { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { TextWithCode } from "./CodeBlock";
import "./TestTaking.css";

const TestTaking = ({ test, onComplete }) => {
  const { submitTest } = useApp();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(
    Array(test.questions.length).fill(null),
  );
  const [timeRemaining, setTimeRemaining] = useState(test.duration * 60); // Convert to seconds
  const [visitedQuestions, setVisitedQuestions] = useState(new Set([0]));

  // Timer effect
  useEffect(() => {
    if (timeRemaining <= 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining]);

  // Auto-submit when time runs out
  useEffect(() => {
    if (timeRemaining === 0) {
      handleSubmit();
    }
  }, [timeRemaining]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAnswerSelect = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answer;
    setAnswers(newAnswers);
  };

  const goToQuestion = (index) => {
    setCurrentQuestionIndex(index);
    setVisitedQuestions((prev) => new Set([...prev, index]));
  };

  const goToPrevious = () => {
    if (currentQuestionIndex > 0) {
      goToQuestion(currentQuestionIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentQuestionIndex < test.questions.length - 1) {
      goToQuestion(currentQuestionIndex + 1);
    }
  };

  const handleSubmit = () => {
    const unansweredCount = answers.filter((a) => a === null).length;

    if (timeRemaining > 0 && unansweredCount > 0) {
      const confirmed = window.confirm(
        `You have ${unansweredCount} unanswered question(s). Are you sure you want to submit?`,
      );
      if (!confirmed) return;
    }

    const timeSpent = test.duration * 60 - timeRemaining;
    const result = submitTest(test.id, answers, timeSpent);
    onComplete(result);
  };

  const currentQuestion = test.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === test.questions.length - 1;
  const answeredCount = answers.filter((a) => a !== null).length;

  return (
    <div className="test-taking-container">
      {/* Timer Header */}
      <div className="test-header">
        <div className="test-info">
          <h2>{test.topic}</h2>
          <p>
            Question {currentQuestionIndex + 1} of {test.questions.length}
          </p>
        </div>
        <div className={`timer ${timeRemaining <= 120 ? "warning" : ""}`}>
          <span className="timer-icon">⏱</span>
          <span className="timer-text">{formatTime(timeRemaining)}</span>
        </div>
      </div>

      <div className="test-content">
        {/* Question Display */}
        <div className="question-section">
          <div className="question-card">
            <div className="question-header">
              <span className="question-number">
                Question {currentQuestion.order}
              </span>
              <span className="question-type">
                {currentQuestion.questionType}
              </span>
            </div>

            <h3 className="question-text">
              <TextWithCode text={currentQuestion.questionText} />
            </h3>

            <div className="options-list">
              {currentQuestion.options.map((option, index) => (
                <label key={index} className="option">
                  <input
                    type="radio"
                    name={`question-${currentQuestionIndex}`}
                    value={option}
                    checked={answers[currentQuestionIndex] === option}
                    onChange={() => handleAnswerSelect(option)}
                  />
                  <span className="option-text">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="question-navigation">
            <button
              className="btn-secondary"
              onClick={goToPrevious}
              disabled={currentQuestionIndex === 0}
            >
              ← Previous
            </button>

            {isLastQuestion ? (
              <button className="btn-primary" onClick={handleSubmit}>
                Submit Test
              </button>
            ) : (
              <button className="btn-primary" onClick={goToNext}>
                Next →
              </button>
            )}
          </div>
        </div>

        {/* Question Navigator */}
        <div className="navigator-section">
          <div className="navigator-card">
            <h4>Questions</h4>
            <div className="progress-info">
              <span>
                Answered: {answeredCount}/{test.questions.length}
              </span>
            </div>

            <div className="question-grid">
              {test.questions.map((q, index) => {
                const isAnswered = answers[index] !== null;
                const isVisited = visitedQuestions.has(index);
                const isCurrent = index === currentQuestionIndex;

                return (
                  <button
                    key={q.id}
                    className={`question-button ${
                      isCurrent ? "current" : ""
                    } ${isAnswered ? "answered" : ""} ${
                      isVisited && !isAnswered ? "visited" : ""
                    }`}
                    onClick={() => goToQuestion(index)}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>

            <div className="legend">
              <div className="legend-item">
                <span className="legend-box current"></span>
                <span>Current</span>
              </div>
              <div className="legend-item">
                <span className="legend-box answered"></span>
                <span>Answered</span>
              </div>
              <div className="legend-item">
                <span className="legend-box visited"></span>
                <span>Visited</span>
              </div>
            </div>

            <button className="btn-danger submit-button" onClick={handleSubmit}>
              Submit Test
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestTaking;
