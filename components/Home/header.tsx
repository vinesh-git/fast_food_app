import { View,Text,TouchableOpacity,Image } from "react-native";
import down from '../../assets/images/down.png';
import FoodCart from "./foodCart";

export default function Header() {
    return (
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 10,marginTop : 10, paddingVertical: 5 }}>
            <View>
                <Text style={{ color: 'E8C00', fontSize: 12, fontWeight: 700 }}>Deliver To</Text>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 2, marginTop: 3 }}>
                    <Text>Croatia</Text>
                    <Image source={down} />
                </TouchableOpacity>
            </View>
            <FoodCart />
        </View>
    )
}