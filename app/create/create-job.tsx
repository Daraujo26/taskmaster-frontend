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
  Platform,
} from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { useSelector } from "@/src/hooks/useSelector";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/src/constants/colors/colors";
import ClientSelection from "@/src/components/ClientSelection";
import ContractItemSelection from "@/src/components/ContractItemSelection";
import { Client } from "@/src/interfaces/client";
import { useAppDispatch } from "@/src/hooks/useAppDispatch";
import { addJob } from "@/src/redux/slices/jobSlice";
import { Job } from "@/src/interfaces/job";
import CustomAlert from "@/src/components/CustomAlert";
import { format } from "date-fns";
import { useContractItem } from "@/src/components/ContractItemContext";
import { ContractItem } from "@/src/interfaces/contractItem";

const JobForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const contractItems = useSelector(
    (state) => state.contractItems.contractItems
  );

  const { selectedItems, addItem, resetItems } = useContractItem();

  const [client, setClient] = useState<Client | null>(null);
  const [jobTitle, setJobTitle] = useState("");
  const [message, setMessage] = useState("");
  const [dates, setDates] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [startTime, setStartTime] = useState(new Date());
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [endTime, setEndTime] = useState(new Date());
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [status, setStatus] = useState<Job["status"]>("planned");
  const [showClientSelection, setShowClientSelection] = useState(false);
  const [showContractItemSelection, setShowContractItemSelection] =
    useState(false);
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
    if (
      !client ||
      !jobTitle ||
      !message ||
      Object.keys(selectedItems).length === 0
    ) {
      showAlert(
        "Client, Job Title, Message, and at least one Contract Item are required"
      );
      return;
    }

    const contractItems = Object.keys(selectedItems).reduce(
      (acc: any, id: any) => {
        acc[id] = selectedItems[id].quantity;
        return acc;
      },
      {}
    );

    const job = {
      id: 0,
      client: client.id,
      jobTitle,
      message,
      contractItems,
      jobDates: dates,
      startTime: startTime.toISOString(),
      endTime: endTime.toISOString(),
      status,
    };

    dispatch(addJob(job))
      .unwrap()
      .then(() => {
        resetItems();
        router.back();
      })
      .catch((error) => {
        console.error("Failed to add job:", error);
        showAlert("Failed to add job");
      });
  };

  const handleDateChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    if (selectedDate) {
      setDates((prevDates) => [...prevDates, selectedDate]);
    }
    setShowDatePicker(false);
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

  const handleSelectContractItem = (item: ContractItem, quantity: number) => {
    addItem(item, quantity);
    setShowContractItemSelection(false);
  };

  const calculateSubtotal = () => {
    return Object.values(selectedItems).reduce(
      (total, { contractItemId, quantity }) => {
        const item = contractItems.find(
          (item: ContractItem) => item.id === contractItemId
        );
        return item ? total + item.itemPrice * quantity : total;
      },
      0
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      {showClientSelection ? (
        <ClientSelection onSelectClient={handleClientSelect} />
      ) : showContractItemSelection ? (
        <ContractItemSelection
          onSelectItem={handleSelectContractItem}
          onClose={() => setShowContractItemSelection(false)}
        />
      ) : (
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Create Job</Text>
            <TouchableOpacity
              onPress={() => {
                resetItems();
                router.back();
              }}
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
            <Text style={styles.label}>Dates</Text>
            <Button
              title="Add Date"
              onPress={() => setShowDatePicker(true)}
              color={Colors.primary}
            />
            {showDatePicker && (
              <DateTimePicker
                value={new Date()}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}
            {dates.map((date, index) => (
              <Text key={index} style={styles.dateText}>
                {format(date, "MMMM dd, yyyy")}
              </Text>
            ))}
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
                <Text>{format(new Date(), "MMMM dd, yyyy")}</Text>
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
                <Text>{format(new Date(), "MMMM dd, yyyy")}</Text>
              </>
            ) : (
              <Text></Text>
            )}
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Contract Items</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() => setShowContractItemSelection(true)}
            >
              <Text>Select Contract Items</Text>
            </TouchableOpacity>
            {Object.entries(selectedItems).map(
              ([contractItemId, { quantity }]) => {
                const item = contractItems.find(
                  (item: ContractItem) => item.id === parseInt(contractItemId)
                );
                return (
                  <View key={contractItemId} style={styles.itemRow}>
                    <Text>{item?.itemName}</Text>
                    <Text>
                      ${item?.itemPrice} x {quantity}
                    </Text>
                  </View>
                );
              }
            )}
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Subtotal: ${calculateSubtotal()}</Text>
          </View>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Status</Text>
            <View style={styles.statusContainer}>
              {["planned", "in_progress", "completed"].map((statusOption) => (
                <TouchableOpacity
                  key={statusOption}
                  style={[
                    styles.statusButton,
                    status === statusOption && styles.selectedStatusButton,
                  ]}
                  onPress={() => setStatus(statusOption as Job["status"])}
                >
                  <Text
                    style={[
                      styles.statusButtonText,
                      status === statusOption &&
                        styles.selectedStatusButtonText,
                    ]}
                  >
                    {statusOption.charAt(0).toUpperCase() +
                      statusOption.slice(1).replace("_", " ")}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <Button title="Submit" onPress={handleSubmit} />
        </ScrollView>
      )}
      <CustomAlert
        visible={alertVisible}
        message={alertMessage}
        onClose={handleAlertClose}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  closeButton: {
    padding: 8,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    height: 100,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  dateText: {
    marginVertical: 4,
  },
  statusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statusButton: {
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 4,
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

export default JobForm;
