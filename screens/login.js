import React, { useState } from "react";
import {StyleSheet,View,Text,TextInput,Button} from "react-native";
import {Formik} from "formik";
import * as yup from"yup";
import {RadioButton} from "react-native-paper"
import axios from 'axios';
import {mobileLink} from '../links'
import * as SecureStore from 'expo-secure-store';


const ReviewSchema=yup.object({
    username:yup.string().required(),
    password:yup.string().required(),
});
export default function Login({navigation})
{

    const [loginDetails,setloginDetails]=useState({'username':'','password':''});
    async function save(key, value) {
        await SecureStore.setItemAsync(key, value);
      }
      async function getValueFor(key) {
        let result = await SecureStore.getItemAsync(key);
        if (result) {
          alert("🔐 Here's your value 🔐 \n" + result);
        } else {
          alert('No values stored under that key.');
        }
      }
    
    
    
    const onSubmitHandler=async (val)=>{
        setloginDetails({
           'username':val.username,
           'password':val.password, 
        })
        const params = JSON.stringify({
            phone_number: val.username,
            password:val.password
          });
      
          let axiosConfig = {
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
            },
          };
      
      
          
          const response = await axios.post(`${mobileLink}login/`, params,axiosConfig);
              console.log(response.data.token);
        
          if(response.data.token!== undefined)
          {
              save('token',response.data.token);
          }

        console.log("going to other page",val);
        navigation.push("Homescreen");
    }
    const [value, setValue] = React.useState(1);
    return (
      <View style={styles.container}>
        <View style={styles.container1}></View>
        <Formik initialValues={{username:'',password:''}} validationSchema={ReviewSchema} onSubmit={(values,actions)=>{actions.resetForm();}}>
          {(props)=>(
            <View style={styles.container2}>
              <Text style={styles.container21}>Mobile Number</Text>
              <TextInput style={styles.container22}   value={props.values.username} onChangeText={props.handleChange('username')}/>
              {/* <Text>{props.touched.username && props.errors.username}</Text> */}
              <Text style={styles.container21}>Password</Text>
              <TextInput style={styles.container22}   value={props.values.password} onChangeText={props.handleChange('password')}/>
              {/* <Text>{props.touched.password && props.errors.password}</Text> */}
              <Button color="#F57503"  title="Login" onPress={()=>{props.handleSubmit();onSubmitHandler(props.values)}}/>
            </View>
          )}
        </Formik>
      </View>
    );
} 
const styles = StyleSheet.create({
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
    marginTop:70,
    marginLeft:20,
    marginRight:20,
    // borderWidth:2,
    // borderColor:'black',
    // borderStyle:'solid',
  },
  container21:{
    marginBottom:10,
    fontSize:12,
    fontWeight:"bold",
  },
  container22:{
    borderColor:"#F57503",
    borderWidth:1,
    marginBottom:10,
    height:35,
    borderRadius:3,
    paddingLeft:20,
  },
});