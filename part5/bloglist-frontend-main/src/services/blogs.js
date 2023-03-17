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
  const request = axios.post(baseUrl, {title: title, author:author, likes:likes, url:url}, config)
  return request.then(response => response.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, addBlog }