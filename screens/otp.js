import React, { useState, useRef } from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { RadioButton } from "react-native-paper";
import axios from "axios";
import { mobileLink } from "../links";
const ReviewSchema = yup.object({
  otp: yup.string().required().min(2).max(10),
});
export default function Otp({ navigation }) {
  // outputvalue
  const ref_input2 = useRef();
  const ref_input3 = useRef();
  const ref_input4 = useRef();
  const [otp, setotp] = useState("....");
  const handleChange = (val, index) => {
    console.log("value passed--->", navigation.state.params);
    let newotp = otp;
    newotp = newotp.substring(0, index) + val + newotp.substring(index + 1, 4);
    setotp(newotp);
    console.log(otp);
  };
  const onSubmitHandler = async () => {
    console.log("otp->>>>>", otp);
    const params = JSON.stringify({
      phone_number: navigation.state.params.phone_number,
      otp: otp,
    });

    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
      },
    };

    const response = await axios.post(
      `${mobileLink}validateotp/`,
      params,
      axiosConfig
    );
    console.log(response);
    if (response.data.message !== undefined) {
      console.log("trueeeeeeeeeee");
      console.log("going to other page", navigation.state.params);
      navigation.push("Password", navigation.state.params);
    } else {
      alert("otp did nt matched");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.container1}></View>
      <Text style={styles.container2}>
        Enter 4 digit OTP sent to your Mobile Number{" "}
        {/*navigation.state.params.phone_number*/}
      </Text>
      <View style={styles.container3}>
        <TextInput
          style={styles.value}
          keyboardType={"decimal-pad"}
          maxLength={1}
          onChangeText={(val) => {
            handleChange(val, 0);
            ref_input2.current.focus()
          }}
        />
        <TextInput
          style={styles.value}
          keyboardType={"decimal-pad"}
          maxLength={1}
          onChangeText={(val) => {
            handleChange(val, 1);
            ref_input3.current.focus()
          }}
          ref={ref_input2}
        />
        <TextInput
          style={styles.value}
          keyboardType={"decimal-pad"}
          maxLength={1}
          onChangeText={(val) => {
            handleChange(val, 2);
            ref_input4.current.focus()
          }}
          ref={ref_input3}
        />
        <TextInput
          style={styles.value}
          keyboardType={"decimal-pad"}
          maxLength={1}
          onChangeText={(val) => {
            handleChange(val, 3);
          }}
          ref={ref_input4}
        />
      </View>
      <View style={styles.container4}>
        <Button title="SUBMIT" color="#F57503" onPress={onSubmitHandler} />
        {/* <Button title="next"   onPress={()=>{navigation.push('Password')}}/> */}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: "#ffffff",
  },
  container1: {
    width: "100%",
    height: 68,
    backgroundColor: "#ffffff",
    // borderWidth:2,
    // borderColor:'black',
    // borderStyle:'solid',
  },
  container2: {
    marginLeft: 40,
    marginRight: 40,
    textAlign: "center",
    // borderWidth:2,
    // borderColor:'black',
    // borderStyle:'solid',
    marginTop: 80,
    fontSize: 14,
    marginBottom: 40,
  },
  container3: {
    flexDirection: "row",
    justifyContent: "space-between",
    // borderWidth:2,
    // borderColor:'black',
    // borderStyle:'solid',
    marginLeft: 30,
    marginRight: 30,
    // borderWidth:2,
    // borderColor:'black',
    // borderStyle:'solid',
    marginTop: 10,
    marginBottom: 20,
  },
  value: {
    width: 60,
    marginRight: 20,
    borderBottomWidth: 1,
    borderColor: "black",
    borderStyle: "solid",
  },
  container4: {
    marginLeft: 20,
    marginRight: 20,
    // borderWidth:2,
    // borderColor:'black',
    // borderStyle:'solid',
    marginTop: 10,
  },
});
