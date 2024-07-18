import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import BackgroundImage from '@/src/components/BackgroundImage'
import { customModerateScale } from '@/src/constants/Style'
import ReusableHeader from '@/src/components/Header/ReusableHeader'

const Notification = () => {

  return (
    <BackgroundImage>
      <ReusableHeader title='Notification' isSearch={false} searchSong={() => { }} />
      <View style={styles.container}>
       
        <Text style={{ color: "#ffff", fontSize: customModerateScale(25) }}>Coming soon</Text>
      </View>

    </BackgroundImage>
  )
}

export default Notification

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", alignItems: "center",
  }
})