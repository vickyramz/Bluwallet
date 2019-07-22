import * as React from 'react';
import { Path } from 'react-native-svg'
import { View, StyleSheet,TextInput, Image,Picker,ScrollView,Text,ActivityIndicator,TouchableOpacity,AsyncStorage,KeyboardAvoidingView} from 'react-native';
import { Alert } from 'react-native';
import { AreaChart, Grid } from 'react-native-svg-charts'
import { Switch} from 'react-native'
import * as shape from 'd3-shape'
import Logo from '../../logo'
import {ExchangeOnLoad} from '../Api/ExchangeRequest'
import {ResponseSuccessStatus,InvalidResponse,DataUndefined,InvalidToken,TokenExpired} from '../Utils.js/Constant'
import LinearGradient from 'react-native-linear-gradient';

let crptoType="eth"
let ExchangeType='getuserdetails'
export default class  Buy  extends React.Component {

  static navigationOptions = {
    header: null
  }


  constructor(props) {
    super(props);
    
    this.state = {
      dataSource:[],
      switchValue:false,
      cityItems:["US Doller,Indian,Eutherium"],
      Coin: 'Us Doller',
      EthAmount:'ETH',
      BtcAmount:'BTC',
      ethercurrentvalue:null,
      receivedAmount:null,
      mincomercialValue:null,
      maxcomercialValue:null,
      usdforEther:null,
      paidAmount:null,
      animate:false,
      w: 50,
      h: 45,
      wr:50,
      hr:45,
      Ahr:80,
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
      app5color:'#5099f0'
    };
  
  }
  
