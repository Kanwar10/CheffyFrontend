import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View ,Button} from 'react-native';
// import LoginScreen from "./src/screens/loginScreen"
import {connect, Provider} from "react-redux";
import { createStore } from 'redux';
import counter from "./reducer";
import Home from "./home";
import Naviagtor from "./routes/homeStack"
import rootReducer from "./redux/reducers"
import store from "./redux/store"
 const App=()=> {
   
  return (
    <Provider store={store}>
      <Naviagtor/>
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

export default App;
