import { View } from "react-native";
import React from "react";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

interface ReusableStyleProps {
  margin: number;
}

const VerticalSpacer = ({ margin }: ReusableStyleProps) => {
  return <View style={{ marginTop: margin, height: 1 }}></View>;
};

export const customScale = (size: number) => {
  return scale(size);
};

// Scales size based on the height of the screen
export const customVerticalScale = (size: number) => {
  return verticalScale(size);
};

// Moderately scales size based on the device's screen size
export const customModerateScale = (size: number, factor: number = 0.5) => {
  return moderateScale(size, factor);
};
export default VerticalSpacer;
