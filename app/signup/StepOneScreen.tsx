import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";

import { router, Link } from "expo-router";
import { Image } from "expo-image";
import { AntDesign } from "@expo/vector-icons";

import Colors from "@/src/constants/colors/colors";
import TextField from "@/src/components/TextField";
import { E164Number } from "libphonenumber-js";

import { UserData } from "@/src/interfaces";
import PhoneNumberInput from "@/src/components/PhoneInput";

function showStepOne(this: any, { setUserData, setStepOne }: any) {
  let id: number;
  fetch("http://localhost:3000/users/")
    .then((resp) => resp.json())
    .then((data) => {
      const userDatabase = data;
      id = Math.max(...userDatabase.map((user: { id: number }) => user.id)) + 1;
    });

  const [firstNameInputText, setFirstNameInputText] = useState("");
  const [lastNameInputText, setLastNameInputText] = useState("");
  const [companyNameInputText, setCompanyNameInputText] = useState("");
  const [emailInputText, setEmailInputText] = useState("");
  const [passwordInputText, setPasswordInputText] = useState("");
  const [phoneNumberInput, setPhoneNumberInput] = useState<E164Number>();

  const [firstNameError, setFirstNameError] = useState<string | null>(null);
  const [lastNameError, setLastNameError] = useState<string | null>(null);
  const [companyNameError, setCompanyNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const handleBackButton = () => {
    router.back();
  };

  const handleSignup = () => {
    setFirstNameError(null);
    setLastNameError(null);
    setCompanyNameError(null);
    setEmailError(null);
    setPasswordError(null);
    setPhoneError(null);

    if (firstNameInputText == "") {
      return setFirstNameError("Enter first name");
    }
    if (lastNameInputText == "") {
      return setLastNameError("Enter last name");
    }
    if (companyNameInputText == "") {
      return setCompanyNameError("Enter company name");
    }
    if (emailInputText == "") {
      return setEmailError("Enter email");
    }
    if (passwordInputText == "") {
      return setPasswordError("Enter password");
    }
    if (phoneNumberInput == null) {
      return setPhoneError("Enter phone number");
    }

    // email check
    let re = /\S+@\S+\.\S+/;
    let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    if (!re.test(emailInputText) || regex.test(emailInputText)) {
      return setEmailError("Enter a valid email address");
    }
    // password check
    const isNonWhiteSpace = /^\S*$/;
    if (!isNonWhiteSpace.test(passwordInputText)) {
      return setPasswordError("Password must not contain Whitespaces");
    }
    const isContainsUppercase = /^(?=.*[A-Z]).*$/;
    if (!isContainsUppercase.test(passwordInputText)) {
      return setPasswordError(
        "Password must have at least one Uppercase Character"
      );
    }
    const isContainsLowercase = /^(?=.*[a-z]).*$/;
    if (!isContainsLowercase.test(passwordInputText)) {
      return setPasswordError(
        "Password must have at least one Lowercase Character"
      );
    }
    const isContainsNumber = /^(?=.*[0-9]).*$/;
    if (!isContainsNumber.test(passwordInputText)) {
      return setPasswordError("Password must contain at least one digit");
    }
    const isValidLength = /^.{8,16}$/;
    if (!isValidLength.test(passwordInputText)) {
      return setPasswordError("Password must be 8-16 Characters Long");
    }

    const userData: UserData = {
      id: id,
      firstName: firstNameInputText,
      lastName: lastNameInputText,
      companyName: companyNameInputText,
      email: emailInputText,
      password: passwordInputText,
      phoneNumber: phoneNumberInput,
      companyDetails: undefined,
      companyData: undefined,
      usageData: undefined,
      teams: [],
    };
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
              value={firstNameInputText}
              label="First Name"
              password={false}
              errorText={firstNameError}
              onChangeText={setFirstNameInputText}
            />
            <TextField
              style={styles.TextInput}
              value={lastNameInputText}
              label="Last Name"
              password={false}
              errorText={lastNameError}
              onChangeText={setLastNameInputText}
            />
            <TextField
              style={styles.TextInput}
              value={companyNameInputText}
              label="Company Name"
              password={false}
              errorText={companyNameError}
              onChangeText={setCompanyNameInputText}
            />
            <TextField
              style={styles.TextInput}
              value={emailInputText}
              label="Email"
              errorText={emailError}
              password={false}
              onChangeText={setEmailInputText}
            />
            <TextField
              style={styles.PasswordInput}
              value={passwordInputText}
              label="Password"
              errorText={passwordError}
              password={true}
              onChangeText={(text) => setPasswordInputText(text)}
            />
            <PhoneNumberInput
              style={styles.TextInput}
              onChangeText={setPhoneNumberInput}
              label={"Phone Number"}
              value={phoneNumberInput}
              errorText={phoneError}
            />
            <View style={{ height: 300 }}></View>
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
