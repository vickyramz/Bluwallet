import * as React from 'react';
import { Path } from 'react-native-svg'
import { View, StyleSheet, Image,TextInput,Dimensions,Text,ActivityIndicator,TouchableOpacity,LayoutAnimation,Picker} from 'react-native';
import { Alert } from 'react-native';
import BackgroundIcon from '../../Background'

import LinearGradient from 'react-native-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';
import {StateDataApi, CityDataApi} from '../Api/AddressData'

export default class Address  extends React.Component {

  static navigationOptions = {
    header: null
  }


  constructor(props) {
    super(props);
    
    this.state = {
      dataSource:[],
      cityItems:["US Doller,Indian,Eutherium"],
      Coin: 'Us Doller',
      animate:false,
      AddressLine1:null,
      AddressLine2:null,
      city:null,
      Country:null,
      PostalCode:null,
      clickr:false,
      clickopen:false,
      click:false,
      slide:false,
      visible: false,
      hidden: false,
      app1color:'#fff',
      app5color:'#fff',
      stateData:[],
      selectedService:'select State',
      selectedCity:'city/town/village',
      cityData:[],
      cityID:'',
      stateid:'',
    };
  
  }
  
  componentDidMount()
  {
    //this.GetListData()

    let params=this.props.navigation.state.params.CountryID
    this.GetState(params.CountryId)
    console.log('stateData',params)


  }

    GetState=async(code)=>{
      StateDataApi(code,this.OnResponse)
    }

    OnResponse=async(data)=>{
      console.log('stateData',data)
      if(data.status==='success'){
        //this.setState({dataSource:data.countryData})
         console.log('stateData',data.StateData)
         this.SetStateData(data.StateData)
         
      }
      else
      {
        console.log('stateData', data)
        Alert.alert(data.status,data.message)
      }
    }

