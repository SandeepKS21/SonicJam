import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BackgroundImage from '@/src/components/BackgroundImage'
import ReusableHeader from '@/src/components/Header/ReusableHeader'
import { customModerateScale } from '@/src/constants/Style'

const searchFile = () => {
  return (
    <BackgroundImage>
      <ReusableHeader title='Search Files' searchSong={() => { }} isSearch={false} />
      <View style={styles.container}>

        <Text style={{ color: "#ffff", fontSize: customModerateScale(25) }}>Coming soon</Text>
      </View>

    </BackgroundImage>
  )
}

export default searchFile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", alignItems: "center",
  }
})