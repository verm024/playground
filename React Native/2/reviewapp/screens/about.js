import React from 'react'
import { View, Text, Button } from 'react-native'
import { globalStyles } from "../styles/global"

export default function About({ navigation }) {
  const navigate = () => {
    navigation.navigate("reviewdetails", {id: "Hello wkwkwk"})
  }

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.titleText}>About screen</Text>
      <Button title="Navigate" onPress={navigate} />
    </View>
  )
}