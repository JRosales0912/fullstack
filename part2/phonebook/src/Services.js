import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const update = (name, phone, id) => {
  return axios.put(`${baseUrl}/${id}`, {name: name, number:phone, id:id})
}

export default { 
  getAll, 
  create, 
  update 
}