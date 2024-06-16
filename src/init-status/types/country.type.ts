export type Country = {
  country: string
  regionCode: string
  states: State[]
  cities: City[]
}

type State = {
  name: string
}

type City = {
  state: string
  city: string
  zip: string
  title: string
  district: string
}
