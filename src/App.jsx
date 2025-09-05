import React from 'react';
import TodoList from './features/todos/TodoList';

const App = () => {
  return (
    <div className='m-4 p-4'>
      <h1 className='text-2xl'><center><b><i>My Daily Todo List</i></b></center></h1>
      <TodoList />
    </div>
  );
};

export default App;
