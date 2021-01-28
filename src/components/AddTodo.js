import React, { useState } from 'react'
import { StyleSheet, TextInput, View, Alert, Keyboard } from 'react-native'
import { THEME } from '../theme'
import { AntDesign } from '@expo/vector-icons';

const AddTodo = ({ onTodoAdd }) => {
  const [task, setTask] = useState('')

  const handleOnPress = () => {
    if (task.trim()) {
      onTodoAdd(task);
      setTask('')
      Keyboard.dismiss();
    } else {
      return Alert.alert('Todo is empty!')
    }
  }
   
  return (
    <View style={styles.wrapper}>
      <TextInput
        autoCorrect={false}
        onChangeText={setTask}
        value={task}
        placeholder='Put your todo here...'
        style={styles.input} />

      <AntDesign.Button
        onPress={handleOnPress}
        name='pluscircleo'>
        Add task
      </AntDesign.Button>

    </View>
  )
}

export default AddTodo

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15
  },
  input: {
    width: '60%',
    padding: 10,
    borderStyle: 'solid',
    borderBottomWidth: 2,
    borderBottomColor: THEME.MAIN_COLOR
  }
})
