import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Linking,
} from "react-native";
import { COLORS } from "../styles/GlobalStyle";
import Icon from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import TasbeehImg from "../assets/tashbeeh.jpg";
import CalendarImg from "../assets/calendar.png";
import axios from "axios";

export default function Home({ navigation }) {
  const [hijriDate, setHijriDate] = useState("");

  const getCurrentDate = () => {
    const today = new Date();
    return today.toLocaleDateString("en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
  };

  const date = getCurrentDate();

  useEffect(() => {
    const fetchHijriDate = async () => {
      try {
        const response = await axios.get("http://api.aladhan.com/v1/gToH");
        if (response.data && response.data.data) {
          const { hijri } = response.data.data;
          setHijriDate(`${hijri.day} ${hijri.month.en} ${hijri.year}`);
        }
      } catch (error) {
        console.log("Error fetching Hijri date:", error);
      }
    };
    fetchHijriDate();
  }, []);

  return (
    <View style={styles.background}>
      <SafeAreaView>
        <View style={styles.homeContainer}>
          <View style={styles.innerHome}>
            <View style={styles.textContainer}>
              <Text style={styles.heading}>Assalam-o-Alaikum,</Text>
              <Text style={styles.subheading}>May Allah bless you!</Text>
              <Text style={styles.dateText}>{date}</Text>
              <Text style={styles.dateText}>
                {hijriDate ? hijriDate : "Loading..."}
              </Text>
            </View>

            <TouchableOpacity style={styles.iconWrapper}>
              <Icon
                name="book-open"
                size={40}
                color="white"
                style={styles.shadowEffect}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.featureCards}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("Tasbeeh")}
          >
            <Image source={TasbeehImg} style={styles.cardImage} />
            <Text style={styles.cardText}>Tasbih</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("calendar")}
          >
            <Image source={CalendarImg} style={styles.cardImage} />
            <Text style={styles.cardText}>Islamic Calendar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.followUsCard}>
          <Text style={styles.followUsText}>Follow Us</Text>
          <View style={styles.iconContainer}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => Linking.openURL("https://www.instagram.com")}
            >
              <FontAwesome name="instagram" size={30} color="#E4405F" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => Linking.openURL("https://www.linkedin.com")}
            >
              <FontAwesome name="linkedin" size={30} color="#0077B5" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },
  homeContainer: {
    height: 220,
    width: "100%",
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    elevation: 4,
  },
  innerHome: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
    width: "100%",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
  },
  iconWrapper: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  shadowEffect: {
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  heading: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  subheading: {
    color: "white",
    fontSize: 16,
    marginTop: 4,
  },
  dateText: {
    color: "white",
    fontSize: 15,
    marginTop: 6,
  },
  featureCards: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    marginTop: 40,
    paddingHorizontal: 20,
  },
  card: {
    width: 140,
    height: 140,
    backgroundColor: "white",
    borderRadius: 20,
    borderColor: COLORS.primary,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  cardImage: {
    width: 70,
    height: 80,
  },
  cardText: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 8,
    color: "#333",
  },

  followUsCard: {
    marginTop: 40,
    backgroundColor: "white",
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 30,
    alignItems: "center",
    marginHorizontal: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  followUsText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  iconContainer: {
    flexDirection: "row",
    gap: 45,
  },
  iconButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#F3F3F3",
    elevation: 2,
  },
});
