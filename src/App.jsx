import { useState } from "react";
import { AppProvider, useApp } from "./context/AppContext";
import Auth from "./components/Auth";
import Dashboard from "./components/Dashboard";
import TestTaking from "./components/TestTaking";
import TestResults from "./components/TestResults";
import "./App.css";

const AppContent = () => {
  const { currentUser, tests, startTest } = useApp();
  const [currentView, setCurrentView] = useState("dashboard"); // 'dashboard', 'test-taking', 'results'
  const [selectedTestId, setSelectedTestId] = useState(null);

  if (!currentUser) {
    return <Auth />;
  }

  const handleStartTest = (testId) => {
    startTest(testId);
    setSelectedTestId(testId);
    setCurrentView("test-taking");
  };

  const handleViewResults = (testId) => {
    setSelectedTestId(testId);
    setCurrentView("results");
  };

  const handleTestComplete = (completedTest) => {
    setSelectedTestId(completedTest.id);
    setCurrentView("results");
  };

  const handleBackToDashboard = () => {
    setSelectedTestId(null);
    setCurrentView("dashboard");
  };

  const selectedTest = tests.find((t) => t.id === selectedTestId);

  if (currentView === "test-taking" && selectedTest) {
    return <TestTaking test={selectedTest} onComplete={handleTestComplete} />;
  }

  if (currentView === "results" && selectedTest) {
    return (
      <TestResults
        test={selectedTest}
        onBackToDashboard={handleBackToDashboard}
      />
    );
  }

  return (
    <Dashboard
      onStartTest={handleStartTest}
      onViewResults={handleViewResults}
    />
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
