// TodoContext.js
import React, {createContext, useContext, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setTodos} from '../actions/todoAction/todoActions';

const TodoContext = createContext();

export const useTodoContext = () => {
  return useContext(TodoContext);
};

export const TodoProvider = ({children}) => {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos);

  useEffect(() => {
    // Load todos from AsyncStorage on component mount
    const loadTodos = async () => {
      try {
        const storedTodos = await AsyncStorage.getItem('todos');
        if (storedTodos) {
          dispatch(setTodos(JSON.parse(storedTodos)));
        }
      } catch (error) {
        console.error('Error loading todos from AsyncStorage:', error);
      }
    };

    loadTodos();
  }, [dispatch]);

  useEffect(() => {
    // Save todos to AsyncStorage whenever they change
    const saveTodos = async () => {
      try {
        await AsyncStorage.setItem('todos', JSON.stringify(todos));
      } catch (error) {
        console.error('Error saving todos to AsyncStorage:', error);
      }
    };

    saveTodos();
  }, [todos]);

  return (
    <TodoContext.Provider value={{todos}}>{children}</TodoContext.Provider>
  );
};
