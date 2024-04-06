import React from "react";
import {RnColorScheme} from "twrnc";

import {IBottomSheetDetailContactMethod} from "@/features/home/components";

export interface IContactListUiProps {
  data: IContact[]
  toggleTheme: () => void
  colorScheme: RnColorScheme
  refModal: React.MutableRefObject<IBottomSheetDetailContactMethod | null>
  onPressDelete: (id: string) => void
}
