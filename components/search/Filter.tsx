import { View, Text, FlatList, TouchableOpacity, Platform } from 'react-native'
import React, { useState } from 'react'
import { Category, RootStackParamList } from '@/type'
import { RouteProp, useNavigation, useRoute,  } from '@react-navigation/native'
import {NativeStackNavigationProp} from '@react-navigation/native-stack'
type SearchRouteProp = RouteProp<RootStackParamList,'Filter'>;
type SerachNavProp = NativeStackNavigationProp<RootStackParamList,'Filter'>
const Filter = ({categories}:{categories : Category[]}) => {
    const route = useRoute<SearchRouteProp>()
    const navigation = useNavigation<SerachNavProp>();
    const searchParams = route.params ?? {};
    console.log("Search params " ,searchParams?.category);
    console.log("Search params categories" ,searchParams);
    const [active,setActive] = useState((searchParams.category ?? "") || '');
    
    const handlepress = (id : string) =>{
        setActive(id);
        if(id === 'all') navigation.setParams({category : undefined});
        else navigation.setParams({category : id})
    }

    const filterData : (Category | {$id : string , name : string})[] = categories 
        ? [{$id : 'all' , name : 'All'}, ...categories]
        : [{$id : 'all', name : 'All'}];
    // console.log("fileter data is ",filterData)

  return (
    <FlatList 
        data = {filterData}
        style={{paddingBottom : 10}}
        keyExtractor={(item : any) => item.$id}
        renderItem={({item}:{item : any}) => (
            <TouchableOpacity key={item.$id} 
                            style={[active === item.$id ? {backgroundColor : '#FE8C00'}: {backgroundColor : '#ffffff'},
                                   Platform.OS==='android' ? {elevation : 5,shadowColor : '#878787'}:{},{padding : 10,borderRadius : 20}]}
                            onPress={() => handlepress(item.$id)}
                            >
                <Text style={active===item.$id ? {color : "#ffffff"} : {color : '#878787'}}>{item.name}</Text>
            </TouchableOpacity>
        )}
        horizontal 
        showsHorizontalScrollIndicator = {false}
        contentContainerStyle = {{gap : 20,paddingHorizontal : 10}}
    />
  )
}

export default Filter