import React, { useState, useContext } from 'react'
import { StyleSheet, View, Dimensions } from 'react-native'
import AppCard from '../components/ui/AppCard';
import EditModal from '../components/EditModal';
import { THEME } from '../theme';
import AppTextBold from '../components/ui/AppTextBold';
import AppButton from '../components/ui/AppButton'
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { TodoContext } from '../context/todo/todo-context';
import { ScreenContext } from '../context/screen/screenContext';

const TodoScreen = () => {
  const [modal, setModal] = useState(false);
  const { removeTodo, updateTodo, todos } = useContext(TodoContext);
  const { changeScreen, todoId } = useContext(ScreenContext);
  const todo = todos.find(el => el.id === todoId);
  const goBack = () => changeScreen(null);

  const saveHandler = (title) => {
    Promise.resolve(updateTodo(todo.id, title))
      .then(() => setModal(false));
  }

  return (
    <View>
      <EditModal
        visible={modal}
        onCancel={() => setModal(false)}
        onSave={saveHandler}
        value={todo.title}
      />

      <AppCard style={styles.card}>
        <AppTextBold style={styles.title}>
          {todo.title}
        </AppTextBold>
        <AppButton
          onPress={() => setModal(true)}
        >
          <FontAwesome name='edit' size={20} />
        </AppButton>
      </AppCard>

      <View style={styles.btnWrapper}>
        <View style={styles.button}>
          <AppButton
            onPress={goBack}
            color={THEME.GREY_COLOR} >
            <AntDesign name='back' size={20} color='#fff' />
          </AppButton>
        </View>
        <View style={styles.button}>
          <AppButton
            onPress={() => removeTodo(todo.id)}
            color={THEME.DANGER_COLOR}
          >
            <FontAwesome name='remove' size={20} color='#fff' />
          </AppButton>
        </View>

      </View>
    </View>
  )
}

export default TodoScreen

const styles = StyleSheet.create({
  btnWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    width: Dimensions.get('window').width / 3
  },
  card: {
    marginBottom: 20
  },
  title: {
    fontSize: 20
  }
})
