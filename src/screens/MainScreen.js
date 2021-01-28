import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, View, Image, FlatList, Dimensions } from 'react-native'
import AddTodo from '../components/AddTodo';
import Todo from '../components/Todo';
import NoItems from '../../assets/no-items.png';
import AppTextBold from '../components/ui/AppTextBold';
import { THEME } from '../theme';
import {ScreenContext} from '../context/screen/screenContext';
import {TodoContext} from '../context/todo/todo-context';

const MainScreen = () => {
  const { addTodo, todos, removeTodo } = useContext(TodoContext);
  const { changeScreen } = useContext(ScreenContext);

  const [deviceWidth, setDeviceWidth] = useState(Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2)

  useEffect(() => {
    const update = () => {
      const width = Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2;
      setDeviceWidth(width)
    };
    Dimensions.addEventListener('change', update)
    return () => Dimensions.removeEventListener('change', update)
  }, [])

  let content = (
    <View style={{ width: deviceWidth }}>
      <FlatList
        style={styles.scroll}
        data={todos}
        renderItem={({ item }) => (<Todo
          onOpen={changeScreen}
          onRemove={removeTodo}
          todo={item}
        />)}
        keyExtractor={(item) => item.id}
        ListFooterComponent={() => <AppTextBold> Total count: {todos.length}</AppTextBold>}
      />
    </View>
  )

  if (!todos.length) {
    content = <View
      style={styles.imgWrap}
    >
      <Image
        source={NoItems}
        style={styles.image}
        resizeMode='contain'
      />
    </View>
  }

  return (
    <View>
      <AddTodo onTodoAdd={addTodo} />
      {
        content
      }
    </View>
  )
}

export default MainScreen;

const styles = StyleSheet.create({
  scroll: {
    height: Dimensions.get('window').height - 190
  },
  imgWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    height: 300
  },
  image: {
    width: '100%',
    height: '100%'
  }
})
