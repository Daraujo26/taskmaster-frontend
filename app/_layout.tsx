import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import React from "react";
import { Provider } from "react-redux";
import store from "@/src/redux/store";

function IndexLayout() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Stack>
          <Stack.Screen
            name="index"
            options={{ headerShown: false, animation: "fade" }}
          />
          <Stack.Screen name="login/index" options={{ headerShown: false }} />
          <Stack.Screen name="signup/index" options={{ headerShown: false }} />
          <Stack.Screen
            name="home/index"
            options={{ headerShown: false, animation: "fade" }}
          />
          <Stack.Screen
            name="schedule/index"
            options={{ headerShown: false, animation: "fade" }}
          />
          <Stack.Screen
            name="create/index"
            options={{ headerShown: false, animation: "fade" }}
          />
          <Stack.Screen
            name="create/create-quote"
            options={{ headerShown: false, animation: "fade" }}
          />
          <Stack.Screen
            name="create/create-invoice"
            options={{ headerShown: false, animation: "fade" }}
          />
          <Stack.Screen
            name="create/create-client"
            options={{ headerShown: false, animation: "fade" }}
          />
          <Stack.Screen
            name="create/create-job"
            options={{ headerShown: false, animation: "fade" }}
          />
          <Stack.Screen
            name="create/create-task"
            options={{ headerShown: false, animation: "fade" }}
          />
          <Stack.Screen
            name="search/index"
            options={{ headerShown: false, animation: "fade" }}
          />
          <Stack.Screen
            name="settings/index"
            options={{ headerShown: false, animation: "fade" }}
          />
          <Stack.Screen
            name="settings/profile"
            options={{ headerShown: false, animation: "default" }}
          />
          <Stack.Screen
            name="settings/company"
            options={{ headerShown: false, animation: "default" }}
          />
          <Stack.Screen
            name="settings/export-data"
            options={{ headerShown: false, animation: "default" }}
          />
          <Stack.Screen
            name="settings/subscription"
            options={{ headerShown: false, animation: "default" }}
          />
          <Stack.Screen
            name="settings/notifications"
            options={{ headerShown: false, animation: "default" }}
          />
          <Stack.Screen
            name="settings/support"
            options={{ headerShown: false, animation: "default" }}
          />
          <Stack.Screen
            name="settings/about"
            options={{ headerShown: false, animation: "default" }}
          />
        </Stack>
      </SafeAreaProvider>
    </Provider>
  );
}

export default IndexLayout;
