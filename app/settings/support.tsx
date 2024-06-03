import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Colors from "@/src/constants/colors/colors";

const SupportPage = () => {
  const router = useRouter();

  const handleContactSupport = () => {
    // Logic to contact support, such as opening an email client
    Linking.openURL("mailto:support@taskmaster.com");
  };

  const handleReportIssue = () => {
    // Logic to report an issue, such as opening an email client or a support form
    Linking.openURL("mailto:support@taskmaster.com?subject=App Issue Report");
  };

  const handleOpenFAQ = () => {
    // Logic to open FAQ page
    Linking.openURL("https://taskmaster.com/faq");
  };

  const handleOpenDocs = () => {
    // Logic to open documentation page
    Linking.openURL("https://taskmaster.com/docs");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={Colors.primary} />
          </TouchableOpacity>
          <Text style={styles.title}>Support</Text>
        </View>
        <Text style={styles.message}>
          Need help? Reach out to our support team or report an issue with the
          app.
        </Text>
        <View style={styles.optionContainer}>
          <TouchableOpacity
            style={styles.option}
            onPress={handleContactSupport}
          >
            <Ionicons name="mail" size={24} color={Colors.primary} />
            <Text style={styles.optionText}>Contact Support</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={handleReportIssue}>
            <Ionicons name="bug" size={24} color={Colors.primary} />
            <Text style={styles.optionText}>Report an Issue</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={handleOpenFAQ}>
            <Ionicons name="help-circle" size={24} color={Colors.primary} />
            <Text style={styles.optionText}>FAQs</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.option} onPress={handleOpenDocs}>
            <Ionicons name="document" size={24} color={Colors.primary} />
            <Text style={styles.optionText}>Documentation</Text>
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
  message: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
  },
  optionContainer: {
    marginBottom: 20,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  optionText: {
    fontSize: 16,
    marginLeft: 10,
    color: "#333",
  },
});

export default SupportPage;
