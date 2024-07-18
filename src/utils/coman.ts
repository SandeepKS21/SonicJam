
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { songInterface } from '../Interface/songInterface';

export const shareMusic = async (currentSong: songInterface | null) => {

    const musicFileLocation = currentSong?.url;
    if (musicFileLocation) {
        const fileInfo = await FileSystem.getInfoAsync(musicFileLocation);
        if (!fileInfo.exists) {
            alert('File does not exist');
            return;
        }

        if (await Sharing.isAvailableAsync()) {
            await Sharing.shareAsync(musicFileLocation);
        } else {
            alert('Sharing is not available on this device');
        }
    } else {
        alert('Music file not found');

    }
}
