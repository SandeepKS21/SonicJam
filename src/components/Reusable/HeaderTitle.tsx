import { StyleSheet, Text } from 'react-native';
import React from 'react';
import Colors from '@/src/constants/Colors';

interface HeaderTitleProps {
    text: String,
    color?: string;
}

const HeaderTitle = ({ text, color = Colors.main.white }: HeaderTitleProps) => {
    const textStyle = {
        ...styles.headerTitle,
        color: color
    };

    return (
        <Text style={textStyle}>{text}</Text>
    );
}

export default HeaderTitle;

const styles = StyleSheet.create({
    headerTitle: {
        fontSize: 17,
        fontWeight: "500",
        color: Colors.main.lightPurple
    }
});
