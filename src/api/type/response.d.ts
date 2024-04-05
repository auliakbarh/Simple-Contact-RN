declare interface IBaseResponseAPI<D = unknown> {
  message: string
  data: D
}

declare interface IContact {
  id: string
  firstName: string
  lastName: string
  age: number
  photo: string
}

declare type TResponseGetAllContact = IBaseResponseAPI<IContact[]>

declare type TResponseGetContactById = IBaseResponseAPI<IContact>

declare type IResponseEditContact = null
declare type IResponseAddNewContact = null

declare interface IBodyAddContact {
  firstName: string
  lastName: string
  age: number
  photo?: string
}

declare interface IBodyEditContact extends Partial<IBodyAddContact> {}
