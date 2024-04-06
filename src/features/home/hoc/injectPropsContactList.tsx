import React, {useCallback} from "react";
import {useAppColorScheme} from "twrnc";

import {useAppDispatch} from "@/store/store";
import {tw} from "@/config";
import {setColorScheme} from "@/store/slice/setting";
import {IContactListUiProps} from "@/features/home/types/home";
import {useGetAllListQuery} from "@/store/service/contact";

export const injectPropsContactList: HOC<IContactListUiProps> = (Component) => (props) => {
  const dispatch = useAppDispatch();
  const [colorScheme, , setColorSchemeTw] = useAppColorScheme(tw);

  const toggleTheme = useCallback(() => {
    switch (colorScheme) {
      case 'dark':
        setColorSchemeTw('light')
        dispatch(setColorScheme('light'))
        break
      case 'light':
        setColorSchemeTw('dark')
        dispatch(setColorScheme('dark'))
        break
    }
  }, [colorScheme, setColorSchemeTw])

  const { data } = useGetAllListQuery()

  // console.log('data', data)

  return <Component {...props} data={data?.data ?? []} toggleTheme={toggleTheme} colorScheme={colorScheme} />;
}
