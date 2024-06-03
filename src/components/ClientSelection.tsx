import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../hooks/useAppDispatch";
import Colors from "@/src/constants/colors/colors";
import { Client } from "@/src/interfaces/client";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import { fetchClients } from "@/src/redux/slices/clientSlice";
import { RootState } from "@/src/redux/store";

const ClientSelection = ({
  onSelectClient,
}: {
  onSelectClient: (client: Client) => void;
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const clients = useSelector((state: RootState) => state.clients.clients);
  const loading = useSelector((state: RootState) => state.clients.loading);
  const error = useSelector((state: RootState) => state.clients.error);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);

  const filteredClients = clients.filter((client) =>
    `${client.firstName} ${client.lastName}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => router.back()}
        style={styles.closeButton}
      >
        <Ionicons name="close" size={24} color={Colors.primary} />
      </TouchableOpacity>
      <Button
        title="Create New Client"
        onPress={() => router.push("create/create-client")}
        color={Colors.primary}
      />
      <TextInput
        style={styles.searchInput}
        placeholder="Search by name"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {loading && <Text>Loading...</Text>}
      {error && <Text>Error: {error}</Text>}
      <FlatList
        data={filteredClients}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => onSelectClient(item)}
            style={styles.clientItem}
          >
            <Text>{`${item.firstName} ${item.lastName}`}</Text>
            <Text>{item.companyName}</Text>
          </TouchableOpacity>
        )}
        style={{ paddingTop: 10 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.background,
  },
  clientItem: {
    padding: 10,
    marginVertical: 5,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  closeButton: {
    padding: 5,
  },
  searchInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
    marginVertical: 10,
  },
});

export default ClientSelection;
