import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Colors from "@/src/constants/colors/colors";

const ExportDataPage = () => {
  const router = useRouter();

  const handleExportData = () => {
    // Logic to handle data export
    Alert.alert(
      "Data Export Requested",
      "You will receive an email with your data shortly."
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={Colors.primary} />
          </TouchableOpacity>
          <Text style={styles.title}>Export Data</Text>
        </View>
        <View style={styles.messageContainer}>
          <Text style={styles.message}>
            We at TaskMaster believe in user rights to access data. You have the
            right to request and receive all your data stored on our platform.
            By clicking the button below, following a verification, you will
            receive an email with all your data in a downloadable format.
          </Text>
          <Text style={styles.note}>
            We encourage users to regularly export their data for safety.
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.exportButton}
            onPress={handleExportData}
          >
            <Text style={styles.exportButtonText}>Export My Data</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    padding: 20,
    backgroundColor: Colors.background,
    flexGrow: 1,
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
  },
  messageContainer: {
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  note: {
    fontSize: 14,
    color: "#666",
  },
  buttonContainer: {
    alignItems: "center",
  },
  exportButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  exportButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default ExportDataPage;
