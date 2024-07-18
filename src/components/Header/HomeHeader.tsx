import { Pressable, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Colors from '@/src/constants/Colors'
import { StatusBar } from 'expo-status-bar';
import { Feather, Ionicons } from '@expo/vector-icons';
import HeaderTitle from '../Reusable/HeaderTitle';
import { useNavigation, useRouter } from 'expo-router';
import { customVerticalScale } from '@/src/constants/Style';

const HomeHeader = () => {

    const navigation = useNavigation<any>();
    const router = useRouter();


    return (
        <SafeAreaView>
            <StatusBar style="light" />

            <View style={styles.conatiner}>

                <Pressable onPress={() => navigation.toggleDrawer()} style={{ padding: 5, borderRadius: 20, alignItems: "center" }}>
                    <Ionicons name="options" size={28} color={Colors.main.lightPurple} />
                </Pressable>


                <View style={styles.row}>
                    <Pressable onPress={() => router.push('/screens/Notification')}>

                        <Ionicons name="notifications-outline" color={"#fff"} size={28} />
                    </Pressable>

                </View>
            </View>

        </SafeAreaView>

    )
}

export default HomeHeader

const styles = StyleSheet.create({
    conatiner: {
        height: customVerticalScale(40),
        paddingHorizontal: 15,
        marginTop: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },
    row: {
        flexDirection: "row",
        gap: 15,
        alignItems: "flex-start"
    },
})