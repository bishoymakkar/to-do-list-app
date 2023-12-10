// reducers/todoReducer.js
const initialState = {
  todos: [],
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TODOS':
      return {...state, todos: action.payload};
    case 'ADD_TODO':
      return {...state, todos: [...state.todos, action.payload]};
    case 'TOGGLE_TODO_STATUS':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? {...todo, completed: !todo.completed}
            : todo,
        ),
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };
    case 'SET_TODOS':
      return {...state, todos: action.payload};
    default:
      return state;
  }
};

export default todoReducer;
