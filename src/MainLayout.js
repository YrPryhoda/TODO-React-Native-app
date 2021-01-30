import React, { useContext } from 'react'
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native'
import Navbar from './components/Navbar';
import { THEME } from './theme';
import MainScreen from './screens/MainScreen';
import TodoScreen from './screens/TodoScreen';
import { ScreenContext } from './context/screen/screenContext';


const MainLayout = () => {
  const { todoId } = useContext(ScreenContext)

  return (
    <View style={styles.app}>
      <Navbar title='Todo App' />
      <View style={styles.content}>
        {!todoId ? <MainScreen /> : <TodoScreen />}
      </View>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  app: {
    flex: 1
  },
  content: {
    flex: 1,
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingVertical: 20
  }
});


export default MainLayout