    SetStateData=async=(stateData)=>{

      this.setState({stateData:stateData})
      
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
_onPress=()=>{
  if(!this.state.click){
    LayoutAnimation.spring();
    this.setState({w: this.state.w + 50})
    this.setState({click:true})
  }else{
    LayoutAnimation.spring();
    this.setState({w:50})
    this.setState({click:false})
  }
   
}
pressRight=()=>{
  if(!this.state.clickr){
    LayoutAnimation.spring();
    this.setState({wr: this.state.wr + 50})
    this.setState({clickr:true})
  }else{
    LayoutAnimation.spring();
    this.setState({wr:50})
    this.setState({clickr:false})
}
}
SlideMenu=()=>{
  if(!this.state.slide){
    LayoutAnimation.spring();
    if(this.state.Awr>80){
      this.setState({Awr:80})
      this.setState({slide:false})
    }
    else{
      this.setState({Awr:this.state.Awr+250})
      this.setState({slide:true})
    }
    
  }
  else{
    LayoutAnimation.spring();
    this.setState({Awr:80})
    this.setState({slide:false})
  }
  }
  render() {
    const { navigate } = this.props.navigation;
    const data = [ 50, 60, 70, 95, 100, 120, 100, 80, 90, 60, 50, 40, 60, 100 ]
    const Line = ({ line }) => (
      <Path
          key={'line'}
          d={line}
          stroke={'#5099f0'}
          fill={'none'}
      />
  )
  let cityItems = this.state.cityData.map( (s, i) => {
    return <Picker.Item key={i} value={s} label={s.cityName} />
  });

   let stateItems = this.state.stateData.map( (s, i) => {
    return <Picker.Item key={i} value={s} label={s.stateName} />
  });   
  

   
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
       
    

       <LinearGradient
   colors= {['#FFFFFF','#DFE1ED','#CCCFE2']} style={{height:'100%'}}>  
   <View style={{justifyContent:'center',alignItems:'center',position:'absolute',bottom:100,}}>
        <Image
                style={{width: Dimensions.get('window').width,
    resizeMode: "contain",
    height: 211,opacity:0.1}}
                source={require('../assets/dlogo.png')}
            />            
        </View>
   <ScrollView>
   <View style={{flex:1}}>
<View style={{flex:0.8}}>
<View style={{flexDirection:'row',justifyContent:'space-between'}}>
    <TouchableOpacity onPress={()=>this.props.navigation.goBack(null)} style={{width:50,height:50}}>
    <View style={{justifyContent:'center',alignItems:'center'}}>
    <Image  style={{width: 6, height: 11,marginLeft:20,marginTop:30,resizeMode:'contain'}}  source={require("../assets/left-arrow.png")} ></Image> 
    </View>
    </TouchableOpacity>
   
    <View style={{justifyContent:'center',alignItems:'center'}}>
    <Text style={{color:'#4e649f',opacity:1,fontSize:18,marginTop:20,fontFamily:'Exo2-Bold'}}>Home Address</Text>
    </View>
    <View></View>
    </View>
    <View style={{justifyContent:'center',alignItems:'center'}}>
    <Text style={{color:'#4e649f',opacity:1,fontSize:12,marginTop:25,fontFamily:'Exo2-SemiBold'}}>This information is only used to help us verify</Text>
    <Text style={{color:'#4e649f',opacity:1,fontSize:12,marginTop:2,fontFamily:'Exo2-SemiBold'}}> your Identity</Text>

    <View style={{width:'80%',borderRadius:25,borderWidth:1,borderColor:'#d7dee8',marginTop:10,marginBottom:20, justifyContent:"center",backgroundColor:'#fff'}}>
<View style={{flexDirection:'row',marginLeft:20,justifyContent:'flex-start',alignItems:'center'}}>
<Image  style={{width: 20, height: 20}}  source={require("../assets/magnifying-glass.png")} ></Image> 
<TextInput
          style={{height: 40,padding:10,fontFamily:'Exo2-Regular'}}
          placeholderTextColor='#9ab8db'
          placeholder="Home Address"
        
        />
</View>
          </View>
          <View style={{width:'100%',borderColor:'#d7dee8',backgroundColor:'#fff',marginTop:30, justifyContent:"center",borderLeftWidth:1,borderRightWidth:1,borderTopWidth:1,borderBottomWidth:1}}>
<View style={{flexDirection:'row',marginLeft:20,justifyContent:'flex-start',alignItems:'center'}}>

<TextInput
          style={{height: 50,padding:10,fontFamily:'Exo2-Regular'}}
          placeholderTextColor='#9ab8db'
          placeholder="Address Line 1"
          returnKeyType = { "next" }
          onChangeText={(text) => this.setState({AddressLine1:text})}
        />
</View>
          </View>
          <View style={{width:'100%',borderColor:'#d7dee8',backgroundColor:'#fff', justifyContent:"center",borderLeftWidth:1,borderRightWidth:1,borderTopWidth:1}}>
<View style={{flexDirection:'row',marginLeft:20,justifyContent:'flex-start',alignItems:'center'}}>

<TextInput
          style={{height: 50,padding:10,fontFamily:'Exo2-Regular'}}
          placeholderTextColor='#9ab8db'
          placeholder="Address Line 2"
          returnKeyType = { "next" }
          onChangeText={(text) => this.setState({AddressLine2:text})}
        />
</View>
          </View>
          
          <View style={{width:'100%',height: 50,backgroundColor:'#fff',borderColor:'#d7dee8', justifyContent:"center",borderLeftWidth:1,borderRightWidth:1,borderTopWidth:1}}>
<View style={{flexDirection:'row',marginLeft:20,justifyContent:'flex-start',alignItems:'center'}}>

   

<View style={{justifyContent:'space-between',flexDirection:'row'}}>
<Text style={{color:(this.state.selectedService==='select State')?'#9ab8db':'#000',opacity:1,fontSize:15,fontFamily:'Exo2-Regular',marginLeft:10}}>{this.state.selectedService}</Text>
</View>

<Picker style={{ position:'absolute', top: 0, width: 1000, height: 3000 }}
 selectedValue={this.state.selectedService}
 onValueChange={this.pickerChange.bind(this)}>
 <Picker.Item label="Please select state" value="Please select state" />
                   {stateItems}
</Picker>
</View>
          </View>
		  
          <View style={{width:'100%',height: 50,backgroundColor:'#fff',borderColor:'#d7dee8', justifyContent:"center",borderLeftWidth:1,borderRightWidth:1,borderTopWidth:1}}>
<View style={{flexDirection:'row',marginLeft:20,justifyContent:'flex-start',alignItems:'center'}}>

   

<View style={{justifyContent:'space-between',flexDirection:'row'}}>
<Text style={{color:(this.state.selectedCity==='city/town/village')?'#9ab8db':'#000',opacity:1,fontSize:15,fontFamily:'Exo2-Regular',marginLeft:10}}>{this.state.selectedCity}</Text>
</View>

<Picker style={{ position:'absolute', top: 0, width: 1000, height: 3000 }}
 selectedValue={this.state.selectedCity}
                    itemStyle={{color: "blue"}}
                    onValueChange={(itemValue, itemIndex) =>this.selectedCity(itemValue, itemIndex)}>
                   {cityItems}
</Picker>
</View>
          </View>
          <View style={{width:'100%',borderColor:'#d7dee8',backgroundColor:'#fff', justifyContent:"center",borderLeftWidth:1,borderRightWidth:1,borderTopWidth:1}}>
<View style={{flexDirection:'row',marginLeft:20,justifyContent:'flex-start',alignItems:'center'}}>

<TextInput
          style={{height: 50,padding:10,fontFamily:'Exo2-Regular'}}
          placeholderTextColor='#9ab8db'
          placeholder="Postal Code"
          keyboardType='numeric'
          returnKeyType = { "done" }
          onChangeText={(text) => this.setState({PostalCode:text})}
        />
</View>
          </View>
         
    </View>
</View>

 <View style={{flex:0.1,paddingTop:50}}>
 <View style={{alignContent:'center',alignSelf:'auto'}}> 
        
    
        <TouchableOpacity onPress={this.BeginAction}>
        <View>
        <LinearGradient colors={['#41d99c','#34ddb2','#21e4d3']} start={{x: 0, y: 0}} end={{x: 1, y: 0}}  style={{padding:15,justifyContent:'center',alignItems:'center'}}>

<Text style={{color:'#fff',fontSize:20,fontFamily:'Poppins-Medium'}}>Send</Text>

</LinearGradient>
        </View>
        </TouchableOpacity>
        <View>
<LinearGradient colors={['#354e91','#354e91','#354e91']}  style={{padding:15,alignItems:'center'}}>
<TouchableOpacity>
<Text style={{color:'#fff',opacity:1,fontSize:11,marginTop:2,fontFamily:'Exo2-Regular'}}>when you create a wallet,you accept</Text>
<View style={{flexDirection:'row',marginTop:2,}}>
<Text style={{color:'#5496ff',opacity:1,fontSize:11,marginTop:5,fontFamily:'Exo2-SemiBold'}}>Terms of Services</Text>
<Text style={{color:'#fff',opacity:1,fontSize:11,marginTop:5,marginLeft:8,fontFamily:'Exo2-Regular'}}>&</Text>
<Text style={{color:'#5496ff',opacity:1,fontSize:11,marginTop:5,marginLeft:8,fontFamily:'Exo2-SemiBold'}}>Politics and privacy</Text>
</View>

</TouchableOpacity>
</LinearGradient>
</View>
    
            
</View>   
 </View>
    
   

   </View>
   
        </ScrollView>
 </LinearGradient> 
     </View>
      
    
    );
      }
     
