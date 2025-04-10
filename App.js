import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import { NavigationContainer } from '@react-navigation/native';
import TabNav from './navigation/TabNav';
import Surah from "./screen/Surah";
import Tasbeeh from "./screen/Tasbeeh";
import Calendar from "./screen/Calendar";
import Splash from "./screen/Splash";

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
       <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name='tab' component={TabNav}/>
        <Stack.Screen name="Surah" component={Surah} />
        <Stack.Screen name="Tasbeeh" component={Tasbeeh} />
        <Stack.Screen name="calendar" component={Calendar}/>
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}


