import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import TaskDashboard from "./components/TaskDashboard";

import TaskDetails from "./components/TaskDetails"; // Import the TaskDetails component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/tasks"  />} />
        <Route path="/tasks" element={<TaskDashboard />} />
        <Route path="/tasks/:id" element={<TaskDetails />} /> {/* Task Details Page */}
      </Routes>
    </Router>
  );
}

export default App;
