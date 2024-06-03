import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Colors from "@/src/constants/colors/colors";

const jobs = [
  {
    id: "1",
    title: "Job 1",
    time: "9:00 AM - 10:00 AM",
    description: "Description for Job 1",
  },
  {
    id: "2",
    title: "Job 2",
    time: "11:00 AM - 12:00 PM",
    description: "Description for Job 2",
  },
  {
    id: "3",
    title: "Job 3",
    time: "1:00 PM - 2:00 PM",
    description: "Description for Job 3",
  },
  // Add more jobs here
];

const ScheduleList = () => {
  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.jobItem}>
      <Text style={styles.jobTitle}>{item.title}</Text>
      <Text style={styles.jobTime}>{item.time}</Text>
      <Text style={styles.jobDescription}>{item.description}</Text>
    </View>
  );

  return (
    <FlatList
      data={jobs}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors.background,
  },
  jobItem: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primary,
  },
  jobTime: {
    fontSize: 14,
    color: Colors.secondary,
    marginBottom: 5,
  },
  jobDescription: {
    fontSize: 14,
    color: "#333",
  },
});

export default ScheduleList;
