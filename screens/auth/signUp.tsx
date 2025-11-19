import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import React from "react";
import TopSection from "@/components/AuthPage/TopSection";
import { useNavigation } from "@react-navigation/native";
import CustomInput from "@/components/Input/CustomInput";
import CustomButton from "@/components/Button/CustomButton";

const signUp = () => {
  const navigation = useNavigation<any>();
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const submit = async () => {
    if (isSubmitting) return;
    if (!form.name || !form.email || !form.password) {
      alert("Please fill all the fields");
      return;
    }
    setIsSubmitting(true);
    try {
      //login logic here
      navigation.replace("Signin");
    } catch (error) {
      console.log(error);
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

          <CustomButton title="Signup" onPress={submit}/>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default signUp;
