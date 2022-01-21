import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Audio } from 'expo-av';

export default function Register({navigation}) {
  
  return (
    <View style={{height:200}}>
      <Button title="Play Sound" onPress={()=>{navigation.push('Location')}} />
    </View>
  );
}
