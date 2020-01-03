import React from 'react'
import { cleanup, fireEvent, wait } from '@testing-library/react'
import renderWithRouter from '../../setupTests'
import '@testing-library/jest-dom/extend-expect'

import LoginForm from '../LoginForm'

afterEach(cleanup)

describe('renders', () => {
  const props = {
    handleLoginFormSubmit: () => {
      return true
    },
    isAuthenticated: false,
  }

  it('properly', () => {
    const { getByText } = renderWithRouter(<LoginForm {...props} />)
    expect(getByText('Log In')).toHaveClass('title')
  })

  it('default props', () => {
    const { getByLabelText, getByText } = renderWithRouter(
      <LoginForm {...props} />
    )

    const emailInput = getByLabelText('Email')
    expect(emailInput).toHaveAttribute('type', 'email')
    expect(emailInput).not.toHaveValue()

    const passwordInput = getByLabelText('Password')
    expect(passwordInput).toHaveAttribute('type', 'password')
    expect(passwordInput).not.toHaveValue()

    const buttonInput = getByText('Submit')
    expect(buttonInput).toHaveValue('Submit')
  })

  it('a snapshot properly', () => {
    const { asFragment } = renderWithRouter(<LoginForm {...props} />)
    expect(asFragment()).toMatchSnapshot()
  })
})

describe('handles form validation correctly', () => {
  const mockProps = {
    handleLoginFormSubmit: jest.fn(),
    isAuthenticated: false,
  }

  it('when fields are empty', async () => {
    const { getByLabelText, container, findByTestId } = renderWithRouter(
      <LoginForm {...mockProps} />
    )

    const form = container.querySelector('form')
    const emailInput = getByLabelText('Email')
    const passwordInput = getByLabelText('Password')

    expect(mockProps.handleLoginFormSubmit).toHaveBeenCalledTimes(0)

    fireEvent.blur(emailInput)
    fireEvent.blur(passwordInput)

    expect((await findByTestId('errors-email')).innerHTML).toBe(
      'Email is required.'
    )
    expect((await findByTestId('errors-password')).innerHTML).toBe(
      'Password is required.'
    )

    fireEvent.submit(form)

    await wait(() => {
      expect(mockProps.handleLoginFormSubmit).toHaveBeenCalledTimes(0)
    })
  })
  it('when email field is not valid', async () => {
    const { getByLabelText, container, findByTestId } = renderWithRouter(
      <LoginForm {...mockProps} />
    )

    const form = container.querySelector('form')
    const emailInput = getByLabelText('Email')

    expect(mockProps.handleLoginFormSubmit).toHaveBeenCalledTimes(0)

    fireEvent.change(emailInput, { target: { value: 'invalid' } })
    fireEvent.blur(emailInput)

    expect((await findByTestId('errors-email')).innerHTML).toBe(
      'Enter a valid email.'
    )

    fireEvent.submit(form)

    await wait(() => {
      expect(mockProps.handleLoginFormSubmit).toHaveBeenCalledTimes(0)
    })
  })

  it('when fields are valid', async () => {
    const { getByLabelText, container } = renderWithRouter(
      <LoginForm {...mockProps} />
    )

    const form = container.querySelector('form')
    const emailInput = getByLabelText('Email')
    const passwordInput = getByLabelText('Password')

    expect(mockProps.handleLoginFormSubmit).toHaveBeenCalledTimes(0)

    fireEvent.change(emailInput, { target: { value: 't@t.com' } })
    fireEvent.change(passwordInput, { target: { value: 'properlength' } })
    fireEvent.blur(emailInput)
    fireEvent.blur(passwordInput)

    fireEvent.submit(form)

    await wait(() => {
      expect(mockProps.handleLoginFormSubmit).toHaveBeenCalledTimes(1)
    })
  })
})
