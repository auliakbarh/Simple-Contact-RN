import {FC} from "react";
import {injectPropsAddContact} from "@/features/add_new_contact/hoc/injectPropsAddContact";
import {AddContactUI} from "@/features/add_new_contact/views/AddContactUI";

export const AddNewContact = injectPropsAddContact(AddContactUI) as FC
