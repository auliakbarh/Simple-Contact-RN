import React from 'react';

export const setErrorMessage = <S = any>(
  setState: React.Dispatch<React.SetStateAction<S>>,
  refBase: React.RefObject<IInputFieldBaseMethods>,
  errorMessage?: string,
  isError?: boolean,
) => {
  if (isError === undefined && errorMessage === undefined) {
    setState((prevState) => ({
      ...prevState,
      error: undefined,
    }));
    refBase.current?.setState((prevState) => ({
      ...prevState,
      error: undefined,
    }));
    return;
  }

  setState((prevState) => ({
    ...prevState,
    error: {
      value: isError ?? true,
      message: errorMessage ?? 'error',
    },
  }));
  refBase.current?.setState((prevState) => ({
    ...prevState,
    error: {
      value: isError ?? true,
      message: errorMessage ?? 'error',
    },
  }));
};

export const setErrorMessageRequired = <S = any>(
  setState: React.Dispatch<React.SetStateAction<S>>,
  refBase: React.RefObject<IInputFieldBaseMethods>,
  label?: string,
) => {
  const errorMessage: string =
    label !== undefined ? `${label} tidak boleh kosong` : 'Tidak boleh kosong';

  setErrorMessage(setState, refBase, errorMessage);
};

export const resetErrorMessage = <S = any>(
  setState: React.Dispatch<React.SetStateAction<S>>,
  refBase: React.RefObject<IInputFieldBaseMethods>,
) => {
  setErrorMessage(setState, refBase);
};
