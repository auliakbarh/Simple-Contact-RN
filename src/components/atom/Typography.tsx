import React from "react";
import {Text, TextProps} from "react-native";
import {useStyle} from "@/hooks";
import {tw} from "@/config";

export const Typography: React.FC<TextProps> = ({ children, ...props }) => {
  const textStyle = useStyle('text', "text")

  return (
    <Text {...props} style={[tw.style(textStyle, 'text-body'), props.style]}>{children}</Text>
  )
}
