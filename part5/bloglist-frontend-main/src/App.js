import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/Login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'


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
  const [token, setToken ] = useState('') 
  const [author, setAuthor] = useState('')  
  const [url, setURL] = useState('')  
  const [title, setTitle] = useState('')  
  const [likes, setLikes] = useState('') 
  const [notification, setNotification] = useState(null)
  const [error, setError] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)
  const blogFormRef = useRef()
  
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

  const cmpLikes = (blog1, blog2) => {
    return blog1.likes - blog2.likes
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
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
    blogFormRef.current.toggleVisibility()
  }
  
  const handleLike = (id, likes) => {
    blogService.likeBlog(id, likes, token).then(()=>{
    showNotification("Liked Post", username)
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  })
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

  function handleLogout (event) {    
    event.preventDefault()       
      setUser(null) 
      setUsername('') 
      setPassword('') 
      setToken('') 
      setURL('')
      setBlogs([])
  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }
    return (
      <div>
        <Error message={error}/>
        <Notification message={notification}/>
        {user === null ?
          loginForm() :
          <div>
          <h2>blogs</h2>
          <h4> {username} logged in</h4>
          <button onClick={handleLogout}>Logout</button>
          <Togglable buttonLabel="new blog" ref={blogFormRef }>
              <BlogForm
              username={username}
              handleLogout={handleLogout}
              title={title}
              addBlog={addBlog}
              author={author}
              url={url}
              likes={likes}
              handleTitleChange={handleTitleChange}
              handleAuthorChange={handleAuthorChange}
              handleURLChange={handleURLChange}
              handleLikesChange={handleLikesChange}
              />
          </Togglable>
          {blogs.sort(cmpLikes) && blogs.map(blog =>
            <Blog key={blog.id} blog={blog} handleLike={handleLike} />
          )}
        </div>
        }
      </div>
    )
}

export default App