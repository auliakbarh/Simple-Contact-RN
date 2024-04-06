import {IInputTextMethods} from "@/components/molecule/form/type/input";

export interface IInputRef {
  firstName: IInputTextMethods | null
  lastName: IInputTextMethods | null
  age: IInputTextMethods | null
}

export type TSetRefFields = (
  key: keyof IInputRef,
) => (ref: any) => void;

export interface IAddContactUiProps {
  onPressSave: () => void
  setRef: TSetRefFields
  isLoading: boolean
}
