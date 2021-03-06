import * as React from 'react';
import { Path } from 'react-native-svg'
import { View, StyleSheet,TextInput,Platform, Image,Picker,UIManager,ImageBackground,LayoutAnimation, SafeAreaView,Text,ActivityIndicator,ScrollView,TouchableOpacity,Easing,Animated ,AsyncStorage} from 'react-native';
import { Alert } from 'react-native';
import { AreaChart, Grid } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import LinearGradient from 'react-native-linear-gradient';
import RNPickerSelect from 'react-native-picker-select';
import Spinner from 'react-native-loading-spinner-overlay';
import BlurOverlay,{closeOverlay,openOverlay} from 'react-native-blur-overlay';
import Dialog, { DialogFooter, DialogButton, DialogContent } from 'react-native-popup-dialog';
import {ExchangeList} from '../Api/ExchangeRequest'
import {ExchangeRequest,EXCHANGE_HISTORY_LIST} from '../Api/RequestUrl'
import {StackActions} from 'react-navigation'
import Expandable_Admin from '../Utils.js/Expandable_Admin'
import {ResponseSuccessStatus,InvalidResponse,DataUndefined,InvalidToken,TokenExpired} from '../Utils.js/Constant'

let FinalResult=[]
export default class  Publish  extends React.Component {

  static navigationOptions = {
    header: null
  }


  constructor(props) {
    super(props);
    if (Platform.OS === 'android')
    {
    UIManager.setLayoutAnimationEnabledExperimental(true)
    }
    this.springValue = new Animated.Value(0.3)
    this.state = {
      dataSource:[],
      cityItems:["US Doller,Indian,Eutherium"],
      Coin: 'Us Doller',
      visibles:false,
      Amount:'COP',
      StatusMode:'Publications',
      animate:false,
      w: 50,
      SuccessPopup:true,
      h: 45,
      wr:50,
      hr:45,
      Ahr:80,
      mode:'All',
      successstatus:'Success',
      AnimatedWidth:new Animated.Value(50),
      AnimatedHieght:new Animated.Value(45),
      Awr:80,
      clickr:false,
      clickopen:false,
      click:false,
      slide:false,
      visible: false,
      hidden: false,
      app1color:'#fff',
      app6color:'#5099f0',
      app2color:'#5099f0',
      app3color:'#5099f0',
      app4color:'#fff',
      app5color:'#5099f0',
      PurchaseColor:'#fff',
      SalesColor:'transparent',
      PurchaseOpacity:1,
      SalesOpacity:0.6,
      exchangeTypeMenu:this.props.navigation.state.params.Exchange_Type,
      exchangeOrRequest:false,
      userIdLogin:''
    };
  
  }
  
