import React, { useState } from 'react';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import MainLayout from './src/MainLayout';
import TodoState from './src/context/todo/todo-state';
import ScreenState from './src/context/screen/ScreenState';


export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
      'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf')
    })
  };

  return !fontsLoaded ? (
    <AppLoading
      startAsync={loadFonts}
      onFinish={() => setFontsLoaded(true)}
      onError={err => console.log(err)}
    />
  ) : (
      <ScreenState>
        <TodoState>
          <MainLayout />
        </TodoState>
      </ScreenState>
    )
}