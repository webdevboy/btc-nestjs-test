import { AxiosError, AxiosResponse } from 'axios';

import * as api from 'api';
import * as actionTypes from './actionTypes';
import { IPriceParams } from 'api/interfaces';

export const getPriceAttemptAction = () => {
  const action: PriceAction = {
    type: actionTypes.GET_PRICE_ATTEMPT,
    price: 0,
    error: '',
  };
  return action;
};

export const getPriceSuccessAction = (price: number) => {
  const action: PriceAction = {
    type: actionTypes.GET_PRICE_SUCCESS,
    price,
    error: '',
  };
  return action;
};

export const getPriceFailureAction = (error: string) => {
  const action: PriceAction = {
    type: actionTypes.GET_PRICE_FAILURE,
    price: 0,
    error,
  };
  return action;
};

export const getPrice = (params: IPriceParams) => async (dispatch: DispatchType) => {
  try {
    dispatch(getPriceAttemptAction());
    const res: AxiosResponse = await api.getPrice(params);
    dispatch(getPriceSuccessAction(parseFloat(res.data.value)));
  }
  catch(error: any) {
    if(error.response?.data?.message) {
      dispatch(getPriceFailureAction(error.response.data.message));
    }
  }
};
