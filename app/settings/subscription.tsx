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

const SubscriptionsPage = () => {
  const router = useRouter();

  const handleSubscribe = (plan: string) => {
    // Logic to handle subscription
    alert(`Subscribed to ${plan}`);
  };

  const openLink = (url: string) => {
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
          <Text style={styles.title}>Subscriptions</Text>
        </View>
        <View style={styles.planContainer}>
          <View style={styles.planBlock}>
            <Text style={styles.planTitle}>Base Plan</Text>
            <Text style={styles.planPrice}>$11.99/month</Text>
            <Text style={styles.planDescription}>
              Access to base features: manage quotes, invoices, clients, jobs,
              and tasks.
            </Text>
            <TouchableOpacity
              style={styles.subscribeButton}
              onPress={() => handleSubscribe("Base Plan")}
            >
              <Text style={styles.subscribeButtonText}>Subscribe</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.planBlock}>
            <Text style={styles.planTitle}>Pro Plan</Text>
            <Text style={styles.planPrice}>$44.99/month</Text>
            <Text style={styles.planDescription}>
              Includes all base features plus: access to teams, multiple users
              in the same network.
            </Text>
            <TouchableOpacity
              style={styles.subscribeButton}
              onPress={() => handleSubscribe("Pro Plan")}
            >
              <Text style={styles.subscribeButtonText}>Subscribe</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.messageContainer}>
          <Text style={styles.message}>
            When you subscribe, your plan will be charged at the time of
            purchase and automatically renews monthly. Cancel your subscription
            at any time through your Apple ID.
          </Text>
          <Text style={styles.note}>
            Please read our{" "}
            <Text
              style={styles.link}
              onPress={() => openLink("https://example.com/privacy-policy")}
            >
              Privacy Policy
            </Text>{" "}
            and{" "}
            <Text
              style={styles.link}
              onPress={() => openLink("https://example.com/terms-of-service")}
            >
              Terms of Service
            </Text>
            .
          </Text>
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
  planContainer: {
    marginBottom: 20,
  },
  planBlock: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  planTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  planPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 10,
  },
  planDescription: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  subscribeButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  subscribeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
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
  link: {
    color: Colors.primary,
    textDecorationLine: "underline",
  },
});

export default SubscriptionsPage;
