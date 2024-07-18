import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { customModerateScale, customVerticalScale } from '@/src/constants/Style'
import { AntDesign, Feather, SimpleLineIcons } from '@expo/vector-icons'
import { useNavigation } from 'expo-router'
import Animated, { useAnimatedStyle, useSharedValue, withDecay, withTiming } from 'react-native-reanimated'
import Colors from '@/src/constants/Colors'
import PopupMenu from '../PopupMenu'

interface ReusableHeader {
    title: string,
    searchSong: (search: string) => void,
    isSearch?: boolean
}

const ReusableHeader = ({ title, searchSong, isSearch = true }: ReusableHeader) => {
    const animation = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => {

        return {
            width: animation.value == 1 ? withTiming(220, { duration: 500 }) : withTiming(0, { duration: 500 }),
            backgroundColor: animation.value == 1 ? "rgba(237, 235, 236, 0.24)" : "transparent",
        }

    });

    const navigation = useNavigation();
    return (
        <SafeAreaView >
            <StatusBar style="light" />
            <View style={styles.container}>
                <View style={styles.row}>
                    <Pressable onPress={() => navigation.goBack()}>
                        <AntDesign name='arrowleft' size={24} color={'#ffff'} />
                    </Pressable>
                    <Text style={{ fontSize: 20, color: "#fff" }}>{title}</Text>
                </View>

                <View style={{ flexDirection: "row", gap: 5, alignItems: "center", }}>
                    <Animated.View style={[{ backgroundColor: "rgba(237, 235, 236, 0.24)", flexDirection: "row", borderRadius: 7, alignItems: "center", paddingLeft: 5, paddingRight: customModerateScale(30), width: 220, justifyContent: "space-between", gap: 5 }, animatedStyle]}>

                        <TextInput onChangeText={(search) => searchSong(search)} placeholder='search song' placeholderTextColor={Colors.main.lightGrey} style={{ fontSize: customModerateScale(15), color: "#fff", width: "100%" }} />
                        <Pressable onPress={() => {
                            if (animation.value === 1) {
                                animation.value = 0;
                            } else {
                                animation.value = 1;
                            }
                        }}>
                            {isSearch && <Feather style={{ width: customModerateScale(20) }} name="search" color={"#fff"} size={22} />}

                        </Pressable>

                    </Animated.View>

                    <PopupMenu>
                        <SimpleLineIcons name="options-vertical" size={18} color="#fff" />

                    </PopupMenu>
                </View>


            </View>
        </SafeAreaView>
    )
}

export default ReusableHeader

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 15
    },
    container: {
        height: customVerticalScale(40),
        paddingHorizontal: 15,
        marginTop: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    }
})