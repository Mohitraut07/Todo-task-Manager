import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeTodo, toggleComplete, updateTodo, reorderTodos } from "../features/todo/todoSlice";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Link } from "react-router-dom";

function Todos() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editDate, setEditDate] = useState("");
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);

  // Filtered Tasks Logic
  const filteredTodos = todos
    .filter((todo) => {
      switch (filter) {
        case "completed":
          return todo.completed;
        case "pending":
          return !todo.completed;
        case "overdue":
          return new Date(todo.date) < new Date() && !todo.completed;
        default:
          return true;
      }
    })
    .filter((todo) => todo.text.toLowerCase().includes(searchTerm.toLowerCase())); // Search filter

  const startEditing = (todo) => {
    setEditingId(todo.id);
    setEditText(todo.text);
    setEditDescription(todo.description);
    setEditDate(todo.date);
  };

  const saveEdit = () => {
    dispatch(updateTodo({ id: editingId, text: editText, description: editDescription, date: editDate }));
    setEditingId(null);
    setEditDate("");
    setEditText("");
    setEditDescription("");
  };

  const confirmDelete = (todo) => {
    setTodoToDelete(todo);
    setShowModal(true);
  };

  const deleteTodo = () => {
    if (todoToDelete) {
      dispatch(removeTodo(todoToDelete.id));
      setTodoToDelete(null);
      setShowModal(false);
    }
  };


  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return; 

    const reorderedTodos = Array.from(todos); 
    const [removed] = reorderedTodos.splice(source.index, 1); 
    reorderedTodos.splice(destination.index, 0, removed); 


    dispatch(reorderTodos(reorderedTodos));
  };

  return (
    <div className="container mx-auto p-6 bg-gray-900 text-white">
      <h2 className="text-3xl font-bold text-center mb-6">Your Todos</h2>

      {/* Search Input */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search by title..."
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 bg-gray-800 text-white border-gray-600"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

     {/* Filters */}
<div className="flex justify-center flex-wrap space-x-4 mb-6">
  {["all", "completed", "pending", "overdue"].map((type) => (
    <button
      key={type}
      onClick={() => setFilter(type)}
      className={`px-4 py-2 rounded-lg mb-2 sm:mb-0 ${
        filter === type
          ? "bg-indigo-500 text-white"
          : "bg-gray-700 text-gray-300 hover:bg-indigo-600"
      } transition-all duration-200`}
    >
      {type.charAt(0).toUpperCase() + type.slice(1)} Tasks
    </button>
  ))}
</div>


      {/* Drag-and-Drop Context */}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="todos">
          {(provided) => (
            <ul
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredTodos.map((todo, index) => (
              <Draggable key={todo.id} draggableId={todo.id} index={index}>
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`relative p-4 rounded-lg shadow-md border border-gray-700 bg-gray-800 transform transition-all hover:scale-105 hover:shadow-xl min-h-[250px] flex flex-col justify-between`}
                  >
                    {editingId === todo.id ? (
                      <div className="space-y-4 flex flex-col h-full">
                        {/* Title Input */}
                        <input
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
                          placeholder="Edit Title"
                        />
          
                        {/* Description Input */}
                        <textarea
                          value={editDescription}
                          onChange={(e) => setEditDescription(e.target.value)}
                          className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
                          placeholder="Edit Description"
                        />
          
                        {/* Date Input */}
                        <input
                          type="date"
                          value={editDate}
                          onChange={(e) => setEditDate(e.target.value)}
                          className="w-full p-2 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
          
                        {/* Buttons */}
                        <div className="flex space-x-2 mt-3">
                          <button
                            onClick={saveEdit}
                            className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="w-full bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col h-full justify-between">
                        <div>
                          {/* Date */}
                          <div className="text-sm text-gray-400 mb-2">{todo.date}</div>
          
                          {/* Title */}
                          <Link
                            to={`/tasks/${todo.id}`}
                            className="text-lg font-semibold text-indigo-500 hover:underline"
                          >
                            {todo.text}
                          </Link>
          
                          {/* Description */}
                          <p
                            className={`mt-2 text-gray-300 ${
                              todo.completed ? "line-through text-green-200" : ""
                            }`}
                          >
                            {todo.description}
                          </p>
                        </div>
          
                        {/* Action Buttons */}
                        <div className="mt-4 flex justify-between items-center space-x-2">
                          <button
                            onClick={() => dispatch(toggleComplete(todo.id))}
                            className={`text-white px-4 py-2 rounded ${
                              todo.completed
                                ? "bg-yellow-500 hover:bg-yellow-600"
                                : "bg-indigo-500 hover:bg-indigo-600"
                            }`}
                          >
                            {todo.completed ? "Undo" : "Complete"}
                          </button>
                          <button
                            onClick={() => startEditing(todo)}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => confirmDelete(todo)}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
          
          )}
        </Droppable>
      </DragDropContext>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-70 flex justify-center items-center">
          <div className="bg-gray-900 text-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this task?</p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={deleteTodo}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Delete
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Todos;
