import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
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
                if (data.error.code === 422) {
                    alert("Only one loan allowed at a time");
                } else if (data.error) {
                    alert("Ops, something went wrong");
                }

                navigation.navigate("Home");
            })
            .catch((err) => console.log(err));
    };
    return (
        <>
            <View>
                <Text>Available Loans</Text>
                <View>
                    <Text>{loan.amount} crd</Text>
                    <Text>Rate: {loan.rate}%</Text>
                    <Text>Term: {loan.termInDays} days</Text>
                    <Text>Type: {loan.type}</Text>
                    <Button title="Take out" onPress={handleTakeOutLoan} />
                </View>
            </View>
        </>
    );
};

export default Loans;
