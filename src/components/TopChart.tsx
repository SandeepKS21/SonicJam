import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { AntDesign, Feather, MaterialIcons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import {
  customModerateScale,
  customScale,
  customVerticalScale,
} from "../constants/Style";

const topChart = [
  {
    name: "Desi kalakaar",
    image:
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    artist: "Honey singh",
  },
  {
    name: "chaleya",
    image:
      "https://images.unsplash.com/photo-1446057032654-9d8885db76c6?q=80&w=2128&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    artist: "Arjit singh",
  },
  {
    name: "zara sa",
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    artist: "Krishnakumar Kunnath (KK)",
  },

  {
    name: "zara sa",
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    artist: "Krishnakumar Kunnath (KK)",
  },

  {
    name: "zara sa",
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    artist: "Krishnakumar Kunnath (KK)",
  },
];

const TopChart = () => {
  return (
    <View style={styles.chartMainContainer}>
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Top 100 Indian</Text>

        <View style={styles.rowWithGap}>
          <Text style={styles.moreBtn}>More</Text>
          <AntDesign name="right" size={16} color={Colors.main.lightGrey} />
        </View>
      </View>

      {topChart.map((song, index) => (
        <View style={styles.songContainer} key={index}>
          <View style={styles.rowGap}>
            <Image
              style={styles.songImg}
              source={{
                uri: song.image,
              }}
            />

            <View style={styles.songNameContainer}>
              <Text numberOfLines={1} style={{ color: "#fff" }}>{song.name}</Text>
              <Text numberOfLines={1} style={{ color: Colors.main.lightGrey }}>
                {song.artist}
              </Text>
            </View>
          </View>
          {/* <Feather name="play-circle" size={24} color="#fff" /> */}
          <MaterialIcons name="download" size={24} color="#fff" />
        </View>
      ))}
    </View>
  );
};

export default TopChart;

const styles = StyleSheet.create({
  chartMainContainer: {
    borderRadius: 7,
    borderColor: Colors.main.lightGrey,
    borderWidth: 0.3,
    padding: 15,
    marginBottom: 15
  },
  chartContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  chartTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: customModerateScale(16),
  },
  moreBtn: {
    color: "#fff",
    fontSize: customModerateScale(16),
  },
  rowWithGap: {
    flexDirection: "row",
    alignItems: "center",
    gap: customScale(5),
  },
  songContainer: {
    flexDirection: "row",
    paddingTop: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },

  songImg: {
    height: customVerticalScale(45),
    width: customScale(45),
    resizeMode: "cover",
    borderRadius: 5,
  },
  songNameContainer: {
    gap: 10,
    // width:"70%"
    width:customModerateScale(170)
   
  },

  rowGap: {
    flexDirection: "row",
    gap: 20,
    
  },
});
