import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import React from "react";

function IndexLayout() {
  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ headerShown: false, animation: "fade" }}
        />
        <Stack.Screen name="login/index" options={{ headerShown: false }} />
        <Stack.Screen name="signup/index" options={{ headerShown: false }} />
        <Stack.Screen
          name="home/[id]"
          options={{ headerShown: false, animation: "fade" }}
        />
        <Stack.Screen
          name="schedule/[id]"
          options={{ headerShown: false, animation: "fade" }}
        />
        <Stack.Screen
          name="create/[id]"
          options={{ headerShown: false, animation: "fade" }}
        />
        <Stack.Screen
          name="search/[id]"
          options={{ headerShown: false, animation: "fade" }}
        />
        <Stack.Screen
          name="settings/[id]"
          options={{ headerShown: false, animation: "fade" }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}

export default IndexLayout;
