import React from 'react'
import { Dimensions, Image, ImageBackground, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native'
import header from '../../assets/images/headerpart.png'
import headerlogo from '../../assets/images/headerlogo.png'
import CustomInput from '@/components/Input/CustomInput'
import CustomButton from '@/components/Button/CustomButton'
import { Link, useNavigation } from '@react-navigation/native'
import signUp from './signUp'
import TopSection from '@/components/AuthPage/TopSection'
function SignIn() {
    const navigation = useNavigation<any>();
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ backgroundColor: '#ffffff', flex: 1 }}>
            <ScrollView style={{}} keyboardShouldPersistTaps="handled">
                <TopSection />
                <View style={{ padding: 15, gap: 20 }}>
                    <CustomInput
                        placeholder='Enter your email'
                        value=''
                        onChangeText={(text) => { }}
                        label='Email'
                        keyboardType='email-address'
                    />

                    <CustomInput
                        placeholder='Enter your password'
                        value=''
                        onChangeText={(text) => { }}
                        label='Password'
                        keyboardType='email-address'
                        secureTextEntry={true}
                    />

                    <CustomButton />
                </View>
                <View style={{ alignItems: 'center',flexDirection : 'row',justifyContent : 'center',gap:5,marginTop : 10 }}>
                    <Text>
                        Don't have an account?
                    </Text>
                    <Pressable onPress={() => navigation.navigate("Signup")}>
                        <Text style={{ color: "#fe8c00", fontWeight: 800 }}>Sign UP</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default SignIn