      pickerChange =(item)=>
      {
        //Alert.alert('cityData.status,cityData.message')
console.log('state Value',item)
if(item!='Please select state')
{
  this.setState({
    selectedService:item.stateName,
    stateid:item.id
  })
  this.CallCityGetApi(item.id) 
}
      }
      selectedCity=(item)=>{
        this.setState({
          selectedCity:item.cityName,
          cityID:item.id
        })
      }

      CallCityGetApi=async=(stateId)=>{
        //console.log('cityData',stateId)
        CityDataApi(stateId,this.onCityResponse)
      }
  
      onCityResponse=async=(data)=>{
        console.log('cityData',data)
        if(data.status==='success'){

          if(data.CityData != '' && data.CityData != 'undefined'){
            //console.log('cityData',data.CityData.cityName)
            this.setState({cityData:data.CityData})
            //this.setCityData(data.CityData.cityName)
            
            
          }else{
            Alert.alert('Alert','City data not found!!')
          }
         
        }
        else
        {
        
          Alert.alert(data.status,data.message)
        }

        setCityData=async=(cityData)=>{
          console.log('cityData--',cityData)
          this.setState({cityData:cityData})
          
        }
      }
     

     clickedItemText=(item)=>
      {
          Alert.alert(item.Status)
      }
      BeginAction=()=>
      { 
         this.Register()
      
      }
      Register=()=>
      {
        if(this.state.AddressLine1==null)
        {
          Alert.alert('Please Enter AddressLine1')
        }
        else if(this.state.AddressLine2==null)
        {
          Alert.alert('Please Enter AddressLine2')
        }
        else if(this.state.selectedCity==null)
        {
          Alert.alert('Please Enter city')
        }
        else if(this.state.selectedService==null)
        {
          Alert.alert('Please Enter Country')
        }
        else if(this.state.PostalCode==null)
        {
          Alert.alert('Please Enter PostalCode')
        }
        else
        {
            let RegisterDetails=
        {
          AddressLine1:this.state.AddressLine1,
          AddressLine2:this.state.AddressLine2,
          city:this.state.selectedCity,
          CountryId:this.props.navigation.state.params.CountryID.CountryId,
          PostalCode:this.state.PostalCode,
          stateId:this.state.stateid,
          cityId:this.state.cityID,
        } 
      
        
        this.props.navigation.navigate('ProfileRegister',{'RegisterDetails':RegisterDetails});

        }


      }
}



const styles = StyleSheet.create({
 
  Maincontainers: {
    flex: 1, 
    height:'100%'
  },
  containers: {
    backgroundColor: 'transparent',
    marginTop:5,
   
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