  componentDidMount()
  {
    this.OnLoad()
  }
  OnLoad=async()=>
  {
    let type=crptoType
    let params=
    {
      userId:await AsyncStorage.getItem('UserId') ,
      cryptoType:type

    }
   
    ExchangeOnLoad(ExchangeType,params,this.OnLoadResponse)
  }
  OnLoadResponse=(data)=>
  {
    if(data!=DataUndefined)
    {
      if(data.status===ResponseSuccessStatus)
      {
        this.setState({"usdforEther":data.CalculatingAmountDTO.usdforEther.toString(),
        "ethercurrentvalue": data.CalculatingAmountDTO.ethercurrentvalue,
        "cryptoType": data.CalculatingAmountDTO.cryptoType,
        "receivedAmount":data.CalculatingAmountDTO.receivedAmount,
        "paidAmount": data.CalculatingAmountDTO.paidAmount,
        "mincomercialValue":data.CalculatingAmountDTO.mincomercialValue,
        "maxcomercialValue":data.CalculatingAmountDTO.maxcomercialValue})
      }
    }
  }

dataset=(data)=>{
  this.setState({
    dataSource:data
  })
  this.hide()
}
Load(){
  this.setState({animate:true})
}
hide(){
  this.setState({animate:false})
}
space(){
  return(<View style={{height: 10, width: 1, backgroundColor:'black'}}/>)
}

toggleSwitch=(value)=>{
  this.setState({switchValue: value})
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

   
  if(this.state.animate){  
    return <View style={{justifyContent:'center',alignItems:'center',flex:1}}>
    <ActivityIndicator
  color = '#1a5fe1'
  size = "large"
  style = {styles.activityIndicator}/>
  </View>
  }
    return (  
   
      <View style={styles.Maincontainers}>  
                 <LinearGradient  colors= {['#354E91','#314682','#283563','#222B50','#21284A']} style={styles.Maincontainers} >
      <LinearGradient
   colors={['#2D3CAD','#4781DF','#529DF3','#7ED5F6','#97F5F9']} start={{x: 0, y: 0}} end={{x: 1, y: 0}} style={{height:'35%',opacity:0.9}}>     
      <LinearGradient
   colors={['#2D3CAD','#4781DF','#529DF3','#7ED5F6','#97F5F9']} style={{height:'100%',marginRight:30,marginTop:30}}>
 <LinearGradient colors={['#fff','#fff','#CCCFE2']} style={{justifyContent:'center',marginTop:-10,height:this.state.h,width:this.state.w, alignItems:'flex-end',borderTopRightRadius:25,borderBottomRightRadius:25,position:'absolute'}}>
<TouchableOpacity onPress={this._onPress}>
       <View style={{flexDirection: 'row'}}> 
          <Image style={{marginRight:10,width: 30, height: 30}}   source={require("../assets/note.PNG.png")} ></Image>     
     
          </View>
          </TouchableOpacity>
</LinearGradient> 
 <View style={{justifyContent:'center',alignItems:'center'}}>
          <View style={{flexDirection:'row',marginTop:20,justifyContent:'space-between'}}>
          <Image style={{marginRight:10,width: 18, height: 22,resizeMode:'contain'}}   source={require("../assets/app4.png")} ></Image>     
          <Text style={{fontSize:18,color:'#fff',fontFamily:'Exo2-Regular'}}>Exchange</Text>
          </View>      
          <Text style={{fontSize:12,color:'#fff',marginTop:10,fontFamily:'Exo2-Regular'}}>How Much do you want to buy?</Text>           
          <View style={{flexDirection: 'row',marginLeft:20}}>
          <View style={{width:'40%',borderRadius:25,borderWidth:1,borderColor:'#fff',marginTop:10,marginBottom:10, justifyContent:"center"}}>
<View style={{flexDirection:'row',marginLeft:20,justifyContent:'space-between'}}> 
<View style={{justifyContent:'space-between',flexDirection:'row',alignItems:'center'}}>
        <Text style={{color:'#fff',opacity:1,fontSize:12,fontFamily:'Exo2-Regular'}}>{this.state.EthAmount}</Text>
        <Image  style={{width: 10, height: 10,resizeMode:'contain',marginLeft:10,marginRight:10}}  source={require("../assets/darrow.png")} ></Image> 
        <Picker style={{ position:'absolute', top: 0, width: 1000, height: 1000}}
   selectedValue={this.state.EthAmount}
  onValueChange={(itemValue, itemIndex) => this.selected1(itemValue,itemIndex)}>
  
  <Picker.Item label="ETH" value="ETH" />
  <Picker.Item label="BTC" value="BTC" />
  </Picker>
        </View>
        <View>
        <View>
<Text style={{color:'#fff',opacity:1,fontSize:12,fontFamily:'Exo2-Regular',marginRight:10}}>0.000</Text>
</View>
        </View>
</View>
          </View>
          <View style={{width:'40%',borderRadius:25,borderWidth:1,borderColor:'#fff',marginTop:10,marginBottom:10,marginLeft:10, justifyContent:"center",padding:10}}>
<View style={{flexDirection:'row',marginLeft:20,justifyContent:'space-between'}}>

<View style={{justifyContent:'space-between',flexDirection:'row',alignItems:'center'}}>
        <Text style={{color:'#fff',opacity:1,fontSize:12,fontFamily:'Exo2-Regular'}}>{this.state.BtcAmount}</Text>
        <Image  style={{width: 10, height: 10,resizeMode:'contain',marginLeft:10,marginRight:10}}  source={require("../assets/darrow.png")} ></Image> 
        <Picker style={{ position:'absolute', top: 0, width: 1000, height: 1000}}
   selectedValue={this.state.BtcAmount}
  onValueChange={(itemValue, itemIndex) => this.selected2(itemValue,itemIndex)}>
    <Picker.Item label="BTC" value="BTC" />
  <Picker.Item label="ETH" value="ETH" />

  </Picker>
        </View>
<View>
<Text style={{color:'#fff',opacity:1,fontSize:12,fontFamily:'Exo2-Regular'}}>0.000</Text>
</View>

</View>
          </View>
    
     </View>            
          </View>
         <View>  
          </View>
          </LinearGradient>    
         


          </LinearGradient> 
        
<View style={{flex:1}}>
<View style={{justifyContent:'center',alignItems:'center'}}>
  <LinearGradient colors= {['#97F5F9','#7ED5F6','#529DF3','#4781DF','#2D3CAD']} style={{width:70,
    height: 70,
    borderRadius: 70/2,
    backgroundColor:this.state.app1color,justifyContent:'center',alignItems:"center"}} >
   
    <Image  style={{width: 40, height: 40,resizeMode:'contain'}}  source={require('../assets/exchangenew.png')} ></Image>
    
            
          </LinearGradient>
  </View>  
          <LinearGradient  colors= {['transparent','transparent','transparent']} style={{marginTop:20}} >
   <ScrollView>
<View style={{backgroundColor:'transparent',marginBottom:100}}>  
<View style={{justifyContent:'center',alignItems:'center'}}>
<TextInput
          style={{height: 80,color:'#fff',fontSize:36}}
          placeholder="$ 0.000" 
          placeholderTextColor="#fff"
          keyboardType = "number-pad"
          onChangeText={(text) =>this.ChangeText(text)}
          value={this.state.usdforEther}
        />
</View> 

<View
  style={{
    marginTop:30,
    borderBottomColor: '#394d88',marginBottom:10,
    borderBottomWidth: 1,
  }}
/>
<View style={{flexDirection:'row',marginLeft:20}}>
<View style={{flex:1}}>
<Text style={{fontSize:12,color:'#5496FF',marginTop:10,fontFamily:'Exo2-Medium'}}>BTC Price</Text>
</View>  

<View style={{flexDirection:'row',flex:1}}>
<Text style={{fontSize:12,color:'#a9b4d4',marginTop:10,textAlign:'center',fontFamily:'Exo2-Regular'}}>{this.state.ethercurrentvalue}</Text> 

</View>  

</View>
<View
  style={{
    marginTop:10,
    borderBottomColor: '#394d88',marginBottom:10,
    borderBottomWidth: 1,
  }}
/>
<View style={{flexDirection:'row',marginLeft:20}}>  
<View style={{flex:1}}>
<Text style={{fontSize:12,color:'#5496FF',marginTop:10,fontFamily:'Exo2-Mediumr'}}>BTC price Dolar</Text>
</View>

<View style={{flexDirection:'row',flex:1}}>
<Text style={{fontSize:12,color:'#a9b4d4',marginTop:10,fontFamily:'Exo2-Regular'}}>{this.state.usdforEther}</Text> 
</View>  

</View>
<View
  style={{
    marginTop:10,
    borderBottomColor: '#394d88',marginBottom:10,
    borderBottomWidth: 1,
  }}
/>
<View style={{flexDirection:'row',marginLeft:20}}>  
<View  style={{flex:1}}>
<Text style={{fontSize:12,color:'#5496FF',marginTop:10,fontFamily:'Exo2-Medium'}}>Network fees</Text>  
</View>
<View style={{flex:1}}>
<Text style={{fontSize:12,color:'#a9b4d4',marginTop:10,fontFamily:'Exo2-Regular'}}>{this.state.receivedAmount}</Text> 
</View>
</View>
<View
  style={{
    marginTop:10,
    borderBottomColor: '#394d88',
    borderBottomWidth: 1,
  }}
/>
<View style={{flexDirection:'row',marginLeft:20}}>  
<View style={{flex:1}}>
<Text style={{fontSize:12,color:'#5496FF',marginTop:10,fontFamily:'Exo2-Medium'}}>Commercial Limits</Text>
</View>
  <View style={{flex:1}}>
  <Text style={{fontSize:12,color:'#a9b4d4',marginTop:10,fontFamily:'Exo2-Regular'}}>{this.state.mincomercialValue}-{this.state.maxcomercialValue} COP</Text> 
  </View>

</View>
<View
  style={{
    marginTop:10,
    borderBottomColor: '#394d88',
    borderBottomWidth: 1,
  }}
/>
<View style={{height:40,width:'100%',backgroundColor:'transparent'}}></View>
<View style={{flexDirection:'row',marginLeft:20}}>  
<View style={{flex:1}}>
<Text style={{fontSize:12,color:'#5496FF',marginTop:10,fontFamily:'Exo2-Medium'}}>Send</Text>  
</View>
<View style={{flex:1}}>
<Text style={{fontSize:12,color:'#a9b4d4',marginTop:10,fontFamily:'Exo2-Regular'}}>{this.state.paidAmount}ETH</Text> 
</View>

</View>
<View
  style={{
    marginTop:10,
    borderBottomColor: '#394d88',
    borderBottomWidth: 1,
  }}
/>
<View style={{flexDirection:'row',marginLeft:20}}>  
<View style={{flex:2.2}}>
<Text style={{fontSize:12,color:'#5496FF',marginTop:10,fontFamily:'Exo2-Medium'}}>Description</Text>  
</View>
<View style={{flex:1}}>
<Text style={{fontSize:12,color:'#a9b4d4',marginTop:10,marginLeft:-10,fontFamily:'Exo2-Regular'}}>Transfer data</Text> 
</View>
<View style={{flex:1}}>
<Text style={{fontSize:20,color:'#a9b4d4',marginTop:-5,fontFamily:'Exo2-Regular'}}>...</Text> 
</View>

</View>
<View
  style={{
    marginTop:10,
    borderBottomColor: '#394d88',
    borderBottomWidth: 1,
  }}
/>
<View style={{backgroundColor:'#232d51'}}>
<View style={{justifyContent:'center',alignItems:'center',marginBottom:100,width:"100%",marginTop:30}}>
<View style={{width:"50%"}}>
<LinearGradient colors={['#41da9c','#36deaf','#26e3ca']}  start={{x: 0, y: 0}} end={{x: 1, y: 0}} style={{width:'100%',padding:12,backgroundColor:'green',justifyContent:'center',alignItems:'center',marginLeft:10,borderRadius:6}}>
<TouchableOpacity onPress={()=>this.props.navigation.navigate('Payment')}>
<Text style={{color:'#fff',fontFamily:'Poppins-Medium'}}>Exchange</Text></TouchableOpacity>
</LinearGradient>

</View>

</View>
</View>
   
</View>
    </ScrollView>    
</LinearGradient>
   
      
    
       
 
  
      </View>
    
</LinearGradient>
     </View>
  
    
    );
      }
      clickedItemText=(item)=>
      {
          Alert.alert(item.Status)
      }
      selected1=(item,itemIndex)=>{
        this.setState({
          EthAmount:item
        })
      }
      selected2=(item,itemIndex)=>{
        this.setState({
          BtcAmount:item
        })
      }
      ChangeText=(UsdAmount)=>
      {
        if(UsdAmount.length<this.state.usdforEther.length)
        {
          this.setState({usdforEther:''})
        }
        else
        {
          this.setState({usdforEther:UsdAmount})
        }
       
      }
}



const styles = StyleSheet.create({
 
  Maincontainers: {
    flex: 1,   
    backgroundColor: '#fff',
  },
  containers: {
   backgroundColor: 'transparent',
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