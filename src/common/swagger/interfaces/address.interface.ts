export interface IAddressResponse {
  id: string
  houseNumber: string
  streetNumber: string
  country: IItemResponse
  city: IItemResponse
  state: IItemResponse
}

export interface IItemResponse {
  id: string
  deletedOn: null | Date
  name: string
}
