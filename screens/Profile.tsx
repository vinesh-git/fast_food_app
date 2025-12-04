import CustomButton from '@/components/Button/CustomButton';
import { logout } from '@/lib/appwrite';
import seed from '@/lib/seed';
import useAuthStore from '@/store/auth.store';
import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { Alert, Image, ImageProps, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import profile from '../assets/images/name.png'
import email from '../assets/images/email.png'
import alpha from '../assets/images/alpha.png'

type CustomFieldType = {
    label: string,
    value: string,
    icon: ImageProps
}

function CustomField({ label, value, icon }: CustomFieldType) {
    return (
        <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'flex-start', alignItems: 'center' }}>
            <Image source={icon} resizeMode='contain' style={{ width: 48, height: 48 }} />
            <View style={{ gap: 5, justifyContent: 'center', flex: 1, flexDirection: 'column' }}>
                <Text style={{ color: '#6A6A6A', fontSize: 14, fontWeight: 500 }}>{label}</Text>
                <Text style={{ color: '#181C2E', fontSize: 16, fontWeight: 600 }}>{value}</Text>
            </View>
        </View>
    )
}

function Profile() {
    const { setIsAuthenticated } = useAuthStore();
    const { user } = useAuthStore();
    console.log("user is ", user);
    return (
        <SafeAreaView style={{ backgroundColor: '#ffffff', flex: 1 }}>
            <View style={{ gap: 20,alignItems: 'center', flex: 1, justifyContent: 'flex-start', marginTop: 250, marginHorizontal: 10 }}>
                <Image source={alpha} resizeMode='contain' style={{ width: 100, backgroundColor: 'black', height: 100, borderRadius: 50 }} />
                <CustomField icon={profile} label='Full Name' value={user.name} />
                <CustomField icon={email} label='Email' value={user.email} />
                <View style ={{marginTop : 20,height : 60,position : 'absolute', bottom : 100,width : '100%'}}>
                    <CustomButton title='Logout' onPress={async () => {
                        const result = await logout();
                        if (!result) return;
                        setIsAuthenticated(false);
                    }} />
                </View>
            </View>

        </SafeAreaView>
    )
}

export default Profile