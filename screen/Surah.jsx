import { View, Text, StyleSheet, SafeAreaView, ScrollView, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { Appbar } from "react-native-paper";
import { COLORS } from "../styles/GlobalStyle";
import axios from "axios";

export default function Surah({ route, navigation }) {
  const { surahNo, surah } = route.params;
  const [surahData, setSurahData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSurah = async () => {
      try {
        const response = await axios.get(
          `https://quranapi.pages.dev/api/${surahNo}.json`
        );
        if (response.data) {
          setSurahData(response.data);
        } else {
          throw new Error("Invalid API response");
        }
      } catch (error) {
        console.log("Error fetching Surah data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSurah();
  }, [surahNo]);

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView style={{ flex: 1 }}>
        <Appbar.Header style={styles.appbarHeader}>
          <Appbar.BackAction onPress={() => navigation.goBack()} color="white" />
          <Appbar.Content title={surah.surahName} color="white" />
        </Appbar.Header>

        {loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        ) : (
          <>
            <View style={styles.surahInfoContainer}>
              <Text style={styles.surahInfoText}>
                {surahData.revelationPlace} • {surahData.totalAyah} Ayahs
              </Text>
            </View>
            <ScrollView contentContainerStyle={styles.contentContainer}>
              {surahData?.arabic1.map((ayah, index) => (
                <Text key={index} style={styles.surahText}>
                  {ayah} {" "}  
                  <Text style={styles.ayahNumber}>({index + 1})</Text>  
                  {"\n"}
                </Text>
              ))}
            </ScrollView>
          </>
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
  surahInfoContainer: {
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: COLORS.primary,
    marginHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  surahInfoText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  loaderContainer: {
    flex: 1, 
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    padding: 20,
  },
  surahText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "right",
    lineHeight: 40,
    paddingVertical: 8,
  },
  ayahNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
  },
});
