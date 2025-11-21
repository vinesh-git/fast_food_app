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
import { cloneElement, useEffect } from "react";
import homeIcon from "./assets/images/homeIcon.png"
import { TabProps } from "./type";
import { Image, Text, View } from "react-native";
import searchIcon from "./assets/images/searchIcon.png";
import bagIcon from "./assets/images/bagIcon.png";
import profileIcon from "./assets/images/profileIcon.png";

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

function BottomTabs() {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
                backgroundColor: '#ffffff',
                position: "absolute",
                borderBottomLeftRadius: 50,
                borderTopRightRadius: 50,
                borderBottomRightRadius: 50,
                borderTopLeftRadius: 50,
                marginHorizontal: 15,
                bottom: 15,
                paddingTop: 15,
                shadowColor: '#1a1a1a',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
                elevation: 5
            }
        }}>
            <Tab.Screen component={Home} name="Home" options={{
                tabBarIcon: ({ focused }) => <TabbarIcon icon={homeIcon} title="Home" focused={focused} />
            }} />
            <Tab.Screen component={Search} name="Search" options={{
                tabBarIcon: ({ focused }) => <TabbarIcon icon={searchIcon} title="Search" focused={focused} />
            }} />
            <Tab.Screen component={Cart} name="Cart" options={{
                tabBarIcon: ({ focused }) => <TabbarIcon icon={bagIcon} title="Cart" focused={focused} />
            }} />
            <Tab.Screen component={Profile} name="Profile" options={{
                tabBarIcon: ({ focused }) => <TabbarIcon icon={profileIcon} title="Profile" focused={focused} />
            }} />
        </Tab.Navigator>
    )
}

export default Sentry.wrap(function App() {
    const { isLoading, fetchAuthenticatedUser, isAuthenticated } = useAuthStore();

    useEffect(() => {
        fetchAuthenticatedUser();
    }, [isAuthenticated])

    if (isLoading) return null;

    const Stack = createNativeStackNavigator()
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {isAuthenticated ? (<Stack.Screen component={BottomTabs} name="tabs" />)
                    : (
                        <>
                            <Stack.Screen component={SignIn} name="Signin" />
                            <Stack.Screen component={signUp} name="Signup" />
                        </>
                    )
                }


            </Stack.Navigator>
        </NavigationContainer>
    );
});

export function TabbarIcon({ icon, focused, title }: TabProps) {
    return (
        <View style={{ width: 45 }}>
            <Image resizeMode="contain" style={{ alignSelf: 'center', width: 28, height: 28 }} source={icon} tintColor={focused ? "#FE8C00" : "#181C2EB2"} />
            <Text style={{ textAlign: "center", fontWeight: 600, fontSize: 12, color: focused ? '#FE8C00' : '#181C2EB2' }}
            >{title}
            </Text>
        </View>
    )
}