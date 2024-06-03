import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  SafeAreaView,
} from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/src/constants/colors/colors";

const InvoiceForm = () => {
  const router = useRouter();
  const [client, setClient] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [contractItems, setContractItems] = useState([]);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("unpaid");
  const [dateIssued, setDateIssued] = useState(new Date());
  const [showDateIssuedPicker, setShowDateIssuedPicker] = useState(false);
  const [expDate, setExpDate] = useState(new Date());
  const [showExpDatePicker, setShowExpDatePicker] = useState(false);

  const handleAddItem = () => {
    // Logic to add a new contract item
  };

  const handleSubmit = () => {
    // Logic to handle form submission
    router.push("/invoices"); // Navigate back to invoices page
  };

  const handleDateIssuedChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    const currentDate = selectedDate || dateIssued;
    setShowDateIssuedPicker(Platform.OS === "ios");
    setDateIssued(currentDate);
  };

  const handleExpDateChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    const currentDate = selectedDate || expDate;
    setShowExpDatePicker(Platform.OS === "ios");
    setExpDate(currentDate);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Create Invoice</Text>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.closeButton}
          >
            <Ionicons name="close" size={24} color={Colors.primary} />
          </TouchableOpacity>
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Client</Text>
          <TextInput
            style={styles.input}
            value={client}
            onChangeText={setClient}
            placeholder="Select Client"
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Job Title</Text>
          <TextInput
            style={styles.input}
            value={jobTitle}
            onChangeText={setJobTitle}
            placeholder="Enter Job Title"
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Message</Text>
          <TextInput
            style={styles.textArea}
            value={message}
            onChangeText={setMessage}
            placeholder="Enter Message"
            multiline
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Date Issued</Text>
          <TouchableOpacity onPress={() => setShowDateIssuedPicker(true)}>
            <Text style={styles.dateText}>
              {dateIssued.toISOString().split("T")[0]}
            </Text>
          </TouchableOpacity>
          {showDateIssuedPicker && (
            <DateTimePicker
              value={dateIssued}
              mode="date"
              display="default"
              onChange={handleDateIssuedChange}
            />
          )}
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Expiration Date</Text>
          <TouchableOpacity onPress={() => setShowExpDatePicker(true)}>
            <Text style={styles.dateText}>
              {expDate.toISOString().split("T")[0]}
            </Text>
          </TouchableOpacity>
          {showExpDatePicker && (
            <DateTimePicker
              value={expDate}
              mode="date"
              display="default"
              onChange={handleExpDateChange}
            />
          )}
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Contract Items</Text>
          {contractItems.map((item: any, index) => (
            <View key={index} style={styles.contractItem}>
              <Text>{item.itemName}</Text>
              <Text>{item.quantity}</Text>
            </View>
          ))}
          <Button title="Add Item" onPress={handleAddItem} />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Create Invoice"
            onPress={handleSubmit}
            color={Colors.primary}
          />
        </View>
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
  dateText: {
    fontSize: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#fff",
    textAlign: "center",
  },
  contractItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default InvoiceForm;
