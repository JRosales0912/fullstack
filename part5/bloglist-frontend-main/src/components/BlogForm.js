const BlogForm = ({ username, handleLogout, title, addBlog, author, url, likes, 
    handleTitleChange, handleAuthorChange, handleURLChange, handleLikesChange}) => {
    return(
    <div>
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
    </div>
    )
}

export default BlogForm