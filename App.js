// App.js
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import TodoList from './component/TodoList';
import {TodoProvider} from './reducers/TodoContext';
import {Provider} from 'react-redux';
import store from './store';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <TodoProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="TodoList" component={TodoList} />
          </Stack.Navigator>
        </NavigationContainer>
      </TodoProvider>
    </Provider>
  );
};

export default App;
