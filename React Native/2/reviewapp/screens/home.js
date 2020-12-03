import React from 'react'
import { View, Text, Button } from 'react-native'
import { globalStyles } from "../styles/global"

export default function Home({ navigation, route }) {
  
  const navigate = () => {
    
    navigation.navigate("about")
  }

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.titleText}>Home screen</Text>
      <Button title="Navigate" onPress={navigate} />
    </View>
  )
}