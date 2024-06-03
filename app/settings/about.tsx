import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Linking,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Colors from "@/src/constants/colors/colors";
import * as Device from "expo-device";
import Constants from "expo-constants";

const AboutPage = () => {
  const router = useRouter();
  const [deviceInfo, setDeviceInfo] = useState("");

  useEffect(() => {
    const deviceName = Device.modelName;
    const osName = Device.osName;
    const osVersion = Device.osVersion;
    const deviceInfoString = `${deviceName} (${osName} ${osVersion})`;
    setDeviceInfo(deviceInfoString);
  }, []);

  const handleOpenLink = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error("An error occurred", err)
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={Colors.primary} />
          </TouchableOpacity>
          <Text style={styles.title}>About</Text>
        </View>
        <Text style={styles.subHeader}>TaskMaster Info.</Text>
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>App Version:</Text>
            <Text style={styles.value}>{Constants.manifest?.version}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>User Email:</Text>
            <Text style={styles.value}>user@example.com</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Account Time:</Text>
            <Text style={styles.value}>1 year 2 months</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Device:</Text>
            <Text style={styles.value}>{deviceInfo}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Last Login:</Text>
            <Text style={styles.value}>2024-05-21</Text>
          </View>
        </View>
        <View style={styles.linksContainer}>
          <TouchableOpacity
            style={styles.link}
            onPress={() =>
              handleOpenLink("https://taskmaster.com/privacy-policy")
            }
          >
            <Text style={styles.linkText}>Privacy Policy</Text>
            <Feather name="external-link" size={20} color={Colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.link}
            onPress={() =>
              handleOpenLink("https://taskmaster.com/terms-of-service")
            }
          >
            <Text style={styles.linkText}>Terms of Service</Text>
            <Feather name="external-link" size={20} color={Colors.primary} />
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
  subHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  infoContainer: {
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: "#333",
  },
  value: {
    fontSize: 16,
    color: "#666",
  },
  linksContainer: {
    marginTop: 20,
  },
  link: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  linkText: {
    fontSize: 16,
    color: Colors.primary,
    marginRight: 10,
  },
});

export default AboutPage;
