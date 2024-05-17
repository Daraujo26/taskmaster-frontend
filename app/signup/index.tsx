import React, { useState } from "react";
import { View } from "react-native";

import StepOneScreen from "./StepOneScreen";
import Setup from "./StepTwoScreen";

interface UserData {
  name: string;
  company_name: string;
  email: string;
  password: string;
  phone_number: string;
}

function Index() {
  const [showStepOne, setStepOne] = useState(true);
  const [userData, setUserData] = useState();

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
