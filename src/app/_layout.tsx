import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import { useColorScheme } from "../components/useColorScheme";
import { store } from '../store/Strore'
import { Provider } from 'react-redux'
import React from "react";
import { PlaybackService } from '../services/playbackService'
import * as SystemUI from 'expo-system-ui';


export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";
import { ModalPortal } from 'react-native-modals';
import TrackPlayer from "react-native-track-player";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { MenuProvider } from 'react-native-popup-menu';


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

TrackPlayer.registerPlaybackService(() => PlaybackService);

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);



  useEffect(() => {

    const getBackgroundColor = async () => {
      const color = await SystemUI.getBackgroundColorAsync();
      await SystemUI.setBackgroundColorAsync("transparent");

    }

    getBackgroundColor();
  }, []);


  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);




  if (!loaded) {

    return null;
  }

  return <RootLayoutNav />;
}


function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <MenuProvider>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
              <Stack screenOptions={{presentation:"transparentModal"}}>
                <Stack.Screen name="(drawer)" options={{ headerShown: false }} />

                <Stack.Screen name="screens/AddPlaylistSong" options={{ headerShown: false }} />
                <Stack.Screen name="screens/PlaylistSongs" options={{ headerShown: false }}   />
                <Stack.Screen name="screens/Theme/[themeName]" options={{ headerShown: false }} />
                <Stack.Screen name="screens/Notification" options={{ headerShown: false }} />

                {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
              </Stack>
            </ThemeProvider>
          </MenuProvider>
        </BottomSheetModalProvider>
        <ModalPortal />
      </GestureHandlerRootView>
    </Provider>
  );
}
