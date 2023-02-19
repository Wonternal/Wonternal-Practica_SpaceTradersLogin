import React, { useState } from "react";
import { View, Button, TextInput, Text, StyleSheet } from "react-native";

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
            <Text style={styles.text}>Please introduce your token</Text>
            <TextInput style={wentWrong ? [styles.input, { borderColor: "red" }] : styles.input} onChangeText={(text) => setInputText(text)}></TextInput>
            {wentWrong && <Text>Something went wrong</Text>}
            <Button title="Login" onPress={handleOnClickLogin}></Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    input: {
        height: 30,
        width: "90%",
        borderWidth: 1,
        borderColor: "black",
        textAlign: "center",
        marginBottom: 10,
        borderRadius: 10,
    },
    text: {
        fontSize: 20,
        marginBottom: 10,
    },
});

export default Login;
