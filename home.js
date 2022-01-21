import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View ,Button} from 'react-native';
// import LoginScreen from "./src/screens/loginScreen"
import {connect, Provider} from "react-redux";
import { combineReducers, createStore } from 'redux';
import counter from "./reducer";
 const Home=(props)=> {
  const reducer=combineReducers({counter});
  let store=createStore(reducer);
  const onpresshandler=()=>{
      props.increaseCounter(props.counter.value);
  }
  const onpresshandler1=()=>{
    props.decreaseCounter(props.counter.value);
}
const onpresshandler2=()=>{
    props.navigation.push('About');
    console.log("output  ---->>>>>",props);
}
  return (
    <Provider store={store}>
    <View>
    <Text>counter</Text>
      <Text>{props.counter.value}</Text>
      <Button title='+' onPress={onpresshandler}/>
      <Button title='I' onPress={onpresshandler1}/>
      <Button title="go to about" onPress={onpresshandler2}/>
    </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
const mapDispathToProps=(dispatch)=>{
    return {
        increaseCounter:()=>dispatch({type:'INCREMENT'}),
        decreaseCounter:()=>dispatch({type:'DECREMENT'})
    }
}
const mapStateToProps=(state)=>{
  return {
    counter:state.counter
  };
}
export default connect(mapStateToProps,mapDispathToProps) (Home);
