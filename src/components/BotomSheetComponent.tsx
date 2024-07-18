import { Alert, BackHandler, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { forwardRef, useCallback, useEffect, useMemo, useState } from 'react'
import { BottomSheetBackdrop, BottomSheetModal, useBottomSheetModal } from '@gorhom/bottom-sheet'
import { useRouter } from 'expo-router';
import Colors from '../constants/Colors';
import { customModerateScale } from '../constants/Style';
import { songInterface } from '../Interface/songInterface';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign, Entypo, FontAwesome, SimpleLineIcons } from '@expo/vector-icons';
import { Dimensions } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withRepeat,
} from 'react-native-reanimated';
import MovingTextComponent from './MovingTextComponent';
import { shareMusic } from '../utils/coman';

interface bottomSheetInteface {
    song: songInterface | null
}


const BottomSheetComponent = forwardRef<BottomSheetModalMethods, bottomSheetInteface>((props, ref) => {
    const { song } = props;
    const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

    const snapPoints = useMemo(() => ["30%"], []);
    const route = useRouter();

    const { dismiss } = useBottomSheetModal();
    const renderBackdrop = useCallback(
        (props: any) => (
            <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} pressBehavior={"close"}>

            </BottomSheetBackdrop>
        ),
        [dismiss],
    );

    const handleSongDetails = () => {
        return Alert.alert('Song Detail', song?.title, [
            { text: 'OK', },
        ]);
    }

    const width = Dimensions.get('window').width;

    const offSet = useSharedValue(width / 2 - 100);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: offSet.value }]
    }));

    useEffect(() => {
        offSet.value = withRepeat(withTiming(-offSet.value, { duration: 1750 }), -1, true)

    }, []);


    useEffect(() => {
        const backAction = () => {
            if (isBottomSheetOpen) {
                dismiss();
                return true;
            }
            return false; // Let the default back action occur
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => backHandler.remove();
    }, [isBottomSheetOpen]);



    const handleSheetChange = (index: number) => {
        setIsBottomSheetOpen(index >= 0)
    }

    return (
        <BottomSheetModal
            handleIndicatorStyle={{ display: "none" }}
            handleStyle={{ display: "none" }}

            ref={ref}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
            overDragResistanceFactor={0}
            onChange={handleSheetChange}
            backgroundStyle={{
                backgroundColor: Colors.main.lightGrey,
                borderRadius: 0,
            }}>

            <LinearGradient colors={['#DA4453', '#89216B', "#000000"]} style={{ flex: 1 }}>
                <View style={styles.conatiner}>

                    <View>
                        <Text numberOfLines={1} style={styles.songName}>{song?.title}</Text>
                        {/* <MovingTextComponent text={song.title} animationThreshold={15} style={styles.songName} /> */}
                    </View>

                    <View style={styles.optionContainer}>
                        <Pressable style={styles.optionBox} onPress={handleSongDetails}>
                            <AntDesign name='exclamationcircleo' size={30} color={"#fff"} />
                            <Text style={styles.detailsText}>Details</Text>
                        </Pressable>

                        <Pressable style={styles.optionBox} onPress={() => { dismiss(), route.push('/(drawer)/(tabs)/playlist') }}>
                            <AntDesign name='plussquareo' size={30} color={"#fff"} />
                            <Text style={styles.detailsText}>Add to Playlist</Text>
                        </Pressable>

                        <Pressable style={styles.optionBox} >
                            <FontAwesome name='bell-o' size={30} color={"#fff"} />
                            <Text style={styles.detailsText}>Set Ringtone</Text>
                        </Pressable>


                        <Pressable style={styles.optionBox} onPress={() => { }}>
                            <SimpleLineIcons name='equalizer' size={25} color={"#fff"} />
                            <Text style={styles.detailsText}>Equalizer</Text>
                        </Pressable>

                        <Pressable style={styles.optionBox} onPress={() => shareMusic(song)}>
                            <AntDesign name='sharealt' size={30} color={"#fff"} />
                            <Text style={styles.detailsText}>Share</Text>
                        </Pressable>
                        <Pressable style={styles.optionBox}>
                            <Entypo name='images' size={30} color={"#fff"} />
                            <Text style={styles.detailsText}>Set Theme</Text>
                        </Pressable>

                        <View style={styles.optionBox}>
                            <AntDesign name='delete' size={30} color={"#fff"} />
                            <Text style={styles.detailsText}>Delete</Text>
                        </View>
                    </View>

                </View>
            </LinearGradient>
        </BottomSheetModal >
    )
});

export default BottomSheetComponent

const styles = StyleSheet.create({
    conatiner: {
        paddingHorizontal: customModerateScale(15),
        flex: 1,

    },
    songName: {
        color: "#ffff",
        fontSize: customModerateScale(18),
        paddingTop: customModerateScale(10),
    },
    optionContainer: {
        marginTop: customModerateScale(25),
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        gap: customModerateScale(27),
        // justifyContent: "space-between",
    },
    optionBox: {
        alignItems: "center",
        gap: customModerateScale(10)
    },
    detailsText: {
        color: "#ffff"

    }
})