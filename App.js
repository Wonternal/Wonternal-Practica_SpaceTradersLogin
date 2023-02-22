import { StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import OptionsScreen from "./components/OptionsScreen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./components/Home";
import * as SecureStorage from "expo-secure-store";
import Logout from "./components/Logout";
import Ships from "./components/Ships";

export default function App() {
    const [userIsLogged, setUserIsLogged] = useState(false);
    const [userToken, setUserToken] = useState(false);
    const [userData, setUserData] = useState({});
    const STORED_TOKEN_KEY = "spaceTradersToken";

    const saveToken = async (value, action) => {
        await SecureStorage.setItemAsync(STORED_TOKEN_KEY, value);
        setUserIsLogged(action);
    };

    const getStoragedTokenValue = async () => {
        let result = await SecureStorage.getItemAsync(STORED_TOKEN_KEY);

        if (result) {
            return result;
        } else {
            return null;
        }
    };

    useEffect(() => {
        const retrieveStoredToken = async () => {
            let tokenValue = await getStoragedTokenValue();
            setUserToken(tokenValue);
            // Check if the user with the tokenValue exists
            await fetch(`https://api.spacetraders.io/my/account?token=${tokenValue}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.user) {
                        setUserData(data.user);
                        setUserIsLogged(true);
                    }
                });
        };
        retrieveStoredToken();
    }, []);

    const Drawer = createDrawerNavigator();
    return (
        <>
            {userIsLogged ? (
                <NavigationContainer>
                    <Drawer.Navigator initialRouteName="Home">
                        <Drawer.Screen name="Home">{() => <Home userData={userData} />}</Drawer.Screen>
                        <Drawer.Screen name="Ships">{() => <Ships userToken={userToken} />}</Drawer.Screen>
                        <Drawer.Screen name="Logout">{() => <Logout saveToken={saveToken} />}</Drawer.Screen>
                    </Drawer.Navigator>
                </NavigationContainer>
            ) : (
                <NavigationContainer>
                    <Drawer.Navigator initialRouteName="Home">
                        <Drawer.Screen name="Options" component={OptionsScreen} />
                        <Drawer.Screen name="Register">{() => <Register saveToken={saveToken} />}</Drawer.Screen>
                        <Drawer.Screen name="Login">{() => <Login saveToken={saveToken} />}</Drawer.Screen>
                    </Drawer.Navigator>
                </NavigationContainer>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
