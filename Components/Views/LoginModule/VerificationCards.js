import * as React from 'react';
import { Path } from 'react-native-svg'
import { View, StyleSheet, Image,Picker,TextInput,Text,ActivityIndicator,TouchableOpacity,LayoutAnimation,Easing,Animated,Dimensions,ScrollView} from 'react-native';
import { Alert } from 'react-native';
import BackgroundIcon from '../../Background'
const { height } = Dimensions.get('window');
import LinearGradient from 'react-native-linear-gradient';

export default class VerificationCards  extends React.Component {

  static navigationOptions = {
    header: null
  }


  constructor(props) {
    super(props);
    this.AnimatedWidth= new Animated.Value(50),
    this.state = {
      dataSource:[],
      cityItems:["US Doller,Indian,Eutherium"],
      Coin: 'Us Doller',
      animate:false,
      Country:'Documents Country',
      screenHeight: 0,
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
      app5color:'#fff',
      PassportTintcolor:'#000000',
       idTintcolor:'#354E91',
       residenceTintcolor:'#41DA9C',
       driverTintcolor:'#5496FF',

       Residencecolor:'#5496FF',
       idtextcolor:'#5496FF',
       passporttextcolor:'#5496FF',
       drivertextcolor:'#5496FF',

   
       passportcolor1:'#fff',passportcolor2:'#fff',passportcolor3:'#fff',
       idcolor1:'#fff',idcolor2:'#fff',idcolor3:'#fff',
       residencegradientcolor1:'#fff',residencegradientcolor2:'#fff',residencegradientcolor3:'#fff',
       drivercolor1:'#fff',drivercolor2:'#fff',drivercolor3:'#fff',
    };
  
  }
  
