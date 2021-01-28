import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from "../types";

const handlers = {
  [ADD_TODO]: (state, { payload }) => ({
    ...state,
    todos: [
      ...state.todos,
      payload
    ]
  }),

  [REMOVE_TODO]: (state, { payload }) => ({
    ...state,
    todos: state.todos.filter(el => el.id !== payload)
  }),

  [UPDATE_TODO]: (state, { payload }) => ({
    ...state,
    todos: state.todos.map(todo => {
      if (todo.id === payload.id) {
        todo.title = payload.title
      }
      return todo;
    })
  }),

  DEFAULT: state => state,
}

export const todoReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;

  return handler(state, action);
}