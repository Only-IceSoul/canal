import React from "react";
import { Constructor, NativeMethods, ViewProps } from "react-native";

type ColorType = number | string;

interface ShadowProps {
    shadow?: ColorType
    shadowOpacity?: number
    shadowRadius?:number
    shadowOffset?:number
    shadowOffsetX?:number
    shadowOffsetY?:number
    shadowPercentageValue?:boolean
    shadowRect?:{ x:number,y:number,w:number,h:number, units:'userSpaceOnUse' | 'objectBoundingBox'} //web
 
}

interface CommonFillProps {
    fill?:ColorType
    fillRule?: 'evenodd' | 'nonzero'
    fillOpacity?:number
}

interface CommonStrokeProps {
    stroke?: ColorType
    strokeOpacity?:number
    strokeWidth?:number
    strokeStart?:number
    strokeEnd?:number
    dashArray?:number
    dashClipValue?:number  // WHEN strokeStart > 0 && strokeEnd < 1 useful with cap round
    strokeCap?:'butt' | 'round' | 'square'
    strokeJoin?: 'bevel' | 'miter' | 'round'
    strokeMiter?:number
}



interface CommonPathProps extends CommonFillProps , CommonStrokeProps {
}

interface CommonTransformProps extends BaseSvgProps {
    mask?:string
    opacity?:number
    translateZ?:number

    transX?:number
    transY?:number
    transPercentageValue?:boolean
    
    rot?:number
    rotO?:number
    rotOx?:number
    rotOy?:number
    rotPercentageValue?:boolean

    sc?:number
    scX?:number
    scY?:number
    scO?:number
    scOx?:number
    scOy?:number
    scPercentageValue?:boolean

}

interface BaseSvgProps {
    animatedProps?:any
    painterKey?:string
    viewBox?:number[] 
    aspect?: 'meet' | 'slice' | 'none'
    align?:'xMinYMin'|
    'xMidYMin' |
    'xMaxYMin' |
    'xMinYMid' |
    'xMidYMid' |
    'xMaxYMid' |
    'xMinYMax' |
    'xMidYMax' |
    'xMaxYMax' |
    'none'
}

interface LayoutProps{
    x?:number
    y?:number
    w?:number
    h?:number
}

interface PainterProps extends ViewProps ,BaseSvgProps {
 
}

interface CommonProps extends ShadowProps, CommonPathProps ,CommonTransformProps {}
interface CommonGroupProps extends CommonTransformProps {
    fillRule?: 'evenodd' | 'nonzero'
    fillOpacity?:number
}

interface LineProps extends CommonProps , ViewProps{
    x1?:number
    y1?:number
    x2?:number
    y2?:number
}

interface TextProps extends CommonProps , ViewProps{
    x?:number
    y?:number
    text?:string
    fontSize?:number
    fontStyle?:'normal' | 'bold' | 'italic'
    font?: 'default' | string
    baseline?:'ascender' | 'middle' | 'descender' | 'none'  | 'center' | 'capHeight'
    textAnchor?:string
    verticalOffset?:number
    horizontalOffset?:number

}

interface CircleProps extends CommonProps , ViewProps{
    cx?:number
    cy?:number
    r?:number
}

interface PathProps extends CommonProps , ViewProps{ d?:string  }
interface GProps extends CommonGroupProps , ViewProps{}
interface RectProps extends CommonProps , ViewProps,LayoutProps{
    rtl?:number
    rtr?:number
    rbr?:number
    rbl?:number
}
interface MaskProps extends ViewProps{
    name:string
}
interface MaskGProps extends CommonGroupProps , ViewProps{

}
interface EllipseProps extends CommonProps , ViewProps{
    cx?:number
    cy?:number
    rx?:number
    ry?:number
}

interface CustomViewProps extends LayoutProps, CommonTransformProps {}

interface GradientProps extends CustomViewProps {
    positions?:number[]
    colors?: ColorType[]
}

interface LinearGradientProps extends GradientProps,  ViewProps{
    startPoint?:{ x:number,y:number }
    endPoint?:{ x:number,y:number }
}

