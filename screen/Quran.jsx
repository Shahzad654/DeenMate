import {
  View,
  Text,
  SafeAreaView,
  VirtualizedList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { COLORS } from "../styles/GlobalStyle";
import { Appbar } from "react-native-paper";
import axios from "axios";

export default function Quran({ navigation }) {
  const [quranData, setQuranData] = useState([]);
  const [loading, setLoading] = useState(true);

  const surahMapping = {
    "Al-Faatiha": 1,
    "Al-Baqara": 2,
    "Aal-E-Imran": 3,
    "An-Nisaa": 4,
    "Al-Maaida": 5,
    "Al-An'aam": 6,
    "Al-A'raaf": 7,
    "Al-Anfaal": 8,
    "At-Tawba": 9,
    Yunus: 10,
    Hud: 11,
    Yusuf: 12,
    "Ar-Ra'd": 13,
    Ibrahim: 14,
    "Al-Hijr": 15,
    "An-Nahl": 16,
    "Al-Israa": 17,
    "Al-Kahf": 18,
    Maryam: 19,
    "Taa-Haa": 20,
    "Al-Anbiyaa": 21,
    "Al-Hajj": 22,
    "Al-Muminoon": 23,
    "An-Noor": 24,
    "Al-Furqaan": 25,
    "Ash-Shu'araa": 26,
    "An-Naml": 27,
    "Al-Qasas": 28,
    "Al-Ankaboot": 29,
    "Ar-Room": 30,
    Luqman: 31,
    "As-Sajda": 32,
    "Al-Ahzaab": 33,
    Saba: 34,
    Faatir: 35,
    Yaseen: 36,
    "As-Saaffaat": 37,
    Saad: 38,
    "Az-Zumar": 39,
    Ghaafir: 40,
    Fussilat: 41,
    "Ash-Shura": 42,
    "Az-Zukhruf": 43,
    "Ad-Dukhaan": 44,
    "Al-Jaathiya": 45,
    "Al-Ahqaf": 46,
    Muhammad: 47,
    "Al-Fath": 48,
    "Al-Hujuraat": 49,
    Qaaf: 50,
    "Adh-Dhaariyat": 51,
    "At-Toor": 52,
    "An-Najm": 53,
    "Al-Qamar": 54,
    "Ar-Rahmaan": 55,
    "Al-Waaqia": 56,
    "Al-Hadid": 57,
    "Al-Mujaadila": 58,
    "Al-Hashr": 59,
    "Al-Mumtahana": 60,
    "As-Saff": 61,
    "Al-Jumu'a": 62,
    "Al-Munaafiqoon": 63,
    "At-Taghaabun": 64,
    "At-Talaaq": 65,
    "At-Tahreem": 66,
    "Al-Mulk": 67,
    "Al-Qalam": 68,
    "Al-Haaqqa": 69,
    "Al-Ma'aarij": 70,
    Nooh: 71,
    "Al-Jinn": 72,
    "Al-Muzzammil": 73,
    "Al-Muddaththir": 74,
    "Al-Qiyaama": 75,
    "Al-Insaan": 76,
    "Al-Mursalaat": 77,
    "An-Naba": 78,
    "An-Naazi'aat": 79,
    Abasa: 80,
    "At-Takwir": 81,
    "Al-Infitaar": 82,
    "Al-Mutaffifin": 83,
    "Al-Inshiqaaq": 84,
    "Al-Burooj": 85,
    "At-Taariq": 86,
    "Al-A'laa": 87,
    "Al-Ghaashiya": 88,
    "Al-Fajr": 89,
    "Al-Balad": 90,
    "Ash-Shams": 91,
    "Al-Lail": 92,
    "Ad-Duhaa": 93,
    "Ash-Sharh": 94,
    "At-Tin": 95,
    "Al-Alaq": 96,
    "Al-Qadr": 97,
    "Al-Bayyina": 98,
    "Az-Zalzala": 99,
    "Al-Aadiyaat": 100,
    "Al-Qaari'a": 101,
    "At-Takaathur": 102,
    "Al-Asr": 103,
    "Al-Humaza": 104,
    "Al-Fil": 105,
    Quraish: 106,
    "Al-Maa'oon": 107,
    "Al-Kawthar": 108,
    "Al-Kaafiroon": 109,
    "An-Nasr": 110,
    "Al-Masad": 111,
    "Al-Ikhlaas": 112,
    "Al-Falaq": 113,
    "An-Naas": 114,
  };

  useEffect(() => {
    const fetchQuran = async () => {
      try {
        const response = await axios.get(
          "https://quranapi.pages.dev/api/surah.json"
        );
        if (response.data) {
          setQuranData(response.data);
        } else {
          throw new Error("Invalid API response");
        }
      } catch (error) {
        console.log("Error fetching Quran data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuran();
  }, []);

  const getItem = (data, index) => data[index];
  const getItemCount = (data) => data.length;

  const renderSurahName = ({ item, index }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        const surahNo = surahMapping[item.surahName];
        navigation.navigate("Surah", { surahNo, surah: item });
      }}
    >
      <View style={styles.indexContainer}>
        <Text style={styles.indexText}>{index + 1}</Text>
      </View>
      <Text style={styles.arabicText}>{item.surahNameArabicLong}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView style={{ flex: 1 }}>
        <Appbar.Header style={styles.appbarHeader}>
          <Appbar.BackAction
            onPress={() => navigation.goBack()}
            color="white"
          />
          <Appbar.Content title="Quran" color="white" />
          <Appbar.Action icon="book" color="white" />
        </Appbar.Header>

        {loading ? (
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color={COLORS.primary} />
          </View>
        ) : (
          <VirtualizedList
            data={quranData}
            initialNumToRender={10}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderSurahName}
            getItemCount={getItemCount}
            getItem={getItem}
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
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    color: "white",
  },
  arabicText: {
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
    textAlign: "right",
  },
});