  componentDidMount()
  {
    //this.GetListData()
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
  Animated.sequence([
    Animated.timing(this.AnimatedWidth, {
      toValue: 100,
      duration: 250,
      easing: Easing.inOut(Easing.ease),
      delay: 10,
    }),
    Animated.timing(this.AnimatedWidth, {
      toValue: 50,
      duration: 250,
      easing: Easing.inOut(Easing.ease),
      delay: 10,
    })
  ]).start(() => this.props.navigation.goBack(null));

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
  onContentSizeChange = (contentWidth, contentHeight) => {
    // Save the content height in state
    this.setState({ screenHeight: contentHeight });
  };
  render() {
    const scrollEnabled = this.state.screenHeight > height;
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
      <ScrollView style={{ flex: 1 }}
      contentContainerStyle={styles.scrollview}
      scrollEnabled={scrollEnabled}
      onContentSizeChange={this.onContentSizeChange}>
    
<LinearGradient
colors= {['#FFFFFF','#DFE1ED','#CCCFE2']} style={styles.Maincontainers}>   
     
     <View style={{flex:1}}>
    
<View style={{flex:0.2}}>
<View style={{flexDirection:'row',justifyContent:'space-between'}}>
{/* <View style={{justifyContent:'center',alignItems:'center'}}>
    <Image  style={{width: 6, height: 11,marginLeft:20,marginTop:15,resizeMode:'contain'}}  source={require("../assets/left-arrow.png")} ></Image> 
    </View> */}
    <TouchableOpacity onPress={this.pressRight} style={{position:'absolute',right:0}}>
      <Animated.View style={{backgroundColor:'#fd6d71',height:this.state.hr,width:this.AnimatedWidth,justifyContent:'center', borderTopStartRadius:25,borderBottomStartRadius:25, marginTop:10,}}>
           
       <View style={{flexDirection: 'row'}}> 
          <Image style={{marginLeft:10,width: 20, height: 20}}   source={require("../assets/cancel.png")} ></Image>     
     
          </View>
         
            </Animated.View>
            </TouchableOpacity>
</View>
<View  style={{justifyContent:'center',alignItems:'center',marginTop:20
}}>
 <Image  style={{width: 150, height: 150,resizeMode:'contain'}}  source={require("../assets/threelogo.png")} ></Image> 
    

</View>

<View  style={{justifyContent:'center',alignItems:'center',marginTop:20
}}>
<Text style={{color:'#4e649f',opacity:1,fontSize:20,fontFamily:'Exo2-Bold'}}>Lets Verified!</Text>
<Text style={{color:'#4e649f',opacity:1,fontSize:12,marginTop:10,fontFamily:'Exo2-SemiBold'}}>Please choose the country where your document was</Text>
<Text style={{color:'#4e649f',opacity:1,fontSize:12,marginTop:2,fontFamily:'Exo2-SemiBold'}}>Issued</Text>


</View> 
</View>

<View style={{flex:0.8}}> 

<View>


 
<View > 
<TouchableOpacity onPress={this.PassPortSelect} style={{justifyContent:'center',alignItems:'center'}}>
<View></View>
<View style={{width:'100%',borderColor:'#d7dee8',backgroundColor:'#fff',marginTop:30, justifyContent:"center",borderLeftWidth:1,borderRightWidth:1,borderTopWidth:1}}>
<LinearGradient
colors={[this.state.passportcolor1,this.state.passportcolor2,this.state.passportcolor3]}  start={{x: 0, y: 0}} end={{x: 1, y: 0}}>
<View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center', height: 50,padding:10,paddingLeft:50,paddingRight:50}}>

<Text style={{color:this.state.passporttextcolor,fontFamily:'Exo2-Regular'}}>Passport</Text>
<Image  style={{width: 30, height: 30,resizeMode:'contain',tintColor:this.state.PassportTintcolor}}  source={require("../assets/passport.png")} ></Image>
</View>
</LinearGradient>
</View>

</TouchableOpacity>
<TouchableOpacity onPress={this.IdSelect}>

<View >
<LinearGradient
colors={[this.state.idcolor1,this.state.idcolor2,this.state.idcolor3]}  start={{x: 0, y: 0}} end={{x: 1, y: 0}} style={{width:'100%',borderColor:'#d7dee8',backgroundColor:'#fff', justifyContent:"center",borderLeftWidth:1,borderRightWidth:1,borderTopWidth:1}}>
<View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',height: 50,padding:10,paddingLeft:50,paddingRight:50}}>
<Text style={{color:this.state.idtextcolor,fontFamily:'Exo2-Regular'}}>ID-Card</Text>
<Image  style={{width: 30, height: 30,resizeMode:'contain',tintColor:this.state.idTintcolor}}  source={require("../assets/id_card.png")} ></Image>


</View>
</LinearGradient>
</View> 
</TouchableOpacity>
<TouchableOpacity onPress={this.ResidenceSelect}>
<View >
<LinearGradient
colors={[this.state.residencegradientcolor1,this.state.residencegradientcolor2,this.state.residencegradientcolor3]}  start={{x: 0, y: 0}} end={{x: 1, y: 0}} style={{width:'100%',borderColor:'#d7dee8',backgroundColor:'#fff', justifyContent:"center",borderLeftWidth:1,borderRightWidth:1,borderTopWidth:1}}>  
<View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',height: 50,padding:10,paddingLeft:50,paddingRight:50}}>
<Text style={{color:this.state.Residencecolor,fontFamily:'Exo2-Regular'}}>Residence Permit</Text>
<Image  style={{width: 30, height: 30,resizeMode:'contain',tintColor:this.state.residenceTintcolor}}  source={require("../assets/residency.png")} ></Image>
</View>
</LinearGradient>
</View>
</TouchableOpacity>
<TouchableOpacity onPress={this.DriverSelect}>

<View>
<LinearGradient
colors={[this.state.drivercolor1,this.state.drivercolor2,this.state.drivercolor3]}  start={{x: 0, y: 0}} end={{x: 1, y: 0}}  style={{width:'100%',borderColor:'#d7dee8',backgroundColor:'#fff', justifyContent:"center",borderLeftWidth:1,borderRightWidth:1,borderTopWidth:1}}>

<View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',height: 50,padding:10,paddingLeft:50,paddingRight:50}}>

<Text style={{color:this.state.drivertextcolor,fontFamily:'Exo2-Regular'}}>Drivers's License</Text>
<Image  style={{width: 30, height: 30,resizeMode:'contain',tintColor:this.state.driverTintcolor}}  source={require("../assets/driver.png")} ></Image>

</View>
</LinearGradient>
</View> 

</TouchableOpacity>
</View>   

</View>   
   <View style={{marginBottom:0}} >
 <TouchableOpacity onPress={this.BeginAction}>  
 <View>
 <LinearGradient colors={['#41d99c','#34ddb2','#21e4d3']} start={{x: 0, y: 0}} end={{x: 1, y: 0}}  style={{padding:15,justifyContent:'center',alignItems:'center',}}>

<Text style={{color:'#fff',fontSize:20,fontFamily:'Poppins-Medium'}}>Start</Text>
</LinearGradient>
 </View>     
 </TouchableOpacity> 
 <LinearGradient colors={['#354e91','#354e91','#354e91']}  style={{padding:15,alignItems:'center'}}>
<TouchableOpacity>
<Text style={{color:'#fff',opacity:1,fontSize:11,marginTop:2,fontFamily:'Exo2-Regular'}}>when you create a wallet,you accept</Text>
<View style={{flexDirection:'row',marginTop:2,}}>
<Text style={{color:'#5496ff',opacity:1,fontSize:11,marginTop:5,fontFamily:'Exo2-SemiBold'}}>Terms of Service</Text>
<Text style={{color:'#fff',opacity:1,fontSize:11,marginTop:5,marginLeft:8,fontFamily:'Exo2-Regular'}}>&</Text>
<Text style={{color:'#5496ff',opacity:1,fontSize:11,marginTop:5,marginLeft:8,fontFamily:'Exo2-SemiBold'}}>Politic and privacy</Text>
</View>

</TouchableOpacity>
</LinearGradient>
        </View>  
</View>  
     </View>
</LinearGradient> 
     </ScrollView>
     </View>
    
    
    );
      }
      clickedItemText=(item)=>
      {
          Alert.alert(item.Status)
      }
      BeginAction=()=>
      {
        let photoupload;

        if(this.state.passportcolor1!='#4476d7'&&this.state.idcolor1!='#4476d7'&&this.state.residencegradientcolor1!='#4476d7'&&this.state.drivercolor1!='#4476d7')
        {
          Alert.alert('Alert','Please Upload any one Document')
        }
        else
        {
          if(this.state.passportcolor1=='#4476d7')
          {
            photoupload='Passport'
          }
          else if(this.state.idcolor1=='#4476d7')
          {
            photoupload='idcard'
          }
          else if(this.state.residencegradientcolor1=='#4476d7')
          {
            photoupload='residence'
          }
          else if(this.state.drivercolor1=='#4476d7')
          {
            photoupload='license'
          }
         
          this.props.navigation.navigate('TakePhoto',{photoUpload:photoupload});
        }
       
      }
      PassPortSelect=()=>{
      this.setState({
     passporttextcolor:'#fff',
     passportcolor1:'#4476d7',passportcolor2:'#4f92e9',passportcolor3:'#61bff2',
     PassportTintcolor:'#fff',
      })
      this.Idreset()
        this.Residencereset()
        this.Driverreset()
      }
      PassPortreset=()=>{
        this.setState({
       passporttextcolor:'#5496ff',
       passportcolor1:'#fff',passportcolor2:'#fff',passportcolor3:'#fff',
       PassportTintcolor:'#5496ff',
        })
      
        }

