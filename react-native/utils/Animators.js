
import Animated , { Easing }from "react-native-reanimated"
const {  Clock,
  Value,
  event,
  set,
  add,
  multiply,
  cond,
  block,
  startClock,
  clockRunning,
  stopClock,
  eq,
  debug,
  abs,
  sub,
  not,
  diff,
  lessThan,
  greaterThan,
  useCode,
  neq,
  timing,
  divide,
  modulo,
  proc,
}  = Animated

const progressAnimator = (
    toValue,
    duration = 250,  
    easing = Easing.linear
  ) => {
    const clock = new Clock()
    const state = {
      finished:  new Value(0),
      frameTime: new  Value(0),
      position:  new Value(0),
      time: new Value(0),
    }
    const config = {
      toValue:  new Value(0),
      duration: duration,
      easing: Easing.linear,
    }
    return block([
        startClock(clock),
        cond(neq(config.toValue, toValue), [
          set(state.frameTime, 0),
          set(state.time, 0),
          set(state.finished, 0),
          set(config.toValue, toValue),
        ]),
      timing(clock, state, config) ,
      cond(eq(state.finished,1),stopClock(clock))
    ,
      state.position,
    ])
  }

  export  {
    progressAnimator   
  }