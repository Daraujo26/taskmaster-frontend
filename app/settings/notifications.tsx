import React, { useState } from "react";
import {
  View,
  Text,
  Switch,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Colors from "@/src/constants/colors/colors";

const NotificationsPage = () => {
  const router = useRouter();
  const [notifications, setNotifications] = useState({
    scheduleChanged: true,
    morningOverview: true,
    quoteAccepted: true,
    quoteViewed: false,
    jobStatusChanged: true,
    invoicePaid: true,
    allNotifications: true,
  });

  const toggleSwitch = (key: string) => {
    // setNotifications((prevNotifications) => ({
    //   ...prevNotifications,
    //   [key]: !prevNotifications[key],
    // }));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={Colors.primary} />
          </TouchableOpacity>
          <Text style={styles.title}>Notifications</Text>
        </View>
        <Text style={styles.message}>
          Receive push notifications on your mobile device.
        </Text>
        <View style={styles.optionContainer}>
          <View style={styles.option}>
            <Text style={styles.optionText}>Schedule changed today</Text>
            <Switch
              trackColor={{ false: "#767577", true: Colors.primary }}
              thumbColor={notifications.scheduleChanged ? "#f4f3f4" : "#f4f3f4"}
              onValueChange={() => toggleSwitch("scheduleChanged")}
              value={notifications.scheduleChanged}
            />
          </View>
          <View style={styles.option}>
            <Text style={styles.optionText}>Morning work overview</Text>
            <Switch
              trackColor={{ false: "#767577", true: Colors.primary }}
              thumbColor={notifications.morningOverview ? "#f4f3f4" : "#f4f3f4"}
              onValueChange={() => toggleSwitch("morningOverview")}
              value={notifications.morningOverview}
            />
          </View>
          <View style={styles.option}>
            <Text style={styles.optionText}>Quote accepted</Text>
            <Switch
              trackColor={{ false: "#767577", true: Colors.primary }}
              thumbColor={notifications.quoteAccepted ? "#f4f3f4" : "#f4f3f4"}
              onValueChange={() => toggleSwitch("quoteAccepted")}
              value={notifications.quoteAccepted}
            />
          </View>
          <View style={styles.option}>
            <Text style={styles.optionText}>Quote viewed</Text>
            <Switch
              trackColor={{ false: "#767577", true: Colors.primary }}
              thumbColor={notifications.quoteViewed ? "#f4f3f4" : "#f4f3f4"}
              onValueChange={() => toggleSwitch("quoteViewed")}
              value={notifications.quoteViewed}
            />
          </View>
          <View style={styles.option}>
            <Text style={styles.optionText}>Job status changed</Text>
            <Switch
              trackColor={{ false: "#767577", true: Colors.primary }}
              thumbColor={
                notifications.jobStatusChanged ? "#f4f3f4" : "#f4f3f4"
              }
              onValueChange={() => toggleSwitch("jobStatusChanged")}
              value={notifications.jobStatusChanged}
            />
          </View>
          <View style={styles.option}>
            <Text style={styles.optionText}>Invoice paid</Text>
            <Switch
              trackColor={{ false: "#767577", true: Colors.primary }}
              thumbColor={notifications.invoicePaid ? "#f4f3f4" : "#f4f3f4"}
              onValueChange={() => toggleSwitch("invoicePaid")}
              value={notifications.invoicePaid}
            />
          </View>
          <View style={styles.option}>
            <Text style={styles.optionText}>All notifications</Text>
            <Switch
              trackColor={{ false: "#767577", true: Colors.primary }}
              thumbColor={
                notifications.allNotifications ? "#f4f3f4" : "#f4f3f4"
              }
              onValueChange={() => toggleSwitch("allNotifications")}
              value={notifications.allNotifications}
            />
          </View>
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
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  optionText: {
    fontSize: 16,
    color: "#333",
  },
});

export default NotificationsPage;
