import React, { Component  } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Animated,
  Easing,
  Text
} from "react-native";
import { PanGestureHandler, State } from 'react-native-gesture-handler'


const paddingRoot = 16
const cardHeight = 250

const cards = [
    {
      key: "Primera",
      price: "100 USD",
      color: "#c966cc",
    },
    {
      key: "Segunda",
      price: "80 USD",
      color: "#ff7566",
    },
    {
      key: "Tercera",
      price: "70 USD",
      color: "#cc666e",
    },
    {
      key: "Cuarta",
      price: "50 USD",
      color: "#c2b563",
    },
    {
      key: "Quinta",
      price: "20 USD",
      color: "#667ecc",
    },
    {
      key: "Sexta",
      price: "10 USD",
      color: "#3da62b",
    },
    {
      key: "Septima",
      price: "5 USD",
      color: "#3f9196",
    }
  ];
  


class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      translationY : new Animated.Value(0)
    }
   
    this.isAnimating = false
    this.lastTranslation = 0
    this.transY = 0
    this.cardTitle = 60
    
    this.handleGesture = this.handleGesture.bind(this)
    this.handleState = this.handleState.bind(this)
    this.transitionToMid = this.transitionToMid.bind(this)
    this.transitionToTop = this.transitionToTop.bind(this)
    this.outExpo = this.outExpo.bind(this)
  }

  handleGesture({ nativeEvent }) {
     const ny = nativeEvent.translationY

     if(ny > 0){
         const dy = ny - this.lastTranslation
         this.lastTranslation = ny
         this.transY += dy

     }else if(ny < 0){
         const dy = ny + (this.lastTranslation * -1)
         this.lastTranslation = ny
         this.transY += dy
     }

     
     if(this.transY <= -cardHeight){
        this.transY = -cardHeight
    }

     this.state.translationY.setValue(this.transY)
   
     
  }

  handleState({ nativeEvent }) {
   
    const state = nativeEvent.state

    if(state == State.BEGAN){
        this.state.translationY.stopAnimation()
        this.state.translationY.removeAllListeners()
     
    }
    if(state == State.END && !this.isAnimating){
        this.lastTranslation = 0
        if(this.transY < -cardHeight/3){
            this.transitionToTop()
        }
        else{
            this.transitionToMid()
        }
    }
  }


  transitionToMid(){
      this.isAnimating = true
      this.state.translationY.addListener( anim => {
        this.transY = anim.value
    })

      Animated.timing(this.state.translationY,{
          toValue: 0,
          duration: 250,
          easing: this.outExpo,
          useNativeDriver: true
      }).start((anim)=> {
          this.isAnimating = false
          if(anim.finished) this.transY = 0
      })
  
  }

  transitionToTop(){
    this.isAnimating = true
    this.state.translationY.addListener( anim => {
        this.transY = anim.value
    })

    Animated.timing(this.state.translationY,{
        toValue: -cardHeight,
        duration: 250,
        easing: Easing.linear,
        useNativeDriver: true
    }).start((anim)=> {
        this.isAnimating = false
        if(anim.finished) this.transY = -cardHeight
    })
  }

  outExpo(fr){
    return -(Math.pow(2, -10 * fr)) + 1
  }

  render(){
    return (
      <SafeAreaView style={styles.root}>

          <PanGestureHandler
             onHandlerStateChange={this.handleState}
             onGestureEvent={this.handleGesture}
          >
               <View style={styles.content}>
                    {cards.map((card, i) => {
                         const startTop = 14 * i
                         var inputRange = [-cardHeight,-(cardHeight * ( (1/cards.length)*i ) ),0,cardHeight*3]
                         var outputRange = [startTop,startTop,this.cardTitle * i,cardHeight*i]

                         if(i == 0){
                            inputRange = [0,cardHeight]    
                            outputRange = [0,0]
                         }

                      const translateY = this.state.translationY.interpolate({
                          inputRange,
                          outputRange
                      })
                    return (
                        <Animated.View
                        key={card.name}
                        style= {{ transform: [{ translateY }]}}
                        >
                            <View  style={styles.card}>
                                <View  style={[styles.cardChild,{ backgroundColor: card.color}]}>
                                    <Text style={styles.textTitle}>{card.price}</Text>
                                </View>
                            </View>

                        </Animated.View>
                    );
                    })}
                </View>
    
                </PanGestureHandler>
      </SafeAreaView>
    );
  }     
}


const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: paddingRoot
  },
  content: {
   flex:1
  },
  card: {
    height: cardHeight,
    width: '100%',
    borderRadius: 10,
    position: 'absolute',
    backgroundColor:'white',
    elevation: 5,
    padding: 2,
  },
  cardChild: {
    flexDirection: 'row',
    borderRadius: 6,
    backgroundColor: '#0C69B4',
    flex: 1,
  },
  textTitle: {
    fontSize: 20,
    color: 'white',
    margin: 10,
    fontFamily: 'helvatica,sans-serif'
  }
});

export default App