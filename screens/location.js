import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  ScrollView,
} from "react-native";
import { Formik } from "formik";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import * as yup from "yup";
import * as Locate from "expo-location";
import axios from "axios";
import { mobileLink } from "../links";
import * as SecureStore from "expo-secure-store";

const ReviewSchema = yup.object({
  flatnumber: yup.string().required(),
  society: yup.string().required(),
  area: yup.string().required(),
  landmark: yup.string().required(),
});

export default function Location({ navigation }) {
  const [latlong, setlatlong] = useState({ lat: 0, long: 0 });
  const [locationServiceEnabled, setLocationServiceEnabled] = useState(false);
  const [displayCurrentAddress, setDisplayCurrentAddress] = useState(
    "Wait, we are fetching you location..."
  );

  const onSubmitHandler = async () => {
    
    console.log(navigation.state.params);

    if (navigation.state.params.type === 1) {
      const params = JSON.stringify({
        user: navigation.state.params.phone_number,
        email:navigation.state.params.emailid,
        fullname:navigation.state.params.fullname,
        gender:navigation.state.params.gender,
        lat:latlong.lat,
        lon:latlong.long,
        
      });
      const token = await SecureStore.getItemAsync("token");
      let axiosConfig = {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: "Bearer " + token,
        },
      };

      const response = await axios.post(
        `${mobileLink}customer/`,
        params,
        axiosConfig
      );

      console.log(response);
      navigation.push("Homescreen");
    } 
    else {
      const params = JSON.stringify({
        email:navigation.state.params.emailid,
        fullname:navigation.state.params.fullname,
        gender:navigation.state.params.gender,
        lat:latlong.lat,
        lon:latlong.long,
        place_of_work:navigation.state.params.placeofwork,
        qualification:navigation.state.params.qualification,
        yex:navigation.state.params.experience,
        
      });
      console.log("params",params);
      const token = await SecureStore.getItemAsync("token");
      let axiosConfig = {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: "Bearer " + token,
        },
      };

      const response = await axios.post(
        `${mobileLink}partner/`,
        params,
        axiosConfig
      );

      console.log(response);




      navigation.push("ChefConfirmation",{'data':navigation.state.params,'lat':latlong.lat,'long':latlong.long});
    }

    console.log("going to other page");
  };

  useEffect(() => {
    CheckIfLocationEnabled();
    GetCurrentLocation();
  }, []);

  const GetCurrentLocation = async () => {
    let { status } = await Locate.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission not granted",
        "Allow the app to use location service.",
        [{ text: "OK" }],
        { cancelable: false }
      );
    }

    let { coords } = await Locate.getCurrentPositionAsync();

    if (coords) {
      const { latitude, longitude } = coords;
      setlatlong({
        lat: latitude,
        long: longitude,
      });
      console.log(latitude, " longi", longitude);
      let response = await Locate.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      for (let item of response) {
        let address = `${item.name}, ${item.street}, ${item.postalCode}, ${item.city}`;

        setDisplayCurrentAddress(address);
      }
    }
  };

  const CheckIfLocationEnabled = async () => {
    let enabled = await Locate.hasServicesEnabledAsync();

    if (!enabled) {
      Alert.alert(
        "Location Service not enabled",
        "Please enable your location services to continue",
        [{ text: "OK" }],
        { cancelable: false }
      );
    } else {
      setLocationServiceEnabled(enabled);
    }
  };
  //   const callMap=()=> {
  //     console.log("hello")
  //     //openMap({ latitude: 37.865101, longitude: -119.538330 });
  //   };
  return (
  <View style={styles.container}>
    <View style={styles.container1}></View>
    <View style={styles.container2}><Text style={styles.container21}>SET LOCATION</Text></View>
    <View style={styles.container3}>
      <View style={styles.container31}>
        <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              region={{
                latitude: latlong.lat,
                longitude: latlong.long,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
          <Marker
                coordinate={{
                  latitude: latlong.lat,
                  longitude: latlong.long,
                }}
                title={"Your location"}></Marker>
        </MapView>
      </View>
      {/* <View style={styles.contentContainer}>
        <Text style={styles.title}>What's your address?</Text>
      </View>
      <Text style={styles.text}>address{displayCurrentAddress}</Text> */}
    </View>
    <ScrollView>
    <Formik
          initialValues={{
            flatnumber: "",
            society: "",
            area: "",
            location: "",
          }}
          validationSchema={ReviewSchema}
          onSubmit={(values, actions) => {
            // addreview(values);
            console.log(values);
            actions.resetForm();
          }}>
          {(props) => (
      <View style={styles.container4}>
        <Text style={styles.container41}>#Number</Text>
        <TextInput style={styles.container42}
                // placeholder="flatnumber"
                value={props.values.flatnumber}
                onChangeText={props.handleChange("flatnumber")}/>
        {/* <Text>{props.touched.flatnumber && props.errors.flatnumber}</Text> */}
        <Text style={styles.container41}>Locality</Text>
        <TextInput  secureTextEntry={true} style={styles.container42}
                // placeholder="society"
                value={props.values.society}
                onChangeText={props.handleChange("society")}/>
        {/* <Text>{props.touched.flatnumber && props.errors.flatnumber}</Text> */}
        <Text style={styles.container41}>Area</Text>
        <TextInput style={styles.container42}
                // placeholder="area"
                value={props.values.area}
                onChangeText={props.handleChange("area")}/>
        {/* <Text >{props.touched.area && props.errors.area}</Text> */}
        <Text style={styles.container41}>Region</Text>
        <TextInput style={styles.container42}
                // placeholder="location"
                value={props.values.location}
                onChangeText={props.handleChange("location")}/>
        {/* <Text>{props.touched.location && props.errors.location}</Text> */}
        <Button
        color="#F57503"
                title="proceed"
                onPress={() => {
                  props.handleSubmit();
                  onSubmitHandler();
                }}/>
                {/* <Button title="next"   onPress={()=>{navigation.push('Homescreen')}}/> */}
      </View>
          )}
    </Formik>
    </ScrollView>
       
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
   
    // borderWidth:2,
    // borderColor:'black',
    // borderStyle:'solid',
  },
  container21:{
    fontSize:16,
    fontWeight:'bold',
    color:'white'
  },
   map:{
    //   borderWidth:2,
    // borderColor:'black',
    // borderStyle:'solid',
    width:'100%',
    height: 250,
    
  },
  container4:{
    marginLeft:20,
    marginRight:20,
  },
  container41:{
    marginBottom:10,
    fontSize:12,
    fontWeight:"bold",
  },
  container42:{
    borderColor:"#F57503",
    borderBottomWidth:1,
    marginBottom:10,
    height:35,
    borderRadius:3,
    paddingLeft:20,
  }
})