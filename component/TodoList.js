// TodoList.js
import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Button,
} from 'react-native';
import {useDispatch} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {useTodoContext} from '../reducers/TodoContext';
import {
  addTodo,
  toggleTodoStatus,
  deleteTodo,
} from '../actions/todoAction/todoActions';

const TodoList = () => {
  const dispatch = useDispatch();
  const {todos} = useTodoContext();
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newTodoDescription, setNewTodoDescription] = useState('');

  const handleAddTodo = () => {
    if (newTodoTitle.trim() !== '') {
      const newTodo = {
        id: String(Math.random()), // Replace with a proper ID generation method
        title: newTodoTitle,
        description: newTodoDescription,
        completed: false,
      };

      dispatch(addTodo(newTodo));

      // Clear input fields after adding a new todo
      setNewTodoTitle('');
      setNewTodoDescription('');
    }
  };

  const handleToggleTodoStatus = id => {
    dispatch(toggleTodoStatus(id));
  };

  const handleDeleteTodo = id => {
    dispatch(deleteTodo(id));
  };

  return (
    <View>
      <View style={styles.addTodoContainer}>
        <TextInput
          style={styles.input}
          placeholderTextColor="gray"
          placeholder="New Todo Title"
          value={newTodoTitle}
          onChangeText={setNewTodoTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="New Todo Description"
          placeholderTextColor="gray"
          value={newTodoDescription}
          onChangeText={setNewTodoDescription}
        />
        <Button title="Add Todo" onPress={handleAddTodo} />
      </View>
      <FlatList
        data={todos}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.todoItem}>
            <TouchableOpacity onPress={() => handleToggleTodoStatus(item.id)}>
              <FontAwesome
                name={item.completed ? 'check-square-o' : 'square-o'}
                size={24}
                color={item.completed ? 'green' : 'black'}
              />
            </TouchableOpacity>
            <View style={{marginLeft: 10, flex: 1}}>
              <Text style={styles.title}>{item.title}</Text>
              {item.description && (
                <Text style={styles.description}>{item.description}</Text>
              )}
            </View>
            <TouchableOpacity onPress={() => handleDeleteTodo(item.id)}>
              <FontAwesome name="trash-o" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  addTodoContainer: {
    margin: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: 'black',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  description: {
    color: 'gray',
  },
});

export default TodoList;
