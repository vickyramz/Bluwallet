import * as React from 'react';
import { Path } from 'react-native-svg'
import {
  View, StyleSheet, Image, Picker, UIManager, SafeAreaView,Text, Clipboard,LayoutAnimation, AsyncStorage, StatusBar, BackHandler, TouchableOpacity, ActivityIndicator, Animated, Platform, TextInput, Slider,
  Easing, Dimensions, PermissionsAndroid
} from 'react-native';
import { Alert } from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from 'react-native-chart-kit'
 
import QRCode from 'react-native-qrcode-svg';
import Spinner from 'react-native-loading-spinner-overlay';
import { CameraKitCameraScreen, } from 'react-native-camera-kit';
import BlurOverlay, { closeOverlay, openOverlay } from 'react-native-blur-overlay';
import Modal from "react-native-modal";
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import ExpandabelList from '../Views/Utils.js/Expandable_DashBoard_List'
import { AreaChart, Grid } from 'react-native-svg-charts'
import { VaultSystemApi, CryptoInvestment, CryptoTypeInvestment } from './Api/VaultSystemApi'
import { SendApi, RequestPaymentApi } from './Api/SendAndRecieveApi'
import { ResponseSuccessStatus, InvalidResponse, DataUndefined, InvalidToken, TokenExpired } from './Utils.js/Constant'
import {  CONVERT_USD,VaultCalculation } from './Api/RequestUrl'
import {  ExchangeList } from './Api/ExchangeRequest'
import { getactivitydata } from './Api/WalletActivity'
import RNPickerSelect from 'react-native-picker-select';
import * as shape from 'd3-shape'
import LinearGradient from 'react-native-linear-gradient';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import ColumnChart from 'react-native-pure-chart/examples/pure-chart/components/column-chart';

const { width } = Dimensions.get('window');
const height = width * 0.8;
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});
let base64Logo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAA..';
const horizontalMargin = 20;
const slideWidth = 280;
let type = 'ETH';
let cryptoType = "ETH"
let fetchAmountFlag = 'All'
let datas=[]
let  mass=[0,0,0,0,0];
export default class DashBoard extends React.Component {




