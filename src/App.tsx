import {registerRootComponent} from "expo";
import {StatusBar} from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import {SafeAreaProvider} from "react-native-safe-area-context";
import {RootSiblingParent} from 'react-native-root-siblings';
import {Provider} from "react-redux";

import "@/config/translations";
import {store} from "@/store/store";
import {AppWrapper} from "@/components";
import {AppStack} from "@/routes";
import {navigation} from "@/routes/Navigation";

function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <StatusBar style="auto"/>
        <RootSiblingParent>
          <NavigationContainer ref={navigation.navigationRef}>
            <AppWrapper>
              <AppStack />
            </AppWrapper>
          </NavigationContainer>
        </RootSiblingParent>
      </Provider>
    </SafeAreaProvider>
  );
}

registerRootComponent(App)
