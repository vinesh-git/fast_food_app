import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'
import { CustomButtonProps } from '@/type'

const CustomButton = ({
    onPress,
    title = "click me",
    style,
    textstyle,
    leftIcon,
    isLoading = false
}: CustomButtonProps) => {
    return (
        <TouchableOpacity onPress={onPress} style={[style, {flex: 1,alignSelf : 'center', flexDirection: 'row', justifyContent: 'center', backgroundColor: '#fe8c00', padding: 10, borderRadius: 50,marginVertical : 10}]}>
            {leftIcon}
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                {isLoading ?
                    (<ActivityIndicator size={'small'} color={'white'} />)
                    : (<Text style={[textstyle, { color: 'white',fontWeight:600 }]}>{title}</Text>)
                }

            </View>

        </TouchableOpacity>
    )
}

export default CustomButton