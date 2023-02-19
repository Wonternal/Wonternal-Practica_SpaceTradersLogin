import React from "react";
import { View, Button, StyleSheet, Text } from "react-native";

const Home = ({ userData }) => {
    return (
        <View>
            <Text>{userData.username}</Text>
            <Text>credits {userData.credits}</Text>
            <Text>ships {userData.shipCount}</Text>
            <Text>structures {userData.structureCount}</Text>
            <Text>Joined: {userData.joinedAt.substring(0, 10)}</Text>
        </View>
    );
};

export default Home;
