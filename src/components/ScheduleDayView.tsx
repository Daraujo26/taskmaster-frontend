import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Colors from "@/src/constants/colors/colors";

const jobs = [
  {
    id: "1",
    title: "Job 1",
    time: "9:00 AM - 10:00 AM",
    description: "Description for Job 1",
    startTime: "09:00",
    endTime: "10:00",
  },
  {
    id: "2",
    title: "Job 2",
    time: "11:00 AM - 12:00 PM",
    description: "Description for Job 2",
    startTime: "11:00",
    endTime: "12:00",
  },
  {
    id: "3",
    title: "Job 3",
    time: "1:00 PM - 2:00 PM",
    description: "Description for Job 3",
    startTime: "13:00",
    endTime: "14:00",
  },
  // Add more jobs here
];

const timeSlots = Array.from({ length: 24 }, (_, index) => {
  const hour = index % 12 === 0 ? 12 : index % 12;
  const period = index < 12 ? "AM" : "PM";
  return `${hour}:00 ${period}`;
});

const ScheduleDayView = () => {
  const renderJob = (job: any) => (
    <View key={job.id} style={[styles.jobItem, getPositionStyle(job)]}>
      <Text style={styles.jobTitle}>{job.title}</Text>
      <Text style={styles.jobTime}>{job.time}</Text>
      <Text style={styles.jobDescription}>{job.description}</Text>
    </View>
  );

  const getPositionStyle = (job: any) => {
    const start = parseTime(job.startTime);
    const end = parseTime(job.endTime);
    const top = (start / 24) * 1440;
    const height = ((end - start) / 24) * 1440;
    return {
      top,
      height,
    };
  };

  const parseTime = (time: string) => {
    const [hour, minute] = time.split(":").map(Number);
    return hour + minute / 60;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {timeSlots.map((slot, index) => (
        <View key={index} style={styles.timeSlot}>
          <Text style={styles.timeSlotText}>{slot}</Text>
        </View>
      ))}
      {jobs.map(renderJob)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors.background,
    height: 1440, // 24 hours * 60 minutes
    position: "relative",
  },
  timeSlot: {
    height: 60,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  timeSlotText: {
    fontSize: 12,
    color: Colors.secondary,
  },
  jobItem: {
    position: "absolute",
    left: 20,
    right: 20,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  jobTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.primary,
  },
  jobTime: {
    fontSize: 12,
    color: Colors.secondary,
    marginBottom: 5,
  },
  jobDescription: {
    fontSize: 12,
    color: "#333",
  },
});

export default ScheduleDayView;
