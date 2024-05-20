import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";

import { View, Text, SafeAreaView, StyleSheet } from "react-native";

import Navbar from "@/src/components/Navbar";

import { UserData } from "@/src/interfaces";

function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);

  const userId = useLocalSearchParams()["id"];

  useEffect(() => {
    fetch("http://localhost:3000/users/")
      .then((resp) => resp.json())
      .then((data) => {
        let user = data.filter(
          (user: { [x: string]: string | string[] | undefined }) =>
            user["id"] == userId
        )[0];
        if (user) {
          setUserData(user);
        }
        setIsLoading(false);
      });
  });

  return (
    <>
      {isLoading ? (
        <Text>loading...</Text>
      ) : (
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.HeaderWrapper}>
            <Text style={styles.HeaderText}>Search</Text>
          </View>
          <View style={styles.BodyWrapper}></View>
          <View style={styles.FooterWrapper}>
            <Navbar id={userId} selectedButton="Search"></Navbar>
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
    flex: 0.87,
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
