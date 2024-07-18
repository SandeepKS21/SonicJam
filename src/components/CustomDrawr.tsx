import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import { LinearGradient } from 'expo-linear-gradient';

const CustomDrawr = (props: any) => {
    return (
        <LinearGradient colors={[ '#DA4453', '#89216B',"#000000"]} style={{ flex: 1 }}>
            <DrawerContentScrollView {...props} scrollEnabled={false} contentContainerStyle={{ flex: 1 }} active>

                <View style={{marginBottom:5}}>
                    <Image style={styles.banner} source={require('../../assets/background/banner.jpg')} />
                </View>
                <DrawerItemList {...props} />
                <DrawerItem label={'Exit'} labelStyle={{ color: "#fff" }} onPress={() => { }} />
            </DrawerContentScrollView>
        </LinearGradient>

    )
}

export default CustomDrawr

const styles = StyleSheet.create({
    banner:{
        height:150,
        width:"100%",
        resizeMode:"contain",
        borderRadius:15

    }
})