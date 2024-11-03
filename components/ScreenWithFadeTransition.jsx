import React from "react";
import Animated, { Easing, FadeIn, FadeOut } from "react-native-reanimated";

export default function ScreenWithFadeTransition({ children }) {
  return (
    <Animated.View
      entering={FadeIn.duration(300).easing(Easing.inOut(Easing.ease))}
      exiting={FadeOut.duration(300).easing(Easing.inOut(Easing.ease))}
      style={{ flex: 1 }}
    >
      {children}
    </Animated.View>
  );
}
