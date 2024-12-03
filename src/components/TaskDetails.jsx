import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function TaskDetails() {
  const { id } = useParams(); 
  const todos = useSelector((state) => state.todos);
  const navigate = useNavigate(); 


  // console.log("Task ID from URL:", id);
  // console.log("All Todos:", todos);

  const task = todos.find((todo) => todo.id === id);

  if (!task) {
    return <div className="text-white text-center">Task not found</div>;
  }

  
  const goBack = () => {
    navigate("/tasks");
  };

  return (
    <div className="bg-gray-900 min-h-screen py-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl">
        <h1 className="text-3xl font-bold text-center text-indigo-500 mb-6">Task Details</h1>

        <div className="bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
          <h2 className="text-xl font-semibold text-white">{task.text}</h2>
          <p className="text-sm text-gray-400">{task.date}</p>
          <p className="mt-4 text-gray-300">{task.description}</p>
          <p className="mt-4 text-sm text-white-100">
            Status:{" "}
            <span
              className={task.completed ? "text-green-500" : "text-red-500"}
            >
              {task.completed ? "Completed" : "Pending"}
            </span>
          </p>

          {/* Back to Tasks Button */}
          <div className="flex justify-center mt-6">
            <button
              onClick={goBack}
              className="bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-600 transition duration-300"
            >
              Back to Tasks
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TaskDetails;
