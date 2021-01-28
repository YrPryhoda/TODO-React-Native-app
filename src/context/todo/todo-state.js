import React, { useReducer, useContext } from 'react'
import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from '../types';
import { TodoContext } from './todo-context';
import { ScreenContext } from '../screen/screenContext'
import { todoReducer } from './todo-reducer';
import AppModalDelete from '../../components/ui/AppModalDelete';

const TodoState = ({ children }) => {

  const { changeScreen } = useContext(ScreenContext);

  const initialState = {
    todos: [
      { id: '1', title: 'Start noting' }
    ]
  };

  const [state, dispatch] = useReducer(todoReducer, initialState)

  const addTodo = title => dispatch({
    type: ADD_TODO,
    payload: {
      title,
      id: Date.now().toString()
    }
  })

  const removeTodo = id => {
    const element = state.todos.find(el => el.id === id);

    const confirmDelete = () => {
      changeScreen(null);
      return dispatch({
        type: REMOVE_TODO,
        payload: id
      })
    }

    AppModalDelete({ element, confirmDelete })
  }

  const updateTodo = (id, title) => dispatch({
    type: UPDATE_TODO,
    payload: {
      id,
      title
    }
  })

  return (
    <TodoContext.Provider value={{
      todos: state.todos,
      addTodo,
      removeTodo,
      updateTodo
    }}>
      { children}
    </TodoContext.Provider>
  )
}

export default TodoState
