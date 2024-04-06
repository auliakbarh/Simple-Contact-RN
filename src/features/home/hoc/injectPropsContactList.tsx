import React, {useCallback, useRef} from "react";
import {useAppColorScheme} from "twrnc";

import {useAppDispatch} from "@/store/store";
import {tw} from "@/config";
import {setColorScheme} from "@/store/slice/setting";
import {IContactListUiProps} from "@/features/home/types/home";
import {useGetAllListQuery, useDeleteMutation} from "@/store/service/contact";
import {IBottomSheetDetailContactMethod} from "@/features/home/components";

export const injectPropsContactList: HOC<IContactListUiProps> = (Component) => (props) => {
  const dispatch = useAppDispatch();
  const [colorScheme, , setColorSchemeTw] = useAppColorScheme(tw);
  const refModal = useRef<IBottomSheetDetailContactMethod | null>(null)

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
  const [deleteContact] = useDeleteMutation()

  const onPressDelete = useCallback((id: string) => {
    deleteContact(id)
  }, [])

  return <Component {...props} data={data?.data ?? []} toggleTheme={toggleTheme} colorScheme={colorScheme} refModal={refModal} onPressDelete={onPressDelete} />;
}
