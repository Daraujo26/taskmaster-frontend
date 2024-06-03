import React, { useState } from "react";
import { View } from "react-native";

import StepOneScreen from "./StepOneScreen";
import Setup from "./StepTwoScreen";
import { UserData } from "@/src/interfaces/user";

function Index() {
  const [showStepOne, setStepOne] = useState(true);
  const [userData, setUserData] = useState<UserData>({
    id: 0,
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    password: "",
    teams: [],
    role: "USER",
  });

  return (
    <View style={{ flex: 1 }}>
      {showStepOne ? (
        <StepOneScreen
          setUserData={setUserData}
          setStepOne={setStepOne}
        ></StepOneScreen>
      ) : (
        <Setup userData={userData}></Setup>
      )}
    </View>
  );
}

export default Index;
