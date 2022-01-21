import React from "react";
import {StyleSheet,View,Text,Image,TouchableOpacity} from "react-native";
import { Audio } from 'expo-av';

export default function Splash3({navigation})
{
    const submithandler=()=>{
        Audio.setIsEnabledAsync(false);
        navigation.push('Register');
    }
    return (
        <TouchableOpacity onPress={submithandler}>
             <Image
             style={styles.image}
        source={require('../../assets/splashscreen2.png')}/>
        </TouchableOpacity>
    );
}
const styles=StyleSheet.create({
    image:{
        height:'100%',
        width:'100%',
    }
})