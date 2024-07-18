import { StyleSheet, Text, View } from 'react-native'
import React, { memo, useEffect, useRef } from 'react'
import LottieView from 'lottie-react-native'
import { useSelector } from 'react-redux'
import { isPlaying } from '../feature/playerSlice'

interface TrackPlayingAnimation {
    isTrackPlaying: boolean
}

const TrackPlayingAnimation = () => {

    const isTrackPlaying = useSelector(isPlaying);

    const animation = useRef<any>(null);
    useEffect(() => {
        if (isTrackPlaying === "playing" || isTrackPlaying === "buffering") {
            animation.current?.play();

        } else {
            animation.current?.pause();
        }
    }, [isTrackPlaying]);

    return (
        <LottieView
            autoPlay
            ref={animation}
            style={{
                width: 50,
                height: 30,
                backgroundColor: 'transparent',
            }}
            source={require('../../assets/lottie/music-play-animation.json')}
        />
    )
}

export default memo(TrackPlayingAnimation)

const styles = StyleSheet.create({})