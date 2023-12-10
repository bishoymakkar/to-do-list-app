import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Alert,
  Button,
  FlatList,
  TextInput,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {styles} from './TodoStyles';
import {AddTodo, RemoveTodo} from '../actions/todoAction/todoActions';

const Todo = () => {
  const dispatch = useDispatch();
  const data = useSelector(state => state);

  const [todoValue, setTodoValue] = useState('');
  const todos = data.todos.todos;

  useEffect(() => {
    AsyncStorage.getItem('todos').then(todosAsync => {
      const todosJson = JSON.parse(todosAsync);
      if (todosJson && todosJson.length > 0) {
        todosJson.forEach(element => {
          dispatch(AddTodo(element));
        });
      }
    });
  }, [dispatch]);

  const addTodo = () => {
    if (todoValue && !todos.includes(todoValue)) {
      dispatch(AddTodo(todoValue));
      AsyncStorage.setItem('todos', JSON.stringify([todoValue, ...todos]));
      setTodoValue('');
    } else {
      if (!todoValue) {
        Alert.alert('Please add valid value');
      } else {
        Alert.alert(`${todoValue} already added in Todo List`);
      }
    }
  };

  const removeTodo = item => {
    const todoIndex = todos.indexOf(item);
    if (todoIndex > -1) {
      dispatch(RemoveTodo(item));
      AsyncStorage.setItem('todos', JSON.stringify(todos));
    } else {
      Alert.alert(`${todoValue} is not in the Todo List`);
    }
  };

  const renderTodoList = () => {
    return (
      <FlatList
        data={todos}
        renderItem={({item}) => (
          <View style={styles.todoView}>
            <View style={styles.todoList}>
              <Text>{item}</Text>
            </View>
            <TouchableOpacity
              style={styles.removeTodo}
              onPress={() => removeTodo(item)}>
              <Text> Delete </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    );
  };

  return (
    <View style={styles.main}>
      <TextInput
        style={styles.mainInput}
        onChangeText={setTodoValue}
        placeholder={'Add your todo here'}
        placeholderTextColor="black"
        value={todoValue}
      />
      <Button
        color={'green'}
        name="increase"
        title="Add Todo"
        onPress={addTodo}
      />

      <Text style={{alignSelf: 'stretch', paddingLeft: 40}}>
        List of Todos :
      </Text>
      {renderTodoList()}
    </View>
  );
};

export default Todo;
