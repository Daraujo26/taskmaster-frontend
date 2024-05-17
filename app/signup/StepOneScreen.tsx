import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";

import { router, Link, useNavigation } from "expo-router";
import { Image } from "expo-image";
import { AntDesign } from "@expo/vector-icons";

import Setup from "@/app/signup/StepTwoScreen";

import Colors from "@/src/constants/colors/colors";
import TextField from "@/src/components/TextField";

interface UserData {
  name: string;
  company_name: string;
  email: string;
  password: string;
  phone_number: string;
}

function showStepOne({ setUserData, setStepOne }: any) {
  const [nameInputText, setNameInputText] = useState("");
  const [companyNameInputText, setCompanyNameInputText] = useState("");
  const [emailInputText, setEmailInputText] = useState("");
  const [passwordInputText, setPasswordInputText] = useState("");
  const [phoneNumberInput, setPhoneNumberInput] = useState("");

  const [error, setError] = useState<string | null>(null);

  const handleBackButton = () => {
    router.back();
  };

  const userData: UserData = {
    name: nameInputText,
    company_name: companyNameInputText,
    email: emailInputText,
    password: passwordInputText,
    phone_number: phoneNumberInput,
  };
  const handleSignup = () => {
    setStepOne(false);
    setUserData(userData);
    console.log(userData);
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
        <ScrollView>
          <Text style={styles.BodyStepHeader}>Step 1 of 2</Text>
          <Text style={styles.BodySignupHeader}>Create Profile</Text>
          <View style={styles.BodyTextInputWrapper}>
            <TextField
              style={styles.TextInput}
              value={nameInputText}
              label="Name"
              errorText={error}
              password={false}
              onChangeText={setNameInputText}
            />
            <TextField
              style={styles.TextInput}
              value={companyNameInputText}
              label="Company Name"
              errorText={error}
              password={false}
              onChangeText={setCompanyNameInputText}
            />
            <TextField
              style={styles.TextInput}
              value={emailInputText}
              label="Email"
              errorText={error}
              password={false}
              onChangeText={setEmailInputText}
            />
            <TextField
              style={styles.PasswordInput}
              value={passwordInputText}
              label="Password"
              errorText={error}
              password={true}
              onChangeText={(text) => setPasswordInputText(text)}
            />
            <Text style={{ marginBottom: 10 }}>Minimum 8 Characters</Text>
            <TextField
              style={styles.TextInput}
              value={phoneNumberInput}
              label="Phone Number"
              errorText={error}
              password={false}
              onChangeText={setPhoneNumberInput}
            />
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
          <Text style={styles.SignupText}>Next</Text>
        </Pressable>
        <View style={{ paddingTop: 10, alignItems: "center", maxWidth: "70%" }}>
          <Text style={{ paddingBottom: 10 }}>
            By tapping "Next," you agree to our{" "}
            <Link style={{ color: Colors.primary }} href={""}>
              Privacy Policy
            </Link>{" "}
            &{" "}
            <Link style={{ color: Colors.primary }} href={""}>
              Terms of Service
            </Link>
          </Text>
          <Text>
            Already have an account?{" "}
            <Link style={{ color: Colors.primary }} href={"/login"}>
              Login
            </Link>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default showStepOne;

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
    flex: 0.7,
  },
  TextInput: {
    width: "70%",
    margin: 12,
    marginBottom: 8,
  },
  FooterWrapper: {
    flex: 0.25,
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
  SignupButton: {
    width: "75%",
    height: "20%",
    justifyContent: "center",
    borderRadius: 15,
    borderWidth: 2,
    borderColor: Colors.secondary,
    backgroundColor: Colors.background,
  },
  SignupText: {
    fontFamily: "Nexa Bold",
    fontSize: 18,
    textAlign: "center",
    color: Colors.secondary,
    padding: 5,
  },
  Logo: {
    width: 35,
    height: 35,
    marginRight: 5,
    backgroundColor: "pink",
  },
  LogoText: {
    fontSize: 18,
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
});
