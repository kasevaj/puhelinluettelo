import axios from 'axios'
const baseUrl = 'https://puhelinluettelonbackend.fly.dev/api/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = newObject => {
    return axios.post(baseUrl, newObject)
}

// 2.15 tehtävää varten
const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject)
}

// lisätty 2.14 tehtävään
const del = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

export default {
    getAll,
    create,
    update,
    del
}