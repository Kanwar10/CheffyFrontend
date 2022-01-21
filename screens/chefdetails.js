import React, { useState } from "react";
import {StyleSheet,View,Text,TextInput,Button} from "react-native";
import {Formik} from "formik";
import * as yup from"yup";
import {RadioButton} from "react-native-paper";
const ReviewSchema=yup.object({
    fullname:yup.string().required().min(2).max(10),
    emailid:yup.string().required(),
    qualification:yup.string(),
    placeofwork:yup.string(),
    experience:yup.string(),
    
});
export default function ChefDetails({navigation})
{
  const [chefDetails,setchefDetails]=useState({'fullname':'','emailid':'','qualification':'','placeofwork':'','experience':'','gender':1})
  const [value, setValue] = React.useState(1);  
  const onSubmitHandler=(val)=>{
      setchefDetails({
        'fullname':val.fullname,
        'emailid':val.emailid,
        'qualification':val.qualification,
        'placeofwork':val.placeofwork,
        'experience':val.experience,
        'gender':value
      })
      let gender="O"
        if(value===1)
          gender="F";
        if(value===2)
          gender="M"
        // console.log(value);
        console.log("going to other page");
        navigation.push('Location',{'type':2,'fullname':val.fullname,
        'emailid':val.emailid,
        'qualification':val.qualification,
        'placeofwork':val.placeofwork,
        'experience':val.experience,
        'gender':gender});
    }
    
    
    return (
      <View style={styles.container}>
        <View style={styles.container1}></View>
        <View style={styles.container2}><Text style={styles.container21}>YOUR DETAILS</Text></View>
        <Formik initialValues={{fullname:'',emailid:'',qualification:'',placeofwork:'',experience:''}} validationSchema={ReviewSchema} onSubmit={(values,actions)=>{actions.resetForm();}}>
          {(props)=>(
          <View style={styles.container3} >
            <Text style={styles.container31}>Enter Full Name</Text>
            <TextInput style={styles.container32} placeholder='Enter Full Name' value={props.values.fullname} onChangeText={props.handleChange('fullname')}/>
            {/* <Text >{props.touched.fullname && props.errors.fullname}</Text> */}
            <Text style={styles.container31}>Email Id</Text>
            <TextInput style={styles.container32} placeholder='Email Id' value={props.values.emailid} onChangeText={props.handleChange('emailid')}/>
            {/* <Text>{props.touched.emailid && props.errors.emailid}</Text> */}
            <Text style={styles.container31}>Gender</Text>
            <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value} >
              <View style={styles.radio}>
                <View style={styles.radio1}>
                  <RadioButton color="#FC8019" title="scasc1"value={1} />
                  <Text style={styles.radiotext}>Female</Text>
                </View>
                <View style={styles.radio1}>
                  <RadioButton value={2}  color="#FC8019" />
                  <Text style={styles.radiotext}>Male</Text>
                </View>
                <View style={styles.radio1}>
                  <RadioButton color="#FC8019" value={3} />
                  <Text style={styles.radiotext}>Other</Text>
                </View>
              </View>
            </RadioButton.Group>
            <Text style={styles.container31}>Qualification</Text >
            <TextInput style={styles.container32}   value={props.values.qualification} onChangeText={props.handleChange('qualification')}/>
            {/* <Text >{props.touched.fullname && props.errors.qualification}</Text> */}
            <Text style={styles.container31}>Experience</Text>
            <TextInput    style={styles.container32} value={props.values.experience} onChangeText={props.handleChange('experience')}/>
            {/* <Text>{props.touched.emailid && props.errors.experience}</Text> */}
            <Text style={styles.container31}>Place of work</Text>
            <TextInput  style={styles.container32}  value={props.values.placeofwork} onChangeText={props.handleChange('placeofwork')}/>
            {/* <Text>{props.touched.emailid && props.errors.placeofwork}</Text> */}
            <View style={styles.container4}>
              <Button color="#FC8019" title="Continue" onPress={()=>{props.handleSubmit();onSubmitHandler(props.values)}}/>
              {/* <Button title="next"   onPress={()=>{navigation.push('Location')}}/> */}
            </View>
          </View>
          )}
        </Formik>
      </View>
    )
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
    marginLeft:20,
    marginRight:20,
  },
  container31:{
    marginBottom:10,
    fontSize:12,
    fontWeight:"bold",
  },
  container32:{
    borderColor:"#F57503",
    borderWidth:1,
    marginBottom:10,
    height:35,
    borderRadius:3,
    paddingLeft:20,
  },
  container4:{
    marginTop:30,
  },
  radio:{
    flexDirection:'row',
  },
  radio1:{
    flexDirection:'row',
    marginRight:20,
  },
  radiotext:{
    paddingTop:7.5,
    fontSize:12,
  }
});