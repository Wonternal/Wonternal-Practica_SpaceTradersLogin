import React from "react";
import { View, Button, StyleSheet, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";

const OptionsScreen = ({ setOptions }) => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <ImageBackground source={require("../assets/backgroundShips.jpg")} style={styles.image}>
                <Button
                    style={styles.button}
                    title="Login"
                    onPress={() => {
                        navigation.navigate("Login");
                        setOptions(false);
                    }}
                ></Button>
                <View style={styles.buttonSeparator}></View>
                <Button
                    title="Register"
                    onPress={() => {
                        navigation.navigate("Register");
                        setOptions(false);
                    }}
                ></Button>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    buttonSeparator: {
        marginBottom: 10,
    },
});

export default OptionsScreen;
