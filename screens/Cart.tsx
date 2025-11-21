import { logout } from '@/lib/appwrite'
import useAuthStore from '@/store/auth.store'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Button, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

function Cart() {
    
    return (
        <SafeAreaView>
            <Text>Cart</Text>
            
        </SafeAreaView>
    )
}

export default Cart