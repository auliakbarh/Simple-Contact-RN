import React, {useMemo} from "react";
import {StyleSheet, TouchableOpacity, View} from "react-native";
import {Entypo} from '@expo/vector-icons';

import {tw} from "@/config";
import {useColor} from "@/hooks";
import {Typography} from '@/components/atom/Typography'
import {navigation} from "@/routes/Navigation";
import {useTranslation} from "react-i18next";

interface IHeaderProps {
  title?: string;
  titlePosition?: "left" | "center";
  canGoBack?: boolean;
  rightComponent?: React.JSX.Element;
  leftComponent?: React.JSX.Element;
}

export const Header: React.FC<IHeaderProps> = ({title, canGoBack, rightComponent, leftComponent, titlePosition}) => {
  const { t } = useTranslation('screen-name');

  const screenName = useMemo(() => {
    if (title) {
      return title
    }

    const route = navigation.getCurrentRouteName()
    if (route) {
      return t(route)
    }
    return undefined
  }, [title])

  const colorFill = useColor('fill')
  const renderLeftComponent = useMemo(() => {
    if (leftComponent) {
      return (
        <View style={tw`min-w-10 mr-2`}>
          {leftComponent}
        </View>
      )
    }

    if (canGoBack || navigation.navigationRef.canGoBack()) {
      return (
        <TouchableOpacity style={tw`min-w-10 mr-2`} onPress={() => navigation.goBack()}>
          <Entypo name="chevron-thin-left" size={24} color={colorFill}/>
        </TouchableOpacity>
      )
    }

    if (rightComponent) {
      return <View style={tw.style(titlePosition === 'center' ? 'min-w-10 mr-2' : '')}/>
    }

    return undefined

  }, [leftComponent, rightComponent, canGoBack, titlePosition, colorFill])

  const renderRightComponent = useMemo(() => {
    if (rightComponent) {
      return (
        <View style={tw`ml-2 min-w-10`}>
          {rightComponent}
        </View>
      )
    }

    if (leftComponent) {
      return <View style={tw`ml-2 min-w-10`}/>
    }

    return <View/>
  }, [rightComponent, leftComponent])

  return (
    <View
      style={tw.style(`row items-center p-4 border-b-[${StyleSheet.hairlineWidth}px] border-gray dark:border-smoke`)}>
      {renderLeftComponent ?? <View/>}
      {screenName && <View style={tw`flex-4`}><Typography
          style={tw.style('text-body-lg font-bold', titlePosition === 'center' ? 'text-center center' : '')}>{screenName}</Typography></View>}
      {renderRightComponent}
    </View>
  )
}


Header.defaultProps = {
  canGoBack: false,
  titlePosition: 'left',
  title: undefined,
  rightComponent: undefined,
  leftComponent: undefined,
}
