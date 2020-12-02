import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppLoading } from "expo"
import * as Font from 'expo-font'

import { globalStyles } from "./styles/global"

const loadFont = async () => [
  await Font.loadAsync({
    "nunito-regular": require("./assets/fonts/Nunito-Regular.ttf"),
    "nunito-bold": require("./assets/fonts/Nunito-Bold.ttf"),
  })
]

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false)

  if (isLoaded) {
    return (
      <View style={globalStyles.container}>
        <Text style={globalStyles.titleText}>Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
      </View>
    );
  }
  else {
    return (
      <AppLoading
        startAsync={loadFont}
        onFinish={() => {setIsLoaded(true)}}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
