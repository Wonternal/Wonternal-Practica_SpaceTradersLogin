import React, { useState, useEffect } from "react";
import { View, Button, StyleSheet, Text } from "react-native";

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

    return (
        <>
            <View>
                <Text>Available Ships</Text>
                {ships.map((ship, index) => {
                    return (
                        <Text key={index}>
                            Type: {ship.type} || Speed: {ship.speed} || Weapons: {ship.weapons} || Cargo: {ship.maxCargo}
                        </Text>
                    );
                })}
            </View>
        </>
    );
};

export default Ships;
