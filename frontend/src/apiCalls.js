import axios from 'axios'

const api = 'http://localhost:5000/'
export const getColumns = async () => {
    return await axios({
        method: 'get',
        url: api + 'column/'
    })
}

export const getCards = async () => {
    return await axios({
        method: 'get',
        url: api + 'card/'
    })
}

export const addColumn = async (data) => {
    return await axios.post('http://localhost:5000/column', data)
}

export const getColumn = async (columnId) => {
    return await axios({
        method: 'get',
        url: api + 'column/'+columnId
    })
}
export const updateColumn = async (data) => {
    return await axios.put(api + 'column/', data)
}

export const deleteColumn = async (columnId) => {
    return await axios.delete(api + 'column/' + columnId)
}

export const getCard = async (cardId) => {
    return await axios({
        method: 'get',
        url: api + 'card/'+ cardId
    })
}
export const addCard = async (data) => {
    return await axios.post(api + 'card/', data)
}
export const updateCard = async (data) => {
    return await axios.put(api + 'card/', data)
}

export const deleteCard = async (cardId) => {
    return await axios.delete(api + 'card/' + cardId)
}