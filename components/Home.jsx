import React from "react";
import { useState, useCallback } from "react";
import { View, StyleSheet, Text, ImageBackground, Image } from "react-native";
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
        <View style={styles.container}>
            <ImageBackground source={require("../assets/backgroundShips.jpg")} style={styles.image}>
                {userData && (
                    <>
                        <View style={styles.userNameContainer}>
                            <Image source={require("../assets/avatar.png")} style={styles.avatarImage} />
                            <Text style={{ color: "white", fontSize: 20 }}>{userData.username}</Text>
                        </View>
                        <View style={styles.creditsContainer}>
                            <Text>{userData.credits} crd</Text>
                        </View>

                        <View style={styles.shipsAndStructuresContainer}>
                            <Text>
                                <Image source={require("../assets/spaceship.png")} style={{ width: 20, height: 20 }} />- {userData.shipCount}
                            </Text>
                            <Text>
                                <Image source={require("../assets/structures.png")} style={{ width: 20, height: 20 }} />- {userData.structureCount}
                            </Text>
                        </View>
                    </>
                )}
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

    userNameContainer: {
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
    },
    avatarImage: {
        width: 70,
        height: 70,
        borderRadius: 50,
        borderColor: "black",
        borderWidth: 1,
        marginRight: 10,
    },
    creditsContainer: {
        padding: 10,
        backgroundColor: "white",
        borderRadius: 7,
        borderWidth: 1,
        borderColor: "black",
        marginTop: 10,
    },
    shipsAndStructuresContainer: {
        padding: 10,
        backgroundColor: "white",
        borderRadius: 7,
        borderWidth: 1,
        borderColor: "black",
        marginTop: 10,
    },
});

export default Home;
