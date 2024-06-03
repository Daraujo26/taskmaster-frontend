import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { Svg, Circle } from "react-native-svg";
import { Octicons, Feather, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Colors from "../constants/colors/colors";

const { width } = Dimensions.get("window");
const NAVBAR_WIDTH = width * 0.8;
const NAVBAR_HEIGHT = 70; // Reduced height of the navbar
const ICON_SIZE = 20; // Reduced size of the icons
const INDICATOR_SIZE = 60; // Reduced size of the indicator
const ICON_COUNT = 5;
const ICON_CONTAINER_WIDTH = NAVBAR_WIDTH / ICON_COUNT;

interface NavbarProps {
  initialSelectedButton: string;
}

const BottomNavBar: React.FC<NavbarProps> = ({ initialSelectedButton }) => {
  const router = useRouter();
  const [selectedButton, setSelectedButton] = useState(initialSelectedButton);
  const translateX = useSharedValue(0);

  useEffect(() => {
    const initialIndex = ICONS.findIndex(
      (icon) => icon.name === initialSelectedButton
    );
    translateX.value = initialIndex * ICON_CONTAINER_WIDTH;
  }, []);

  const handleButtonPress = (button: string, path: string) => {
    const index = ICONS.findIndex((icon) => icon.name === button);
    translateX.value = withTiming(index * ICON_CONTAINER_WIDTH);
    setSelectedButton(button);
    router.push(`/${path}`);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const ICONS = [
    {
      name: "Home",
      component: <Octicons name="home" size={ICON_SIZE} />,
      path: "home",
    },
    {
      name: "Schedule",
      component: <Feather name="calendar" size={ICON_SIZE} />,
      path: "schedule",
    },
    {
      name: "Create",
      component: <Ionicons name="add-circle-outline" size={ICON_SIZE} />,
      path: "create",
    },
    {
      name: "Search",
      component: <Octicons name="search" size={ICON_SIZE} />,
      path: "search",
    },
    {
      name: "Settings",
      component: <Feather name="settings" size={ICON_SIZE} />,
      path: "settings",
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <Animated.View style={[styles.indicatorContainer, animatedStyle]}>
          <Svg width={INDICATOR_SIZE} height={INDICATOR_SIZE}>
            <Circle
              cx={INDICATOR_SIZE / 2}
              cy={INDICATOR_SIZE / 2}
              r={INDICATOR_SIZE / 2}
              fill={Colors.primary}
            />
          </Svg>
        </Animated.View>
        {ICONS.map((icon) => (
          <TouchableOpacity
            key={icon.name}
            style={styles.iconContainer}
            onPress={() => handleButtonPress(icon.name, icon.path)}
          >
            <View style={styles.iconWrapper}>
              {React.cloneElement(icon.component, {
                color:
                  selectedButton === icon.name
                    ? Colors.background
                    : Colors.secondary,
              })}
              <Text
                style={{
                  fontFamily: "Nexa Bold",
                  fontSize: 10, // Reduced font size
                  color:
                    selectedButton === icon.name
                      ? Colors.background
                      : Colors.secondary,
                }}
              >
                {icon.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    position: "absolute",
    bottom: 20, // Positioned slightly higher
    width: "100%",
  },
  navBar: {
    width: NAVBAR_WIDTH,
    height: NAVBAR_HEIGHT,
    backgroundColor: "white",
    borderRadius: NAVBAR_HEIGHT / 2,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconContainer: {
    width: ICON_CONTAINER_WIDTH,
    height: NAVBAR_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
  iconWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  indicatorContainer: {
    position: "absolute",
    top: (NAVBAR_HEIGHT - INDICATOR_SIZE) / 2,
    width: INDICATOR_SIZE,
    height: INDICATOR_SIZE,
    left: (ICON_CONTAINER_WIDTH - INDICATOR_SIZE) / 2, // Center the indicator within the icon container
    alignItems: "center",
    justifyContent: "center",
    zIndex: -1, // Ensure the indicator is behind the icons
  },
});

export default BottomNavBar;
