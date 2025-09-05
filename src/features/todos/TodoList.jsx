import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addTodo,
  deleteTodo,
  toggleTodo,
  updateTodo,
} from './todosSlice';



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

  return (
    <div>
      <h2 className='text-xl '><center><b>Todo List</b></center></h2>

      <input className='w-[400px] h-[30px]  border-1 border-gray-700 focus:border-pink-600  '
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Enter new task"
      />
      <button className='bg-indigo-500 w-[100px] h-[30px] shadow-gray-400 rounded-full ' onClick={handleAdd}>Add</button>

     <div className=' shadow-xl/30 bg-gray-100 p-5 m-5 '>
         <ul >
        {todos.map(todo => (
          <li className=' bg-gray-200 p-10 m-10' key={todo.id} >
            {editingId === todo.id ? (
              <>
                <input className='w-[350px] h-[30px] border-2 border-gray-700'
                  value={editInput}
                  onChange={e => setEditInput(e.target.value)}
                />
                <button className='bg-indigo-500 m-5 w-[100px] h-[30px] shadow-gray-400 rounded-full ' onClick={() => handleUpdate(todo.id)}>Save</button>
                <button className='bg-indigo-500 m-5 w-[100px] h-[30px] shadow-gray-400 rounded-full ' onClick={() => setEditingId(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span
                  onClick={() => dispatch(toggleTodo(todo.id))}
                  style={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    cursor: 'pointer',
                    marginRight: '10px',
                  }}
                >
                  {todo.text}
                </span>
                <button className=' m-5 w-[100px] h-[30px] shadow-gray-400 rounded-full ' onClick={() => handleEdit(todo.id, todo.text)}>✏️ Edit</button>
                <button className=' m-5 w-[100px] h-[30px] shadow-gray-400 rounded-full ' onClick={() => dispatch(deleteTodo(todo.id))}>❌ Remove</button>
                <button className=' m-5 w-[100px] h-[30px] shadow-gray-400 rounded-full ' onClick={() => handleView(todo)}>👁️ View</button>
              </>
            )}
          </li>
        ))}
      </ul>
     </div>
    </div>
  );
};

export default TodoList;
