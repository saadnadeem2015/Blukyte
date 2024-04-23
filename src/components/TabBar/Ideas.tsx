import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Text } from '../Text'

const Ideas = () => {
  return (
    <View style={styles.container}>
      <Text variant='subheading' style={{fontWeight:'600'}}>Ideas</Text>
    </View>
  )
}

export default Ideas

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:10
  }
})