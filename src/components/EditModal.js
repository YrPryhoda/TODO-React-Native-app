import React, { useState } from 'react'
import { StyleSheet, TextInput, View, Modal, Alert } from 'react-native'
import { THEME } from '../theme'
import AppButton from './ui/AppButton';

const EditModal = ({ visible, onCancel, value, onSave }) => {

  const [inputVal, setInput] = useState(value);

  const cancel = () => {
    setInput(value);
    onCancel();
  }

  const saveHandler = () => {
    const minLength = 3;
    const currentLength = inputVal.trim().length;
    if (currentLength < minLength) {
      Alert.alert('Error', `Minimal title length must be ${minLength} but you have ${currentLength}`)
    } else {
      onSave(inputVal)
    }
  }

  return (
    <Modal
      visible={visible}
      animationType='fade'
    >
      <View style={styles.wrap}>
        <TextInput
          style={styles.input}
          placeholder='Enter todo title'
          autoCapitalize='none'
          autoCorrect={false}
          maxLength={64}
          value={inputVal}
          onChangeText={setInput}
        />

        <View style={styles.btnBlock}>
          <AppButton
            color={THEME.DANGER_COLOR}
            onPress={cancel}
          >
            Cancel
          </AppButton>

          <AppButton
            onPress={saveHandler}
          >
            Apply
          </AppButton>
        </View>
      </View>
    </Modal>
  )
}

export default EditModal

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnBlock: {
    width: '100%',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  input: {
    padding: 10,
    borderBottomColor: THEME.MAIN_COLOR,
    borderBottomWidth: 2,
    width: '80%',
  }
})
