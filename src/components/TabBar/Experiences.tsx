import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Text } from '../Text'

const Experiences = () => {
  return (
    <View style={styles.container}>
      <Text variant='subheading' style={{fontWeight:'600'}}>Experiences</Text>
    </View>
  )
}

export default Experiences

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:10
  }
})