  componentDidMount()
  {
    this.GetData()
    
  }

  
  GetData=async()=>
  {
    //ExchangeRequest(this.ExchangeRequestResponse)
   // this.openOverlay()
   
   let UserId=await AsyncStorage.getItem('UserId') 
   let params=
   {
    cryptoType:this.state.mode,
    exchangeMode:'admin',
    userId:UserId
   }
   this.Load()
    ExchangeList(params,EXCHANGE_HISTORY_LIST,this.ExchangeListResponse,this.error,this.NetworkIssue)
  }
  error=(error)=>
  {
    Alert.alert('Alert',error)
  }
  NetworkIssue=(error)=>
  {
    Alert.alert('Alert',error)
  }
  ExchangeListResponse=(data)=>
{
  this.hide()
  //this.hide()
  if(data!=DataUndefined)
  {
    if(data.status===ResponseSuccessStatus)
    {
     this.setState({dataSource:data.fetchExchageRequestDTO.exchangeDTOList})
     FinalResult=data.fetchExchageRequestDTO.exchangeDTOList;
     
    }
    else if(data.error===InvalidToken)
    {
      Alert.alert(
        'Error',
        TokenExpired,
        [
          {text: 'OK', onPress: () => this.props.navigation.navigate("Login")},
        ],
  
      );
    }
    else
    {
      Alert.alert(InvalidResponse)
    }
  }
}
search = (status, inputArray) => {
  console.log('inputArray length',inputArray.length)
  let SearchArray=[]
  for (let i=0; i < inputArray.length; i++) {
      if (inputArray[i].status===status) {
        SearchArray.push(inputArray[i])
      }
      
  }
  return SearchArray;
}
Load=()=>{
  this.setState({animate:true})
}
hide=()=>{
  this.setState({animate:false})
}
space(){
  return(<View style={{height: 10, width: 1, backgroundColor:'black'}}/>)
}
renderScane() {
  return (
    <Animated.View  style={{flex:1,width:'100%',transform: [{scale: this.springValue}]}}>
   
    <Animated.View style={{height:45,width:this.AnimatedLeftWidth, position:'absolute',left:0, marginTop:10,}}>
      <TouchableOpacity onPress={this.CloseLeftAction}>
      <View>
      <LinearGradient colors={['#F4317F','#FF7C6E']} start={{x: 0, y: 0}} end={{x: 1, y: 0}} style={{justifyContent:'center',borderTopRightRadius:25,borderBottomRightRadius:25,alignItems:'flex-end',paddingTop:15,paddingBottom:15}}>
    
       <View style={{flexDirection: 'row'}}> 
       <View style={{justifyContent:'center',alignItems:'flex-start',}}>
       <Text style={{color:'#fff',fontFamily:'Exo2-Regular',fontSize:15,marginLeft:-60}}>Exit</Text>
       </View>
      
          <Image style={{marginRight:10,width: 20, height: 20}}   source={require("../assets/clo.png")} ></Image>     
     
          </View>
         
</LinearGradient>
</View>
 </TouchableOpacity>
      </Animated.View>
      <View style={{flex:0.1}}></View>
    <View style={{alignItems:'center', flex:0.9,}}>
    <View style={{backgroundColor:'#fff',borderRadius:15,marginTop:25,height:150,alignItems:'center'}}>
    <View>
    <Image style={{width: 50, height: 50,resizeMode:'contain'}}   source={require("../assets/successtik.png")} ></Image>    
    </View>
    </View>
    </View>
    
  
   
    </Animated.View>
  );
        }
  render() {
    const data = [ 50, 60, 70, 95, 100, 120, 100, 80, 90, 60, 50, 40, 60, 100 ]
    const Line = ({ line }) => (
      <Path
          key={'line'}
          d={line}
          stroke={'#25e2cd'}
          fill={'none'}
      />
  )

   

    return (  
      <SafeAreaView style={{flex:1,backgroundColor:'#354E91'}}>
      <View style={styles.Maincontainers}>  
      <BlurOverlay
                    radius={14}
                    downsampling={2}
                    brightness={-125}
                    customStyles={{borderRadius:15,
                    alignItems:'center'}}
                    blurStyle='#222B50'
                    children={(this.state.SuccessPopup)?this.renderScane():null}
                />   
        <LinearGradient colors= {['#354E91','#314682','#283563','#222B50','#21284A']} style={styles.Maincontainers}>
        <Spinner
            visible={this.state.animate}
            textContent={'Loading...'}
            overlayColor='rgba(0,0,0,0.5)'
            animation='fade'
            size='large'
            color='#f4347f'
            textStyle={styles.spinnerTextStyle}
          />
        <View style={{paddingLeft:20,paddingRight:20}}>
         <Dialog
  onTouchOutside={() => {
      this.setState({ visibles: false });
    }}
  
    visible={this.state.visibles}>
    <DialogContent>
     <View style={{width:300,height:110,alignItems:'center'}}>
         <View style={{alignItems:'center',paddingTop:10}}>
         <Image style={{width: 50, height: 50,resizeMode:'contain'}}   source={require("../assets/successtik.png")} ></Image>     
         </View>
         <View style={{paddingTop:10,paddingBottom:10}}>
         <Text style={{fontSize:15,color:'#454976',fontFamily:'Exo2-Regular',textAlign:'center'}}>{this.state.successstatus}</Text>           
         </View>
     </View>
    </DialogContent>
  </Dialog>

 </View>

 <ImageBackground source={require('../assets/Group_20501.png')} imageStyle={{resizeMode:'cover',width:'100%',height:'100%'}} style={{opacity:0.9,flex:0.34,zIndex:1}}>
 <View style={{position:'absolute',bottom:-10,left:0,right:0,justifyContent:'center',alignItems:"center"}}>
    <TouchableOpacity onPress={this.ExchangeLogic}> 
    <View>
    <LinearGradient colors= {['#97F5F9','#7ED5F6','#529DF3','#4781DF','#2D3CAD']} style={{width:70,
    height: 70,
    borderRadius: 70/2,
    backgroundColor:this.state.app1color,justifyContent:'center',alignItems:"center"}} >
   
    <Image  style={{width: 40, height: 40,resizeMode:'contain'}}  source={require('../assets/publication.png')} ></Image>
    
            
          </LinearGradient>
    </View>
    </TouchableOpacity>
 
 
  </View>
<View style={{justifyContent:'center',alignItems:'flex-start',top:30,left:15,position:'absolute',zIndex:1}}>
<TouchableOpacity onPress={()=>this.props.navigation.goBack()}>
<View>
<Image style={{width: 15, height: 15,resizeMode:'contain'}}   source={require("../assets/back.png")} ></Image> 
</View>
          </TouchableOpacity>
       </View>
      
 <View style={{justifyContent:'center',alignItems:'center'}}>

          <View style={{flexDirection:'row',marginTop:20}}>
          <View style={{justifyContent:"center",alignItems:'center'}}>
          <Image style={{marginRight:10,width: 18, height: 22,resizeMode:'contain'}}   source={require("../assets/app4.png")} ></Image>     
          </View>
         
          <Text style={{fontSize:20,color:'#fff',fontFamily:'Exo2-Regular '}}>Exchange</Text>
          </View>
         
          <View style={{width:'80%',borderRadius:25,borderWidth:1,borderColor:'#fff',marginTop:20,marginBottom:20, justifyContent:'space-between',flexDirection:'row'}}>
<View style={{flexDirection:'row',marginLeft:20}}>
<Image  style={{width: 20, height: 20,marginTop:10}}  source={require("../assets/Searchicon.png")} ></Image> 
<TextInput
          style={{height: 40,width:100,color:'#ffffff',fontFamily:'Exo2-Regular'}}
       placeholderTextColor='#ffffff'
          placeholder="Quantity"
          onChangeText={(text) => this.filterSearch(text)}
           value={this.state.text}
          keyboardType = 'numeric'
          maxLength={10}
        />
    
</View>
          <View style={{justifyContent:'space-between',flexDirection:'row',alignItems:'center',paddingRight:10,marginLeft:-30}}>
<Image  style={{width: 9, height: 7,resizeMode:'contain',marginLeft:10,marginRight:10}}  source={require("../assets/darrow.png")} ></Image> 
<Text style={{color:'#FFFFFF',opacity:1,fontSize:11,fontFamily:'Exo2-Regular'}}>{this.state.mode}</Text>
  <Picker style={{ position:'absolute', top: 0, width: 1500, height: 1500}}
        selectedValue={this.state.mode}
       onValueChange={(itemValue, itemIndex) => this.selectedcoin(itemValue,itemIndex)}>
       
       <Picker.Item label="All" value="All" />
       <Picker.Item label="BTC" value="BTC" />
       <Picker.Item label="ETH" value="ETH" />
       {/* <Picker.Item label="Bitwings" value="Bitwings" /> */}
       </Picker>
        </View>  
          </View>
          <View style={{width:'50%',borderRadius:25,borderWidth:1,borderColor:'#fff', alignItems:'center',flexDirection:'row',justifyContent:'center',padding:5}}>
<View style={{justifyContent:'space-between',flexDirection:'row',alignItems:'center'}}>
        <Text style={{color:'#fff',fontWeight:'bold',opacity:1,fontSize:12,fontFamily:'Exo2-Regular'}}>{this.state.StatusMode}</Text>
        <Image  style={{width: 10, height: 10,resizeMode:'contain',marginLeft:10,marginRight:10}}  source={require("../assets/darrow.png")} ></Image> 
        <Picker style={{ position:'absolute', top: 0, width: 1000, height: 3000}}
   selectedValue={this.state.StatusMode}
  onValueChange={(itemValue, itemIndex) => this.selectedMode(itemValue,itemIndex)}>
  
  <Picker.Item label="Publication" value="Publication" />
  <Picker.Item label="Request" value="Request" />
  
  </Picker>
        </View>
        
  
          </View>
          </View>   
      
</ImageBackground>
          <View style={{justifyContent:'center',alignItems:'center'}}>
  </View>  

  <View style={{flex:0.66,marginTop:20}}>
  <ScrollView contentContainerStyle={{paddingBottom: 100}}>
  <View>
          {
            this.state.dataSource.length!=0? this.state.dataSource.map((item, key) =>
              (
                <Expandable_Admin refreshList={this.GetData} mode={this.state.mode}   popupShow={this.successStatus.bind(this)} onHide={this.hide} onLoad={this.Load}  key={item.exchangeDTOList} onClickFunction={this.update_Layout.bind(this, key)} item={item} />
              )):
              <View>
              <View style={{justifyContent:'center',alignItems:'center'}}>
              <Text style={{color:'#fff',fontWeight:'bold',opacity:1,fontSize:15,fontFamily:'Exo2-Regular'}}>No Request Found</Text>
              </View>
              </View>      
          }
  </View>       
     </ScrollView>
         </View>
</LinearGradient>
     </View>  
    </SafeAreaView>
    );
      }
      clickedItemText=async(item)=>
      {
        if(this.state.exchangeOrRequest === true){
          let params;
          let urlparams;
          //openOverlay()
          
          let userId =await AsyncStorage.getItem('UserId') 
          console.log('Admin exchange params',item)
          if(item.exchangeType==='BTC_ETH_ADMIN')
          {
            urlparams='btc_eth/admin/exchange'
            params=
            {
             "userId":userId ,
             "btcAmount":item.amountToTrade.toString(),    
             "exchangeReqId":item.id.toString(),
             "exchangeStatus":item.status,
           }
          }
          else
          {
            urlparams='eth_btc/admin/exchange'
            params=
            {
             "userId": userId,
             "etherAmount":item.amountToTrade.toString(),    
             "exchangeReqId":item.id.toString(),
             "exchangeStatus":item.status,
           }
          }
         
        console.log('Admin exchange params Request',params)
          this.Load()
          ExchangeList(urlparams,params,this.ExchangeRequestResponse,this.error,this.NetworkIssue)
           // Alert.alert(item.id.toString())
        }else{

        }
        
         
      }
      selectedcoin=(item,index)=>
      {
        this.setState({
          mode:item
        })
        this.GetData()
      }
      successStatus=(data)=>
    {
      console.log('its comming success status',data)
     
       this.setState({visibles:true,successstatus:data.message})
       setTimeout(this.nav,1500)
       
    }
    nav=()=>
    {
      this.setState({visibles:false})
      this.GetData()
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
    filterSearch(text) {
    
      const newData = this.state.dataSource.filter((item) => {
        const itemData = item.amountToTrade
        return itemData.toString().indexOf(text) > -1
      });
      this.setState({
        text: text,
        dataSource: newData // after filter we are setting users to new array
      });
      if (!text || text === '') {
        this.setState({
          dataSource: FinalResult
        })
      }
    }
    pushNavigate=(routname)=>
    {

      let pushAction=StackActions.push({
        routeName:routname
      })
      this.props.navigation.dispatch(pushAction);
    }
      ExchangeRequestResponse=(data)=>
      {
        console.log('Request data===>',data)
        this.hide()
        if(data!=DataUndefined)
  {
    if(data.status===ResponseSuccessStatus)
    {
      this.successStatus(data)
     //Alert.alert(data.status,data.message)
    }
    else if(data.status==='failure')
    {
     // this.successStatus()
      Alert.alert(data.status,data.message)
    }
    else 
    {
      Alert.alert(
        'Error',
        TokenExpired,
        [
          {text: 'OK', onPress: () => this.props.navigation.navigate("Login")},
        ],
  
      );
    }
  }
      }
      selectedCop=(item,itemIndex)=>{
        this.setState({
          Amount:item
        })
      }
      selectedMode=async(item,itemIndex)=>
      {
        this.setState({
         StatusMode:item
        })
        if(item==='Request')
        {
         let RequestArray=[]
         RequestArray=this.search(1,this.state.dataSource)
         this.setState({dataSource:RequestArray})
        }
        else
        {
        this.GetData()
        }
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
   backgroundColor: '#fff',
    marginTop:5,
  },
  containers: {
  flex:1,
   height:'30%'
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
    marginLeft:20,
    marginRight:20,
    marginTop:20,
    backgroundColor: '#fbfbfb',

   
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
  input:{
      height: 50,
      backgroundColor: '#fff',
      borderWidth: 0.5,
     
      borderColor: '#d6d7da',
      width: '50%',
      color: '#000'
  },
  textStyle :{
    textAlign: 'center',   
    fontFamily: 'Arial',
    fontSize: 16
},
  buttonContainer:{
      backgroundColor: '#27a8e0',
      width: '40%',
      marginTop:15,
     
      paddingVertical: 15
  },
  SignInbuttonContainer:{
    backgroundColor: '#7f7f7f',
    width: '40%',
    marginTop:15,
    marginLeft:10,
    paddingVertical: 15
},
  buttonText:{
      color: '#fff',
      textAlign: 'center',
      fontWeight: '700'
  }
});