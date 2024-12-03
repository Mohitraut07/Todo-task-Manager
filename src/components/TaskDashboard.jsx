import React from "react";
import Todos from "./Todos"; 
import AddTodo from "./AddTodo";

function TaskDashboard() {
  return (
    <div className="bg-gray-900 min-h-screen py-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl">
      <h1 className="text-3xl font-bold text-center mb-8 text-white">Task Management Dashboard</h1>


      <div className="mb-8">
        <AddTodo />
      </div>

      <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
        <Todos />
      </div>
      </div>
    </div>
  );
}

export default TaskDashboard;
