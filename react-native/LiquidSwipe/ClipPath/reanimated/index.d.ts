import React from "react";
import { Constructor, NativeMethods, StyleProp, ViewProps, ViewStyle } from "react-native";
import { ClipPathViewProps } from "react-native-clippathview";

interface AnimatedClipPathWeb{
    animatedProps?: ClipPathViewProps 
}

declare class ClipPathComponent extends React.Component<ClipPathViewProps & AnimatedClipPathWeb> {}
declare const ClipPathViewBase: Constructor<NativeMethods> & typeof ClipPathComponent;


namespace AnimatedHelper{

    export class ClipPath extends ClipPathViewBase {}
    export const getAnimatedStyle: (web:StyleProp<ViewStyle> | undefined,mobile:any) => [any, React.Dispatch<React.SetStateAction<T>> | undefined];
    export const getAnimatedProps: <T>(web:T,mobile:any) => [T, React.Dispatch<React.SetStateAction<T>> | undefined]
}



export default AnimatedHelper;

export class ClipPath extends ClipPathViewBase {}
export const getAnimatedStyle :(web: StyleProp<ViewStyle> | undefined ,mobile:any) => [any, React.Dispatch<React.SetStateAction<T>> | undefined];
export const getAnimatedProps: <T>(web:T,mobile:any) => [T, React.Dispatch<React.SetStateAction<T>> | undefined]
