import React, {useMemo, useState} from 'react';
import {View,Image} from 'react-native';

import {isBlank} from "@/utils";
import {tw} from "@/config";
import {Typography} from "@/components/atom/Typography";

export interface IAvatarProps {
  firstName: string
  lastName: string
  photoUrl?: string | null
}

function getInitials (first: string, last: string): string {
  const words = [first, last]
  const initials = (words.slice(0, 2)).map(word => !isBlank(word) ? word.charAt(0) : '')

  return initials.join('')
}

export const Avatar: React.FC<IAvatarProps> = ({firstName, lastName, photoUrl}) => {
  const initials = useMemo(() => {
    return getInitials(firstName ?? '#', lastName ?? '#')
  }, [firstName, lastName])

  const styles = useMemo(() => [tw`w-[200px] bg-[#bdbdbd] rounded-full center`, { aspectRatio: 1 }], [])

  const [uri, setUri] = useState<string | null | undefined>(photoUrl)

  const src = useMemo(() => {
    if (uri) {
      return uri
    }

    return undefined
  }, [uri])

  return (
    src !== undefined
      ? <Image src={src} style={styles} onError={() => { setUri(undefined) }}/>
      : <View style={styles}>
        <Typography style={tw`text-[72px] font-bold`}>{initials}</Typography>
      </View>
  )
}
