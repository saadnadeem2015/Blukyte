import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Text } from '../Text'

const Tasks = () => {
  return (
    <View style={styles.container}>
      <Text variant='subheading' style={{fontWeight:'600'}}>Tasks</Text>
    </View>
  )
}

export default Tasks

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:10
  }
})