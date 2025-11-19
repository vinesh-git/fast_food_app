import { View, Text, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import React from 'react'
import TopSection from '@/components/AuthPage/TopSection'

const signUp = () => {
  return (
    <KeyboardAvoidingView style={{ backgroundColor: '#ffffff', flex: 1 }} behavior={Platform.OS ==='ios' ? 'padding' : 'height'}>
        <ScrollView keyboardShouldPersistTaps='handled'>
            <TopSection/>
        </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default signUp