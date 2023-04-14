import { Text, StyleSheet, Animated, TouchableOpacity, View } from 'react-native'
import React, { useState, useRef } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { deleteCard } from '../api';

const Card = ({ card, loadCards }) => {

    const onPressDelete = () => {
        deleteCard(card.id).then(res => loadCards() )
       
    }

    return (

        <View style={styles.container}>
            <Text style={styles.card}>• {card.name}</Text>
            <TouchableOpacity onPress={onPressDelete}>
                <Icon name="delete" size={24} color="red" />
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    card: {
        padding: 10,
        margin: 5,
        borderStyle: 'solid',
        borderColor: '#808080',
        backgroundColor: '#F3F6FB',
        borderRadius: 20,
        shadowOffset: {
            width: 0,
            height: 2
        },
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingRight: 16,
    },
});


export default Card