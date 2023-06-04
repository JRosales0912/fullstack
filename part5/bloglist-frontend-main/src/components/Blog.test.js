import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
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