import { View,Image, Text, Dimensions, ImageBackground } from 'react-native'
import React from 'react'
import header from '../../assets/images/headerpart.png'
import headerlogo from '../../assets/images/headerlogo.png'
const TopSection = () => {
    return (
        <View style={{ height: Dimensions.get('screen').height / 2.25, position: 'relative' }}>
            <ImageBackground source={header} resizeMode='stretch' style={{ width: '100%', height: '95%' }} imageStyle={{ borderRadius: 10 }} />
            <Image source={headerlogo} resizeMode='contain'
                style={{ zIndex: 7, position: 'absolute', bottom: -15, height: 200, width: 200, alignSelf: 'center' }} />
        </View>
    )
}

export default TopSection