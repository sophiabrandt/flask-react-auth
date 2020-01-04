import React from 'react'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import Message from '../Message'

afterEach(cleanup)

describe('when "messageType" is "success"', () => {
  const props = {
    messageType: 'success',
    messageText: 'Hello, World!',
  }

  it('renders the default props', async () => {
    const { getByText, getByTestId } = render(<Message {...props} />)
    expect(getByTestId('message').innerHTML).toContain('is-success')
    expect(getByText('Hello, World!')).toHaveClass('message-text')
  })
})

describe('when "messageType" is "danger"', () => {
  const props = {
    messageType: 'danger',
    messageText: 'Hello, World!',
  }

  it('renders the default props', () => {
    const { getByText, getByTestId } = render(<Message {...props} />)
    expect(getByTestId('message').innerHTML).toContain('is-danger')
    expect(getByText('Hello, World!')).toHaveClass('message-text')
  })
})
