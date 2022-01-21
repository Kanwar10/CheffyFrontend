import React from "react";
import {StyleSheet,View,Text,Image,TouchableOpacity,Button} from "react-native";
export default function ChefConfirmation({navigation})
{
    const onsubmithandler=()=>{
        navigation.push('Homescreen');
    }
    return (
        <View style={styles.container}>
            <View style={styles.container1}></View>
            <View style={styles.container2}><Text style={styles.container21}>DETAILS SUBMITTED</Text></View>
            <Image style={styles.container3} source={require('../../assets/tickmark.png')}/>
            <View style={styles.container4}>
                <Text style={styles.container41}>Details are successfully submitted. Our team will contact you within 2 - 3 business days</Text>
            </View>
            <View style={styles.container5}>
                <Button color='#F57503' title="HOME" onPress={onsubmithandler} />
            </View>
        </View>
    );
}
const styles=StyleSheet.create({
    container:{
        flexDirection:'column',
        justifyContent:'flex-start',
        backgroundColor:'#ffffff',
      },
      container1:{
        width:'100%',
        height:68,
        backgroundColor:'#ffffff',
        // borderWidth:2,
        // borderColor:'black',
        // borderStyle:'solid',
      },
      container2:{
        width:'100%',
        height:56,
        paddingLeft:25,
        paddingTop:17,
        backgroundColor:'#F57503',
        marginBottom:30,
        // borderWidth:2,
        // borderColor:'black',
        // borderStyle:'solid',
      },
      container21:{
        fontSize:16,
        fontWeight:'bold',
        color:'white'
      },
    container3:{
        height:101,
        width:101,
        marginLeft:150,
        marginRight:150,
    },
    container4:{
        marginTop:60,
        marginLeft:20,
        marginRight:20,
    },
    container41:{
        color:'#474747',
        fontSize:18,
        textAlign:'center',
    },
    container5:{
        marginTop:300,
        marginLeft:20,
        marginRight:20,
    }
})