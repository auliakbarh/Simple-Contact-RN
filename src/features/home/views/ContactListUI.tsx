import React, {useMemo} from "react";
import {SectionList, StyleSheet, TouchableOpacity, View} from 'react-native'
import {Header, SafeArea, Typography} from "@/components";
import {Octicons} from '@expo/vector-icons';
import {useTranslation} from "react-i18next";

import {tw} from "@/config";
import {useColor} from "@/hooks";
import {createSectionListArray} from "@/features/home/utils/function";
import {navigation} from "@/routes/Navigation";
import {SCREEN_NAME} from "@/routes/stacks/types/screenName";
import {IContactListUiProps} from "@/features/home/types/home";

export const ContactListUI: React.FC<IContactListUiProps> = ({data, toggleTheme, colorScheme}) => {
  const {t} = useTranslation('home')
  const colorFill = useColor('fill')

  const leftHeader = useMemo(() => {
    return (
      <TouchableOpacity style={tw`self-start`} onPress={toggleTheme}>
        <Octicons name={colorScheme === 'dark' ? 'moon' : 'sun'} size={24} color={colorFill}/>
      </TouchableOpacity>
    )
  }, [toggleTheme, colorScheme, colorFill])

  const rightHeader = useMemo(() => {
    return (
      <TouchableOpacity style={tw`self-end`} onPress={() => navigation.navigate(SCREEN_NAME.ADD_NEW_CONTACT_PAGE)}>
        <Octicons name="plus" size={24} color={colorFill}/>
      </TouchableOpacity>
    )
  }, [colorScheme, colorFill])

  const sections = useMemo(() => createSectionListArray(data), [data])

  return (
    <SafeArea>
      <Header title={"Simple Contact App"} titlePosition="center" leftComponent={leftHeader}
              rightComponent={rightHeader}/>
      <View style={tw`bg-softGray dark:bg-night py-6`}>
        <View style={tw`px-4 mb-6`}>
          <Typography style={tw`text-h1 font-bold`}>
            {t('title-page')}
          </Typography>
        </View>
        <SectionList
          sections={sections}
          keyExtractor={item => item.id}
          style={tw`mb-10`}
          contentContainerStyle={tw`p-4`}
          renderSectionHeader={({section: {title}}) => {
            return (
              <View style={tw`bg-green dark:bg-orange p-2 rounded-t-4`}>
                <Typography style={tw`text-h3 font-bold`}>{title}</Typography>
              </View>
            )
          }}
          renderSectionFooter={() => <View style={tw`h-4`}/>}
          renderItem={({item, section: {data}, index}) => {
            return (
              <View
                style={tw.style(`px-2 py-4 bg-neutral dark:bg-darkGray`, index === data.length - 1 ? 'rounded-b-4' : '')}>
                <TouchableOpacity>
                  <Typography
                    style={tw`text-body-lg`}>{item.firstName + (item.lastName ? ` ${item.lastName}` : '')}</Typography>
                </TouchableOpacity>
              </View>
            )
          }}
          ItemSeparatorComponent={() => <View style={tw`h-[${StyleSheet.hairlineWidth}px]`}/>}
          ListFooterComponent={() => <View style={tw`h-40 pt-4`}><View
            style={tw`h-[1px] bg-black dark:bg-neutral w-10 self-center`}/></View>}
        />
      </View>
    </SafeArea>
  )
}
