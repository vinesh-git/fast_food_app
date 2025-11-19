import React from 'react'
import { Dimensions, Image, ImageBackground, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native'
import CustomInput from '@/components/Input/CustomInput'
import CustomButton from '@/components/Button/CustomButton'
import { useNavigation } from '@react-navigation/native'
import TopSection from '@/components/AuthPage/TopSection'
function SignIn() {
    const navigation = useNavigation<any>();
    const [form,setForm] = React.useState({
        email : '',
        password : ''
    });
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const submit = async () => {
        if (isSubmitting) return;
        if(!form.email || !form.password){
            alert("Please fill all the fields");
            return;
        }
        setIsSubmitting(true);
        try {
            //login logic here
            setTimeout(() => {
                navigation.replace("tabs", { screen: "Home" });
            }, 5000);
            
        } catch (error) {
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
                        onChangeText={(text) => { setForm({ ...form , email : text}) }}
                        label='Email'
                        keyboardType='email-address'
                    />

                    <CustomInput
                        placeholder='Enter your password'
                        value={form.password}
                        onChangeText={(text) => ( setForm({ ...form , password : text}) )}
                        label='Password'
                        secureTextEntry={true}
                    />

                    <CustomButton title='Signin' onPress={submit} isLoading={isSubmitting} />
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