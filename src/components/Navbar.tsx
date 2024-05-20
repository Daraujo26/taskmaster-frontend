import React, { useState, useEffect } from "react";

import { View, StyleSheet, Text, Pressable } from "react-native";

import { Octicons, Feather, Ionicons } from "@expo/vector-icons";

import { useRouter } from "expo-router";
import Colors from "../constants/colors/colors";

function Navbar({
  id,
  selectedButton: initialSelectedButton,
}: {
  id: string | string[] | undefined;
  selectedButton: string;
}) {
  const router = useRouter();
  const [selectedButton, setSelectedButton] = useState(initialSelectedButton);

  useEffect(() => {
    setSelectedButton(initialSelectedButton);
  }, [initialSelectedButton]);

  const handleButtonPress = (button: string, path: string) => {
    router.push(`/${path}/${id}`);
    setSelectedButton(button);
  };

  return (
    <View style={styles.NavbarWrapper}>
      <Pressable
        style={styles.HomeButtonWrapper}
        onPress={() => handleButtonPress("Home", "home")}
      >
        <Octicons
          name="home"
          size={40}
          style={{ paddingBottom: 2 }}
          color={selectedButton === "Home" ? Colors.primary : Colors.secondary}
        ></Octicons>
        <Text
          style={{
            fontFamily: "Nexa Bold",
            fontSize: 12,
            color:
              selectedButton === "Home" ? Colors.primary : Colors.secondary,
          }}
        >
          Home
        </Text>
      </Pressable>
      <Pressable
        style={styles.ScheduleButtonWrapper}
        onPress={() => handleButtonPress("Schedule", "schedule")}
      >
        <Feather
          name="calendar"
          size={40}
          style={{ paddingBottom: 2 }}
          color={
            selectedButton === "Schedule" ? Colors.primary : Colors.secondary
          }
        ></Feather>
        <Text
          style={{
            fontFamily: "Nexa Bold",
            fontSize: 12,
            color:
              selectedButton === "Schedule" ? Colors.primary : Colors.secondary,
          }}
        >
          Schedule
        </Text>
      </Pressable>
      <Pressable
        style={styles.CreateButtonWrapper}
        onPress={() => handleButtonPress("Create", "create")}
      >
        <Ionicons
          name="add-circle-outline"
          size={46}
          style={{ paddingBottom: 3 }}
          color={
            selectedButton === "Create" ? Colors.primary : Colors.secondary
          }
        ></Ionicons>
        <Text
          style={{
            fontFamily: "Nexa Bold",
            fontSize: 12,
            color:
              selectedButton === "Create" ? Colors.primary : Colors.secondary,
          }}
        >
          Create
        </Text>
      </Pressable>
      <Pressable
        style={styles.SearchButtonWrapper}
        onPress={() => handleButtonPress("Search", "search")}
      >
        <Octicons
          name="search"
          size={40}
          style={{ paddingBottom: 2 }}
          color={
            selectedButton === "Search" ? Colors.primary : Colors.secondary
          }
        ></Octicons>
        <Text
          style={{
            fontFamily: "Nexa Bold",
            fontSize: 12,
            color:
              selectedButton === "Search" ? Colors.primary : Colors.secondary,
          }}
        >
          Search
        </Text>
      </Pressable>
      <Pressable
        style={styles.SettingsButtonWrapper}
        onPress={() => handleButtonPress("Settings", "settings")}
      >
        <Feather
          name="settings"
          size={40}
          style={{ paddingBottom: 2 }}
          color={
            selectedButton === "Settings" ? Colors.primary : Colors.secondary
          }
        ></Feather>
        <Text
          style={{
            fontFamily: "Nexa Bold",
            fontSize: 12,
            color:
              selectedButton === "Settings" ? Colors.primary : Colors.secondary,
          }}
        >
          Settings
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  CreateButtonWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  HomeButtonWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  NavbarWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ScheduleButtonWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  SearchButtonWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  SettingsButtonWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Navbar;
