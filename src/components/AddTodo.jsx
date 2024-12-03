import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todo/todoSlice";

function AddTodo() {
  const [input, setInput] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const dispatch = useDispatch();

  const addTodoHandler = (e) => {
    e.preventDefault();
    dispatch(addTodo({ text: input, description, date: date || new Date().toISOString().split("T")[0] }));
    setInput("");
    setDescription("");
    setDate("");
  };

  return (
    <form
      onSubmit={addTodoHandler}
      className="flex flex-wrap gap-4 items-center justify-center bg-gray-800 shadow-md rounded-lg p-6 max-w-4xl mx-auto"
    >
      <input
        type="text"
        className="flex-1 min-w-[200px] bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 py-2 px-4 outline-none transition-all duration-200"
        placeholder="Enter a Todo..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <input
        type="text"
        className="flex-1 min-w-[200px] bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 py-2 px-4 outline-none transition-all duration-200"
        placeholder="Enter a Description..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="date"
        className="flex-1 min-w-[200px] bg-gray-700 text-white rounded-lg border border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 py-2 px-4 outline-none transition-all duration-200"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <button
        type="submit"
        className="bg-indigo-500 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-indigo-600 transition-all duration-200"
      >
        Add Todo
      </button>
    </form>
  );
}

export default AddTodo;
