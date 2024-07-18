import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Event, useTrackPlayerEvents } from 'react-native-track-player';
import { getActiveTrack, getPlayingStatus } from '../feature/playerSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/Strore';

const useMusicPlayerEvents = () => {

  const dispatch = useDispatch<AppDispatch>();

  useTrackPlayerEvents([Event.PlaybackActiveTrackChanged, Event.PlaybackState], async event => {
    if (event.type === Event.PlaybackActiveTrackChanged && event.track != null) {
      // const { title } = event.track || {};
      // console.log('Active Track Changed:', title);
      dispatch(getActiveTrack());
    }

    if (event.type == Event.PlaybackState) {
      dispatch(getPlayingStatus());
    }
  });

}

export default useMusicPlayerEvents

const styles = StyleSheet.create({})