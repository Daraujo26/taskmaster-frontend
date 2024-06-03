import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import CustomCalendar from "@/src/components/CustomCalendar"; // Adjust the import path as necessary
import ScheduleList from "@/src/components/ScheduleList"; // Adjust the import path as necessary
import ScheduleDayView from "@/src/components/ScheduleDayView"; // Adjust the import path as necessary
import Colors from "@/src/constants/colors/colors";
import BottomNavBar from "@/src/components/BottomNavBar";
import { useSegments } from "expo-router";
import { UserData } from "@/src/interfaces/user";

const CalendarPage = () => {
  const segments = useSegments();
  const currentPath = segments[0] || "home";
  const initialSelectedButton =
    currentPath.charAt(0).toUpperCase() + currentPath.slice(1);
  const [userData, setUserData] = useState<UserData | null>(null);

  const [isMonthlyView, setIsMonthlyView] = useState(false);

  const toggleView = () => {
    setIsMonthlyView((prev) => !prev);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Schedule</Text>
          <View style={styles.actions}>
            <TouchableOpacity onPress={toggleView}>
              <Text style={styles.actionText}>
                {isMonthlyView
                  ? "Switch to Weekly View"
                  : "Switch to Monthly View"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.actionText}>Configure</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
              <Text style={styles.actionText}>Clock In</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.viewToggle}>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.toggleText}>List View</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.toggleText}>Day View</Text>
          </TouchableOpacity>
        </View>
        <CustomCalendar
          isMonthlyView={isMonthlyView}
          onToggleView={toggleView}
          style={{ marginBottom: 20 }}
        />
        {isMonthlyView ? <ScheduleList /> : <ScheduleDayView />}
      </View>
      <View>
        <BottomNavBar
          initialSelectedButton={initialSelectedButton}
        ></BottomNavBar>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionText: {
    fontSize: 16,
    color: "#007bff",
    marginHorizontal: 10,
  },
  viewToggle: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  toggleText: {
    fontSize: 16,
    color: "#007bff",
  },
});

export default CalendarPage;
