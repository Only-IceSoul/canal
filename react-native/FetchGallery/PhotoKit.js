
import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  View,
  AppState,
  FlatList,
  Dimensions,
  Text
} from 'react-native';

import { PhotoKit, Image } from 'react-native-jjkit'
import {TapGestureHandler, State } from 'react-native-gesture-handler'
import Preview from './Preview'

const ITEM_HEIGHT = Dimensions.get("window").width / 3
class App extends Component {

   constructor(props){
     super(props)

     this.state = {
       appState : AppState.currentState,
       showButton: false,
       items: null,
       image64 : null
     }

     this.albums = []
     this.medias = []
     this.renderItem = this.renderItem.bind(this)
     this.fetchGallery = this.fetchGallery.bind(this)
     this.requestPermission = this.requestPermission.bind(this)
     this.handleAppStateChange = this.handleAppStateChange.bind(this)
     this.checkPermissionAndUpdate = this.checkPermissionAndUpdate.bind(this)
     this.makeUnique = this.makeUnique.bind(this)
   }

  componentDidMount(){
    this.checkPermissionAndUpdate()
     AppState.addEventListener('change', this.handleAppStateChange);
  }
 
  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  //android
  handleAppStateChange(nextAppState){
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
       //resume
       this.checkPermissionAndUpdate()
    }
    if(this.state.appState === 'active' && nextAppState.match(/inactive|background/)){
      //pause
    }
    this.setState({appState: nextAppState})
  }
 
  checkPermissionAndUpdate(){
    PhotoKit.isPermissionGranted().then((result) => {
          if(result){
            this.fetchGallery()
          }else {
            this.setState({
              showButton: true
            })
          }
    })

  }

  requestPermission({nativeEvent}){
    if(nativeEvent.state == State.ACTIVE){
          PhotoKit.requestPermission().then(re => {
                  switch (re){
                    case 1: //authorized
                      this.fetchGallery()
                      break;
                    case 2: //denied
                      alert("Permission is denied ")
                      break;
                  }
            })
      }
  }

  fetchGallery(){
    this.setState({
      showButton: false,
    })
        if(this.medias.length > 0){
          this.makeUnique()
      }else{
            PhotoKit.fetch(PhotoKit.all).then(res => {
                if (res != null){
                    this.albums = res[0]
                    this.medias  = res[1]
                    this.makeUnique()
                }else{
                   alert("error fecthing gallery")
                }
               
            })
        }
  }

  makeUnique(){
      var seen = []
      var unique = []
      this.medias.forEach( e => {
        if (e.displayName != null && !seen.includes(e.displayName)) {
            unique.push(e)
            seen.push(e.displayName)
        }
      })
      this.setState({
        items: unique
      })
  }

  renderItem({ item, index }){

   return (
     <TapGestureHandler 
          maxDurationMs={300} 
          onHandlerStateChange={({nativeEvent})=>{
          if(nativeEvent.state == State.ACTIVE){
                let request = {
                  uri: item.uri,
                  width: 500,  
                  height: 500,  
                  quality : 0.8, 
                  format : PhotoKit.jpeg  
              }
              
              PhotoKit.requestImage(request).then(base64String => {
                  this.setState({
                    image64: base64String
                  })
              })
          
          }
     }} >
         <Image style={styles.cell} data={{ url: item.uri, width: 200, height: 200, cache: true, asGif: false }}  />
     </TapGestureHandler>
   
    ) }

  render(){
    return (
      <>
        <StatusBar backgroundColor={"#7936d9"} />
        <SafeAreaView style={{flex:1}}>
          { this.state.items
          
          ?
     
          <FlatList style={styles.list}
                    data={this.state.items}
                    numColumns={3}
                    keyExtractor={item => item.uri}
                    renderItem={this.renderItem}
                    removeClippedSubviews={false}
                    getItemLayout={(data, index) => (
                      {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
                    )}
            
                  />

          :
          null
        }
        { this.state.showButton ? 
          <View style={styles.buttonContainer} >
              <TapGestureHandler 
              onHandlerStateChange={this.requestPermission}
              maxDurationMs={300} 
              maxDist={200
              }>
                    <View style={styles.button}>
                      <Text style={styles.text}>Request Permission</Text>
                    </View>
              </TapGestureHandler>
          </View>
          : 
          null

        }
  
        { this.state.image64 ? 
            <Preview style={styles.preview} image={this.state.image64} 
              close={()=>{ 
                this.setState({ image64: null }) 
              }}  /> 
              : null
        }

         
        </SafeAreaView>
      </>
    );
  }
};

const styles = StyleSheet.create({
  list:{
    flex:1,
     backgroundColor: 'white'
  },
  preview:{
    position: 'absolute' ,
    backgroundColor: '#ccc',
    width:'100%', 
    height: '100%' ,
     left: 0,
      top: 0
  },
  image: {
    backgroundColor: 'red',
    width: 100,
    height: 100,
    
    
  },
  cell:  {
    width: ITEM_HEIGHT,
    height: ITEM_HEIGHT,

   },
   buttonContainer: {
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    width:200,
    height:50 ,
    backgroundColor: '#7936d9',
    justifyContent:'center',
    alignItems:'center'
  },  
  text: {
    fontSize: 15,
    fontFamily: 'helvetica',
    color:'white'
  
  },
  
});

export default App;
