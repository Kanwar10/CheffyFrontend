import React, { useState } from "react";
import {StyleSheet,View,Text,TextInput,Button} from "react-native";
import {Formik} from "formik";
import * as yup from"yup";
import axios from 'axios';
import {mobileLink} from '../links';
import * as SecureStore from 'expo-secure-store';

const ReviewSchema=yup.object({
    password:yup.string(),
    confirmpassword:yup.string(),
});
export default function Password({navigation})
{
    const [pword,setpword]=useState('');
    async function save(key, value) {
        await SecureStore.setItemAsync(key, value);
      }
    const onSubmitHandler=async(val)=>{
        console.log("on password page",navigation.state.params)

        if(val.password!==val.confirmpassword)
        {
            console.log("data api",navigation.state.params)
            alert("passwords dont match");
            return;
        }
        const params = JSON.stringify({
            phone_number: navigation.state.params.phone_number,
            password:val.password,
            user_type:navigation.state.params.value
          });
          
          let axiosConfig = {
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
            },
          };
      
      
          
          const response = await axios.post(`${mobileLink}register/`, params,axiosConfig);
              console.log("resp aftre reg",response);

              if(response.data.token!== undefined)
              {
                  save('token',response.data.token);
              }    
        

            setpword(val.password);
            if(navigation.state.params.value==1)
            {
                navigation.push('UserDetails',navigation.state.params);
            }
            else
            {
                navigation.push('ChefDetails',navigation.state.params);
            }
           
        
    }
    return (
      <View style={styles.container}>
        <View style={styles.container1}></View>
        <Formik initialValues={{password:'',confirmpassword:''}} validationSchema={ReviewSchema} onSubmit={(values,actions)=>{actions.resetForm();}}>
          {(props)=>(
            <View style={styles.container2}>
              <Text style={styles.container21}>Password</Text>
              <TextInput style={styles.container22}   value={props.values.password} onChangeText={props.handleChange('password')}/>
              {/* <Text>{props.touched.password && props.errors.password}</Text> */}
              <Text style={styles.container21}> Confirm Password</Text>
              <TextInput style={styles.container22}   value={props.values.confirmpassword} onChangeText={props.handleChange('confirmpassword')}/>
              {/* <Text>{props.touched.confirmpassword && props.errors.confirmpassword}</Text> */}
              <View style={styles.container3}>
                <Button color="#F57503"  title="Create Account" onPress={()=>{props.handleSubmit();onSubmitHandler(props.values)}}/>
                {/* <Button title="next"   onPress={()=>{navigation.push('UserDetails')}}/>
                <Button title="next"   onPress={()=>{navigation.push('ChefDetails')}}/> */}
              </View>
            </View>
          )}
        </Formik>
      </View>
    );
}
const styles = StyleSheet.create({
    container: {
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
      // borderWidth:2,
      // borderColor:'black',
      // borderStyle:'solid',
      marginLeft:20,
      marginRight:20,
      marginTop:50,
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
    container3:{
      marginTop:30,
    }
   
  });