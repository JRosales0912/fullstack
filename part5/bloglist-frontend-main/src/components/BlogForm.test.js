import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import * as userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

  test('clicking the button calls event handler twice', async () => {
    const blog = {
        title: "blog1",
        author: "jhon cena",
        url: "www.url.com",
        likes: 316,
        id: "6406fb08ed2846abcae613b3"
        }
  
    const mockHandler = jest.fn()
    const mockHandlerAdd = jest.fn()
  
    render(
        <BlogForm title={blog.title}
        addBlog= {mockHandlerAdd}
        author={blog.author}
        url={blog.url}
        likes={blog.likes}
        handleTitleChange={mockHandler}
        handleAuthorChange={mockHandler}
        handleURLChange={mockHandler}
        handleLikesChange={mockHandler} />
    )
  
    const user = userEvent.default.setup()
    const button = document.querySelector('#submit')
    await user.click(button)

      
    expect(mockHandlerAdd).toHaveBeenCalled()
  })