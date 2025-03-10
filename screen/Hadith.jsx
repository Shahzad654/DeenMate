import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS } from "../styles/GlobalStyle";
import { Appbar } from "react-native-paper";
import axios from "axios";

export default function Hadith({ navigation }) {
  const [hadithData, setHadithData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHadith = async () => {
      try {
        const response = await axios.get(
          "https://hadithapi.com/api/hadiths/?apiKey=$2y$10$4dJh1qop0m8tSjzoJncew2uS31MRs7pDZkdYQs5jW53xe112"
        );

        if (response.data?.hadiths?.data) {
          setHadithData(response.data.hadiths.data);
        } else {
          throw new Error("Invalid API response");
        }
      } catch (error) {
        console.error("Error fetching Hadith:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHadith();
  }, []);

  const renderHadith = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.arabicText}>{item.hadithArabic}</Text>
      <Text style={styles.urduText}>{item.urduNarrator}</Text>
      <Text style={styles.urduText}>{item.hadithUrdu}</Text>
      <Text style={styles.englishText}>{item.englishNarrator}</Text>
      <Text style={styles.englishText}>{item.hadithEnglish}</Text>
      <Text style={styles.statusText}>{item.status}</Text>
      <Text style={styles.bookSlug}>{item.bookSlug}</Text>
    </View>
  );

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView style={{ flex: 1 }}>
        <Appbar.Header style={styles.appbarHeader}>
          <Appbar.BackAction
            onPress={() => navigation.goBack()}
            color="white"
          />
          <Appbar.Content title="Hadith" color="white" />
          <Appbar.Action icon="book" color="white" />
        </Appbar.Header>

        {loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        ) : (
          <FlatList
            data={hadithData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderHadith}
            contentContainerStyle={styles.listContainer}
          />
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  appbarHeader: {
    backgroundColor: COLORS.primary,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    paddingVertical: 10,
  },
  card: {
    backgroundColor: "white",
    marginHorizontal: 16,
    padding: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 10,
  },
  arabicText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  urduText: {
    fontSize: 16,
    textAlign: "right",
    marginBottom: 5,
  },
  englishText: {
    fontSize: 14,
    color: COLORS.primary,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "gray",
    marginBottom: 3,
  },
  bookSlug: {
    fontSize: 14,
    fontWeight: "bold",
    color: "gray",
  },
});
