import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { MenuItem } from '@/type'
import { appwriteConfig } from '@/lib/appwrite'
import useCartStore from '@/store/cart.store'

const MenuCard = ({ item }: { item: MenuItem }) => {
    const image_url = `${item.url}?project=${appwriteConfig.projectId}`;
    const {addItem} = useCartStore();
    return (
        <TouchableOpacity style={style.container}>
            <Image source={{ uri: image_url }} style={style.image} resizeMode='contain' />
            <Text style={style.nameText} numberOfLines={1}>{item.name}</Text>
            <Text style={style.priceText}>From ${item.price}</Text>
            <TouchableOpacity onPress={() => addItem({$id : item.$id,name : item.name,price : item.price, customizations : [],image_url : item.url})}>
                <Text style={style.addToCart}>Add to cart +</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

export default MenuCard

export const style = StyleSheet.create({
    container: {
        position: 'relative',
        paddingVertical: 20,
        paddingHorizontal: 20,
        alignItems: 'center',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
        borderRadius: 30,
        elevation: 8,
        backgroundColor: '#ffffff',
        flex:1,
        justifyContent : 'flex-end',
        width : 180,
        minHeight : 190
    },
    image: {
        width: 118,
        height: 107,
        position : 'absolute',
        top : -30,
        marginBottom : 10
    },
    addToCart : { 
        textAlign: 'center', 
        marginBottom: 5, 
        fontWeight: 800, 
        color: '#FE8C00' 
    },
    priceText : { 
        textAlign: 'center', 
        marginBottom: 5 
    },
    nameText : {
        fontSize : 16,
        fontWeight : 800, 
        textAlign: 'center', 
        marginBottom: 5, 
        marginTop : 10 
    }
})