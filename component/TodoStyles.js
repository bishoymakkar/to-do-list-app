import {StyleSheet, Dimensions} from 'react-native';

let width = Dimensions.get('window').width;

const TodoStyles = {
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  mainInput: {
    borderWidth: 1,
    height: 55,
    width: width * 0.9,
    padding: 10,
    margin: 10,
    alignItems: 'center',
    color: 'black',
    borderRadius: 9,
  },
  todoList: {
    borderWidth: 1,
    borderRadius: 10,
    width: width * 0.7,
    padding: 8,
  },
  todoView: {
    flexDirection: 'row',
    margin: 10,
    padding: 5,
  },
  removeTodo: {
    backgroundColor: 'red',
    borderRadius: 4,
    alignItems: 'center',
    alignSelf: 'center',
    padding: 8,
    margin: 4,
  },
};
export const styles = StyleSheet.create(TodoStyles);
