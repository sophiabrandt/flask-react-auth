import React from 'react'
import { cleanup, wait } from '@testing-library/react'
import renderWithRouter from '../../setupTests'
import '@testing-library/jest-dom/extend-expect'
import axios from 'axios'

import UserStatus from '../UserStatus'

afterEach(cleanup)

jest.mock('axios')

describe('when authenticated', () => {
  axios.mockImplementation(() =>
    Promise.resolve({
      data: { data: { email: 'test@test.com', username: 'test' } },
    })
  )

  const props = {
    isAuthenticated: true,
  }

  it('renders properly', async () => {
    const { findByTestId } = renderWithRouter(<UserStatus {...props} />)
    await wait(() => {
      expect(axios).toHaveBeenCalledTimes(1)
    })
    expect((await findByTestId('user-email')).innerHTML).toBe('test@test.com')
    expect((await findByTestId('user-username')).innerHTML).toBe('test')
  })

  it('renders', async () => {
    const { asFragment } = renderWithRouter(<UserStatus {...props} />)
    await wait(() => {
      expect(axios).toHaveBeenCalled()
    })
    expect(asFragment()).toMatchSnapshot()
  })
})

describe('when unauthenticated', () => {
  axios.get.mockImplementation(() =>
    Promise.resolve({
      data: { status: 'fail' },
    })
  )

  const props = {
    isAuthenticated: false,
  }

  it('redirects when authToken invalid', async () => {
    const { history } = renderWithRouter(<UserStatus {...props} />)
    await wait(() => {
      expect(axios).toHaveBeenCalled()
    })
    expect(history.location.pathname).toEqual('/login')
  })
})
