import { useState } from "react";
import { useApp } from "../context/AppContext";
import { generateQuestions } from "../utils/questionGenerator";
import "./CreateTestModal.css";

const CreateTestModal = ({ onClose }) => {
  const { createTest } = useApp();
  const [formData, setFormData] = useState({
    topic: "",
    numberOfQuestions: 10,
    questionType: "Multiple Choice (4 options)",
    duration: 15,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "numberOfQuestions" || name === "duration"
          ? parseInt(value)
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.topic.trim()) {
      alert("Please enter a topic");
      return;
    }

    setLoading(true);

    // Simulate AI generation delay
    setTimeout(() => {
      const questions = generateQuestions(
        formData.topic,
        formData.numberOfQuestions,
        formData.questionType,
      );

      const newTest = createTest({
        ...formData,
        questions,
      });

      setLoading(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create New Test</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="topic">Topic *</label>
            <input
              id="topic"
              name="topic"
              type="text"
              value={formData.topic}
              onChange={handleChange}
              placeholder="e.g., JavaScript Arrays, World War II, Human Anatomy"
              required
              disabled={loading}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="numberOfQuestions">Number of Questions</label>
              <select
                id="numberOfQuestions"
                name="numberOfQuestions"
                value={formData.numberOfQuestions}
                onChange={handleChange}
                disabled={loading}
              >
                <option value={5}>5 Questions</option>
                <option value={10}>10 Questions</option>
                <option value={15}>15 Questions</option>
                <option value={20}>20 Questions</option>
                <option value={25}>25 Questions</option>
                <option value={30}>30 Questions</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="duration">Duration (minutes)</label>
              <select
                id="duration"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                disabled={loading}
              >
                <option value={10}>10 minutes</option>
                <option value={15}>15 minutes</option>
                <option value={20}>20 minutes</option>
                <option value={30}>30 minutes</option>
                <option value={45}>45 minutes</option>
                <option value={60}>60 minutes</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="questionType">Question Type</label>
            <select
              id="questionType"
              name="questionType"
              value={formData.questionType}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="Multiple Choice (4 options)">
                Multiple Choice (4 options)
              </option>
              <option value="Multiple Choice (3 options)">
                Multiple Choice (3 options)
              </option>
              <option value="True/False">True/False</option>
              <option value="Yes/No">Yes/No</option>
            </select>
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? "Generating Questions..." : "Create Test"}
            </button>
          </div>
        </form>

        {loading && (
          <div className="loading-overlay">
            <div className="loading-spinner"></div>
            <p>AI is generating your questions...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateTestModal;
