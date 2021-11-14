import ReCircle from "./src/ReCircle";
import ReEllipse from "./src/ReEllipse";
import ReG from "./src/ReG";
import ReGH from "./src/ReGH";
import ReGS from "./src/ReGS";
import ReImage from "./src/ReImage";
import ReLine from "./src/ReLine";
import ReLinearGradient from "./src/ReLinearGradient";
import ReMaskG from "./src/ReMaskG";
import RePath from "./src/RePath";
import ReRadialGradient from "./src/ReRadialGradient";
import ReRect from "./src/ReRect";
import ReText from './src/ReText'
import animatedProps from "./src/PainterHelper";

const AnimatedPainter =  { 
    Circle: ReCircle,
    Ellipse:ReEllipse,
    G:ReG,
    GH:ReGH,
    GS:ReGS,
    Image:ReImage,
    Line:ReLine,
    LinearGradient:ReLinearGradient,
    MaskG:ReMaskG,
    Path:RePath,
    RadialGradient:ReRadialGradient,
    Rect:ReRect,
    Text:ReText,
    getAnimatedProps:animatedProps
}

export const Circle = ReCircle
export const Ellipse = ReEllipse
export const G = ReG
export const GH =ReGH
export const GS = ReGS
export const Image = ReImage
export const Line = ReLine
export const LinearGradient = ReLinearGradient
export const MaskG = ReMaskG
export const Path = RePath
export const RadialGradient = ReRadialGradient
export const Rect = ReRect
export const Text = ReText
export const getAnimatedProps = animatedProps
export default AnimatedPainter
