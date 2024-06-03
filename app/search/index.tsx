import { useSegments } from "expo-router";
import React from "react";

import { View, Text, SafeAreaView, StyleSheet } from "react-native";

import { UserData } from "@/src/interfaces";
import BottomNavBar from "@/src/components/BottomNavBar";
import { useSelector } from "@/src/hooks/useSelector";

function Index() {
  const userData = useSelector((state) => state.user);
  const segments = useSegments();

  const currentPath = segments[0] || "home";
  const initialSelectedButton =
    currentPath.charAt(0).toUpperCase() + currentPath.slice(1);

  return (
    <>
      {userData.loading ? (
        <Text>loading...</Text>
      ) : (
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.HeaderWrapper}>
            <Text style={styles.HeaderText}>Search</Text>
          </View>
          <View style={styles.BodyWrapper}>
            <BottomNavBar initialSelectedButton={initialSelectedButton} />
          </View>
        </SafeAreaView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  HeaderText: {
    fontFamily: "Nexa Bold",
    fontSize: 25,
    padding: 8,
    paddingLeft: 20,
  },
  HeaderWrapper: {
    flex: 0.05,
    justifyContent: "center",
  },
  BodyWrapper: {
    flex: 0.95,
    backgroundColor: "lightblue",
  },
  FooterWrapper: {
    flex: 0.08,
    borderTopColor: "black",
    borderTopWidth: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderLeftWidth: 1,
    borderRightWidth: 1,
  },
});

export default Index;
