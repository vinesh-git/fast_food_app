import { Image, TouchableOpacity, View, Text, StyleSheet } from "react-native";
import bag from '../../assets/images/bag.png'
function FoodCart() {
    const totalItems: number = 5;
    return (
        <TouchableOpacity>
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
        flex: 1, 
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