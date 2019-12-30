import React from 'react'
import { render, cleanup } from '@testing-library/react'

import About from '../About'

afterEach(cleanup)

it('renders', () => {
  const { asFragment } = render(<About />)
  expect(asFragment()).toMatchSnapshot()
})
