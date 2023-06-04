import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import * as userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: "blog1",
    author: "jhon cena",
    url: "www.url.com",
    likes: 316,
    id: "6406fb08ed2846abcae613b3"
    }
  render(<Blog blog={blog} />)

  const auth = document.querySelector('#author')
  const title = document.querySelector('#title')
  expect(auth).toBeDefined() 
  expect(title).toBeDefined()
})

test('clicking the button calls event handler once', async () => {
    const blog = {
        title: "blog1",
        author: "jhon cena",
        url: "www.url.com",
        likes: 316,
        id: "6406fb08ed2846abcae613b3"
        }
  
    const mockHandler = jest.fn()
  
    render(
        <Blog blog={blog} handleLike={mockHandler} />
    )
  
    const user = userEvent.default.setup()
    const button = document.querySelector('#view')
    await user.click(button)
      
    const url = document.querySelector('#url')
    const likes = document.querySelector('#likes')
    expect(url).toBeDefined() 
    expect(likes).toBeDefined()
  })