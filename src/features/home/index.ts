import {FC} from "react";
import {injectPropsContactList} from "@/features/home/hoc/injectPropsContactList";
import {ContactListUI} from "@/features/home/views/ContactListUI";

export const Home = injectPropsContactList(ContactListUI) as FC
