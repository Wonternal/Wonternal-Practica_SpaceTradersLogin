import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, ImageBackground, FlatList, Image } from "react-native";

const Ships = ({ userToken }) => {
    const [ships, setShips] = useState([]);
    useEffect(() => {
        fetch(`https://api.spacetraders.io/systems/OE/ship-listings?token=${userToken}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.shipListings != null) {
                    setShips(data.shipListings);
                }
            });
    }, []);

    const shipsImages = [
        require("../assets/Ship_1.png"),
        require("../assets/Ship_2.png"),
        require("../assets/Ship_3.png"),
        require("../assets/Ship_4.png"),
        require("../assets/Ship_5.png"),
        require("../assets/Ship_1.png"),
        require("../assets/Ship_2.png"),
        require("../assets/Ship_3.png"),
        require("../assets/Ship_4.png"),
        require("../assets/Ship_5.png"),
        require("../assets/Ship_1.png"),
        require("../assets/Ship_2.png"),
    ];
    return (
        <View style={styles.container}>
            <ImageBackground source={require("../assets/backgroundShips.jpg")} resizeMode="cover" style={styles.image}>
                <Text style={{ color: "white", fontSize: 30, marginTop: 10 }}>Available Ships</Text>
                <FlatList
                    data={ships}
                    renderItem={({ item, index }) => (
                        <View style={styles.shipRow}>
                            <View style={{ marginRight: 10, justifyContent: "center" }}>
                                <Image source={shipsImages[index]} />
                            </View>
                            <View>
                                <Text>Type: {item.type}</Text>
                                <Text>Speed: {item.speed}</Text>
                                <Text>Weapons: {item.weapons}</Text>
                                <Text>Cargo: {item.maxCargo}</Text>
                            </View>
                        </View>
                    )}
                />
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

    shipRow: {
        backgroundColor: "#f2eeed",
        padding: 10,
        borderRadius: 7,
        flexDirection: "row",
        width: "70%",
        marginTop: 10,
        justifyContent: "space-evenly",
        alignSelf: "center",
        borderColor: "black",
        borderWidth: 1,
    },
});

export default Ships;
