import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { AppLoading } from "expo";
import firebase from "./firebase"

export default function App() {
  const [names, setNames] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [test, setTest] = useState([
    {
      name: "Halo",
      key: "1",
    },
    {
      name: "WKWK",
      key: "2",
    },
  ]);

  useEffect(() => {
    async function fetch() {
      let data = [];
      let docs = await firebase.db.collection("tests").get();
      docs.forEach((element) => {
        let temp = element.data();
        temp.id = element.id;
        data.push(temp);
      });
      setNames(data);
    }
    fetch();
    setIsLoaded(true);
  }, [names.length]);

  if (isLoaded) {
    return (
      <View style={styles.container}>
        <Text>Test</Text>
        {names && (
          <FlatList
            data={names}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Text>{item.name}</Text>}
          />
        )}
      </View>
    );
  } else {
    return <></>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
