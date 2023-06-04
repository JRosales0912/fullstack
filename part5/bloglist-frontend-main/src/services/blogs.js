import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const addBlog = (title, author, likes, url, token) => {
  let config = {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }
  const request = axios.post(baseUrl, { title: title, author:author, likes:likes, url:url }, config)
  return request.then(response => response.data)
}

const likeBlog = (likes, id, token) => {
  let config = {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }
  const request = axios.put(baseUrl+'/'+id, { likes:likes }, config)
  return request.then(response => response.data)
}

const deleteBlog = (id, token) => {
  let config = {
    headers: {
      'Authorization': 'Bearer ' + token
    }
  }
  const request = axios.delete(baseUrl+'/'+id, config)
  return request.then(response => response.data)
}

export default { getAll, addBlog, likeBlog, deleteBlog }