import React, { useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { Octicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import HomeHeader from "@/src/components/Header/HomeHeader";
import { View, Image } from "react-native";
import Colors from "@/src/constants/Colors";
import BottomSongBar from "@/src/components/Music/BottomSongBar";
import { BottomTabBar } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.main.primary,
        tabBarStyle: { borderTopRightRadius: 5, borderTopLeftRadius: 5, display: "none" },

        tabBarBackground: () => (
          <View style={{ flex: 1 }}>
            <Image
              style={{
                width: "100%",
                borderTopRightRadius: 5,
                borderTopLeftRadius: 5,
              }}
              source={require("../../../../assets/background/bottom-navigation.png")}
            />
          </View>
        ),
      }}
      tabBar={(props) => (
        <View>
          <BottomSongBar />

          <BottomTabBar {...props} />
        </View>
      )}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <Octicons name="home" color={color} size={24} />
          ),
          // header: () => <HomeHeader />,
          headerShown: false
        }}
      />

      <Tabs.Screen
        name="playlist"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <Feather name="search" color={color} size={24} />
          ),
          headerShown:false
        }}
      />

      <Tabs.Screen
        name="library"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <Ionicons name="library-outline" color={color} size={24} />
          ),
          headerShown: false
        }}
      />
      <Tabs.Screen
        name="favorite"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <Ionicons name="library-outline" color={color} size={24} />
          ),
          headerShown: false
        }}
      />
       <Tabs.Screen
        name="MostPlayed"
        options={{
          title: "",
          tabBarIcon: ({ color }) => (
            <Ionicons name="library-outline" color={color} size={24} />
          ),
          headerShown: false
        }}
      />
    </Tabs>
  );
}
