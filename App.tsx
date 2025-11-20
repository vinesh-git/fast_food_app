import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import Cart from "./screens/Cart";
import Search from "./screens/Search";
import Profile from "./screens/Profile";
import SignIn from "./screens/auth/signIn";
import signUp from "./screens/auth/signUp";
import * as Sentry from '@sentry/react-native';
import useAuthStore from "./store/auth.store";
import { useEffect } from "react";

Sentry.init({
  dsn: 'https://7057a4c2f4f83b6b39d31b79daba5754@o4510395686453248.ingest.us.sentry.io/4510395712012288',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Enable Logs
  enableLogs: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

function BottomTabs(){
    const Tab = createBottomTabNavigator();
    return(
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarStyle: {
                backgroundColor : '#ffffff'
            }
        }}>
            <Tab.Screen component={Home} name="Home" />
            <Tab.Screen component={Search} name="Search" />
            <Tab.Screen component={Cart} name="Cart" />
            <Tab.Screen component={Profile} name="Profile" />
        </Tab.Navigator>
    )
}

export default Sentry.wrap(function App() {
    const {isLoading,fetchAuthenticatedUser} = useAuthStore();

    useEffect(()=> {
        fetchAuthenticatedUser();
    },[])

    if(isLoading) return null;

    const Stack = createNativeStackNavigator()
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="Signin">
                <Stack.Screen component={BottomTabs} name="tabs"/>
                <Stack.Screen component={SignIn} name="Signin"/>
                <Stack.Screen component={signUp} name="Signup"/>
            </Stack.Navigator>
        </NavigationContainer>
    );
});