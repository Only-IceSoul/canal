

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

const progressInterpolate = proc(
    (
      value,
      origin,
      destination
    ) => add(origin, multiply(value, sub(destination, origin)))
  )  
  
  
const rProgressInterpolate = proc(
  (
    value,
    origin,
    destination
  ) => add(origin, multiply(sub(new Value(1),value), sub(destination, origin)))
)  
  

const onGestureEventListener = (  nativeEvent ) => {
  const gestureEvent =  event([{ nativeEvent }]);
  return ({
    onHandlerStateChange: gestureEvent,
    onGestureEvent: gestureEvent,
  })
}
 



  export {
      progressInterpolate,
      rProgressInterpolate
  }