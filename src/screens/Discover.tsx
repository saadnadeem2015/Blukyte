import { SafeAreaView, StyleSheet, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Text } from '../components/Text'

const Discover = () => {
    const navigation = useNavigation()
  return (
    <SafeAreaView>
      <Text onPress={() => navigation.navigate("Dashboard" as never)}>Discover</Text>
    </SafeAreaView>
  )
}

export default Discover

const styles = StyleSheet.create({})