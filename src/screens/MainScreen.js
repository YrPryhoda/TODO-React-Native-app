import React, { useState, useEffect, useContext, useCallback } from 'react'
import { StyleSheet, View, Image, FlatList, Text, Dimensions } from 'react-native'
import AddTodo from '../components/AddTodo';
import Todo from '../components/Todo';
import NoItems from '../../assets/no-items.png';
import AppTextBold from '../components/ui/AppTextBold';
import { THEME } from '../theme';
import { ScreenContext } from '../context/screen/screenContext';
import { TodoContext } from '../context/todo/todo-context';
import AppLoader from '../components/ui/AppLoader';
import AppButton from '../components/ui/AppButton';

const MainScreen = () => {
  const { addTodo, todos, removeTodo, fetchTodos, loading, error } = useContext(TodoContext);
  const { changeScreen } = useContext(ScreenContext);

  const [deviceWidth, setDeviceWidth] = useState(Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2)

  const loadTodos = useCallback(async () => await fetchTodos(), [fetchTodos])

  useEffect(() => {
    loadTodos()
  }, [])

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

  if (error) {
    return (<View style={styles.errorWrap}>
      <Text style={styles.error}>
        {error}
      </Text>
      <AppButton onPress={loadTodos}>
        Try again
      </AppButton>
    </View>) 
  }

  if (loading) {
    return <AppLoader />
  }
  if (!todos.length) {
    content = <View
      style={styles.imgWrap}
    >
      <Image
        source={NoItems}
        style={styles.image}
        resizeMode='contain'
      />
      <Text style={styles.emptyText}>
        You do not have tasks to do
      </Text>
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
    width: '70%',
    height: '70%' 
  },
  emptyText: {
    marginVertical: 10,
    fontSize: 24,
    color: THEME.MAIN_COLOR
  },
  errorWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  error: {
    fontSize: 20,
    color: THEME.DANGER_COLOR,
    marginBottom: 10
  }
})
