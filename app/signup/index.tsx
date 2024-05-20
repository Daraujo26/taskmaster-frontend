import React, { useState } from "react";
import { View } from "react-native";

import StepOneScreen from "./StepOneScreen";
import Setup from "./StepTwoScreen";

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
