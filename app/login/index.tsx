import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Pressable,
  Button,
} from "react-native";

import { router, Link } from "expo-router";
import { Image } from "expo-image";
import { AntDesign } from "@expo/vector-icons";

import Colors from "@/src/constants/colors/colors";
import TextField from "@/src/components/TextField";

import { useAppDispatch } from "@/src/hooks/useAppDispatch";
import { loginUser } from "@/src/redux/slices/userSlice";
import { useSelector } from "@/src/hooks/useSelector";
import { AppState } from "@/src/interfaces/state";

function Index() {
  const dispatch = useAppDispatch();
  const userData = useSelector((state: AppState) => state.user);

  const [emailInputText, setEmailInputText] = useState("");
  const [passwordInputText, setPasswordInputText] = useState("");

  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handleBackButton = () => {
    router.back();
  };
  const handleForgotPassword = () => {
    console.log("forgot password clicked");
  };

  const handleLogin = () => {
    setEmailError(null);
    setPasswordError(null);

    let re = /\S+@\S+\.\S+/;
    let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    if (!re.test(emailInputText) || regex.test(emailInputText)) {
      setEmailError("Enter a valid email address");
      return;
    }

    if (re.test(emailInputText) && !regex.test(emailInputText)) {
      dispatch(
        loginUser({ email: emailInputText, password: passwordInputText })
      );
    }
  };

  useEffect(() => {
    if (!userData.loading && userData.user !== null && !userData.error) {
      router.navigate("/home");
    }
    if (userData.error) {
      console.log(userData.error);
      setPasswordError(userData.error);
    }
  }, [userData]);

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
        <Text style={styles.BodyLoginHeader}>Log in</Text>
        <View style={styles.BodyTextInputWrapper}>
          <TextField
            style={styles.EmailInput}
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
          <Text
            style={{ color: Colors.primary }}
            onPress={handleForgotPassword}
          >
            Forgot Password?
          </Text>
        </View>
      </View>
      <View style={styles.FooterWrapper}>
        {emailInputText == "" || passwordInputText == "" ? (
          <Pressable
            style={[
              {
                backgroundColor: Colors.secondary,
              },
              styles.LoginButton,
            ]}
            onPress={() => {}}
          >
            <Text style={styles.LoginText}>Log In</Text>
          </Pressable>
        ) : (
          <Pressable
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? "grey" : Colors.primary,
              },
              styles.LoginButton,
            ]}
            onPress={handleLogin}
          >
            <Text style={styles.LoginText}>Log In</Text>
          </Pressable>
        )}
        <View style={{ paddingTop: 10, alignItems: "center" }}>
          <Text>
            Don't have an account?{" "}
            <Link style={{ color: Colors.primary }} href={"/signup"}>
              Sign up
            </Link>
          </Text>
        </View>
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
  BodyLoginHeader: {
    fontFamily: "Nexa Bold",
    fontSize: 28,
    padding: 20,
    paddingBottom: 5,
    paddingTop: 25,
    marginLeft: 25,
  },
  BodyWrapper: {
    flex: 0.65,
  },
  EmailInput: {
    width: "70%",
    margin: 12,
  },
  FooterWrapper: {
    flex: 0.3,
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
  LoginButton: {
    width: "75%",
    height: "20%",
    justifyContent: "center",
    borderRadius: 15,
  },
  LoginText: {
    fontFamily: "Nexa Bold",
    fontSize: 18,
    textAlign: "center",
    color: Colors.background,
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

export default Index;
