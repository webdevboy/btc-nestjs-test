import React, { ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import { IPriceParams } from 'api/interfaces';
import convertNumberToUSD from 'utils/convertNumberToUSD';
import { getError, getLoading, getPriceValue } from 'store/selectors';
import { getPrice } from 'store/actions';

function Price() {
  const price = useSelector<PriceState, number>(getPriceValue);
  const loading = useSelector<PriceState, boolean>(getLoading);
  const error = useSelector<PriceState, string>(getError);

  const dispatch: Dispatch<any> = useDispatch();

  const changeSelectOption = (e: ChangeEvent<HTMLSelectElement>): void => {
    const params: IPriceParams = {
      asset: e.target.value,
    };
    dispatch(getPrice(params));
  }

  return (
    <div className="price">
      <select
        defaultValue=""
        placeholder="ASD"
        className="price__select"
        onChange={changeSelectOption}
      >
        <option value="" disabled hidden>Select asset</option>
        <option value="BTC">BTC</option>
        <option value="ETH">ETH</option>
      </select>
      <div>
        {loading && <div>Loading....</div>}
        {!loading && price !== 0 && <div>Amount: {convertNumberToUSD(price)}</div>}
        {!loading && error && <div>{error}</div>}
      </div>
    </div>
  );
}

export default Price;
