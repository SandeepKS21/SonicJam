import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';

const PopupMenu = ({ children }:any) => {
    return (
        <View>
            <Menu>
                <MenuTrigger text='' >{children}</MenuTrigger>
                <MenuOptions optionsContainerStyle={{width:"30%",padding:5}}>
                    <MenuOption onSelect={() =>{}} text='Select all' />
                    <MenuOption onSelect={() =>{}} text='Refresh' />
                    {/* <MenuOption onSelect={() => alert(`Delete`)} >
                        <Text style={{ color: 'red' }}>Delete</Text>
                    </MenuOption> */}
                   
                </MenuOptions>
            </Menu>
        </View>
    )
}

export default PopupMenu

const styles = StyleSheet.create({})