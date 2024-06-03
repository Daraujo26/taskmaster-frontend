import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Colors from "@/src/constants/colors/colors";

const ProfileSettings = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSave = () => {
    // Logic to save the changes
    Alert.alert("Profile Saved", "Your profile has been updated successfully.");
  };

  const handlePasswordReset = () => {
    // Logic to send password reset email
    Alert.alert("Password Reset", "A password reset email has been sent.");
  };

  const handleCloseAccount = () => {
    // Logic to close the account
    Alert.alert(
      "Close Account",
      "Are you sure you want to close your account? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Close Account",
          style: "destructive",
          onPress: () => {
            // Add account closing logic here
            router.push("/login"); // Redirect to login page after account is closed
          },
        },
      ]
    );
  };

  const formatPhoneNumber = (input: string) => {
    // Remove all non-numeric characters
    const cleaned = ("" + input).replace(/\D/g, "");

    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }

    return input;
  };

  const handlePhoneNumberChange = (input: string) => {
    setPhoneNumber(formatPhoneNumber(input));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={Colors.primary} />
          </TouchableOpacity>
          <Text style={styles.title}>Profile Settings</Text>
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={styles.input}
            value={firstName}
            onChangeText={setFirstName}
            placeholder="Enter First Name"
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={styles.input}
            value={lastName}
            onChangeText={setLastName}
            placeholder="Enter Last Name"
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter Email"
            keyboardType="email-address"
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={phoneNumber}
            onChangeText={handlePhoneNumberChange}
            placeholder="Enter Phone Number"
            keyboardType="phone-pad"
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Password</Text>
          <TouchableOpacity
            style={styles.passwordButton}
            onPress={handlePasswordReset}
          >
            <Text style={styles.passwordButtonText}>
              Send Password Reset Email
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.formGroup}>
          <TouchableOpacity
            style={styles.closeAccountButton}
            onPress={handleCloseAccount}
          >
            <Text style={styles.closeAccountButtonText}>Close Account</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Save" onPress={handleSave} color={Colors.primary} />
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
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
  },
  passwordButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary,
    alignItems: "center",
  },
  passwordButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  closeAccountButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "red",
    alignItems: "center",
  },
  closeAccountButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default ProfileSettings;
