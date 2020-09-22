import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

export const SearchScreen = () => {
    return(
        <View style={styles.searchScreen}>
            <Text style={styles.text}>Search Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    searchScreen:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green'
    },
    text: {
        fontSize: 28, 
        color:"white"
    }
})