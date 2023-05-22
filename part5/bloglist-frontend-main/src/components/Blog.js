import { useState } from 'react'
const Blog = ({blog}) => {
  const [visible, setVisible] = useState(false)

  if(visible) {
    return(
      <div style={{border: '1.8px solid red'}}>
      <h4>{blog.title} <button onClick={() => setVisible(false)}>Hide</button></h4> 
      <h4>Author: {blog.author}</h4> 
      <h5>URL: {blog.url}</h5> 
      <h5>Likes: {blog.likes} <button>Like</button></h5>
      <h5>User: {blog.user}</h5>
      </div>)
  } else {
    return(
    <div style={{border: '1.5px solid blue'}}>
    <h4>{blog.title} <button onClick={() => setVisible(true)}>View</button></h4> 
    </div>
    )
  }    
}

export default Blog