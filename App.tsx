import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import { NavigationContainer } from "@react-navigation/native";
import Cart from "./screens/Cart";
import Search from "./screens/Search";
import Profile from "./screens/Profile";
import SignIn from "./screens/auth/signIn";
import signUp from "./screens/auth/signUp";

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

export default function App() {
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
}