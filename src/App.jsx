import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import TaskDashboard from "./components/TaskDashboard";
import TaskDetails from "./components/TaskDetails";

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root path to /tasks */}
        <Route path="/" element={<Navigate to="/tasks" />} />

        {/* Task Dashboard */}
        <Route path="/tasks" element={<TaskDashboard />} />

        {/* Task Details */}
        <Route path="/tasks/:id" element={<TaskDetails />} />

        {/* 404 Not Found */}
        <Route path="*" element={<div className="text-center text-white p-6">404: Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
