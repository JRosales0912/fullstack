import axios from 'axios'
const baseUrl = 'https://restcountries.com/v3.1'

const getAll = (name) => {
  return axios.get(baseUrl+"/name/"+name) 
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

const getWeather = (capital, api_key) => {
  const url = `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${capital[0]}&aqi=no`;
  return axios.get(url)
}

export default { 
  getAll, 
  create, 
  update,
  deleteUser,
  getWeather
}