interface RadialGradientProps extends GradientProps,  ViewProps{
    cx?:number
    cy?:number
    rx?:number
    ry?:number
}
interface ImageProps extends  ViewProps,CustomViewProps,ShadowProps{
    source?:string
    // clipToBounds?:boolean
    fill?:ColorType
    aspectImage?: 'meet' | 'slice' | 'none'
    alignImage?:'xMinYMin'|
    'xMidYMin' |
    'xMaxYMin' |
    'xMinYMid' |
    'xMidYMid' |
    'xMaxYMid' |
    'xMinYMax' |
    'xMidYMax' |
    'xMaxYMax' |
    'none'
 
}


declare class ImageComponent extends React.Component<ImageProps> {}
declare const ImageBase: Constructor<NativeMethods> & typeof ImageComponent;

declare class RadialGradientComponent extends React.Component<RadialGradientProps> {}
declare const RadialGradientBase: Constructor<NativeMethods> & typeof RadialGradientComponent;

declare class LinearGradientComponent extends React.Component<LinearGradientProps> {}
declare const LinearGradientBase: Constructor<NativeMethods> & typeof LinearGradientComponent;


declare class EllipseComponent extends React.Component<EllipseProps> {}
declare const EllipseBase: Constructor<NativeMethods> & typeof EllipseComponent;

declare class MaskGComponent extends React.Component<MaskGProps> {}
declare const MaskGBase: Constructor<NativeMethods> & typeof MaskGComponent;

declare class MaskComponent extends React.Component<MaskProps> {}
declare const MaskBase: Constructor<NativeMethods> & typeof MaskComponent;

declare class RectComponent extends React.Component<RectProps> {}
declare const RectBase: Constructor<NativeMethods> & typeof RectComponent;

declare class CircleComponent extends React.Component<CircleProps> {}
declare const CircleBase: Constructor<NativeMethods> & typeof CircleComponent;

declare class TextComponent extends React.Component<TextProps> {}
declare const TextBase: Constructor<NativeMethods> & typeof TextComponent;

declare class LineComponent extends React.Component<LineProps> {}
declare const LineBase: Constructor<NativeMethods> & typeof LineComponent;

declare class PathComponent extends React.Component<PathProps> {}
declare const PathBase: Constructor<NativeMethods> & typeof PathComponent;

declare class GComponent extends React.Component<GProps> {}
declare const GBase: Constructor<NativeMethods> & typeof GComponent;

declare class PainterComponent extends React.Component<PainterProps> {}
declare const PainterBase: Constructor<NativeMethods> & typeof PainterComponent;

namespace AnimatedPainter{
    export class Image extends ImageBase {}
    export class RadialGradient extends RadialGradientBase {}
    export class LinearGradient extends LinearGradientBase {}
    export class Ellipse extends EllipseBase {}
    export class MaskG extends MaskGBase {}
    export class Rect extends RectBase {}
    export class Circle extends CircleBase {}
    export class Text extends TextBase {}
    export class Line extends LineBase {}
    export class Path extends PathBase {}
    export class G extends GBase {}
    export class GS extends GBase {}
    export class GH extends GBase {}
    export const getAnimatedProps: <T>(web:T,mobile:any) => [T, React.Dispatch<React.SetStateAction<T>> | undefined]
}



export default AnimatedPainter;


export const Image : typeof AnimatedPainter.Image
export const RadialGradient : typeof AnimatedPainter.RadialGradient
export const LinearGradient : typeof AnimatedPainter.LinearGradient
export const Ellipse : typeof AnimatedPainter.Ellipse
export const MaskG : typeof AnimatedPainter.MaskG
export const Rect : typeof AnimatedPainter.Rect
export const Circle : typeof AnimatedPainter.Circle
export const Text : typeof AnimatedPainter.Text
export const Line : typeof AnimatedPainter.Line
export const Path : typeof AnimatedPainter.Path
export const G : typeof AnimatedPainter.G
export const GS : typeof AnimatedPainter.GS
export const GH : typeof AnimatedPainter.GH
export const getAnimatedProps : typeof AnimatedPainter.getAnimatedProps
