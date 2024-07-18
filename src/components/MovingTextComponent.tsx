import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withDelay, withRepeat, withTiming } from 'react-native-reanimated';

interface movingTextInterface {
    text: string,
    animationThreshold: any,
    style: any
}


const MovingTextComponent = ({ text, animationThreshold, style }: movingTextInterface) => {
    const translateX = useSharedValue(0);
    const shouldAnimate = text.length >= animationThreshold;
    const textWidth = text.length * 3;

    useEffect(() => {

        translateX.value = 0;

        if (!shouldAnimate) return;

        translateX.value = withDelay(
            1000,
            withRepeat(
                withTiming(-textWidth, {
                    duration: 7000,
                    easing: Easing.linear,
                }),
                -1,
                true
            )
        );
    }, [text, animationThreshold, textWidth, translateX])


    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: translateX.value }]
        }
    })


    return (
        <Animated.Text numberOfLines={1} style={[animatedStyle, style, shouldAnimate && { width: 999, paddingLeft:5 }]}>
            <Text>{text}</Text>
        </Animated.Text>
    )
}

export default MovingTextComponent

const styles = StyleSheet.create({})