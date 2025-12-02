import CustomButton from '@/components/Button/CustomButton'
import { logout } from '@/lib/appwrite'
import useAuthStore from '@/store/auth.store'
import useCartStore from '@/store/cart.store'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Button, FlatList, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const PaymentInfo = ({label,value,labelStyle='#6A6A6A',valueStyle='#181C2E'} : any) =>{
    return(
        <View style={{flex : 1,flexDirection : 'row',justifyContent : 'space-between'}}>
            <Text style={{color : labelStyle , fontWeight:500, fontSize : 16}}>{label}</Text>
            <Text style={{color : valueStyle, fontWeight : 700, fontSize : 16}}>{value}</Text>
        </View>
    )
}

function Cart() {
    const { items, getTotalItems,getTotalPrice } = useCartStore();
    console.log(items);
    const totalItems = getTotalItems();
    const totalPrice = getTotalPrice();
    return (
        <SafeAreaView style={{backgroundColor : '#ffffff', flex : 1}}>
            <FlatList
                data={items}
                renderItem={({ item }) => <Text>{item.name}</Text>}
                ListFooterComponent={() =>  (
                    <View style={{gap : 10,padding : 10}}>
                        <View style={{borderWidth : 1, borderColor : '#EDEDED', padding : 20,gap : 10,backgroundColor : '#EDEDED'}}>
                            <Text style ={{color : '#181C2E', fontSize : 20, fontWeight : 700}}>Payment Summary</Text>
                            <PaymentInfo label={"Total Items"} value={"$900"} />
                            <PaymentInfo label={"Delivery Fee"} value={`$5.00`} />
                            <PaymentInfo label={"Discount"} value={`-$0.50`} valueStyle={'#2F9B65'}/>
                            <View style={{borderWidth : 1,width : '100%',marginVertical : 10,borderColor : '#EDEDED'}}/>
                            <PaymentInfo label={"Total"} value={`$${totalPrice-5+0.5}`} />
                        </View>
                        <CustomButton title='Order Now'/>
                    </View>
                )}
            />

        </SafeAreaView>
    )
}

export default Cart