import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  Animated,
  Easing,
  TouchableWithoutFeedback,
} from "react-native";

import Colors from "../constants/colors/colors";

import { Entypo } from "@expo/vector-icons";

type Props = React.ComponentProps<typeof TextInput> & {
  label: string;
  errorText?: string | null;
  password?: boolean;
};

const TextField: React.FC<Props> = (props) => {
  const {
    label,
    errorText,
    value,
    style,
    password,
    onBlur,
    onFocus,
    ...restOfProps
  } = props;
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef<TextInput>(null);
  const focusAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(focusAnim, {
      toValue: isFocused || !!value ? 1 : 0,
      duration: 150,
      easing: Easing.bezier(0.4, 0, 0.2, 1),
      useNativeDriver: true,
    }).start();
  }, [focusAnim, isFocused, value]);

  let color = isFocused ? Colors.primary : Colors.secondary;
  if (errorText) {
    color = "#B00020";
  }

  const [passwordViewable, setPasswordViewable] = useState(true);
  const handlePasswordViewer = () => {
    setPasswordViewable(!passwordViewable);
  };

  return (
    <View style={style}>
      <View style={styles.input}>
        <TextInput
          secureTextEntry={passwordViewable && password}
          style={[
            {
              borderColor: color,
            },
          ]}
          ref={inputRef}
          {...restOfProps}
          value={value}
          onBlur={(event) => {
            setIsFocused(false);
            onBlur?.(event);
          }}
          onFocus={(event) => {
            setIsFocused(true);
            onFocus?.(event);
          }}
        />
        <View style={styles.IconWrapper}>
          {password && (
            <Entypo
              onPress={handlePasswordViewer}
              name={!passwordViewable ? "eye" : "eye-with-line"}
              style={styles.EyeIcon}
              size={22}
            ></Entypo>
          )}
        </View>
      </View>
      <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
        <Animated.View
          style={[
            styles.labelContainer,
            {
              transform: [
                {
                  scale: focusAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0.75],
                  }),
                },
                {
                  translateY: focusAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [24, -12],
                  }),
                },
                {
                  translateX: focusAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [16, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <Text
            style={[
              styles.label,
              {
                color,
              },
            ]}
          >
            {label}
            {errorText ? "*" : ""}
          </Text>
        </Animated.View>
      </TouchableWithoutFeedback>
      {!!errorText && <Text style={styles.error}>{errorText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  IconWrapper: {
    justifyContent: "center",
    left: "95%",
    top: "-50%",
  },
  input: {
    padding: 24,
    borderWidth: 1,
    borderRadius: 4,
    fontFamily: "Avenir-Medium",
    fontSize: 16,
  },
  labelContainer: {
    position: "absolute",
    paddingHorizontal: 8,
    backgroundColor: Colors.background,
  },
  label: {
    fontFamily: "Avenir-Heavy",
    fontSize: 16,
    backgroundColor: Colors.background,
  },
  error: {
    marginTop: 4,
    marginLeft: 12,
    fontSize: 12,
    color: "#B00020",
    fontFamily: "Avenir-Medium",
  },
  EyeIcon: {
    position: "absolute",
  },
});

export default TextField;