  constructor(props) {

    super(props);
    if (Platform.OS === 'android')
    {
     UIManager.setLayoutAnimationEnabledExperimental(true)
     }
     this.animated=new Animated.Value(0),
    this.onBackPress = this.onBackPress.bind(this);
    this.springValue = new Animated.Value(0.3)
    this.AnimatedWidth= new Animated.Value(50),
    this.AnimatedHieght=new Animated.Value(45),
    this.animatedValue = new Animated.Value(0)
    this.AnimatedLeftWidth = new Animated.Value(50)
    this.AnimatedRightWidth = new Animated.Value(50)
    this.RotateValueHolder = new Animated.Value(0);
    this.state = {
      dataSource: [],
      currentUsdforEther: null,
      QR_Code_Value: null,
      dates:[],
      pops:false,
      datas:[],
      dateU:[],
      backoption: false,
      clipboardContent: '',
      visibles: false,
      spinner: false,
      usdforEther: '',
      USDValue:'',
      sliderValue: 0,
      blurclick:false,
      ResponseStatus: null,
      graphshow:'',
      EtherWalletAddress: null, BtcWalletAddress: null,
      Start_Scanner: false,
      QrButton: false,
      currentUsdforBtc: null,
      currentUsdforBwn:null,
      dataImage: [{ 'image1': require("./assets/etherem.png"), 'image1': require("./assets/etherem.png") }],
      cityItems: ["US Dollar,Indian,Eutherium"],
      Amount: 'USDollar',
      OpenPop: false,
      BottomBar: false,
      ScanOpen: true,
      CrptoType: 'ETH',
      profilecompleted:false,
      Balance: 0.0000,
      Usd: null,
      QrClick: true,
      QrLink: 'http://facebook.github.io/react-native/',

      ModelVisible: false,
      RightSideWidth: new Animated.Value(50),
      RightsideHeight: new Animated.Value(45),
      currentIndex: 0,
      data1: [require('./assets/biconback.png'), require('./assets/etherem.png'), require('./assets/biconback.png'), require('./assets/etherem.png')],
      Time: 'month',
      NoPopup: this.props.navigation.state.params.DashBoardPopup,
      animate: false,
      KyC: this.props.navigation.state.params.Kyc,
      app1icon: require('./assets/app1.png'),
      app6icon: require('./assets/app6.png'),
      app2icon: require('./assets/app2.png'),
      app3icon: require('./assets/app3.png'),
      app4icon: require('./assets/app4.png'),
      app5icon: require('./assets/app5.png'),
      w: 50,
      h: 45,
      wr: 50,
      hr: 45,
      Ahr: 80,
      Awr: 80,
      clickr: false,
      clickopen: false,
      clickopens: false,
      click: false,
      slide: false,
      visible: false,
      sendEtherAmount: '0.000',
      profilestatus:this.props.navigation.state.params.profilestatus,
      kycstatus:this.props.navigation.state.params.kycstatus,
      hidden: false,
      app1color: '#fff',
      app6color: '#5099f0',
      app2color: '#5099f0',
      app3color: '#5099f0',
      app4color: '#5099f0',
      app5color: '#5099f0',
      activeSlide: 0,
      carouselItems: [
        {

          ShadowImages: require('./assets/etherem.png'),

          title: "Ethereum"
        },
        {
          ShadowImages: require('./assets/bshadow.png'),
          title: "Bitcoin"
        },
         {
           ShadowImages:require('./assets/bitwingslogowallet.png'),
           title: "Bitwings"
         }

      ]
    }

  }
  static navigationOptions = ({ navigation }) => {
    return {
      header: null,
      tabBarVisible: navigation.getParam('bottombar'),
    }


  }
  componentDidMount() {

    this.focusListener = this.props.navigation.addListener('didFocus', () => {
      this.onFocusFunction()
    })

    // this.GetListData()
    // this._animate()
    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);


 
    

  }
  onFocusFunction=()=>
  {
    StatusBar.setBarStyle('light-content', true)
    StatusBar.setBackgroundColor("#354E91")
    this.props.navigation.setParams({ bottombar: true })
    this.GetData()
  }
  GraphAnimation=()=>
  {
    Animated.timing(this.animated,{
      toValue:1,
      duration:3000,
     useNativeDriver:true
  }).start() 
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
    this.focusListener.remove()
  }
  onBackPress = () => {
    this.setState({ QrButton:false })
    if (this.state.backoption) {
      closeOverlay()
      this.setState({ backoption: false })
      this.props.navigation.setParams({ bottombar: true })
      return true
    } else {
      console.log('Back pressed')
      this.props.navigation.goBack(null);
      return true;
    }

  }
  dataset = (data) => {
    this.setState({
      dataSource: data
    })
    this.hide()
  }
  Load() {
    this.StartImageRotateFunction();
    this.setState({ spinner: true })
  }
  hide() {
    this.setState({ spinner: false })
  }
  space() {
    return (<View style={{ height: 10, width: 1, backgroundColor: 'black' }} />)
  }
  QrCodeTouch = () => {

  }
  _onPress = () => {
   
    Animated.sequence([
      Animated.timing(this.AnimatedWidth, {
        toValue: 150,
        duration: 250,
        easing: Easing.inOut(Easing.ease),
        delay: 50,
      })
      ,
      Animated.timing(this.AnimatedWidth, {
        toValue: 50,
        duration: 250,
        easing: Easing.inOut(Easing.ease),
        delay: 50,
      }),

    ]).start(()=>this.leftopen())
   
  }
  leftopen=()=>
  {
    this.setState({ QrClick: true, backoption: true ,blurclick:true,})
    this.OpenPopupAction()
  }
  OpenPopupAction = () => {
   
    this.props.navigation.setParams({ bottombar: false })
    openOverlay()
    this.springValue.setValue(0.3),
      Animated.spring(
        this.springValue,
        {
          toValue: 1,
          friction: 10

        }
      ).start()
  }
  close = () => {
    this.setState({ backoption: false })
    Animated.timing(this.AnimatedWidth, {
      toValue: 50,
      duration: 250,
      easing: Easing.inOut(Easing.ease),
      delay: 50,
    }).start(() => this.props.navigation.setParams({ bottombar: true }));
  }
  AnimationSection = () => {

    this.props.navigation.setParams({ bottombar: false })
    this.setState({ click: false, ModelVisible: true, OpenPop: true })
    Animated.timing(this.AnimatedWidth, {
      toValue: 50,
      duration: 250,
      easing: Easing.inOut(Easing.ease),
      delay: 50,
    }).start()
  }
  StartImageRotateFunction() {
    this.RotateValueHolder.setValue(0);
    Animated.timing(this.RotateValueHolder, {
      toValue: 1,
      duration: 1100,
      easing: Easing.linear,
      useNativeDriver: true
    }).start(() => this.StartImageRotateFunction());
  }
  pressRight = () => {  
    Animated.sequence
      ([

        Animated.timing(this.AnimatedRightWidth, {
          toValue: 150,
          duration: 250,
          easing: Easing.inOut(Easing.ease),
          delay: 10,
        }),
        Animated.timing(this.AnimatedRightWidth, {
          toValue: 50,
          duration: 250,
          easing: Easing.inOut(Easing.ease),
          delay: 10,
        }),
      ]).start(()=>this.rightclose());

  }
  rightclose=()=>
  {
    this.setState({ QrClick: false, backoption: true })
    this.OpenPopupAction()
  }
  CloseLeftAction = () => {
    Animated.sequence
    ([
      Animated.timing(this.AnimatedLeftWidth, {
        toValue: 150,
        duration: 250,
        easing: Easing.inOut(Easing.ease),
        delay: 10,
      }),
      Animated.timing(this.AnimatedLeftWidth, {
        toValue: 50,
        duration: 250,
        easing: Easing.inOut(Easing.ease),
        delay: 10,
      })
    ]).start(()=>this.exit());
    

  }
  exit=()=>
  {
    closeOverlay()
    this.props.navigation.setParams({ bottombar: true })
    this.setState({ visibles: false, QR_Code_Value: null, sliderValue: 0, usdforEther: 0.000 })
  }
  open_QR_Code_Scanner = () => {

    var that = this;
    console.log('it is comming inside this method')
    if (Platform.OS === 'android') {
      async function requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA, {
              'title': 'Camera App Permission',
              'message': 'Camera App needs access to your camera '
            }
          )
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            that.setState({ QrButton: true })
            closeOverlay()
            that.setState({ QR_Code_Value: null });
            that.setState({ Start_Scanner: true });
          } else {
            alert("CAMERA permission denied");
          }
        } catch (err) {
          alert("Camera permission err", err);
          console.warn(err);
        }
      }
      requestCameraPermission();
    } else {
      that.setState({ QR_Code_Value: null ,QrButton:true});
      that.setState({ Start_Scanner: true });
    }
  }
  CloseRight = () => {
    Animated.timing(this.state.RightSideWidth, {
      toValue: 50,
      duration: 250,
      easing: Easing.inOut(Easing.ease),
      delay: 10,
    }).start(() => console.log('animation complete'));
    this.setState({ clickopen: false })
  }
  onQR_Code_Scan_Done = (QR_Code) => {
   console.log('Qr code click',this.state.QrClick)

    this.setState({ QR_Code_Value: QR_Code, Start_Scanner: false,QrButton: false,QrClick:this.state.QrClick});
    openOverlay()
    this.props.navigation.setParams({ bottombar: false })
 
  }
  Scanner = () => {
    closeOverlay()
    this.props.navigation.setParams({ bottombar: true })
    //this._onPress()
    this.open_QR_Code_Scanner()

  }
  SendClick = async () => {
    let id= await AsyncStorage.getItem('roleId'); 
    let role=''
    if(id==='1'){
     role='admin'
    }
    else{
      role='user'
    }
    let url;
    let params;
    if (this.state.QR_Code_Value == null) {
      Alert.alert('Alert', 'Please enter Wallet  Address')
    }
    else if (this.state.usdforEther == 0) {
      Alert.alert('Alert', 'Please enter '+type+'amount to transfer')
    }
    else {
      if (type == 'ETH') {
        url = 'eth/transfer'
        params =
          {

            "etherAmount": this.state.usdforEther,
            "exchangeStatus": 0,
            "toEthWalletAddress": this.state.QR_Code_Value,
            "userId": await AsyncStorage.getItem('UserId')
          }
      }
      if(type == 'BTC') {
        url = 'btc/transfer'
        params =
          {

            "btcAmount": this.state.usdforEther,
            "exchangeStatus": 0,
            "toBtcWalletAddress": this.state.QR_Code_Value,
            "userId": await AsyncStorage.getItem('UserId')
          }
      }
     else if (type == 'BWN') {
        url = 'bwn/transfer'
        params =
          {

            "bitwingsAmount": this.state.usdforEther,
            "exchangeStatus": 0,
            "bwnRole":role,
            "toEthWalletAddress": this.state.QR_Code_Value,
            "userId": await AsyncStorage.getItem('UserId')
          }
      }
      this.Load()
     console.log('send params', params)
      SendApi(url, params, this.SendResponse,this.error,this.networkissue)
    }


  }



  SendClickfromchild = async (data,type) => {
   let id= await AsyncStorage.getItem('roleId'); 
   let role=''
   if(id==='1'){
    role='admin'
   }
   else{
     role='user'
   }
    console.log('data',data)
    let url;
    let params;
      if (type == 'ETH') {
        url = 'eth/transfer'
        params =
          {

            "etherAmount": data.amount,
            "exchangeStatus": data.status,
             "requestId":data.requestId,
            "toEthWalletAddress": data.toWalletAddress,
            "userId": await AsyncStorage.getItem('UserId')
          }
      }
      else if(type == 'BTC') {
        url = 'btc/transfer'
        params =
          {

            "btcAmount":data.amount,
            "exchangeStatus":  data.status,
            "toBtcWalletAddress": data.toWalletAddress,
            "requestId":data.requestId,
            "userId": await AsyncStorage.getItem('UserId')
          }
      }
     else if (type == 'BWN') {
        url = 'bwn/transfer'
        params =
          {

            "bitwingsAmount": data.amount,
            "exchangeStatus": data.status,
            "bwnRole":role,
            "toEthWalletAddress": data.toWalletAddress,
            "requestId":data.requestId,
            "userId": await AsyncStorage.getItem('UserId')
          }
      }
      this.Load()
      console.log('send params', params)
      SendApi(url, params, this.SendResponse)
    


  }
  
  
  RequestPayment = async () => {
    let id = await AsyncStorage.getItem('UserId')
    this.Load()
    params =
      {
        "network": type,
        "requestAmount": this.state.usdforEther,
        "toAddress": this.state.QR_Code_Value,
        "userId": id
      }
   // console.log('Request params', params)
    RequestPaymentApi(params, this.RequestResponse,this.error)
  }
  RequestResponse = (data) => {
    this.hide()
    //console.log('Request response data', data)
    if (data.status === 'success') {
      this.setState({ visibles: true, ResponseStatus: data.message })
      setTimeout(this.PopUp, 1500);
    }
    else if (data.error === 'invalid_token') {
      Alert.alert(
        'Error',
        'Token Expired',
        [
          { text: 'OK', onPress: () => this.props.navigation.navigate('Login') },
        ],

      );
    }
    else {
      setTimeout(() => {
        Alert.alert(data.status, data.message)
      }, 200);
    }
  }
  SendResponse = data => {
    this.hide()
    this.GraphAnimation()
    console.log('Reponse',data)
    if (data.status === 'success') {
      this.setState({ visibles: true, ResponseStatus: data.message })
      setTimeout(this.PopUp, 1500);
      this.GetData()
    }
    else if (data.error === 'invalid_token') {
      Alert.alert(
        'Error',
        'Token Expired',
        [
          { text: 'OK', onPress: () => this.props.navigation.navigate('Login') },
        ],

      );
    }
    else {
      setTimeout(() => {
        Alert.alert(data.status, data.message)
      }, 200);
     
     
    }
  //  console.log('send response', data)
  }
  PopUp = () => {
    closeOverlay()
    this.setState({ visibles: false, QR_Code_Value: '', sliderValue: 0, usdforEther: 0.000 })
    this.props.navigation.setParams({ bottombar: true })
  }
  renderScane() {
    let coins=type;
    if(type==='ETH')
    {
      source=require('./assets/etheriumlogo.png')
      coins='ETH'
    }
    else if(type==='BTC')
    {
      source=require('./assets/Biocoinorange.png')
      coins='BTC'
    }
    else
    {
      source=require('./assets/bitwingslogo.png')
      coins='BWN'
    }
    return (
      <Animated.View style={{ flex: 1, width: '100%', transform: [{ scale: this.springValue }] }}>

        <Animated.View style={{ height: 45, width: this.AnimatedLeftWidth, position: 'absolute', left: 0, marginTop: 10, zIndex:1}}>
          <TouchableOpacity onPress={this.CloseLeftAction}>
            <View>
              <LinearGradient colors={['#F4317F', '#FF7C6E']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ justifyContent: 'center', borderTopRightRadius: 25, borderBottomRightRadius: 25, alignItems: 'flex-end', paddingTop: 15, paddingBottom: 15 }}>

                <View style={{ flexDirection: 'row' }}>
                  <View style={{ justifyContent: 'center', alignItems: 'flex-start', }}>
                    <Text style={{ color: '#fff', fontFamily: 'Exo2-Regular', fontSize: 15, marginLeft: -60 }}>Exit</Text>
                  </View>

                  <Image style={{ marginRight: 10, width: 20, height: 20 }} source={require("./assets/cancel.png")} ></Image>

                </View>

              </LinearGradient>
            </View>
          </TouchableOpacity>
        </Animated.View>
        <View style={{ flex: 0.1 }}></View>
        <View style={{ flex: 0.9, paddingLeft: 50, paddingRight: 50 }}>
          <View style={{ backgroundColor: '#fff', borderRadius: 15 }}>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
              <Text style={styles.instructions2}>Amount</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <View>
                <TextInput
                  style={styles.instructions3}
                  placeholder="0.000"
                  placeholderTextColor="#000"
                  keyboardType="number-pad"
                  onSubmitEditing={this.handleKeyDown}
                  maxLength={8}
                  onChangeText={(text) => this.ChangeText(text)}
                  value={this.state.usdforEther}
                />
              </View>
              <View style={{ marginTop: -10 }}>
 
                   <Image style={{ width: 50, height: 50, resizeMode: 'contain' }} source={source} ></Image>
                   

                
                {/* <Text style={{fontSize:30,color:'#000'}}>$</Text> */}
              </View>


            </View>



          </View>
          <TouchableOpacity onPress={this.Scanner.bind(this)}>
            <View style={{ backgroundColor: '#fff', borderRadius: 15, marginTop: 10, height: 150 }}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#5496FF', fontFamily: 'Exo2-Regular', fontSize: 11, marginTop: 10, marginLeft: 10, marginRight: 10 }}>SCAN YOUR QR CODE OR WRITE DOWN</Text>
              </View>

              <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10, }}>

                <Image
                  style={{
                    width: 100,
                    resizeMode: "contain",
                    height: 100
                  }}
                  source={require("./assets/portraitphoto.png")}
                />
              </View>
            </View>
          </TouchableOpacity>
          <View style={{ marginTop: 15, alignItems: 'center' }}>
          <TouchableOpacity onPress={this.SendClick}>
          <View>
          <LinearGradient colors={['#FF7C6E', '#F4317F']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ height: 40, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center', borderRadius: 25, width: 150 }}>
             
                <Text style={{ color: '#fff', fontFamily: 'Poppins-Regular' }}>Send</Text>
            
            </LinearGradient>
          </View>
          </TouchableOpacity>
          </View>
          <View style={{ backgroundColor: '#fff', borderRadius: 15, marginTop: 10, height: 40, }}>
            <View style={{ justifyContent: 'center', alignItems: 'center', paddingLeft: 10, paddingRight: 10 }}>
              <TextInput
                style={{ height: 40, fontFamily: 'Exo2-Regular' }}
                placeholder="write here your wallet address codee"
                onChangeText={(text)=>{this.setState({QR_Code_Value:text})}}
                value={(this.state.QR_Code_Value===null)?this.state.clickedItemText:this.state.QR_Code_Value}
                placeholderTextColor="#ABB3D0"
              />
            </View>

          </View>
          {/* <View style={{ backgroundColor: '#fff', borderRadius: 15, marginTop: 10, height: 120 }}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: '#ABB3D0', fontFamily: 'Exo2-Regular', fontSize: 18, marginTop: 10, marginLeft: 10, marginRight: 10 }}>Speed Bar</Text>
              <Slider
                style={{ width: '100%', color: '#F4317F', marginTop: 10 }}
                step={0.1}
                value={this.state.sliderValue}
                maximumValue={2}
                thumbTintColor='#F4317F'
                maximumTrackTintColor='#F4317F'
                minimumTrackTintColor='#F4317F'
              />
              <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
                <Text style={{ color: '#ABB3D0', fontFamily: 'Exo2-Regular', fontSize: 18, marginTop: 10, marginLeft: 10, marginRight: 10 }}>Speed Fee :</Text>
                <Text style={{ color: '#F4317F', fontSize: 18, marginTop: 10, marginLeft: 10, marginRight: 10 }}>{this.state.sliderValue} {coins}</Text>
              </View>
            </View>

          </View> */}
        </View>

        <View style={{ position: 'absolute', bottom: 0, width: '100%', left: 0 }}>
          <LinearGradient colors={['#FF7C6E', '#F4317F']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ borderTopLeftRadius: 100, height: 80, width: '100%', borderTopLeftRadius: 25 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', }}>
              <View style={{ backgroundColor: '#fff', borderRadius: 15, marginTop: 25, height: 40, width: '40%', justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 20, paddingRight: 20 }}>
                  <Text style={{ color: '#000', fontSize: 15, marginLeft: 10 }}>{coins}</Text>
                  <Text style={{ color: '#000', fontSize: 15, marginLeft: 10 }}>{this.state.usdforEther}</Text>
                </View>

              </View>
              <View style={{ backgroundColor: '#fff', borderRadius: 15, marginTop: 25, height: 40, width: '40%', justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 20, paddingRight: 20 }}>
                  <Text style={{ color: '#000', fontSize: 15, marginLeft: 10 }}>USD</Text>
                  <Text style={{ color: '#000', fontSize: 15, marginLeft: 10 }}>{this.state.sliderValue}</Text>
                </View>

              </View>
            </View>
          </LinearGradient>
        </View>

      </Animated.View>
    );
  }
  renderQrCode() {
    let coins=type;
    if(type==='ETH')
    {
      source=require('./assets/etheriumlogo.png')
      coins='ETH'
    }
    else if(type==='BTC')
    {
      source=require('./assets/Biocoinorange.png')
      coins='BTC'
    }
    else
    {
      source=require('./assets/bitwingslogo.png')
      coins='BWN'
    }
    return (
      <Animated.View style={{ flex: 1, width: '100%', transform: [{ scale: this.springValue }] }}>
        <Animated.View style={{ height: 45, width: this.AnimatedLeftWidth, position: 'absolute', left: 0, marginTop: 10,zIndex:1 }}>
          <TouchableOpacity onPress={this.CloseLeftAction}>
            <View>
              <LinearGradient colors={['#F4317F', '#FF7C6E']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ justifyContent: 'center', borderTopRightRadius: 25, borderBottomRightRadius: 25, alignItems: 'flex-end', paddingTop: 15, paddingBottom: 15 }}>

                <View style={{ flexDirection: 'row' }}>
                  <View style={{ justifyContent: 'center', alignItems: 'flex-start', }}>
                    <Text style={{ color: '#fff', fontFamily: 'Exo2-Regular', fontSize: 15, marginLeft: -60 }}>Exit</Text>
                  </View>
                  <Image style={{ marginRight: 10, width: 20, height: 20 }} source={require("./assets/cancel.png")} ></Image>

                </View>

              </LinearGradient>
            </View>
          </TouchableOpacity>
        </Animated.View>
        <View style={{ flex: 0.1 }}></View>
        <View style={{ flex: 0.9, paddingLeft: 40, paddingRight: 40 }}>

          <View style={{ backgroundColor: '#fff', borderRadius: 15, }}>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
              <Text style={styles.instructions2}>Amount</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
                <View style={{padding: 15}}>
                  <TextInput
                    style={styles.instructions3}
                    placeholder="0.000"
                    placeholderTextColor="#000"
                    maxLength={10}
                    keyboardType="number-pad"
                    onChangeText={(text) => this.ChangeText(text)}
                    value={this.state.usdforEther}
                  />
                </View>
                <View style={{ marginTop: -10 }}>
                 <Image style={{ width: 50, height: 50, resizeMode: 'contain' }} source={source} ></Image> 
                   
                  {/* <Text style={{fontSize:30,color:'#000'}}>$</Text> */}
                </View>


              </View>
            </View>


          </View>
          <TouchableOpacity onPress={this.Scanner.bind(this)}>
            <View style={{ backgroundColor: '#fff', borderRadius: 15, marginTop: 10, height: 150, }}>
              <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 10 }}>
                <QRCode
                  size={120}
                  color='#529DF3'
                  logoMargin={10}
                  value={(type === 'BTC') ? this.state.BtcWalletAddress: this.state.EtherWalletAddress}
                  logo={{ uri: base64Logo }}
                  logoSize={100}
                  logoBackgroundColor='transparent'
                />
              </View>

            </View>
      </TouchableOpacity>

          <View style={{ backgroundColor: '#fff', borderRadius: 15, marginTop: 10, height: 150, justifyContent: 'center', alignItems: 'center' }}>

            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <TouchableOpacity onPress={this.readFromClipboard}>
                <View>
                  <LinearGradient colors={['#7498F9', '#9B89F8', '#D476F7']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ paddingTop: 10, paddingBottom: 10, paddingLeft: 40, paddingRight: 40, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center', borderRadius: 50 }}>

                    <Text style={{ color: '#fff', fontFamily: 'Poppins-Regular' }}>Copy All</Text>

                  </LinearGradient>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ width: '80%', height: 40, borderWidth: 1, borderColor: '#4D90E9', borderRadius: 5, justifyContent: 'center', alignItems: 'center', marginTop: 10, padding: 10 }}>
              <Text style={{ color: '#464651', fontFamily: 'Poppins-Regular', textAlign: 'center', fontSize: 8 }}>{(type == 'BTC') ? this.state.BtcWalletAddress : this.state.EtherWalletAddress}</Text>
            </View>

          </View>
          <TouchableOpacity onPress={this.RequestPayment}>
            <View style={{ alignItems: 'center', justifyContent: 'center', paddingTop: 10 }}>
              <LinearGradient colors={['#7498F9', '#9B89F8', '#D476F7']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ paddingTop: 10, paddingBottom: 10, paddingLeft: 50, paddingRight: 50, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center', borderRadius: 50 }}>
                <Text style={{ color: '#fff', fontFamily: 'Poppins-Regular' }}>Request Payment</Text>
              </LinearGradient>
            </View>
          </TouchableOpacity>

        </View>

        <View style={{ position: 'absolute', bottom: 0, width: '100%', left: 0 }}>
          <LinearGradient colors={['#41DA9C', '#15E9E9']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ borderTopLeftRadius: 100, height: 80, width: '100%', borderTopLeftRadius: 25 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', }}>
              <View style={{ backgroundColor: '#fff', borderRadius: 15, marginTop: 25, height: 40, width: '40%', justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 20, paddingRight: 20 }}>
                  <Text style={{ color: '#000', fontSize: 15, marginLeft: 10 }}>{coins}</Text>
                  <Text style={{ color: '#000', fontSize: 15, marginLeft: 10 }}>{this.state.usdforEther}</Text>
                </View>

              </View>
              <View style={{ backgroundColor: '#fff', borderRadius: 15, marginTop: 25, height: 40, width: '40%', justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingLeft: 20, paddingRight: 20 }}>
                  <Text style={{ color: '#000', fontSize: 15, marginLeft: 10 }}>USD</Text>
                  <Text style={{ color: '#000', fontSize: 15, marginLeft: 10 }}>{this.state.sliderValue}</Text>
                </View>

              </View>
            </View>
          </LinearGradient>
        </View>
      </Animated.View>

    );
  }
  ChangeText = (UsdAmount) => {
 //   console.log('values', UsdAmount)
    if (UsdAmount.includes(',')) {
      Alert.alert('Alert', 'please enter numeric value')
    }
    else {
      let number = UsdAmount
      if (UsdAmount === '') {
        number = 0
        console.log('empty')
      }

      console.log('Changed Number', number)
      this.setState({ usdforEther: number })
      console.log('usdforEther Number', number)
      this.usdConvert(number)


      console.log('Request data.===>', "usdConvert calling")
    }


  }
  onUsdResponse = (data) => {
    if (data != DataUndefined) {
      if (data.status === ResponseSuccessStatus) {
        console.log('Coverted ETH Amount', data)
        if(data.CalculatingAmountDTO.cryptoType=='ETH'){
          this.setState({ sliderValue: data.CalculatingAmountDTO.usdforEther })
        }
        else if(data.CalculatingAmountDTO.cryptoType=='BTC'){
          this.setState({ sliderValue: data.CalculatingAmountDTO.usdforBtc })
        }
        else{
          this.setState({ sliderValue: data.CalculatingAmountDTO.usdforEther })
        }
       
      }
      else if (data.error === 'invalid_token') {
        Alert.alert(
          'Error',
          'Token Expired',
          [
            { text: 'OK', onPress: () => this.props.navigation.navigate("Login") },
          ],

        );
      }
      else {
        Alert.alert(data.status, data.message)
      }

      //Get value for Network fee and Crypto amount Apil̥
      //this.cryptoValue()
      //console.log('Request data.===>', 'cryptoValue()')
    }
  }
  usdConvert = async (amount) => {
    //   let type=crptoType
    console.log('Request data.===>', type, "type calling")
    if(type=='ETH'){
      params =
      {
        etherAmount: amount,
        cryptoType: type
  
      }
    }
    else if(type=='BTC'){
      params =
      {
        btcAmount: amount,
        cryptoType: type,
        where:'dashboard'
  
      }
    }
    else{
      params =
      {
        bwnAmount: amount,
        cryptoType: type
  
      }
    }
    //Get value for Network fee and Crypto amount Api
    ExchangeList(params,VaultCalculation, this.onUsdResponse,this.error,this.NetworkIssue)
    console.log('Request data.===>', this.onUsdResponse)

  }
  _animate = () => {
    this.animatedValue.setValue(0)
    Animated.timing(
      this.animatedValue,
      {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear
      }
    ).start(() => this._animate())
  }
  getPopUp()
  {
   if(this.state.profilestatus==1 && this.state.kycstatus==1 )
   {
     return null
   }
   else if(this.state.profilestatus==0 && this.state.kycstatus==1 )
   {
    return (<View >
    <LinearGradient colors={['#395ea4', '#446ea8', '#4c78a9']} style={{ width: '95%', marginLeft: 10, marginRight: 10, padding: 10, height: 160, marginTop: 15, borderRadius: 10 }}>
      <View style={{ flexDirection: 'row' }}>
        <View>
          <Text style={{ marginLeft: 20, fontSize: 18, color: '#fff', fontFamily: 'Exo2-Medium' }}>Complete Your Profile</Text>
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <Text style={{ marginLeft: 20, fontSize: 10, color: '#fff', width: '65%', fontFamily: 'Exo2-Regular',}}>Complete you profile today to start using your wallet successfully </Text>
          </View>
          <TouchableOpacity onPress={this.ContinueClick}>
            <View style={{ width: '60%', marginLeft: 20, marginTop: 30 }}>
              <LinearGradient colors={['#41d99c', '#34ddb2', '#21e4d3']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ padding: 10, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
                <Text style={{ color: '#fff', fontFamily: 'Poppins-Medium' }}>Continue</Text>
              </LinearGradient>
            </View>
          </TouchableOpacity>
        </View>
        <View >
        </View>
        <View style={{}}>
          <Image style={{
            height: 150, marginLeft: -100, marginTop: -40,
            width: 150,
            resizeMode: 'contain'
          }} source={require("./assets/slogo.png")} ></Image>
        </View>
      </View>
    </LinearGradient>
  </View>)
   }
   else if(this.state.profilestatus==1 && this.state.kycstatus==0)
   {
return(<View >
  <LinearGradient colors={['#395ea4', '#446ea8', '#4c78a9']} style={{ width: '95%', marginLeft: 10, marginRight: 10, padding: 10, height: 160, marginTop: 15, borderRadius: 10 }}>
    <Text style={{ marginLeft: 20, fontSize: 18, fontWeight: 'bold', color: '#fff' }}>Document Needed</Text>
    <View style={{ flexDirection: 'row' }}>
      <Text style={{ marginLeft: 20, fontSize: 10, color: '#fff', width: '65%',fontFamily: 'Exo2-Regular', }}>we have some issue with the documents you've supplied.please try uploading them again to continue </Text>
      <Image style={{
        marginLeft: 10, height: 50,
        width: 100,
        resizeMode: 'contain'
      }} source={require("./assets/profileicon.png")} ></Image>
    </View>
    <TouchableOpacity onPress={() => this.props.navigation.navigate('ChooseCountry')}>
      <View style={{ width: '50%', marginTop: 20 }}>
        <LinearGradient colors={['#17e8e3', '#30e0ba', '#3ddba1']} style={{ padding: 10, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
          <TouchableOpacity>
            <Text style={{ color: '#fff' }}>Upload again</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </TouchableOpacity>
  </LinearGradient>
</View>)
   }
   else
   {
      return (<View style={{position:'relative'}} >
        <LinearGradient colors={['#395ea4', '#446ea8', '#4c78a9']} style={{ width: '95%', marginLeft: 10, marginRight: 10, padding: 10, height: 160, marginTop: 15, borderRadius: 10 }}>
          <View style={{ flexDirection: 'row' }}>
            <View>
              <Text style={{ marginLeft: 20, fontSize: 18, color: '#fff', fontFamily: 'Exo2-Medium' }}>Complete Your Profile</Text>
              <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <Text style={{ marginLeft: 20, fontSize: 10, color: '#fff', width: '65%', fontFamily: 'Exo2-Regular',}}>Complete you profile today to start using your wallet successfully </Text>
              </View>
              <TouchableOpacity onPress={this.ContinueClick}>
                <View style={{ width: '60%', marginLeft: 20, marginTop: 30 }}>
                  <LinearGradient colors={['#41d99c', '#34ddb2', '#21e4d3']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ padding: 10, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
                    <Text style={{ color: '#fff', fontFamily: 'Poppins-Medium' }}>Continue</Text>
                  </LinearGradient>
                </View>
              </TouchableOpacity>
            </View>
            <View >
            </View>
          </View>
          <View style={{position:'absolute',right:0,justifyContent:'center'}}>
              <Image style={{
                height: 150,
                width: 150,
                resizeMode: 'contain'
              }} source={require("./assets/slogo.png")} ></Image>
            </View>
        </LinearGradient>
      </View>)
     
   }
  }
  closeleft=()=>
  {
    this.setState({QrButton:false})
    this.GraphAnimation()
  }
  render() {
    console.log('render camera close')
   let Renderpopup=this.getPopUp()
    const RotateData = this.RotateValueHolder.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });
    const Marginwidth = this.animatedValue.interpolate({
      inputRange: [0, 50],
      outputRange: [0, 100]
    })
    const { width } = Dimensions.get('window');
    const contentOffset = (width - 50) / 2;
    const { navigate } = this.props.navigation;
    const data = [100, 500, 1000, 500, 400, 600, 800, 400, 300, 500]
    const Line = ({ line }) => (
      <Path
        key={'line'}
        d={line}
        stroke={'#5099f0'}
        fill={'none'}
      />
    )
   
    if (this.state.animate) {
      return <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
        <ActivityIndicator
          color='#1a5fe1'
          size="large"
          style={styles.activityIndicator} />
      </View>
    }
    return (
      <SafeAreaView style={{flex:1,backgroundColor:'#354E91'}}>
      <View style={styles.Maincontainers}>
      
      { (this.state.QrButton) ?<View style={{zIndex:1,flex:1,position:'absolute',top:0,left:0,right:0,bottom:0}}><CameraKitCameraScreen
        showFrame={true}
        closeaction={this.closeleft}
        scanBarcode={true}
        laserColor={'#FF3D00'}
        frameColor={'#00C853'}
        colorForScannerFrame={'black'}
        onReadCode={event =>
          this.onQR_Code_Scan_Done(event.nativeEvent.codeStringValue)
        }
        
      ></CameraKitCameraScreen></View>:null
    }
        <Dialog
          visible={this.state.visibles}>
          <DialogContent>
            <View style={{ width: 300, height: 110, alignItems: 'center' }}>
              <View style={{ alignItems: 'center', paddingTop: 10 }}>
                <Image style={{ width: 50, height: 50, resizeMode: 'contain' }} source={require("./assets/successtik.png")} ></Image>
              </View>
              <View style={{ paddingTop: 10, paddingBottom: 10 }}>
                <Text style={{ fontSize: 15, color: '#454976', fontFamily: 'Exo2-Regular', textAlign: 'center' }}>{this.state.ResponseStatus}</Text>
              </View>
            </View>
          </DialogContent>
        </Dialog>
       <BlurOverlay
          radius={14}
          downsampling={2}
          showBlur={this.state.pops}
          brightness={-125}
          onPress={() => {
            //  closeOverlay();

          }}
          customStyles={{
            borderRadius: 15,
            alignItems: 'center'
          }}
          blurStyle='#222B50'
          children={(this.state.QrClick) ? this.renderScane() : this.renderQrCode()}
        />


        <LinearGradient colors={['#354E91', '#314682', '#283563', '#222B50', '#21284A']} style={{ flex: 1 }}>
          <Spinner
            visible={this.state.spinner}
            textContent={'Loading...'}
            overlayColor='rgba(0,0,0,0.5)'
            animation='fade'
            size='large'
            color='#f4347f'
            textStyle={styles.spinnerTextStyle}
          />
          <ScrollView contentContainerStyle={{ paddingBottom: 90 }}>
            <View style={{ justifyContent: 'space-between', flexDirection: 'row', }}>


              <Animated.View style={{ height: this.AnimatedHieght, width: this.AnimatedWidth, position: 'absolute', left: 0, marginTop: 10,zIndex:1 }}>
                <TouchableOpacity onPress={this._onPress.bind(this)}>
                  <View>
                    <LinearGradient colors={['#f4347f', '#F4317F', '#F4317F']} style={{ justifyContent: 'center', borderTopRightRadius: 25, borderBottomRightRadius: 25, alignItems: 'flex-end', paddingTop: 10, paddingBottom: 10 }}>

                      <View style={{ flexDirection: 'row' }}>
                      <View style={{ justifyContent: 'center' }}>
                            <Text style={{ color: '#fff', fontFamily: 'Exo2-Regular', alignSelf:'flex-start' ,fontSize: 12, }}>Send</Text>
                          </View>
                        <Image style={{ marginRight: 10,marginLeft:10, width: 30, height: 30 }} source={require("./assets/whitebox.png")} ></Image>

                      </View>

                    </LinearGradient>
                  </View>
                </TouchableOpacity>
              </Animated.View>






              <Animated.View style={{ height: 45, width: this.AnimatedRightWidth, position: 'absolute', right: 0, marginTop: 10, }}>
                <TouchableOpacity onPress={this.pressRight}>
                  <View>
                    <LinearGradient colors={['#17e8e3', '#30e0ba', '#3ddba1']} style={{ justifyContent: 'center', alignItems: 'flex-start', borderTopLeftRadius: 25, borderBottomLeftRadius: 25, paddingTop: 10, paddingBottom: 10 }}>

                      <View style={{ flexDirection: 'row' }}>
                        <Image style={{ marginLeft: 10, width: 30, height: 30, resizeMode: 'contain',tintColor:'#fff' }} source={require("./assets/greenD.png")} ></Image>
                        <View style={{ justifyContent: 'center' }}>
                            <Text style={{ color: '#fff', fontFamily: 'Exo2-Regular' ,fontSize: 12, marginLeft:10}}>Request</Text>
                          </View>
                      </View>

                    </LinearGradient>
                  </View>
                </TouchableOpacity>
              </Animated.View>


            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: "center", marginTop: 25 }}>
              <Image style={{ width: 18, height: 22, resizeMode: 'contain' }} source={require("./assets/app1white.png")} ></Image>
              <View style={{ flexDirection: 'column' }}>
                <Text style={{ marginLeft: 10, fontSize: 16, color: '#FFFFFF', fontFamily: 'Exo2-Regular' }}>Wallet</Text>
              </View>
            </View>
           
                {Renderpopup}

            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 30 }}>
              <Carousel
                data={this.state.carouselItems}
                sliderWidth={300}
                itemWidth={100}
                renderItem={this._renderItem}
                inactiveSlideOpacity={0.1}
                loop={true}
                onSnapToItem={(index) => this.action(index)}

              />
            </View>


            <View >
            <Animated.View style={{transform:[{
              translateX:this.animated.interpolate({
               inputRange:[0,1],
               outputRange:[150,1]
           })
            }]}}>
