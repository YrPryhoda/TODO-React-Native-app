import { Alert } from 'react-native'

const AppModalDelete = ({ element, confirmDelete}) => {

  return (
    Alert.alert(
      'Delete element',
      `Are you sure to delete ${element.title} ?`,
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Apply',
          style: 'destructive',
          onPress: confirmDelete
        }
      ],
      { cancelable: false }
    )

  )
}

export default AppModalDelete
