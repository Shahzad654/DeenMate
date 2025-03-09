import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import { NavigationContainer } from '@react-navigation/native';
import TabNav from './navigation/TabNav';
import Surah from "./screen/Surah";

const Stack = createStackNavigator();

export default function App() {

  const [fontsLoaded] = useFonts({
    "poppins": require("./fonts/Poppins-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null; 
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='tab' component={TabNav}/>
        <Stack.Screen name="Surah" component={Surah} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


