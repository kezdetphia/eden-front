import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import { Slot } from "expo-router";

// Import your global CSS file
import "../global.css";
import { useColorScheme } from "@/hooks/useColorScheme";
import Toast from "react-native-toast-message";
import { AuthContextProvider } from "@/context/authContext";
import GlobalStylesWrapper from "../components/GlobalStylesWrapper";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function MainLayout() {
  //TODO: need auth here ,using segments and router

  const [fontsLoaded, fontError] = useFonts({
    poppins: require("../assets/fonts/Poppins-Regular.ttf"),
    poppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),
    jakarta: require("../assets/fonts/Jakarta.ttf"),
    jakartaSemibold: require("../assets/fonts/JakartaSemibold.ttf"),
    jakartaBold: require("../assets/fonts/JakartaBold.ttf"),
  });

  if (fontError) {
    console.log("Font loading error:", fontError);
  }

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <>
      <Slot />
      <Toast />
    </>
  );
}

export default function RootLayout() {
  return (
    <>
      <AuthContextProvider>
        <MainLayout />
      </AuthContextProvider>
    </>
  );
}
