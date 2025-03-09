import { View, Text, SafeAreaView, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "../styles/GlobalStyle";
import { Appbar } from "react-native-paper";
import axios from "axios";

const AlAsma = ({ navigation }) => {
  const [names, setNames] = useState([]);


  useEffect(() => {
    const fetchNames = async () => {
      try {
        const response = await axios.get(
          "https://api.islamicdevelopers.com/v1/al-asma-ul-husna"
        );

        if (response.data) {
         
          const namesArray = Object.values(response.data);
          setNames(namesArray);
        } else {
          throw new Error("Invalid API response");
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchNames();
  }, []);

  
  const renderNameItem = ({ item, index }) => (
    <View style={styles.itemContainer}>
        <View style={styles.indexContainer}>
        <Text style={styles.indexText}>{index + 1}</Text>
        </View>
      <Text style={styles.arabicText}>{item.native}</Text>
      <Text style={styles.latinText}>{item.latin}</Text>
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView>
        <Appbar.Header style={styles.appbarHeader}>
          <Appbar.BackAction onPress={() => navigation.goBack()} color="white" />
          <Appbar.Content title="Al Asma" color="white" />
          <Appbar.Action icon="book" color="white" />
        </Appbar.Header>
      </SafeAreaView>

      <FlatList
        data={names}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderNameItem} 
      />
    </View>
  );
};

export default AlAsma;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  appbarHeader: {
    backgroundColor: COLORS.primary,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  indexContainer: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    justifyContent: "center", 
    alignItems: "center",

  },
  indexText: {
    fontSize: 18,
    fontWeight: "bold",
    color: 'white', 
    
  },
  arabicText: {
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
    textAlign: "right",
  },
  latinText: {
    fontSize: 18,
    color: "gray",
    flex: 1,
    textAlign: "left",
    marginLeft: 10
  },
});
