import {
    createNavigationContainerRef,
    NavigationContainerRefWithCurrent
} from '@react-navigation/core';
import {
    CommonActions,
    NavigationAction,
    StackActions,
} from '@react-navigation/routers';

import {SCREEN_NAME} from "@/routes/stacks/types/screenName";

export interface IRoutes {
    index: number;
    key?: string;
    name: SCREEN_NAME;
    path?: string;
    params?: Record<string, any>;
    state?: any;
}

export const navigationRef: NavigationContainerRefWithCurrent<ReactNavigation.RootParamList> = createNavigationContainerRef();

export class Navigation {
    navigationRef: NavigationContainerRefWithCurrent<ReactNavigation.RootParamList & any> & { state?: { nav?: any } } = navigationRef;

    dispatch(action: NavigationAction) {
        if (this.navigationRef.isReady()) {
            this.navigationRef.dispatch(action);
        }
    }
    navigateAndReset(
        routes: Array<WithRequiredProperty<Partial<IRoutes>, 'name'>>,
        index: number,
    ) {
        if (this.navigationRef.isReady()) {
            this.navigationRef.dispatch(
              CommonActions.reset({
                  index: index ?? 0,
                  routes: routes ?? [],
              }),
            );
        }
    }

    navigateAndSimpleReset(
        name: SCREEN_NAME,
        routesParams?: Partial<Omit<IRoutes, 'name'>>,
    ) {
        const { index = 0, params, key, path, state } = routesParams ?? {};
        if (this.navigationRef.isReady()) {
            this.navigationRef.dispatch(
              CommonActions.reset({
                  index,
                  routes: [{ name, params, key, path, state }],
              }),
            );
        }
    }

    navigateAndReplace(name: SCREEN_NAME, params?: Record<string, any>) {
        if (this.navigationRef.isReady()) {
            this.navigationRef.dispatch(StackActions.replace(name, params));
        }
    }

    navigate(routeName: SCREEN_NAME, params?: Record<string, any>) {
        if (this.navigationRef.isReady()) {
            this.navigationRef.navigate(routeName, params);
        }
    }
    push(routeName: string, params?: Record<string, any>) {
        if (this.navigationRef.isReady()) {
            this.navigationRef.dispatch(StackActions.push(routeName, params));
        }
    }

    replace(routeName: string, params?: Record<string, any>) {
        if (this.navigationRef.isReady()) {
            this.navigationRef.dispatch(
              StackActions.replace(routeName, params),
            );
        }
    }

    goBack() {
        if (this.navigationRef.isReady()) {
            this.navigationRef.dispatch(CommonActions.goBack());
        }
    }

    getNav() {
        return this.navigationRef;
    }

    getCurrentRoute() {
        if (this.navigationRef.isReady()) {
            let navIterator = this.navigationRef.state?.nav;
            while (navIterator?.index) {
                navIterator = navIterator.routes[navIterator.index];
            }
            return navIterator;
        }
        return undefined;
    }

    getCurrentRouteName() {
        if (this.navigationRef.isReady()) {
            const routes = this.navigationRef.getRootState().routes
            if (routes === undefined) {
                return undefined
            }
            return routes[routes?.length - 1].name
        }
        return undefined
    }

    getPrevRouteName() {
        if (this.navigationRef.isReady()) {
            const routes = this.navigationRef.getRootState().routes
            if (routes === undefined) {
                return undefined
            }
            return routes[routes?.length - 2].name
        }
        return undefined
    }
}

export const navigation = new Navigation();
