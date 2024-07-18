import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeData = async (key: string, value: string) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        console.log('error while storing data in local storage', e);
    }
};


export const getData = async (key: string) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value;
    } catch (e) {
        console.log('error while fetching data in local storage', e);
    }
};


export const deleteData = async (key: string) => {
    try {
        const value = await AsyncStorage.removeItem(key);
    } catch (e) {
        console.log('error while fetching data in local storage', e);
    }
};

module.exports = {
    storeData,
    getData
};