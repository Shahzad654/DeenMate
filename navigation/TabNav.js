import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Home from "../screen/Home";
import AlAsma from "../screen/AlAsma";
import Quran from "../screen/Quran";
import { COLORS } from "../styles/GlobalStyle"; 
import Hadith from "../screen/Hadith";

const Tab = createBottomTabNavigator();

export default function TabNav() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "white",
          position: "absolute",
          bottom: 20,
          marginHorizontal: 20,
          borderRadius: 20,
          height: 60,
          elevation: 5,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 4,
        },
        tabBarActiveTintColor: COLORS.primary, 
        tabBarInactiveTintColor: "gray", 
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => <Icon name="home" size={30} color={color} />,
        }}
      />
      <Tab.Screen
        name="AlAsma"
        component={AlAsma}
        options={{
          tabBarLabel: "Al Asma",
          tabBarIcon: ({ color }) => <Icon name="hands-pray" size={30} color={color} />,
        }}
      />
      <Tab.Screen
        name="Quran"
        component={Quran}
        options={{
          tabBarLabel: "Quran",
          tabBarIcon: ({ color }) => <Icon name="book-open-variant" size={30} color={color} />,
        }}
      />
      <Tab.Screen
        name="Hadith"
        component={Hadith}
        options={{
          tabBarLabel: "Hadith",
          tabBarIcon: ({ color }) => <Icon name="book-open" size={30} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
