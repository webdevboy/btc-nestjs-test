
type PriceState = {
  price: number,
  error: string,
  loading: boolean
}

type PriceAction = {
  type: string,
  price: number,
  error: string
}

type DispatchType = (args: PriceAction) => PriceAction
