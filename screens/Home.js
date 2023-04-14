import { View, Text, Alert, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getAllBoards, getBoard } from '../api'
import { useNavigation } from '@react-navigation/native'

const Home = ({ testBoards }) => {
    const navigation = useNavigation();

    const [allBoards, setAllBoards] = useState(testBoards || []);

    const loadBoard = async () => {
        setAllBoards(await getAllBoards())
    }

    useEffect(() => {
        if (!testBoards) {
            loadBoard();
        }
    }, []);

    const handleBoardPress = (boardId) => {
        navigation.navigate('Board', { boardId });
    };


    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} testID="home-component">
            {allBoards.map(e => (
                <View key={e.id} style={styles.card}>
                    <TouchableOpacity onPress={() => handleBoardPress(e.id)} testID={'navigateButton'}>
                        <Image source={{ uri: e.prefs.backgroundImageScaled[3].url }} style={styles.image} />
                        <Text style={styles.name}>{e.name}</Text>
                    </TouchableOpacity>
                </View>
            ))}
        </ScrollView>
    )


}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        position: 'relative',
        height: 250,
    },
    image: {
        width: '100%',
        height: '100%',
        // resizeMode: 'cover',
    },
    name: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -50 }, { translateY: -10 }],
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Home