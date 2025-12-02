import { View, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import searchBarIcon from '../../assets/images/searchBarIcon.png'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '@/type'
type paramsType = RouteProp<RootStackParamList,'Search'>
type navType = NativeStackNavigationProp<RootStackParamList,'Search'>
const SearchBar = () => {
    const navigation = useNavigation<navType>()
    const route = useRoute<paramsType>();
    const params = route.params ?? {};
    const [query, setQuery] = useState(params.query);

    const handleSearch = (text: string) => {
        // console.log(text);
        setQuery(text);
        navigation.setParams({query : text});
    }
    return (
        <View style={style.container}>
            <TextInput placeholder='Search'
                style={{flex : 1}}
                value={query}
                onChangeText={handleSearch}
                placeholderTextColor={'#a0a0a0'}
            />
            <TouchableOpacity onPress={() => console.log('search pressed')}>
                <Image source={searchBarIcon} style={style.image} resizeMode='contain' />
            </TouchableOpacity>
        </View>
    )
}

export default SearchBar

const style = StyleSheet.create({
    container : { 
        flex: 1, 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        backgroundColor: '#fffff', 
        shadowOffset: { width: 0, height: 4 }, 
        paddingHorizontal: 10, 
        shadowRadius: 5, 
        borderRadius: 50, 
        borderWidth: 2, 
        borderColor: '#a0a0a0' 
    },
    image : { 
        width: 16, 
        height: 16, 
        tintColor: '#a0a0a0' 
    }
})