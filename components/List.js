import { View, Text, StyleSheet, Animated, PanResponder, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { useEffect, useState, useRef } from 'react'
import { createCard, deleteList, getCardsOfList, updateListName } from '../api'
import Card from './Card'
import { Ionicons } from '@expo/vector-icons';


const List = ({ list, loadBoard, setDragging }) => {

    useEffect(() => {
        loadCards()
        pan.setValue({ x: 0, y: 0 });
    }, [])

    const [pan] = useState(new Animated.ValueXY());
    const panStyle = {
        transform: pan.getTranslateTransform()
    }

    const [cards, setCards] = useState([])

    const [editing, setEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(list.name);

    const [creatingCard, setCreatingCard] = useState(false);
    const [newCardTitle, setNewCardTitle] = useState('')

    const loadCards = async () => {
        setCards(await getCardsOfList(list.id))
    }

    const handleDelete = async () => {
        try {
            deleteList(list.id).then(res => { loadBoard(); pan.setValue({ x: 0, y: 0 }); })
        } catch (error) {
            console.error(error);
        }
    }

    const deleteArea = (gesture) => {
        return gesture.moveY > 715;
    }

    const handleEditListTitle = (newTitle) => {
        updateListName(list.id, newTitle).then(res => {
            loadBoard();
            setNewTitle('');
            setEditing(false);
        })
    }

    const handleCreateCard = () => {
        createCard(list.id, newCardTitle).then(res => { loadCards(), setNewCardTitle(''), setCreatingCard(false) })
    }

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: (e, gesture) => true,
            onPanResponderMove: Animated.event(
                [
                    null,
                    { dx: pan.x, dy: pan.y },
                ],
                { useNativeDriver: false }
            ),
            onPanResponderRelease: (e, gesture) => {
                if (deleteArea(gesture)) {
                    handleDelete()
                } else {
                    Animated.spring(pan, {
                        toValue: { x: 0, y: 0 },
                        friction: 5,
                        useNativeDriver: true
                    }).start();
                }
                setDragging(false)
            },
            onPanResponderGrant: (e, gestureState) => {
                setDragging(true)
            }
        })
    ).current;


    return (
        <Animated.View
            {...panResponder.panHandlers}
            style={[panStyle, styles.list]}
        >

            {editing ? (
                <TextInput
                    style={styles.listTitleInput}
                    value={newTitle}
                    onChangeText={(text) => setNewTitle(text)}
                    onSubmitEditing={() => handleEditListTitle(newTitle)}
                    onBlur={() => setEditing(false)}
                />
            ) : (
                <TouchableOpacity onPress={() => setEditing(true)}>
                    <Text style={styles.listTitle}>{list.name}</Text>
                </TouchableOpacity>
            )}

            {cards?.map((card, index) => (
                <Card key={index} card={card} listId={list.id} loadCards={loadCards}></Card>
            ))}


            {!creatingCard ? (
                <TouchableOpacity onPress={() => setCreatingCard(true)}>
                    <View style={styles.createCardContainer}>
                        <View>
                            <Ionicons name="add" size={30} color="black" />
                        </View>
                        <Text style={styles.createCardText}>Create new card</Text>
                    </View>
                </TouchableOpacity>
            )
                :

                (
                    <TextInput
                        style={styles.cardTitleInput}
                        placeholder='Select a name for your card..'
                        value={newCardTitle}
                        onChangeText={(text) => setNewCardTitle(text)}
                        onSubmitEditing={() => handleCreateCard(newTitle)}
                        onBlur={() => setCreatingCard(false)}
                    />
                )}
        </Animated.View >

    )
}


const styles = StyleSheet.create({
    list: {
        width: '80%',
        marginHorizontal: '2%',
        borderStyle: 'solid',
        borderColor: '#808080',
        padding: 15,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        shadowColor: '#000000',
        shadowOpacity: 0.3,
        shadowOffset: {
            width: 0,
            height: 2
        },
        margin: 10,
        shadowRadius: 3,
        elevation: 2,
    },
    listTitle: {
        fontSize: 15,
        color: 'red'
    },
    createCardText: {
        color: 'black'
    },
    createCardContainer: {
        marginTop: '3%',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
        paddingLeft: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
    cardTitleInput: {
        borderRadius: 20,
        padding: 8,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
    }
});


export default List
