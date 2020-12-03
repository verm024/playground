import React from "react"
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from "@react-navigation/native"

import Home from "../screens/home"
import ReviewDetails from "../screens/reviewdetails"
import About from "../screens/about"

const { Navigator, Screen } = createStackNavigator()

const HomeNavigator = () => (
  <Navigator onStateChange={(state) => {
    console.log(state)
  }}>
    <Screen name="home" component={Home} />
    <Screen name="reviewdetails" component={ReviewDetails} />
    <Screen name="about" component={About} />
  </Navigator>
)

export const AppNavigator = () => (
  <NavigationContainer>
    <HomeNavigator />
  </NavigationContainer>
)