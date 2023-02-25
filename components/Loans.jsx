import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Loans = ({ userToken }) => {
    const navigation = useNavigation();
    const [loan, setLoan] = useState({
        amount: "",
        rate: "",
        termInDays: "",
        type: "",
    });
    useEffect(() => {
        fetch(`https://api.spacetraders.io/types/loans?token=${userToken}`)
            .then((res) => res.json())
            .then((data) => {
                setLoan(data.loans[0]);
            })
            .catch((err) => console.log(err));
    }, [userToken]);

    const handleTakeOutLoan = () => {
        fetch(`https://api.spacetraders.io/my/loans?token=${userToken}&type=STARTUP`, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Accept: "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    alert("Only one loan allowed at a time");
                }
                navigation.navigate("Home");
            })
            .catch((err) => console.log(err));
    };
    return (
        <>
            <View style={styles.container}>
                <ImageBackground source={require("../assets/backgroundShips.jpg")} style={styles.image}>
                    <Text style={{ fontSize: 30, marginBottom: 20, color: "white" }}>Available Loans</Text>
                    <View style={styles.loanContainer}>
                        <Text>{loan.amount} crd</Text>
                        <Text>Rate: {loan.rate}%</Text>
                        <Text>Term: {loan.termInDays} days</Text>
                        <Text>Type: {loan.type}</Text>
                        <Button title="Take out" onPress={handleTakeOutLoan} />
                    </View>
                </ImageBackground>
            </View>
        </>
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
    loanContainer: {
        padding: 20,
        borderRadius: 7,
        borderWidth: 1,
        borderColor: "black",
        backgroundColor: "white",
    },
});

export default Loans;
