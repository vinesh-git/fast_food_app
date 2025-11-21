import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import React from "react";
import TopSection from "@/components/AuthPage/TopSection";
import { useNavigation } from "@react-navigation/native";
import CustomInput from "@/components/Input/CustomInput";
import CustomButton from "@/components/Button/CustomButton";
import { createUser } from "@/lib/appwrite";
import useAuthStore from "@/store/auth.store";

const signUp = () => {
  const navigation = useNavigation<any>();
  const {setIsAuthenticated} = useAuthStore();
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const submit = async () => {
    const {name,email,password} = form;
    if (isSubmitting) return;
    if (!name || !email || !password) {
      alert("Please fill all the fields");
      return;
    }
    setIsSubmitting(true);
    try {
      const result = await createUser({name,email,password});
      if(result)
          setIsAuthenticated(true);
      navigation.replace("Signin");
    } catch (error:any) {
      Alert.alert("Error",error.message)
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <KeyboardAvoidingView
      style={{ backgroundColor: "#ffffff", flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView keyboardShouldPersistTaps="handled">
        <TopSection />
        <View style={{ padding: 15, gap: 20 }}>
          <CustomInput
            placeholder="Enter your name"
            value={form.name}
            onChangeText={(text) => {
              setForm({ ...form, name: text });
            }}
            label="Name"
          />
          <CustomInput
            placeholder="Enter your email"
            value={form.email}
            onChangeText={(text) => {
              setForm({ ...form, email: text });
            }}
            label="Email"
            keyboardType="email-address"
          />

          <CustomInput
            placeholder="Enter your password"
            value={form.password}
            onChangeText={(text) => setForm({ ...form, password: text })}
            label="Password"
            secureTextEntry={true}
          />

          <CustomButton
            title="Signup"
            onPress={submit}
            isLoading={isSubmitting}
          />
        </View>
        <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 5, marginTop: 10 }}>
          <Text>
            Already have an account?
          </Text>
          <Pressable onPress={() => navigation.navigate("Signin")}>
            <Text style={{ color: "#fe8c00", fontWeight: 800 }}>Sign In</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default signUp;
