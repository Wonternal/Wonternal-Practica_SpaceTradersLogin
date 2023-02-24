import React from "react";
import { useState, useEffect, useCallback } from "react";
import { View, Button, StyleSheet, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

const Home = ({ userToken }) => {
    const [userData, setUserData] = useState();

    useFocusEffect(
        useCallback(() => {
            fetch(`https://api.spacetraders.io/my/account?token=${userToken}`)
                .then((res) => res.json())
                .then((data) => {
                    if (data.user) {
                        setUserData(data.user);
                    }
                })
                .catch((err) => console.log(err));
        }, [userToken])
    );

    return (
        <>
            {userData && (
                <View>
                    <Text>{userData && userData.username}</Text>
                    <Text>credits {userData && userData.credits}</Text>
                    <Text>ships {userData && userData.shipCount}</Text>
                    <Text>structures {userData && userData.structureCount}</Text>
                </View>
            )}
        </>
    );
};

export default Home;
