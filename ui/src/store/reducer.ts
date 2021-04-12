import * as actionTypes from "./actionTypes"

const initialState: PriceState = {
  loading: false,
  error: '',
  price: 0,
}

const reducer = (
  state: PriceState = initialState,
  action: PriceAction
): PriceState => {
  switch (action.type) {
    case actionTypes.GET_PRICE_ATTEMPT:
      return {
        ...state,
        loading: true,
        error: '',
      }
    case actionTypes.GET_PRICE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        price: action.price,
      }
    case actionTypes.GET_PRICE_FAILURE:
      return {
        ...state,
        loading: false,
        price: 0,
        error: action.error,
      }
  }
  return state;
}

export default reducer