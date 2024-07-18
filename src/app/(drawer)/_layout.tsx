import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import * as React from 'react-native';
import { AntDesign, Fontisto, MaterialCommunityIcons } from '@expo/vector-icons';
import CustomDrawr from '@/src/components/CustomDrawr';

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer drawerContent={CustomDrawr} screenOptions={{
        drawerActiveBackgroundColor: "#f39060",
        drawerActiveTintColor: "#fff",
        drawerLabelStyle: { marginLeft: -20 }
      }}>
        <Drawer.Screen
          name="(tabs)" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: 'Home',
            title: 'Home',
            headerShown: false,
            drawerIcon: () => <AntDesign name='home' size={20} color={'#ffff'} />,
            drawerLabelStyle: { color: "#fff" },
          }}

        />
        <Drawer.Screen
          name="theme"
          options={{
            drawerLabel: 'Theme',
            title: 'Theme',
            drawerIcon: () => <MaterialCommunityIcons name='tshirt-crew-outline' size={20} color={'#ffff'} />,
            drawerLabelStyle: { color: "#fff" },
            headerShown: false
          }}
        />
        <Drawer.Screen
          name="searchFile"
          options={{
            drawerLabel: 'Search Library',
            title: 'Search Music',
            drawerIcon: () => <Fontisto name='music-note' size={20} color={'#ffff'} />,
            drawerLabelStyle: { color: "#fff" },
            headerShown:false
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
