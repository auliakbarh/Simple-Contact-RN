import React, {useCallback, useRef} from "react";
import {IAddContactUiProps, IInputRef, TSetRefFields} from "@/features/add_new_contact/types/addContact";
import {isBlank} from "@/utils";
import Toast from "react-native-root-toast";
import {useTranslation} from "react-i18next";
import {useAddNewMutation} from "@/store/service/contact";
import {navigation} from "@/routes/Navigation";

export const injectPropsAddContact: HOC<IAddContactUiProps> = (Component) => (props) => {
  const {t} = useTranslation('messages');
  const refInputFields = useRef<IInputRef>({
    firstName: null,
    lastName: null,
    age: null,
  })
  const [post, {isLoading}] = useAddNewMutation()

  const setRef: TSetRefFields = useCallback(
    (key) => (ref) => {
      refInputFields.current[key] = ref;
    },
    [refInputFields],
  );

  const onPressSave = useCallback(() => {
    const values = [
      refInputFields.current.firstName?.getValue(),
      refInputFields.current.lastName?.getValue(),
      refInputFields.current.age?.getValue(),
    ]

    if (values.every(i => !isBlank(i ?? ''))) {
      post({
        firstName: (refInputFields.current.firstName?.getValue() ?? '').trim(),
        lastName: (refInputFields.current.lastName?.getValue() ?? '').trim(),
        age: /^[0-9]+$/.test(refInputFields.current.age?.getValue() ?? '0') ? parseInt((refInputFields.current.age?.getValue() ?? '0'), 10) : 0,
      })
        .unwrap()
        .then(() => {
          Toast.show(t('success-add-contact'), {duration: Toast.durations.LONG})
          navigation.goBack()
        })
        .catch(() => {
          Toast.show(t('error-general'), {duration: Toast.durations.LONG})
        })
      return
    }

    Toast.show(t('error-field-not-filled'), {duration: Toast.durations.LONG})
  }, [])

  return (
    <Component
      {...props}
      setRef={setRef}
      onPressSave={onPressSave}
      isLoading={isLoading}
    />
  );
}
