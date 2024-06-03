import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

interface CustomCalendarProps {
  isMonthlyView: boolean;
  onToggleView: () => void;
  style?: object; // Add this line to include the style property
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({
  isMonthlyView,
  onToggleView,
  style, // Destructure the style prop
}) => {
  return (
    <View style={[styles.container, style]}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {isMonthlyView ? "Monthly View" : "Weekly View"}
        </Text>
        <TouchableOpacity onPress={onToggleView}>
          <Text style={styles.toggleText}>
            {isMonthlyView ? "Switch to Weekly View" : "Switch to Monthly View"}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.calendar}>
        {/* Render your calendar view here */}
        <Text>Calendar Content Here</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  toggleText: {
    fontSize: 14,
    color: "#007bff",
  },
  calendar: {
    // Your calendar styles here
  },
});

export default CustomCalendar;