<View style={{marginLeft:-70}}>

<LineChart
    data={{
      labels:this.state.dateU,
      datasets: [{
        data:mass
      }]
    }}
    width={Dimensions.get('window').width} // from react-native
    height={130}
    yAxisLabel={''}
    label={false}
   
    shadowcolor='#2b396a'
    strokecolor='#79b7e8'
    dots={false}
    chartConfig={{
      gradientOpacity1:0.4,
      gradientOpacity2:0.3,
      gradientOpacity3:0.05,
      gradientOpacity4:0,
      gradientOpacity5:0,
      shadowgradientback1:'#4E8EE5',
    shadowgradientback2:'#4E8EE5',
    shadowgradientback3:'#4E8EE5',
    shadowgradientback4:'#58AAF3',
    shadowgradientback5:'#97F4F7',
      backgroundColor: '#395ea4',
      backgroundGradientFrom: '#264aa8',
      backgroundGradientTo: '#2b396a',
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16,
        opacity:0.1
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
</View>
         </Animated.View>


              <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: -30 }}>
                <Text style={{ marginLeft: 10, marginTop: 15, fontSize: 16, color: '#ABB3D0', fontFamily: 'Exo2-Regular' }}>{this.state.graphshow}</Text>
              </View>

              <View style={{ marginTop: 30, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <TouchableOpacity onPress={this.GetData}>
                    <View style={{ marginTop: 20 }}>
                      <Image style={{ resizeMode: 'contain', width: 60, height: 60 }} source={require("./assets/Refresh.png")} ></Image>
                    </View>
                  </TouchableOpacity>

                  <View>
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                      <Text style={{ marginLeft: 30, fontSize: 36, color: '#F5F6F9', fontFamily: 'Exo2-SemiBold' }}>{this.state.Balance}</Text>
                      <View style={{ marginTop: -10, marginLeft: 5 }}>
                        <LinearGradient colors={['#7498F9', '#9B89F8', '#D476F7']} style={{
                          width: 60, borderRadius: 5, padding: 5,
                          justifyContent: 'center', alignItems: "center"
                        }} >
                          <Text style={{ fontSize: 10, color: '#fff', textAlign: 'center', fontFamily: 'Exo2-Regular' }}>^15%</Text>
                        </LinearGradient>
                      </View>
                    </View>

                  </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%', marginTop: 20, alignItems: 'center' }}>
                  <Text style={{ fontSize: 12, color: '#F5F6F9', fontFamily: 'Exo2-Regular' }}>{this.state.Usd}</Text>
                  <View >
                { Platform.OS === 'ios' ? <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                    <RNPickerSelect
                         placeholder={{
                          label: 'USDollar',
                          value: 'USDollar',
                          color: '#ABB3D0',
                        }}
                        textInputProps={{ color: '#ABB3D0' }}
                        style={styles.inputIOS}
                        onValueChange={(itemValue, itemIndex) => this.selectedAmount(itemValue, itemIndex)}
                        items={[
                          { label: "USDollar", value: "USDollar" },
                        
                        ]}
                      /> 
                      <Image style={{ width: 10, height: 10, marginLeft: 10,alignSelf:'center' }} source={require("./assets/down_arrow.png")} ></Image>
                      </View>:<View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', marginLeft: 20 }}>
                      <Text style={{ color: '#ABB3D0', opacity: 1, fontSize: 12, fontFamily: 'Exo2-Regular' }}>{this.state.Amount}</Text>
                    <Image style={{ width: 10, height: 10, marginLeft: 10 }} source={require("./assets/down_arrow.png")} ></Image>
                    <Picker style={{ position: 'absolute', top: 0, width: 3000, height: 3000 }}
                      selectedValue={this.state.Amount}
                      onValueChange={(itemValue, itemIndex) => this.selectedAmount(itemValue, itemIndex)}>
                      <Picker.Item label="USDollar" value="USDollar" />
                    </Picker>
                      </View>}   
                  </View>



                </View>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Price')}>
                      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: 45, height: 25, borderWidth: 1, borderColor: '#4A6BCD', justifyContent: 'center', alignItems: 'center', borderRadius: 6 }}>
                          <Text style={{ fontSize: 12, color: '#ABB3D0', fontFamily: 'Exo2-Regular' }}>All</Text>
                        </View>
                      </View>
                    </TouchableOpacity>


                    <View style={{ marginLeft: 30 }}>
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 12, color: '#5496FF', fontFamily: 'Exo2-Medium' }}>ETH</Text>
                        <View style={{ marginTop: 5 }}>
                          <Image style={{ resizeMode: 'contain', width: 10, height: 10 }} source={require("./assets/red.png")} ></Image>
                        </View>
                      </View>

                      <Text style={{ marginTop: 1, fontSize: 12, fontWeight: 'bold', color: '#ABB3D0', fontFamily: 'Exo2-Medium' }}>${this.state.currentUsdforEther}</Text>
                    </View>
                    <View style={{ marginLeft: 40 }}>
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 12, color: '#5496FF', fontFamily: 'Exo2-Medium' }}>BTC</Text>
                        <View style={{ marginTop: 3 }}>
                          <Image style={{ resizeMode: 'contain', width: 10, height: 10 }} source={require("./assets/green.png")} ></Image>
                        </View>
                      </View>

                      <Text style={{ marginTop: 1, fontSize: 12, color: '#ABB3D0', fontFamily: 'Exo2-Regular' }}>${this.state.currentUsdforBtc}</Text>
                    </View>
                    <View style={{ marginLeft: 40 }}>
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 12, color: '#5496FF', fontFamily: 'Exo2-Medium' }}>BWN</Text>
                        <View style={{ marginTop: 3 }}>
                          <Image style={{ resizeMode: 'contain', width: 10, height: 10 }} source={require("./assets/green.png")} ></Image>
                        </View>
                      </View>

                      <Text style={{ marginTop: 1, fontSize: 12, fontWeight: 'bold', color: '#ABB3D0', fontFamily: 'Exo2-Regular' }}>${this.state.currentUsdforBwn}</Text>
                    </View>

                  </View>
                </View>
              </View>
              <View style={{ height: '100%' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 30, marginRight: 30, marginTop: 10 }}>
                  <Text style={{ marginLeft: 20, fontSize: 12, color: '#ABB3D0', fontFamily: 'Exo2-Medium' }}>Activity</Text>

                  <View>
                 { Platform.OS === 'ios' ? <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                        <RNPickerSelect
                        textInputProps={{ color: '#5496FF' }}
                        style={styles.inputIOS}
                        placeholder={{
                          label: 'Today',
                          value: 'null',
                          color: 'transparent',
                        }}
                        onValueChange={(itemValue, itemIndex) => this.selectedTime(itemValue, itemIndex)}
                        items={[
                          { label:"Today" ,value:"today"  },
                          { label:"week" ,value:"week" },
                          {label:"Month", value:"Month"},
                
                        ]}
                      /> 
                       <Image style={{ width: 9, height: 7, resizeMode: 'contain', marginLeft: 10, marginRight: 10 ,alignSelf:'center',tintColor:'#5496FF'}} source={require("./assets/darrow.png")} ></Image>
                      </View>:<View  style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: '#2c4b9d', borderRadius: 15 }}>
                      <Image style={{ width: 10, height: 10, tintColor: '#5496FF' }} source={require("./assets/down_arrow.png")} ></Image>
                    <Text style={{ color: '#5496FF', opacity: 1, fontSize: 12, marginLeft: 5, fontFamily: 'Exo2-Bold' }}>{this.state.Time}</Text>
                    <Picker style={{ position: 'absolute', top: 0, width: 3000, height: 3000 }}
                      selectedValue={this.state.Time}
                      onValueChange={(itemValue, itemIndex) => this.selectedTime(itemValue, itemIndex)}>
                      <Picker.Item label="Today" value="today" />
                      <Picker.Item label="week" value="week" />
                      <Picker.Item label="Month" value="month" />
                    </Picker>
                      </View> }  
               
                  </View>




                </View>
                <View style={{ flex: 1,marginTop:10 }}>
                {
                  this.state.dataSource.length!=0?this.state.dataSource.map((item, key) =>
              (
              
                <ExpandabelList type={type}  hide={this.hide} Send={this.SendClickfromchild.bind(this)}  key={item.listCalculatingAmountDTO} onClickFunction={this.update_Layout.bind(this, key)} item={item} />
              )): <View>
              <View style={{justifyContent:'center',alignItems:'center'}}>
              <Text style={{color:'#ABB3D0',fontWeight:'bold',opacity:1,fontSize:15,fontFamily:'Exo2-Regular'}}>No Data Found</Text>
              </View>
              </View>
          }
                </View>

              </View>


            </View>
          </ScrollView>



        </LinearGradient>
      </View>
      </SafeAreaView>
    );
  }
  update_Layout = (index) => {

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    const array = [...this.state.dataSource];

    array[index]['expanded'] = !array[index]['expanded'];

    this.setState(() => {
      return {
        dataSource: array
      }
    });
  }
  clickedItemText = (item) => {
    Alert.alert(item.Status)
  }
  GetData = async () => {
    this.Load()
    this.setState({ EtherWalletAddress: await AsyncStorage.getItem('etherwalletAddress'), BtcWalletAddress: await AsyncStorage.getItem('bitcoinWalletReceivingAddress') })
    VaultSystemApi(type, this.BalanceResponse,this.error)
  }
  error=(data)=>
  {
    this.hide()
    setTimeout(() => {
      Alert.alert(data.status, data.message)
    }, 200);
    
  }
  readFromClipboard = async () => {
    console.log('its comming')
    await Clipboard.setString((type == 'BTC') ? this.state.BtcWalletAddress:this.state.EtherWalletAddress);
    Alert.alert('address copied')
  };
  BalanceResponse = (data) => {
    console.log('data', data)
    this.hide()
    if (data != 'undefined') {
      if (data.status === ResponseSuccessStatus) {
        if (data.CalculatingAmountDTO.cryptoType === 'ETH') {
          this.setState({
            Usd: data.CalculatingAmountDTO.usdforEther, Balance: data.CalculatingAmountDTO.etherAmount,
            currentUsdforEther: data.CalculatingAmountDTO.currentUsdforEther, currentUsdforBtc: data.CalculatingAmountDTO.currentUsdforBtc,currentUsdforBwn:data.CalculatingAmountDTO.currentUsdforBitWings
          })


        }

        else if (data.CalculatingAmountDTO.cryptoType === 'BTC') {
          this.setState({
            Usd: data.CalculatingAmountDTO.usdforBtc, Balance: data.CalculatingAmountDTO.btcAmount,
            currentUsdforEther: data.CalculatingAmountDTO.currentUsdforEther, currentUsdforBtc: data.CalculatingAmountDTO.currentUsdforBtc,currentUsdforBwn:data.CalculatingAmountDTO.currentUsdforBitWings
          })

        }
        else
        {
          this.setState({
            Usd: data.CalculatingAmountDTO.usdForBwn, Balance: data.CalculatingAmountDTO.bwnAmount,
            currentUsdforEther: data.CalculatingAmountDTO.currentUsdforEther, currentUsdforBtc: data.CalculatingAmountDTO.currentUsdforBtc,currentUsdforBwn:data.CalculatingAmountDTO.currentUsdforBitWings
          })
        }
        this.GetList()

      }
      else if (data.error === 'invalid_token') {
        Alert.alert(
          'Error',
          'Token Expired',
          [
            { text: 'OK', onPress: () => this.props.navigation.navigate('Login') },
          ],

        );
      }
      else {
        Alert.alert(InvalidResponse)
      }
    }
  }
  GetList = async () => {
    let userId = await AsyncStorage.getItem('UserId')
    let params =
    {
      "userId": userId,
      "fetchAmountFlag": 'All',
      "cryptoType": type,
      "flagfordates": this.state.Time
    }
    console.log('Request walletactivity data', params)
    this.Load()
    getactivitydata(params, this.ListData,this.error)
  }
  ListData = (data) => {
    this.hide()
  //  console.log('Get Activity data', data)
    if (data != 'undefined') {
      if (data.status === ResponseSuccessStatus) {
        let FinalResult=[]
        FinalResult=data.listCalculatingAmountDTO
        const newFile =FinalResult.map((file) => {

          return {...file, expanded: false};
      });
    //  console.log('Get Activity new file', newFile)
      this.setState({dataSource: newFile,dates:newFile.listCalculatingAmountDTO });
     let dataarray=[]
     let gpdata=[]
  
      let newdates =FinalResult.map((file,key) => {

        if(key<10)
        {
          gpdata.push(file.amount)
         // dataarray.push(file.Date)
          return file.Date
        }
    });
    if(gpdata.length===0)
    {
      this.setState({graphshow:'No Data'})
      mass=[0.1]
    }
    else
    {
      this.setState({graphshow:'Balance'})
     // console.log(gpdata)
      mass=gpdata
    }
 
    this.setState({dateU:dataarray,datas:gpdata})
      // console.log('dats',this.state.datas)
      }
      else if (data.error === InvalidToken) {
        Alert.alert(
          'Error',
          TokenExpired,
          [
            { text: 'OK', onPress: () => this.props.navigation.navigate("Login") },
          ],

        );
      }
      else {
        setTimeout(() => {
          Alert.alert(data.status,data.message)
        }, 200);
       
      }
    }
    this.GraphAnimation()
  }
  action = (index) => {

    let num = index
    if (num <= 0) {
      type = 'ETH'
      cryptoType = 'ETH'
      // this.GetList()      
    }
    else if(num==1) {
      console.log('btc=================>',num)
      type = 'BTC'
      this.setState({ QR_Code_Value: '' })
      cryptoType = 'BTCTEST'
      // type = 'BTCTEST'
      // this.GetList()    
    }
    else
    {
      type = 'BWN'
      this.setState({ QR_Code_Value: '' })
      cryptoType = 'BWN'
    }
    this.GetData()
  }
  selectedAmount = (item, itemIndex) => {
    this.setState({
      Amount: item
    })

  }
  selectedTime = (item, itemIndex) => {
    this.setState({
      Time: item
    })

    this.GetList()
  }
  ContinueClick = () => {
    this.props.navigation.navigate('Welcome')
  }
  _renderItem({ item, index }) {

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#fff', marginTop: 10 }} >{item.title}</Text>
        <Image style={{ width: 100, height: 100, resizeMode: 'contain' }}
          source={item.ShadowImages}
        />

      </View>
    )




  }
}



const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF'
  },
  Maincontainers: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containers: {
    backgroundColor: 'transparent',
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: '30%',
    height: '32%',
    resizeMode: 'cover',
  },
  ButtonRow: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    backgroundColor: '#fbfbfb',


  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderWidth: 0.5,

    borderColor: '#d6d7da',
    width: '50%',
    color: '#000'
  },
  textStyle: {
    textAlign: 'center',
    fontFamily: 'Arial',
    fontSize: 16
  },
  buttonContainer: {
    backgroundColor: '#27a8e0',
    width: '40%',
    marginTop: 15,

    paddingVertical: 15
  },
  SignInbuttonContainer: {
    backgroundColor: '#7f7f7f',
    width: '40%',
    marginTop: 15,
    marginLeft: 10,
    paddingVertical: 15
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  instructions2: {
    textAlign: 'center',
    color: '#7D7D93',
    marginBottom: 5,
    fontSize: 12,
    fontFamily: 'Poppins-Regular'
  },
  instructions3: {
    width: 100,
    color: '#474C84',
    fontSize: 25,
    fontFamily: 'Poppins-Regular'
  },
});