import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import { CustomInputProps } from '@/type';

const CustomInput = ({
    placeholder = 'Enter text',
    value,
    onChangeText,
    label,
    secureTextEntry = false,
    keyboardType = 'default'
}: CustomInputProps) => {
    const [isFocused, setIsFocused] = useState(false);
    return (
        <View>
            <Text style={{ fontSize: 18, color: '#000000' }}>{label}</Text>
            <TextInput
                style={{
                    borderBottomWidth: 1, fontSize: 16,
                    borderRadius: 5, padding: 5, marginVertical: 5,
                    paddingBottom : 20,borderColor : 'transparent'
                }}
                autoCapitalize='none'
                autoCorrect={false}
                value={value}
                onChangeText={onChangeText}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholderTextColor={"#888"}
                placeholder={placeholder}
            />
        </View>
    )
}

export default CustomInput