import React from 'react'
import { cleanup } from '@testing-library/react'
import renderWithRouter from '../../setupTests'
import '@testing-library/jest-dom/extend-expect'

import NavBar from '../NavBar'

const title = 'Hello, World!'

afterEach(cleanup)

it('renders a title', () => {
  const { getByText } = renderWithRouter(<NavBar title={title} />)
  expect(getByText(title)).toHaveClass('nav-title')
})

it('renders', () => {
  const { asFragment } = renderWithRouter(<NavBar title={title} />)
  expect(asFragment()).toMatchSnapshot()
})
