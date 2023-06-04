const BlogForm = ({ title, addBlog, author, url, likes,
  handleTitleChange, handleAuthorChange, handleURLChange, handleLikesChange }) => {
  return(
    <div>
      <h2>add new blog</h2>
      <div>
        <form onSubmit={addBlog}>
          <div>
          Title: <input id="titleInput" value={title}
              onChange={handleTitleChange}/>
          </div>
          <div>
          Author: <input id="authorInput" value={author}
              onChange={handleAuthorChange}/>
          </div>
          <div>
          URL: <input id="urlInput" value={url}
              onChange={handleURLChange}/>
          </div>
          <div>
          Likes: <input id="likesInput" value={likes}
              onChange={handleLikesChange}/>
          </div>
          <div>
            <button id="submit" type="submit" >add</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default BlogForm