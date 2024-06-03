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
import ClientSelection from "@/src/components/ClientSelection";
import { Client } from "@/src/interfaces/client";
import { useAppDispatch } from "@/src/hooks/useAppDispatch";
import { addTask } from "@/src/redux/slices/taskSlice";
import { Task } from "@/src/interfaces/task";
import CustomAlert from "@/src/components/CustomAlert";
import { format, addDays } from "date-fns";

const TaskForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [client, setClient] = useState<Client | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [endTime, setEndTime] = useState(new Date());
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [status, setStatus] = useState<Task["status"]>("pending");
  const [priority, setPriority] = useState<Task["priority"]>("medium");
  const [showClientSelection, setShowClientSelection] = useState(false);

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
    if (!client || !title || !description) {
      showAlert("Client, Title, and Description are required");
      return;
    }

    const task: Task = {
      id: 0,
      userId: 0,
      clientId: client.id,
      title,
      description,
      date,
      startTime,
      endTime,
      status,
      priority,
    };

    dispatch(addTask(task))
      .unwrap()
      .then(() => {
        router.back();
      })
      .catch((error) => {
        console.error("Failed to add task:", error);
        showAlert("Failed to add task");
      });
  };

  const handleDateChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === "ios");
    setDate(currentDate);
  };

  const handleStartTimeChange = (
    event: DateTimePickerEvent,
    selectedTime: Date | undefined
  ) => {
    const currentTime = selectedTime || startTime;
    setShowStartTimePicker(Platform.OS === "ios");
    setStartTime(currentTime);
  };

  const handleEndTimeChange = (
    event: DateTimePickerEvent,
    selectedTime: Date | undefined
  ) => {
    const currentTime = selectedTime || endTime;
    setShowEndTimePicker(Platform.OS === "ios");
    setEndTime(currentTime);
  };

  const handleClientSelect = (selectedClient: Client) => {
    setClient(selectedClient);
    setShowClientSelection(false);
  };

  const endDate = endTime < startTime ? addDays(date, 1) : date;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      {showClientSelection ? (
        <ClientSelection onSelectClient={handleClientSelect} />
      ) : (
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Create Task</Text>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={24} color={Colors.primary} />
            </TouchableOpacity>
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Client</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setShowClientSelection(true)}
            >
              <Text>
                {client
                  ? `${client.firstName} ${client.lastName}`
                  : "Select Client"}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="Enter Title"
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={styles.textArea}
              value={description}
              onChangeText={setDescription}
              placeholder="Enter Description"
              multiline
            />
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Date</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)}>
              <Text style={styles.input}>{format(date, "MMMM dd, yyyy")}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Start Time</Text>
            <TouchableOpacity onPress={() => setShowStartTimePicker(true)}>
              <Text style={styles.input}>
                {startTime.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </Text>
            </TouchableOpacity>
            {showStartTimePicker ? (
              <>
                <DateTimePicker
                  value={startTime}
                  mode="time"
                  display="default"
                  minuteInterval={5}
                  onChange={handleStartTimeChange}
                />
                <Text>{format(date, "MMMM dd, yyyy")}</Text>
              </>
            ) : (
              <Text></Text>
            )}
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>End Time</Text>
            <TouchableOpacity onPress={() => setShowEndTimePicker(true)}>
              <Text style={styles.input}>
                {endTime.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </Text>
            </TouchableOpacity>
            {showEndTimePicker ? (
              <>
                <DateTimePicker
                  value={endTime}
                  mode="time"
                  display="default"
                  minuteInterval={5}
                  onChange={handleEndTimeChange}
                />
                <Text>{format(endDate, "MMMM dd, yyyy")}</Text>
              </>
            ) : (
              <Text></Text>
            )}
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Status</Text>
            <View style={styles.statusContainer}>
              {["pending", "in-progress", "completed"].map((stat) => (
                <TouchableOpacity
                  key={stat}
                  style={[
                    styles.statusButton,
                    status === stat && styles.selectedStatusButton,
                  ]}
                  onPress={() => setStatus(stat as Task["status"])}
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
            <Text style={styles.label}>Priority</Text>
            <View style={styles.statusContainer}>
              {["low", "medium", "high"].map((pri) => (
                <TouchableOpacity
                  key={pri}
                  style={[
                    styles.statusButton,
                    priority === pri && styles.selectedStatusButton,
                  ]}
                  onPress={() => setPriority(pri as Task["priority"])}
                >
                  <Text
                    style={[
                      styles.statusButtonText,
                      priority === pri && styles.selectedStatusButtonText,
                    ]}
                  >
                    {pri.charAt(0).toUpperCase() + pri.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <Button
            title="Submit"
            onPress={handleSubmit}
            color={Colors.primary}
          />
          <CustomAlert
            visible={alertVisible}
            message={alertMessage}
            onClose={handleAlertClose}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.primary,
  },
  closeButton: {
    padding: 5,
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
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
});

export default TaskForm;
