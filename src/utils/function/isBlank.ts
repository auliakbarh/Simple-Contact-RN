import {makeString} from "@/utils/function/makeString";

export const isBlank = (str: string) => {
  return /^\s*$/.test(makeString(str));
};
