import React, { useState } from "react";
import { View, Button, TextInput, Text, StyleSheet } from "react-native";

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
            <Text style={styles.text}>Please select your nickname</Text>
            <TextInput style={styles.input} onChangeText={(text) => setInputText(text)}></TextInput>
            <Button title="Register" onPress={handleOnClickRegister}></Button>
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

export default Register;
