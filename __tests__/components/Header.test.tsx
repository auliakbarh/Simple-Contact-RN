import React from 'react'

import {render} from '@testing-library/react-native'
import {Header} from "@/components";
import {store} from "@/store/store";
import {Provider} from "react-redux";
import {Text} from "react-native";
import {expect} from '@jest/globals';


describe('<Header />', () => {
  const tree = render(
    <Provider store={store}>
      <Header title="Home"/>
    </Provider>
  )

  const root = tree.root
  const text = root.findByType(Text)

  it('renders correctly with title', () => {
    expect(text.props.children).toBe('Home')
  });

  it('can be rendered successfully', () => {
    expect(tree).not.toBeNull()
  })
})
