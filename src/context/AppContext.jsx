import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [tests, setTests] = useState([]);
  const [activeTest, setActiveTest] = useState(null);

  // Load from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    const savedTests = localStorage.getItem("tests");

    if (savedUser) setCurrentUser(JSON.parse(savedUser));
    if (savedTests) setTests(JSON.parse(savedTests));
  }, []);

  // Save to localStorage when data changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem("tests", JSON.stringify(tests));
  }, [tests]);

  const login = (username) => {
    const user = { username, createdAt: new Date().toISOString() };
    setCurrentUser(user);
  };

  const signup = (username, email, emoji) => {
    const user = {
      username,
      email,
      emoji,
      createdAt: new Date().toISOString(),
    };
    setCurrentUser(user);
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  const createTest = (testConfig) => {
    const newTest = {
      id: Date.now().toString(),
      userId: currentUser.username,
      ...testConfig,
      status: "pending",
      createdAt: new Date().toISOString(),
      score: null,
      timeSpent: null,
      startedAt: null,
      completedAt: null,
    };
    setTests([...tests, newTest]);
    return newTest;
  };

  const startTest = (testId) => {
    const test = tests.find((t) => t.id === testId);
    if (test) {
      const updatedTest = {
        ...test,
        status: "in-progress",
        startedAt: new Date().toISOString(),
      };
      setTests(tests.map((t) => (t.id === testId ? updatedTest : t)));
      setActiveTest(updatedTest);
    }
  };

  const submitTest = (testId, answers, timeSpent) => {
    const test = tests.find((t) => t.id === testId);
    if (!test) return;

    let correctCount = 0;
    const updatedQuestions = test.questions.map((q, index) => {
      const userAnswer = answers[index];
      const isCorrect = userAnswer === q.correctAnswer;
      if (isCorrect) correctCount++;
      return { ...q, userAnswer, isCorrect };
    });

    const updatedTest = {
      ...test,
      questions: updatedQuestions,
      status: "completed",
      completedAt: new Date().toISOString(),
      score: correctCount,
      timeSpent,
    };

    setTests(tests.map((t) => (t.id === testId ? updatedTest : t)));
    setActiveTest(null);
    return updatedTest;
  };

  const deleteTest = (testId) => {
    setTests(tests.filter((t) => t.id !== testId));
  };

  const value = {
    currentUser,
    tests,
    activeTest,
    login,
    signup,
    logout,
    createTest,
    startTest,
    submitTest,
    deleteTest,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
