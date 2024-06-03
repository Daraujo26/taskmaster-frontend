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

const JobForm = () => {
  const router = useRouter();
  const [client, setClient] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [message, setMessage] = useState("");
  const [contractItems, setContractItems] = useState([]);
  const [jobDates, setJobDates] = useState<Date[]>([]);
  const [startTime, setStartTime] = useState(new Date());
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [endTime, setEndTime] = useState(new Date());
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [status, setStatus] = useState("planned");

  const handleAddItem = () => {
    // Logic to add a new contract item
  };

  const handleSubmit = () => {
    // Logic to handle form submission
    router.push("/jobs"); // Navigate back to jobs page
  };

  const handleStartTimeChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    const currentDate = selectedDate || startTime;
    setShowStartTimePicker(Platform.OS === "ios");
    setStartTime(currentDate);
  };

  const handleEndTimeChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    const currentDate = selectedDate || endTime;
    setShowEndTimePicker(Platform.OS === "ios");
    setEndTime(currentDate);
  };

  return (
    <SafeAreaView style={{ backgroundColor: Colors.background }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Create Job</Text>
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
          <Text style={styles.label}>Job Dates</Text>
          <TouchableOpacity onPress={() => setShowStartTimePicker(true)}>
            <Text style={styles.dateText}>
              {startTime.toISOString().split("T")[0]}
            </Text>
          </TouchableOpacity>
          {showStartTimePicker && (
            <DateTimePicker
              value={startTime}
              mode="date"
              display="default"
              onChange={handleStartTimeChange}
            />
          )}
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Start Time</Text>
          <TouchableOpacity onPress={() => setShowStartTimePicker(true)}>
            <Text style={styles.dateText}>
              {startTime.toLocaleTimeString()}
            </Text>
          </TouchableOpacity>
          {showStartTimePicker && (
            <DateTimePicker
              value={startTime}
              mode="time"
              display="default"
              onChange={handleStartTimeChange}
            />
          )}
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>End Time</Text>
          <TouchableOpacity onPress={() => setShowEndTimePicker(true)}>
            <Text style={styles.dateText}>{endTime.toLocaleTimeString()}</Text>
          </TouchableOpacity>
          {showEndTimePicker && (
            <DateTimePicker
              value={endTime}
              mode="time"
              display="default"
              onChange={handleEndTimeChange}
            />
          )}
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Status</Text>
          <View style={styles.statusContainer}>
            {["planned", "in-progress", "completed"].map((stat) => (
              <TouchableOpacity
                key={stat}
                style={[
                  styles.statusButton,
                  status === stat && styles.selectedStatusButton,
                ]}
                onPress={() => setStatus(stat)}
              >
                <Text
                  style={[
                    styles.statusButtonText,
                    status === stat && styles.selectedStatusButtonText,
                  ]}
                >
                  {stat.charAt(0).toUpperCase() + stat.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
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
            title="Create Job"
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
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statusButton: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    backgroundColor: "#ddd",
    alignItems: "center",
  },
  selectedStatusButton: {
    backgroundColor: Colors.primary,
  },
  statusButtonText: {
    color: "#000",
  },
  selectedStatusButtonText: {
    color: "#fff",
  },
  datePicker: {
    width: "100%",
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

export default JobForm;
