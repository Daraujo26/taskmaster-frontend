import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Alert,
  SafeAreaView,
} from "react-native";
import {
  MaterialIcons,
  Ionicons,
  FontAwesome5,
  Feather,
  Entypo,
} from "@expo/vector-icons";
import { useRouter, useSegments } from "expo-router";
import Colors from "@/src/constants/colors/colors";
import BottomNavBar from "@/src/components/BottomNavBar";

const SettingsPage = () => {
  const router = useRouter();

  const segments = useSegments();

  const currentPath = segments[0] || "home";
  const initialSelectedButton =
    currentPath.charAt(0).toUpperCase() + currentPath.slice(1);

  const handleLogout = () => {
    // Logic for logging out the user
    Alert.alert("Logged Out", "You have been logged out successfully.");
    router.push("/login"); // Redirect to login page
  };

  const openLink = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error("An error occurred", err)
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Settings</Text>
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.option}
            onPress={() => router.push("/settings/profile")}
          >
            <MaterialIcons name="person" size={24} color={Colors.primary} />
            <Text style={styles.optionText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.option}
            onPress={() => router.push("/settings/company")}
          >
            <FontAwesome5 name="building" size={24} color={Colors.primary} />
            <Text style={styles.optionText}>Company Details</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.option}
            onPress={() => router.push("/settings/export-data")}
          >
            <Ionicons name="cloud-download" size={24} color={Colors.primary} />
            <Text style={styles.optionText}>Export Data</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.option}
            onPress={() => router.push("/settings/subscription")}
          >
            <Feather name="credit-card" size={24} color={Colors.primary} />
            <Text style={styles.optionText}>Subscription</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.option}
            onPress={() => router.push("/settings/notifications")}
          >
            <Ionicons name="notifications" size={24} color={Colors.primary} />
            <Text style={styles.optionText}>Notifications</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.option}
            onPress={() => router.push("/settings/support")}
          >
            <MaterialIcons
              name="support-agent"
              size={24}
              color={Colors.primary}
            />
            <Text style={styles.optionText}>Support</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.option}
            onPress={() => openLink("https://officialwebsite.com")}
          >
            <Ionicons name="globe" size={24} color={Colors.primary} />
            <Text style={styles.optionText}>Official Website</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.option}
            onPress={() => router.push("/settings/about")}
          >
            <Feather name="info" size={24} color={Colors.primary} />
            <Text style={styles.optionText}>About</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.logoutSection}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Entypo name="log-out" size={24} color={Colors.primary} />
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    padding: 20,
    backgroundColor: "#f9f9f9",
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  section: {
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
  logoutSection: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },
  logoutButtonText: {
    fontSize: 16,
    marginLeft: 10,
    color: Colors.primary,
  },
});

export default SettingsPage;
