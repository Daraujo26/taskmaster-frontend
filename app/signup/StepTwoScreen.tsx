import React, { useContext, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";

import { router, useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";
import { AntDesign } from "@expo/vector-icons";

import Colors from "@/src/constants/colors/colors";
import TextField from "@/src/components/TextField";
import { Dropdown } from "react-native-element-dropdown";

import { UserData } from "@/src/interfaces";
import CustomAlert from "@/src/components/CustomAlert";

function Setup({ userData }: { userData: UserData | undefined }) {
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const showAlert = (message: any) => {
    setAlertMessage(message);
    setAlertVisible(true);
  };

  const handleAlertClose = () => {
    setAlertVisible(false);
  };

  const [companyOccupationValue, setCompanyOccupation] = useState<
    string | null
  >(null);
  const [isFocusOccupation, setIsFocusOccupation] = useState(false);
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

  const [companySizeValue, setCompanySizeValue] = useState<string | null>(null);
  const [isFocusSize, setIsFocusSize] = useState(false);
  const companySize = [
    { label: "One-Man Band (Just you)", value: "1" },
    { label: "2-10", value: "2" },
    { label: "10+", value: "3" },
  ];

  const [companyRevenueValue, setCompanyRevenueValue] = useState<string | null>(
    null
  );
  const [isFocusRevenue, setIsFocusRevenue] = useState(false);
  const companyRevenue = [
    { label: "$0-$50,000", value: "1" },
    { label: "$50,000-$150,000", value: "2" },
    { label: "$150,000-$500,000", value: "3" },
    { label: "$500,000+", value: "4" },
    { label: "I'd prefer not to say", value: "5" },
  ];

  const [infoInputText, setInfoInputText] = useState("");

  const handleBackButton = () => {
    router.back();
  };

  const handleSignup = () => {
    if (!companyOccupationValue) {
      return showAlert("Fill out Company Occupation field");
    } else if (!companySizeValue) {
      return showAlert("Fill out Company Size field");
    } else if (!companyRevenueValue) {
      return showAlert("Fill out Company Revenue field");
    } else {
      const completeUserData = {
        id: userData?.id,
        firstName: userData?.firstName,
        lastName: userData?.lastName,
        companyName: userData?.companyName,
        email: userData?.email,
        password: userData?.password,
        phoneNumber: userData?.phoneNumber,
        companyDetails: {
          companyOccupation: companyOccupationValue,
          companySize: companySizeValue,
          companyRevenue: companyRevenueValue,
          aboutInfo: infoInputText,
        },
      };

      fetch("http://localhost:3000/users/", {
        method: "POST",
        body: JSON.stringify(completeUserData),
      });

      router.navigate("/home/" + userData?.id);
    }
  };

  const renderLabel = (
    value: string | null,
    isFocus: boolean,
    labelText: string
  ) => {
    if (value || isFocus) {
      return (
        <View style={styles.LabelWrapper}>
          <Text
            style={[styles.label, isFocus ? { color: Colors.primary } : null]}
          >
            {labelText}
          </Text>
        </View>
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.MainWrapper}>
      <View style={styles.HeaderWrapper}>
        <Pressable style={styles.BackWrapper} onPress={handleBackButton}>
          <AntDesign name="arrowleft" size={32} />
          <Text style={styles.BackText}>Back</Text>
        </Pressable>
        <View style={styles.LogoWrapper}>
          <Image
            source={require("../../src/assets/logos/taskmaster-pngs/TaskMaster Final-03.png")}
            style={styles.HeaderLogoImage}
          />
        </View>
      </View>
      <View style={styles.BodyWrapper}>
        <Text style={styles.BodyStepHeader}>Step 2 of 2</Text>
        <Text style={styles.BodySignupHeader}>Set up</Text>
        <ScrollView>
          <View style={styles.BodyTextInputWrapper}>
            <View style={styles.DropdownInputWrapper}>
              {renderLabel(
                companyOccupationValue,
                isFocusOccupation,
                "Company Occupation"
              )}
              <Dropdown
                style={[
                  styles.DropdownInput,
                  isFocusOccupation ? { borderColor: Colors.primary } : null,
                ]}
                placeholderStyle={styles.PlaceholderStyle}
                selectedTextStyle={styles.SelectedTextStyle}
                inputSearchStyle={styles.InputSearchStyle}
                iconStyle={styles.IconStyle}
                data={companyOccupation}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocusOccupation ? "Company Occupation" : "..."}
                searchPlaceholder="Search..."
                value={companyOccupationValue}
                onFocus={() => setIsFocusOccupation(true)}
                onBlur={() => setIsFocusOccupation(false)}
                onChange={(item) => {
                  setCompanyOccupation(item.value);
                  setIsFocusOccupation(false);
                }}
                renderLeftIcon={() => (
                  <AntDesign
                    style={styles.icon}
                    color={isFocusOccupation ? Colors.primary : "black"}
                    name="Safety"
                    size={20}
                  />
                )}
              ></Dropdown>
            </View>
            <View style={styles.DropdownInputWrapper}>
              {renderLabel(companySizeValue, isFocusSize, "Company Size")}
              <Dropdown
                style={[
                  styles.DropdownInput,
                  isFocusSize ? { borderColor: Colors.primary } : null,
                ]}
                placeholderStyle={styles.PlaceholderStyle}
                selectedTextStyle={styles.SelectedTextStyle}
                inputSearchStyle={styles.InputSearchStyle}
                iconStyle={styles.IconStyle}
                data={companySize}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocusSize ? "Company Size" : "..."}
                searchPlaceholder="Search..."
                value={companySizeValue}
                onFocus={() => setIsFocusSize(true)}
                onBlur={() => setIsFocusSize(false)}
                onChange={(item) => {
                  setCompanySizeValue(item.value);
                  setIsFocusSize(false);
                }}
                renderLeftIcon={() => (
                  <AntDesign
                    style={styles.icon}
                    color={isFocusSize ? Colors.primary : "black"}
                    name="user"
                    size={20}
                  />
                )}
              ></Dropdown>
            </View>
            <View style={styles.DropdownInputWrapper}>
              {renderLabel(
                companyRevenueValue,
                isFocusRevenue,
                "Company Revenue"
              )}
              <Dropdown
                style={[
                  styles.DropdownInput,
                  isFocusSize ? { borderColor: Colors.primary } : null,
                ]}
                placeholderStyle={styles.PlaceholderStyle}
                selectedTextStyle={styles.SelectedTextStyle}
                inputSearchStyle={styles.InputSearchStyle}
                iconStyle={styles.IconStyle}
                data={companyRevenue}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={
                  !isFocusRevenue ? "What's your estimated revenue?" : "..."
                }
                searchPlaceholder="Search..."
                value={companyRevenueValue}
                onFocus={() => setIsFocusRevenue(true)}
                onBlur={() => setIsFocusRevenue(false)}
                onChange={(item) => {
                  setCompanyRevenueValue(item.value);
                  setIsFocusRevenue(false);
                }}
                renderLeftIcon={() => (
                  <AntDesign
                    style={styles.icon}
                    color={isFocusSize ? Colors.primary : "black"}
                    name="rocket1"
                    size={20}
                  />
                )}
              ></Dropdown>
            </View>
            <TextField
              style={styles.TextInput}
              value={infoInputText}
              label="How did you hear about us?"
              password={false}
              onChangeText={setInfoInputText}
            ></TextField>
          </View>
        </ScrollView>
      </View>
      <View style={styles.FooterWrapper}>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "grey" : Colors.primary,
            },
            styles.SignupButton,
          ]}
          onPress={handleSignup}
        >
          <Text style={styles.SignupText}>Sign up</Text>
          <CustomAlert
            visible={alertVisible}
            message={alertMessage}
            onClose={handleAlertClose}
          />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  BackText: {
    fontSize: 18,
    marginLeft: 3,
    fontFamily: "Nexa Bold",
  },
  BackWrapper: {
    flexDirection: "row",
    flex: 0.3,
    alignItems: "center",
  },
  BodyTextInputWrapper: {
    width: "100%",
    height: "50%",
    alignItems: "center",
  },
  BodySignupHeader: {
    fontFamily: "Nexa Bold",
    fontSize: 28,
    padding: 20,
    paddingBottom: 5,
    paddingTop: 0,
    marginLeft: 25,
  },
  BodyStepHeader: {
    fontFamily: "Nexa Bold",
    fontSize: 22,
    padding: 20,
    paddingTop: 25,
    marginLeft: 25,
    paddingBottom: 15,
  },
  BodyWrapper: {
    flex: 0.75,
    width: "100%",
    height: "50%",
  },
  DropdownInput: {
    height: "70%",
    width: "100%",
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  DropdownInputWrapper: {
    width: "70%",
    height: "100%",
    marginTop: 10,
    alignItems: "center",
  },
  FooterWrapper: {
    flex: 0.2,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  HeaderLogoImage: {
    width: 135,
    height: 30,
  },
  HeaderWrapper: {
    flex: 0.05,
    flexDirection: "row",
    paddingLeft: 5,
  },
  icon: {
    marginRight: 5,
  },
  IconStyle: {
    width: 20,
    height: 20,
  },
  InputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  SelectedTextStyle: {
    fontSize: 16,
  },
  SignupButton: {
    width: "75%",
    height: "35%",
    justifyContent: "center",
    borderRadius: 15,
    backgroundColor: Colors.primary,
  },
  SignupText: {
    fontFamily: "Nexa Bold",
    fontSize: 22,
    textAlign: "center",
    color: "#f9f9f9",
    padding: 5,
  },
  label: {
    fontSize: 14,
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
  LogoWrapper: {
    flex: 0.7,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 15,
  },
  MainWrapper: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  PasswordInput: {
    width: "70%",
    margin: 12,
  },
  PlaceholderStyle: {
    fontSize: 16,
  },
  TextInput: {
    width: "70%",
    margin: 12,
    marginBottom: 8,
  },
});

export default Setup;
