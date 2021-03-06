
import React, {Component} from 'react';
import {
  Easing,Animated,Image,View
} from 'react-native';
import DashBoard from './Components/Views/DashBoard'

import VaultFilter from './Components/Views/VaultModule/VaultFilter'
import AddVault from './Components/Views/VaultModule/AddVault'
import ConfirmVault from './Components/Views/VaultModule/ConfirmVault'
import Profile from './Components/Views/Profile'
import TabBar from './Components/Views/TabBar'
import Price from './Components/Views/Price'
import CreditCard from './Components/Views/CreditCardModule/CreditCard'
import CardDetails from './Components/Views/CreditCardModule/CardDetails'
import CreditTransaction from './Components/Views/CreditCardModule/CreditTransaction'
import ExchangeMenu from './Components/Views/ExchangeModule/ExchangeMenu'
import Payment from './Components/Views/Payment'
import Buy from './Components/Views/ExchangeModule/Buy'
import Sell from './Components/Views/ExchangeModule/Sell'
import Exchange from './Components/Views/ExchangeModule/Exchange'
import Country from './Components/Views/Country'
import BankScreen from './Components/Views/BankScreen'
import Publish from './Components/Views/ExchangeModule/Publish'
import PuplishUser from './Components/Views/ExchangeModule/PuplishUser'
import Welcome from './Components/Views/LoginModule/Welcome'
import Information from './Components/Views/VaultModule/Information'
import Verify from './Components/Views/LoginModule/Verify'
import Address from  './Components/Views/LoginModule/Address'
import CountrySearch from  './Components/Views/LoginModule/CountrySearch'
import PinCode from  './Components/Views/LoginModule/PinCode'
import ProfileRegister from  './Components/Views/LoginModule/ProfileRegister'
import NewWallet from  './Components/Views/LoginModule/NewWallet'
import Sms from  './Components/Views/LoginModule/Sms'
import MoreInfo from  './Components/Views/LoginModule/MoreInfo'
import UploadProgress from  './Components/Views/LoginModule/UploadProgress'
import ChooseCountry from  './Components/Views/LoginModule/ChooseCountry'
import VerificationCards from  './Components/Views/LoginModule/VerificationCards'
import Launch from  './Components/Views/LoginModule/Launch'
import Login from  './Components/Views/LoginModule/Login'
import ForgotPassword from  './Components/Views/LoginModule/ForgotPassword'
import Confirm from  './Components/Views/LoginModule/Confirm'
import TakePhoto from  './Components/Views/LoginModule/TakePhoto'
import DocumentBackside from  './Components/Views/LoginModule/DocumentBackside'
import SelfieWithDocument from  './Components/Views/LoginModule/SelfieWithDocument'
import PincodeEnable from  './Components/Views/LoginModule/PincodeEnable'
import OtpPin from  './Components/Views/LoginModule/OtpPin'
import DocumentFront from  './Components/Views/LoginModule/DocumentFront'
import SetUpPin  from './Components/Views/NewPinModule/SetUpPin'
import PinLogin  from './Components/Views/NewPinModule/PinLogin'
import ConfirmPin  from './Components/Views/NewPinModule/ConfirmPin'
import ResendEmail from './Components/Views/LoginModule/ResendEmail'
import RetrivePassword from  './Components/Views/LoginModule/RetrivePassword'
import {
  createStackNavigator,createBottomTabNavigator,createAppContainer
} from 'react-navigation'
const TransitionConfiguration = () => {
  return {
    transitionSpec: {
      duration: 500,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: (sceneProps) => {
      const { layout, position, scene } = sceneProps;
      const width = layout.initWidth;
      const { index, route } = scene
      const params = route.params || {}; // <- That's new
      const transition = params.transition || 'default'; // <- That's new
      return {
        //collapseExpand: CollapseExpand(index, position),
        default: CollapseExpand(index, position),
      }[transition];
    },
  }
}
let SlideFromRight = (index, position, width) => {
  const inputRange = [index - 1, index, index + 1];
  const translateX = position.interpolate({
    inputRange: [index - 1, index, index + 1],
    outputRange: [width, 0, 0]
  })
  const slideFromRight = { transform: [{ translateX }] }
  return slideFromRight
};

let CollapseExpand = (index, position) => {
  const inputRange = [index - 1, index, index + 1];
  const opacity = position.interpolate({
    inputRange,
    outputRange: [0, 1, 1],
  });

  const scaleY = position.interpolate({
    inputRange,
    outputRange: ([0, 1, 1]),
  });

  return {
    opacity,
    transform: [
      { scaleY }
    ]
  };
};

      
      const VaultStack=createStackNavigator({    
       VaultFilter:{screen:VaultFilter},
     
      })
      const CreditCardStack=createStackNavigator({
        CreditCard:{screen:CreditCard},
        CreditTransaction:{screen:CreditTransaction},
        CardDetails:{screen:CardDetails},
      },{

        transitionConfig: TransitionConfiguration,
        headerMode: 'none'
    })
      const ExchangeStack=createStackNavigator({
        ExchangeMenu:{screen:ExchangeMenu,},
        Exchange:{screen:Exchange},
        Buy:{screen:Buy},
        Sell:{screen:Sell},
        Publish:{screen:Publish},
        PuplishUser:{screen:PuplishUser}
      },
      )
      const TabNavigator = createBottomTabNavigator(
        {
  
       // Home:{screen:MainNavigator},
        Price:{
          screen: Price,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => 
          
                <Image style={{width: 20, height: 20,alignItems:'center',resizeMode:'contain',tintColor}}   source={require('./Components/Views/assets/app3.png')} ></Image>    
    
           
          }},
  
          ExchangeMenu:{
            screen: ExchangeStack,
            navigationOptions: {

              tabBarIcon: ({ tintColor }) => 
            
                  <Image style={{width: 20, height: 20,alignItems:'center',resizeMode:'contain',tintColor}}   source={require('./Components/Views/assets/app4.png')} ></Image>    
      
             
            }},
  
            DashBoard:{
              screen: DashBoard,
              navigationOptions: {
                tabBarIcon: ({ tintColor }) => 
              
                    <Image style={{width: 20, height: 20,alignItems:'center',resizeMode:'contain',tintColor}}   source={require('./Components/Views/assets/app1white.png')} ></Image>    
        
               
              }},
              Vault:{
                screen: VaultStack,
                navigationOptions: {
                  tabBarIcon: ({ tintColor }) => 
                
                      <Image style={{width: 20, height: 20,alignItems:'center',resizeMode:'contain',tintColor}}   source={require('./Components/Views/assets/app2.png')} ></Image>    
          
                 
                }},
        CreditCard:{
          screen: CreditCardStack,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) =>  <Image style={{width: 20, height: 20,alignItems:'center',resizeMode:'contain',tintColor}}   source={require('./Components/Views/assets/app6.png')} ></Image>    
          }},
        Profile:{
          screen: Profile,
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => <Image style={{width: 20, height: 20,alignItems:'center',resizeMode:'contain',tintColor}}   source={require('./Components/Views/assets/app5.png')} ></Image>     
          }},
          
           
          
      },
      {
        initialRouteName: "DashBoard",
        tabBarComponent: TabBar,
        tabBarOptions: {
          activeTintColor: "#3b61c7",
          inactiveTintColor: "#fff",
         
        }},
       );
      const MainNavigator =createStackNavigator({
       
        //Publish:{screen:Publish},
      
        Launch: { screen: Launch },
        SetUpPin:{screen:SetUpPin},
        PinLogin:{screen:PinLogin},
        ConfirmPin:{screen:ConfirmPin},
       //UploadProgress:{screen:UploadProgress},
        TakePhoto:{screen:TakePhoto},    
        RetrivePassword:{screen:RetrivePassword}, 
        PuplishUser:{screen:PuplishUser},
        Sms:{screen:Sms},     
        Home:{screen:TabNavigator},
        AddVault:{screen:AddVault},
        Information:{screen:Information},
        ConfirmVault:{screen:ConfirmVault},    
        Login:{screen:Login},
        VerificationCards:{screen:VerificationCards},    
        Welcome:{screen:Welcome},      
        ProfileRegister:{screen:ProfileRegister},      
        NewWallet:{screen:NewWallet},       
        DocumentFront:{screen:DocumentFront}, 
        DocumentBackside:{screen:DocumentBackside},  
        DashBoard:{screen:DashBoard},        
        ForgotPassword:{screen:ForgotPassword},
        ResendEmail:{screen:ResendEmail},
        Confirm:{screen:Confirm},
       // Price:{screen:Price},                
        Profile:{screen:Profile},     
        VaultFilter:{screen:VaultFilter},    
        PinCode:{screen:PinCode},  
        Verify:{screen:Verify},
        CountrySearch:{screen:CountrySearch},
        Address:{screen:Address},
        Payment:{screen:Payment},     
        Country:{screen:Country},
        SelfieWithDocument:{screen:SelfieWithDocument},
        BankScreen:{screen:BankScreen},     
        MoreInfo:{screen:MoreInfo},
        PicodeEnable:{screen:PincodeEnable},
        OtpPin:{screen:OtpPin},
        ChooseCountry:{screen:ChooseCountry},       
        },{
        //  transitionConfig: TransitionConfiguration,
          headerMode: 'none'
      });
    

  export default  MainNavigator;
