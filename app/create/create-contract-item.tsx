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
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/src/constants/colors/colors";
import { useAppDispatch } from "@/src/hooks/useAppDispatch";
import { addContractItem } from "@/src/redux/slices/contractItemSlice";
import { ContractItem } from "@/src/interfaces/contractItem";
import CustomAlert from "@/src/components/CustomAlert";

const ContractItemForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [itemName, setItemName] = useState("");
  const [itemMessage, setItemMessage] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [chargeTax, setChargeTax] = useState(false);
  const [optional, setOptional] = useState(false);
  const [itemClass, setItemClass] =
    useState<ContractItem["itemClass"]>("service");

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
    if (!itemName || !itemMessage || !itemPrice) {
      showAlert("Item Name, Message, and Price are required");
      return;
    }

    const newContractItem: ContractItem = {
      itemName,
      itemMessage,
      itemPrice: parseFloat(itemPrice),
      chargeTax,
      optional,
      itemClass,
      id: 0,
      images: [],
      userId: 0,
    };

    dispatch(addContractItem(newContractItem))
      .unwrap()
      .then(() => {
        router.back();
      })
      .catch((error: any) => {
        showAlert("Error: " + error.message);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Create Contract Item</Text>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.closeButton}
          >
            <Ionicons name="close" size={24} color={Colors.primary} />
          </TouchableOpacity>
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Item Name</Text>
          <TextInput
            style={styles.input}
            value={itemName}
            onChangeText={setItemName}
            placeholder="Enter Item Name"
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Item Message</Text>
          <TextInput
            style={styles.input}
            value={itemMessage}
            onChangeText={setItemMessage}
            placeholder="Enter Item Message"
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Item Price</Text>
          <TextInput
            style={styles.input}
            value={itemPrice}
            onChangeText={setItemPrice}
            placeholder="Enter Item Price"
            keyboardType="numeric"
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Item Class</Text>
          <View style={styles.statusContainer}>
            {["service", "product"].map((cls) => (
              <TouchableOpacity
                key={cls}
                style={[
                  styles.statusButton,
                  itemClass === cls && styles.selectedStatusButton,
                ]}
                onPress={() => setItemClass(cls as ContractItem["itemClass"])}
              >
                <Text
                  style={[
                    styles.statusButtonText,
                    itemClass === cls && styles.selectedStatusButtonText,
                  ]}
                >
                  {cls.charAt(0).toUpperCase() + cls.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Charge Tax</Text>
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setChargeTax(!chargeTax)}
          >
            <Ionicons
              name={chargeTax ? "checkbox" : "square-outline"}
              size={24}
              color={Colors.primary}
            />
            <Text style={styles.checkboxLabel}>Charge Tax</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Optional Item for Client</Text>
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setOptional(!optional)}
          >
            <Ionicons
              name={optional ? "checkbox" : "square-outline"}
              size={24}
              color={Colors.primary}
            />
            <Text style={styles.checkboxLabel}>Optional</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Create Contract Item"
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
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default ContractItemForm;
