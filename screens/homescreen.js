import React from "react";
import {StyleSheet,View,Text, Button} from "react-native";
import * as SecureStore from 'expo-secure-store';
export default function Homescreen()
{
    async function getValueFor(key) {
        let result = await SecureStore.getItemAsync(key);
        if (result) {
          alert("🔐 Here's your value 🔐 \n" + result);
        } else {
          alert('No values stored under that key.');
        }
        console.log(result);
      }
    const onSubmitHandler=()=>{
        console.log("here token from local")
        getValueFor('token');
    }
    return (
        <View>
            
            <Text>home screen</Text>
            <Text>home screen</Text>
            <Text>home screen</Text>
            <Text>home screen</Text>
            <Button title="view token" onPress={onSubmitHandler}   />
        </View>
    )
}