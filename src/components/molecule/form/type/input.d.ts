import {ClassInput} from 'twrnc/dist/esm/types';
import {TextInputProps} from "react-native";

export interface IInputFieldStates {
  isSelected: boolean;
  hideErrorMessage: boolean;
  error?: {
    value?: boolean;
    message?: string;
  };
}

export interface IInputFieldBaseMethods {
  focus: (callback?: () => void) => void;
  blur: (callback?: () => void) => void;
  hideErrorMessage: (value?: boolean) => void;
  setState: React.Dispatch<React.SetStateAction<IInputFieldStates>>;
  getState: () => IInputFieldStates;
}

export interface IInputFieldProps {
  label: string;
  isError?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  required?: boolean;
}

export interface IPropsFromInputFieldBase {
  disabled?: boolean;
  editable?: boolean;
  isSelected?: boolean;
}

export interface IInputTextStates {
  value: string;
  typed: boolean;
  error?: {
    value?: boolean;
    message?: string;
  };
  visible?: boolean;
}

export interface IInputTextProps extends IInputFieldProps, TextInputProps {
  required?: boolean;
  regExp?: RegExp;
  errorMessageRegex?: string;
  rules?: (
    value: string,
    setter: React.Dispatch<React.SetStateAction<IInputTextStates>>,
    callback?: (errorParams?: { value?: boolean; message?: string }) => boolean,
  ) => boolean;
  callbackOnFocus?: () => void;
  password?: boolean;
  containerStyle?: ClassInput;
  loading?: boolean;
}

export interface IInputTextMethods {
  focus: () => void;
  blur: () => void;
  clear: () => void;
  getValue: () => string;
  setValue: (text: string) => void;
  validate: (errorParams?: { value: boolean; message: string }) => boolean;
}
