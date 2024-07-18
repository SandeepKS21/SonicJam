import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BackgroundImage from '@/src/components/BackgroundImage'
import ReusableHeader from '@/src/components/Header/ReusableHeader'
import { customModerateScale } from '@/src/constants/Style'

const MostPlayed = () => {
  return (
    <BackgroundImage>
    <ReusableHeader title='Notification' searchSong={() => { }} />
    <View style={styles.container}>
     
      <Text style={{ color: "#ffff", fontSize: customModerateScale(25) }}>Coming soon</Text>
    </View>

  </BackgroundImage>
  )
}

export default MostPlayed

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center", alignItems: "center",
      }
})