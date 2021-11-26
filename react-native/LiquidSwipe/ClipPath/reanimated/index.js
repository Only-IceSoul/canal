
import animatedStyle from "./src/ReStyle";
import animatedProps from "./src/ReProps";

import ReClipPath from "./src/ReClipPath";

export const getAnimatedStyle = animatedStyle
export const getAnimatedProps = animatedProps
export const ClipPath = ReClipPath

const AnimatedHelper ={

    getAnimatedProps: animatedProps,
    getAnimatedStyle: animatedStyle,
    ClipPath : ReClipPath
}

export default AnimatedHelper