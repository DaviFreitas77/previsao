import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import '../global.css'
import { TouchableOpacity, View, Text } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import Fontisto from '@expo/vector-icons/Fontisto';
import { ThemeProvider, useTheme } from "../src/ThemeContext";

const queryClient = new QueryClient();
function CustomHeader() {
  const { theme, toggleTheme } = useTheme();

  var hours = new Date().getHours(); //To get the Current Hours
  return (
    <View
      style={{
        height: 40,
        backgroundColor: theme === 'dark' ? '#16181b' : '#dfdfdf',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
      }}
    >
      {hours > 5 && hours < 12 ? (
        <Text className={`text-xl font-medium ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Bom dia</Text>
      ) : hours > 12 && hours < 18 ? (
        <Text className={`text-xl font-medium ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Boa Tarde</Text>
      ) : (
        <Text className={`text-xl font-medium ${theme === 'dark' ? 'text-white' : 'text-black'}`}>Boa Noite</Text>
      )}
      <TouchableOpacity onPress={toggleTheme}>
        <Ionicons
          name={theme === 'dark' ? 'sunny' : 'moon'}
          size={24}
          color={theme === 'dark' ? 'orange' : 'black'}
        />
      </TouchableOpacity>
    </View>
  );
}

function Pages() {
  
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          header: () => <CustomHeader />,

        }}
      />
   

    </Stack>
  );
}

export default function Layout() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <Pages />
      </QueryClientProvider>
    </ThemeProvider>
  );
}