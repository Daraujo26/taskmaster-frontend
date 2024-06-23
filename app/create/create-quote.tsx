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
import { useContractItem } from "@/src/components/ContractItemContext";
import { ContractItem } from "@/src/interfaces/contractItem";
import { useSelector } from "@/src/hooks/useSelector";
import ContractItemSelection from "@/src/components/ContractItemSelection";

const QuoteForm = () => {
  const router = useRouter();
  const [client, setClient] = useState<Client | null>(null);
  const [jobTitle, setJobTitle] = useState("");
  const contractItems = useSelector(
    (state) => state.contractItems.contractItems
  );
  const [message, setMessage] = useState("");
  const [showClientSelection, setShowClientSelection] = useState(false);
  const [showContractItemSelection, setShowContractItemSelection] =
    useState(false);
  const { selectedItems, addItem, resetItems } = useContractItem();

  const handleSelectContractItem = (item: ContractItem, quantity: number) => {
    addItem(item, quantity);
    setShowContractItemSelection(false);
  };

  const handleClientSelect = (selectedClient: Client) => {
    setClient(selectedClient);
    setShowClientSelection(false);
  };

  const handleAddItem = () => {
    // Logic to add a new contract item
  };

  const handleSubmit = () => {
    // Logic to handle form submission
    router.push("/quotes"); // Navigate back to quotes page
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
            <Text style={styles.title}>Create Quote</Text>
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
        </ScrollView>
      )}
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
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
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

export default QuoteForm;
