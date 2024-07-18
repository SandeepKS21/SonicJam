import { StyleSheet, Text, View, ScrollView, Pressable,Image } from 'react-native'
import React from 'react'
import BackgroundImage from '@/src/components/BackgroundImage'
import ReusableHeader from '@/src/components/Header/ReusableHeader'
import { customModerateScale, customVerticalScale } from '@/src/constants/Style'
import { Link, useRouter } from 'expo-router';
// import { Image } from 'expo-image';


const themeOptions = [
  {
    name: "Illustrations",
    image: require('../../../assets/background/Illustrations/i3.jpg')
  },
  {
    name: "Gradient",
    image: require('../../../assets/background/gradient/gr8.jpg')
  },
  {
    name: "Clouds",
    image: require('../../../assets/background/clouds/c2.jpg')
  },
  {
    name: "Fire",
    image: require('../../../assets/background/fire/f1.jpg')
  },
  {
    name: "Nature",
    image: require('../../../assets/background/nature/n1.jpg')
  },
  {
    name: "Rain",
    image: require('../../../assets/background/rain/r1.jpg')
  },
  {
    name: "Space",
    image: require('../../../assets/background/space/s1.jpg')
  },
]

const theme = () => {

  // const blurhash =
  //   '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

  return (
    <BackgroundImage>
      <ReusableHeader title='Theme' searchSong={() => { }} isSearch={false} />

      <ScrollView showsVerticalScrollIndicator={false}>

        <View style={styles.container}>
          {themeOptions.map((theme, index) => (
            <Link href={`/screens/Theme/${theme.name}`} key={index} >
              <View style={styles.themeOption}>
                <Image style={styles.imageOption} source={theme.image}/>
                <View style={styles.ImageBackground} />
                <Text style={styles.themeName}>{theme.name}</Text>
              </View>
            </Link>
          ))}
        </View>
      </ScrollView>

    </BackgroundImage>
  )
}

export default theme

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: customModerateScale(15),
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 30,
    marginBottom: 20,
    marginTop: 5,
    alignItems: "center",
    justifyContent: "space-between",

  },
  themeOption: {
    alignItems: "center",
    justifyContent: "center"

  },
  imageOption: {
    borderRadius: 7,
    height: customVerticalScale(200),
    width: customModerateScale(150),
    resizeMode:"cover"
  },
  ImageBackground: {
    borderRadius: 7,
    height: customVerticalScale(200),
    width: customModerateScale(150),
    backgroundColor: "rgba(233, 233, 233, 0.39)",
    position: "absolute"
  },
  themeName: {
    color: "black",
    fontSize: customModerateScale(18),
    position: "absolute",
    fontWeight: "500"
  }
})