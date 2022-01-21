import React from "react";
import {StyleSheet,View,Text,Image,TouchableOpacity} from "react-native";
import { Audio } from 'expo-av';



export default function Splash1({navigation})
{

    const [sound, setSound] = React.useState();

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
       require('../../assets/sound.mp3')
    );
    setSound(sound);
    
    console.log('Playing Sound');
    await sound.playAsync(); 
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        playSound; }
      : undefined;
  }

  React.useEffect(() => {
      console.log("here");
      playSound();
  }, []);



    const submithandler=()=>{
        navigation.push('Splash2');
    }
    return (
        <TouchableOpacity onPress={submithandler}>
             <Image
             style={styles.image}
        source={require('../../assets/LaunchApp.png')}/>
        </TouchableOpacity>
    );
}
const styles=StyleSheet.create({
    image:{
        height:'100%',
        width:'100%',
    }
})