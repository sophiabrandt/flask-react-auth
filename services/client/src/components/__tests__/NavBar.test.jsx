import React from 'react'
import { cleanup } from '@testing-library/react'
import renderWithRouter from '../../setupTests'
import '@testing-library/jest-dom/extend-expect'

import NavBar from '../NavBar'

afterEach(cleanup)

describe('when not authenticated', () => {
  const props = {
    title: 'Hello, World!',
    logoutUser: () => {
      return true
    },
    isAuthenticated: false,
  }

  it('renders the default props', async () => {
    const { getByText, findByTestId } = renderWithRouter(<NavBar {...props} />)
    expect(getByText(props.title)).toHaveClass('nav-title')
    expect((await findByTestId('nav-about')).innerHTML).toBe('About')
    expect((await findByTestId('nav-register')).innerHTML).toBe('Register')
    expect((await findByTestId('nav-login')).innerHTML).toBe('Log In')
  })

  it('renders', () => {
    const { asFragment } = renderWithRouter(<NavBar {...props} />)
    expect(asFragment()).toMatchSnapshot()
  })
})

describe('when authenticated', () => {
  const props = {
    title: 'Hello, World!',
    logoutUser: () => {
      return true
    },
    isAuthenticated: true,
  }

  it('renders the default props', async () => {
    const { getByText, findByTestId } = renderWithRouter(<NavBar {...props} />)
    expect(getByText(props.title)).toHaveClass('nav-title')
    expect((await findByTestId('nav-about')).innerHTML).toBe('About')
    expect((await findByTestId('nav-status')).innerHTML).toBe('User Status')
    expect((await findByTestId('nav-logout')).innerHTML).toBe('Log Out')
  })

  it('renders', () => {
    const { asFragment } = renderWithRouter(<NavBar {...props} />)
    expect(asFragment()).toMatchSnapshot()
  })
})
