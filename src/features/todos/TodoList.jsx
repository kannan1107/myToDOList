import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addTodo,
  deleteTodo,
  toggleTodo,
  updateTodo,
  reorderTodos, // We'll add this action to your slice
} from './todosSlice';

import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';


const TodoList = () => {
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();

  const [input, setInput] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editInput, setEditInput] = useState('');
  const [viewingTodo, setViewingTodo] = useState(null);

  const handleAdd = () => {
    if (input.trim()) {
      dispatch(addTodo(input));
      setInput('');
    }
  };

  const handleEdit = (id, text) => {
    setEditingId(id);
    setEditInput(text);
  };

  const handleUpdate = (id) => {
    dispatch(updateTodo({ id, newText: editInput }));
    setEditingId(null);
    setEditInput('');
  };

  const handleView = (todo) => {
    setViewingTodo(todo);
    alert(`Viewing Todo:\n\n${todo.text}\nCompleted: ${todo.completed ? 'Yes' : 'No'}`);
  };

  // Function to handle the end of a drag operation
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const { source, destination } = result;

    if (source.index === destination.index) {
      return;
    }

    dispatch(reorderTodos({
      startIndex: source.index,
      endIndex: destination.index,
    }));
  };

  return (
    <div className='p-4'>
      <h2 className='text-3xl font-bold mb-6 text-center text-gray-800'><b>Todo List</b></h2>

      <div className='flex justify-center items-center mb-6'>
        <input
          className='w-1/2 p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 shadow-sm'
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Enter new task"
        />
        <button
          className='ml-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-200'
          onClick={handleAdd}
        >
          Add
        </button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="todos">
          {(provided) => (
            <ul
              className='shadow-lg bg-white rounded-lg p-4 max-w-2xl mx-auto'
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {todos.map((todo, index) => (
                <Draggable key={todo.id} draggableId={todo.id} index={index}>
                  {(provided) => (
                    <li
                      className='bg-gray-100 p-4 mb-3 rounded-lg shadow-sm flex '
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {editingId === todo.id ? (
                        <div className='flex items-center w-full'>
                          <input
                            className='w-2/3 p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-green-500'
                            value={editInput}
                            onChange={e => setEditInput(e.target.value)}
                          />
                          <button
                            className='ml-3 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-200'
                            onClick={() => handleUpdate(todo.id)}
                          >
                            Save
                          </button>
                          <button
                            className='ml-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200'
                            onClick={() => setEditingId(null)}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className='flex items-center justify-between w-full'>
                          <span
                            onClick={() => dispatch(toggleTodo(todo.id))}
                            style={{
                              textDecoration: todo.completed ? 'line-through' : 'none',
                              cursor: 'pointer',
                            }}
                            className={`flex-grow text-lg ${todo.completed ? 'text-gray-500' : 'text-gray-800'}`}
                          >
                            {todo.text}
                          </span>
                          <div className='flex space-x-2'>
                            <button
                              className='px-3 py-1 bg-yellow-400 text-gray-800 rounded-md hover:bg-yellow-500 transition-colors duration-200'
                              onClick={() => handleEdit(todo.id, todo.text)}
                            >
                              ✏️ Edit
                            </button>
                            <button
                              className='px-3 py-1 bg-red-400 text-white rounded-md hover:bg-red-500 transition-colors duration-200'
                              onClick={() => dispatch(deleteTodo(todo.id))}
                            >
                              ❌ Remove
                            </button>
                            <button
                              className='px-3 py-1 bg-blue-400 text-white rounded-md hover:bg-blue-500 transition-colors duration-200'
                              onClick={() => handleView(todo)}
                            >
                              👁️ View
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
    </div>
  );
};

export default TodoList;