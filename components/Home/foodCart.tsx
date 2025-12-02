import useCartStore from "@/store/cart.store";
import { useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import bag from '../../assets/images/bag.png';
function FoodCart() {
    const navigation = useNavigation<any>();
    const {getTotalItems} = useCartStore();
    const totalItems = getTotalItems();
    return (
        <TouchableOpacity onPress={()=> navigation.navigate('Cart')}>
            <View style={style.container}>
                {totalItems > 0 && (<Text style={style.items}>{totalItems}</Text>)}
                <Image source={bag} />
            </View>
        </TouchableOpacity>
    )
}

export default FoodCart

const style = StyleSheet.create({
    container: { 
        height: 40, 
        width: 40, 
        borderRadius: 50, 
        backgroundColor: "#000000", 
        justifyContent: "center", 
        alignItems: "center" 
    },
    items : { 
        position: 'absolute', 
        color: '#ffffff', 
        backgroundColor: '#FF7622', 
        borderRadius: 10, 
        minWidth : 20,
        top: -7, 
        right: -1, 
        textAlign: 'center' 
    }
})