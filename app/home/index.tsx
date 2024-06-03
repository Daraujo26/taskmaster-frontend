import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  ScrollView,
} from "react-native";
import { useSelector } from "@/src/hooks/useSelector";
import { AppState } from "@/src/interfaces/state";
import BottomNavBar from "@/src/components/BottomNavBar";
import { useSegments } from "expo-router";
import moment from "moment";
import Colors from "@/src/constants/colors/colors";

function Index() {
  const userData = useSelector((state: AppState) => state.user);
  const segments = useSegments();

  const currentPath = segments[0] || "home";
  const initialSelectedButton =
    currentPath.charAt(0).toUpperCase() + currentPath.slice(1);

  const companyName = userData.user?.companyName || "Company name not found";

  const currentDate = moment().format("dddd, MMMM Do");
  const currentHour = moment().hour();
  const greeting = currentHour < 12 ? "Good morning" : "Good afternoon";

  const jobs: any = []; // Replace with actual job data
  const tasks: any = []; // Replace with actual task data

  const renderJobItem = ({ item }: any) => (
    <Text style={styles.ListItemText}>{item}</Text>
  );

  const renderTaskItem = ({ item }: any) => (
    <Text style={styles.ListItemText}>{item}</Text>
  );

  return (
    <>
      {userData.loading ? (
        <Text>loading...</Text>
      ) : (
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.HeaderWrapper}>
            <Text style={styles.HeaderText}>{companyName}</Text>
          </View>
          <View style={styles.DateWrapper}>
            <Text style={styles.DateText}>{currentDate}</Text>
          </View>
          <View style={styles.GreetingWrapper}>
            <Text
              style={styles.GreetingText}
            >{`${greeting}, ${userData.user?.firstName}`}</Text>
          </View>
          <View style={styles.StatsWrapper}>
            <Text style={styles.StatsText}>0 jobs worth $0</Text>
            <Text style={styles.StatsText}>0 jobs complete</Text>
          </View>
          <View style={styles.ListWrapper}>
            <Text style={styles.ListHeaderText}>Jobs:</Text>
            <FlatList
              data={jobs}
              renderItem={renderJobItem}
              keyExtractor={(item, index) => index.toString()}
            />
            <Text style={styles.ListHeaderText}>To do:</Text>
            <FlatList
              data={tasks}
              renderItem={renderTaskItem}
              keyExtractor={(item, index) => index.toString()}
            />
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
  HeaderWrapper: {
    flex: 0.06,
  },
  HeaderText: {
    fontFamily: "Nexa Bold",
    fontWeight: "bold",
    fontSize: 28,
    paddingTop: 3,
    paddingLeft: 20,
    color: Colors.primary,
  },
  DateWrapper: {},
  DateText: {
    fontWeight: "500",
    fontSize: 22,
    paddingLeft: 25,
    color: Colors.secondary,
  },
  GreetingWrapper: {},
  GreetingText: {
    fontWeight: "500",
    fontSize: 20,
    paddingTop: 5,
    paddingLeft: 35,
    color: Colors.secondary,
  },
  StatsWrapper: {
    marginVertical: 10,
    paddingLeft: 40,
  },
  StatsText: {
    fontWeight: "500",
    fontSize: 18,
    color: Colors.secondary,
  },
  ListWrapper: {
    flex: 0.6,
    paddingHorizontal: 20,
  },
  ListHeaderText: {
    fontSize: 18,
    fontWeight: "500",
    marginVertical: 10,
    color: Colors.secondary,
  },
  ListItemText: {
    fontSize: 16,
    fontWeight: "500",
    marginVertical: 5,
    color: Colors.secondary,
  },
  BodyWrapper: {
    flex: 0.34,
    justifyContent: "flex-end",
  },
});

export default Index;
