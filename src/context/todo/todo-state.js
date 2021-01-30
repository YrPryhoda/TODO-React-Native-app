import React, { useReducer, useContext } from 'react'
import { ADD_TODO, CLEAR_ERROR, FETCH_TODOS, HIDE_LOADER, REMOVE_TODO, SHOW_ERROR, SHOW_LOADER, UPDATE_TODO } from '../types';
import { TodoContext } from './todo-context';
import { ScreenContext } from '../screen/screenContext'
import { todoReducer } from './todo-reducer';
import AppModalDelete from '../../components/ui/AppModalDelete';
import { Http } from '../../http';

const TodoState = ({ children }) => {

  const { changeScreen } = useContext(ScreenContext);

  const initialState = {
    todos: [],
    loading: false,
    error: null
  };

  const [state, dispatch] = useReducer(todoReducer, initialState)

  const showLoader = () => dispatch({
    type: SHOW_LOADER
  });

  const hideLoader = () => dispatch({
    type: HIDE_LOADER
  })

  const showError = error => dispatch({
    type: SHOW_ERROR,
    error
  })

  const clearError = () => dispatch({
    type: CLEAR_ERROR
  })

  const fetchTodos = async () => {
    clearError();
    showLoader();

    try {
      const data = await Http.get('/todos.json');

      const todos = data ? Object.entries(data).map(([key, value]) => ({ ...value, id: key })) : []

      dispatch({
        type: FETCH_TODOS,
        payload: todos
      });

    } catch (error) {
      showError('Something goes wrong!')
      console.log(error);
    } finally {
      hideLoader();
    }
  }

  const addTodo = async title => {
    const data = await Http.post('/todos.json', { title });

    dispatch({
      type: ADD_TODO,
      payload: {
        title,
        id: data.name
      }
    })
  }

  const removeTodo = id => {
    const element = state.todos.find(el => el.id === id);

    const confirmDelete = async () => {
      changeScreen(null);

      try {
        await Http.delete(`/todos/${id}.json`)

        return dispatch({
          type: REMOVE_TODO,
          payload: id
        })

      } catch (error) {
        showError('Something goes wrong!')
      }
    }

    AppModalDelete({ element, confirmDelete })
  }

  const updateTodo = async (id, title) => {
    clearError();
    try {
      await Http.patch(`/todos/${id}.json`, { title });

      dispatch({
        type: UPDATE_TODO,
        payload: {
          id,
          title
        }
      })

    } catch (error) {
      showError('Update error');
    }
  }

  return (
    <TodoContext.Provider value={{
      todos: state.todos,
      loading: state.loading,
      error: state.error,
      addTodo,
      removeTodo,
      updateTodo,
      fetchTodos
    }}>
      { children}
    </TodoContext.Provider>
  )
}

export default TodoState
