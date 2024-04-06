import React from 'react'

import {render} from '@testing-library/react-native'
import {SafeArea} from "@/components";
import {store} from "@/store/store";
import {Provider} from "react-redux";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {View,Text} from "react-native";
import {expect} from '@jest/globals';

describe('<SafeArea />', () => {
  const tree = render(
    <SafeAreaProvider>
      <Provider store={store}>
        <SafeArea>
          <View>
            <Text>Aulia Akbar Harahap</Text>
          </View>
        </SafeArea>
      </Provider>
    </SafeAreaProvider>
  )
  it('can be rendered successfully', () => {
    expect(tree).not.toBeNull()
  })
})
