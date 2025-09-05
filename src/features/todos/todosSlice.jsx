import { createSlice, nanoid } from '@reduxjs/toolkit';

const todosSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addTodo: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(text) {
        return {
          payload: {
            id: nanoid(),
            text,
            completed: false,
          },
        };
      },
    },
    deleteTodo(state, action) {
      return state.filter(todo => todo.id !== action.payload);
    },
    toggleTodo(state, action) {
      const todo = state.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    updateTodo(state, action) {
      const { id, newText } = action.payload;
      const todo = state.find(todo => todo.id === id);
      if (todo) {
        todo.text = newText;
      }
    },
    reorderTodos(state, action) {
      const { startIndex, endIndex } = action.payload;
      const [removed] = state.splice(startIndex, 1);
      state.splice(endIndex, 0, removed);
    },
  },
});

export const { addTodo, deleteTodo, toggleTodo, updateTodo, reorderTodos } = todosSlice.actions;

export default todosSlice.reducer;