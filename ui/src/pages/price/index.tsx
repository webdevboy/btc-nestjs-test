import React, { ChangeEvent, useState } from 'react';
import * as api from 'api';
import { IPriceParams } from 'api/interfaces';
import convertNumberToUSD from 'utils/convertNumberToUSD';
import { AxiosError, AxiosResponse } from 'axios';

function Price() {

  const [price, setPrice] = useState<number>(0);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const changeSelectOption = (e: ChangeEvent<HTMLSelectElement>): void => {
    const params: IPriceParams = {
      asset: e.target.value,
    };
    setLoading(true);
    fetch('http://localhost:3001/price?asset=BTC')
    api.getPrice(params).then((res: AxiosResponse): void => {
      setPrice(parseFloat(res.data.value));
      setLoading(false);
      setError('');
    }).catch((error: AxiosError) => {
      if(error.response) {
        setError(error.response?.data?.message);
        setPrice(0);
        setLoading(false);
      }
    });
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
