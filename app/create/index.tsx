import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { Octicons, Feather, Ionicons } from "@expo/vector-icons";
import { useRouter, useSegments } from "expo-router";
import Colors from "@/src/constants/colors/colors";
import BottomNavBar from "@/src/components/BottomNavBar";
import { useSelector } from "@/src/hooks/useSelector";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width * 0.4;
const CARD_HEIGHT = 150;

const CreatePage = () => {
  const router = useRouter();
  const userData = useSelector((state) => state.user);

  const segments = useSegments();

  const currentPath = segments[0] || "home";
  const initialSelectedButton =
    currentPath.charAt(0).toUpperCase() + currentPath.slice(1);

  const options = [
    {
      name: "Quote",
      icon: <Octicons name="file" size={40} color={Colors.primary} />,
      path: "create-quote",
      description: "Create a new quote for a client",
    },
    {
      name: "Invoice",
      icon: <Feather name="file-text" size={40} color={Colors.primary} />,
      path: "create-invoice",
      description: "Generate an invoice for a job",
    },
    {
      name: "Client",
      icon: <Ionicons name="person" size={40} color={Colors.primary} />,
      path: "create-client",
      description: "Add a new client to your list",
    },
    {
      name: "Job",
      icon: <Feather name="briefcase" size={40} color={Colors.primary} />,
      path: "create-job",
      description: "Create a new job or project",
    },
    {
      name: "Task",
      icon: <Octicons name="checklist" size={40} color={Colors.primary} />,
      path: "create-task",
      description: "Add a task to a job or project",
    },
  ];

  return (
    <>
      {userData.loading ? (
        <Text>Loading...</Text>
      ) : (
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.container}>
            <Text style={styles.title}>Create New</Text>
            <Text style={styles.description}>
              Select what you want to create from the options below.
            </Text>
            <View style={styles.grid}>
              {options.map((option) => (
                <TouchableOpacity
                  key={option.name}
                  style={styles.card}
                  onPress={() => router.push(`/create/${option.path}`)}
                >
                  <View style={styles.iconWrapper}>{option.icon}</View>
                  <Text style={styles.cardTitle}>{option.name}</Text>
                  <Text style={styles.cardDescription}>
                    {option.description}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <BottomNavBar initialSelectedButton={initialSelectedButton} />
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconWrapper: {
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
});

export default CreatePage;
