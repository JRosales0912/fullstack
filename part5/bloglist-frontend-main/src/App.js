import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'


const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='notification'>
      {message}
    </div>
  )
}

const Error = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')   
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [token, setToken] = useState('') 
  const [author, setAuthor] = useState('')  
  const [url, setURL] = useState('')  
  const [title, setTitle] = useState('')  
  const [likes, setLikes] = useState('') 
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(null)

  
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  
  const handleURLChange = (event) => {
    setURL(event.target.value)
  }

  const handleLikesChange = (event) => {
    setLikes(event.target.value)
  }

  const showNotification = (name, user) => {
    setNotification(`Blog: "${name}" added by ${user}`)
    setTimeout(() => {setNotification(null)}, 5000)
  }

  const showError = (name) => {
    setError(`${name}`)
    setTimeout(() => {setError(null)}, 5000)
  }
  const addBlog = (event) => {    
    event.preventDefault()
    blogService.addBlog(title, author, likes, url, token)
    showNotification(title, username)
    setAuthor('')
    setTitle('')
    setURL('')
    setLikes('')
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {    
    event.preventDefault()        
    try {      
      const user = await loginService.login({ username, password,})
      setUser(user)
      setUsername(user.username)
      setPassword('')
      setToken(user.token)
    } catch (exception) {
      showError('Wrong credentials')
      setTimeout(() => {
        showError(null)
      }, 5000)
    } 
  }

  function handleLogout(event) {    
    event.preventDefault()       
      setUser(null)
      setUsername('')
      setPassword('')
      setToken('')
      setURL('')
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
      <Error message={error}/>

        <form onSubmit={handleLogin}>        
        <div> 
          Username
           <input 
            type="text" 
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
            />
            </div>
            <div>
              Password
              <input type="password" value={password} name="Password" 
              onChange={({ target }) => setPassword(target.value)}
            />
         </div>
        <button type="submit">login</button>
      </form>
      </div>
    )
  }

  return (
    <div>
      <Notification message={notification}/>
      <h2>blogs</h2>
      <h4> {username} logged in</h4>
      <button onClick={handleLogout}>Logout</button>
      <h2>add new blog</h2>
      <div>
      <form onSubmit={addBlog}>
        <div>
          Title: <input value={title} 
            onChange={handleTitleChange}/>
        </div>
        <div>
          Author: <input value={author} 
            onChange={handleAuthorChange}/>
        </div>        
        <div>
          URL: <input value={url} 
            onChange={handleURLChange}/>
        </div>
        <div>
          Likes: <input value={likes} 
            onChange={handleLikesChange}/>
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      </div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App