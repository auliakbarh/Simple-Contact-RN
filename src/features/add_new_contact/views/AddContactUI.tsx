import React from 'react';
import {ActivityIndicator, ScrollView, TouchableOpacity, View} from 'react-native'
import {Header, SafeArea, Typography} from "@/components";
import {InputText} from "@/components/molecule/form/InputFieldText";
import {useTranslation} from "react-i18next";
import {tw} from "@/config";
import {navigation} from "@/routes/Navigation";
import {IAddContactUiProps} from "@/features/add_new_contact/types/addContact";
import {useStyle} from "@/hooks";

export const AddContactUI: React.FC<IAddContactUiProps> = ({onPressSave, setRef, isLoading}) => {
  const {t} = useTranslation('add-new-contact');
  const {t: tGeneral} = useTranslation('general');
  const textStyle = useStyle('text', "text")
  return (
    <SafeArea>
      <Header/>
      <View style={tw`fill bg-neutral dark:bg-night`}>
        <ScrollView contentContainerStyle={tw`p-6`} style={tw`flex-1`}>
          <View>
            <InputText ref={setRef('firstName')} label={t('first-name')}/>
            <InputText ref={setRef('lastName')} label={t('last-name')} containerStyle={tw`mt-10`}/>
            <InputText ref={setRef('age')} label={t('age')} inputMode="numeric" containerStyle={tw`mt-10`}/>
          </View>
        </ScrollView>
        <View style={tw`row items-center px-4 mb-6`}>
          <TouchableOpacity style={tw`min-h-13 px-4 py-2 rounded-1 bg-white dark:bg-darkGray center flex-1`} onPress={() => navigation.goBack()}>
            <Typography style={tw`text-h2 font-bold`}>{tGeneral('cancel')}</Typography>
          </TouchableOpacity>
          <View style={tw`w-6`} />
          <TouchableOpacity style={tw.style(`min-h-13 px-4 py-2 rounded-1 bg-green dark:bg-orange center flex-1`, isLoading ? 'bg-softGray dark:bg-softGray' : '')} onPress={onPressSave} disabled={isLoading}>
            {
              isLoading ?
                <ActivityIndicator size="small" color={textStyle} /> :
                <Typography style={tw`text-h2 font-bold`}>{tGeneral('save')}</Typography>
            }
          </TouchableOpacity>
        </View>
      </View>
    </SafeArea>
  )
}
