import { useState } from 'react'
const Blog = ({ blog, handleLike, deleteBlog }) => {
  const [visible, setVisible] = useState(false)

  if(visible) {
    return(
      <div  style={{ border: '1.8px solid red' }}>
        <h4>{blog.title} <button onClick={() => setVisible(false)}>Hide</button></h4>
        <h4 id="author">Author: {blog.author}</h4>
        <h5 id="url">URL: {blog.url}</h5>
        <h5 id="likes">Likes: {blog.likes} <button id="likesButton" onClick={() => handleLike(blog.likes + 1,blog.id)}>Like</button></h5>
        <h5 id="user">User: {blog.user}</h5>
        <button onClick={() => deleteBlog(blog.id, blog.title, blog.author)}>Remove</button>
      </div>)
  } else {
    return(
      <div style={{ border: '1.5px solid blue' }}>
        <h4 id="title">{blog.title}</h4>
        <button id="view" onClick={() => setVisible(true)}>View</button>        <h4 id="author">Author: {blog.author}</h4>
      </div>
    )
  }
}

export default Blog