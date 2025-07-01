import { View, Text, Image, ActivityIndicator } from "react-native";
import { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";

export const unstable_settings = {
  headerShown: false,
};

export default function ScreenLoading() {
    const rotateAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.timing(rotateAnim, {
                toValue: 1, //anima rotateAnim de 0 → 1.
                duration: 1500, // segundos para completar 1 volta.
                easing: Easing.linear, //mantém a velocidade constante.
                useNativeDriver: true,
            })
        ).start();
    }, []);

    const spin = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <View className="flex-1 justify-center items-center bg-[#0b0c0e] px-6">
            <Animated.Image
                source={require('../img/icon.png')}
                style={{
                    width: 120,
                    height: 120,
                    transform: [{ rotate: spin }],
                    marginBottom: 20,
                }}
                resizeMode="contain"
            />
            <Text className="text-white text-lg font-semibold mb-4">
                Carregando clima...
            </Text>
           
        </View>
    );
}
