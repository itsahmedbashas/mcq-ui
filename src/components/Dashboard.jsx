import { useState } from "react";
import { useApp } from "../context/AppContext";
import CreateTestModal from "./CreateTestModal";
import "./Dashboard.css";

const Dashboard = ({ onStartTest, onViewResults }) => {
  const { currentUser, tests, logout, deleteTest } = useApp();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const userTests = tests.filter((t) => t.userId === currentUser.username);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: { text: "Not Started", className: "status-pending" },
      "in-progress": { text: "In Progress", className: "status-progress" },
      completed: { text: "Completed", className: "status-completed" },
    };
    const badge = badges[status] || badges.pending;
    return (
      <span className={`status-badge ${badge.className}`}>{badge.text}</span>
    );
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-left">
          <h1>MCQ Generator</h1>
          <div className="user-info">
            <span className="user-emoji">{currentUser.emoji || "👤"}</span>
            <span className="user-name">{currentUser.username}</span>
          </div>
        </div>
        <div className="header-right">
          <button
            className="btn-primary"
            onClick={() => setShowCreateModal(true)}
          >
            + Create Test
          </button>
          <button className="btn-secondary" onClick={logout}>
            Logout
          </button>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="dashboard-content">
          <h2 className="section-title">Your Tests</h2>

          {userTests.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📝</div>
              <h3>No tests yet</h3>
              <p>Create your first AI-generated test to get started</p>
              <button
                className="btn-primary"
                onClick={() => setShowCreateModal(true)}
              >
                Create Your First Test
              </button>
            </div>
          ) : (
            <div className="tests-grid">
              {userTests.map((test) => (
                <div key={test.id} className="test-card">
                  <div className="test-card-header">
                    <h3 className="test-topic">{test.topic}</h3>
                    {getStatusBadge(test.status)}
                  </div>

                  <div className="test-card-info">
                    <div className="info-row">
                      <span className="info-label">Questions:</span>
                      <span className="info-value">
                        {test.numberOfQuestions}
                      </span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Type:</span>
                      <span className="info-value">{test.questionType}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Duration:</span>
                      <span className="info-value">{test.duration} mins</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Created:</span>
                      <span className="info-value">
                        {formatDate(test.createdAt)}
                      </span>
                    </div>
                    {test.status === "completed" && (
                      <div className="info-row">
                        <span className="info-label">Score:</span>
                        <span className="info-value score">
                          {test.score}/{test.numberOfQuestions}(
                          {Math.round(
                            (test.score / test.numberOfQuestions) * 100,
                          )}
                          %)
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="test-card-actions">
                    {test.status === "pending" && (
                      <button
                        className="btn-primary btn-small"
                        onClick={() => onStartTest(test.id)}
                      >
                        Start Test
                      </button>
                    )}
                    {test.status === "in-progress" && (
                      <button
                        className="btn-primary btn-small"
                        onClick={() => onStartTest(test.id)}
                      >
                        Continue Test
                      </button>
                    )}
                    {test.status === "completed" && (
                      <button
                        className="btn-secondary btn-small"
                        onClick={() => onViewResults(test.id)}
                      >
                        View Results
                      </button>
                    )}
                    <button
                      className="btn-danger btn-small"
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete this test?",
                          )
                        ) {
                          deleteTest(test.id);
                        }
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {showCreateModal && (
        <CreateTestModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
};

export default Dashboard;
