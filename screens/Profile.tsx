import { logout } from '@/lib/appwrite';
import seed from '@/lib/seed';
import useAuthStore from '@/store/auth.store';
import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { Alert, Button, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
function Profile() {
    const {setIsAuthenticated} = useAuthStore();
    return (
        <SafeAreaView>
            <Text>Profile</Text>
            <Button title='logout' onPress={async()=> {
                            const result = await logout();
                            if(!result) return;
                            setIsAuthenticated(false);
                            }}/>

        </SafeAreaView>
    )
}

export default Profile