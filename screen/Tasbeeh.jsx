import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import { Appbar } from "react-native-paper";
import { COLORS } from "../styles/GlobalStyle";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function Tasbeeh({ navigation }) {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.mainContainer}>
      <SafeAreaView style={{ flex: 1 }}>
        <Appbar.Header style={styles.appbarHeader}>
          <Appbar.BackAction
            onPress={() => navigation.goBack()}
            color="white"
          />
          <Appbar.Content title="Tasbeeh" color="white" />
        </Appbar.Header>

        <View style={styles.counterContainer}>
          <Text style={styles.counterText}>{count}</Text>

          <TouchableOpacity
            style={styles.countBtn}
            onPress={() => setCount(count + 1)}
          >
            <Text style={styles.tapText}>Tap</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.resetBtn} onPress={() => setCount(0)}>
            <Icon name="lock-reset" size={35} color="white" />
            <Text style={styles.resetText}>Reset</Text>
          </TouchableOpacity>
        </View>
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
  counterContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 40,
  },
  counterText: {
    fontSize: 60,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  countBtn: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  tapText: {
    fontSize: 26,
    fontWeight: "700",
    color: "white",
  },
  resetBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    gap: 10,
    elevation: 3,
  },
  resetText: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
});
