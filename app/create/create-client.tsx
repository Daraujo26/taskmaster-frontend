import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/src/constants/colors/colors";
import { useAppDispatch } from "@/src/hooks/useAppDispatch";
import { addClient } from "@/src/redux/slices/clientSlice";
import { Client } from "@/src/interfaces/client";
import CustomAlert from "@/src/components/CustomAlert";

const ClientForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [clientNotes, setClientNotes] = useState("");
  const [propertyAddress, setPropertyAddress] = useState("");

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleAlertClose = () => {
    setAlertVisible(false);
  };

  const showAlert = (message: any) => {
    setAlertMessage(message);
    setAlertVisible(true);
  };

  const handleSubmit = () => {
    if (!firstName || !lastName || !email) {
      showAlert("First Name, Last Name, and Email are required");
      return;
    }

    const newClient: Client = {
      firstName,
      lastName,
      companyName,
      phoneNumber,
      email,
      clientNotes,
      propertyAddress,
      id: 0,
    };

    dispatch(addClient(newClient))
      .unwrap()
      .then(() => {
        router.back();
      })
      .catch((error: any) => {
        Alert.alert("Error", error);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Create Client</Text>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.closeButton}
          >
            <Ionicons name="close" size={24} color={Colors.primary} />
          </TouchableOpacity>
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
          <Text style={styles.label}>Company Name</Text>
          <TextInput
            style={styles.input}
            value={companyName}
            onChangeText={setCompanyName}
            placeholder="Enter Company Name"
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="Enter Phone Number"
            keyboardType="phone-pad"
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
          <Text style={styles.label}>Client Notes</Text>
          <TextInput
            style={styles.textArea}
            value={clientNotes}
            onChangeText={setClientNotes}
            placeholder="Enter Notes"
            multiline
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Property Address</Text>
          <TextInput
            style={styles.input}
            value={propertyAddress}
            onChangeText={setPropertyAddress}
            placeholder="Enter Property Address"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Create Client"
            onPress={handleSubmit}
            color={Colors.primary}
          />
        </View>
        <CustomAlert
          visible={alertVisible}
          message={alertMessage}
          onClose={handleAlertClose}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors.background,
    flexGrow: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  closeButton: {
    padding: 5,
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
  textArea: {
    height: 80,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default ClientForm;
