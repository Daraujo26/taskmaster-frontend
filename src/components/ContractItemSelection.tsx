import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  SafeAreaView,
  TextInput,
} from "react-native";
import { useSelector } from "../hooks/useSelector";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { fetchContractItems } from "@/src/redux/slices/contractItemSlice";
import { ContractItem } from "@/src/interfaces/contractItem";
import Colors from "@/src/constants/colors/colors";
import { router } from "expo-router";

const ContractItemSelection = ({
  onSelectItem,
  onClose,
}: {
  onSelectItem: (item: ContractItem, quantity: number) => void;
  onClose: () => void;
}) => {
  const dispatch = useAppDispatch();
  const contractItems = useSelector(
    (state) => state.contractItems.contractItems
  );

  useEffect(() => {
    dispatch(fetchContractItems());
  }, [dispatch]);

  const [selectedItems, setSelectedItems] = useState<{ [key: number]: number }>(
    {}
  );

  const handleSelectItem = (item: ContractItem, quantity: number) => {
    onSelectItem(item, quantity);
    onClose();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <FlatList
        data={contractItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemName}>{item.itemName}</Text>
            <Text style={styles.itemPrice}>${item.itemPrice.toFixed(2)}</Text>
            <TextInput
              style={styles.input}
              value={selectedItems[item.id]?.toString() || "1"}
              onChangeText={(text: any) =>
                setSelectedItems({
                  ...selectedItems,
                  [item.id]: parseInt(text, 10) || 1,
                })
              }
              placeholder="Quantity"
              keyboardType="numeric"
            />
            <Button
              title="Add"
              onPress={() =>
                handleSelectItem(item, selectedItems[item.id] || 1)
              }
              color={Colors.primary}
            />
          </View>
        )}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="Create New Contract Item"
          onPress={() => router.push("/create/create-contract-item")}
          color={Colors.primary}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  itemName: {
    fontSize: 16,
    flex: 1,
  },
  itemPrice: {
    fontSize: 16,
    flex: 1,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    width: 80,
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 20,
    padding: 10,
  },
});

export default ContractItemSelection;
