import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { COLORS } from "../styles/GlobalStyle";
import Icon from "react-native-vector-icons/Feather";
import LocationIcon from "react-native-vector-icons/Ionicons";
import axios from "axios";

export default function Home() {
  const [hijriDate, setHijriDate] = useState("");
    const getCurrentDate = () => {
        const today = new Date();
        return today.toLocaleDateString('en-US', {
          weekday: 'long', 
          day: 'numeric',  
          month: 'long',  
        });
      };
      const date = getCurrentDate()

      useEffect(() => {
        const fetchHijriDate = async () => {
          try {
            const response = await axios.get(
              "http://api.aladhan.com/v1/gToH" 
            );
    
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
            <View>
              <Text style={styles.heading}>Assalam-o-Alaikum,</Text>
              <Text style={styles.text}>Ramadan Mubarak</Text>
            </View>

            <View>
              <Icon name="book-open" size={30} color="white" />
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.cardTiming}>
            <View>
              <Text style={styles.timing1}>3:40 AM</Text>
              <Text style={styles.timing2}>Shehri Last Time</Text>
            </View>
            <View>
              <Text style={styles.timing1}>6:40 PM</Text>
              <Text style={styles.timing2}>Iftar Time</Text>
            </View>
          </View>
          <View style={styles.cardDate}>
            <Text style={styles.date}>{date}</Text>
          </View>
          <View style={styles.cardIslamic}>
            <View style={styles.cardIslamicDate}>
              <Text style={styles.dateText}>{hijriDate ? hijriDate : "Loading..."}</Text>
            </View>
            <View style={styles.cardLocation}>
              <LocationIcon name="location-outline" size={18} />
              <Text style={styles.dateText}>Wazirabad</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  homeContainer: {
    position: "relative",
    height: 250,
    width: "100%",
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  innerHome: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 100,
  },
  heading: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  text: {
    color: "white",
    fontSize: 15,
    marginTop: 5,
  },
  card: {
    position: "absolute",
    width: 300,
    height: 150,
    backgroundColor: "white",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    top: "80%",
    left: "9%",
  },
  cardTiming: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 90,
  },
  timing1: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: "700",
  },
  timing2: {
    fontSize: 13,
    color: "gray",
  },
  cardDate: {
    marginTop: 8,
    alignSelf: "flex-start",
    left: "8%",
  },
  date: {
    fontSize: 16,
    fontWeight: "700",
  },
  cardIslamic: {
    flexDirection: "row",
    gap: 50,
    marginTop: 8,
  },
  dateText: {
    color: "gray",
    fontSize: 14,
  },
  cardLocation: {
    flexDirection: "row",
    gap: 2,
  },
});
