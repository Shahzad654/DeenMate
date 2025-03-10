import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, SafeAreaView } from "react-native";
import { Appbar } from "react-native-paper";
import moment from "moment-hijri"; 

import { COLORS } from "../styles/GlobalStyle";

export default function HijriCalendar({ navigation }) {
  const [currentHijriMonth, setCurrentHijriMonth] = useState(moment().format("iYYYY-iMM"));
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    generateHijriMonth(currentHijriMonth);
  }, [currentHijriMonth]);

  const generateHijriMonth = (hijriMonth) => {
    setLoading(true);
    let days = [];
    let totalDays = moment(hijriMonth, "iYYYY-iMM").iDaysInMonth();
    for (let i = 1; i <= totalDays; i++) {
      let hijriDate = moment(`${hijriMonth}-${i}`, "iYYYY-iMM-iD");
      let gregorianDate = hijriDate.format("YYYY-MM-DD");

      days.push({
        hijri: hijriDate.format("iD"),
        gregorian: gregorianDate,
      });
    }

    setDaysInMonth(days);
    setLoading(false);
  };

  const prevMonth = () => {
    setCurrentHijriMonth(moment(currentHijriMonth, "iYYYY-iMM").subtract(1, "iMonth").format("iYYYY-iMM"));
  };

  const nextMonth = () => {
    setCurrentHijriMonth(moment(currentHijriMonth, "iYYYY-iMM").add(1, "iMonth").format("iYYYY-iMM"));
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <Appbar.Header style={styles.appbarHeader}>
        <Appbar.BackAction onPress={() => navigation.goBack()} color="white" />
        <Appbar.Content title="Hijri Calendar" color="white" />
      </Appbar.Header>

      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={prevMonth}>
            <Text style={styles.navButton}>{"<"}</Text>
          </TouchableOpacity>
          <Text style={styles.monthText}>
            {moment(currentHijriMonth, "iYYYY-iMM").format("iMMMM iYYYY")}
          </Text>
          <TouchableOpacity onPress={nextMonth}>
            <Text style={styles.navButton}>{">"}</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 20 }} />
        ) : (
          <View style={styles.calendarGrid}>
            {daysInMonth.map((day, index) => (
              <View key={index} style={styles.dayContainer}>
                <Text style={styles.hijriText}>{day.hijri}</Text>
                <Text style={styles.gregorianText}>{day.gregorian}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  appbarHeader: {
    backgroundColor: COLORS.primary,
    elevation: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
  },
  monthText: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  navButton: {
    fontSize: 30,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  dayContainer: {
    width: "15%",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.primary,
    margin: 2,
    borderRadius: 5,
  },
  hijriText: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  gregorianText: {
    fontSize: 10,
    color: "gray",
  },
});
