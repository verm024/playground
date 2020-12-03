import React, { useState } from 'react'
import { View, Text, Button } from 'react-native'
import { globalStyles } from "../styles/global"
import axios from "axios"
import { AppLoading } from "expo"

export default function ReviewDetails({ navigation, route }) {
  const [anime, setAnime] = useState(null)

  React.useEffect(() => {
    async function fetch() {
      let res = await axios.get("https://api.jikan.moe/v3/anime/40748")
      setAnime({title: res.data.title})
      navigation.setOptions({
        title: res.data.title
      })
    }
    fetch()
  })

  const navigate = () => {
    navigation.navigate("about")
  }

  if (anime) {
    return (
      <View style={globalStyles.container}>
        <Text style={globalStyles.titleText}>{ route.params.id }</Text>
        <Text>{ anime.title }</Text>
        <Button title="Navigate about" onPress={navigate} />
      </View>
    )
  }
  else {
    return (
      <></>
    )
  }
}