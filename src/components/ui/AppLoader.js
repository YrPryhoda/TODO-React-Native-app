import React from 'react'
import { StyleSheet, ActivityIndicator, View } from 'react-native'
import { THEME } from '../../theme';

const AppLoader = () => {
  return (
    <View style={styles.loader}>
      <ActivityIndicator size="large" color={THEME.MAIN_COLOR} />
    </View>
  )
}

export default AppLoader
  
const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
}) 
