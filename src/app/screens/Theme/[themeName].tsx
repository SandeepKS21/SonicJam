import { StyleSheet, Text, View, Pressable, ScrollView,Image } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import BackgroundImage from '@/src/components/BackgroundImage';
import ReusableHeader from '@/src/components/Header/ReusableHeader';
import { customModerateScale, customVerticalScale } from '@/src/constants/Style';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/src/store/Strore';
import { backgroundTheme, setTheme } from '@/src/feature/playerSlice';
import { useSelector } from 'react-redux';
import { AntDesign } from '@expo/vector-icons';
// import { Image } from 'expo-image';


type themeType = {
    themeName: string
}

const themes = [
    {
        name: "Illustrations",
        images: [
            require('../../../../assets/background/Illustrations/i1.jpg'),
            require('../../../../assets/background/Illustrations/i2.jpg'),
            require('../../../../assets/background/Illustrations/i3.jpg'),
        ]
    },
    {
        name: "Clouds",
        images: [
            require('../../../../assets/background/clouds/c1.jpg'),
            require('../../../../assets/background/clouds/c2.jpg'),

        ]
    },
    {
        name: "Fire",
        images: [
            require('../../../../assets/background/fire/f1.jpg'),
            require('../../../../assets/background/fire/f2.jpg'),
        ]
    },
    {
        name: "Nature",
        images: [
            require('../../../../assets/background/nature/n1.jpg'),
            require('../../../../assets/background/nature/n2.jpg'),
            require('../../../../assets/background/nature/n3.jpg'),
        ]
    },
    {
        name: "Rain",
        images: [
            require('../../../../assets/background/rain/r1.jpg'),
            require('../../../../assets/background/rain/r2.jpg'),

        ]
    },
    {
        name: "Space",
        images: [
            require('../../../../assets/background/space/s1.jpg'),
            require('../../../../assets/background/space/s2.jpg'),
            require('../../../../assets/background/space/s3.jpg'),
        ]
    },
    {
        name: "Gradient",
        images: [
            require('../../../../assets/background/gradient/gr1.jpg'),
            require('../../../../assets/background/gradient/gr2.jpg'),
            require('../../../../assets/background/gradient/gr3.jpg'),
            require('../../../../assets/background/gradient/gr4.jpg'),
            require('../../../../assets/background/gradient/gr5.jpg'),
            require('../../../../assets/background/gradient/gr6.jpg'),
            require('../../../../assets/background/gradient/gr7.jpg'),
            require('../../../../assets/background/gradient/gr8.jpg'),
            require('../../../../assets/background/gradient/gr9.jpg'),
        ]
    },
]

const ThemeByName = () => {
    const { themeName } = useLocalSearchParams<themeType>();
    const dispatch = useDispatch<AppDispatch>();
    const backgroundThemeImg = useSelector(backgroundTheme);
    const blurhash =
        '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

    return (
        <BackgroundImage>
            <ReusableHeader title={themeName} searchSong={() => { }} isSearch={false}/>
            <ScrollView>

                <View style={styles.container}>

                    {themes.map((theme, index) =>
                        theme.name === themeName &&
                        theme.images.map((image, imageIndex) => (
                            <Pressable key={imageIndex} onPress={() => dispatch(setTheme(image))} style={styles.imageContainer}>


                                <Image style={styles.image} source={image}  />


                                {backgroundThemeImg === image && <AntDesign name='checkcircle' size={35} style={styles.checkIcon} />}


                            </Pressable>
                        ))
                    )}

                </View>
            </ScrollView>
        </BackgroundImage>
    )
}

export default ThemeByName

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: customModerateScale(15),
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 40,
        marginBottom: 20,
        marginTop: 5,
        alignItems: "center",
        justifyContent: "space-between",
        alignContent: "center",

    },

    image: {
        height: customVerticalScale(200),
        width: customModerateScale(150),
        borderRadius: 7,
        resizeMode:"cover"
    },
    checkIcon: {
        position: "absolute",
        color: "#ffff"
    },
    imageContainer: {
        justifyContent: "center", alignItems: "center",
    }
})