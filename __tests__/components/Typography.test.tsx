import React from 'react'
import {Text} from 'react-native'
import {Provider} from 'react-redux';
import Renderer from 'react-test-renderer'
import {Typography} from "@/components"
import {store} from "@/store/store";

describe('<Typography />', () => {
  it('renders correctly', () => {
    const tree = Renderer.create(
      <Provider store={store}>
        <Typography>Aulia Akbar Harahap</Typography>
      </Provider>
    )

    const root = tree.root
    const typography = root.findByType(Text)

    expect(typography.props.children).toBeDefined()
    expect(typography.props.children).toBe('Aulia Akbar Harahap')
    expect(tree).toMatchSnapshot()
  })
})
