import React, { useState } from "react";
import { View, Button, TextInput, Text, StyleSheet, ImageBackground } from "react-native";

const Register = ({ saveToken }) => {
    const [inputText, setInputText] = useState("");

    const handleOnClickRegister = () => {
        fetch(`https://api.spacetraders.io/users/${inputText}/claim`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Accept: "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    alert("Invalid nickname, please introduce other");
                } else {
                    saveToken(data.token, true);
                }
            })
            .catch((err) => console.log(err));
    };
    return (
        <View style={styles.container}>
            <ImageBackground source={require("../assets/backgroundShips.jpg")} style={styles.image}>
                <Text style={styles.text}>Please select your nickname</Text>
                <TextInput style={styles.input} onChangeText={(text) => setInputText(text)}></TextInput>
                <Button title="Register" onPress={handleOnClickRegister}></Button>
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

export default Register;
