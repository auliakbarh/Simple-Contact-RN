import React from 'react'

import App from '../src/App'
import { render } from '@testing-library/react-native'

describe('<App />', () => {
  it('can be rendered successfully', () => {
    const tree = render(<App />)
    expect(tree).not.toBeNull()
  })
})
