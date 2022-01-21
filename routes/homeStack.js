import {createStackNavigator} from "react-navigation-stack"
import {createAppContainer} from "react-navigation";
// import Home from "../screens/home";
// import ReviewDetails from "../screens/reviewDetails";
// import Header from "../shared/header";
import Home from "../home";
import About from "../about";
import React from "react";
import Register from "../screens/register";
import UserDetails from "../screens/userdetails";
import ChefDetails from "../screens/chefdetails";
import Otp from "../screens/otp";
import Login from "../screens/login";
import Location from "../screens/location";
import Homescreen from "../screens/homescreen";
import Password from "../screens/password";
import Header from "../header";
import Splash1 from "../screens/splashscreens/splash1"
import Splash2 from "../screens/splashscreens/splash2"
import Splash3 from "../screens/splashscreens/splash3"
import ChefConfirmation from "../screens/chef/confirmation";
const screens={
    Splash1:{
        screen:Splash1,
        navigationOptions:{
            headerShown:false
        }  
    },
    ChefConfirmation:{
        screen:ChefConfirmation,
        navigationOptions:{
            headerShown:false
        }  
    },
    Splash2:{
        screen:Splash2,
        navigationOptions:{
            headerShown:false
        }  
    },
    Splash3:{
        screen:Splash3,
        navigationOptions:{
            headerShown:false
        }  
    },
    Register:{
        screen:Register,
        navigationOptions:{
            headerShown:false
        }
    },
    Password:{
        screen:Password,
        navigationOptions:{
            headerShown:false,
        }
    },
    Homescreen:
    {
        screen:Homescreen,
        navigationOptions:{
            headerShown:false
        }
    },
    Location:{
        screen:Location,
        navigationOptions:{
            headerShown:false
        }
    },
    Login:{
        screen:Login,
        navigationOptions:{
            headerShown:false
        }
    },
    Otp:
    {
        screen:Otp,
        navigationOptions:{
            headerShown:false
        }
    },
    UserDetails:{
        screen:UserDetails,
        navigationOptions:{
            headerShown:false
        }
    },
    ChefDetails:{
        screen:ChefDetails,
        navigationOptions:{
            headerShown:false
        }
    },
    Home:{
        screen:Home,
        navigationOptions:({navigation})=>{
            return {
                title:'Home'
                // headerTitle:()=><Header navigation={navigation} title="home screen"/>,
            };
        }
    },
    About:{
        screen:About,
        navigationOptions:{
            title:'About'
        }
    }
}
const HomeStack=createStackNavigator(screens,{defaultNavigationOptions:{
    headerStyle:{
        height:70,
        width:'100%',
        backgroundColor:'white'
    }
}});
export default createAppContainer(HomeStack);