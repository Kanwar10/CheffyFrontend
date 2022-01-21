import React,{useState} from "react";
import {StyleSheet,View,Text,TextInput,Button} from "react-native";
import {Formik} from "formik";
import * as yup from"yup";
import {RadioButton} from "react-native-paper";
const ReviewSchema=yup.object({
    fullname:yup.string().required().min(2).max(10),
    emailid:yup.string().required(),
    
});
export default function UserDetails({navigation})
{
  const [userDetails,setuserDetails]=useState({'fullname':'','emailid':'','gender':1});
  const [value, setValue] = React.useState(1); 
  
  

  const onSubmitHandler=(val)=>{
      setuserDetails({
        'fullname':val.fullname,
        'emailid':val.emailid,
        'gender':value
      })
      let gender="O"
        if(value===1)
          gender="F";
        if(value===2)
          gender="M"
        console.log(navigation.state.params);
        console.log("going to other page");
        navigation.push('Location',{"phone_number":navigation.state.params.phone_number,
        "type":navigation.state.params.value,"fullname":val.fullname,"emailid":val.emailid,
        "gender":gender});
    }
    
    
    return (
      <View style={styles.container}>
        <View style={styles.container1}></View>
        <View style={styles.container2}><Text style={styles.container21}>YOUR DETAILS</Text></View>
        <Formik initialValues={{fullname:'',emailid:''}} validationSchema={ReviewSchema} onSubmit={(values,actions)=>{actions.resetForm();}}>
          {(props)=>(
            <View style={styles.container3}>
              <Text style={styles.container31}>Enter Full Name</Text>
              <TextInput style={styles.container32} placeholder='Enter Full Name' value={props.values.fullname} onChangeText={props.handleChange('fullname')}/>
              {/* <Text>{props.touched.fullname && props.errors.fullname}</Text> */}
              <Text style={styles.container31}>Email Id</Text>
              <TextInput style={styles.container32} placeholder='Email Id' value={props.values.emailid} onChangeText={props.handleChange('emailid')}/>
              {/* <Text>{props.touched.emailid && props.errors.emailid}</Text> */}
              <View style={styles.container33}>
                <RadioButton.Group onValueChange={newValue => setValue(newValue)} value={value} >
                <Text style={styles.container31}>Gender</Text>
                  <View style={styles.container331}>
                    
                    <View style={styles.container3311}>
                      <RadioButton color="#FC8019" title="scasc1"value={1} />
                      <Text style={styles.container3311text}>Female</Text>
                    </View>
                    <View style={styles.container3312}>
                      <RadioButton color="#FC8019" value={2} />
                      <Text style={styles.container3311text}>Male</Text>
                    </View>
                    <View style={styles.container3313}>
                      <RadioButton value={3} />
                      <Text style={styles.container3311text}>Other</Text>
                    </View>
                  </View>
                </RadioButton.Group>
                </View>
              <Button color="#F57503"  title="CONTINUE" onPress={()=>{props.handleSubmit();onSubmitHandler(props.values)}}/>
              {/* <Button title="next"   onPress={()=>{navigation.push('Location')}}/> */}
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
  container331:{
    flexDirection:'row',
    marginBottom:20,
    // borderWidth:2,
    // borderColor:'black',
    // borderStyle:'solid',
  },
  container3311:{
    flexDirection:'row',
    marginRight:20,
  },
  container3311text:{
    paddingTop:7.5,
    fontSize:12,
    color:"#474747",
  },
  container3312:{
    flexDirection:'row',
    marginRight:20,
  },
  container3313:{
    flexDirection:'row',
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
  }
  });