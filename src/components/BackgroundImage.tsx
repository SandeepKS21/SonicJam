import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { backgroundTheme } from '../feature/playerSlice'

const BackgroundImage = ({ children }: any) => {

    const themeImage = useSelector(backgroundTheme);

    return (
        <ImageBackground source={themeImage} resizeMode='cover' style={styles.backgroundImg} >
            {children}
        </ImageBackground>
    )
}

export default BackgroundImage

const styles = StyleSheet.create({
    backgroundImg: {
        height: "100%",
        width: "100%",
        flex: 1
    },
})