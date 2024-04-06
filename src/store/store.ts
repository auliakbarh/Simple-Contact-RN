import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {configureStore} from '@reduxjs/toolkit'
import {settingSlice} from '@/store/slice/setting'
import {contactService} from "@/store/service/contact";

export const store = configureStore({
  reducer: {
    [settingSlice.reducerPath]: settingSlice.reducer,
    [contactService.reducerPath]: contactService.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(contactService.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
