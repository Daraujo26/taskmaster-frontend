import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native";

import { router } from "expo-router";
import { Image } from "expo-image";
import * as Font from "expo-font";

import Colors from "../src/constants/colors/colors";

async function loadFonts() {
  await Font.loadAsync({
    "Nexa Bold": require("../src/assets/fonts/Nexa Bold.otf"),
    "Nexa Light": require("../src/assets/fonts/Nexa Light.otf"),
  });
  console.log("Fonts loaded");
}

function Index() {
  const handleLogin = () => {
    router.navigate("login");
  };
  const handleSignup = () => {
    router.navigate("signup");
  };

  return (
    <SafeAreaView style={styles.MainWrapper}>
      <View style={styles.HeaderWrapper}>
        <View style={styles.BackWrapper}></View>
        <View style={styles.LogoWrapper}>
          <Image
            source={require("../src/assets/logos/taskmaster-pngs/TaskMaster Final-03.png")}
            style={styles.HeaderLogoImage}
          />
        </View>
      </View>
      <View style={styles.BodyWrapper}>
        <View style={styles.BodyImage}></View>
      </View>
      <View style={styles.FooterWrapper}>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "grey" : Colors.primary,
            },
            styles.LoginButton,
          ]}
          onPress={handleLogin}
        >
          <Text style={styles.LoginText}>Already Have An Account</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "grey" : Colors.secondary,
            },
            styles.SignupButton,
          ]}
          onPress={handleSignup}
        >
          <Text style={styles.SignupText}>Getting Started</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  BackWrapper: {
    flexDirection: "row",
    flex: 0.3,
    alignItems: "center",
  },
  BodyImage: {
    width: "60%",
    height: "75%",
    backgroundColor: "gray",
  },
  BodyWrapper: {
    width: "100%",
    flex: 0.6,
    justifyContent: "center",
    alignItems: "center",
  },
  FooterWrapper: {
    width: "100%",
    flex: 0.35,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  HeaderLogoImage: {
    width: 135,
    height: 30,
  },
  HeaderWrapper: {
    width: "100%",
    flex: 0.05,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  LoginButton: {
    width: "75%",
    height: "20%",
    borderRadius: 15,
    justifyContent: "center",
  },
  LoginText: {
    fontFamily: "Nexa Bold",
    fontSize: 18,
    textAlign: "center",
    color: "#f9f9f9",
    padding: 5,
  },
  LogoWrapper: {
    flex: 0.7,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 15,
  },
  MainWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  SignupButton: {
    width: "75%",
    height: "20%",
    borderRadius: 15,
    justifyContent: "center",
  },
  SignupText: {
    fontFamily: "Nexa Bold",
    fontSize: 18,
    textAlign: "center",
    color: "#f9f9f9",
    padding: 5,
  },
});

export default Index;
