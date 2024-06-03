import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Button,
} from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Dropdown } from "react-native-element-dropdown";
import Colors from "@/src/constants/colors/colors";

const CompanyDetails = () => {
  const router = useRouter();
  const [companyName, setCompanyName] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyPhone, setCompanyPhone] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [companyOccupationValue, setCompanyOccupation] = useState<
    string | null
  >(null);
  const [companySizeValue, setCompanySizeValue] = useState<string | null>(null);
  const [companyRevenueValue, setCompanyRevenueValue] = useState<string | null>(
    null
  );
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [stateValue, setStateValue] = useState<string | null>(null);
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");

  const companyOccupation = [
    { label: "Auto Detailing", value: "1" },
    { label: "Carpentry", value: "2" },
    { label: "Cleaning Services", value: "3" },
    { label: "Construction", value: "4" },
    { label: "Electrical Services", value: "5" },
    { label: "Landscaping", value: "6" },
    { label: "Mechanic", value: "7" },
    { label: "Painting", value: "8" },
    { label: "Plumbing", value: "9" },
    { label: "Pressure Washing", value: "10" },
    { label: "Roofing", value: "11" },
    { label: "Technician", value: "12" },
    { label: "Web Development", value: "13" },
    { label: "Welding", value: "14" },
    { label: "Other", value: "15" },
  ];

  const companySize = [
    { label: "One-Man Band (Just you)", value: "1" },
    { label: "2-10", value: "2" },
    { label: "10+", value: "3" },
  ];

  const companyRevenue = [
    { label: "$0-$50,000", value: "1" },
    { label: "$50,000-$150,000", value: "2" },
    { label: "$150,000-$500,000", value: "3" },
    { label: "$500,000+", value: "4" },
    { label: "I'd prefer not to say", value: "5" },
  ];

  const states = [
    { label: "Alabama", value: "AL" },
    { label: "Alaska", value: "AK" },
    { label: "Arizona", value: "AZ" },
    // Add more states as needed
  ];

  const renderLabel = (value: string | null, labelText: string) => {
    if (value) {
      return (
        <View style={styles.LabelWrapper}>
          <Text style={styles.label}>{labelText}</Text>
        </View>
      );
    }
    return null;
  };

  const handleSave = () => {
    // Logic to save the company details
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={Colors.primary} />
          </TouchableOpacity>
          <Text style={styles.title}>Company Details</Text>
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
          <Text style={styles.label}>Company Email</Text>
          <TextInput
            style={styles.input}
            value={companyEmail}
            onChangeText={setCompanyEmail}
            placeholder="Enter Company Email"
            keyboardType="email-address"
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Company Phone</Text>
          <TextInput
            style={styles.input}
            value={companyPhone}
            onChangeText={setCompanyPhone}
            placeholder="Enter Company Phone"
            keyboardType="phone-pad"
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Company Website</Text>
          <TextInput
            style={styles.input}
            value={companyWebsite}
            onChangeText={setCompanyWebsite}
            placeholder="Enter Company Website"
            keyboardType="url"
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Company Occupation</Text>
          <Dropdown
            style={styles.dropdown}
            data={companyOccupation}
            labelField="label"
            valueField="value"
            placeholder="Select Occupation"
            value={companyOccupationValue}
            onChange={(item) => setCompanyOccupation(item.value)}
            renderLeftIcon={() => (
              <AntDesign style={styles.icon} name="Safety" size={20} />
            )}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Company Size</Text>
          <Dropdown
            style={styles.dropdown}
            data={companySize}
            labelField="label"
            valueField="value"
            placeholder="Select Size"
            value={companySizeValue}
            onChange={(item) => setCompanySizeValue(item.value)}
            renderLeftIcon={() => (
              <AntDesign style={styles.icon} name="user" size={20} />
            )}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Company Revenue</Text>
          <Dropdown
            style={styles.dropdown}
            data={companyRevenue}
            labelField="label"
            valueField="value"
            placeholder="Select Revenue"
            value={companyRevenueValue}
            onChange={(item) => setCompanyRevenueValue(item.value)}
            renderLeftIcon={() => (
              <AntDesign style={styles.icon} name="rocket1" size={20} />
            )}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Address Line 1</Text>
          <TextInput
            style={styles.input}
            value={addressLine1}
            onChangeText={setAddressLine1}
            placeholder="Enter Address Line 1"
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Address Line 2</Text>
          <TextInput
            style={styles.input}
            value={addressLine2}
            onChangeText={setAddressLine2}
            placeholder="Enter Address Line 2"
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>City</Text>
          <TextInput
            style={styles.input}
            value={city}
            onChangeText={setCity}
            placeholder="Enter City"
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>State</Text>
          <Dropdown
            style={styles.dropdown}
            data={states}
            labelField="label"
            valueField="value"
            placeholder="Select State"
            value={stateValue}
            onChange={(item) => setStateValue(item.value)}
            renderLeftIcon={() => (
              <AntDesign style={styles.icon} name="enviromento" size={20} />
            )}
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Zip Code</Text>
          <TextInput
            style={styles.input}
            value={zipCode}
            onChangeText={setZipCode}
            placeholder="Enter Zip Code"
            keyboardType="number-pad"
          />
        </View>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Country</Text>
          <TextInput
            style={styles.input}
            value={country}
            onChangeText={setCountry}
            placeholder="Enter Country"
          />
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
  dropdown: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    backgroundColor: "#fff",
  },
  icon: {
    marginRight: 5,
  },
  LabelWrapper: {
    position: "absolute",
    backgroundColor: Colors.background,
    zIndex: 3,
    top: -8,
    left: 10,
    paddingRight: 3,
    paddingLeft: 3,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default CompanyDetails;
