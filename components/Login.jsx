import React, { useState } from "react";
import { View, Button, TextInput, Text, StyleSheet, ImageBackground } from "react-native";

const Login = ({ saveToken }) => {
    const [inputText, setInputText] = useState("");
    const [wentWrong, setWentWrong] = useState(false);
    const miToken = "e970611e-96b2-4f03-9d98-af9daecf0484";
    const handleOnClickLogin = () => {
        fetch(`https://api.spacetraders.io/my/account?token=${inputText}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    setWentWrong(true);
                    setTimeout(() => {
                        setWentWrong(false);
                    }, 3000);
                } else {
                    saveToken(inputText, true);
                }
            })
            .catch((err) => console.log(err));
    };
    return (
        <View style={styles.container}>
            <ImageBackground source={require("../assets/backgroundShips.jpg")} style={styles.image}>
                <Text style={styles.text}>Please introduce your token</Text>
                <TextInput style={wentWrong ? [styles.input, { borderColor: "red" }] : styles.input} onChangeText={(text) => setInputText(text)}></TextInput>
                {wentWrong && <Text>Something went wrong</Text>}
                <Button title="Login" onPress={handleOnClickLogin}></Button>
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
        justifyContent: "center",
        alignItems: "center",
    },
    input: {
        height: 30,
        width: "80%",
        borderWidth: 2,
        borderColor: "black",
        color: "white",
        textAlign: "center",
        marginBottom: 10,
        borderRadius: 7,
    },
    text: {
        color: "white",
        fontSize: 25,
        marginBottom: 15,
    },
});

export default Login;
