import axios from 'axios';

const api = '4479c9c6bfb13895fadde003ea33f1b3'
const secret = 'a8596862212ac125efb901c545cfc0c8bb7bb964c6c8bc7cad1ad61dd481b653'
const token = 'ATTA868298aedb40c683b8681fd54781e37a38b294ec16da2afa1348371d6ee4d6df006A8184'



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