import { View, Text, Animated } from "react-native";
import React, { useRef, useEffect } from "react";
import tw from "twrnc";

const PulsingComponent = () => {
    const glowAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        // Animate the glow effect
        Animated.loop(
            Animated.sequence([
                Animated.timing(glowAnim, { toValue: 1, duration: 700, useNativeDriver: true }),
                Animated.timing(glowAnim, { toValue: 0, duration: 700, useNativeDriver: true }),
            ])
        ).start();
    }, [glowAnim]);

    const glowStyle = {
        shadowColor: "lime",
        shadowOpacity: glowAnim.interpolate({ inputRange: [0, 1], outputRange: [0.1, 1] }),
        shadowRadius: glowAnim.interpolate({ inputRange: [0, 1], outputRange: [5, 40] }),
        transform: [{ scale: glowAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.2] }) }],
    };

    return <Animated.View style={[tw`bg-[#52734D] h-4 w-4 p-2 rounded-full`, glowStyle]}></Animated.View>;
};

export default PulsingComponent;
