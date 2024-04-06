import React, {useImperativeHandle, useMemo, useRef, useState} from 'react'
import {ScrollView, TouchableOpacity, View} from "react-native";
import {BottomSheetModalMethods} from "@gorhom/bottom-sheet/lib/typescript/types";
import {BottomSheetBackdrop, BottomSheetModal, BottomSheetView} from "@gorhom/bottom-sheet";
import {tw} from "@/config";
import {Typography} from "@/components/atom/Typography";
import {useTranslation} from "react-i18next";
import {Ionicons} from "@expo/vector-icons";
import {useColor} from "@/hooks";
import {Avatar} from "@/features/home/components/Avatar";
import {isBlank} from "@/utils";

export interface IBottomSheetDetailContactProps {
  data?: IContact
  id?: string
}

export interface IBottomSheetDetailContactMethod extends Partial<BottomSheetModalMethods> {}

export const BottomSheetDetailContact = React.forwardRef<IBottomSheetDetailContactMethod, IBottomSheetDetailContactProps>(({ data, id }, ref) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const snapPoints = useMemo(() => ['66%', '90%'], [])
  const {t} = useTranslation('messages');
  const {t: tFields} = useTranslation('add-new-contact');

  const [state, setState] = useState<IContact | undefined>()

  const detail = useMemo(() => {
    if (state) {
      return state
    }

    if (data) {
      return data
    }
    return null
  }, [data, state])

  const colorFill = useColor('fill')

  const fields = useRef({ firstName: tFields('first-name'), lastName: tFields('last-name'), age: tFields('age') }).current

  useImperativeHandle(ref, () => ({
    ...bottomSheetModalRef.current,
    present: (val: IContact) => {
      bottomSheetModalRef.current?.present()
      setState(val)
    },
    close: (animationConfigs) => {
      bottomSheetModalRef.current?.close(animationConfigs)
      setState(undefined)
    },
    forceClose: (animationConfigs) => {
      bottomSheetModalRef.current?.forceClose(animationConfigs)
      setState(undefined)
    },
    dismiss: (animationConfigs) => {
      bottomSheetModalRef.current?.dismiss(animationConfigs)
      setState(undefined)
    },
    collapse: (animationConfigs) => {
      bottomSheetModalRef.current?.collapse(animationConfigs)
      setState(undefined)
    },
  }))

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      name="bottom-sheet-detail-contact"
      index={1}
      snapPoints={snapPoints}
      handleStyle={tw`bg-neutral dark:bg-black py-5 rounded-t-4`}
      handleIndicatorStyle={tw`bg-black dark:bg-neutral`}
      backdropComponent={(backdropProps) => (
        <BottomSheetBackdrop {...backdropProps} enableTouchThrough={true}/>
      )}>

      {detail != null
        ? (
          <BottomSheetView style={tw`fill items-center bg-neutral dark:bg-night`}>
            <View style={tw`fill w-full`}>
              <View style={tw`absolute left-4 right-4 top-4 flex-1 row justify-between items-center z-10`}>
                <TouchableOpacity
                  onPress={() => bottomSheetModalRef.current?.dismiss()}
                  testID="close-modal-button">
                  <Ionicons name="chevron-back" size={48} color={colorFill}/>
                </TouchableOpacity>
              </View>

              <ScrollView style={tw`w-full`}>
                <View style={tw`mt-6 items-center`}>
                  <Avatar firstName={detail.firstName} lastName={detail.lastName} photoUrl={detail.photo} />
                  <Typography style={tw`mt-6 text-h1`}>{detail.firstName + (!isBlank(detail.lastName ?? '') ? ` ${detail.lastName}` : '')}</Typography>
                </View>
                <View style={tw`mt-8 px-6`}>
                  {
                    Object.keys(fields).map((key, index) => {
                      return (
                        <React.Fragment key={key}>
                          <View style={tw`row items-center`}>
                            <Typography style={tw`text-h-3 font-bold flex-1 mr-6`}>{fields[key as keyof typeof fields]}:</Typography>
                            <Typography style={tw`text-h-3 flex-3`}>{detail[key as keyof IContact]}</Typography>
                          </View>
                          {index < Object.keys(fields).length - 1 && (<View style={tw`h-5`} />)}
                        </React.Fragment>
                      )
                    })
                  }
                </View>
              </ScrollView>
            </View>
          </BottomSheetView>
        )
        : (
          <View style={tw`fill center bg-neutral dark:bg-night`}>
            <Typography>{t('error-invalid-contact')}</Typography>
          </View>
        )
      }

    </BottomSheetModal>
  )
})
