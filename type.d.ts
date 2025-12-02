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
    $id : string,
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

interface CartCustomization{
    $id : string,
    name : string,
    price : number,
    type : string
}

interface CartItemType{
    $id : string,
    name : string,
    quantity : number,
    image_url : string,
    price : number,
    customizations? : CartCustomization[]
}

interface CartStore{
    items : CartItemType[],
    addItem : (item : Omit<CartItemType,"quantity">)=> void,
    removeItem : (id : string,customizations : CartCustomization[])=>void,
    increaseQty : (id : string,customizations : CartCustomization[]) => void,
    decreaseQty : (id : string,customizations : CartCustomization[])=>void ,
    clearCart : ()=>void,
    getTotalItems : ()=> number,
    getTotalPrice : ()=> number
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