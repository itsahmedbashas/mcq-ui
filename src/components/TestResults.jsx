import { TextWithCode } from "./CodeBlock";
import "./TestResults.css";

const TestResults = ({ test, onBackToDashboard }) => {
  const totalQuestions = test.questions.length;
  const correctAnswers = test.score;
  const incorrectAnswers = totalQuestions - correctAnswers;
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="results-container">
      <div className="results-header">
        <button className="back-button" onClick={onBackToDashboard}>
          ← Back to Dashboard
        </button>
      </div>

      <div className="results-content">
        {/* Summary Card */}
        <div className="summary-card">
          <h1 className="summary-title">Test Completed!</h1>

          <div className="score-display">
            <div className="score-circle">
              <div className="score-percentage">{percentage}%</div>
              <div className="score-fraction">
                {correctAnswers}/{totalQuestions}
              </div>
            </div>
          </div>

          <div className="summary-stats">
            <div className="stat-item">
              <span className="stat-label">Topic</span>
              <span className="stat-value">{test.topic}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Time Spent</span>
              <span className="stat-value">{formatTime(test.timeSpent)}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Completed At</span>
              <span className="stat-value">{formatDate(test.completedAt)}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Correct Answers</span>
              <span className="stat-value correct">{correctAnswers}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Incorrect Answers</span>
              <span className="stat-value incorrect">{incorrectAnswers}</span>
            </div>
          </div>
        </div>

        {/* Questions Review */}
        <div className="review-section">
          <h2 className="review-title">Detailed Review</h2>

          <div className="questions-list">
            {test.questions.map((question, index) => (
              <div
                key={question.id}
                className={`review-question ${
                  question.isCorrect ? "correct" : "incorrect"
                }`}
              >
                <div className="question-header">
                  <div className="question-number-badge">
                    Question {index + 1}
                  </div>
                  <div className="result-badge">
                    {question.isCorrect ? (
                      <>
                        <span className="badge-icon">✓</span>
                        <span>Correct</span>
                      </>
                    ) : (
                      <>
                        <span className="badge-icon">✗</span>
                        <span>Incorrect</span>
                      </>
                    )}
                  </div>
                </div>

                <h3 className="review-question-text">
                  <TextWithCode text={question.questionText} />
                </h3>

                <div className="review-answers">
                  {question.options.map((option, optIndex) => {
                    const isCorrect = option === question.correctAnswer;
                    const isUserAnswer = option === question.userAnswer;

                    let className = "answer-option";
                    if (isCorrect) {
                      className += " correct-answer";
                    }
                    if (isUserAnswer && !isCorrect) {
                      className += " wrong-answer";
                    }

                    return (
                      <div key={optIndex} className={className}>
                        <span className="option-label">
                          {String.fromCharCode(65 + optIndex)}.
                        </span>
                        <span className="option-text">{option}</span>
                        {isCorrect && (
                          <span className="correct-indicator">
                            ✓ Correct Answer
                          </span>
                        )}
                        {isUserAnswer && !isCorrect && (
                          <span className="wrong-indicator">Your Answer</span>
                        )}
                      </div>
                    );
                  })}

                  {question.userAnswer === null && (
                    <div className="unanswered-notice">
                      <span>⚠ Not answered</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestResults;
