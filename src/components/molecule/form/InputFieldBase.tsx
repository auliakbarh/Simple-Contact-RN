import React, {useState, useMemo, useCallback, useImperativeHandle} from 'react'
import {View} from "react-native";

import {Typography} from "@/components/atom/Typography";
import {tw} from "@/config";
import {
  IInputFieldBaseMethods,
  IInputFieldProps,
  IInputFieldStates,
  IPropsFromInputFieldBase
} from "@/components/molecule/form/type/input";

type Props = IInputFieldProps & React.PropsWithChildren;

export const InputFieldBase = React.forwardRef<IInputFieldBaseMethods, Props>(
  ({ isError, disabled, children, label, errorMessage, required }, ref) => {
    const [state, setState] = useState<IInputFieldStates>({
      isSelected: false,
      hideErrorMessage: false,
      error: {
        value: isError,
        message: errorMessage,
      },
    });

    const { isSelected, hideErrorMessage, error } = useMemo(
      () => state,
      [state],
    );

    const onFocusHandler = useCallback(() => {
      setState((prevState) => ({ ...prevState, isSelected: true }));
    }, []);

    const onBlurHandler = useCallback(() => {
      setState((prevState) => ({ ...prevState, isSelected: false }));
    }, []);

    const color: {
      label: string;
      border: string;
    } = useMemo((): {
      label: string;
      border: string;
    } => {
      if (isSelected) {
        return {
          label: 'text-black dark:text-neutral',
          border: 'border-b-black dark:border-b-neutral',
        };
      }
      if (error?.value) {
        return {
          label: 'text-darkGray dark:text-neutral',
          border: 'border-b-error dark:border-b-error',
        };
      }

      return {
        label: 'text-darkGray dark:text-neutral',
        border: 'border-b-gray dark:border-b-neutral',
      };
    }, [disabled, error?.value, isSelected]);

    useImperativeHandle(ref, () => ({
      focus: (callback) => {
        onFocusHandler();
        callback?.();
      },
      blur: (callback) => {
        onBlurHandler();
        callback?.();
      },
      hideErrorMessage: (value) => {
        setState((prevState) => ({
          ...prevState,
          hideErrorMessage: value !== undefined ? value : true,
        }));
      },
      setState,
      getState: () => state,
    }));

    const childrenWithProps = React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        const props: IPropsFromInputFieldBase = {
          disabled,
          editable: !disabled,
          isSelected,
        };
        return React.cloneElement<any>(child, props);
      }
      return child;
    });

    return (
      <React.Fragment>
        <Typography style={tw`text-body font-bold ${color.label}`}>
          {`${label ?? ''}${required ? '*' : ''}`}
        </Typography>
        <View
          style={tw.style(
            `my-2 border-b min-h-8 pb-2`,
            `${color.border}`,
          )}>
          {childrenWithProps}
        </View>
        {error?.message !== undefined && !hideErrorMessage && (
          <View style={tw`mt-2`}>
            <Typography style={tw`text-footnote text-error`}>
              {error.message}
            </Typography>
          </View>
        )}
      </React.Fragment>
    );
  },
);
