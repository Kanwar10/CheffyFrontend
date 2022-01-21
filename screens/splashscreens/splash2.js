import React from "react";
import {StyleSheet,View,Text,Image,TouchableOpacity} from "react-native";
export default function Splash2({navigation})
{
    const submithandler=()=>{
        navigation.push('Splash3');
    }
    return (
        <TouchableOpacity onPress={submithandler}>
             <Image
             style={styles.image}
        source={require('../../assets/splashscreen1.png')}/>
        </TouchableOpacity>
    );
}
const styles=StyleSheet.create({
    image:{
        height:'100%',
        width:'100%',
    }
})