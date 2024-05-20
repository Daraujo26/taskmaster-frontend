import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Animated,
  Easing,
} from "react-native";
import PhoneInput from "react-native-phone-input";
import CountryPicker, { CountryCode } from "react-native-country-picker-modal";
import Colors from "../constants/colors/colors";
import { E164Number } from "libphonenumber-js";

interface PhoneNumberInputProps {
  style?: object;
  onChangeText?: (text: E164Number) => void; // Updated type
  label: string;
  value?: string;
  errorText?: string | null;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  style,
  onChangeText,
  label,
  value,
  errorText,
}) => {
  const [phoneNumber, setPhoneNumber] = useState<string>(value || "");
  const [countryCode, setCountryCode] = useState<CountryCode>("US");
  const [isFocused, setIsFocused] = useState(false);
  const phoneRef = useRef<PhoneInput | null>(null);
  const focusAnim = useRef(new Animated.Value(0)).current;
  const [isPickerVisible, setPickerVisible] = useState(false);

  useEffect(() => {
    Animated.timing(focusAnim, {
      toValue: isFocused || !!value ? 1 : 0,
      duration: 150,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: false,
    }).start();
  }, [focusAnim, isFocused, value]);

  const handlePhoneChange = (number: string) => {
    setPhoneNumber(number);
    if (onChangeText) {
      onChangeText(number as E164Number);
    }
  };

  const onSelectCountry = (country: any) => {
    setCountryCode(country.cca2 as CountryCode);
    phoneRef.current?.selectCountry(country.cca2.toLowerCase());
    setPickerVisible(false);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const borderColor = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.secondary, Colors.primary],
  });

  return (
    <View style={style}>
      <Text
        style={[
          styles.label,
          { color: isFocused ? Colors.primary : Colors.secondary },
        ]}
      >
        {label}
        {errorText ? "*" : ""}
      </Text>
      <TouchableWithoutFeedback onPress={() => phoneRef.current?.focus()}>
        <Animated.View
          style={[
            styles.input,
            { borderColor: `${isFocused ? Colors.primary : Colors.secondary}` },
          ]}
        >
          <PhoneInput
            ref={phoneRef}
            initialCountry={countryCode.toLowerCase()}
            onChangePhoneNumber={handlePhoneChange}
            autoFormat={true}
            textStyle={styles.textInput}
            flagStyle={styles.hiddenFlag}
            style={{ flex: 1 }}
            textProps={{
              onFocus: handleFocus,
              onBlur: handleBlur,
              editable: true,
            }}
          />
          <TouchableWithoutFeedback onPress={() => setPickerVisible(true)}>
            <View style={styles.customFlag}>
              <CountryPicker
                countryCode={countryCode}
                withFilter
                withFlag
                withAlphaFilter
                withCallingCode
                onSelect={onSelectCountry}
                visible={isPickerVisible}
                onClose={() => setPickerVisible(false)}
              />
            </View>
          </TouchableWithoutFeedback>
        </Animated.View>
      </TouchableWithoutFeedback>
      {!!errorText && <Text style={styles.error}>{errorText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 4,
    fontFamily: "Avenir-Medium",
    fontSize: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    fontSize: 16,
    paddingLeft: "10%",
    flex: 1,
  },
  hiddenFlag: {
    display: "none",
  },
  customFlag: {
    position: "absolute",
    left: "3%",
    top: "60%",
    transform: [{ translateY: -5 }],
  },
  label: {
    fontFamily: "Avenir-Heavy",
    fontSize: 16,
    marginBottom: 8,
  },
  error: {
    marginTop: 4,
    fontSize: 12,
    color: "#B00020",
    fontFamily: "Avenir-Medium",
  },
});

export default PhoneNumberInput;
