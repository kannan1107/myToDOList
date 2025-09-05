import { createSlice } from '@reduxjs/toolkit';

let nextId = 1;

const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push({
        id: nextId++,
        text: action.payload,
        completed: false,
      });
    },
    toggleTodo: (state, action) => {
      const todo = state.find(t => t.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },
    deleteTodo: (state, action) => {
      return state.filter(t => t.id !== action.payload);
    },
    updateTodo: (state, action) => {
      const { id, newText } = action.payload;
      const todo = state.find(t => t.id === id);
      if (todo) todo.text = newText;
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo, updateTodo } = todosSlice.actions;
export default todosSlice.reducer;
