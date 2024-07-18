import { ActivityIndicator, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BackgroundImage from './BackgroundImage'

const ReusableLoader = () => {
    return (
        <BackgroundImage >
            <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
                <ActivityIndicator size={"large"} color={"white"} />
            </View>
        </BackgroundImage>
    )
}

export default ReusableLoader

const styles = StyleSheet.create({
})