        IdSelect=()=>{
          this.setState({
            idtextcolor:'#fff',
        idcolor1:'#4476d7',idcolor2:'#4f92e9',idcolor3:'#61bff2',
         idTintcolor:'#fff',
          })
          this.PassPortreset()
          this.Residencereset()
          this.Driverreset()
          }
          Idreset=()=>{
            this.setState({
              idtextcolor:'#5496ff',
              idcolor1:'#fff',idcolor2:'#fff',idcolor3:'#fff',
               idTintcolor:'#354E91',
            })
            }


            ResidenceSelect=()=>{
              this.setState({
           Residencecolor:'#fff',
            residencegradientcolor1:'#4476d7',residencegradientcolor2:'#4f92e9',residencegradientcolor3:'#61bff2',
             residenceTintcolor:'#fff',
              })
              this.Idreset()
              this.PassPortreset()
              this.Driverreset()
              }
              Residencereset=()=>{
                this.setState({
                  Residencecolor:'#5496ff',
                  residencegradientcolor1:'#fff',residencegradientcolor2:'#fff',residencegradientcolor3:'#fff',
                   residenceTintcolor:'#41DA9C',
                })
                }
                DriverSelect=()=>{
                  this.setState({
                 drivertextcolor:'#fff',
                drivercolor1:'#4476d7',drivercolor2:'#4f92e9',drivercolor3:'#61bff2',
                 driverTintcolor:'#fff',
                  })
                  this.Idreset()
                  this.Residencereset()
                  this.PassPortreset()
                  }
                  Driverreset=()=>{
                    this.setState({
                      drivertextcolor:'#5496ff',
                      drivercolor1:'#fff',drivercolor2:'#fff',drivercolor3:'#fff',
                       driverTintcolor:'#5496FF',
                    })
                    }
}



const styles = StyleSheet.create({
 
  Maincontainers: {
    flex: 1, 
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