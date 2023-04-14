import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { createList, getBoard, getListsOfBoard } from '../api';
import List from '../components/List';
import { Ionicons } from '@expo/vector-icons';


const Board = ({ route, mockBoard, mockedLists }) => {
  const { boardId } = route.params;


  useEffect(() => {
    if (!mockBoard) loadBoard()
  }, [])

  const [board, setBoard] = useState(mockBoard || [])
  const [lists, setLists] = useState(mockedLists || [])
  const [dragging, setDragging] = useState(false)

  const handleAddList = async () => {
    createList(boardId).then(res => loadBoard())
  };

  const loadBoard = async () => {
    setBoard(await getBoard(boardId))
    setLists(await getListsOfBoard(boardId))
  }

  return (
    <>
      <View style={styles.container} testID="boardComponent">
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Your lists of {board?.name}</Text>
          <View style={styles.addButtonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleAddList} testID="addListButton" >
              <Ionicons name="add" size={30} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <Image source={{ uri: board?.prefs?.backgroundImageScaled[3]?.url }} style={styles.image} />

        <ScrollView scrollEnabled={!dragging}>
          <View style={styles.listContainer}>
            {lists?.map((list, index) => (
              <View key={index} style={styles.containerCards} testID='listComponent'>
                <List key={index} list={list} setDragging={setDragging} loadBoard={loadBoard}  ></List>
              </View>
            ))}
          </View>
        </ScrollView>

        <TouchableOpacity style={styles.deleteButton} >
          <Text style={styles.buttonText}>Drag here to delete a list</Text>
        </TouchableOpacity>
      </View>

    </>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%'
  },
  titleContainer: {
    justifyContent: 'center',
    marginBottom: '8%',
    backdropFilter: 'blur(80px)',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: '3%',
    paddingBottom: '3%',
  },
  listContainer: {
    marginBottom: '25%'
  },
  title: {
    margin: 'auto',
    textAlign: 'center',
    fontSize: 25,
    color: 'white',
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  containerCards: {
    margin: 'auto',
    flexDirection: 'row',
    minHeight: 30,
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: '5%',
    justifyContent: 'space-around',
  },
  deleteButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 65,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: 'white',
    fontSize: 20,
  },

  addButtonContainer: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    marginLeft: 20
  },

  button: {
    backgroundColor: '#2ecc71',
    borderRadius: 25,
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
  },

});


export default Board