import React from 'react'
import { Alert, Dimensions, Image, ImageBackground, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native'
import CustomInput from '@/components/Input/CustomInput'
import CustomButton from '@/components/Button/CustomButton'
import { useNavigation } from '@react-navigation/native'
import TopSection from '@/components/AuthPage/TopSection'
import * as Sentry from '@sentry/react-native'
import { signIn } from '@/lib/appwrite'
import useAuthStore from '@/store/auth.store'
function SignIn() {
    const {isAuthenticated,setIsAuthenticated} = useAuthStore();
    const navigation = useNavigation<any>();
    //if(isAuthenticated) navigation.replace("tabs", { screen: "Home" })
    const [form, setForm] = React.useState({
        email: '',
        password: ''
    });
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const submit = async () => {
        const {email,password} = form;
        if (isSubmitting) return;
        if (!form.email || !form.password) {
            alert("Please fill all the fields");
            return;
        }
        setIsSubmitting(true);
        try {
            const result = await signIn({email,password});
            if(!result) {
                Alert.alert("Error","try again");
                return;
            }
            setIsAuthenticated(true);
        } catch (error:any) {
            Sentry.captureEvent(error);
            console.log(error);
        } finally {
            setIsSubmitting(false);
        }
    }
    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ backgroundColor: '#ffffff', flex: 1 }}>
            <ScrollView style={{}} keyboardShouldPersistTaps="handled">
                <TopSection />
                <View style={{ padding: 15, gap: 20 }}>
                    <CustomInput
                        placeholder='Enter your email'
                        value={form.email}
                        onChangeText={(text) => { setForm({ ...form, email: text }) }}
                        label='Email'
                        keyboardType='email-address'
                    />

                    <CustomInput
                        placeholder='Enter your password'
                        value={form.password}
                        onChangeText={(text) => (setForm({ ...form, password: text }))}
                        label='Password'
                        secureTextEntry={true}
                    />

                    <CustomButton title='Signin' onPress={submit} isLoading={isSubmitting} />
                </View>
                <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 5, marginTop: 10 }}>
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