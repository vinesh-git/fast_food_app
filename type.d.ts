import { ImageSourcePropType, ViewStyle } from "react-native"

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

interface CreateUserParams{
    name : string,
    email : string,
    password : string
}

interface SignInParams{
    email : string,
    password : string
}

interface TabProps{
    focused : boolean,
    title : string,
    icon : ImageSourcePropType
}

interface GetMenuParams {
    category?: string;
    query?: string;
    limit? : number
}

interface MenuItem {
    name : string,
    price : number,
    url : string,
    description : string,
    calories : number,
    protein : number,
    rating : number,
    type : string,
}

interface Category{
    name : string,
    description : string
}

export type RootStackParamList = {
  Filter : {
    category? : string,
    query? : string
  }  | undefined,

  Search : {
    query? : string
  }
}