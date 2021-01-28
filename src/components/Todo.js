import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import AppText from './ui/AppText';

const Todo = ({ todo, onRemove, onOpen }) => {

  const longPressHandler = () => {
    onRemove(todo.id)
  }
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => onOpen(todo.id)}
      onLongPress={longPressHandler}
      style={styles.todo}
    >
      <AppText>{todo.title}</AppText>
    </TouchableOpacity>
  )
}

export default Todo

const styles = StyleSheet.create({
  todo: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 5,
    marginBottom: 10
  }
})
