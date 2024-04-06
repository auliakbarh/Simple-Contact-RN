import React from 'react'

import App from '../src/App'
import {render} from '@testing-library/react-native'

describe('<App />', () => {
  const tree = render(<App/>)
  it('can be rendered successfully', () => {
    expect(tree).not.toBeNull()
  })

  it('renders correctly', () => {
    expect(tree).toMatchSnapshot()
  })
})
