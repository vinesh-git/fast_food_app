import useCartStore from "@/store/cart.store";
import { CartItemType } from "@/type";
import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import deleteIcon from "../../assets/images/deleteIcon.png";
import minus from "../../assets/images/minus.png";
import plus from "../../assets/images/plus.png";

const CartItem = ({ item }: { item: CartItemType }) => {
    const { $id, name, quantity, image_url, price, customizations } = item;
    const { increaseQty, decreaseQty, removeItem } = useCartStore();
    return (
        <View style={style.cartcontainer}>
            <Image
                source={{ uri: image_url }}
                style={{ width: 60, height: 60 }}
                resizeMode="contain"
            />
            <View style={{ gap: 5, flex: 1 }}>
                <Text style={{ fontSize: 16, fontWeight: 700 }}>{name}</Text>
                <Text style={{ fontSize: 16, fontWeight: 700, color: "#FE8C00" }}>
                    {price}
                </Text>
                <View style={style.flexContainer}>
                    <View style={style.quantityContainer}>
                        <Pressable onPress={() => decreaseQty($id, [])}>
                            <Image
                                source={minus}
                                resizeMode="contain"
                                style={{ width: 12, height: 12 }}
                            />
                        </Pressable>
                        <Text>{quantity}</Text>
                        <Pressable onPress={() => increaseQty($id, [])}>
                            <Image
                                source={plus}
                                resizeMode="contain"
                                style={{ width: 12, height: 12 }}
                            />
                        </Pressable>
                    </View>
                    <Pressable onPress={() => removeItem($id, [])}>
                        <Image
                            source={deleteIcon}
                            style={{ width: 15, height: 15 }}
                            resizeMode="contain"
                        />
                    </Pressable>
                </View>
            </View>
        </View>
    );
};

export default CartItem;

const style = StyleSheet.create({
    cartcontainer: {
        flex: 1,
        flexDirection: "row",
        padding: 10,
        margin: 10,
        borderRadius: 10,
        gap: 10,
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#EDEDED",
    },
    flexContainer: {
        width: 'auto',
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    quantityContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: 15,
    }
})
