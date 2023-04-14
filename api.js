import axios from 'axios';
import Constants from 'expo-constants';

const api = Constants.expoConfig.extra.api;
const token = Constants.expoConfig.extra.token;


// Boards methods

export const getBoard = async (id) => {
    const resp = await axios.get(`https://api.trello.com/1/boards/${id}?key=${api}&token=${token}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error);
        });

    return resp
}

export const getAllBoards = async (id) => {
    const resp = await axios.get(`https://api.trello.com/1/organizations/userapiworkspace6/boards?key=${api}&token=${token}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error);
        });
    return resp
}

export const getListsOfBoard = async (idBoard) => {
    const resp = await axios.get(`https://api.trello.com/1/boards/${idBoard}/lists?key=${api}&token=${token}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error);
        });
    return resp
}



// List methods
export const deleteList = async (idList) => {
    return axios
        .put(`https://api.trello.com/1/lists/${idList}/closed?key=${api}&token=${token}&value=true`)
        .then(response => {
            return response.data;
        })
        .then(data => {
            console.log('List archive status:', data.closed);
        })
        .catch(error => {
            console.error(error);
            throw new Error('Unable to delete list');
        });
}

export const createList = async (idBoard) => {
    try {
        const response = await axios.post(`https://api.trello.com/1/lists?key=${api}&token=${token}`, {
            name: 'New List',
            idBoard: idBoard,
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

export const updateListName = async (listId, newName) => {
    try {
        const response = await axios.put(
            `https://api.trello.com/1/lists/${listId}?key=${api}&token=${token}`,
            {
                name: newName,
            }
        );
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};


// Cards methods
export const getCardsOfList = async (idList) => {
    const resp = await axios.get(`https://api.trello.com/1/lists/${idList}/cards?key=${api}&token=${token}`)
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error);
        });
    return resp
}

export const deleteCard = async (cardId) => {
    try {
        const response = await axios.delete(
            `https://api.trello.com/1/cards/${cardId}?key=${api}&token=${token}`
        );
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const createCard = async (listId, name) => {
    try {
        const response = await axios.post(
            `https://api.trello.com/1/cards?key=${api}&token=${token}`,
            {
                idList: listId,
                name: name,
            }
        );
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};