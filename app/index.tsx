import { latLon } from "@/src/types/location";
import Geolocation from '@react-native-community/geolocation';
import { useEffect, useState } from "react";
import { FlatList, Text, View, Pressable } from "react-native";
import { useLocationKey } from "@/src/hooks/useLocation";
import { useTemperature } from "@/src/hooks/useTemperature";
import { useCurrentTemperature } from "@/src/hooks/currentTemperature";
import { StatusBar } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import useHourly from "../src/hooks/Hourly";
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import * as Linking from 'expo-linking';
import useForecast from "../src/hooks/useForecast";
import { ScrollView } from "react-native";
import * as Location from 'expo-location';
import { ActivityIndicator } from "react-native";
import ScreenLoading from "../src/components/ScreenLoading";
import { useTheme } from "../src/ThemeContext";


export default function Home() {
    const { theme, toggleTheme } = useTheme();


    const [location, setLocation] = useState<latLon | null>(null);

    //manda a localização e retorna a key dela
    const { data: locationKey, isPending, error } = useLocationKey(location);

    // tras a temperatura minima,temperatura maxima e descrição ex:ensolarado
    const { data: temperature, isPending: temperaturePending, error: errorTemperature } = useTemperature(locationKey?.Key);

    //tras a temperatura atual
    const { data: currentTemperature, isPending: currentTemperaturePending, error: errorCurrentTemperature } = useCurrentTemperature(locationKey?.Key);
    const currentT = currentTemperature?.current;
    const currentDescription = currentTemperature?.currentDescription

    //temperatura de hora em hora durante 12 horas
    const { data: hourTemperature, isPending: isPendinHour, error: errorHorud } = useHourly(locationKey?.Key)

    //previsão para 5 dias
    const { data: Forecast, isPending: isPendingForecast, error: errorForecast } = useForecast(locationKey?.Key)



    //pede a loc pro usuario
    useEffect(() => {
        async function getCurrentLocation() {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            })
        }

        getCurrentLocation();
    }, []);

    function getIconName(iconNumber: number) {
        switch (iconNumber) {
            case 1: // Sol
            case 2:
                return { name: "weather-sunny", lib: MaterialCommunityIcons, color: "orange" };
            case 3:
            case 4: // Nuvens
                return { name: "weather-partly-cloudy", lib: MaterialCommunityIcons, color: "gray" };
            case 5: // Névoa leve
                return { name: "weather-fog", lib: MaterialCommunityIcons, color: "gray" };
            case 6: // Chuva fraca
            case 12:
                return { name: "weather-rainy", lib: MaterialCommunityIcons, color: "blue" };
            case 14: // Chuva com pancadas
                return { name: "cloud-showers-heavy", lib: FontAwesome5, color: "blue" };
            case 36: // Noite com poucas nuvens
                return { name: "weather-night-partly-cloudy", lib: MaterialCommunityIcons, color: "gray" };
            case 38: // Noite com muitas nuvens
                return { name: "weather-night", lib: MaterialCommunityIcons, color: "darkgray" };
            default:
                return { name: "weather-cloudy", lib: MaterialCommunityIcons, color: "gray" };
        }
    }

    function getWeatherIcon(name: number) {
        switch (name) {
            case 1:
            case 2:
                return <FontAwesome5 name="sun" size={24} color="orange" />;
            case 3:
            case 4:
                return <FontAwesome5 name="cloud-sun" size={24} color="gray" />;
            case 5:
            case 6:
                return <FontAwesome5 name="cloud" size={24} color="gray" />;
            case 7:
            case 8:
                return <FontAwesome5 name="cloud-showers-heavy" size={24} color="blue" />;
            case 11:
                return <FontAwesome5 name="smog" size={24} color="gray" />;
            case 12:
            case 13:
            case 14:
                return <FontAwesome5 name="cloud-rain" size={24} color="blue" />;
            case 18:
                return <FontAwesome5 name="cloud-sun-rain" size={24} color="blue" />;
            case 19:
            case 20:
                return <FontAwesome5 name="snowflake" size={24} color="lightblue" />;
            case 29:
            case 30:
                return <FontAwesome5 name="cloud-moon" size={24} color="gray" />;
            case 34:
                return <FontAwesome5 name="moon" size={24} color="lightblue" />;
            case 35:
                return <FontAwesome5 name="cloud-moon-rain" size={24} color="gray" />;
            case 36:
                return <FontAwesome5 name="cloud-moon" size={24} color="gray" />;
            case 38:
                return <FontAwesome5 name="cloud" size={24} color="gray" />;


            default:
                return <FontAwesome5 name="question" size={24} color="gray" />;
        }
    }

    if (isPending || temperaturePending || currentTemperaturePending || isPendinHour || isPendingForecast) {
        return (
            <ScreenLoading />
        )
    }




    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View className={`flex-1 p-6 ${theme === 'dark' ? 'bg-[#16181b] ' : 'bg-[#dfdfdf]'}`} >
                <View className="mt-20 ">
                    {locationKey ? (
                        <>
                            <Text className={`font-bold text-4xl ${theme === 'dark' ? 'text-white ' : 'text-black'}`} >{locationKey.LocalizedName}, {locationKey.cityName}</Text>
                        </>
                    ) : (
                        <Text>Obtendo localização...</Text>
                    )}
                </View>
                <View className="mt-9 flex flex-row gap-3 items-center">
                    {currentT ? (
                        <Pressable onPress={() => Linking.openURL(`http://www.accuweather.com/pt/br/${locationKey?.cityName}/${locationKey?.Key}/current-weather/${locationKey?.Key}?lang=pt-br`)}>
                            <Text className={`text-7xl font-medium ${theme === 'dark' ? 'text-white' : 'text-black'}`} >{currentT.toFixed(0)}º</Text>
                        </Pressable>
                    ) : null}
                    <Text className="text-6xl font-thin" >|</Text>
                    <View >
                        {currentDescription && (
                            <Text className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                                {currentDescription}
                            </Text>
                        )}
                        <View className="flex flex-row">
                            {temperature?.min !== undefined && temperature?.max !== undefined && (
                                <Text className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{temperature.min.toFixed(0)}°C</Text>
                            )}
                            <Text className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-black'}`}> - </Text>
                            {temperature?.max !== null && (
                                <Text className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{temperature?.max.toFixed(0)}°C</Text>
                            )}
                        </View>
                    </View>
                </View>

                <View className={`rounded-xl gap-3 p-5 mt-12 ${theme === 'dark' ? 'bg-[#1b1d20]' : 'bg-[#ffff]'}`}>
                    <Text className={`text-xl font-medium ${theme === 'dark' ? 'text-white' : 'text-black'}`} >Condições Atuais</Text>
                    {currentTemperature && (
                        <Pressable
                            onPress={() => Linking.openURL(`http://www.accuweather.com/pt/br/${locationKey?.cityName}/${locationKey?.Key}/current-weather/${locationKey?.Key}?lang=pt-br`)}
                            className="flex flex-row gap-4 flex-wrap ">
                            <View className={`flex flex-row gap-3 items-center w-[45%] p-3 rounded-xl h-20 ${theme === 'dark' ? 'bg-[#16181b] ' : 'bg-[#dfdfdf]'}`} >
                                <Entypo name="drop" size={24} color="white" />
                                <View className="flex flex-col">
                                    <Text className={`text-sm leading-5 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Umidade</Text>
                                    <Text className={`text-lg font-semibold leading-5 ${theme === 'dark' ? 'text-white' : 'text-black'}`} >{currentTemperature.rain} %</Text>
                                </View>
                            </View>
                            <View className={`flex flex-row gap-3 items-center w-[45%] p-3 rounded-xl h-20 ${theme === 'dark' ? 'bg-[#16181b] ' : 'bg-[#dfdfdf]'}`} >
                                <MaterialCommunityIcons name="pinwheel" size={24} color="white" />
                                <View className="flex flex-col">
                                    <Text className={`text-sm leading-5 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Vento</Text>
                                    <Text className={`text-lg font-semibold leading-5 ${theme === 'dark' ? 'text-white' : 'text-black'}`} >{currentTemperature.windSpeed} km/h</Text>
                                </View>
                            </View>
                            <View className={`flex flex-row gap-3 items-center w-[45%] p-3 rounded-xl h-20 ${theme === 'dark' ? 'bg-[#16181b] ' : 'bg-[#dfdfdf]'}`}>
                                <MaterialCommunityIcons name="weather-rainy" size={24} color="white" />
                                <View className="flex flex-col">
                                    <Text className={`text-sm leading-5 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Chuva</Text>
                                    <Text className={`text-lg font-semibold leading-5 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{currentTemperature.rain} mm</Text>
                                </View>
                            </View>
                            <View className={`flex flex-row gap-3 items-center w-[45%] p-3 rounded-xl h-20 ${theme === 'dark' ? 'bg-[#16181b] ' : 'bg-[#dfdfdf]'}`}>
                                <MaterialCommunityIcons name="car-brake-low-pressure" size={24} color="white" />
                                <View className="flex flex-col">
                                    <Text className={`text-sm leading-5 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Pressão</Text>
                                    <Text className={`text-lg font-semibold leading-5 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{currentTemperature.Pressure} mb</Text>
                                </View>
                            </View>



                        </Pressable>
                    )}
                </View>
                <View className={`rounded-xl gap-3 p-5 mt-12 ${theme === 'dark' ? 'bg-[#1b1d20] ' : 'bg-[#ffff]'}`} >
                    <Text className={`text-2xl font-medium mb-3 ${theme === 'dark' ? 'text-white' : 'text-black'}`} >Previsão por hora</Text>

                    <FlatList
                        horizontal
                        data={hourTemperature}
                        keyExtractor={(_, index) => index.toString()}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <Pressable
                                onPress={() => Linking.openURL(`https://www.accuweather.com/pt/br/${locationKey?.cityName}/${locationKey?.Key}/hourly-weather-forecast/${locationKey?.Key}?day=2&hbhhour=7&unit=c&lang=pt-br`)}
                                className="flex flex-col items-center mx-2 space-y-8" style={{ minWidth: 60 }}>
                                <Text className={`font-medium text-lg ${theme === 'dark' ? 'text-white' : 'text-black'}`} >{new Date(item.DateTime).getHours()}:00</Text>
                                <Text style={{ padding: 15 }}> {getWeatherIcon(item.WeatherIcon)}</Text>


                                <Text className={` ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{item.Temperature.toFixed(0)}°</Text>
                                <Text className="text-gray-600">{item.ProbabilityRain}%</Text>
                            </Pressable>
                        )}
                    />
                </View>
                <View className={`rounded-xl gap-3 p-5 mt-12 ${theme === 'dark' ? 'bg-[#1b1d20] ' : 'bg-[#ffff]'}`}>
                    <Text className={`text-2xl font-medium mb-3 ${theme === 'dark' ? 'text-white' : 'text-black'}`} >Previsão para 5 dias</Text>

                    <FlatList
                        horizontal
                        data={Forecast}
                        keyExtractor={(_, index) => index.toString()}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => {
                            const iconData = getIconName(item.Icon);
                            const IconComp = iconData.lib;

                            return (
                                <Pressable
                                    onPress={() => {/* ... */ }}
                                    className="flex flex-col items-center mx-2 space-y-8"
                                    style={{ minWidth: 60 }}
                                >
                                    <Text className={`font-medium text-lg ${theme === 'dark' ? 'text-white' : 'text-black'}`} >
                                        {new Date(item.Date).toLocaleDateString('pt-br', { weekday: "short" })}
                                    </Text>

                                    <IconComp name={iconData.name} size={24} color={iconData.color} style={{ padding: 15 }} />

                                    <Text className={` ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{item.Maximum.toFixed(0)}°</Text>
                                    <Text className="text-gray-600">{item.Minimum.toFixed(0)}°</Text>
                                </Pressable>
                            );
                        }}
                    />
                </View>
                <StatusBar />
            </View>

        </ScrollView>

    );
}
