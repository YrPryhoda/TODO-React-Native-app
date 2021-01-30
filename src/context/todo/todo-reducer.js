import { ADD_TODO, CLEAR_ERROR, FETCH_TODOS, HIDE_LOADER, REMOVE_TODO, SHOW_ERROR, SHOW_LOADER, UPDATE_TODO } from "../types";

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

  [SHOW_LOADER]: state => ({
    ...state,
    loading: true
  }),

  [HIDE_LOADER]: state => ({
    ...state,
    loading: false
  }),

  [CLEAR_ERROR]: state => ({
    ...state,
    error: null
  }),

  [SHOW_ERROR]: (state, { error }) => ({
    ...state,
    error
  }),

  [FETCH_TODOS]: (state, { payload }) => ({
    ...state,
    todos: payload
  }),

  DEFAULT: state => state,
}


export const todoReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;

  return handler(state, action);
}