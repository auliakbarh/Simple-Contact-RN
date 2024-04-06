import React from 'react';
import {View} from "react-native";

import {ShimmerPlaceholder} from "@/components/atom/ShimmerPlaceholder";
import {tw} from "@/config";

interface ILoaderProps extends React.PropsWithChildren {
  loading: boolean;
}

export const Loader: React.FC<ILoaderProps> = ({children, loading}) => {
  if (!loading) {
    return children
  }

  return (
    <View style={tw`p-4`}>
      <ShimmerPlaceholder visible={false} style={tw`h-50 w-full rounded-4`} />
      <View style={tw`h-40 pt-4`}>
        <View style={tw`h-[1px] bg-black dark:bg-neutral w-10 self-center`}/>
      </View>
    </View>
  )
}
