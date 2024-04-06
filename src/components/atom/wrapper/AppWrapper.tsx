import React from "react";
import {useSelector} from "react-redux";
import {useDeviceContext} from "twrnc";

import {RootState} from "@/store/store";
import {tw} from "@/config";

interface IAppWrapperProps extends React.PropsWithChildren {}

export const AppWrapper: React.FC<IAppWrapperProps> = ({children}) => {
  const theme = useSelector<RootState, TColorScheme>(state => state.setting.colorScheme)
  useDeviceContext(tw, {
    observeDeviceColorSchemeChanges: false,
    initialColorScheme: theme,
  })

  return (
    <>
      {children}
    </>
  )
}
