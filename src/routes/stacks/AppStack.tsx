import React, {Fragment, useCallback, useMemo} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SCREENS, STACK_SCREENS} from '@/routes/stacks/registerScreen';


const Stack = createNativeStackNavigator();

const navigationOptions = {
  hideHeader: {headerShown: false},
};
export const AppStack: React.FC = () => {
  const renderStackScreens = useCallback((props: any) => {
    return (
      <Fragment key={props.name}>
        <Stack.Screen
          {...props}
          options={props.options ?? navigationOptions.hideHeader}
        />
      </Fragment>
    );
  }, []);

  const initialRouteName: undefined | string = useMemo(() => {
    return SCREENS.HomePage.name;
  }, []);

  return (
    <Stack.Navigator initialRouteName={initialRouteName} screenOptions={{ gestureEnabled: true }}>
      {STACK_SCREENS.map(renderStackScreens)}
    </Stack.Navigator>
  );
};
