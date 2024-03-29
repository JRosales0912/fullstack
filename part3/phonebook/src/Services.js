import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const create = newObject => {
  return axios.post(baseUrl, newObject)
}

const update = (name, phone, id) => {
  return axios.put(`${baseUrl}/${id}`, {name: name, number:phone, id:id})
}

const deleteUser = id => {
  return axios.delete(`${baseUrl}/${id}`)
}

export default { 
  getAll, 
  create, 
  update,
  deleteUser
}