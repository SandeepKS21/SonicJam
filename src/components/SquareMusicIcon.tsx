import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Fontisto } from '@expo/vector-icons'
import Colors from '../constants/Colors'
import { customModerateScale } from '../constants/Style'

interface SquareMusicIconInterface {
    paddingVertical?: number
}

const SquareMusicIcon = ({ paddingVertical = 10 }: SquareMusicIconInterface) => {
    return (
        <View style={[styles.coverImg, { paddingVertical: paddingVertical }]} >
            <Fontisto
                name="music-note"
                size={24}
                color={Colors.main.white}
            />
        </View>

    )
}

export default SquareMusicIcon

const styles = StyleSheet.create({
    coverImg: {
        alignItems: "center",
        backgroundColor: "rgba(237, 235, 236, 0.24)",
        borderRadius: customModerateScale(7),
        paddingHorizontal: customModerateScale(12),
        paddingVertical: customModerateScale(15)

    },
})