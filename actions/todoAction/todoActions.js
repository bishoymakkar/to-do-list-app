// actions/todoActions.js
export const addTodo = todo => {
  return {
    type: 'ADD_TODO',
    payload: todo,
  };
};

export const toggleTodoStatus = id => {
  return {
    type: 'TOGGLE_TODO_STATUS',
    payload: id,
  };
};

export const deleteTodo = id => {
  return {
    type: 'DELETE_TODO',
    payload: id,
  };
};

export const setTodos = todos => {
  return {
    type: 'SET_TODOS',
    payload: todos,
  };
};
