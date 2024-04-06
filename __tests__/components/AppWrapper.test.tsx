import React from 'react'

import {render} from '@testing-library/react-native'
import {AppWrapper} from "@/components";
import {store} from "@/store/store";
import {Provider} from "react-redux";

describe('<AppWrapper />', () => {
  const tree = render(
    <Provider store={store}>
      <AppWrapper/>
    </Provider>
  )
  it('can be rendered successfully', () => {
    expect(tree).not.toBeNull()
  })
})
