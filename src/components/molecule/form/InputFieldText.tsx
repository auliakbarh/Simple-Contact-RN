import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  ActivityIndicator,
  Pressable,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import { titleize, regex } from '@/utils';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';

import {tw} from '@/config/';
import {
  InputFieldBase,
} from '@/components/molecule/form/InputFieldBase';
import {
  setErrorMessage,
  setErrorMessageRequired,
} from '@/components/molecule/form/utils/setErrorMessage';
import {
  IInputFieldBaseMethods,
  IInputTextMethods,
  IInputTextProps,
  IInputTextStates
} from "@/components/molecule/form/type/input";

export const InputText = React.forwardRef<IInputTextMethods, IInputTextProps>(
  (
    {
      isError,
      disabled,
      errorMessage,
      label,
      required,
      rules,
      regExp,
      errorMessageRegex,
      value: initialValue,
      callbackOnFocus,
      password,
      containerStyle,
      onBlur,
      onFocus,
      loading,
      onChangeText,
      ...props
    },
    ref,
  ) => {
    const refBase = useRef<IInputFieldBaseMethods>(null);
    const refTextInput = useRef<TextInput>(null);
    const [{ value, typed, error, visible }, setState] =
      useState<IInputTextStates>({
        value:
          props.autoCapitalize === 'words'
            ? titleize(initialValue ?? '')
            : initialValue ?? '',
        typed: false,
        error: {
          value: isError,
          message: errorMessage,
        },
      });

    const focus = useCallback(() => {
      refBase.current?.focus();
      refTextInput.current?.focus();
      callbackOnFocus?.();
    }, [callbackOnFocus]);

    const blur = useCallback(() => {
      refBase.current?.blur();
      refTextInput.current?.blur();
    }, []);

    const onChangeTextHandler = useCallback(
      (text: string) => {
        setState((prevState) => {
          if (prevState.value !== text) {
            refBase.current?.setState((prevState) => ({
              ...prevState,
              error: { value: false, message: undefined },
            }));
          }
          return {
            ...prevState,
            value: props.autoCapitalize === 'words' ? titleize(text) : text,
            typed: true,
            error: prevState.value !== text ? undefined : prevState.error,
          };
        });
        onChangeText?.(text);
      },
      [props.autoCapitalize, onChangeText],
    );

    useEffect(() => {
      if (required && regex.isEmptyString.test(value) && typed) {
        setErrorMessageRequired(setState, refBase, label);
      }
    }, [required, value, typed, label]);

    const onPressIcon = useCallback(() => {
      setState((prevState) => ({ ...prevState, visible: !prevState.visible }));
    }, []);

    useImperativeHandle(ref, () => {
      return {
        focus,
        blur,
        clear: () => setState((prevState) => ({ ...prevState, value: '' })),
        setValue: onChangeTextHandler,
        getValue: () =>
          props.autoCapitalize === 'words' ? titleize(value) : value,
        validate: (errorParams) => {
          if (errorParams !== undefined && errorParams.value) {
            setErrorMessage(
              setState,
              refBase,
              errorParams.message,
              errorParams.value,
            );
            return errorParams.value;
          }

          if (required && regex.isEmptyString.test(value)) {
            setErrorMessageRequired(setState, refBase, label);
            return false;
          }

          if (regExp !== undefined) {
            if (!regExp.test(value)) {
              setErrorMessage(setState, refBase, errorMessageRegex, true);
              return false;
            }
          }

          if (rules !== undefined) {
            return rules(value, setState, (errorParams) => {
              refBase.current?.setState((prevState) => ({
                ...prevState,
                error: {
                  value: errorParams?.value,
                  message: errorParams?.message,
                },
              }));
              return errorParams?.value ?? true;
            });
          }

          return true;
        },
      };
    });

    return (
      <Pressable
        onPress={() =>
          refBase.current?.focus(() => {
            refTextInput.current?.focus();
            callbackOnFocus?.();
          })
        }
        style={tw.style(containerStyle)}
        disabled={disabled || props.editable === false || loading}>
        <InputFieldBase
          ref={refBase}
          label={label}
          required={required}
          isError={error?.value}
          errorMessage={error?.message}
          disabled={disabled || loading}>
          {password ? (
            <View style={tw`row`}>
              <View style={tw`flex-1`}>
                <TextInput
                  ref={refTextInput}
                  style={tw.style(
                    `text-body-sm font-bold p-0`,
                    props.editable === false || loading || disabled
                      ? 'text-gray dark:text-neutral'
                      : 'text-black dark:text-neutral',
                  )}
                  textAlign="left"
                  textAlignVertical="bottom"
                  value={value}
                  onChangeText={onChangeTextHandler}
                  onFocus={(e) => {
                    refBase.current?.focus();
                    callbackOnFocus?.();
                    onFocus?.(e);
                  }}
                  onBlur={(e) => {
                    refBase.current?.blur();
                    onBlur?.(e);
                  }}
                  secureTextEntry={!visible}
                  placeholderTextColor={tw.color('darkGray')}
                  {...props}
                  editable={(props.editable ?? true) && !loading && !disabled}
                />
              </View>
              <View style={tw.style(`px-2`, !loading ? 'hidden' : undefined)}>
                <ActivityIndicator size="small" color={tw.color('orange')} />
              </View>
              <TouchableOpacity onPress={onPressIcon}>
                <Icon
                  name={!visible ? 'eye-off' : 'eye'}
                  size={24}
                  color={tw.color('darkGray')}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={tw`row`}>
              <View style={tw`flex-1`}>
                <TextInput
                  ref={refTextInput}
                  style={tw.style(
                    `text-body-sm font-bold p-0`,
                    props.editable === false || loading || disabled
                      ? 'text-gray dark:text-neutral'
                      : 'text-black dark:text-neutral',
                  )}
                  textAlign="left"
                  textAlignVertical="bottom"
                  value={value}
                  onChangeText={onChangeTextHandler}
                  onFocus={(e) => {
                    refBase.current?.focus();
                    callbackOnFocus?.();
                    onFocus?.(e);
                  }}
                  onBlur={(e) => {
                    refBase.current?.blur();
                    onBlur?.(e);
                  }}
                  placeholderTextColor={tw.color('darkGray')}
                  {...props}
                  editable={(props.editable ?? true) && !loading && !disabled}
                />
              </View>
              <View style={tw.style(`px-2`, !loading ? 'hidden' : undefined)}>
                <ActivityIndicator size="small" color={tw.color('orange')} />
              </View>
            </View>
          )}
        </InputFieldBase>
      </Pressable>
    );
  },
);
