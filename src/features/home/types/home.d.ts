import {RnColorScheme} from "twrnc";

export interface IContactListUiProps {
  data: IContact[]
  toggleTheme: () => void
  colorScheme: RnColorScheme
}
