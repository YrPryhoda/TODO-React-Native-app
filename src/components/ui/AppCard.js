import React from 'react'
import { StyleSheet, View } from 'react-native'

const AppCard = ({ children, style }) => (
  <View style={{ ...styles.default, ...style }}>
    {
      children
    }
  </View>
)


export default AppCard

const styles = StyleSheet.create({
  default: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderColor: '#fff',
    elevation: 3,
    borderWidth: 6,
    borderRadius: 7,
  }
})
