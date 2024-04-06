import {SCREEN_NAME} from '@/routes/stacks/types/screenName'
import {Home} from '@/features/home'
import {AddNewContact} from "@/features/add_new_contact";

/**
 * Do not use this SCREENS to navigate as screen name, use SCREEN_NAME instead (prevent import cycle)
 */

export const SCREENS = {
  HomePage: {
    name: SCREEN_NAME.HOME_PAGE,
    component: Home,
  },
  AddNewContactPage: {
    name: SCREEN_NAME.ADD_NEW_CONTACT_PAGE,
    component: AddNewContact,
  },
}

export const STACK_SCREENS = Object.entries(SCREENS).map(([key, value]) => ({
  ...value,
}));
