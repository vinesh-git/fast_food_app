import { ViewStyle } from "react-native"

interface CustomInputProps {
    placeholder? : string,
    value? : string,
    onChangeText? : (text : string)=>void,
    label: string,
    secureTextEntry?:boolean,
    keyboardType?: "default" | "email-address" | "numeric" | "phone-pad" 
}

interface CustomButtonProps{
    onPress?:()=>void,
    title?: string,
    style?: ViewStyle,
    textstyle?:TextStyle,
    leftIcon? : React.ReactNode,
    isLoading? : boolean
}