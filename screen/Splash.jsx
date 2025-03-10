import { View, Image, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import Logo from "../assets/DeenMate.png";
import { COLORS } from "../styles/GlobalStyle";

export default function Splash({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("tab");
    }, 3000);

    return () => clearTimeout(timer); 
  }, [navigation]);

  return (
    <View style={styles.mainContainer}>
      <Image source={Logo} style={styles.logo} />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
  logo: {
    width: "100%",
  },
});
